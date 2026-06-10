import type { Locale } from "@/lib/i18n";
import type { LocalisedResearchArea, ResearchArea } from "@/types/content";
import { fromPhyschem } from "@/lib/provenance";

// Research directions of the Department of Physical Chemistry.
//
// SOURCED from the department's own published record: the legacy official site
// (physchem.knu.ua — «Основні наукові напрямки», «Історія кафедри»; snapshots
// in source-materials/physchem-knu-ua/). That record is authoritative as the
// department's self-description but dates from ~2009, so every area carries a
// confirm-current-emphasis note. Summaries stay conservative paraphrases of
// the source text — never stronger than the original claims.
//
// Specific research GROUPS (people, labs, projects) are still not listed —
// that detail requires department confirmation (see docs/content-audit).

const confirmNote =
  "From the department's legacy official site (©2009); confirm current emphasis with the department.";

export const researchAreas: ResearchArea[] = [
  {
    id: "catalysis-surface",
    title: {
      ua: "Каталіз і фізична хімія поверхні",
      en: "Catalysis and surface physical chemistry",
    },
    summary: {
      ua: "Фізико-хімічні, адсорбційні та каталітичні властивості металовмісних систем; взаємодія газових молекул з поверхнею твердих тіл.",
      en: "Physicochemical, adsorption and catalytic properties of metal-containing systems; the interaction of gas molecules with solid surfaces.",
    },
    topics: {
      ua: ["екологічний каталіз", "кластерний каталіз", "сенсори газів"],
      en: ["ecological catalysis", "cluster catalysis", "gas sensors"],
    },
    provenance: fromPhyschem("napriamki_ukr.html", confirmNote),
  },
  {
    id: "melts-thermodynamics",
    title: {
      ua: "Термодинаміка і структура розплавів",
      en: "Thermodynamics and structure of melts",
    },
    summary: {
      ua: "Термодинаміка і структура металічних та оксидних розплавів; термодинамічні функції бінарних і потрійних металічних систем.",
      en: "Thermodynamics and structure of metallic and oxide melts; thermodynamic functions of binary and ternary metallic systems.",
    },
    topics: {
      ua: ["рідкі сплави", "гетерогенні рівноваги"],
      en: ["liquid alloys", "heterogeneous equilibria"],
    },
    provenance: fromPhyschem("napriamki_ukr.html", confirmNote),
  },
  {
    id: "coordination-bioinorganic",
    title: {
      ua: "Координаційна та біонеорганічна хімія",
      en: "Coordination and bioinorganic chemistry",
    },
    summary: {
      ua: "Електрохімія координаційних сполук, металокомплексний каталіз і магнетохімія; біоміметичні каталізатори та молекулярні магнітні наноматеріали.",
      en: "Electrochemistry of coordination compounds, metal-complex catalysis and magnetochemistry; biomimetic catalysts and molecular magnetic nanomaterials.",
    },
    topics: {
      ua: ["біофізична хімія", "магнетохімія", "біоміметичні каталізатори"],
      en: ["biophysical chemistry", "magnetochemistry", "biomimetic catalysts"],
    },
    // Two converging sources: the department history page (directions started
    // under the current head, 2005–) and the head's stated field in the staff
    // directory document.
    provenance: fromPhyschem(
      "history_ukr.html",
      `${confirmNote} Corroborated by the staff-directory document (head's stated field).`,
    ),
  },
  {
    id: "dispersed-systems",
    title: {
      ua: "Фізична хімія дисперсних систем",
      en: "Physical chemistry of dispersed systems",
    },
    summary: {
      ua: "Агрегативна стійкість дисперсних систем, зокрема механізм впливу неіоногенних полімерів.",
      en: "Aggregative stability of dispersed systems, including the influence of non-ionic polymers.",
    },
    topics: {
      ua: ["колоїдні системи", "полімерні стабілізатори"],
      en: ["colloidal systems", "polymer stabilisers"],
    },
    provenance: fromPhyschem("napriamki_ukr.html", confirmNote),
  },
];

export function getResearchAreas(lang: Locale): LocalisedResearchArea[] {
  return researchAreas.map((area) => ({
    id: area.id,
    title: area.title[lang],
    summary: area.summary[lang],
    topics: area.topics?.[lang] ?? [],
    provenance: area.provenance,
  }));
}
