import { createContext } from "react";

export type Lang = "en" | "pt";

export type TranslateOptions = {
  returnObjects?: boolean;
  vars?: Record<string, string | number>;
  fallbackLang?: Lang;
};

export type LanguageContextValue = {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  t: (key: string, options?: TranslateOptions) => string;
};

export const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});
