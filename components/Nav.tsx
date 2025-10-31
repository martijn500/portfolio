"use client";
import React from "react";
import { Sun, Moon, Languages } from "lucide-react";
import { Button } from "@/components/ui/Button";
import NavLink from "@/components/NavLink";
import type { LangKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";

function stripLangPrefix(pathname: string) {
  return pathname.replace(/^\/(en|nl)(\/|$)/, "/");
}
function buildLangUrl(lang: LangKey) {
  const { origin, pathname, search, hash } = window.location;
  const base = stripLangPrefix(pathname);
  return `${origin}/${lang}${base}${search}${hash}`;
}

interface NavProps {
  dark: boolean;
  setDark: (value: boolean | ((prev: boolean) => boolean)) => void;
  afterHero: boolean;
}

export default function Nav({ dark, setDark, afterHero }: NavProps) {
  const { lang, t } = useLanguage();

  const handleToggleLang = () => {
    const next: LangKey = lang === "nl" ? "en" : "nl";
    const url = buildLangUrl(next);
    window.location.href = url; // Changed from window.location.assign(url)
  };

  return (
    <nav
      className="mx-auto max-w-6xl px-5 md:px-8 lg:px-12 flex h-16 items-center justify-between"
      role="navigation"
      aria-label="Main navigation"
    >
      <a 
        href="#" 
        className="h-full flex items-center gap-2 font-semibold"
        aria-label={`${t.profile.name} - Home`}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">M</span>
        <span className="hidden sm:block">{t.profile.name}</span>
      </a>
      
      {/* Navigation Links */}
      <div className="hidden md:flex items-center h-full gap-6" role="menubar">
        <NavLink href="#about-work" sectionId="about-work">
          {t.hero.aboutWorkTitle}
        </NavLink>
        <NavLink href="#about-life" sectionId="about-life">
          {t.hero.aboutLifeTitle}
        </NavLink>
        <NavLink href="#philosophy" sectionId="philosophy">
          {t.hero.philosophyTitle}
        </NavLink>
        <NavLink href="#featured" sectionId="featured">
          {t.workTitle}
        </NavLink>
        <NavLink href="#principles" sectionId="principles">
          {t.principlesTitle}
        </NavLink>
        <NavLink href="#community" sectionId="community">
          {t.communityTitle}
        </NavLink>
      </div>
      
      <div className="flex items-center gap-2 h-full">
        <Button variant="ghost" size="sm" aria-label="Toggle language" onClick={handleToggleLang} className="gap-1.5">
          <Languages className="h-5 w-5 -mt-0.5" />
          <span className="text-xs font-medium">{lang.toUpperCase()}</span>
          <span className="sr-only">Switch language</span>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setDark((v) => !v)}>
          {dark ? <Sun className="h-5 w-5 -mt-0.5" /> : <Moon className="h-5 w-5 -mt-0.5" />}
        </Button>
      </div>
    </nav>
  );
}