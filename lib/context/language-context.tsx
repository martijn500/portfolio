"use client";
import React, { createContext, useContext } from "react";
import type { LangKey } from "@/lib/i18n";
import { i18n } from "@/lib/i18n";

interface LanguageContextType {
  lang: LangKey;
  t: (typeof i18n)[LangKey];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ lang, children }: { lang: LangKey; children: React.ReactNode }) {
  const t = i18n[lang];

  return <LanguageContext.Provider value={{ lang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
