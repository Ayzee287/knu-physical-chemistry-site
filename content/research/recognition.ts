import type { Locale } from "@/lib/i18n";
import { fromDeptProfile, type Localised, type Provenance } from "@/lib/provenance";

// Departmental recognition record — the homepage's dated authority surface
// (ADR-0008). Stable, dated results and honours from the v3 department
// profile, published as `sourced` with review marks until verification.
//
// CURATION BOUNDARY (ADR-0005 still holds, as extended by ADR-0008):
// - stable + dated + departmental significance → publishable here;
// - volatile metrics (h-index, publication counts, citation rankings) and
//   undated honours stay in source notes. The Georg Forster Prize (FRG) is
//   recorded in the head's source profile but carries no date there — it
//   stays unpublished until the department supplies one.
// Entries are chronological (ascending), matching the history and
// bibliography surfaces — an archival record, not a highlights reel.

export type Recognition = {
  id: string;
  /** Display period: a year or an en-dash span, matching history rows. */
  years: string;
  title: Localised;
  detail: Localised;
  provenance: Provenance;
};

const v3 = fromDeptProfile;

export const recognition: Recognition[] = [
  {
    id: "state-prize",
    years: "2007",
    title: {
      ua: "Державна премія України в галузі науки і техніки",
      en: "State Prize of Ukraine in Science and Technology",
    },
    detail: {
      ua: "Лауреат премії — завідувач кафедри І. О. Фрицький.",
      en: "Awarded to the head of department, I. O. Fritsky.",
    },
    provenance: v3(
      "Dated prize from the head's profile («Лауреат Державної премії України в галузі науки і техніки (2007)»). Stable historical fact, published under ADR-0008.",
    ),
  },
  {
    id: "international-projects",
    years: "2013–2020",
    title: {
      ua: "Міжнародні проєкти та спільні дослідження",
      en: "International projects and joint research",
    },
    detail: {
      ua: "Спільні дисертації з Францією (2013); проєкт зі спінових переходів з університетами Іспанії, Франції, Румунії та Молдови (2017–2020); синхротронні вимірювання в центрах Словаччини, Польщі та Франції.",
      en: "Joint dissertations with France (2013); a spin-crossover project with universities in Spain, France, Romania and Moldova (2017–2020); synchrotron measurements at facilities in Slovakia, Poland and France.",
    },
    provenance: v3(
      "Cooperation lines from the Fritsky and Roik group programmes. The partner-university list (Heidelberg, Göttingen, Mainz, Toulouse, Orléans, Lund, Valencia) is kept in source notes — names without project dates.",
    ),
  },
  {
    id: "fe-iv-natcomms",
    years: "2017",
    title: {
      ua: "Сполуки Fe(IV), стабільні у водному розчині",
      en: "Fe(IV) compounds stable in aqueous solution",
    },
    detail: {
      ua: "Ключовий результат групи координаційної хімії — сполуки феруму(IV), стабільні у воді за кімнатної температури; опубліковано в Nature Communications (2017).",
      en: "A key result of the coordination-chemistry group — iron(IV) compounds stable in water at room temperature, published in Nature Communications (2017).",
    },
    provenance: v3(
      "Result and journal attribution exactly as the profile states them («Ключовий результат: сполуки Fe⁴⁺, стабільні у воді при кімнатній температурі (Nature Communications, 2017)»).",
    ),
  },
  {
    id: "nas-membership",
    years: "2021",
    title: {
      ua: "Обрання до Національної академії наук України",
      en: "Election to the National Academy of Sciences of Ukraine",
    },
    detail: {
      ua: "Завідувача кафедри І. О. Фрицького обрано членом-кореспондентом НАН України.",
      en: "The head of department, I. O. Fritsky, was elected a Corresponding Member of the NAS of Ukraine.",
    },
    provenance: v3(
      "Consistent with the honours line already published on the staff record (corresponding membership dated 2021).",
    ),
  },
];

export type LocalisedRecognition = {
  id: string;
  years: string;
  title: string;
  detail: string;
  provenance: Provenance;
};

export function getRecognition(lang: Locale): LocalisedRecognition[] {
  return recognition.map((r) => ({
    id: r.id,
    years: r.years,
    title: r.title[lang],
    detail: r.detail[lang],
    provenance: r.provenance,
  }));
}
