import type { Locale } from "@/lib/i18n";
import type { LocalisedStaffMember, StaffMember } from "@/types/content";
import { claim, fromStaffDirectoryV2 } from "@/lib/provenance";
import { resolvePerson } from "@content/staff/publication";

// Faculty leadership — the institutional context the department works in.
// Kept SEPARATE from the departmental staff collection: the dean is faculty
// leadership, not departmental staff, and renders only as a restrained
// leadership block on /about (never as "another staff card").
//
// Same two publication gates as content/staff/staff.ts: visibility (curated
// surface) and provenance. The dean is `featured` and publishes with sourced
// provenance under ADR-0005 (review marks carry the trust state until
// verification); a claim with no factual sourcing would render as an honest
// pending placeholder. Trust resolution is the shared gate in
// @content/staff/publication.

const v2 = fromStaffDirectoryV2;

export const leadership: StaffMember[] = [
  {
    id: "dean",
    rank: "dean",
    visibility: "featured",
    role: { ua: "Декан хімічного факультету", en: "Dean of the Faculty of Chemistry" },
    person: claim(
      {
        name: { ua: "Воловенко Юліан Михайлович", en: "Yulian M. Volovenko" },
        degree: {
          ua: "доктор хімічних наук, професор, заслужений професор КНУ",
          en: "Dr. Sc. (Chemistry), Professor, Distinguished Professor of KNU",
        },
        focus: {
          ua: "гетероциклічна хімія та синтез нових органічних сполук",
          en: "heterocyclic chemistry and the synthesis of new organic compounds",
        },
      },
      v2(
        "Dean since 2007 per both directory versions; also on knu.ua faculty administration page (photo URL of record). " +
          "State-prize and Toulouse-academy honour claims in the source bio are NOT recorded here pending verification. " +
          "The faculty project withheld the dean under the same policy — stay consistent.",
      ),
    ),
    email: claim("volovenko@knu.ua", v2()),
    photo: "dean",
  },
  {
    id: "vice-dean-education",
    rank: "vice-dean",
    visibility: "internal",
    role: { ua: "Заступник декана з навчальної роботи", en: "Vice-Dean for Education" },
    person: claim(
      {
        name: { ua: "Усенко Наталія Ігорівна", en: "Nataliia I. Usenko" },
        degree: { ua: "кандидат хімічних наук, доцент", en: "Cand. Sc. (Chemistry), Associate Professor" },
      },
      v2("Same person as the departmental record content/staff/staff.ts#usenko — verify once, publish in both roles."),
    ),
    email: claim("nataliya_usenko@knu.ua", v2()),
  },
  {
    id: "vice-dean-science",
    rank: "vice-dean",
    visibility: "internal",
    role: { ua: "Заступник декана з наукової роботи", en: "Vice-Dean for Research" },
    person: claim(
      {
        name: { ua: "Куцевол Наталія Володимирівна", en: "Nataliia V. Kutsevol" },
        degree: {
          ua: "доктор хімічних наук, провідний науковий співробітник",
          en: "Dr. Sc. (Chemistry), Leading Researcher",
        },
      },
      v2("Faculty-level record; not departmental staff."),
    ),
    email: claim("nataliya.kutsevol@knu.ua", v2()),
  },
];

/** The dean's public view — publishes sourced records per ADR-0005. */
export function getDean(lang: Locale): LocalisedStaffMember {
  return resolvePerson(leadership[0], lang);
}
