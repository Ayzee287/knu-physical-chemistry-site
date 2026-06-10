import type { Locale } from "@/lib/i18n";
import {
  claim,
  fromPhyschem,
  type Claim,
  type Localised,
  type Provenance,
} from "@/lib/provenance";

// The department's scientific school — sourced from its own published record
// («Наукова школа з фізичної хімії», snapshot:
// source-materials/physchem-knu-ua/shkola_ukr.html).
//
// Published: the school's name, founding (1944, Frantsevych) and lineage —
// historical/structural facts. NOT published: the school's stated leadership
// and headcount figures (current-state claims of unknown date — backlog), and
// the page's full results narrative (kept in the snapshot).

const src = (note?: string) => fromPhyschem("shkola_ukr.html", note);

export const schoolName: Claim<Localised> = claim(
  {
    ua: "Фізико-хімічні властивості каталізаторів, сорбентів і сплавів",
    en: "Physicochemical properties of catalysts, sorbents and alloys",
  },
  src("Official school name as registered by the department."),
);

export const schoolLineage: Claim<Localised> = claim(
  {
    ua: "Школу засновано 1944 року академіком І. М. Францевичем; її розвивали В. Н. Єременко, М. В. Товбін, Г. І. Баталін та В. К. Яцимирський.",
    en: "The school was founded in 1944 by Academician I. M. Frantsevych and developed under V. N. Yeremenko, M. V. Tovbin, H. I. Batalin and V. K. Yatsymyrskyi.",
  },
  src("Historical lineage per the department's record; current leadership intentionally not stated."),
);

// Selected monographs and textbooks of the school, era-spanning, cited
// verbatim from the source (bibliographic facts; titles stay in their
// original language in both locales, per academic convention).
export type SchoolWork = { year: string; citation: string };

export const selectedWorks: Claim<SchoolWork[]> = claim(
  [
    {
      year: "1963",
      citation:
        "Францевич И.Н., Войтович Р.Ф., Лавренко В.А. Высокотемпературное окисление металлов и сплавов. — Киев, 1963.",
    },
    {
      year: "1975",
      citation: "Товбин М.В. Физическая химия. — Киев, 1975.",
    },
    {
      year: "1983",
      citation:
        "Баталин Г.И., Белобородова Е.А., Казимиров В.П. Термодинамика и строение жидких сплавов на основе алюминия. — Киев, 1983.",
    },
    {
      year: "2002",
      citation:
        "Гончарук В.В., Камалов Г.Л., Ковтун Г.А., Рудаков Е.С., Яцимирский В.К. Катализ. Механизмы гомогенного и гетерогенного катализа, кластерные подходы. — Киев: Наукова думка, 2002.",
    },
    {
      year: "2007",
      citation: "Яцимирський В.К. Фізична хімія. — Київ, 2007.",
    },
  ],
  src("Selection (5 of 10) from the school's published list; full list in the snapshot."),
);

export type LocalisedSchool = {
  name: string;
  lineage: string;
  works: SchoolWork[];
  provenance: {
    name: Provenance;
    lineage: Provenance;
    works: Provenance;
  };
};

export function getSchool(lang: Locale): LocalisedSchool {
  return {
    name: schoolName.value[lang],
    lineage: schoolLineage.value[lang],
    works: selectedWorks.value,
    provenance: {
      name: schoolName.provenance,
      lineage: schoolLineage.provenance,
      works: selectedWorks.provenance,
    },
  };
}
