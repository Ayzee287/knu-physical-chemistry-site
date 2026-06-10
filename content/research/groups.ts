import type { Locale } from "@/lib/i18n";
import { fromDeptProfile, type Localised, type Provenance } from "@/lib/provenance";

// Research groups of the department — from the v3 department profile (six
// groups with stated programmes). Published on /research ONLY in the
// group-designation form the department itself uses («група проф. N»):
// leader surname + initials, focus line, keywords. No bios, no contacts, no
// member lists — research identity, not a directory (ADR-0005 boundary).

export type ResearchGroup = {
  id: string;
  /** Group designation as the department styles it. */
  name: Localised;
  focus: Localised;
  keywords: Localised<string[]>;
  /** Anchor of the related research area on /research. */
  areaId: string;
  provenance: Provenance;
};

const v3 = fromDeptProfile;

export const researchGroups: ResearchGroup[] = [
  {
    id: "fritsky-group",
    name: {
      ua: "Група чл.-кор. НАН України, проф. І. О. Фрицького",
      en: "Group of Prof. I. O. Fritsky, Corr. Member of the NAS of Ukraine",
    },
    focus: {
      ua: "Спінові переходи, нетрадиційно високі ступені окиснення металів, поліядерні комплекси; міжнародні проєкти з університетами Німеччини, Франції та Іспанії.",
      en: "Spin crossover, unusually high metal oxidation states, polynuclear complexes; international projects with universities in Germany, France and Spain.",
    },
    keywords: {
      ua: ["spin crossover", "Fe(IV)", "молекулярні матеріали"],
      en: ["spin crossover", "Fe(IV)", "molecular materials"],
    },
    areaId: "coordination-spin",
    provenance: v3("Programme as published; the Fe(IV)-in-water result is reported by the source as published in Nature Communications (2017) — citation kept in source notes."),
  },
  {
    id: "ishchenko-group",
    name: {
      ua: "Група проф. О. В. Іщенко",
      en: "Group of Prof. O. V. Ishchenko",
    },
    focus: {
      ua: "Фізико-хімія гетерогенних каталізаторів: синтез аміаку, окиснення CO, метанізація CO₂; нанокомпозити на оксидних і вуглецевих носіях; термодесорбційна мас-спектрометрія.",
      en: "Physical chemistry of heterogeneous catalysts: ammonia synthesis, CO oxidation, CO₂ methanation; nanocomposites on oxide and carbon supports; thermal-desorption mass spectrometry.",
    },
    keywords: {
      ua: ["гетерогенний каталіз", "CO₂ → CH₄", "нанокомпозити"],
      en: ["heterogeneous catalysis", "CO₂ → CH₄", "nanocomposites"],
    },
    areaId: "heterogeneous-catalysis",
    provenance: v3(),
  },
  {
    id: "oleksenko-group",
    name: {
      ua: "Група проф. Л. П. Олексенко",
      en: "Group of Prof. L. P. Oleksenko",
    },
    focus: {
      ua: "Металовмісні каталітичні системи та напівпровідникові сенсори газів на основі SnO₂; термодинаміка і структура металічних та оксидних розплавів.",
      en: "Metal-containing catalytic systems and SnO₂-based semiconductor gas sensors; thermodynamics and structure of metallic and oxide melts.",
    },
    keywords: {
      ua: ["SnO₂-сенсори", "металевий каталіз"],
      en: ["SnO₂ sensors", "metal catalysis"],
    },
    areaId: "gas-sensors",
    provenance: v3(),
  },
  {
    id: "roik-group",
    name: {
      ua: "Група проф. О. С. Роїка",
      en: "Group of Prof. O. S. Roik",
    },
    focus: {
      ua: "Атомна структура рідких металів, бінарних розплавів та оксидних систем; рентгенівська дифракція, зворотний Монте-Карло, молекулярна динаміка, синхротронні вимірювання.",
      en: "Atomic structure of liquid metals, binary melts and oxide systems; X-ray diffraction, reverse Monte Carlo, molecular dynamics, synchrotron measurements.",
    },
    keywords: {
      ua: ["металічні розплави", "рентгенівська дифракція"],
      en: ["metallic melts", "X-ray diffraction"],
    },
    areaId: "melts-disordered",
    provenance: v3(),
  },
  {
    id: "malysheva-group",
    name: {
      ua: "Група доц. М. Л. Малишевої",
      en: "Group of Assoc. Prof. M. L. Malysheva",
    },
    focus: {
      ua: "Стійкість і механізми коагуляції дисперсних систем; адсорбція полімерів на поверхні частинок дисперсної фази та електроповерхневі властивості.",
      en: "Stability and coagulation mechanisms of dispersed systems; polymer adsorption on dispersed-phase particles and electro-surface properties.",
    },
    keywords: {
      ua: ["дисперсні системи", "колоїдна хімія"],
      en: ["dispersed systems", "colloid chemistry"],
    },
    areaId: "dispersed-carbon",
    provenance: v3(),
  },
  {
    id: "diyuk-group",
    name: {
      ua: "Група доц. В. Є. Діюка",
      en: "Group of Assoc. Prof. V. Ye. Diyuk",
    },
    focus: {
      ua: "Фізико-хімія модифікованих вуглецевих матеріалів: активоване вугілля, графіт і нанотрубки з металевими наночастинками; мікробні паливні елементи, екологічний каталіз.",
      en: "Physical chemistry of modified carbon materials: activated carbon, graphite and nanotubes with metal nanoparticles; microbial fuel cells, ecological catalysis.",
    },
    keywords: {
      ua: ["вуглецеві матеріали", "паливні елементи"],
      en: ["carbon materials", "fuel cells"],
    },
    areaId: "dispersed-carbon",
    provenance: v3(),
  },
];

export type LocalisedResearchGroup = {
  id: string;
  name: string;
  focus: string;
  keywords: string[];
  areaId: string;
  provenance: Provenance;
};

export function getResearchGroups(lang: Locale): LocalisedResearchGroup[] {
  return researchGroups.map((g) => ({
    id: g.id,
    name: g.name[lang],
    focus: g.focus[lang],
    keywords: g.keywords[lang],
    areaId: g.areaId,
    provenance: g.provenance,
  }));
}
