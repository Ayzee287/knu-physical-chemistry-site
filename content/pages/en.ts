// English content layer — the international accessibility layer and the
// canonical dictionary SHAPE. Ukrainian (ua.ts) is the source-of-truth language
// and is type-checked against this shape. EN follows British academic spelling.

export const en = {
  meta: {
    title:
      "Department of Physical Chemistry — Taras Shevchenko National University of Kyiv",
    description:
      "The Department of Physical Chemistry at the Faculty of Chemistry, Taras Shevchenko National University of Kyiv — founded in 1905; catalysis, thermodynamics of melts, coordination chemistry.",
  },

  ui: {
    menu: "Menu",
    skip: "Skip to content",
    primaryNav: "Primary navigation",
    languageNav: "Language",
    opensInNewTab: "opens in a new tab",
  },

  brand: {
    short: "Physical Chemistry · KNU",
    full: "Department of Physical Chemistry",
  },

  nav: [
    { label: "About", href: "/about" },
    { label: "People", href: "/staff" },
    { label: "Research", href: "/research" },
    { label: "Contacts", href: "/contacts" },
  ],

  home: {
    hero: {
      eyebrow: "KNU · Faculty of Chemistry",
      title: "Department of Physical Chemistry",
      statement: "The science of why chemical change happens.",
      lead: "Thermodynamics, kinetics and the structure of matter — the quantitative foundations of chemistry, taught and studied at Taras Shevchenko National University of Kyiv.",
      ctaResearch: "Research areas",
      ctaStaff: "People",
      foundedLabel: "Founded",
      metaFacultyLabel: "Faculty",
      metaUniversityLabel: "University",
      metaLocationLabel: "Location",
    },
    research: {
      eyebrow: "Research",
      title: "Directions of scientific work",
      // The confirmation posture lives in the /research scope note; the
      // homepage digest does not repeat process language (D020).
      lead: "The department's directions as published in its own record — from surface chemistry and catalysis to the thermodynamics of melts.",
      cta: "About the research",
    },
    leaders: {
      eyebrow: "People",
      title: "Research leadership",
      lead: "The department's directions are carried by the research groups of its professors — from coordination chemistry to the structure of melts.",
      cta: "All academic staff",
    },
    recognition: {
      eyebrow: "Recognition",
      title: "Results and recognition",
      lead: "Selected results, projects and honours, from the department's own published record.",
    },
    department: {
      eyebrow: "The department",
      title: "More than a century of physical chemistry",
      body: [
        "The department was founded in 1905, and its scientific history spans the thermodynamics of solutions, surface physical chemistry, catalysis and the chemistry of melts.",
        "Today it works within the Faculty of Chemistry of Taras Shevchenko National University of Kyiv, alongside the departments of inorganic, organic, analytical and macromolecular chemistry.",
      ],
      cta: "About the department",
      lineageTitle: "Heads of the department",
      numbers: {
        title: "The department in numbers",
        founded: "Founded",
        school: "Scientific school since",
        groups: "Research groups",
        dissertations: "Dissertations within the school",
      },
    },
    contact: {
      eyebrow: "Contacts",
      title: "Getting in touch",
      lead: "The department's phone and email, the building address and the official resources are on the contacts page.",
      cta: "All contacts",
    },
  },

  about: {
    meta: {
      title: "About the department",
      description:
        "The Department of Physical Chemistry — founded in 1905, one of five departments of the Faculty of Chemistry, Taras Shevchenko National University of Kyiv.",
    },
    intro: {
      eyebrow: "About the department",
      title: "Department of Physical Chemistry",
      lead: "Founded in 1905. One of five departments of the Faculty of Chemistry of Taras Shevchenko National University of Kyiv.",
    },
    epigraph:
      "Physical chemistry explains why chemical change happens the way it does — in the language of thermodynamics, kinetics and the structure of matter.",
    body: [
      "Physical chemistry sits where chemistry meets physics and mathematics. It gives chemical phenomena their quantitative form: the energetics of transformations, the rates of reactions, the behaviour of matter at interfaces and in solution.",
      "Physico-chemical disciplines are a required part of a university chemical education, and within the faculty this part of the curriculum is carried by the Department of Physical Chemistry.",
      "The content of these pages draws on the department's own published materials and is refined together with the department. The presentation is deliberately curated — leadership, leading faculty and the research groups that carry the department's work — rather than a full staff listing.",
    ],
    leadership: {
      eyebrow: "Faculty",
      title: "Within the Faculty of Chemistry",
      body: "The department works within the Faculty of Chemistry, whose teaching and research across all its departments are coordinated by the dean's office.",
      facultyCta: "Faculty of Chemistry website",
    },
    history: {
      eyebrow: "History",
      title: "The department since 1905",
      lead: "A century of physical chemistry in Kyiv, through the work of the scientists who led the department.",
      sourceNote:
        "Compiled from the department's published history; being confirmed with the department.",
    },
    linksTitle: "Official resources",
  },

  staff: {
    meta: {
      title: "People",
      description:
        "Academic staff of the Department of Physical Chemistry, Taras Shevchenko National University of Kyiv.",
    },
    intro: {
      eyebrow: "People",
      title: "Academic staff",
      lead: "The head of department and its leading faculty.",
    },
    headSection: "Head of Department",
    featuredSection: "Leading faculty",
    rosterSection: "Teaching and research staff",
    rosterPending:
      "Profiles of the department's other staff are added as records are confirmed with the department. The full roster of record is available on the department's official website.",
    rosterCta: "Official department website",
  },

  research: {
    meta: {
      title: "Research",
      description:
        "Research directions of the Department of Physical Chemistry, Taras Shevchenko National University of Kyiv: catalysis and surface chemistry, thermodynamics of melts, coordination and bioinorganic chemistry, dispersed systems.",
    },
    intro: {
      eyebrow: "Research",
      title: "Research directions",
      lead: "The department's research profile, from its own published record.",
    },
    profileNote:
      "Directions and groups are given after the department's published profile (June 2026 sources) and are being confirmed with the department.",
    groups: {
      eyebrow: "Research groups",
      title: "The groups behind the directions",
      lead: "Six research groups carry the department's scientific programme.",
    },
    school: {
      eyebrow: "Scientific school",
      worksTitle: "Selected textbooks and monographs",
      worksNote:
        "Ukrainian-language editions, cited as the department's materials cite them; the school's full publication list is kept in the source record.",
    },
  },

  contacts: {
    meta: {
      title: "Contacts",
      description:
        "How to reach the Department of Physical Chemistry at the Faculty of Chemistry, Taras Shevchenko National University of Kyiv.",
    },
    intro: {
      eyebrow: "Contacts",
      title: "Department contacts",
      lead: "The department is located in the Faculty of Chemistry building; departmental and faculty contacts are below.",
    },
    labels: {
      address: "Address",
      departmentPhone: "Department phone",
      departmentEmail: "Department email",
      phone: "Faculty phone",
      email: "Faculty email",
      official: "Official resources",
    },
  },

  footer: {
    navTitle: "Sections",
    officialTitle: "Official resources",
    founded: "Founded in 1905",
  },
};
