"use client";
import React from "react";
import { Menu, Settings } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/context/language-context";
import type { ThemeMode } from "@/lib/theme";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  activeSection: string | null;
  sections: Array<{ id: string; label: string; icon: React.ElementType }>;
  themeMode: ThemeMode;
  onThemeModeChange: (mode: ThemeMode) => void;
}

export function MobileMenu({
  menuOpen,
  setMenuOpen,
  activeSection,
  sections,
  themeMode,
  onThemeModeChange,
}: MobileMenuProps) {
  const { t } = useLanguage();
  const headerCopy = t.header;

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger asChild className="md:hidden">
        <IconButton
          aria-label={headerCopy.menu.aria}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
        >
          <Menu className="w-5 h-5 text-foreground" aria-hidden="true" />
        </IconButton>
      </SheetTrigger>
      <SheetTrigger asChild className="hidden md:flex">
        <IconButton
          aria-label={headerCopy.settings.aria}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          title={headerCopy.settings.label}
        >
          <Settings className="w-5 h-5 text-foreground" aria-hidden="true" />
        </IconButton>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] bg-background/70 backdrop-blur-md border-l border-border/60"
      >
        <SheetHeader>
          <SheetTitle className="md:hidden">{headerCopy.menu.label}</SheetTitle>
          <SheetTitle className="hidden md:block">{headerCopy.settings.label}</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4">
          {/* Navigation section - mobile only */}
          <div className="md:hidden">
            <h3
              className="text-sm font-medium text-foreground/70 mb-3 font-sans"
              id="navigation-section"
            >
              {headerCopy.navigation.label}
            </h3>
            <nav
              className="flex flex-col gap-2"
              role="navigation"
              aria-labelledby="navigation-section"
            >
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{section.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Divider between navigation and settings on mobile */}
          <div className="md:hidden border-t border-border/40" />

          {/* Language section */}
          <LanguageSwitcher />

          {/* Theme section */}
          <ThemeToggle themeMode={themeMode} onThemeModeChange={onThemeModeChange} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
