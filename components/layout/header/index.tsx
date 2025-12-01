"use client";
import React from "react";
import { Banana, Briefcase, Palmtree, Lightbulb, Star, Target, Users } from "lucide-react";
import type { ThemeMode } from "@/lib/theme";
import { useLanguage } from "@/lib/context/language-context";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";

interface HeaderProps {
  themeMode: ThemeMode;
  onThemeModeChange: (mode: ThemeMode) => void;
  afterHero: boolean;
  onBorderUpdate?: (borderInfo: { left: number; width: number } | null) => void;
}

export default function Header({
  themeMode,
  onThemeModeChange,
  afterHero,
  onBorderUpdate,
}: HeaderProps) {
  const { t } = useLanguage();
  const activeSection = useActiveSection();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const headerCopy = t.header;

  const sections = [
    { id: "about-work", label: t.hero.aboutWorkTitle, icon: Briefcase },
    { id: "about-life", label: t.hero.aboutLifeTitle, icon: Palmtree },
    { id: "philosophy", label: t.hero.philosophyTitle, icon: Lightbulb },
    { id: "featured", label: t.workTitle, icon: Star },
    { id: "principles", label: t.principlesTitle, icon: Target },
    { id: "community", label: t.communityTitle, icon: Users },
  ];

  return (
    <nav
      className="mx-auto max-w-6xl px-5 md:px-8 lg:px-12 flex h-16 items-center justify-between"
      role="navigation"
      aria-label={headerCopy.mainNavigation}
    >
      <a
        href="#"
        className="h-full flex items-center gap-2 font-semibold"
        aria-label={`${t.profile.name} - Home`}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Banana className="h-4 w-4" />
        </span>
        <span>{t.profile.name}</span>
      </a>

      <DesktopNav
        sections={sections}
        activeSection={activeSection}
        afterHero={afterHero}
        onBorderUpdate={onBorderUpdate}
      />

      <div className="flex items-center gap-2 h-full">
        <MobileMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          activeSection={activeSection}
          sections={sections}
          themeMode={themeMode}
          onThemeModeChange={onThemeModeChange}
        />
      </div>
    </nav>
  );
}
