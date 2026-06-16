import type { Locale } from "@/lib/i18n";
import type { LocalisedStaffMember, StaffMember } from "@/types/content";
import { placeholder, type Localised } from "@/lib/provenance";

// The single implementation of the person-publication gate (ADR-0001 as
// amended by ADR-0005), shared by the staff and leadership collections so the
// policy cannot drift between them:
//
//   - `verified` or `sourced` person claim → publish, review marks carry the
//     trust state until verification.
//   - `placeholder`/`editorial` (no factual sourcing) → an honest pending
//     placeholder; null detail lines, which render sites drop entirely.
//
// The visibility gate (featured / staff / internal — ADR-0004, extended by
// ADR-0012) stays with the callers via the getters — it is editorial
// curation/placement, not trust resolution, and is orthogonal to this gate.

const namePending: Localised = {
  ua: "Ім’я уточнюється",
  en: "Name to be confirmed",
};

const personWithheld = placeholder(
  "Person record withheld: claim carries no publishable provenance.",
);

/** Resolve one staff/leadership record to its public, locale-resolved view. */
export function resolvePerson(
  member: StaffMember,
  lang: Locale,
): LocalisedStaffMember {
  const state = member.person.provenance.state;
  const publishable = state === "verified" || state === "sourced";
  if (!publishable) {
    return {
      id: member.id,
      slug: member.slug,
      role: member.role[lang],
      name: namePending[lang],
      degree: null,
      honours: null,
      focus: null,
      email: null,
      orcid: null,
      provenance: personWithheld,
      photo: member.photo,
    };
  }
  const person = member.person.value;
  return {
    id: member.id,
    slug: member.slug,
    role: member.role[lang],
    name: person.name[lang],
    degree: person.degree?.[lang] ?? null,
    honours: person.honours?.[lang] ?? null,
    focus: person.focus?.[lang] ?? null,
    email: member.email?.value ?? null,
    orcid: member.orcid?.value ?? null,
    provenance: member.person.provenance,
    photo: member.photo,
  };
}
