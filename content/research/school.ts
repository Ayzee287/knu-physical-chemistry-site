import type { Locale } from "@/lib/i18n";
import {
  claim,
  fromDeptProfile,
  fromPhyschem,
  type Claim,
  type Localised,
  type Provenance,
} from "@/lib/provenance";

// The department's scientific school.
//
// Sources: the v3 department profile (current styling of the school record)
// and the legacy school page (lineage detail; snapshot
// source-materials/physchem-knu-ua/shkola_ukr.html). NAME CONFLICT recorded:
// v3 styles it «Фізична хімія каталізаторів, сорбентів та сплавів»; the
// legacy page «Фізико-хімічні властивості каталізаторів, сорбентів і
// сплавів». The newer styling is published; the variant stays in this note.
//
// LANGUAGE POLICY: the published selected-works list contains
// Ukrainian-language editions only. The school's earlier Soviet-period
// monographs exist in the source snapshots; the public site carries no
// russian-language text (operator directive, 2026-06-10).

export const schoolName: Claim<Localised> = claim(
  {
    ua: "Фізична хімія каталізаторів, сорбентів та сплавів",
    en: "Physical chemistry of catalysts, sorbents and alloys",
  },
  fromDeptProfile("Current styling; legacy variant «Фізико-хімічні властивості…» recorded in collection notes."),
);

export const schoolLineage: Claim<Localised> = claim(
  {
    ua: "Школу засновано 1944 року академіком І. М. Францевичем; її розвивали В. Н. Єременко, М. В. Товбін, Г. І. Баталін та В. К. Яцимирський.",
    en: "The school was founded in 1944 by Academician I. M. Frantsevych and developed under V. N. Yeremenko, M. V. Tovbin, H. I. Batalin and V. K. Yatsymyrskyi.",
  },
  fromPhyschem(
    "shkola_ukr.html",
    "Founder named on the legacy page; v3 confirms the 1944 founding. Current leadership intentionally not stated.",
  ),
);

/**
 * Display figures for the homepage record strip («Кафедра у цифрах») —
 * single numerals lifted from claims already published on /research, so the
 * strip elevates the existing record without extending the verification
 * surface (ADR-0008).
 */
export const schoolFounded: Claim<string> = claim(
  "1944",
  fromDeptProfile("Founding year of the school; the same year is carried by schoolLineage below."),
);

export const schoolDissertationsCount: Claim<string> = claim(
  "36",
  fromDeptProfile("Display figure; the full sentence claim (6 doctoral, 19 candidate) is schoolDissertations below."),
);

/** Defended dissertations within the school — per the department's own data. */
export const schoolDissertations: Claim<Localised> = claim(
  {
    ua: "У межах школи захищено 36 дисертацій, зокрема 6 докторських і 19 кандидатських.",
    en: "Thirty-six dissertations have been defended within the school, including 6 doctoral and 19 candidate theses.",
  },
  fromDeptProfile("Figure attributed by the source to the department's own site data."),
);

// Selected works of the school — Ukrainian-language editions, cited as the
// department's own materials cite them.
export type SchoolWork = { year: string; citation: string };

export const selectedWorks: Claim<SchoolWork[]> = claim(
  [
    {
      year: "1975",
      citation: "Товбін М. В. Фізична хімія. — Київ, 1975.",
    },
    {
      year: "1992",
      citation: "Яцимирський В. К. Фізична хімія рівноважних систем. — Київ, 1992.",
    },
    {
      year: "1997",
      citation: "Яцимирський К. Б., Яцимирський В. К. Хімічний зв’язок. — Київ, 1997 (2-ге видання).",
    },
    {
      year: "2007",
      citation: "Яцимирський В. К. Фізична хімія. — Київ, 2007.",
    },
    {
      year: "2012",
      citation: "Іщенко О. В. та ін. Статистичні методи у хімії. — Донецьк, 2012.",
    },
  ],
  fromPhyschem(
    "shkola_ukr.html",
    "Ukrainian-language editions from the school's published list (titles as cited in the department's history/school pages); the full list incl. earlier Soviet-period editions remains in the snapshot.",
  ),
);

export type LocalisedSchool = {
  name: string;
  lineage: string;
  dissertations: string;
  works: SchoolWork[];
  provenance: {
    name: Provenance;
    lineage: Provenance;
    dissertations: Provenance;
    works: Provenance;
  };
};

export function getSchool(lang: Locale): LocalisedSchool {
  return {
    name: schoolName.value[lang],
    lineage: schoolLineage.value[lang],
    dissertations: schoolDissertations.value[lang],
    works: selectedWorks.value,
    provenance: {
      name: schoolName.provenance,
      lineage: schoolLineage.provenance,
      dissertations: schoolDissertations.provenance,
      works: selectedWorks.provenance,
    },
  };
}
