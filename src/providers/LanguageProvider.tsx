import { useCallback, useEffect, useMemo, useState } from "react";
import en from "@/assets/locales/translations.en.json";
import pt from "@/assets/locales/translations.pt.json";
import {
  Lang,
  LanguageContext,
  type TranslateOptions,
} from "@/contexts/LanguageContext";

type Messages = typeof en;
const bundles: Record<Lang, Messages> = { en, pt };

type AnyRecord = Record<string, unknown>;

const isRecord = (v: unknown): v is AnyRecord =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const getByPath = (obj: unknown, path: string): unknown => {
  if (!path) return undefined;

  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc == null) return undefined;

    if (isRecord(acc)) return acc[key];

    if (Array.isArray(acc)) {
      const idx = Number(key);
      return Number.isFinite(idx) ? acc[idx] : undefined;
    }

    return undefined;
  }, obj);
};

const interpolate = (text: string, vars?: Record<string, string | number>) => {
  if (!vars) return text;
  return text.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, k: string) => {
    const v = vars[k];
    return v == null ? "" : String(v);
  });
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isBrowser = typeof window !== "undefined";

  // Determine default language by TLD (your original behavior)
  let tldLocale: Lang = "en";
  if (isBrowser) {
    const host = window.location.hostname;
    const tld = host.includes(".") ? host.split(".").pop() : host;
    if (tld === "pt") tldLocale = "pt";
    else if (tld === "com") tldLocale = "en";
  }

  const [language, setLanguage] = useState<Lang>(() => {
    const saved = isBrowser ? localStorage.getItem("language") : null;
    if (saved === "en" || saved === "pt") return saved;

    const guess =
      typeof navigator !== "undefined"
        ? navigator.language.toLowerCase()
        : tldLocale;

    return guess.startsWith("pt") ? "pt" : "en";
  });

  useEffect(() => {
    if (!isBrowser) return;
    try {
      localStorage.setItem("language", language);
    } catch {
      // Don’t throw in rendering. Just ignore storage issues.
    }
  }, [language, isBrowser]);

  const t = useCallback(
    (key: string, options?: TranslateOptions): string => {
      const fallbackLang = options?.fallbackLang ?? "en";

      const primary = getByPath(bundles[language], key);
      const fallback =
        language === fallbackLang
          ? undefined
          : getByPath(bundles[fallbackLang], key);

      const value = primary ?? fallback;

      if (typeof value === "string") {
        return interpolate(value, options?.vars);
      }

      return key;
    },
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
