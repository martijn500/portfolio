type HeroSectionId = "about-work" | "about-life";

export type HeroScrollDetail = {
  section: HeroSectionId;
};

export function scrollHeroToSection(sectionId: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (!isHeroSection(sectionId)) {
    return false;
  }

  const heroRoot = document.querySelector<HTMLElement>("[data-hero-root]");
  if (!heroRoot) {
    return false;
  }

  window.dispatchEvent(
    new CustomEvent<HeroScrollDetail>("hero:scroll", {
      detail: { section: sectionId },
    })
  );

  return true;
}

function isHeroSection(value: string): value is HeroSectionId {
  return value === "about-work" || value === "about-life";
}
