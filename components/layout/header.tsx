"use client";
import React from "react";
import { Sun, Moon, Languages, Banana, Menu, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import NavLink from "@/components/layout/nav-link";
import type { LangKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/context/language-context";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { scrollHeroToSection } from "@/lib/scroll-hero";
import { cn } from "@/lib/utils";

function stripLangPrefix(pathname: string) {
  return pathname.replace(/^\/(en|nl)(\/|$)/, "/");
}
function buildLangUrl(lang: LangKey) {
  const { origin, pathname, search, hash } = window.location;
  const base = stripLangPrefix(pathname);
  return `${origin}/${lang}${base}${search}${hash}`;
}

interface HeaderProps {
  themeMode: "light" | "dark" | "system";
  onThemeModeChange: (mode: "light" | "dark" | "system") => void;
  afterHero: boolean;
  onBorderUpdate?: (borderInfo: { left: number; width: number } | null) => void;
}

export default function Header({ themeMode, onThemeModeChange, afterHero, onBorderUpdate }: HeaderProps) {
  const { lang, t } = useLanguage();
  const activeSection = useActiveSection();
  const navRef = React.useRef<HTMLDivElement>(null);
  const [borderStyle, setBorderStyle] = React.useState({ left: 0, width: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const headerCopy = t.header;

  const sections = [
    { id: 'about-work', label: t.hero.aboutWorkTitle },
    { id: 'about-life', label: t.hero.aboutLifeTitle },
    { id: 'philosophy', label: t.hero.philosophyTitle },
    { id: 'featured', label: t.workTitle },
    { id: 'principles', label: t.principlesTitle },
    { id: 'community', label: t.communityTitle },
  ];

  const themeGroupLabel = headerCopy.themeToggle.label;
  const themeOptions = [
    {
      value: "light" as const,
      Icon: Sun,
      label: headerCopy.themeToggle.options.light.short,
      aria: headerCopy.themeToggle.options.light.aria,
    },
    {
      value: "system" as const,
      Icon: Monitor,
      label: headerCopy.themeToggle.options.system.short,
      aria: headerCopy.themeToggle.options.system.aria,
    },
    {
      value: "dark" as const,
      Icon: Moon,
      label: headerCopy.themeToggle.options.dark.short,
      aria: headerCopy.themeToggle.options.dark.aria,
    },
  ];

  React.useEffect(() => {
    const updateBorderPosition = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop) {
        onBorderUpdate?.(null);
        return;
      }

      if (!navRef.current || !activeSection) {
        onBorderUpdate?.(null);
        return;
      }

      const activeLink = navRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (activeLink) {
        const rect = activeLink.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        
        const borderInfo = {
          left: rect.left - navRect.left - 8, // -8px voor -left-2
          width: rect.width + 16, // +16px voor left en right padding
        };
        
        setBorderStyle(borderInfo);
        
        // Send absolute viewport position to parent for header border gap
        onBorderUpdate?.({
          left: rect.left - 8,
          width: rect.width + 16,
        });
      }
    };

    updateBorderPosition();

    // Update on window resize
    window.addEventListener('resize', updateBorderPosition);
    return () => window.removeEventListener('resize', updateBorderPosition);
  }, [activeSection, onBorderUpdate]);

  const handleLanguageSelect = (targetLang: LangKey) => {
    if (targetLang === lang) {
      return;
    }
    const url = buildLangUrl(targetLang);
    window.location.href = url;
  };

  const nextLang: LangKey = lang === "nl" ? "en" : "nl";
  const nextLangLabel = (headerCopy.languageToggle.label as any)[nextLang];
  const toggleLangAria = (headerCopy.languageToggle.aria as any)[nextLang];

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const didScroll = scrollHeroToSection(id);
    if (didScroll) {
      event.preventDefault();
    }
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
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Banana className="h-4 w-4" />
        </span>
        <span>{t.profile.name}</span>
      </a>
      
      {/* Navigation Links */}
      <div ref={navRef} className="hidden md:flex items-center h-full relative" role="menubar">
        {/* Animated border */}
        <div 
          className={`absolute bottom-0 h-2 rounded-t-md transition-all duration-300 ease-in-out ${
            afterHero ? 'border-l border-r border-t border-foreground/30' : ''
          } ${
            activeSection === 'about-work' || activeSection === 'about-life'
              ? 'bg-background' 
              : ''
          }`}
          style={{
            left: `${borderStyle.left}px`,
            width: `${borderStyle.width}px`,
          }}
        />
        
        {sections.map((section) => (
          <NavLink 
            key={section.id}
            href={`#${section.id}`} 
            sectionId={section.id}
            data-section={section.id}
            onClick={(event) => handleNavClick(event, section.id)}
          >
            {section.label}
          </NavLink>
        ))}
      </div>
      
      <div className="flex items-center gap-2 h-full">
        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-background/70 backdrop-blur-md border-l border-border/60"
          >
            <SheetHeader>
              <SheetTitle>{t.profile.name}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8 px-4" role="navigation" aria-label="Mobile navigation">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg py-2 px-3 rounded-md transition-colors ${
                    activeSection === section.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted'
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-8 pt-8 border-t px-4">
              <div className="grid gap-2" role="group" aria-label={toggleLangAria}>
                <Button
                  variant="outline"
                  onClick={() => handleLanguageSelect(nextLang)}
                  className="justify-start gap-2 rounded-full px-3 py-2"
                  aria-label={toggleLangAria}
                  title={toggleLangAria}
                >
                  <Languages className="h-5 w-5" aria-hidden="true" />
                  <span aria-hidden="true" className="text-sm font-medium">
                    {nextLangLabel}
                  </span>
                </Button>
              </div>
              <div className="grid gap-2" role="group" aria-label={themeGroupLabel}>
                {themeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={themeMode === option.value ? "default" : "outline"}
                    onClick={() => onThemeModeChange(option.value)}
                    className="justify-start gap-2"
                    aria-pressed={themeMode === option.value}
                    aria-label={option.aria}
                    title={option.aria}
                  >
                    <option.Icon className="h-5 w-5" aria-hidden="true" />
                    <span aria-hidden="true">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleLanguageSelect(nextLang)}
            className="flex h-9 items-center gap-1.5 rounded-full border border-foreground/10 bg-card/80 px-3 text-xs font-medium uppercase text-foreground/80 shadow-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={toggleLangAria}
            title={toggleLangAria}
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            <span aria-hidden="true">{lang.toUpperCase()}</span>
            <span className="sr-only">{toggleLangAria}</span>
          </button>

          <div
            className="flex h-9 items-center gap-px rounded-full border border-foreground/10 bg-card/80 px-0.5 shadow-sm"
            role="group"
            aria-label={themeGroupLabel}
          >
            {themeOptions.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onThemeModeChange(option.value)}
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full text-foreground/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  themeMode === option.value
                    ? "text-foreground after:absolute after:inset-px after:rounded-full after:bg-foreground/10 after:content-['']"
                    : "hover:text-foreground"
                )}
                aria-pressed={themeMode === option.value}
                aria-label={option.aria}
                title={option.aria}
              >
                <option.Icon className="relative h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}