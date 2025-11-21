// language-context.ts
import { createContext } from "react";

export type Lang = "en" | "pt";

export type LanguageContextValue = {
  language: Lang;
  setLanguage: (l: Lang) => void;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
