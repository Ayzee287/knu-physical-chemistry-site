import type { Localised } from "@/lib/provenance";

// Typed local image registry.
//
// All imagery is stored locally under /public/images/{staff,research,campus} and
// referenced through this registry — never by raw string paths scattered through
// components, and never by hotlinking legacy remote URLs. Components accept a
// resolved `SiteImage | undefined` and must render a designed reserved state
// (see components/ui/figure.tsx and the StaffCard portrait fallback) when the
// image is not yet available.
//
// To register an image:
//   1. Place the optimised file under public/images/<collection>/<name>.<ext>
//   2. Add an entry here with real dimensions and a bilingual alt text.
//   3. Reference it by key from the content collection (e.g. a staff record).
//
// The registry is empty at bootstrap by design: no photography has been cleared
// for publication yet (see docs/content-audit). Photo URLs of record are listed
// in source-materials/ for the future download-and-localise pass.

export type SiteImage = {
  /** Path under /public, e.g. "/images/staff/example.jpg". */
  src: string;
  width: number;
  height: number;
  alt: Localised;
  /**
   * Archival cropping: CSS object-position for the fixed-ratio plates
   * (portraits sit eyes-in-upper-third, e.g. "50% 30%"). Optional — defaults
   * to center crop.
   */
  position?: string;
};

const registry = {} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof registry & string;

/** Resolve an image key to its registered image; undefined keys flow through. */
export function getImage(key: ImageKey | undefined): SiteImage | undefined {
  if (!key) return undefined;
  return registry[key];
}
