// LanguageProvider.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import en from "@/assets/locales/translations.en.json";
import pt from "@/assets/locales/translations.pt.json";
import { Lang, LanguageContext } from "@/contexts/LanguageContext";

type Messages = typeof en;
const bundles: Record<Lang, Messages> = { en, pt };

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isBrowser = typeof window !== "undefined";
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
    try {
      localStorage.setItem("language", language);
    } catch {
      throw new Error(
        "Unable to access localStorage to save language preference."
      );
    }
  }, [language]);

  const t = useCallback(
    (key: keyof Messages | string) =>
      (bundles[language] as Record<string, string>)[key as string] ??
      (key as string),
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
