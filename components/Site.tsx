"use client";
import React from "react";
import type { LangKey } from "@/lib/i18n";
import HeroCarousel from "@/components/HeroCarousel";
import Work from "@/components/Work";
import DesignPhilosophy from "@/components/DesignPhilosophy";
import Community from "@/components/Community";
import Principles from "@/components/Principles";
import Nav from "@/components/Nav";
import Writing from "@/components/Writing";
import Footer from "@/components/Footer";
import DecorativeStripes from "@/components/DecorativeStripes";
import { LanguageProvider, useLanguage } from "@/lib/LanguageContext";

function SiteContent() {
  const [dark, setDark] = React.useState(false);
  const [showHeaderBorder, setShowHeaderBorder] = React.useState(false);
  const { lang, t } = useLanguage();

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
  }, [dark]);

  React.useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.title = t.seo.title;
  }, [lang, t.seo.title]);

  React.useEffect(() => {
    // Enable compact header and nav underline only after the hero (work+life) is fully passed
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // When the hero is no longer visible at all, show the header border and shrink height
        setShowHeaderBorder(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-foreground antialiased bg-card">
      {/* Skip Links for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-primary text-primary-foreground px-4 py-2 font-medium"
      >
        Skip to main content
      </a>
      <a 
        href="#navigation" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-32 z-50 bg-primary text-primary-foreground px-4 py-2 font-medium"
      >
        Skip to navigation
      </a>
      
      <header
        id="navigation"
        role="banner"
        className={`sticky top-0 z-40 backdrop-blur h-16 transition-all duration-200 ${showHeaderBorder ? 'border-b border-border' : ''}`}
      >
        <Nav dark={dark} setDark={setDark} afterHero={showHeaderBorder} />
      </header>

      <main id="main-content" role="main">
        <section 
          id="hero"
          className="border-b-8 border-foreground bg-card px-5 md:px-8 lg:px-12 pb-6 md:pb-8 lg:pb-12"
          role="region"
          aria-labelledby="hero-heading"
        >
          <HeroCarousel />
        </section>
        
        <section 
          id="philosophy"
          role="region"
          aria-labelledby="philosophy-heading"
        >
          <DecorativeStripes />
          <div className="py-10 sm:py-14 lg:py-20">
          <DesignPhilosophy />
          </div>
          <DecorativeStripes />
        </section>
        

        <section 
          id="featured" 
          className="pt-12 sm:pt-16 lg:pt-20 border-t-8 border-b-8 border-foreground bg-background"
          role="region"
          aria-labelledby="work-heading"
        >          
          <Work />
        </section>


        <section 
          id="principles"
          role="region"
          aria-labelledby="principles-heading"
        >
          <DecorativeStripes />
          <div className="py-10 sm:py-14 lg:py-20">
            <Principles />
          </div>
          <DecorativeStripes />
        </section>
        

        <section 
          id="community" 
          className="pt-10 sm:pt-14 lg:pt-20 border-t-8 border-foreground bg-background"
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
        className="bg-card border-t-8 border-foreground"
        role="contentinfo"
      >
        <Footer />
      </footer>
    </div>
  );
}

export default function Site({ lang }: { lang: LangKey }) {
  return (
    <LanguageProvider lang={lang}>
      <SiteContent />
    </LanguageProvider>
  );
}