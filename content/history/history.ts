import type { Locale } from "@/lib/i18n";
import { claim, fromPhyschem, type Claim, type Localised, type Provenance } from "@/lib/provenance";

// History of the Department of Physical Chemistry — sourced from the
// department's own published history («Історія кафедри», legacy official site;
// snapshot: source-materials/physchem-knu-ua/history_ukr.html).
//
// These are PAST facts from the department's self-description: stable,
// low-volatility, publishable with provenance under ADR-0001 (the
// withhold-unverified rule targets CURRENT-personnel claims, not the
// historical record). Entries are deliberately terse — years, head, focus —
// and never stronger than the source text. Soviet-era honours are omitted
// from the published timeline (kept in the source snapshot) to keep entries
// factual and short.

const src = (note?: string) => fromPhyschem("history_ukr.html", note);

/** The department's founding year — its strongest single institutional fact. */
export const founded: Claim<string> = claim("1905", src());

export type HistoryPeriod = {
  id: string;
  /** Display period, e.g. "1905–1933". En-dash, no spaces. */
  years: string;
  head: Localised;
  focus: Localised;
  provenance: Provenance;
};

export const periods: HistoryPeriod[] = [
  {
    id: "speranskyi",
    years: "1905–1933",
    head: { ua: "О. В. Сперанський", en: "O. V. Speranskyi" },
    focus: {
      ua: "Заснування кафедри; термодинаміка концентрованих розчинів.",
      en: "Foundation of the department; thermodynamics of concentrated solutions.",
    },
    provenance: src("Source gives founding (1905) and successor start (1933); period bounds derived."),
  },
  {
    id: "volkov",
    years: "1933–1944",
    head: { ua: "К. П. Волков", en: "K. P. Volkov" },
    focus: {
      ua: "Коагуляція органозолей електролітами; адсорбція сильних електролітів.",
      en: "Coagulation of organosols by electrolytes; adsorption of strong electrolytes.",
    },
    provenance: src(),
  },
  {
    id: "frantsevych",
    years: "1944–1953",
    head: { ua: "І. М. Францевич", en: "I. M. Frantsevych" },
    focus: {
      ua: "Фізико-хімія поверхневих явищ, матеріалознавство, корозія; ініціатор створення Інституту проблем матеріалознавства.",
      en: "Physical chemistry of surface phenomena, materials science, corrosion; initiator of the Institute for Problems of Materials Science.",
    },
    provenance: src(),
  },
  {
    id: "yeremenko",
    years: "1953–1960",
    head: { ua: "В. Н. Єременко", en: "V. N. Yeremenko" },
    focus: {
      ua: "Теорія змочування рідкими металами; термодинаміка твердих і рідких сплавів.",
      en: "Theory of wetting by liquid metals; thermodynamics of solid and liquid alloys.",
    },
    provenance: src(),
  },
  {
    id: "tovbin",
    years: "1960–1965",
    head: { ua: "М. В. Товбін", en: "M. V. Tovbin" },
    focus: {
      ua: "Фізико-хімія поверхневих явищ, гетерогенний каталіз; підручник «Фізична хімія» (1975).",
      en: "Surface phenomena and heterogeneous catalysis; author of the textbook “Physical Chemistry” (1975).",
    },
    provenance: src(),
  },
  {
    id: "batalin",
    years: "1965–1987",
    head: { ua: "Г. І. Баталін", en: "H. I. Batalin" },
    focus: {
      ua: "Зв'язок термодинаміки і структури металічних та оксидних систем; дослідження тонких плівок.",
      en: "The relation between thermodynamics and structure of metallic and oxide systems; thin-film studies.",
    },
    provenance: src(),
  },
  {
    id: "yatsymyrskyi",
    years: "1988–2005",
    head: { ua: "В. К. Яцимирський", en: "V. K. Yatsymyrskyi" },
    focus: {
      ua: "Каталітичні системи в газофазних реакціях; сенсори газів; кластерний каталіз.",
      en: "Catalytic systems in gas-phase reactions; gas sensors; cluster catalysis.",
    },
    provenance: src(),
  },
  {
    id: "current",
    years: "2005–",
    // The source names the current head; the NAME stays withheld here in
    // alignment with ADR-0001 (current-personnel claim, pending verification —
    // see content/staff/staff.ts). The period itself is part of the record.
    head: { ua: "чинний завідувач кафедри", en: "the current head of department" },
    focus: {
      ua: "Біофізична хімія, електрохімія координаційних сполук, металокомплексний каталіз, магнетохімія.",
      en: "Biophysical chemistry, electrochemistry of coordination compounds, metal-complex catalysis, magnetochemistry.",
    },
    provenance: src("Head named in source and in staff directory; withheld pending verification (ADR-0001)."),
  },
];

export type LocalisedHistoryPeriod = {
  id: string;
  years: string;
  head: string;
  focus: string;
  provenance: Provenance;
};

export function getHistory(lang: Locale): LocalisedHistoryPeriod[] {
  return periods.map((p) => ({
    id: p.id,
    years: p.years,
    head: p.head[lang],
    focus: p.focus[lang],
    provenance: p.provenance,
  }));
}
