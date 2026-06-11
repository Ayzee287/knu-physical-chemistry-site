# 0007 — Interaction continuity language

Date: 2026-06-11 · Status: accepted · Amends: ADR-0006 (motion language)

## Context

The operator's real-browser review (desktop + mobile, the same review that
drove D015) returned a consistent perception verdict on the shipped motion
language: technically correct, emotionally binary. Hover states read as
off→on switches rather than transitions; the research-row underline *appears*
(a decoration-color fade) rather than *grows*; the CTA buttons flip their
background in one beat; nothing acknowledges a click before navigation; page
changes read as redirects; the mobile menu toggles into view; and the hero's
masthead double rule reads as a redundant double divider. This ADR is the
implementation answer — explicitly requested by the operator, which is the
sanctioned re-open condition recorded in ADR-0006.

## Decision

The site adopts one **interaction continuity system**, in two homes:

### 1. The interaction clock (`globals.css` @layer base)

One timing system for every interactive element (`a`, `button`, `summary`),
defined once; components no longer carry their own `transition-*` utilities.

- **Asymmetric by design**: hover/focus states are entered in **200ms** and
  released in **300ms**, on a shared deceleration curve
  (`--ease-settle: cubic-bezier(0.33, 0, 0.2, 1)`). Arrival is quick but
  perceptible; departure lingers slightly. An interaction reads as
  state → transition → state, never off/on.
- **Click acknowledgment**: `:active` dims the element to opacity 0.7
  instantly (`transition: none` on press), and the release settles back on
  the clock. Every press on the site is answered before navigation occurs.
  Restrained on purpose: felt, not watched.
- Two easings are tokens in `@theme`: `--ease-settle` (continuous devices)
  and `--ease-arrive: cubic-bezier(0.16, 1, 0.3, 1)` (run-once arrivals).
- Exception: the skip link opts out (`transition-none`) — a focus jump must
  not animate (D015).

### 2. The device vocabulary (`motion.css`)

`motion.css` is now the home of the **complete** motion and interaction
vocabulary — run-once arrivals *and* named hover devices. (This supersedes
ADR-0006's "hover affordances remain inline Tailwind utilities": scattering
the devices across components is exactly what made them inconsistent.)

Continuous devices:

- **`.link-underline`** — THE text-link device. A 1px hairline in
  `currentColor` grows from the left edge on hover/focus-visible and remains
  in place under `[aria-current]` markers. Painted with `background-size` on
  a solid (gradient-function, not visual-gradient) image;
  `box-decoration-break: clone` keeps the line under every fragment of a
  wrapped link. Replaces both the header's `::after` width device and the
  research rows' decoration-color fade — one device, sitewide.
- **`.link-arrow` / `.link-arrow-ext`** — the → and ↗ glyph nudges
  (2px forward / 1px up-right), previously per-component utilities.
- **`.btn-fill`** — bordered CTA fill: the ivory plate **rises from the
  button's baseline** (background-size 100%×0% → 100%×100%, 260ms in /
  360ms out) instead of the background switching on. The visitor watches the
  button become active. No scale, no shadow, no bounce.

Run-once arrivals (all `both`-filled, reduced-motion → `animation: none`):

- **`.motion-page-enter` v2** — the page arrival is now two out-of-step
  tracks: fade 420ms (`--ease-settle`) + 10px settle 560ms
  (`--ease-arrive`). The page is readable quickly, then finishes coming to
  rest — arrival reads as entering a room, not a document swap. Combined
  with the press acknowledgment, navigation is press → release → arrival.
- **`.motion-hero-rail`** — the hero fact rail arrives one beat (+120ms)
  after the masthead column. Bounded amendment to ADR-0006's "one layer, no
  stagger": **two layers maximum, hero only** — a composed presentation, not
  a stagger chain. The rejection of per-item/per-row stagger stands.
- **`.motion-rule-draw`** — the masthead rule is struck once, left to right
  (scaleX, 640ms), as the page arrives: a print gesture, hero only.
- **`.motion-menu-enter`** — the mobile menu panel surfaces (fade + 4px
  drop, 220ms) when its `<details>` opens. Closing stays immediate:
  dismissal does not perform.

### 3. Masthead rule: double → single

The hero's two parallel 1px rules (3px apart) are collapsed to **one**
hairline. The operator review identified the pair as a redundant double
divider; the print-nameplate cue survives as the single struck rule. The
archival device set is updated, not extended.

## Investigated and not adopted

- **View Transitions API** — re-checked against Next 16.2.7's bundled docs:
  `experimental.viewTransition`, still `version: experimental`. The ADR-0006
  rejection stands unchanged for a live institutional site.
- **Exit animations / JS-intercepted navigation** — would gate navigation on
  motion; banned by ADR-0006's no-gating principle and unchanged.
- **Underline device on mobile-menu rows** — a block-level row would draw
  the line across the panel width, not under the label; touch rows keep
  color + press feedback only.
- **Underline on the header brand** — the brand is an identity mark, not a
  nav item; color shift only.

## Why

The perceived-quality gap was not the *absence* of motion but the *shape* of
it: symmetric 150ms color swaps are state replacement, and state replacement
reads as mechanical regardless of how tasteful the palette is. Continuity
comes from direction (a line that grows, a plate that rises), asymmetry
(quick arrival, lingering departure) and acknowledgment (the press dim) —
none of which add spectacle, all of which add intention. The success test is
unchanged from the operator's brief: motion felt everywhere, noticed nowhere.

## Browser notes (for the standing P0.2 instrumented pass)

- `box-decoration-break: clone` needs the `-webkit-` prefix in Safari (both
  forms shipped); degradation is a last-line-only underline on *wrapped*
  links — hover-only, cosmetic.
- The underline hugs the text box (≈2–3px below baseline); the header nav
  adds `pb-1` so its line sits at the former 6px offset.
