# 0010 — Presence over perfection: every available official portrait publishes, as an archival monochrome print

Date: 2026-06-12 · Status: accepted · Supersedes the per-asset quality bar of
ADR-0009 (its clause 2); all other ADR-0009 clauses stand.

## Decision

1. **Publication rule (operator directive, 2026-06-12): a real portrait is
   preferable to no portrait.** Every official-source portrait that exists
   publishes immediately — quality grading no longer gates rendering. Grades
   and replacement flags are documented internally (registry entries +
   `source-materials/photo-inventory.md`); low-grade assets stay on the
   originals-request list and are replaced by one-line registry edits, with
   zero layout change.
2. **Published under this rule:** Іщенко (137×147 — the only file in either
   university system), Усенко (301×374 snapshot), dean Воловенко (100×150).
   Together with the ADR-0009 set (head A, Олексенко B, Роїк C+), **every
   featured person on the site now has a portrait.**
3. **Presentation: the archival monochrome print.** The `Portrait` plate
   renders all photographs `grayscale`, in one place (the component). The
   official set spans incompatible photographic genres — environmental
   portrait, saturated-backdrop document photo, video frame, indoor snapshot
   — and uniform monochrome is what makes them read as one institutional
   register instead of colour photos pasted onto the paper. It also lets
   low-resolution files read as archival prints rather than degraded photos.
   (Sanctioned in advance by the image strategy: "monochrome conversion
   is … the rescue for weak color sources".)
4. **Framing re-evaluated (the D013→D021 frame question, closed):** the
   existing hairline plate (`border-navy/10`, the page grid's own rule)
   **stays**. Frameless REJECTED — light photo edges (pale walls, white
   knitwear) would dissolve into the ivory paper; the hairline contains
   them. Corner registration marks REJECTED — that was the retired *absence*
   device (D020/D021); putting it on real photographs would re-import
   placeholder aesthetics. The frame is structural, not decorative.
5. **Surfaces:** /staff (all five records), /about dean block, and the
   homepage research-leaders rows (author-portrait scale, `w-16 sm:w-20` —
   smaller than /staff plates so the rows stay editorial rows). Progressive
   enhancement is unchanged: a record without a registered asset renders the
   typographic layout; reserved frames remain abolished.

## Why

- ADR-0009's quality bar optimised for *image* quality; the operator's
  directive re-weighted the goal: **human presence is the product**, and a
  recognizable official portrait — even soft — answers "who are the
  scientists?" in a way typography cannot. The bar was holding three of six
  faces hostage to resolution.
- The monochrome treatment is what makes the trade safe: at plate sizes
  (64–128px) behind a uniform grading, the difference between a 137px and a
  1600px source reads as print variance, not as broken quality.
- Replacement remains the plan, not the precondition: the registry decouples
  asset quality from page structure, so the originals request
  (photo-inventory.md) continues exactly as before.

## Boundaries that hold

- Official university systems only; localised files; typed registry;
  hotlinking forbidden (ADR-0009 clause 4).
- Source + grade documented per registry entry; the department can demand
  replacement or removal of any portrait at any time (one-line edits).
- No decorative, stock or hero imagery — photography remains informational.
- The masthead stays typographic (strategy, not debt).
