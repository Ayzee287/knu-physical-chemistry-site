import type { Locale } from "@/lib/i18n";
import type { OfficialLink } from "@/types/content";
import {
  claim,
  fromChemKnu,
  sourced,
  SOURCES,
  type Claim,
  type Localised,
  type Provenance,
} from "@/lib/provenance";

// Contact facts.
//
// CONTENT REALITY: no department-specific postal address, room, phone or email
// exists in the source materials (see docs/content-audit). What we hold are
// FACULTY-level contacts, inherited from the faculty project's sourced records.
// They are published clearly labelled as faculty contacts; department-specific
// details are added here once the department provides and confirms them.

const address: Claim<Localised<string[]>> = claim(
  {
    ua: ["вул. Гетьмана Павла Скоропадського, 12", "Київ, 01033, Україна"],
    en: ["12 Hetmana Pavla Skoropadskoho St", "Kyiv 01033, Ukraine"],
  },
  fromChemKnu(
    "Faculty building address. Street renamed from Lva Tolstoho; confirm building number and postal index. Department rooms unknown.",
  ),
);

// Locale-invariant facts — stored as plain values, not localised maps.
const email: Claim<string> = claim("chem@knu.ua", fromChemKnu("Faculty inbox; department email unknown."));
const phone: Claim<string> = claim(
  "+38 (044) 239-33-58",
  fromChemKnu("Faculty number; department phone unknown."),
);

export const contact = { address, email, phone };

// ── Unpublished backlog ──────────────────────────────────────────────────────
// Department-level contacts found on the legacy official site's contacts page
// (snapshot: source-materials/physchem-knu-ua/contacts_ukr.html, ©2009).
// NOT rendered anywhere: the page carries a visible copy-paste error («кафедра
// органічної хімії» in the heading), an address that conflicts with the
// current faculty address (Володимирська 62А vs Скоропадського 12), and
// deprecated @univ.kiev.ua mailboxes. Publishing stale contacts is worse than
// publishing none. Kept solely as the verification-backlog record — confirm
// each value with the department, then promote into `contact` above.
export const legacyDepartmentContacts = {
  headPhone: claim(
    "+38 (044) 239-33-93",
    sourced(
      "https://physchem.knu.ua/contacts_ukr.html",
      "2026-06-10",
      "Legacy (©2009); page heading misnames the department — treat with caution.",
    ),
  ),
  secretaryPhone: claim(
    "+38 (044) 239-33-70",
    sourced(
      "https://physchem.knu.ua/contacts_ukr.html",
      "2026-06-10",
      "Legacy (©2009); confirm before publication.",
    ),
  ),
} as const;

// Official sites of record. Navigational, low-stakes claims — rendered
// regardless of verification state, with provenance kept for review.
export const officialLinks: OfficialLink[] = [
  {
    id: "department",
    label: {
      ua: "Офіційний сайт кафедри",
      en: "Official department website",
    },
    url: SOURCES.physchemKnu.url,
    provenance: sourced(
      SOURCES.physchemKnu.url,
      SOURCES.physchemKnu.retrieved,
      "Operator-provided official departmental site; legacy frame-based site could not be programmatically confirmed — verify manually.",
    ),
  },
  {
    id: "faculty",
    label: {
      ua: "Хімічний факультет",
      en: "Faculty of Chemistry",
    },
    url: "https://chem.knu.ua/",
    provenance: fromChemKnu(),
  },
  {
    id: "university",
    label: {
      ua: "Університет",
      en: "University",
    },
    url: "https://knu.ua/",
    provenance: fromChemKnu("Linked from the faculty site."),
  },
];

export type LocalisedContact = {
  address: { value: string[]; provenance: Provenance };
  email: { value: string; provenance: Provenance };
  phone: { value: string; provenance: Provenance };
  links: Array<{ id: string; label: string; url: string; provenance: Provenance }>;
};

export function getContact(lang: Locale): LocalisedContact {
  return {
    address: { value: address.value[lang], provenance: address.provenance },
    email,
    phone,
    links: officialLinks.map((link) => ({
      id: link.id,
      label: link.label[lang],
      url: link.url,
      provenance: link.provenance,
    })),
  };
}
