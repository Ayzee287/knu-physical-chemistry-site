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
 * - featured — belongs to the CURATED public surface (head, dean, selected
 *   key figures). Still subject to the verified-only rule for the person.
 * - internal — normalized and archived in the collection, never rendered
 *   publicly. The public site is a curated institution, not a directory.
 */
export type StaffVisibility = "featured" | "internal";

/** A member of the department's academic staff (or faculty leadership). */
export type StaffMember = {
  id: string;
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
