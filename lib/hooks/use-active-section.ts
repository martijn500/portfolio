import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    let ticking = false;

    // Cache elements
    const heroContainer = document.querySelector(".lg\\:h-\\[200vh\\]");
    const sections = [
      { id: "philosophy", element: document.getElementById("philosophy") },
      { id: "featured", element: document.getElementById("featured") },
      { id: "principles", element: document.getElementById("principles") },
      { id: "community", element: document.getElementById("community") },
    ].filter((s) => s.element !== null);

    const updateActiveSection = () => {
      // Special handling for carousel sections
      if (heroContainer) {
        const rect = heroContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const scrollEnd = rect.height - viewportHeight;
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollEnd));

        if (rect.top <= viewportHeight * 0.3 && rect.bottom >= viewportHeight * 0.3) {
          if (scrollProgress < 0.5) {
            setActiveSection("about-work");
            return;
          } else {
            setActiveSection("about-life");
            return;
          }
        }
      }

      // Fallback for other sections
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(section.id);
            return;
          }
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return activeSection;
}
