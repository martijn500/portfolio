export const i18n = {
  nl: {
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
      menuLabel: "Menu",
      settingsLabel: "Instellingen",
      languageToggle: {
        label: "Taal",
        aria: "Wissel taal",
      },
      themeToggle: {
        label: "Thema",
        options: {
          light: {
            short: "Licht",
            aria: "Schakel naar licht thema",
          },
          system: {
            short: "Auto",
            aria: "Volg het systeemthema",
          },
          dark: {
            short: "Donker",
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
      toggleWorkToLife: "wissel naar persoonlijk leven",
      toggleLifeToWork: "wissel naar werk leven",
      viewingWork: "Je bekijkt mijn werk leven -",
      viewingLife: "Je bekijkt mijn persoonlijk leven -",
    },
    workTitle: "Werk",
    featured: {
      title: "Uitgelicht: Scaling with Design Tokens",
      period: "2022 → 2025",
      clientLabel: "Klant",
      challengeLabel: "Challenge",
      roleLabel: "Rol",
      contribLabel: "Mijn bijdrage",
      resultLabel: "Resultaat",
      client: "BMW Group",
      challenge:
        "Evolueer het design system met tokens om efficiency te verhogen, consistentie te borgen en meerdere brands te ondersteunen.",
      role: "Tech Lead UX: UX-roadmap eigenaarschap, toegankelijkheidsstandaarden, schaalbaar design system, coaching en vertegenwoordiging in productvisie.",
      bullets: [
        "Token-architectuur (kleur, typografie, spacing, states, theming)",
        "Figma ↔ Storybook synchronisatie + CI/CD publishing",
        "Governance en change control over 15+ apps",
        "Reusable componenten met duidelijke variants & states",
      ],
      results: [
        "Snellere delivery door hergebruik van componenten en tokens",
        "Langdurige alignment tussen UX, business en development",
        "Minder inconsistenties over 15+ apps",
      ],
    },
    otherWorkTitle: "Meer werk",
    otherCases: [
      {
        id: "alphabet-v1",
        client: "Alphabet (BMW Group)",
        title: "Alphabet Design System",
        period: "2020 → 2023",
        image: "alphabet-1.png",
        summary:
          "Transitie naar nieuwe corporate stijl. Richting gegeven aan consistentie, typografie, kleur en componentbibliotheek met WCAG-baseline.",
        outcomes: [
          "Adoptie ontwerpprincipes over 15+ applicaties",
          "Baseline WCAG 2.1 AA",
          "Snellere feature delivery door herbruikbare patterns",
        ],
      },
      {
        id: "philips-lighting",
        client: "Signify / Philips Lighting",
        title: "Signify InterAct Platform",
        period: "2015 → 2017",
        image: "signify.png",
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
        period: "2013 → 2015",
        image: "ing.png",
        summary:
          "Tablet-portal voor on-site klantenservice. Focus op duidelijkheid, snelheid en compliance in compacte touch-UI.",
        outcomes: [
          "Account-opening on-site zonder desktop",
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
        description:
          "Denk in tokens, componenten en governance om schaalbaar te blijven.",
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
        title:
          "Omgaan met groeiende gebruikersverwachtingen in enterprise omgevingen",
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
    footerAllRights: (name: string) =>
      `© ${new Date().getFullYear()} ${name}. Alle rechten voorbehouden.`,
    langToggle: "EN",
  },
  en: {
    seo: {
      title: "Martijn van der Wijst - Tech Lead UX, Frontend & Design Systems",
      description:
        "UX specialist with a frontend background. Design systems, tokens, accessibility, Figma ↔ Storybook, enterprise governance.",
      locale: "en_US",
    },
    profile: {
      name: "Martijn van der Wijst",
      role: "Hi, I'm Martijn van der Wijst. Tech Lead UX, Frontend Architect spending a lot of time with Design Systems.",
      summary:
        "I’m a UX specialist with a background in frontend development. \
I bridge the gap between design and technology, creating digital products that are inclusive, intuitive, and scalable. \
My work combines research-driven decisions with a clear sense for simplicity and consistency, \
making sure solutions work for users and development teams alike.",
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
      role: "Proud father of two, futsal player and serial hobbyist.",
      summary:
        "Outside of work, I enjoy time with my family, a game of futsal with friends (where the third half is just as important as the first two), or temporary hobbies like stargazing, sourdough baking and learning piano. \
Lasting hobbies include cooking, snowboarding, festivals and movie nights, and I tend to research everything thoroughly. Like vacations or a new kettle.",
      skills: [
        "Family Life",
        "Watching Films",
        "Cooking",
        "Bread Baking",
        "Futsal",
        "Learning Piano",
        "Stargazing",
        "Snowboarding",
        "Nature",
        "Tuscany",
      ],
    },
    header: {
      menuLabel: "Menu",
      settingsLabel: "Settings",
      languageToggle: {
        label: "Language",
        aria: "Switch language",
      },
      themeToggle: {
        label: "Theme",
        options: {
          light: {
            short: "Light",
            aria: "Switch to light theme",
          },
          system: {
            short: "Auto",
            aria: "Follow the system theme",
          },
          dark: {
            short: "Dark",
            aria: "Switch to dark theme",
          },
        },
      },
    },
    hero: {
      ctaPortfolio: "Portfolio",
      ctaWork: "View my work",
      ctaDivotion: "Divotion",
      ctaLinkedin: "LinkedIn",
      aboutWorkTitle: "Work life",
      aboutLifeTitle: "Free time",
      workLinks: [
        { title: "View my work", url: "#featured" },
        {
          title: "Portfolio",
          url: "https://www.figma.com/deck/ltOQAl9YHQeNbxipQIt2jD/portfolio",
        },
        {
          title: "LinkedIn",
          url: "https://www.linkedin.com/in/martijnvanderwijst/",
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
        "I turn complexity into clarity. My design brain thrives on making digital products feel effortless. Inclusive for everyone, intuitive to use, and strong enough under the hood to scale with ease.",
      toggleWorkToLife: "switch to personal life",
      toggleLifeToWork: "switch to work life",
      viewingWork: "You're viewing my work life -",
      viewingLife: "You're viewing my personal life -",
    },
    workTitle: "Work",
    featured: {
      title: "Featured: Scaling with Design Tokens",
      period: "2022 → 2025",
      clientLabel: "Client",
      challengeLabel: "Challenge",
      roleLabel: "Role",
      contribLabel: "Contributions",
      resultLabel: "Results",
      client: "BMW Group",
      challenge:
        "Evolve the design system with tokens to boost efficiency, maintain consistency, and support multiple brands.",
      role: "Tech Lead UX: owned the UX roadmap, introduced accessibility standards, scaled the design system, coached teams, and represented design in product vision.",
      bullets: [
        "Token architecture (color, type, spacing, states, theming)",
        "Figma ↔ Storybook sync + CI/CD publishing",
        "Governance & change control across 15+ apps",
        "Reusable components with clear variants & states",
      ],
      results: [
        "Faster delivery via reusable components and tokens",
        "Long-term alignment between UX, business, and engineering",
        "Reduced inconsistencies across 15+ apps",
      ],
    },
    otherWorkTitle: "More work",
    otherCases: [
      {
        id: "alphabet-v1",
        client: "Alphabet",
        title: "Alphabet Design System",
        period: "2020 → 2022",
        image: "alphabet-1.png",
        summary:
          "Transition to the new corporate design. Established consistency in type, color, and components with a WCAG baseline.",
        outcomes: [
          "Adoption of design principles across 15+ apps",
          "WCAG 2.1 AA baseline",
          "Faster feature delivery via reusable patterns",
        ],
      },
      {
        id: "philips-lighting",
        client: "Signify / Philips Lighting",
        title: "Signify InterAct Platform",
        period: "2015 → 2017",
        image: "signify.png",
        summary:
          "Shaped UX architecture and reusable components for the InterAct smart lighting platform. Active role in design taskforce with focus on interaction design and usability testing.",
        outcomes: [
          "Reusable UI components for multi-application landscape",
          "Scalable design patterns and interaction design",
          "Active role in UI/UX Design Taskforce and usability testing",
          "Bridge between user insights, UX guidelines, and technical implementation",
        ],
      },
      {
        id: "ing",
        client: "ING",
        title: "ING Mobile Services Portal",
        period: "2013 → 2015",
        image: "ing.png",
        summary:
          "Tablet portal for on-site client assistance. Focus on clarity, speed, and compliance in a compact touch UI.",
        outcomes: [
          "On-site account opening without desktop",
          "Validated designs for large/small layouts",
          "Higher efficiency and staff confidence",
        ],
      },
    ],
    principlesTitle: "Principles",
    principles: [
      {
        title: "Clarity over cleverness",
        description:
          "Clear language and patterns that minimize cognitive load.",
        icon: "Eye",
      },
      {
        title: "System over pages",
        description:
          "Think in tokens, components, and governance to stay scalable.",
        icon: "Layers",
      },
      {
        title: "Accessible by default",
        description:
          "WCAG baseline; keyboard, contrast, semantics, and readability are non-negotiable.",
        icon: "Accessibility",
      },
    ],
    communityTitle: "Community & Leadership",
    communitySummary:
      "Beyond my daily work, I'm actively involved in the frontend and UX community. I believe in knowledge sharing, mentorship, and helping others grow in our field. Below are some examples to demonstrate my involvement.",
    community: [
      "Member of the Frontmania program committee and MC for the annual conference",
      "Founder and lead of UX and Frontend communities",
      "Organizer of internal and external events, meetups and hackathons at Divotion",
      "Led client workshops and discovery sessions",
      "Instructor of Angular and Vue workshops",
      "Organizer of Figma knowledge-sharing sessions",
      "Speaker on UX & design systems at internal and community events",
      "Mentor and founder of Divotion's junior traineeship program",
    ],
    writingTitle: "Writing & Talks",
    writing: [
      {
        title: "UX at Divotion",
        meta: "Blog",
        link: "https://www.divotion.com/blog/ux-bij-divotion",
      },
      {
        title:
          "How to cope with growing user expectations in an enterprise environment",
        meta: "Blog",
        link: "https://www.divotion.com/blog/how-to-cope-with-growing-user-expectations-in-an-enterprise-environment",
      },
      {
        title: "Route to the mobility of the future",
        meta: "Featured",
        link: "https://www.divotion.com/cases/bmw-financial-services",
      },
      {
        title: "Platform for smart lighting",
        meta: "Featured",
        link: "https://www.divotion.com/cases/philips-lighting",
      },
    ],
    readMore: "Read Article",
    footerAllRights: (name: string) =>
      `© ${new Date().getFullYear()} ${name}. All rights reserved.`,
    langToggle: "NL",
  },
} as const;
export type LangKey = keyof typeof i18n; // "nl" | "en"
