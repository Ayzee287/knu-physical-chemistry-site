import type { Locale } from "@/lib/i18n";
import type {
  LocalisedStaffProfile,
  ScholarlyLinks,
  StaffProfile,
} from "@/types/content";
import { claim, fromDeptProfile, fromPhyschem } from "@/lib/provenance";

// Rich research profiles (ADR-0014) — the long-form content behind the
// `/staff/<slug>` pages. SEPARATE from the directory collection (staff.ts) and
// OPTIONAL per person: a member without an entry here still routes, rendering
// the directory-level identity only. Authoring a profile is purely additive —
// add an entry keyed by the StaffMember.id; no code changes (the migration path
// for the remaining staff).
//
// PROVENANCE: the head is sourced from the v3 department profile
// (`fromDeptProfile`). The other ten are sourced from the department's OFFICIAL
// per-person pages and CVs on physchem.knu.ua (`fromPhyschem`), retrieved and
// DECODED from windows-1251 on 2026-06-16 (D029, snapshots under
// source-materials/physchem-knu-ua/perperson/). Review marks carry the
// unverified state in development until a HUMAN confirms each claim with the
// department; nothing here is AI-verified.
//
// HARD EXCLUSIONS (CLAUDE.md / ADR-0001): volatile statistics are NOT recorded
// as publishable fields — no h-index, no publication/citation/dissertation
// counts, no "top-N cited" framing. Honours are recorded only as discrete,
// datable distinctions. Scholarly-profile URLs are recorded only where a real
// address is sourced — never fabricated. Sensitive ties intentionally omitted
// (D029): a Russia internship and a Russian-foundation grant on Роїк's page are
// not published (Ukrainian institution; also conflicted with a second source).

const src = fromDeptProfile;
const pp = fromPhyschem; // official per-person page/CV, decoded from cp1251 (D029)
const confirmNote =
  "Verify with the department; published as sourced under ADR-0005/0014.";

