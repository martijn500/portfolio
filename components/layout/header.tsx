"use client";
import React from "react";
import { Sun, Moon, Languages, Banana, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import NavLink from "@/components/layout/nav-link";
import type { LangKey } from "@/lib/i18n";
import { useLanguage } from "@/lib/context/language-context";
import { useActiveSection } from "@/lib/hooks/use-active-section";

function stripLangPrefix(pathname: string) {
  return pathname.replace(/^\/(en|nl)(\/|$)/, "/");
}
function buildLangUrl(lang: LangKey) {
  const { origin, pathname, search, hash } = window.location;
  const base = stripLangPrefix(pathname);
  return `${origin}/${lang}${base}${search}${hash}`;
}

interface HeaderProps {
  dark: boolean;
  setDark: (value: boolean | ((prev: boolean) => boolean)) => void;
  afterHero: boolean;
  onBorderUpdate?: (borderInfo: { left: number; width: number } | null) => void;
}

export default function Header({ dark, setDark, afterHero, onBorderUpdate }: HeaderProps) {
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

  React.useEffect(() => {
    const updateBorderPosition = () => {
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

  const nextLang: LangKey = lang === "nl" ? "en" : "nl";
  const nextLangLabel = headerCopy.languageToggle.label[nextLang];
  const toggleLangAria = headerCopy.languageToggle.aria[nextLang];
  const toggleThemeAria = dark ? headerCopy.themeToggle.toLight : headerCopy.themeToggle.toDark;

  const handleToggleLang = () => {
    const url = buildLangUrl(nextLang);
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
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Banana className="h-4 w-4" />
        </span>
        <span>{t.profile.name}</span>
      </a>
      
      {/* Navigation Links */}
      <div ref={navRef} className="hidden md:flex items-center h-full gap-6 relative" role="menubar">
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
          <SheetContent side="right" className="w-[300px]">
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
            <div className="flex flex-col gap-2 mt-8 pt-8 border-t px-4">
              <Button
                variant="outline"
                onClick={handleToggleLang}
                className="justify-start gap-2"
                aria-label={toggleLangAria}
              >
                <Languages className="h-5 w-5" />
                {nextLangLabel}
              </Button>
              <Button
                variant="outline"
                onClick={() => setDark((v) => !v)}
                className="justify-start gap-2"
                aria-label={toggleThemeAria}
              >
                {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {toggleThemeAria}
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop controls */}
        <Button
          variant="ghost"
          size="sm"
          aria-label={toggleLangAria}
          onClick={handleToggleLang}
          className="gap-1.5 hidden md:flex items-center"
        >
          <Languages className="h-5 w-5 -mt-0.5" />
          <span className="text-xs font-medium">{lang.toUpperCase()}</span>
          <span className="sr-only">{toggleLangAria}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label={toggleThemeAria}
          onClick={() => setDark((v) => !v)}
          className="hidden md:flex items-center justify-center px-3"
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">{toggleThemeAria}</span>
        </Button>
      </div>
    </nav>
  );
}