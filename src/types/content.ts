// Shared shapes of the typed content collections under /content.
//
// Collections are plain TypeScript modules (no CMS, no runtime loaders): the
// type system IS the content schema. Discrete factual fields are wrapped in
// `Claim<T>` so every real-world fact carries provenance (see lib/provenance).

import type { Claim, Localised, Provenance } from "@/lib/provenance";
import type { ImageKey } from "@/lib/images";

/** A member of the department's academic staff. */
export type StaffMember = {
  id: string;
  /** Structural role label (e.g. "Завідувач кафедри") — editorial, always shown. */
  role: Localised;
  /**
   * The person occupying the role — a single factual claim covering name,
   * degree line and optional honours/focus. Publication policy: a person is
   * rendered on the public site ONLY when this claim is `verified`; otherwise
   * an honest pending placeholder is shown and the record below remains the
   * verification backlog (decision 0001).
   */
  person: Claim<{
    name: Localised;
    degree?: Localised;
    honours?: Localised;
    focus?: Localised;
  }>;
  email?: Claim<string>;
  orcid?: Claim<string>;
  photo?: ImageKey;
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
  email: string | null;
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
