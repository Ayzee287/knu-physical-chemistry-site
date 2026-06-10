import type { Locale } from "@/lib/i18n";
import type { OfficialLink } from "@/types/content";
import {
  claim,
  fromChemKnu,
  fromDeptProfile,
  sourced,
  SOURCES,
  type Claim,
  type Localised,
  type Provenance,
} from "@/lib/provenance";

// Contact facts.
//
// The v3 department profile supplies DEPARTMENT-level contacts (phone, email,
// address) consistent with the legacy contacts page's phone — and resolves the
// old address conflict: the department sits in the faculty building at
// Скоропадського 12 (the legacy Володимирська 62А address was stale).
// Contacts are navigational, low-stakes claims: published with provenance.

const address: Claim<Localised<string[]>> = claim(
  {
    ua: ["вул. Гетьмана Павла Скоропадського, 12", "Київ, 01033, Україна"],
    en: ["12 Hetmana Pavla Skoropadskoho St", "Kyiv 01033, Ukraine"],
  },
  fromDeptProfile(
    "Department address per the v3 profile — same building as the faculty; supersedes the legacy site's stale Volodymyrska address.",
  ),
);

// Department-level contacts (v3 profile; phone matches the legacy contacts page).
const departmentPhone: Claim<string> = claim(
  "+38 (044) 239-33-93",
  fromDeptProfile("Consistent with the legacy contacts page (head's office, room 218)."),
);
const departmentEmail: Claim<string> = claim(
  "ifritsky@univ.kiev.ua",
  fromDeptProfile("The department lists the head's mailbox as the departmental contact."),
);

// Faculty-level contacts (kept as the institutional fallback channel).
const email: Claim<string> = claim("chem@knu.ua", fromChemKnu("Faculty inbox."));
const phone: Claim<string> = claim(
  "+38 (044) 239-33-58",
  fromChemKnu("Faculty number."),
);

export const contact = { address, email, phone, departmentPhone, departmentEmail };

// ── Unpublished backlog ──────────────────────────────────────────────────────
// The legacy head-office phone was PROMOTED to `departmentPhone` above after
// the v3 profile independently listed the same number. The secretary line
// remains backlog (single stale source).
export const legacyDepartmentContacts = {
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
  departmentPhone: { value: string; provenance: Provenance };
  departmentEmail: { value: string; provenance: Provenance };
  links: Array<{ id: string; label: string; url: string; provenance: Provenance }>;
};

export function getContact(lang: Locale): LocalisedContact {
  return {
    address: { value: address.value[lang], provenance: address.provenance },
    email,
    phone,
    departmentPhone,
    departmentEmail,
    links: officialLinks.map((link) => ({
      id: link.id,
      label: link.label[lang],
      url: link.url,
      provenance: link.provenance,
    })),
  };
}