export const profiles: Record<string, StaffProfile> = {
  // Reference implementation — Igor O. Fritsky (directory id "head").
  head: {
    id: "head",
    overview: claim(
      {
        ua: "Завідувач кафедри фізичної хімії з 2005 року, член-кореспондент НАН України. Працює в галузі координаційної хімії перехідних металів — спінові переходи, нетипові ступені окиснення та поліядерні комплекси.",
        en: "Head of the Department of Physical Chemistry since 2005 and a corresponding member of the NAS of Ukraine. He works in the coordination chemistry of transition metals — spin crossover, unusual oxidation states and polynuclear complexes.",
      },
      src(`Framing of facts sourced in this record and the directory. ${confirmNote}`),
    ),
    research: claim(
      {
        ua: "Наукові інтереси охоплюють синтез і дослідження координаційних сполук перехідних металів зі спіновими переходами (Fe(II), Co(II)), стабілізацію нетипово високих ступенів окиснення металів у водних розчинах та поліядерні координаційні системи з прогнозованими магнітними й каталітичними властивостями. Останні застосовують у моделюванні активних центрів металоферментів і для елементів молекулярної електроніки.",
        en: "His research covers the synthesis and study of transition-metal coordination compounds showing spin crossover (Fe(II), Co(II)), the stabilisation of unusually high metal oxidation states in aqueous solution, and polynuclear coordination systems with predictable magnetic and catalytic properties — applied to modelling metalloenzyme active sites and to elements of molecular electronics.",
      },
      src(confirmNote),
    ),
    biography: claim(
      [
        {
          heading: { ua: "Освіта та наукові ступені", en: "Education and degrees" },
          body: {
            ua: [
              "Народився 20 листопада 1964 року в Києві.",
              "Кандидатську дисертацію захистив 1990 року, докторську — 2003 року; докторську роботу присвячено поліядерним координаційним сполукам перехідних металів з азотовмісними лігандами в моделюванні активних центрів металоферментів.",
              "Учене звання професора присвоєно 2005 року; член-кореспондент НАН України — з 2021 року.",
            ],
            en: [
              "Born on 20 November 1964 in Kyiv.",
              "Defended his candidate dissertation in 1990 and his doctoral dissertation in 2003; the doctoral work addressed polynuclear coordination compounds of transition metals with nitrogen-containing ligands as models of metalloenzyme active sites.",
              "Awarded the title of Professor in 2005; corresponding member of the NAS of Ukraine since 2021.",
            ],
          },
        },
        {
          heading: { ua: "Міжнародний досвід", en: "International experience" },
          body: {
            ua: [
              "Стажувався в університетах Лондона, Лідса, Геттінгена, Майнца, Гайдельберга, Севільї та Вроцлава.",
            ],
            en: [
              "Held research stays at the universities of London, Leeds, Göttingen, Mainz, Heidelberg, Seville and Wrocław.",
            ],
          },
        },
      ],
      src(
        `Dates and dissertation themes from the department profile; exact titles to be confirmed. ${confirmNote}`,
      ),
    ),
    achievements: claim(
      [
        {
          year: "2021",
          text: {
            ua: "Член-кореспондент НАН України",
            en: "Corresponding Member of the NAS of Ukraine",
          },
        },
        {
          year: "2007",
          text: {
            ua: "Державна премія України в галузі науки і техніки",
            en: "State Prize of Ukraine in Science and Technology",
          },
        },
        {
          text: {
            ua: "Премія Георга Форстера (Фонд Александра фон Гумбольдта, ФРН)",
            en: "Georg Forster Award (Alexander von Humboldt Foundation, Germany)",
          },
        },
      ],
      src(
        `Discrete, datable distinctions only — no counts. Förster award corroborated by knu.ua/news/12877. ${confirmNote}`,
      ),
    ),
    courses: claim(
      {
        ua: [
          "Фізична хімія",
          "Біофізична хімія",
          "Фізико-хімія координаційних сполук",
          "Хімічна ензимологія",
          "Магнетохімія",
          "Хімія металопротеїнів",
        ],
        en: [
          "Physical Chemistry",
          "Biophysical Chemistry",
          "Physical Chemistry of Coordination Compounds",
          "Chemical Enzymology",
          "Magnetochemistry",
          "Chemistry of Metalloproteins",
        ],
      },
      src(`Course titles as listed by the department. ${confirmNote}`),
    ),
    office: claim(
      { ua: "ауд. 218", en: "Room 218" },
      src(`Room 218 per the department profile. ${confirmNote}`),
    ),
    phone: claim("+38 (044) 239-33-93", src(confirmNote)),
  },

  // Olena V. Ishchenko (ishchenko) — leading faculty. Enriched from her official
  // page (D029): career timeline + authoritative dissertation titles + courses.
  // NB her page lists phone 239-34-38 (Diyuk's — the page is templated from his);
  // the authoritative teachers page gives 239-33-16, which the directory keeps.
  ishchenko: {
    id: "ishchenko",
    overview: claim(
      {
        ua: "Професорка кафедри фізичної хімії, керівниця підрозділу «Фізико-хімія гетерогенних каталізаторів». Працює над синтезом і дослідженням нанесених металевих каталізаторів для синтезу аміаку, окиснення CO та метанізації CO₂.",
        en: "Professor of physical chemistry and head of the heterogeneous-catalysis unit. Her work covers the synthesis and study of supported metal catalysts for ammonia synthesis, CO oxidation and CO₂ methanation.",
      },
      pp("ischenko/ischenko.html", confirmNote),
    ),
    research: claim(
      {
        ua: "Фізико-хімія гетерогенних каталізаторів: синтез масивних і нанесених металічних та оксидних каталізаторів на основі 3d- і 4d-елементів для промислово важливих реакцій — синтезу аміаку, окиснення CO, селективного окиснення CO (CO-PROX) та метанізації CO₂. Розвиває мас-спектрометричні методи дослідження в галузі гетерогенного каталізу.",
        en: "Physical chemistry of heterogeneous catalysts: the synthesis of bulk and supported metallic and oxide catalysts based on 3d- and 4d-elements for industrially important reactions — ammonia synthesis, CO oxidation, selective CO oxidation (CO-PROX) and CO₂ methanation. She develops mass-spectrometric methods in heterogeneous catalysis.",
      },
      pp("ischenko/ischenko.html", confirmNote),
    ),
    biography: claim(
      [
        {
          heading: { ua: "Освіта та наукові ступені", en: "Education and degrees" },
          body: {
            ua: [
              "1980 року закінчила Київський університет.",
              "Кандидатську дисертацію («Фізико-хімічні та каталітичні властивості залізо-кобальтової системи в реакції синтезу аміаку») захистила 1985 року, докторську («Каталітичні перетворення малих молекул на складних системах на основі 3d- та 4d-елементів») — 2004 року.",
              "Асистентка (1984–1998), доцент (1998–2005), професорка кафедри фізичної хімії — з 2005 року.",
            ],
            en: [
              "Graduated from the University of Kyiv in 1980.",
              "Defended her candidate dissertation (“Physico-chemical and catalytic properties of the iron–cobalt system in the ammonia-synthesis reaction”) in 1985 and her doctoral dissertation (“Catalytic transformations of small molecules on complex systems based on 3d- and 4d-elements”) in 2004.",
              "Assistant (1984–1998), Associate Professor (1998–2005) and Professor of physical chemistry since 2005.",
            ],
          },
        },
      ],
      pp("ischenko/ischenko.html", confirmNote),
    ),
    courses: claim(
      {
        ua: [
          "Фізична хімія",
          "Фізична хімія процесів",
          "Статистичні методи в хімії",
          "Мас-спектрометрія",
        ],
        en: [
          "Physical Chemistry",
          "Physical Chemistry of Processes",
          "Statistical Methods in Chemistry",
          "Mass Spectrometry",
        ],
      },
      pp("ischenko/ischenko.html", confirmNote),
    ),
    office: claim({ ua: "ауд. 102", en: "Room 102" }, pp("ischenko/ischenko.html", confirmNote)),
    phone: claim("+38 (044) 239-33-16", pp("teachers_ukr.html", `Department teachers page; her own page's 239-34-38 is a copy-paste error. ${confirmNote}`)),
  },

  // Liudmyla P. Oleksenko (oleksenko) — leading faculty. Enriched from her CV
  // (cv/Oleksenko CV 2023.pdf, D029): dissertations, career, courses, service.
  oleksenko: {
    id: "oleksenko",
    overview: claim(
      {
        ua: "Професорка кафедри фізичної хімії, провідна фахівчиня в галузі адсорбційних і каталітичних властивостей металовмісних систем, зокрема напівпровідникових сенсорів газів на основі SnO₂. Очолює відповідний підрозділ кафедри.",
        en: "Professor of physical chemistry and a leading specialist in the adsorption and catalytic properties of metal-containing systems, in particular SnO₂-based semiconductor gas sensors. She heads the corresponding unit of the department.",
      },
      pp("cv/Oleksenko CV 2023.pdf", confirmNote),
    ),
    research: claim(
      {
        ua: "Фізична хімія, нанохімія, адсорбція і каталіз, сенсорика газів: напівпровідникові сенсори газів на основі SnO₂ (з добавками Pd, Ce, Sb та інших) для детектування водню, метану й монооксиду карбону; синтез наноматеріалів та оксидні каталізатори окиснення CO.",
        en: "Physical chemistry, nanochemistry, adsorption and catalysis, gas sensorics: SnO₂-based semiconductor gas sensors (with Pd, Ce, Sb and other additives) for detecting hydrogen, methane and carbon monoxide; nanomaterial synthesis and oxide catalysts for CO oxidation.",
      },
      pp("cv/Oleksenko CV 2023.pdf", confirmNote),
    ),
    biography: claim(
      [
        {
          heading: { ua: "Освіта та наукові ступені", en: "Education and degrees" },
          body: {
            ua: [
              "Кандидатську дисертацію присвячено фізико-хімії кристалізуючої дії органічних льодоутворюючих реагентів; докторську — каталітичній активності в реакціях окиснення CO і H₂ та фізико-хімічним властивостям систем (2009).",
              "Доцент (1997–2010), професорка кафедри фізичної хімії — з 2010 року.",
            ],
            en: [
              "Her candidate dissertation addressed the physical chemistry of the crystallising action of organic ice-forming reagents; her doctoral dissertation (2009) addressed catalytic activity in CO and H₂ oxidation reactions and the physico-chemical properties of the systems.",
              "Associate Professor (1997–2010) and Professor of physical chemistry since 2010.",
            ],
          },
        },
        {
          heading: { ua: "Наукова-організаційна робота", en: "Academic service" },
          body: {
            ua: [
              "Членкиня та учений секретар секції хіміко-біологічних наук Комітету з Державних премій України в галузі науки і техніки (з 2016 року).",
              "Членкиня редколегії «Вісника Київського національного університету імені Тараса Шевченка. Серія Хімія» (з 2010 року).",
            ],
            en: [
              "Member and academic secretary of the chemistry-and-biology section of the Committee for the State Prizes of Ukraine in Science and Technology (since 2016).",
              "Member of the editorial board of the “Bulletin of Taras Shevchenko National University of Kyiv, Chemistry series” (since 2010).",
            ],
          },
        },
      ],
      pp("cv/Oleksenko CV 2023.pdf", confirmNote),
    ),
    courses: claim(
      {
        ua: [
          "Фізична хімія",
          "Фізична хімія процесів",
          "Колоїдна хімія",
          "Фізична та колоїдна хімія",
          "Фізична хімія міжфазних явищ",
          "Наносистеми в сенсориці, адсорбції та каталізі",
        ],
        en: [
          "Physical Chemistry",
          "Physical Chemistry of Processes",
          "Colloid Chemistry",
          "Physical and Colloid Chemistry",
          "Physical Chemistry of Interfacial Phenomena",
          "Nanosystems in Sensorics, Adsorption and Catalysis",
        ],
      },
      pp("cv/Oleksenko CV 2023.pdf", confirmNote),
    ),
    office: claim({ ua: "ауд. 202", en: "Room 202" }, pp("oleksenko/oleksenko.html", confirmNote)),
    phone: claim("+38 (044) 239-32-28", pp("cv/Oleksenko CV 2023.pdf", confirmNote)),
  },

  // Oleksandr S. Roik (roik) — leading faculty. Enriched from his official page
  // (D029): corrected milestones (docent 2010, professor 2021 — not "docent
  // 2022"), a dated Ukrainian grant, a France internship, courses. OMITTED: a
  // 2010 Novosibirsk (Russia) internship and a Russian-foundation grant.
  roik: {
    id: "roik",
    overview: claim(
      {
        ua: "Професор кафедри фізичної хімії, доктор хімічних наук. Фахівець із термодинаміки та структури невпорядкованих систем — металічних, оксидних і сольових розплавів, аморфних сплавів та оксидних стекол.",
        en: "Professor of physical chemistry and Doctor of Sciences. A specialist in the thermodynamics and structure of disordered systems — metallic, oxide and salt melts, amorphous alloys and oxide glasses.",
      },
      pp("roik/index.html", confirmNote),
    ),
    research: claim(
      {
        ua: "Термодинаміка і структура невпорядкованих систем: металічних, оксидних та сольових розплавів, аморфних сплавів і оксидних стекол. Рентгенофазовий аналіз та високотемпературне рентгенодифракційне дослідження; моделювання структури методами молекулярної динаміки та оберненого Монте-Карло.",
        en: "The thermodynamics and structure of disordered systems: metallic, oxide and salt melts, amorphous alloys and oxide glasses. X-ray phase analysis and high-temperature X-ray diffraction; structure modelling by molecular dynamics and the reverse Monte Carlo method.",
      },
      pp("roik/index.html", confirmNote),
    ),
    biography: claim(
      [
        {
          heading: { ua: "Освіта та наукові ступені", en: "Education and degrees" },
          body: {
            ua: [
              "Народився 1978 року.",
              "2000 року здобув диплом магістра з відзнакою (спеціальність «фізична хімія»); кандидатську дисертацію («Експериментальне дослідження та аналіз структури металічних розплавів методами оберненого Монте-Карло і Вороного–Делоне») захистив 2004 року.",
              "Доцент кафедри фізичної хімії — з 2010 року, професор — з 2021 року.",
            ],
            en: [
              "Born in 1978.",
              "Obtained a master's degree with honours (specialty “physical chemistry”) in 2000; defended his candidate dissertation (“Experimental study and analysis of the structure of metallic melts by the reverse Monte Carlo and Voronoi–Delaunay methods”) in 2004.",
              "Associate Professor of physical chemistry since 2010 and Professor since 2021.",
            ],
          },
        },
        {
          heading: { ua: "Міжнародний досвід", en: "International experience" },
          body: {
            ua: [
              "2013 року стажувався в Центрі досліджень при високих температурах (CEMHTI, CNRS), Орлеан, Франція.",
            ],
            en: [
              "In 2013 he held a research stay at the Centre for High-Temperature Research (CEMHTI, CNRS), Orléans, France.",
            ],
          },
        },
      ],
      pp("roik/index.html", confirmNote),
    ),
    achievements: claim(
      [
        {
          year: "2006",
          text: {
            ua: "Грант Президента України для підтримки наукових досліджень молодих учених",
            en: "Grant of the President of Ukraine in support of young scientists' research",
          },
        },
      ],
      pp("roik/index.html", confirmNote),
    ),
    courses: claim(
      {
        ua: [
          "Фізична хімія",
          "Фізична хімія процесів",
          "Фізична хімія конденсованого стану",
          "Теоретична електрохімія",
          "Дифракційні методи аналізу",
          "Методи встановлення структури хімічних сполук та матеріалів",
        ],
        en: [
          "Physical Chemistry",
          "Physical Chemistry of Processes",
          "Physical Chemistry of the Condensed State",
          "Theoretical Electrochemistry",
          "Diffraction Methods of Analysis",
          "Methods of Determining the Structure of Chemical Compounds and Materials",
        ],
      },
      pp("roik/index.html", confirmNote),
    ),
    office: claim({ ua: "ауд. 106", en: "Room 106" }, pp("roik/index.html", confirmNote)),
    phone: claim("+38 (044) 239-34-17", pp("roik/index.html", confirmNote)),
  },

  // Nataliia I. Usenko (usenko) — leading faculty + Vice-Dean. Enriched from her
  // official page (D029): she DOES have a research direction (the auto-summary
  // omitted it) — thermodynamics of alloy formation; plus a Scopus Author ID.
  usenko: {
    id: "usenko",
    overview: claim(
      {
        ua: "Доцентка кафедри фізичної хімії та заступниця декана хімічного факультету з навчальної роботи. Фахівчиня з термодинаміки сплавоутворення в металічних системах; поєднує дослідницьку й викладацьку роботу з обов'язками деканату.",
        en: "Associate Professor of physical chemistry and Vice-Dean of the Faculty of Chemistry for Education. A specialist in the thermodynamics of alloy formation in metallic systems, she combines research and teaching with the dean's-office duties.",
      },
      pp("usenko/index.html", confirmNote),
    ),
    research: claim(
      {
        ua: "Термодинамічні характеристики сплавоутворення рідких подвійних і потрійних металічних систем та інтерметалідів на основі рідкісноземельних і перехідних металів; модельні розрахунки термодинамічних властивостей металічних систем.",
        en: "The thermodynamic characteristics of alloy formation in liquid binary and ternary metallic systems and intermetallics based on rare-earth and transition metals; model calculations of the thermodynamic properties of metallic systems.",
      },
      pp("usenko/index.html", confirmNote),
    ),
    biography: claim(
      [
        {
          heading: { ua: "Освіта та наукові ступені", en: "Education and degrees" },
          body: {
            ua: [
              "Народилася 1968 року. 1990 року закінчила хімічний факультет Київського університету (диплом з відзнакою).",
              "Кандидатську дисертацію («Ентальпії сплавоутворення в бінарних системах рідкісноземельних металів з міддю, кобальтом, германієм і кремнієм») захистила 1999 року; учене звання доцента присвоєно 2007 року.",
              "Молодша наукова співробітниця Інституту проблем матеріалознавства імені І. М. Францевича НАН України (1996–2000); доцент кафедри фізичної хімії — з 2005 року; заступниця декана хімічного факультету — з 2020 року.",
            ],
            en: [
              "Born in 1968. Graduated with honours from the Faculty of Chemistry of the University of Kyiv in 1990.",
              "Defended her candidate dissertation (“Enthalpies of alloy formation in binary systems of rare-earth metals with copper, cobalt, germanium and silicon”) in 1999; awarded the title of Associate Professor in 2007.",
              "Junior researcher at the I. M. Frantsevich Institute for Problems of Materials Science of the NAS of Ukraine (1996–2000); Associate Professor of physical chemistry since 2005; Vice-Dean of the Faculty of Chemistry since 2020.",
            ],
          },
        },
      ],
      pp("usenko/index.html", confirmNote),
    ),
    courses: claim(
      {
        ua: [
          "Статистична термодинаміка",
          "Фізико-хімічні основи матеріалознавства",
          "Методи дослідження і моделювання фазових рівноваг",
        ],
        en: [
          "Statistical Thermodynamics",
          "Physico-Chemical Foundations of Materials Science",
          "Methods of Studying and Modelling Phase Equilibria",
        ],
      },
      pp("usenko/index.html", confirmNote),
    ),
    links: {
      scopus: claim(
        "https://www.scopus.com/authid/detail.uri?authorId=6603088492",
        pp("usenko/index.html", `Scopus Author ID 6603088492 as listed on her page. ${confirmNote}`),
      ),
    },
    office: claim({ ua: "ауд. 241", en: "Room 241" }, pp("usenko/index.html", confirmNote)),
    phone: claim("+38 (044) 239-33-70", pp("usenko/index.html", confirmNote)),
  },

  // Vitalii Ye. Diyuk (diyuk) — enriched from his official page (D029):
  // candidate year + dissertation, career timeline, courses.
  diyuk: {
    id: "diyuk",
    overview: claim(
      {
        ua: "Доцент кафедри фізичної хімії; фахівець із фізико-хімії модифікованих вуглецевих матеріалів. Працює у складі наукової групи О. В. Іщенко.",
        en: "Associate Professor of physical chemistry; a specialist in the physical chemistry of modified carbon materials. He works within the research group of O. V. Ishchenko.",
      },
      pp("diyuk/diyuk.html", confirmNote),
    ),
    research: claim(
      {
        ua: "Модифікування вуглецевих наноматеріалів для створення специфічних носіїв, сорбентів і каталізаторів: поверхневий стан активованого вугілля, графіту та вуглецевих нанотрубок, модифікованих металевими наночастинками. Застосування — мікробні паливні елементи й екологічний каталіз.",
        en: "The modification of carbon nanomaterials to create specific supports, sorbents and catalysts: the surface state of activated carbon, graphite and carbon nanotubes modified with metal nanoparticles. Applications: microbial fuel cells and ecological catalysis.",
      },
      pp("diyuk/diyuk.html", confirmNote),
    ),
    biography: claim(
      [
        {
          heading: { ua: "Освіта та наукові ступені", en: "Education and degrees" },
          body: {
            ua: [
              "1996 року закінчив хімічний факультет Київського університету (диплом з відзнакою).",
              "Кандидатську дисертацію («Механізм каталітичних і топохімічних red-ox реакцій у системі Ni–NiO–газова фаза») захистив 2001 року.",
              "Асистент (1999–2005), доцент кафедри фізичної хімії — з 2005 року.",
            ],
            en: [
              "Graduated with honours from the Faculty of Chemistry of the University of Kyiv in 1996.",
              "Defended his candidate dissertation (“The mechanism of catalytic and topochemical redox reactions in the Ni–NiO–gas-phase system”) in 2001.",
              "Assistant (1999–2005) and Associate Professor of physical chemistry since 2005.",
            ],
          },
        },
      ],
      pp("diyuk/diyuk.html", confirmNote),
    ),
    courses: claim(
      {
        ua: [
          "Фізична хімія",
          "Квантова хімія",
          "Основи хімічної кінетики",
          "Фізико-хімія вуглецевих сорбентів",
        ],
        en: [
          "Physical Chemistry",
          "Quantum Chemistry",
          "Foundations of Chemical Kinetics",
          "Physical Chemistry of Carbon Sorbents",
        ],
      },
      pp("diyuk/diyuk.html", confirmNote),
    ),
    office: claim({ ua: "ауд. 207", en: "Room 207" }, pp("diyuk/diyuk.html", confirmNote)),
    phone: claim("+38 (044) 239-34-38", pp("diyuk/diyuk.html", confirmNote)),
  },

  // Olha Yu. Boldyrieva (boldyrieva) — her official page (D029) fills the former
  // top gap: a research direction, dissertation, and a course list.
  boldyrieva: {
    id: "boldyrieva",
    overview: claim(
      {
        ua: "Доцентка кафедри фізичної хімії; фахівчиня з хімії поверхні, поверхневих явищ, кінетики та каталізу.",
        en: "Associate Professor of physical chemistry; a specialist in surface chemistry, surface phenomena, kinetics and catalysis.",
      },
      pp("boldyreva/boldyreva.html", confirmNote),
    ),
    research: claim(
      {
        ua: "Хімія поверхні, поверхневі явища, кінетика і каталіз; каталітичне окиснення на металокомплексах платини та паладію, гетерогенізованих на поверхні кремнезему.",
        en: "Surface chemistry, surface phenomena, kinetics and catalysis; catalytic oxidation on platinum- and palladium-metal complexes heterogenised on a silica surface.",
      },
      pp("boldyreva/boldyreva.html", confirmNote),
    ),
    biography: claim(
      [
        {
          heading: { ua: "Освіта та наукові ступені", en: "Education and degrees" },
          body: {
            ua: [
              "1996 року закінчила хімічний факультет Київського університету.",
              "Кандидатську дисертацію («Каталітичне окиснення H₂ та CO на металокомплексах платини та паладію, гетерогенізованих на поверхні кремнезему») захистила 2003 року (спеціальність 02.00.04 — фізична хімія); учене звання доцента присвоєно 2007 року.",
            ],
            en: [
              "Graduated from the Faculty of Chemistry of the University of Kyiv in 1996.",
              "Defended her candidate dissertation (“Catalytic oxidation of H₂ and CO on platinum- and palladium-metal complexes heterogenised on a silica surface”) in 2003 (specialty 02.00.04, physical chemistry); awarded the title of Associate Professor in 2007.",
            ],
          },
        },
      ],
      pp("boldyreva/boldyreva.html", confirmNote),
    ),
    courses: claim(
      {
        ua: [
          "Каталіз металокомплексами",
          "Сучасний каталіз в альтернативній енергетиці і промисловій екології",
          "Гетерогенний каталіз",
          "Фізична і колоїдна хімія",
        ],
        en: [
          "Catalysis by Metal Complexes",
          "Modern Catalysis in Alternative Energy and Industrial Ecology",
          "Heterogeneous Catalysis",
          "Physical and Colloid Chemistry",
        ],
      },
      pp("boldyreva/boldyreva.html", confirmNote),
    ),
    office: claim({ ua: "ауд. 204", en: "Room 204" }, pp("boldyreva/boldyreva.html", confirmNote)),
    phone: claim("+38 (044) 239-32-93", pp("boldyreva/boldyreva.html", confirmNote)),
  },

  // Snizhana V. Haidai (haidai) — docent + department secretary. Enriched from
  // her official page (D029): research, education, courses, internship + Uppsala
  // collaboration. EXCLUDED: supervised-work counts.
  haidai: {
    id: "haidai",
    overview: claim(
      {
        ua: "Доцентка і секретарка кафедри фізичної хімії. Працює над гетерогенними каталізаторами для екологічного каталізу (окиснення CO, метанування CO₂) та модифікуванням ультрадисперсних алмазів.",
        en: "Associate Professor and secretary of the Department of Physical Chemistry. She works on heterogeneous catalysts for ecological catalysis (CO oxidation, CO₂ methanation) and on the modification of ultradisperse diamonds.",
      },
      pp("gaidai/gaidai.html", confirmNote),
    ),
    research: claim(
      {
        ua: "Розробка методів синтезу складних каталітичних систем для екологічного каталізу — гетерогенних каталізаторів на основі перехідних металів у реакціях окиснення монооксиду карбону та метанування діоксиду карбону; вивчення стану адсорбованих частинок методом термопрограмованої десорбції. Модифікування і дослідження властивостей ультрадисперсних алмазів.",
        en: "The development of synthesis methods for complex catalytic systems for ecological catalysis — heterogeneous transition-metal catalysts for carbon-monoxide oxidation and carbon-dioxide methanation; the study of adsorbed species by temperature-programmed desorption. The modification and study of the properties of ultradisperse diamonds.",
      },
      pp("gaidai/gaidai.html", confirmNote),
    ),
    biography: claim(
      [
        {
          heading: { ua: "Освіта та наукові ступені", en: "Education and degrees" },
          body: {
            ua: [
              "1994–2000: магістратура, хімічний факультет Київського університету; 2000–2004: аспірантура.",
              "Кандидатську дисертацію («Активність оксидних Cu-Co-Fe каталізаторів окиснення CO та їх фізико-хімічні характеристики») захистила 2004 року; доцент кафедри фізичної хімії — з 2007 року.",
            ],
            en: [
              "1994–2000: master's studies at the Faculty of Chemistry of the University of Kyiv; 2000–2004: postgraduate studies.",
              "Defended her candidate dissertation (“The activity of oxide Cu-Co-Fe catalysts for CO oxidation and their physico-chemical characteristics”) in 2004; Associate Professor of physical chemistry since 2007.",
            ],
          },
        },
        {
          heading: { ua: "Співпраця та стажування", en: "Collaboration and research stays" },
          body: {
            ua: [
              "2019 року пройшла наукове стажування в Інституті надтвердих матеріалів імені В. М. Бакуля НАН України.",
              "Співпрацює з лабораторією Ångström Уппсальського університету (Швеція), Інститутом фізичної хімії імені Л. В. Писаржевського та Інститутом хімії поверхні імені О. О. Чуйка НАН України.",
            ],
            en: [
              "In 2019 she held a research stay at the V. M. Bakul Institute for Superhard Materials of the NAS of Ukraine.",
              "She collaborates with the Ångström Laboratory of Uppsala University (Sweden), the L. V. Pisarzhevsky Institute of Physical Chemistry and the O. O. Chuiko Institute of Surface Chemistry of the NAS of Ukraine.",
            ],
          },
        },
      ],
      pp("gaidai/gaidai.html", confirmNote),
    ),
    courses: claim(
      {
        ua: [
          "Фізична хімія",
          "Колоїдна хімія",
          "Статистичні методи",
          "Сучасні фізичні методи в каталізі",
          "Статистичні і комбінаторні методи",
        ],
        en: [
          "Physical Chemistry",
          "Colloid Chemistry",
          "Statistical Methods",
          "Modern Physical Methods in Catalysis",
          "Statistical and Combinatorial Methods",
        ],
      },
      pp("gaidai/gaidai.html", confirmNote),
    ),
    office: claim({ ua: "ауд. 102", en: "Room 102" }, pp("gaidai/gaidai.html", confirmNote)),
  },

  // Mariia L. Malysheva (malysheva) — enriched from her CV (cv/CV_Malysheva.pdf,
  // D029): birth year, specialty (colloid chemistry), career timeline, courses.
  malysheva: {
    id: "malysheva",
    overview: claim(
      {
        ua: "Доцентка кафедри фізичної хімії; керівниця наукової групи з колоїдної хімії та фізичної хімії дисперсних систем.",
        en: "Associate Professor of physical chemistry; head of a research group in colloid chemistry and the physical chemistry of dispersed systems.",
      },
      pp("cv/CV_Malysheva.pdf", confirmNote),
    ),
    research: claim(
      {
        ua: "Колоїдна хімія та фізична хімія полімерів і колоїдів: стійкість і коагуляція дисперсних систем; адсорбція полімерів на поверхні часточок дисперсної фази, структура адсорбційних шарів, електроповерхневі властивості та агрегативна стійкість полімервмісних систем.",
        en: "Colloid chemistry and the physical chemistry of polymers and colloids: the stability and coagulation of dispersed systems; polymer adsorption on the surface of dispersed-phase particles, the structure of adsorption layers, electro-surface properties and the aggregative stability of polymer-containing systems.",
      },
      pp("cv/CV_Malysheva.pdf", confirmNote),
    ),
    biography: claim(
      [
        {
          heading: { ua: "Освіта та наукові ступені", en: "Education and degrees" },
          body: {
            ua: [
              "Народилася 1957 року.",
              "1975–1980: студентка хімічного факультету Київського університету; 1981–1985: аспірантура. Кандидатка хімічних наук (спеціальність 02.00.11 — колоїдна хімія).",
              "Працювала на кафедрі фізичної хімії полімерів і колоїдів інженеркою (1980–1990) та науковою співробітницею (1990–1993); асистентка (1993–1998), доцент кафедри фізичної хімії — з 1998 року.",
            ],
            en: [
              "Born in 1957.",
              "1975–1980: student at the Faculty of Chemistry of the University of Kyiv; 1981–1985: postgraduate studies. Candidate of Chemical Sciences (specialty 02.00.11, colloid chemistry).",
              "Worked at the chair of physical chemistry of polymers and colloids as an engineer (1980–1990) and a researcher (1990–1993); assistant (1993–1998) and Associate Professor of physical chemistry since 1998.",
            ],
          },
        },
      ],
      pp("cv/CV_Malysheva.pdf", confirmNote),
    ),
    courses: claim(
      {
        ua: [
          "Фізична хімія",
          "Колоїдна хімія",
          "Адсорбція і поверхневі сили",
          "Подвійний електричний шар та електроповерхневі властивості дисперсних систем",
        ],
        en: [
          "Physical Chemistry",
          "Colloid Chemistry",
          "Adsorption and Surface Forces",
          "The Electrical Double Layer and Electro-Surface Properties of Dispersed Systems",
        ],
      },
      pp("cv/CV_Malysheva.pdf", confirmNote),
    ),
    office: claim({ ua: "ауд. 240", en: "Room 240" }, pp("cv/CV_Malysheva.pdf", confirmNote)),
    phone: claim("+38 (044) 239-33-70", pp("cv/CV_Malysheva.pdf", confirmNote)),
  },

  // Andrii V. Yatsymyrskyi (yatsymyrskyi) — enriched from his official page
  // (D029): physics-faculty background, dissertation, two dated awards, courses.
  yatsymyrskyi: {
    id: "yatsymyrskyi",
    overview: claim(
      {
        ua: "Доцент кафедри фізичної хімії; фахівець із квантово-хімічного (DFT) моделювання адсорбції на металевих поверхнях та хімії поверхні твердого тіла.",
        en: "Associate Professor of physical chemistry; a specialist in quantum-chemical (DFT) modelling of adsorption on metal surfaces and in the surface chemistry of solids.",
      },
      pp("yatsymyrskyi/yatsymyrskyi.html", confirmNote),
    ),
    research: claim(
      {
        ua: "Проблеми хімії поверхні твердого тіла; фізико-хімічні та адсорбційно-каталітичні властивості нанесених металів на носіях різної природи; вивчення стану адсорбованих частинок методом термопрограмованої десорбції та квантово-хімічні розрахунки.",
        en: "The surface chemistry of solids; the physico-chemical and adsorption-catalytic properties of supported metals on supports of various natures; the study of adsorbed species by temperature-programmed desorption and quantum-chemical calculations.",
      },
      pp("yatsymyrskyi/yatsymyrskyi.html", confirmNote),
    ),
    biography: claim(
      [
        {
          heading: { ua: "Освіта та наукові ступені", en: "Education and degrees" },
          body: {
            ua: [
              "1992–1997: спеціаліст, фізичний факультет Київського університету; 1997–2000: аспірантура, хімічний факультет.",
              "Кандидатську дисертацію («Адсорбційно-каталітичні та фізико-хімічні властивості нанесених Pd та Pd-Ag каталізаторів окиснення CO») захистив 2003 року; доцент кафедри фізичної хімії — з 2014 року.",
            ],
            en: [
              "1992–1997: specialist degree at the Faculty of Physics of the University of Kyiv; 1997–2000: postgraduate studies at the Faculty of Chemistry.",
              "Defended his candidate dissertation (“Adsorption-catalytic and physico-chemical properties of supported Pd and Pd-Ag catalysts for CO oxidation”) in 2003; Associate Professor of physical chemistry since 2014.",
            ],
          },
        },
        {
          heading: { ua: "Наукова школа", en: "Scientific lineage" },
          body: {
            ua: [
              "Син В. К. Яцимирського — одного із фундаторів наукової школи кафедри; співавтор підручника «Квантова хімія» (2009).",
            ],
            en: [
              "Son of V. K. Yatsymyrskyi, one of the founders of the department's scientific school; co-author of the textbook “Quantum Chemistry” (2009).",
            ],
          },
        },
      ],
      pp("yatsymyrskyi/yatsymyrskyi.html", confirmNote),
    ),
    achievements: claim(
      [
        {
          year: "1996",
          text: {
            ua: "Індивідуальний студентський грант Фонду Сороса",
            en: "Individual student grant of the Soros Foundation",
          },
        },
        {
          year: "2021",
          text: {
            ua: "Грамота Київського національного університету імені Тараса Шевченка",
            en: "Certificate of merit of Taras Shevchenko National University of Kyiv",
          },
        },
      ],
      pp("yatsymyrskyi/yatsymyrskyi.html", confirmNote),
    ),
    courses: claim(
      {
        ua: [
          "Квантова хімія",
          "Фізична хімія",
          "Вибрані розділи теоретичної хімії",
          "Основи теорії електронного газу в твердому тілі",
        ],
        en: [
          "Quantum Chemistry",
          "Physical Chemistry",
          "Selected Topics in Theoretical Chemistry",
          "Foundations of the Theory of the Electron Gas in Solids",
        ],
      },
      pp("yatsymyrskyi/yatsymyrskyi.html", confirmNote),
    ),
    office: claim({ ua: "ауд. 102", en: "Room 102" }, pp("yatsymyrskyi/yatsymyrskyi.html", confirmNote)),
  },

  // Illia O. Guralskyi (guralskyi) — newest hire; NO official per-person page
  // exists on the legacy site, and no ORCID in any held source. Unchanged this
  // sprint — remaining gaps are department input only (D029).
  guralskyi: {
    id: "guralskyi",
    overview: claim(
      {
        ua: "Доцент кафедри фізичної хімії; фахівець із координаційної хімії та синтезу координаційних сполук перехідних металів. Входить до наукової групи І. О. Фрицького.",
        en: "Associate Professor of physical chemistry; a specialist in coordination chemistry and the synthesis of transition-metal coordination compounds. He is a member of the research group of I. O. Fritsky.",
      },
      src(confirmNote),
    ),
    research: claim(
      {
        ua: "Координаційна хімія та синтез координаційних сполук перехідних металів (спеціальність 02.00.01 «Неорганічна хімія»).",
        en: "Coordination chemistry and the synthesis of coordination compounds of transition metals (specialty 02.00.01, “Inorganic chemistry”).",
      },
      src(confirmNote),
    ),
  },
};

