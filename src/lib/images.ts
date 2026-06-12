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
// Publication policy (ADR-0010, supersedes ADR-0009's quality bar; operator
// directive 2026-06-12): portraits originating from the university's own
// official information systems publish the moment a file EXISTS — a real
// portrait is preferable to no portrait. Quality is documented per entry
// (grade + replacement flag) but never gates rendering; low-grade entries
// stay on the originals-request list and are replaced by one-line edits
// here. Records without any asset still render the photo-less layout —
// reserved frames remain abolished (ADR-0009 clause 3 stands).
// Grades + replacement list: source-materials/photo-inventory.md.

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

const registry = {
  // Official portrait, university information system (infopacket
  // person_photo/900.jpg; D020 grade A — environmental, lab apparatus
  // softly behind). Square source; the 3:4 plate cover-crops the sides.
  head: {
    src: "/images/staff/head.jpg",
    width: 792,
    height: 792,
    alt: { ua: "Фрицький Ігор Олегович", en: "Igor O. Fritsky" },
  },
  // Official portrait, university information system (infopacket
  // person_photo/913.jpg; D020 grade B — document-photo genre, but exact
  // 3:4 and high resolution; renders cleanly at plate size).
  oleksenko: {
    src: "/images/staff/oleksenko.jpg",
    width: 1200,
    height: 1600,
    alt: { ua: "Олексенко Людмила Петрівна", en: "Liudmyla P. Oleksenko" },
  },
  // Official portrait, department site (physchem.knu.ua/1/Roik.jpg; D020
  // grade C+ — soft video-frame source, adequate at ≤128px plate width).
  // FLAGGED for replacement when the department supplies an original.
  roik: {
    src: "/images/staff/roik.jpg",
    width: 363,
    height: 451,
    alt: { ua: "Роїк Олександр Сергійович", en: "Oleksandr S. Roik" },
  },
  // Official portrait, identical thumbnail in BOTH university systems
  // (physchem.knu.ua/1/Ishenko.jpg = infopacket 903.jpg; D020 grade F —
  // 137×147, upscales at plate size). Published under ADR-0010 presence
  // rule; FIRST on the originals-request list.
  ishchenko: {
    src: "/images/staff/ishchenko.jpg",
    width: 137,
    height: 147,
    alt: { ua: "Іщенко Олена Вікторівна", en: "Olena V. Ishchenko" },
    position: "50% 30%",
  },
  // Official portrait, department site (physchem.knu.ua/1/Usenko.jpg; D020
  // grade C — snapshot genre, tight head crop). Published under ADR-0010;
  // FLAGGED for replacement.
  usenko: {
    src: "/images/staff/usenko.jpg",
    width: 301,
    height: 374,
    alt: { ua: "Усенко Наталія Ігорівна", en: "Nataliia I. Usenko" },
    position: "50% 35%",
  },
  // Official portrait, faculty administration page (knu.ua volovenko.png;
  // graded F — 100×150, near-1:1 at its /about render size). Published
  // under ADR-0010; FLAGGED for replacement.
  dean: {
    src: "/images/staff/dean.png",
    width: 100,
    height: 150,
    alt: { ua: "Воловенко Юліан Михайлович", en: "Yulian M. Volovenko" },
    position: "50% 25%",
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof registry & string;

/** Resolve an image key to its registered image; undefined keys flow through. */
export function getImage(key: ImageKey | undefined): SiteImage | undefined {
  if (!key) return undefined;
  return registry[key];
}
