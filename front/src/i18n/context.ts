import { createContext } from "react";
import type { AppLanguage } from "./translationApi";

export type LanguageContextValue = {
  language: AppLanguage;
  setLanguage: (nextLanguage: AppLanguage) => void;
  toggleLanguage: () => void;
  t: (text: string) => string;
  isTranslating: boolean;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
