"use client";
import React from "react";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/context/language-context";
import type { LangKey } from "@/lib/i18n";

function stripLangPrefix(pathname: string) {
  return pathname.replace(/^\/(en|nl)(\/|$)/, "/");
}

function buildLangUrl(lang: LangKey) {
  if (typeof window === "undefined") {
    return `/${lang}`;
  }
  const { origin, pathname, search, hash } = window.location;
  const base = stripLangPrefix(pathname);
  return `${origin}/${lang}${base}${search}${hash}`;
}

export function LanguageSwitcher() {
  const { lang, t } = useLanguage();
  const headerCopy = t.header;

  const languages: Array<{ code: LangKey; label: string; nativeLabel: string }> = [
    { code: "en", label: "English", nativeLabel: "English" },
    { code: "nl", label: "Nederlands", nativeLabel: "Nederlands" },
  ];

  return (
    <div>
      <h3
        className="text-sm font-medium text-foreground/70 mb-3 font-sans"
        id="language-section"
      >
        {headerCopy.languageToggle.label}
      </h3>
      <nav
        className="flex flex-col gap-2"
        role="navigation"
        aria-labelledby="language-section"
      >
        {languages.map((language) => (
          <a
            key={language.code}
            href={buildLangUrl(language.code)}
            lang={language.code}
            aria-current={lang === language.code ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              lang === language.code
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-muted text-foreground"
            )}
            onClick={(e) => {
              if (lang === language.code) {
                e.preventDefault();
                return;
              }
              // Allow default link navigation with hash preservation
            }}
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            <span>{language.nativeLabel}</span>
            {lang === language.code && (
              <span className="sr-only">{headerCopy.currentPage}</span>
            )}
          </a>
        ))}
      </nav>
    </div>
  );
}
