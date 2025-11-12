import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Special handling for carousel sections
    const handleScroll = () => {
      // Find the carousel container by looking for the parallax container
      const heroContainer = document.querySelector(".lg\\:h-\\[200vh\\]");

      if (heroContainer) {
        const rect = heroContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress matching Framer Motion's offset: ["start start", "end end"]
        // This means: start when container top hits viewport top, end when container bottom hits viewport bottom
        const scrollStart = 0; // When top of container reaches top of viewport
        const scrollEnd = rect.height - viewportHeight; // When bottom of container reaches bottom of viewport
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollEnd));

        // Determine if we're in the carousel area (container is in viewport)
        if (rect.top <= viewportHeight * 0.3 && rect.bottom >= viewportHeight * 0.3) {
          // We're scrolling through the carousel
          // Switch at 0.5 to match the image transition in HeroCarousel
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
      const sections = [
        { id: "philosophy", element: document.getElementById("philosophy") },
        { id: "featured", element: document.getElementById("featured") },
        { id: "principles", element: document.getElementById("principles") },
        { id: "community", element: document.getElementById("community") },
      ].filter((s) => s.element !== null);

      // Find which section is in view
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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
}