// ── Resolution ──────────────────────────────────────────────────────────────

function resolveLinks(
  links: ScholarlyLinks | undefined,
): LocalisedStaffProfile["links"] {
  if (!links) return [];
  const labels = ["scholar", "scopus", "researchgate"] as const;
  return labels.flatMap((label) => {
    const c = links[label];
    return c ? [{ label, url: c.value, provenance: c.provenance }] : [];
  });
}

/**
 * Resolve a member's rich profile to its public, locale-resolved view, or null
 * when no profile is authored (the page then renders the directory identity
 * only). Each section carries its own provenance so the profile page can render
 * the development-only review marks.
 */
export function resolveProfile(
  id: string,
  lang: Locale,
): LocalisedStaffProfile | null {
  const p = profiles[id];
  if (!p) return null;
  return {
    id,
    overview: p.overview
      ? { text: p.overview.value[lang], provenance: p.overview.provenance }
      : null,
    research: p.research
      ? { text: p.research.value[lang], provenance: p.research.provenance }
      : null,
    biography: p.biography
      ? {
          sections: p.biography.value.map((s) => ({
            heading: s.heading[lang],
            body: s.body[lang],
          })),
          provenance: p.biography.provenance,
        }
      : null,
    achievements: p.achievements
      ? {
          items: p.achievements.value.map((a) => ({
            year: a.year ?? null,
            text: a.text[lang],
          })),
          provenance: p.achievements.provenance,
        }
      : null,
    courses: p.courses
      ? { items: p.courses.value[lang], provenance: p.courses.provenance }
      : null,
    publications: p.publications
      ? { items: p.publications.value, provenance: p.publications.provenance }
      : null,
    links: resolveLinks(p.links),
    office: p.office
      ? { text: p.office.value[lang], provenance: p.office.provenance }
      : null,
    phone: p.phone
      ? { text: p.phone.value, provenance: p.phone.provenance }
      : null,
  };
}
