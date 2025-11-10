"use client";
import React from "react";
import { Sun, Moon, Languages, Banana, Menu, Monitor, Settings } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = React.useState(false);
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
      const isMdOrLarger = window.matchMedia("(min-width: 768px)").matches;
      if (!isMdOrLarger) {
        setBorderStyle({ left: 0, width: 0 });
        onBorderUpdate?.(null);
        return;
      }

      if (!navRef.current || !activeSection) {
        setBorderStyle({ left: 0, width: 0 });
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

  const languages: Array<{ code: LangKey; label: string; nativeLabel: string }> = [
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'nl', label: 'Nederlands', nativeLabel: 'Nederlands' },
  ];

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
            display: borderStyle.width > 0 ? 'block' : 'none',
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
        {/* Combined menu: navigation + settings on mobile, settings only on desktop */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetTrigger asChild className="hidden md:flex">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label={headerCopy.settingsLabel || "Settings"}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              title={headerCopy.settingsLabel || "Settings"}
            >
              <Settings className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-background/70 backdrop-blur-md border-l border-border/60"
          >
            <SheetHeader>
              <SheetTitle className="md:hidden">{headerCopy.menuLabel || "Menu"}</SheetTitle>
              <SheetTitle className="hidden md:block">{headerCopy.settingsLabel || "Settings"}</SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col gap-6 mt-8 px-4">
              {/* Navigation section - mobile only */}
              <nav className="flex flex-col gap-2 md:hidden" role="navigation" aria-label="Mobile navigation">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      activeSection === section.id 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'hover:bg-muted text-foreground'
                    )}
                  >
                    <span>{section.label}</span>
                  </a>
                ))}
              </nav>

              {/* Divider between navigation and settings on mobile */}
              <div className="md:hidden border-t border-border/40" />

              {/* Language section - as navigation links */}
              <div>
                <h3 className="text-sm font-medium text-foreground/70 mb-3" id="language-section">
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
                        <span className="sr-only"> (current)</span>
                      )}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Theme section - as radiogroup */}
              <div>
                <h3 className="text-sm font-medium text-foreground/70 mb-3" id="theme-section">
                  {themeGroupLabel}
                </h3>
                <div 
                  role="radiogroup" 
                  aria-labelledby="theme-section"
                  className="flex flex-col gap-2"
                  onKeyDown={(e) => {
                    const options = themeOptions.map(o => o.value);
                    const currentIndex = options.indexOf(themeMode);
                    
                    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                      e.preventDefault();
                      const nextIndex = (currentIndex + 1) % options.length;
                      onThemeModeChange(options[nextIndex]);
                    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                      e.preventDefault();
                      const prevIndex = (currentIndex - 1 + options.length) % options.length;
                      onThemeModeChange(options[prevIndex]);
                    }
                  }}
                >
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={themeMode === option.value}
                      aria-label={option.aria}
                      onClick={() => onThemeModeChange(option.value)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-left",
                        themeMode === option.value
                          ? "bg-primary text-primary-foreground font-medium"
                          : "hover:bg-muted text-foreground"
                      )}
                      tabIndex={themeMode === option.value ? 0 : -1}
                    >
                      <option.Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{option.label}</span>
                      {themeMode === option.value && (
                        <span className="sr-only"> (selected)</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}