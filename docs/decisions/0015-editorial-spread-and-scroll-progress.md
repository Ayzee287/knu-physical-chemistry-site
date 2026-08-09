# 0015 — The editorial spread, and motion bound to reading

Date: 2026-08-01 · Status: accepted · Amends: ADR-0003 (design direction),
ADR-0006 (motion language), ADR-0007 (interaction continuity)

## Context

The operator opened a **design-evolution phase**: not a bugfix pass and not a
polish pass, but an explicit instruction to rethink the visual experience and
interaction quality while preserving institutional identity, with the standing
note that the existing implementation is "the current iteration", not something
to be preserved for its own sake.

The site's structure, content and provenance architecture were in good order.
Its *experience* had two defects that no amount of local polish would have
reached, both of which are visible the moment you look at a real browser rather
than at the markup:

**1. The page was set as a phone page rendered wide.** Every list on the site —
research directions, staff records, recognition entries, the head lineage, the
bibliography — was a single left-aligned column held to a prose measure
(`max-w-2xl` / `max-w-3xl`) inside a 75rem container, with its section header
stacked above it in the same narrow measure. On a 1440px viewport that left
roughly 40% of every line as dead paper, on every row, on every page. Worse, it
made five consecutive homepage sections read as one undifferentiated ribbon:
eyebrow, serif title, lead, hairline rows, text link — five times, at the same
width, in the same rhythm. Nothing in the composition said which section
mattered, or that /staff had three publication tiers, or that a scope note was a
qualification rather than a paragraph.

**2. Motion stopped 600ms after arrival.** ADR-0006 and ADR-0007 built a careful
arrival + hover system and then, by policy, forbade everything else: "nothing
autonomous, nothing scroll-triggered". That was the right call when it was made —
it protected a young site from over-animation. Its consequence, a year on, is
that from the moment the hero settles the site is inert. A reader scrolling
through eleven staff records is scrolling through a static document.

## Decision

### 1. The editorial spread (`SectionSpread`)

At `lg` and above, a section is set as a **spread**: its identity in a left
margin rail, its record in the wide column beside it.

```
┌────────────┬──────────────────────────────────────────┐
│ EYEBROW ─  │  01   Direction title          keyword   │
│ Section    │       summary at measure       keyword   │
│ title      │  ─────────────────────────────────────   │
│ lead       │  02   Direction title          keyword   │
└────────────┴──────────────────────────────────────────┘
   sticky                    scrolls
```

This is not a layout preference; it is how an academic publication has always
solved the same problem. Running heads and apparatus live in the margin, the
record lives in the measure. It uses the page width without inflating the type,
and it gives the reader one fixed place to look for "where am I".

**The rail is sticky.** This is the phase's quietest interaction and the one
that does the most work: a section's identity holds in the margin while its rows
travel past, so a long register never loses its heading, and the page gains two
planes of movement from a single CSS property — no JavaScript, no scroll
listener, no reflow.

Below `lg` the spread collapses to the original stack. **The mobile composition
is unchanged.**

The same grammar then governs the rows themselves — **record in the measure,
apparatus in the margin**:

| Row | Measure | Margin |
|---|---|---|
| Research direction | index, title, summary | keyword index, stacked |
| Research group | area, name, focus | keyword index |
| Research leader | portrait, name, degree, focus | link to their direction |
| Staff record | portrait, role, name, degree, focus | e-mail, ORCID, profile link |
| Recognition / history / bibliography | year (folio) + entry | — |

Two consequences worth naming. The keyword lists were previously a wrapping
run-on of `·`-separated phrases underneath the summary — structurally an index,
set in the least scannable form available; they are now a column you can read
down without reading the prose. And the marginal notes (the /research scope
note, the bibliography's verbatim-Ukrainian gloss, the /staff roster note, the
history source note) now stand *beside* what they qualify instead of being
orphaned below its last row.

### 2. Hierarchy expressed as scale

- **`/staff` has three publication tiers** (head · leading faculty · the
  complete teaching staff, ADR-0004/0012) and rendered all three identically.
  `StaffCard` now takes `density`: `lead` | `full` | `register`. Each tier is
  quieter than the one above, so the department's structure is legible before a
  single name is read. Nothing is demoted in substance — every record keeps the
  same fields, provenance and route into its full page.
