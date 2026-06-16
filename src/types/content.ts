// Shared shapes of the typed content collections under /content.
//
// Collections are plain TypeScript modules (no CMS, no runtime loaders): the
// type system IS the content schema. Discrete factual fields are wrapped in
// `Claim<T>` so every real-world fact carries provenance (see lib/provenance).

import type { Claim, Localised, Provenance } from "@/lib/provenance";
import type { ImageKey } from "@/lib/images";

/** Institutional rank — drives ordering and grouping, never invented. */
export type StaffRank =
  | "dean"
  | "vice-dean"
  | "head"
  | "professor"
  | "docent"
  | "assistant"
  | "researcher";

/**
 * Editorial publication governance (separate from provenance):
 * - featured — the CURATED leadership surface: head, dean, the leading faculty
 *   shown on the homepage / "Провідні викладачі". Still subject to the
 *   verified-or-sourced rule for the person.
 * - staff — the department's teaching & research staff. Renders on /staff
 *   (the complete teaching-staff directory, ADR-0012) but NOT on the curated
 *   homepage. Same person gate as featured.
 * - internal — normalized and archived in the collection, never rendered
 *   publicly (e.g. faculty-level records that are not departmental staff).
 */
export type StaffVisibility = "featured" | "staff" | "internal";

/** A member of the department's academic staff (or faculty leadership). */
export type StaffMember = {
  id: string;
  /**
   * URL slug for the person's profile route (`/staff/<slug>`). Part of the
   * directory identity, not a fact about the person — it is the stable public
   * address of the record (ADR-0014). Transliterated from the surname.
   */
  slug: string;
  rank: StaffRank;
  /** Structural role label (e.g. "Завідувач кафедри") — editorial, always shown. */
  role: Localised;
  /**
   * The person occupying the role — a single factual claim covering name,
   * degree line and optional honours/focus. Publication policy (ADR-0001 as
   * amended by ADR-0005): a person renders on the public site only when the
   * record is `featured` AND this claim is `verified` or `sourced` (sourced
   * publication is operator-authorized; review marks carry the trust state
   * until verification). Claims with no factual sourcing (placeholder/
   * editorial) render as an honest pending placeholder.
   */
  person: Claim<{
    name: Localised;
    degree?: Localised;
    honours?: Localised;
    focus?: Localised;
  }>;
  email?: Claim<string>;
  orcid?: Claim<string>;
  /** Optional selected publications (verbatim citations, source-backed). */
  publications?: Claim<string[]>;
  photo?: ImageKey;
  visibility: StaffVisibility;
};

/** The public, locale-resolved view of a staff member. */
export type LocalisedStaffMember = {
  id: string;
  /** Profile-route slug, carried through so cards/links can address the page. */
  slug: string;
  role: string;
  /** Placeholder text when the underlying person claim is not verified. */
  name: string;
  /** null when the person is withheld — render sites drop the line entirely. */
  degree: string | null;
  honours: string | null;
  /** One-line research identity (from the person claim's focus field). */
  focus: string | null;
  email: string | null;
  orcid: string | null;
  provenance: Provenance;
  photo?: ImageKey;
};

// ── Staff research profiles (ADR-0014) ──────────────────────────────────────
//
// A dedicated `/staff/<slug>` page per published member. The rich, long-form
// profile content lives in a SEPARATE, OPTIONAL collection keyed by the
// StaffMember.id (content/staff/profiles.ts), so the lean directory record and
// its compact card are never inflated (Phase A rule). Every discrete profile
// fact is a `Claim` carrying its own provenance, published `sourced` until a
// human verifies it with the department — never AI-verified. Volatile
// statistics (h-index, publication/dissertation counts) are NOT modelled as
// publishable fields and must not be added here.

/** A titled biography section — rendered collapsed in the profile UI. */
export type BioSection = { heading: Localised; body: Localised<string[]> };

/**
 * A dated honour or recognised result. NON-volatile by contract: a discrete,
 * datable distinction (a prize, an election) — never a running count.
 */
export type Achievement = { year?: string; text: Localised };

/**
 * External scholarly profile links. Each is an independent `Claim` because each
 * is a distinct sourced (or verified) URL; populated only where a real address
 * is sourced — never fabricated. ORCID stays on the StaffMember record.
 */
export type ScholarlyLinks = {
  scholar?: Claim<string>;
  scopus?: Claim<string>;
  researchgate?: Claim<string>;
};

/**
 * The rich research profile of a staff member — keyed by `id` to a StaffMember,
 * OPTIONAL per person. A profile page renders the directory identity always and
 * these fields where authored; adding a profile is purely additive content, no
 * code change (the migration path for the remaining staff, ADR-0014).
 */
export type StaffProfile = {
  /** Must match a StaffMember.id. */
  id: string;
  /** Two–three sentence lede; the only prominent prose, shown first. */
  overview?: Claim<Localised>;
  /** Research focus expanded beyond the one-line directory `focus`. */
  research?: Claim<Localised>;
  /** Long biography, split into titled sections, collapsed in the UI. */
  biography?: Claim<BioSection[]>;
  /** Dated honours / recognised results (non-volatile). */
  achievements?: Claim<Achievement[]>;
  /** Taught courses, verbatim titles. */
  courses?: Claim<Localised<string[]>>;
  /** Selected publications — verbatim citations (locale-agnostic). */
  publications?: Claim<string[]>;
  /** Google Scholar / Scopus / ResearchGate, where sourced. */
  links?: ScholarlyLinks;
  /** Office / room. */
  office?: Claim<Localised>;
  /** Direct phone. */
  phone?: Claim<string>;
};

/** The public, locale-resolved view of a staff profile (sections → one locale). */
export type LocalisedStaffProfile = {
  id: string;
  overview: { text: string; provenance: Provenance } | null;
  research: { text: string; provenance: Provenance } | null;
  biography: { sections: { heading: string; body: string[] }[]; provenance: Provenance } | null;
  achievements: { items: { year: string | null; text: string }[]; provenance: Provenance } | null;
  courses: { items: string[]; provenance: Provenance } | null;
  publications: { items: string[]; provenance: Provenance } | null;
  links: { label: "scholar" | "scopus" | "researchgate"; url: string; provenance: Provenance }[];
  office: { text: string; provenance: Provenance } | null;
  phone: { text: string; provenance: Provenance } | null;
};

/** A research direction of the department. */
export type ResearchArea = {
  id: string;
  title: Localised;
  summary: Localised;
  /** Short topic keywords within the direction (conservative, source-backed). */
  topics?: Localised<string[]>;
  /**
   * editorial — discipline-level framing of the department's field;
   * sourced   — taken from the department's own published record.
   * Specific groups (people, labs, projects) require department-provided data.
   */
  provenance: Provenance;
};

export type LocalisedResearchArea = {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  provenance: Provenance;
};

/** A labelled external resource (official sites of record). */
export type OfficialLink = {
  id: string;
  label: Localised;
  url: string;
  provenance: Provenance;
};
