"use client";
import React from "react";
import NavLink from "@/components/layout/nav-link";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { scrollHeroToSection } from "@/lib/scroll-hero";
import { useLanguage } from "@/lib/context/language-context";
import { Briefcase, Palmtree, Lightbulb, Star, Target, Users } from "lucide-react";

interface NavigationProps {
  afterHero: boolean;
  onBorderUpdate?: (borderInfo: { left: number; width: number } | null) => void;
}

export function Navigation({ afterHero, onBorderUpdate }: NavigationProps) {
  const { t } = useLanguage();
  const activeSection = useActiveSection();
  const navRef = React.useRef<HTMLDivElement>(null);
  const [borderStyle, setBorderStyle] = React.useState({ left: 0, width: 0 });

  const sections = [
    { id: "about-work", label: t.hero.aboutWorkTitle, icon: Briefcase },
    { id: "about-life", label: t.hero.aboutLifeTitle, icon: Palmtree },
    { id: "philosophy", label: t.hero.philosophyTitle, icon: Lightbulb },
    { id: "featured", label: t.workTitle, icon: Star },
    { id: "principles", label: t.principlesTitle, icon: Target },
    { id: "community", label: t.communityTitle, icon: Users },
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
          left: rect.left - navRect.left - 8, // -8px for -left-2
          width: rect.width + 16, // +16px for left and right padding
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
    window.addEventListener("resize", updateBorderPosition);
    return () => window.removeEventListener("resize", updateBorderPosition);
  }, [activeSection, onBorderUpdate]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const didScroll = scrollHeroToSection(id);
    if (didScroll) {
      event.preventDefault();
    }
  };

  return (
    <div ref={navRef} className="hidden md:flex items-center h-full relative" role="menubar">
      {/* Animated border */}
      <div
        className={`absolute bottom-0 h-2 rounded-t-md transition-all duration-300 ease-in-out ${
          afterHero ? "border-l border-r border-t border-foreground/30" : ""
        } ${
          activeSection === "about-work" || activeSection === "about-life" ? "bg-background" : ""
        }`}
        style={{
          left: `${borderStyle.left}px`,
          width: `${borderStyle.width}px`,
          display: borderStyle.width > 0 ? "block" : "none",
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
  );
}
