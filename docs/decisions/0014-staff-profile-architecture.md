# 0014 — Staff research profiles: dedicated pages, an optional profile collection, routes for every published member

Date: 2026-06-16 · Status: accepted · Builds on ADR-0001 (provenance),
ADR-0004/0005 (curated publication), ADR-0009–0011 (portraits), ADR-0012
(complete /staff directory).

## Decision

1. **A dedicated profile page per published member.** Every member the policy
   already renders (`featured` + `staff`, ADR-0012) gets a `/{lang}/staff/<slug>`
   page. The route is **fully static** (`dynamicParams = false`): the only valid
   pages are the prerendered (locale × published member) pairs; any other slug is
   a static 404. `internal` records never route.
2. **Slug is directory identity.** A `slug: string` is added to `StaffMember`
   (and carried through `LocalisedStaffMember`) — the stable public address of
   the record, transliterated from the surname (`head → fritskyi`). One source of
   "who is routable": `getRoutableStaffSlugs()` drives both `generateStaticParams`
   and the sitemap, so the route set cannot drift from the policy.
3. **Rich content lives in a SEPARATE, OPTIONAL collection.**
   `content/staff/profiles.ts` holds `StaffProfile` records keyed by
   `StaffMember.id`. The lean directory record and its compact `StaffCard` are
   **untouched** — the long-form content cannot inflate the directory rows. A
   profile page renders the directory identity ALWAYS and the profile sections
   WHERE AUTHORED: Fritskyi renders rich; the other ten render a clean
   directory-level page (masthead + contacts + the department-site link). Adding a
   profile is purely additive content — a new keyed entry, **no code change**.
4. **New types, same provenance discipline.** `StaffProfile` fields —
   `overview`, `research`, `biography` (titled sections), `achievements` (dated),
   `courses`, `publications`, `links` (Scholar/Scopus/ResearchGate), `office`,
   `phone` — are each a `Claim<T>`. They publish `sourced` from the department
   profile and carry development-only review marks until a HUMAN verifies them.
   **Volatile statistics are NOT modelled as publishable fields** (no h-index,
   no publication/citation/dissertation counts, no "top-N cited"); scholarly-profile
   URLs are recorded only where a real address is sourced — never fabricated.
   `email`/`orcid` stay on the directory record and are read from there — no
   duplication.
5. **Existing surfaces keep their density.** The homepage leader-name link is
   **retargeted** from the `/staff#id` anchor to the profile page — no new
   element, the row is visually unchanged (operator decision). The `/staff` card
   gains a single quiet `Детальніше →` link. The homepage structure and the
   directory's compact rhythm are preserved.
6. **Readability over volume.** Overview lede first; honours and courses as
   structured hairline lists; the long biography **collapsed into native
   `<details>` sections** (zero JS, accessible, static-safe) — no walls of text.
7. **Fritskyi is the reference implementation.** The remaining profiles are
   authored as the department's data is confirmed, in the same `Claim` pattern.

## Why

- The department's own record carries rich per-person material (biographies,
  dated honours, taught courses, international experience) that had **nowhere to
  live**. Importing it into the directory cards would break both the compact
  directory posture (ADR-0012) and the quiet, typography-first design (ADR-0003).
- A dedicated page is the **canonical, indexable home** for each person, while
  the directory stays a directory and the homepage stays curated. Curation by
  surface (the principle behind ADR-0012) extends cleanly: depth lives on the
  profile, not on the index.
- Keeping rich content in a **separate, optional** collection makes the
  remaining-staff migration a content task, not an engineering one, and keeps the
  provenance surface explicit — every new sentence needs a constructor.

## Boundaries that hold

- No CMS, no new dependencies, no `dangerouslySetInnerHTML`; the collapsible bio
  is native `<details>`.
- No homepage restructure; no increase in directory-row density.
- No duplicate long text across pages (contacts read from the directory record).
- No volatile statistics; no fabricated scholarly URLs; `sourced ≠ verified` —
  AI never flips a claim to `verified`.
- Review marks stay development-only (D026); production renders none.
- Portraits remain progressive enhancement (ADR-0009/0011): the masthead plate
  mounts only where a registered asset exists.
