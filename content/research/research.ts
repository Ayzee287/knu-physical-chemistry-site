import type { Locale } from "@/lib/i18n";
import type { LocalisedResearchArea, ResearchArea } from "@/types/content";
import { editorial, fromStaffDirectory } from "@/lib/provenance";

// Research directions of the Department of Physical Chemistry.
//
// These entries are discipline-level framing of the department's field, NOT a
// claim of specific research groups, projects or publications — that detail
// must come from the department (see docs/content-audit). The one `sourced`
// entry has a documented signal in the staff directory (the head's stated
// field). The page copy around these cards states plainly that the detailed
// research profile is being compiled with the department.

export const researchAreas: ResearchArea[] = [
  {
    id: "thermodynamics-kinetics",
    title: {
      ua: "Хімічна термодинаміка та кінетика",
      en: "Chemical thermodynamics and kinetics",
    },
    summary: {
      ua: "Енергетика хімічних перетворень і швидкості, з якими вони відбуваються, — кількісна основа фізичної хімії.",
      en: "The energetics of chemical transformations and the rates at which they proceed — the quantitative core of physical chemistry.",
    },
    provenance: editorial("Discipline framing of the department's field."),
  },
  {
    id: "coordination-chemistry",
    title: {
      ua: "Координаційна хімія",
      en: "Coordination chemistry",
    },
    summary: {
      ua: "Будова, синтез і фізико-хімічні властивості координаційних сполук.",
      en: "Structure, synthesis and physicochemical properties of coordination compounds.",
    },
    provenance: fromStaffDirectory(
      "Signal: the head of department's stated field is physical and coordination chemistry. Confirm as a departmental research direction.",
    ),
  },
  {
    id: "interfacial-phenomena",
    title: {
      ua: "Фізична хімія міжфазних явищ",
      en: "Physical chemistry of interfacial phenomena",
    },
    summary: {
      ua: "Поверхневі та міжфазні процеси, адсорбція й колоїдні системи.",
      en: "Surface and interfacial processes, adsorption, and colloidal systems.",
    },
    provenance: editorial(
      "Inherited from the faculty project's editorial description of the department; confirm emphasis with the department.",
    ),
  },
];

export function getResearchAreas(lang: Locale): LocalisedResearchArea[] {
  return researchAreas.map((area) => ({
    id: area.id,
    title: area.title[lang],
    summary: area.summary[lang],
    provenance: area.provenance,
  }));
}
