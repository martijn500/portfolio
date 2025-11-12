"use client";
import React from "react";
import type { LangKey } from "@/lib/i18n";
import Hero from "@/components/sections/hero";
import Work from "@/components/sections/work";
import DesignPhilosophy from "@/components/sections/design-philosophy";
import Community from "@/components/sections/community";
import Principles from "@/components/sections/principles";
import Header from "@/components/layout/header";
import Writing from "@/components/sections/writing";
import Footer from "@/components/layout/footer";
import DecorativeStripes from "@/components/common/decorative-stripes";
import { LanguageProvider, useLanguage } from "@/lib/context/language-context";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
type ThemeMode = "light" | "dark" | "system";
const THEME_STORAGE_KEY = "theme-preference";

function SiteContent() {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>("system");
  const [isDark, setIsDark] = React.useState(false);
  const [isThemeResolved, setIsThemeResolved] = React.useState(false);
  const [showHeaderBorder, setShowHeaderBorder] = React.useState(false);
  const [activeBorderInfo, setActiveBorderInfo] = React.useState<{
    left: number;
    width: number;
  } | null>(null);
  const { lang, t } = useLanguage();

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const getStoredPreference = () => {
      try {
        return localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      } catch (error) {
        return null;
      }
    };

    const stored = getStoredPreference();
    const initialMode: ThemeMode =
      stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    const initialDark =
      initialMode === "dark" ? true : initialMode === "light" ? false : mq.matches;

    setThemeMode((previous) => (previous === initialMode ? previous : initialMode));
    setIsDark(initialDark);
    setIsThemeResolved(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSchemeChange = (event: MediaQueryListEvent) => {
      if (themeMode === "system") {
        setIsDark(event.matches);
      }
    };

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handleSchemeChange);
      return () => mq.removeEventListener("change", handleSchemeChange);
    }

    const previousOnChange = mq.onchange;
    mq.onchange = handleSchemeChange;
    return () => {
      mq.onchange = previousOnChange;
    };
  }, [themeMode]);

  useIsomorphicLayoutEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.classList.add("theme-ready");
    root.dataset.theme = themeMode;
  }, [isDark, themeMode, isThemeResolved]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const nextDark = themeMode === "dark" ? true : themeMode === "light" ? false : mq.matches;
    setIsDark(nextDark);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch (error) {
      // localStorage might be unavailable (e.g., private mode); ignore.
    }
  }, [themeMode]);

  React.useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.title = t.seo.title;
  }, [lang, t.seo.title]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const heroSection = document.getElementById("hero");
    if (!heroSection) {
      setShowHeaderBorder(true);
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    let ticking = false;

    const updateBorderVisibility = () => {
      if (!desktopQuery.matches) {
        setShowHeaderBorder(true);
        return;
      }

      const heroRect = heroSection.getBoundingClientRect();
      const heroLeavingViewport = heroRect.bottom <= window.innerHeight;
      setShowHeaderBorder(heroLeavingViewport);
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateBorderVisibility();
        ticking = false;
      });
    };

    updateBorderVisibility();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateBorderVisibility);
    desktopQuery.addEventListener("change", updateBorderVisibility);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBorderVisibility);
      desktopQuery.removeEventListener("change", updateBorderVisibility);
    };
  }, []);

  return (
    <div className="min-h-screen text-foreground antialiased bg-card">
      {/* Skip Links for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-primary text-primary-foreground px-4 py-2 font-medium"
      >
        {t.header.skipToMain}
      </a>
      <a
        href="#navigation"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-32 z-50 bg-primary text-primary-foreground px-4 py-2 font-medium"
      >
        {t.header.skipToNav}
      </a>

      <header
        id="navigation"
        role="banner"
        className="sticky top-0 z-40 backdrop-blur h-16 transition-all duration-200"
      >
        <Header
          themeMode={themeMode}
          onThemeModeChange={setThemeMode}
          afterHero={showHeaderBorder}
          onBorderUpdate={setActiveBorderInfo}
        />

        {/* Bottom border with gap for active nav item */}
        {showHeaderBorder && (
          <>
            {activeBorderInfo ? (
              <>
                {/* Left part of border */}
                <div
                  className="absolute bottom-0 left-0 h-px bg-foreground/30 transition-all duration-300"
                  style={{ width: `${activeBorderInfo.left}px` }}
                />
                {/* Right part of border */}
                <div
                  className="absolute bottom-0 h-px bg-foreground/30 transition-all duration-300"
                  style={{
                    left: `${activeBorderInfo.left + activeBorderInfo.width}px`,
                    right: 0,
                  }}
                />
              </>
            ) : (
              /* Full border when no active section */
              <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/30" />
            )}
          </>
        )}
      </header>

      <main id="main-content" role="main">
        <section
          id="hero"
          className="border-b-8 border-foreground dark:border-foreground/30 bg-card lg:px-12 lg:pb-12"
          role="region"
          aria-labelledby="hero-heading"
        >
          <Hero />
        </section>

        <section id="philosophy" role="region" aria-labelledby="philosophy-heading">
          <DecorativeStripes />
          <div className="py-10 sm:py-14 lg:py-20">
            <DesignPhilosophy />
          </div>
          <DecorativeStripes />
        </section>

        <section
          id="featured"
          className="pt-12 sm:pt-16 lg:pt-20 border-t-8 border-b-8 border-foreground dark:border-foreground/30 bg-background"
          role="region"
          aria-labelledby="work-heading"
        >
          <Work />
        </section>

        <section id="principles" role="region" aria-labelledby="principles-heading">
          <DecorativeStripes />
          <div className="py-10 sm:py-14 lg:py-20">
            <Principles />
          </div>
          <DecorativeStripes />
        </section>

        <section
          id="community"
          className="pt-10 sm:pt-14 lg:pt-20 border-t-8 border-foreground dark:border-foreground/30 bg-background"
          role="region"
          aria-labelledby="community-heading"
        >
          <Community />
        </section>

        <section
          id="writing"
          className="py-10 sm:py-14 lg:py-20 bg-background"
          role="region"
          aria-labelledby="writing-heading"
        >
          <Writing />
        </section>
      </main>
      <footer
        className="bg-card border-t-8 border-foreground dark:border-foreground/30"
        role="contentinfo"
      >
        <Footer />
      </footer>
    </div>
  );
}

export default function PageLayout({ lang }: { lang: LangKey }) {
  return (
    <LanguageProvider lang={lang}>
      <SiteContent />
    </LanguageProvider>
  );
}
