export type I18nDictionary = {
  seo: {
    title: string;
    description: string;
    locale: string;
  };
  profile: {
    name: string;
    role: string;
    summary: string;
    skillsTitle: string;
    skills: string[];
  };
  profileLife: {
    role: string;
    summary: string;
    skills: string[];
  };
  header: {
    mainNavigation: string;
    skipToMain: string;
    skipToNav: string;
    close: string;
    currentPage: string;
    selected: string;
    menu: {
      label: string;
      aria: string;
    };
    navigation: {
      label: string;
    };
    settings: {
      label: string;
      aria: string;
    };
    languageToggle: {
      label: string;
    };
    themeToggle: {
      label: string;
      options: {
        light: { label: string; aria: string };
        system: { label: string; aria: string };
        dark: { label: string; aria: string };
      };
    };
  };
  hero: {
    ctaPortfolio: string;
    ctaWork: string;
    ctaDivotion: string;
    ctaLinkedin: string;
    aboutWorkTitle: string;
    aboutLifeTitle: string;
    workLinks: { title: string; url: string }[];
    lifeLinks: { title: string; url: string }[];
    philosophyTitle: string;
    philosophyText: string;
  };
  openInNewTab: string;
  workTitle: string;
  otherWorkTitle: string;
  clientLabel: string;
  challengeLabel: string;
  roleLabel: string;
  contributionsLabel: string;
  resultLabel: string;
  cases: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    images: { src: string; alt: string }[];
    imageCaption?: string;
    client: string;
    summary: string;
    role?: string;
    bullets?: string[];
    outcomes: string[];
  }[];
  principlesTitle: string;
  principles: {
    title: string;
    description: string;
    icon: string;
  }[];
  communityTitle: string;
  communitySummary: string;
  community: string[];
  writingTitle: string;
  writing: {
    title: string;
    meta: string;
    link: string;
  }[];
  readMore: string;
  footerAllRights: string;
  langToggle: string;
  noscript: {
    message: string;
  };
};

export type LangKey = "en" | "nl";
