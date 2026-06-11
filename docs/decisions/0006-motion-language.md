# 0006 — Motion language

Date: 2026-06-11 · Status: accepted · Amends: ADR-0003 (motion rule) ·
Amended by: ADR-0007 (interaction continuity — page-enter v2, hero arrival,
named hover devices move into motion.css, masthead rule single)

## Decision

ADR-0003's motion rule ("no decorative animation beyond hover affordances")
is amended: the site adopts a centralized motion language of **exactly two
load-triggered, run-once motion classes** on top of the existing hover-only
spine, defined in one file — `src/styles/motion.css` — and nowhere else.

1. **Page entrance** (`.motion-page-enter`) — opacity 0→1 + 8px rise, 380ms,
   decelerating ease-out (`cubic-bezier(0, 0, 0.2, 1)`). Applied by
   `src/app/[lang]/template.tsx`, which remounts on every route render, so
   the entrance plays once per navigation over page content only; the sticky
   header and footer live in the persistent layout and never move. No
   stagger: one layer, one motion.
2. **Image materialisation** (`.motion-image-fade`) — opacity 0→1, 300ms,
   ease-out, on the `<Image>` inside `Portrait` and `Figure`. Opacity only:
   no scale, blur, or slide. Dormant until photography registers (the image
   registry is empty by design).

Constraints, binding for all future motion:

- **Load-triggered and run-once only.** Nothing autonomous, nothing
  scroll-triggered, no IntersectionObserver reveals, no stagger chains, no
  exit animations, no springs/bounce, no parallax.
- **Opacity and transform only** (compositor-safe).
- **Pure CSS, no animation libraries.** Motion must work without JavaScript
  and must reveal content that is already in the document — never gate it.
- **All keyframes live in `motion.css`.** Components apply classes by name.
  Hover affordances (200ms color/underline/arrow transitions) remain inline
  Tailwind utilities — they are interaction feedback, not choreography.
- **`prefers-reduced-motion: reduce` removes both classes entirely**
  (`animation: none` in `motion.css`), on top of the global duration
  collapse in `globals.css`. Reduced motion is a first-class experience:
  the page is simply there.

## Investigated and not adopted

- **View Transitions API (cross-page crossfade).** The App Router performs
  client-side navigations, which never fire *cross-document* view
  transitions, so the pure-CSS `@view-transition { navigation: auto }` form
  is inert on internal links. The same-document form requires React/Next's
  experimental `viewTransition` flag — an experimental runtime flag is not
  acceptable on a live institutional site for a ~200ms crossfade, and the
  page-entrance motion already provides arrival continuity. Revisit only
  when the API is stable in Next.js, and keep it to a ≤200ms crossfade.
- **Scroll-triggered section reveals / per-row stagger** — rejected on
  design grounds (vault D013), not feasibility: content performing for the
  scrollbar is startup-marketing register. An institutional archive is
  already there when you arrive. Re-open only by superseding this ADR.
- **Load-event-gated image fade.** The image fade plays on mount, not on the
  network `load` event (keeping `Portrait`/`Figure` server components).
  For local, optimised, lazy-loaded images the difference is rarely
  visible. The Phase B photography session must eye-verify with real
  images and may upgrade to a load-gated transition if pop-in is observed.

## Why

The visual-maturity audit (vault D013) found the site reads professional but
not finished, and located part of the gap in arrival: a hover-only site is
static at the exact moment a visitor forms their first impression. A single
composed entrance — near-invisible, once, settling downward-to-still —
communicates deliberateness without performing. Two classes is the complete
need; anything more starts existing for its own sake, which ADR-0003's
register (calm, academic, archival) forbids and this amendment preserves.
