import { LanguageContext } from "@/contexts/LanguageContext";
import { useContext } from "react";

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
};
