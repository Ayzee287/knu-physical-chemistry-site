import type { Locale } from "@/lib/i18n";
import type { LocalisedResearchArea, ResearchArea } from "@/types/content";
import { fromDeptProfile } from "@/lib/provenance";

// Research directions of the Department of Physical Chemistry.
//
// Rebuilt 2026-06-10 from the v3 department profile (six research groups with
// explicit programmes; cites infopacket.knu.ua / vstup.chem.knu.ua, June
// 2026), corroborated by the legacy official site. Five public directions map
// the six groups: institutional research identity, not personal biographies.
// Summaries remain conservative paraphrases of source text.

const v3 = fromDeptProfile;
const confirmNote = "From the department's published profile; confirm current emphasis with the department.";

export const researchAreas: ResearchArea[] = [
  {
    id: "coordination-spin",
    title: {
      ua: "Координаційна хімія і спінові переходи",
      en: "Coordination chemistry and spin crossover",
    },
    summary: {
      ua: "Поліядерні координаційні сполуки з прогнозованими магнітними та каталітичними властивостями; спінові переходи у сполуках Fe(II) і Co(II); стабілізація нетрадиційно високих ступенів окиснення металів — Fe(IV), Cu(III), Ni(III) — у водних розчинах.",
      en: "Polynuclear coordination compounds with designed magnetic and catalytic properties; spin crossover in Fe(II) and Co(II) compounds; stabilisation of unusually high metal oxidation states — Fe(IV), Cu(III), Ni(III) — in aqueous solutions.",
    },
    topics: {
      ua: ["spin crossover", "поліядерні комплекси", "високі ступені окиснення", "молекулярні магнітні матеріали"],
      en: ["spin crossover", "polynuclear complexes", "high oxidation states", "molecular magnetic materials"],
    },
    provenance: v3(confirmNote),
  },
  {
    id: "heterogeneous-catalysis",
    title: {
      ua: "Гетерогенний каталіз",
      en: "Heterogeneous catalysis",
    },
    summary: {
      ua: "Масивні та нанесені каталізатори промислово важливих реакцій — синтез аміаку, окиснення CO, метанізація CO₂; бі- та трикомпонентні нанокомпозити на оксидних і вуглецевих носіях; мас-спектрометрія термодесорбції для дослідження поверхні каталізаторів.",
      en: "Bulk and supported catalysts for industrially important reactions — ammonia synthesis, CO oxidation, CO₂ methanation; binary and ternary nanocomposites on oxide and carbon supports; thermal-desorption mass spectrometry for catalyst surface studies.",
    },
    topics: {
      ua: ["метанізація CO₂", "екологічний каталіз", "нанокомпозити", "in situ дослідження поверхні"],
      en: ["CO₂ methanation", "ecological catalysis", "nanocomposites", "in situ surface studies"],
    },
    provenance: v3(confirmNote),
  },
  {
    id: "gas-sensors",
    title: {
      ua: "Напівпровідникові газові сенсори",
      en: "Semiconductor gas sensors",
    },
    summary: {
      ua: "Розробка та дослідження сенсорів газів на основі SnO₂ з каталітичними добавками; чутливість сенсорів визначається гетерогенно-каталітичними реакціями на поверхні газочутливого шару.",
      en: "Development and study of SnO₂-based gas sensors with catalytic additives; sensor response is governed by heterogeneous catalytic reactions at the gas-sensitive surface.",
    },
    topics: {
      ua: ["SnO₂", "аналітика водню", "сенсорні матеріали"],
      en: ["SnO₂", "hydrogen sensing", "sensor materials"],
    },
    provenance: v3(`Corroborated by the legacy record (sensor work since the 1990s). ${confirmNote}`),
  },
  {
    id: "melts-disordered",
    title: {
      ua: "Структура розплавів і невпорядкованих систем",
      en: "Structure of melts and disordered systems",
    },
    summary: {
      ua: "Атомна структура рідких металів, бінарних металічних розплавів та оксидних систем; рентгенівська дифракція, зворотний метод Монте-Карло, молекулярна динаміка; синхротронні вимірювання у міжнародних центрах.",
      en: "Atomic structure of liquid metals, binary metallic melts and oxide systems; X-ray diffraction, reverse Monte Carlo and molecular dynamics; synchrotron measurements at international facilities.",
    },
    topics: {
      ua: ["рідкі метали", "оксидні системи", "зворотний Монте-Карло", "синхротронні дослідження"],
      en: ["liquid metals", "oxide systems", "reverse Monte Carlo", "synchrotron studies"],
    },
    provenance: v3(confirmNote),
  },
  {
    id: "dispersed-carbon",
    title: {
      ua: "Дисперсні системи та вуглецеві матеріали",
      en: "Dispersed systems and carbon materials",
    },
    summary: {
      ua: "Стійкість і коагуляція дисперсних систем, адсорбція полімерів на межах поділу фаз; фізико-хімія модифікованих вуглецевих матеріалів — активованого вугілля, графіту й нанотрубок із металевими наночастинками — для екологічного каталізу та паливних елементів.",
      en: "Stability and coagulation of dispersed systems, polymer adsorption at interfaces; physical chemistry of modified carbon materials — activated carbon, graphite and nanotubes with metal nanoparticles — for ecological catalysis and fuel cells.",
    },
    topics: {
      ua: ["колоїдні системи", "адсорбція полімерів", "вуглецеві наноматеріали", "паливні елементи"],
      en: ["colloidal systems", "polymer adsorption", "carbon nanomaterials", "fuel cells"],
    },
    provenance: v3(confirmNote),
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
