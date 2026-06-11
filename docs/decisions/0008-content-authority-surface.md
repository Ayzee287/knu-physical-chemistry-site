# 0008 — Homepage content authority surface

Date: 2026-06-12 · Status: accepted · Amends ADR-0005 (publication boundary)

## Context

The post-launch content review (operator sprint directive, 2026-06-12) found
the site's weakest point is not design but **underutilization of sourced
content**: the homepage showed zero people, the department's strongest dated
results (Fe(IV) in *Nature Communications* 2017, the 2007 State Prize, the
2021 NAS election, the 2013–2020 international projects) were invisible or
buried in source notes, and the scale of the institution (school since 1944,
six groups, 36 dissertations) was scattered across sub-pages. The department
read smaller than it is.

All of this material is already present in the committed source materials —
chiefly the v3 department profile (`source-materials/physchemistry_knu.html`)
that the collections were built from. This is elevation of sourced record,
not new content acquisition.

## Decision

1. **Recognition record.** Stable, **dated** results and honours of
   departmental significance are publishable as `sourced` claims in a
   dedicated homepage recognition section (`content/research/recognition.ts`),
   with review marks until verification. This narrows ADR-0005's "prize
   lists" exclusion to what it was protecting against: **volatile metrics
   (h-index, publication counts, citation rankings) and undated honours
   remain unpublishable** — they stay in source notes. (Concretely: the Georg
   Forster Prize stays unpublished because the source gives it no date.)

2. **Research leaders.** The homepage presents the head and the featured
   professors who lead research groups as typographic rows (name, degree,
   honours, focus, link to the direction anchor). No governance change: the
   set is a subset of the ADR-0005 curated set, resolved through the shared
   person-publication gate. Усенко (featured, administrative role) is
   deliberately not on this surface — it presents research identity, not the
   roster.

3. **Department in numbers.** A quiet typographic strip in the century band
   (1905 founded · school since 1944 · 6 groups · 36 dissertations). Every
   figure is a claim **already published elsewhere on the site**; the strip
   introduces zero new verification surface. The design-language ban on
   stats counters/dashboards stands — these are set as static archival type,
   reusing the hero-keystone label-over-numeral form.

4. **Photography unchanged.** The consent gate (Phase B) and the no-hotlink
   rule hold. The leaders section is typography-only by design; portraits
   land on /staff when consent clears. The reserved-plate device is not
   multiplied on the homepage.

## Why

- An institutional homepage that names no scientist and no result fails the
  "active research institution" test regardless of design quality.
- Dated recognitions are stable historical facts — the same trust class as
  the 1944 school founding and the 36-dissertation figure that ADR-0005
  already publishes — not volatile biography statistics.
- The operator, as responsible owner, directed surfacing achievements, state
  awards and high-impact publications from source materials (sprint brief,
  2026-06-12); this ADR records the principled boundary of that directive.

## Boundaries that still hold

- Volatile metrics (h-index, publication/citation counts, rankings) never
  publish; undated honours wait for dates.
- Internal person records stay unpublished; no new people were featured.
- Every new claim carries a provenance constructor + review mark; nothing is
  laundered into editorial text.
- One monumental band per page; editorial rows, not card grids; no counters,
  no dashboards, no new motion.
