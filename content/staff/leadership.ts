import type { Locale } from "@/lib/i18n";
import type { LocalisedStaffMember, StaffMember } from "@/types/content";
import { claim, fromStaffDirectoryV2, placeholder, type Localised } from "@/lib/provenance";

// Faculty leadership — the institutional context the department works in.
// Kept SEPARATE from the departmental staff collection: the dean is faculty
// leadership, not departmental staff, and renders only as a restrained
// leadership block on /about (never as "another staff card").
//
// Same two publication gates as content/staff/staff.ts: visibility (curated
// surface) and provenance (verified-or-withheld). The dean is `featured` —
// the block itself is institutionally required — but the PERSON renders as
// an honest pending placeholder until verified (ADR-0001).

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

const namePending: Localised = {
  ua: "Ім’я уточнюється",
  en: "Name to be confirmed",
};
const personWithheld = placeholder(
  "Person sourced from the staff directories but unverified; withheld from publication until independently confirmed.",
);

/** The dean's public view — withheld-or-verified, same contract as staff. */
export function getDean(lang: Locale): LocalisedStaffMember {
  const dean = leadership[0];
  const isVerified = dean.person.provenance.state === "verified";
  if (!isVerified) {
    return {
      id: dean.id,
      role: dean.role[lang],
      name: namePending[lang],
      degree: null,
      honours: null,
      email: null,
      orcid: null,
      provenance: personWithheld,
      photo: dean.photo,
    };
  }
  const person = dean.person.value;
  return {
    id: dean.id,
    role: dean.role[lang],
    name: person.name[lang],
    degree: person.degree?.[lang] ?? null,
    honours: person.honours?.[lang] ?? null,
    email: dean.email?.value ?? null,
    orcid: dean.orcid?.value ?? null,
    provenance: dean.person.provenance,
    photo: dean.photo,
  };
}