- Plate sizes are capped **by the sources, not by taste**. The official portrait
  set runs from 137×147 to 1200×1600 (see `lib/images.ts`); only the head's
  792px square carries the `lead` plate. Enlarging the rest would trade real
  detail for apparent importance.
- **`/contacts`** documented a where → department → faculty hierarchy and then
  rendered it as three equal columns of identical 14px type. The address is now
  the page's anchor at serif display scale, the department's own channels are
  set large, and the faculty channels stand in the margin as the visible
  fallback. No fact was added, removed, reworded or re-attributed; only scale
  and position changed. Phone numbers became `tel:` links.
- **The record strip** («Кафедра у цифрах») is a ruled register: hairline-divided
  cells, label above rule, figure below, at the page's largest non-heading
  serif. Still no counters — a figure that counts up is a figure performing, and
  these are records.

### 3. Motion bound to reading (amends ADR-0006/0007)

ADR-0006's prohibition on scroll-triggered motion is **narrowed, not lifted**.
The distinction it did not draw is between a *trigger* and *progress*:

- A **trigger** fires an animation when an element crosses a line. It plays on
  its own clock, at its own speed, whether or not the reader is still looking.
  That is the thing ADR-0006 was right to forbid, and it stays forbidden.
- **Progress** is scrubbed by the reader's own scrolling. It advances when they
  advance, stops when they stop, and reverses when they scroll back. It is not
  the page performing; it is the page responding.

Three progress devices are added, all in `motion.css`, all pure CSS:

- `.reveal` — a row-scale element settles in (opacity + 12px) as it enters.
- `.reveal-rule` — a hairline is struck left-to-right, generalising the
  masthead's existing print gesture from page load to scroll.
- `.header-elevate` — the masthead casts a soft shadow once the page has begun
  to travel underneath it, and retracts at the top.

Plus one continuous device, `.row-engage`: an editorial row answers engagement
as **one object** rather than as three independent hover states — its portrait
relaxes from the ADR-0011 grading to full colour, and its leading hairline warms
from navy to copper. `:focus-within` gives keyboard parity, verified.

Timing is `linear`, deliberately: a progress-driven animation is scrubbed by the
reader's hand, and an eased curve would make their own scroll feel non-linear.
Easing belongs on time-driven motion.

### 4. Atmosphere for the masthead

The ink hero was documented from the start as "the site's one deliberately
atmospheric moment" and was in fact an even fill of navy — the atmosphere was
asserted, not drawn. Two painted CSS layers now supply it: a depth wash that
gives the plane a light source, and a **plotting graticule** masked into the
quiet top-right quadrant behind the fact rail. The graticule *develops* over
1.6s after the headline lands, a third and slowest arrival beat. Neither layer
crosses the title block.

A grid a physical chemist reads a measurement off is the department's own idiom.
It was chosen over the obvious alternative — a cursor-reactive glow, which the
brief listed as a possibility — because a field that follows the pointer is a
product-landing-page gesture and would read as exactly the "spectacle over
trustworthiness" this project forbids.

## Why CSS scroll timelines and not JavaScript

These devices are decoration over content that is already complete in the
document. An `IntersectionObserver` implementation would have to ship elements
at `opacity: 0` in the markup and rely on script to reveal them; one script
error, one slow hydration, one consumer without a layout engine, and the page is
blank. A scroll timeline cannot fail that way — it is guarded by `@supports`, so
a browser that does not implement it never applies the rule and renders the
finished page.

**The cost, stated plainly:** `animation-timeline` is not Baseline. Chrome/Edge
115+ and Safari 18+ ship it; Firefox still has it behind a flag, so roughly 16%
of sessions get the site without the reveal. That is the correct trade for an
institutional publication — the reveal is a grace note, not the content, and no
visitor is ever shown less information than another.

Three failure modes were tested rather than assumed:

1. **Inactive timeline** (a page shorter than the viewport). Probed directly:
   the animation does not apply and the element renders at `opacity: 1`. Content
   is never hidden on a short page.
2. **Print and capture.** A scroll-progress animation is bound to a scroll
   position, and paper has none — every row below the first screen would print
   blank. This was found by taking a full-page screenshot and watching two
   thirds of the homepage come back empty. A `@media print` guard now switches
   the reveals off outright (`!important` outranks the animation origin in the
   cascade). On a site whose content people print — a staff directory, a
   bibliography, a contact record — this was a data-loss bug, not a cosmetic one.
