"use client";
import React, { createContext, useContext } from "react";
import type { LangKey, I18nDictionary } from "@/lib/i18n";

interface LanguageContextType {
  lang: LangKey;
  t: I18nDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  lang,
  dictionary,
  children,
}: {
  lang: LangKey;
  dictionary: I18nDictionary;
  children: React.ReactNode;
}) {
  return <LanguageContext.Provider value={{ lang, t: dictionary }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
