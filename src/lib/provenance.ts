// Provenance layer — inherited from the KNU Chemistry faculty project.
//
// Every discrete factual claim published by the site (a person's name, a postal
// address, a phone number) carries the provenance of that claim, so content
// stays operationally traceable and no fact is published with silent certainty.
// This module defines the trust vocabulary and small constructors; rendering of
// the editor-facing marker lives in components/ui/review-mark.tsx.

import type { Locale } from "@/lib/i18n";

/**
 * The trust state of a factual claim.
 *
 * - verified    — independently confirmed against an authoritative source.
 * - sourced     — taken from a reference source but NOT yet independently
 *                 verified. Traceable, but must not be treated as settled truth.
 * - placeholder — an intentional stand-in; makes no factual claim at all.
 * - editorial   — original editorial framing (tone, structure, summaries); not
 *                 a discrete external fact to be verified.
 */
export type ProvenanceState = "verified" | "sourced" | "placeholder" | "editorial";

export type Provenance = {
  state: ProvenanceState;
  /** Canonical URL or citation the claim was taken from. */
  source?: string;
  /** ISO-8601 date (YYYY-MM-DD) the value was captured from `source`. */
  retrieved?: string;
  /** Reviewer-facing note: what still needs checking, caveats, etc. */
  note?: string;
};

/** A published value paired with the provenance of the claim it makes. */
export type Claim<T> = { value: T; provenance: Provenance };

export function claim<T>(value: T, provenance: Provenance): Claim<T> {
  return { value, provenance };
}

// Constructors — keep call sites declarative about the trust state.

/** A claim taken from a reference source but not independently verified. */
export const sourced = (
  source: string,
  retrieved: string,
  note?: string,
): Provenance => ({ state: "sourced", source, retrieved, note });

/** A claim independently confirmed against an authoritative source. */
export const verified = (source?: string, retrieved?: string): Provenance => ({
  state: "verified",
  source,
  retrieved,
});

/** An intentional stand-in that makes no factual claim. */
export const placeholder = (note?: string): Provenance => ({
  state: "placeholder",
  note,
});

/** Original editorial framing, not a discrete external fact. */
export const editorial = (note?: string): Provenance => ({
  state: "editorial",
  note,
});

// Known reference sources, defined once so retrieval dates stay consistent and
// re-verification is a single edit. Sourced from these means traceable, NOT trusted.
export const SOURCES = {
  /**
   * Faculty staff directory document (source-materials/chemistry_faculty_knu.html),
   * itself compiled from knu.ua / chem.knu.ua / anchem.knu.ua in June 2026.
   * Secondary source — every claim taken from it needs independent verification.
   */
  staffDirectory: {
    url: "source-materials/chemistry_faculty_knu.html",
    retrieved: "2026-06-10",
  },
  /**
   * Expanded faculty staff directory, v2 (source-materials/
   * chemistry_faculty_knu_v2.html) — received 2026-06-10, ~20:30. Adds full
   * per-department teaching rosters (incl. Physical Chemistry), dean's office
   * and department heads. Auto-generated secondary source; fresher than v1
   * (cites a July-2025 rector's order) but every current-personnel claim
   * still requires verification.
   */
  staffDirectoryV2: {
    url: "source-materials/chemistry_faculty_knu_v2.html",
    retrieved: "2026-06-10",
  },
  /**
   * Department profile document, v3 (source-materials/physchemistry_knu.html)
   * — received 2026-06-10 (late). Department-specific: full profile of the
   * head, per-person ORCID records, six research groups, department contacts,
   * school record. Cites the university's CURRENT information systems
   * (physchem.knu.ua · infopacket.knu.ua · vstup.chem.knu.ua, June 2026).
   * The strongest source held; still secondary and auto-generated.
   */
  deptProfile: {
    url: "source-materials/physchemistry_knu.html",
    retrieved: "2026-06-10",
  },
  /** Faculty of Chemistry site — reference/terminology source. */
  chemKnu: { url: "https://chem.knu.ua/", retrieved: "2026-06-09" },
  /**
   * Official departmental site. Confirmed reachable and self-identifying as
   * the department on 2026-06-10 («Кафедра фізичної хімії Хімічного
   * факультету...»). Legacy DW6-template site, ©2009 — authoritative as the
   * department's own published record, but stale: current-state claims taken
   * from it still need confirmation with the department. Retrieved page
   * snapshots live in source-materials/physchem-knu-ua/.
   */
  physchemKnu: {
    url: "https://physchem.knu.ua/index_ua.html",
    retrieved: "2026-06-10",
  },
} as const;

/**
 * A `sourced` claim attributed to a specific page of the official department
 * site (legacy, ©2009). `page` is the path after the origin, e.g.
 * "history_ukr.html"; a snapshot of each cited page is committed under
 * source-materials/physchem-knu-ua/.
 */
export const fromPhyschem = (page: string, note?: string): Provenance =>
  sourced(`https://physchem.knu.ua/${page}`, "2026-06-10", note);

/** Convenience: a `sourced` claim attributed to the staff directory document. */
export const fromStaffDirectory = (note?: string): Provenance =>
  sourced(SOURCES.staffDirectory.url, SOURCES.staffDirectory.retrieved, note);

/** Convenience: a `sourced` claim attributed to the v2 staff directory. */
export const fromStaffDirectoryV2 = (note?: string): Provenance =>
  sourced(SOURCES.staffDirectoryV2.url, SOURCES.staffDirectoryV2.retrieved, note);

/** Convenience: a `sourced` claim attributed to the v3 department profile. */
export const fromDeptProfile = (note?: string): Provenance =>
  sourced(SOURCES.deptProfile.url, SOURCES.deptProfile.retrieved, note);

/** Convenience: a `sourced` claim attributed to chem.knu.ua. */
export const fromChemKnu = (note?: string): Provenance =>
  sourced(SOURCES.chemKnu.url, SOURCES.chemKnu.retrieved, note);

// Human-readable labels for the editor-facing marker.
export const STATE_LABELS: Record<ProvenanceState, string> = {
  verified: "Verified",
  sourced: "Sourced — unverified",
  placeholder: "Placeholder",
  editorial: "Editorial",
};

/** Short tag shown inline in review mode. */
export const STATE_TAGS: Record<ProvenanceState, string> = {
  verified: "verified",
  sourced: "unverified",
  placeholder: "placeholder",
  editorial: "editorial",
};

/**
 * Whether provenance markers should render.
 *
 * Markers are an editor/reviewer aid and must NOT reach the public site. They
 * render in development by default, and can be turned on for a specific
 * (preview) build by setting NEXT_PUBLIC_PROVENANCE_REVIEW=1. Because the
 * institutional pages are statically generated, this is resolved at build time,
 * so toggling it on a deployed preview requires a rebuild.
 */
export function isReviewMode(): boolean {
  return (
    process.env.NEXT_PUBLIC_PROVENANCE_REVIEW === "1" ||
    process.env.NODE_ENV !== "production"
  );
}

// Re-exported here so content modules have one import for the locale-keyed
// shape used throughout the bilingual content layer.
export type Localised<T = string> = Record<Locale, T>;
