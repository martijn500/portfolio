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

function SiteContent() {
  const [dark, setDark] = React.useState(false);
  const [showHeaderBorder, setShowHeaderBorder] = React.useState(false);
  const [activeBorderInfo, setActiveBorderInfo] = React.useState<{ left: number; width: number } | null>(null);
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
    // Show header border as soon as the "Free time" section starts to scroll out of view
    // Only applies to large screens (lg+), on smaller screens border is always visible
    const aboutLife = document.getElementById("about-life");
    if (!aboutLife) return;

    const checkScreenSize = () => {
      const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
      
      if (!isLargeScreen) {
        // On small/medium screens, always show border
        setShowHeaderBorder(true);
        return;
      }

      // On large screens, use IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setShowHeaderBorder(!entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '100px 0px 0px 0px',
          threshold: 1.0,
        }
      );

      observer.observe(aboutLife);
      return () => observer.disconnect();
    };

    const cleanup = checkScreenSize();
    
    // Re-check on resize
    window.addEventListener('resize', checkScreenSize);
    return () => {
      cleanup?.();
      window.removeEventListener('resize', checkScreenSize);
    };
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
        className="sticky top-0 z-40 backdrop-blur h-16 transition-all duration-200 relative"
      >
        <Header dark={dark} setDark={setDark} afterHero={showHeaderBorder} onBorderUpdate={setActiveBorderInfo} />
        
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
          className="border-b-8 border-foreground bg-card lg:px-12 lg:pb-12"
          role="region"
          aria-labelledby="hero-heading"
        >
          <Hero />
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

export default function PageLayout({ lang }: { lang: LangKey }) {
  return (
    <LanguageProvider lang={lang}>
      <SiteContent />
    </LanguageProvider>
  );
}