3. **Reduced motion.** `.reveal` and `.reveal-rule` are declared *inside*
   `@media (prefers-reduced-motion: no-preference)`, so for these visitors the
   rules are never emitted and there is no animated state to undo. Verified
   against the compiled stylesheet, not the source. `.header-elevate` is
   deliberately retained: nothing moves, and suppressing it would remove a
   layering affordance from exactly the readers most likely to want the page's
   structure stated plainly.

## Accessibility corrections made in passing

Auditing the result surfaced defects that predate this phase and were fixed
with it:

- **`copper` measured 4.10:1 on ivory and 3.88:1 on the sand band** — under WCAG
  AA — while carrying every eyebrow and section label on the site at 12px, which
  makes it the single most-repeated text style here. Retuned to `#8a5d36`:
  4.99:1 on ivory, 4.73:1 on sand/40. Same hue family.
- **The light-surface `slate` tints are retired.** `text-slate/90` measured
  4.36:1, `/80` 3.57:1, `/70` 2.93:1 — all failing, all on real content
  (keywords, focus lines, ORCID, source notes, field labels). They bought
  almost no perceptible hierarchy for a real accessibility cost. Tonal hierarchy
  in text comes from size and weight; washing a colour toward the paper is not
  hierarchy, it is just less contrast. Where a label genuinely needed to read as
  a label (profile office/phone), the *value* went navy instead.
- **Touch-target spacing** (WCAG 2.2 · 2.5.8). The new access margin stacks three
  ~16px text links; measured, they sat 20.6px apart and failed. `leading-6` plus
  `mt-2`/`mt-3` puts the centres ≥24px apart, satisfying the criterion by the
  spacing route — chosen over padding the links, which would drag
  `.link-underline` (positioned against the padding box) away from its text.
- The **`overflow-hidden`** on the two watermark bands became `overflow-clip`.
  `hidden` makes a box a scroll container, which would have bound every `view()`
  timeline inside it to a container that never scrolls and cut the sticky rails
  off at the band edge; `clip` clips identically without either effect.
- The **/about 1905 watermark** moved from an absolute top-right position into
  the rail. Once the record used the full column, the numeral sat *behind live
  text* — 7% navy under body copy is faint, but it is contrast taken from a
  reader who gains nothing for it. An archival numeral belongs in the margin.

Measured result: Lighthouse **accessibility 100** on a production build,
desktop `/ua/staff` and mobile `/ua`. (Remaining audit failures are
environmental: the Vercel Analytics script 404s off-platform, and `robots.ts`
blanket-disallows non-production deployments by design.)

## Consequences

- `ADR-0006`'s "nothing scroll-triggered" is narrowed to "nothing scroll-*
  triggered*"; scroll-*progress* is now part of the vocabulary, at row scale
  only, under the three guards above.
- `ADR-0003`'s "hairline-separated editorial rows, never card grids" is
  **upheld**: the density tiers are rows, not tiles. The `/staff` register was
  explicitly not built as a two-column card grid for this reason.
- `ADR-0003`'s "at most ONE monumental band per page" is upheld. Page-scale
  variety now comes from composition (ink masthead → quiet register → sand
  century band → navy closer) rather than from adding tinted bands.
- **D024's derived `mt-6`/`mt-14` label rhythm on `/staff` is retired above
  `lg`** — it tuned the gap between a stacked section label and the card list
  above it, and there is no longer a stacked label there. Below `lg` the
  original rhythm stands.
- The device set gains `SectionSpread` and the `density` scale; per the standing
  rule, nothing was added without something being retired — the slate text tints
  and the stacked-label rhythm both go.
- Static generation, the bilingual dictionary contract, the provenance system
  and the review-mark dev-only gate are untouched. 39 pages still prerender.

## Not done, and why

- **View Transitions for route changes.** Next 16 exposes this behind
  `experimental.viewTransition`. Enabling an experimental flag on a live
  institutional site to buy a transition is not a trade worth making yet; the
  existing template-remount arrival already covers navigation. Revisit when it
  is stable.
- **Cursor-reactive hero.** Rejected on identity grounds — see §4.
- **Larger portraits.** Blocked by source resolution, not by design. This is the
  D030 department-input dependency, not a layout decision.
