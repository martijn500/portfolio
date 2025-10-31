"use client";
import React from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <div className="py-10 text-sm text-muted-foreground mx-auto max-w-6xl px-5 md:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-3">
      <p>{t.footerAllRights(t.profile.name)}</p>
      <div className="flex items-center gap-4">
        <a 
          href="https://www.figma.com/deck/ltOQAl9YHQeNbxipQIt2jD/portfolio" 
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.hero.ctaPortfolio} (opens in new tab)`}
        >
          {t.hero.ctaPortfolio}
        </a>
        <a 
          href="https://www.linkedin.com/in/martijnvanderwijst/" 
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.hero.ctaLinkedin} (opens in new tab)`}
        >
          {t.hero.ctaLinkedin}
        </a>
        <a 
          href="https://www.divotion.com/" 
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.hero.ctaDivotion} (opens in new tab)`}
        >
          {t.hero.ctaDivotion}
        </a>
      </div>
    </div>
  );
}