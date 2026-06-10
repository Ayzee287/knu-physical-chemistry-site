import type { Locale } from "@/lib/i18n";
import type { LocalisedStaffMember, StaffMember } from "@/types/content";
import {
  claim,
  fromStaffDirectory,
  placeholder,
  type Localised,
} from "@/lib/provenance";

// Academic staff of the Department of Physical Chemistry.
//
// CONTENT REALITY (see docs/content-audit): the available source material — the
// faculty staff directory document — names only the head of this department.
// The full departmental roster does not exist in any source we hold; it must be
// provided or confirmed by the department before it can appear here. Never pad
// this collection with invented people.
//
// PUBLICATION POLICY (decision 0001, inherited from the faculty project): a
// person is published on the public site only when their claim is `verified`.
// A `sourced` person stays in this file as the verification-backlog record and
// renders as an honest pending placeholder. Flip the claim to verified(...) to
// publish.

export const staff: StaffMember[] = [
  {
    id: "head",
    role: { ua: "Завідувач кафедри", en: "Head of Department" },
    person: claim(
      {
        name: { ua: "Фрицький Ігор Олегович", en: "Igor O. Fritsky" },
        degree: {
          ua: "доктор хімічних наук, професор",
          en: "Dr. Sc. (Chemistry), Professor",
        },
        honours: {
          ua: "член-кореспондент НАН України",
          en: "Corresponding Member, NAS of Ukraine",
        },
        focus: {
          ua: "фізична хімія та координаційна хімія",
          en: "physical chemistry and coordination chemistry",
        },
      },
      fromStaffDirectory(
        "Verify current post-holder, degree and title with the department. " +
          "The NAS corresponding-membership honour is a hard claim — confirm against the NAS register. " +
          "Confirm the preferred EN transliteration of the name. " +
          "Corroboration (2026-06-10): the department's own legacy site names him head since 2005 " +
          "(history_ukr.html) and hosts his group subsection (fritsky/prof_ukr.html) — strong sourcing, " +
          "but the CURRENT post still needs a present-day confirmation before flipping to verified.",
      ),
    ),
  },
];

// Honest stand-in for a withheld (unverified) person.
const namePending: Localised = {
  ua: "Ім’я уточнюється",
  en: "Name to be confirmed",
};
const personWithheld = placeholder(
  "Person sourced from the staff directory but unverified; name, degree and honours withheld from publication until independently confirmed.",
);

export function getStaff(lang: Locale): LocalisedStaffMember[] {
  return staff.map((member) => {
    const isVerified = member.person.provenance.state === "verified";
    if (!isVerified) {
      return {
        id: member.id,
        role: member.role[lang],
        name: namePending[lang],
        degree: null,
        honours: null,
        email: null,
        provenance: personWithheld,
        photo: member.photo,
      };
    }
    const person = member.person.value;
    return {
      id: member.id,
      role: member.role[lang],
      name: person.name[lang],
      degree: person.degree?.[lang] ?? null,
      honours: person.honours?.[lang] ?? null,
      email: member.email?.value ?? null,
      provenance: member.person.provenance,
      photo: member.photo,
    };
  });
}

/** The head-of-department entry, used by the dedicated section on /staff. */
export function getHead(lang: Locale): LocalisedStaffMember {
  return getStaff(lang)[0];
}
