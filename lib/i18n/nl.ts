import type { I18nDictionary } from "./types";

export const nl: I18nDictionary = {
  seo: {
    title: "Martijn van der Wijst - Tech Lead UX, Frontend & Design Systems",
    description:
      "UX-specialist met frontend-achtergrond. Design systems, tokens, accessibility, Figma ↔ Storybook, enterprise governance.",
    locale: "nl_NL",
  },
  profile: {
    name: "Martijn van der Wijst",
    role: "Hi, ik ben Martijn van der Wijst. Tech Lead UX, Frontend Architect en druk met Design Systems.",
    summary:
      "Ik ben een UX-specialist met een achtergrond in frontend development. \
Ik overbrug de kloof tussen design en technologie en creëer digitale producten die inclusief, intuïtief en schaalbaar zijn. \
Mijn werk combineert onderzoek-gedreven keuzes met een scherp gevoel voor eenvoud en consistentie, \
zodat oplossingen goed werken voor zowel gebruikers als developmentteams.",
    skillsTitle: "Skills",
    skills: [
      "Design Systems",
      "Design Tokens",
      "Accessibility (WCAG)",
      "Angular / Nx",
      "Figma ↔ Storybook",
      "DesignOps / Governance",
      "Developer hand-off",
      "Mentoring",
    ],
  },
  profileLife: {
    role: "Gelukkige vader van twee, futsaller en chronische hobby-wisselaar",
    summary:
      "Buiten werk geniet ik van tijd met mijn gezin, een potje futsal met vrienden (waarbij 3 helften belangrijk zijn), of tijdelijke hobby's zoals sterrenkijken, zuurdesembroden bakken en piano leren spelen. \
  Blijvende hobby's zijn koken, snowboarden, festivals en filmavonden en daarnaast heb ik een neiging om alles tot op de bodem uit te zoeken. Zoals vakanties of een nieuwe waterkoker.",
    skills: [
      "Gezinsleven",
      "Films kijken",
      "Koken",
      "Brood bakken",
      "Futsal",
      "Piano leren",
      "Sterrenkijken",
      "Snowboarden",
      "Natuur",
      "Toscane",
    ],
  },
  header: {
    mainNavigation: "Hoofdnavigatie",
    skipToMain: "Spring naar hoofdinhoud",
    skipToNav: "Spring naar navigatie",
    close: "Sluiten",
    currentPage: " (huidige pagina)",
    selected: " (geselecteerd)",
    menu: {
      label: "Menu",
      aria: "Open navigatie en instellingen",
    },
    navigation: {
      label: "Navigatie",
    },
    settings: {
      label: "Instellingen",
      aria: "Open taal en thema voorkeuren",
    },
    languageToggle: {
      label: "Taal",
    },
    themeToggle: {
      label: "Thema",
      options: {
        light: {
          label: "Licht",
          aria: "Schakel naar licht thema",
        },
        system: {
          label: "Auto",
          aria: "Volg het systeemthema",
        },
        dark: {
          label: "Donker",
          aria: "Schakel naar donker thema",
        },
      },
    },
  },
  hero: {
    ctaPortfolio: "Portfolio",
    ctaWork: "Bekijk mijn werk",
    ctaDivotion: "Divotion",
    ctaLinkedin: "LinkedIn",
    aboutWorkTitle: "Werkleven",
    aboutLifeTitle: "Vrije tijd",
    workLinks: [
      { title: "Bekijk mijn werk", url: "#featured" },
      {
        title: "Portfolio",
        url: "https://www.figma.com/deck/ltOQAl9YHQeNbxipQIt2jD/portfolio",
      },
      {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/martijnvanderwijst/",
      },
      {
        title: "GitHub",
        url: "https://github.com/martijn500",
      },
    ],
    lifeLinks: [
      {
        title: "Instagram",
        url: "https://www.instagram.com/martijnvanderwijst/",
      },
      {
        title: "MovieMeter",
        url: "https://www.moviemeter.nl/user/12402",
      },
    ],
    philosophyTitle: "Design Philosophy",
    philosophyText:
      "Ik schep orde in complexiteit. Digitale producten moeten moeiteloos aanvoelen, voor iedereen. Intuïtief in gebruik en onder de motorkap sterk genoeg om eenvoudig op te schalen.",
  },
  openInNewTab: "opent in nieuw tabblad",
  workTitle: "Werk",
  otherWorkTitle: "Meer werk",
  clientLabel: "Klant",
  challengeLabel: "Challenge",
  roleLabel: "Rol",
  contributionsLabel: "Mijn bijdrage",
  resultLabel: "Resultaat",
  cases: [
    {
      id: "bmwgroup",
      title: "Uitgelicht: Scaling with Design Tokens",
      startDate: "2022",
      endDate: "2025",
      images: [
        {
          src: "/bmwgroup-1.png",
          alt: "BMW Group Design System - Storybook documentatie van de componentbibliotheek met design tokens en componenten",
        },
        {
          src: "/bmwgroup-2.png",
          alt: "BMW Group Design System - Figma prototype gebruikmakend van Design System",
        },
        {
          src: "/bmwgroup-3.png",
          alt: "BMW Group Design System - Token architectuur overzicht met kleur, typografie en spacing tokens",
        },
      ],
      imageCaption:
        "BMW Group Design System screenshots die de componentbibliotheek en implementatie tonen.",
      client: "BMW Group",
      summary:
        "Evolueer het design system met tokens om efficiëntie te verhogen, consistentie te borgen en meerdere brands te ondersteunen.",
      role: "Tech Lead UX: UX-roadmap eigenaarschap, toegankelijkheidsstandaarden, schaalbaar design system, coaching en vertegenwoordiging in productvisie.",
      bullets: [
        "Token-architectuur (kleur, typografie, afstanden, groottes, thema's)",
        "Figma ↔ Storybook synchronisatie + CI/CD publishing",
        "Governance en change control over 15+ apps",
        "Herbruikbare componenten met duidelijke varianten & statussen",
      ],
      outcomes: [
        "Snellere levering door hergebruik van componenten en tokens",
        "Langdurige samenwerking tussen UX, business en development",
        "Minder inconsistenties bij 15+ applicaties",
      ],
    },
    {
      id: "alphabet-v1",
      client: "Alphabet (BMW Group)",
      title: "Alphabet Design System",
      startDate: "2020",
      endDate: "2023",
      images: [
        {
          src: "/alphabet-1.png",
          alt: "Alphabet Design System - component overzicht en typografische richtlijnen",
        },
      ],
      summary:
        "Transitie naar nieuwe corporate stijl. Richting gegeven aan consistentie, typografie, kleur en componentbibliotheek met WCAG-baseline.",
      outcomes: [
        "Adoptie ontwerpprincipes over 15+ applicaties",
        "Baseline WCAG 2.1 AA",
        "Snellere uitrol van nieuwe functies door herbruikbare patronen",
      ],
    },
    {
      id: "philips-lighting",
      client: "Signify / Philips Lighting",
      title: "Signify InterAct Platform",
      startDate: "2015",
      endDate: "2017",
      images: [
        {
          src: "/signify.png",
          alt: "Signify InterAct Platform - dashboard en slimme verlichting integraties",
        },
      ],
      summary:
        "Vormgegeven aan UX-architectuur en herbruikbare componenten voor het InterAct smart lighting platform. Actieve rol in design taskforce met focus op interaction design en usability testing.",
      outcomes: [
        "Herbruikbare UI-componenten voor multi-applicatielandschap",
        "Schaalbare design patterns en interaction design",
        "Actieve rol in UI/UX Design Taskforce en usability testing",
        "Brug tussen gebruikersinzichten, UX-richtlijnen en technische realisatie",
      ],
    },
    {
      id: "ing",
      client: "ING",
      title: "ING Mobile Services Portal",
      startDate: "2013",
      endDate: "2015",
      images: [
        {
          src: "/ing.png",
          alt: "ING Mobile Services Portal - tablet portal interface voorbeelden",
        },
      ],
      summary:
        "Tablet-portal voor on-site klantenservice. Focus op duidelijkheid, snelheid en compliance in compacte touch-UI.",
      outcomes: [
        "On-site account opening zonder desktop",
        "Verbeterde usability voor groot/klein scherm",
        "Hogere efficiëntie en vertrouwen bij medewerkers",
      ],
    },
  ],
  principlesTitle: "Principes",
  principles: [
    {
      title: "Helderheid boven slimheid",
      description:
        "Heldere interacties en taal, consistente patronen, minimale cognitieve belasting.",
      icon: "Eye",
    },
    {
      title: "Systeem boven pagina's",
      description: "Denk in tokens, componenten en governance om schaalbaar te blijven.",
      icon: "Layers",
    },
    {
      title: "Toegankelijk by default",
      description:
        "WCAG als baseline; toetsenbord, contrast, semantiek en leesbaarheid zijn non-negotiable.",
        icon: "Accessibility",
      },
    ],
  communityTitle: "Community & Leadership",
  communitySummary:
    "Naast mijn dagelijkse werk ben ik actief betrokken bij de frontend en UX community. Ik geloof in kennisdeling, mentorship en het helpen groeien van anderen in het vakgebied. Hieronder staan enkele voorbeelden ter demonstratie van mijn betrokkenheid.",
  community: [
    "Lid van het Frontmania programmacommittee en MC voor de jaarlijkse conferentie",
    "Oprichter en leider van UX en Frontend communities",
    "Organisator van interne en externe events, meetups en hackathons bij Divotion",
    "Leidde klant workshops en discovery sessies",
    "Instructeur van Angular en Vue workshops",
    "Organisator van Figma kennisdelingssessies",
    "Spreker over UX & design systems bij interne en community events",
    "Mentor en oprichter van Divotion's junior traineeship programma",
  ],
  writingTitle: "Writing & Talks",
  writing: [
    {
      title: "UX bij Divotion",
      meta: "Blog",
      link: "https://www.divotion.com/blog/ux-bij-divotion",
    },
    {
      title: "Omgaan met groeiende gebruikersverwachtingen in enterprise omgevingen",
      meta: "Blog",
      link: "https://www.divotion.com/blog/how-to-cope-with-growing-user-expectations-in-an-enterprise-environment",
    },
    {
      title: "Route naar de mobiliteit van de toekomst",
      meta: "Featured",
      link: "https://www.divotion.com/cases/bmw-financial-services",
    },
    {
      title: "Platform voor slimme verlichting",
      meta: "Featured",
      link: "https://www.divotion.com/cases/philips-lighting",
    },
  ],
  readMore: "Lees Artikel",
  footerAllRights: "Alle rechten voorbehouden.",
  langToggle: "EN",
  noscript: {
    message:
      "Deze site werkt het beste met JavaScript ingeschakeld — de inhoud blijft toegankelijk, maar sommige interactieve functies kunnen uitgeschakeld zijn.",
  },
};
