# 0011 — The portrait print is colour, gently muted — not monochrome

Date: 2026-06-15 · Status: accepted · Supersedes ADR-0010 clause 3 (the
grayscale grading). All other ADR-0010 clauses stand (presence over
perfection; the hairline plate; the surfaces; per-asset replacement).

## Decision

1. **Portraits render in colour, not grayscale.** The `Portrait` component
   drops the `grayscale` filter and instead applies a single, shared muted
   grading: `saturate-[0.85]` (saturation pulled back ≈15%) with a
   barely-there `contrast-[0.97]`. The treatment lives in ONE place — the
   `Portrait` component — exactly as the monochrome grading did; there are no
   per-image filter overrides in the registry.
2. **The grading is still an integration layer, just a warmer one.** Full
   monochrome did make the four photographic genres (environmental portrait,
   saturated-backdrop document photo, video frame, indoor snapshot) read as
   one register — but it read as *archival and funerary*, draining the human
   presence ADR-0010 was trying to add. Pulling saturation back ~15% and
   contrast a hair still calms the loudest colour casts (the cyan document
   backdrop especially) and unifies the set, while the people stay alive.
3. **Target register: a printed university brochure.** Muted colour print —
   warm, restrained, of one piece — not a raw social-media profile (full
   saturation, clashing casts) and not a memorial wall (grayscale). This is
   the same print-archive instinct as the rest of the design language,
   applied as *muted colour* rather than *monochrome*.
4. **Everything else from ADR-0010 is unchanged:** the hairline plate stays
   (frameless and corner marks remain rejected); the fixed 3:4 crop, the
   `motion-image-fade` mount, the per-asset `position` art-direction, and the
   surfaces (/staff ×5, /about dean, homepage leaders ×4) all stand.
   Replacement of the low-resolution files remains a one-line registry edit.

## Why

- ADR-0010 reasoned correctly that the integration problem was *chromatic*
  (mismatched genres and casts) and reached for monochrome as the fix. The
  operator's follow-up review found the cure overshot: monochrome solved the
  cohesion problem by removing the very warmth the presence sprint set out to
  add. Real portraits in colour answer "who are the scientists?" with more
  human presence than monochrome prints do.
- A *partial* desaturation keeps the cohesion benefit (the loud casts are
  tamed, the set reads as one treatment) without the funerary read. ≈15% is
  enough to unify and not so much that any single portrait looks drained.
- The low-resolution files (Іщенко 137px, dean 100×150, Усенко) survive the
  change: at plate sizes (64–128px) behind a uniform muted grading they read
  as soft brochure prints, the same way they read as soft archival prints
  under monochrome. Presence still does not wait on resolution.

## Boundaries that hold

- One shared treatment layer; no per-image filters; replacement stays a
  one-line registry edit (ADR-0009 clause 4 / ADR-0010).
- No sepia, duotone, or warmth *tint* was added — that would re-introduce a
  colour cast of our own. The grading only *removes* intensity (saturation,
  a touch of contrast); it never adds a hue.
- The exact values (`0.85` / `0.97`) are provisional until the formal browser
  pass (P0.2) confirms them on real DPR against the ivory and sand grounds;
  they are tuned, not final, and adjusting them is a one-line edit in the one
  component.
- No decorative, stock, or hero imagery — photography remains informational;
  the masthead stays typographic.
