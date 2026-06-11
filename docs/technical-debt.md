# Technical debt register

Prioritized ledger of known debt. Rewritten 2026-06-11 (deep-audit pass) with
the P0–P3 scheme. Rule: an item leaves this list only by being done or by a
recorded decision that it will never be done — never by being forgotten.

- **P0** — immediate risk: can hurt the live site or its credibility now.
- **P1** — next sprint: real debt, pay within the current sprint cycle.
- **P2** — future optimization: pay when its phase arrives (see `roadmap.md`).
- **P3** — optional: pay opportunistically or accept indefinitely.

---

## P0 — immediate risk

### P0.1 Unshipped working-tree batch on a stale branch — RESOLVED 2026-06-11
- Shipped to `main` via PR #8 (`audit-pass`, merge `182982d`). Tombstone kept
  because vault notes reference P0 items by number; new debt starts at P0.3.

### P0.2 Production never verified in a rendering browser
- **What:** the live, public site has never been rendered by this project's
  process at 360/768/1280 in either locale — desktop or mobile. Code-level
  review only (open since PR #2).
- **Impact:** unknown-unknowns on the most public surface of a launched
  institutional site; the typography-first design concentrates risk in
  rendering details (masthead wrap, fact-rail overflow, watermark numerals).
- **Effort:** one session (manual or Playwright screenshots), plus fixes.
- **Risk if ignored:** a dean sees a broken site before the project does.
- **Timing:** next sprint at the latest; ideally combined with P1.1 (same
  instrumented session).

## P1 — next sprint

### P1.1 Accessibility: measured contrast failures (computed, unconfirmed in browser)
- **What:** computed luminance estimates (code audit 2026-06-11) put several
  small-text combinations below WCAG AA 4.5:1:
  - copper `#9a6a3f` on ivory `#f4f0e8` ≈ **4.1:1** — all 12px eyebrows/labels;
  - copper on the sand/40 band ≈ **3.9:1** — band eyebrows;
  - slate/80 on ivory ≈ **3.5:1** — source notes (12px);
  - slate/90 at 12px (keyword lines) ≈ **4.4:1** — marginal.
  Passing: slate on ivory ≈ 5.3:1 ✓; sand/55 + sand/70 on ink ≥ 4.7:1 ✓.
- **Impact:** AA conformance failure on a public institutional site; copper
  eyebrows are the site's signature device, so the failure is everywhere.
- **Effort:** small — darken copper for *text* use (a `copper-text` tone within
  the palette's discipline) and raise the slate alphas; one session including
  browser confirmation. Hairlines/rules can keep the current copper (non-text).
- **Risk if ignored:** legal/conformance exposure once institutional (roadmap
  Phase F requires it); excludes low-vision readers now.
- **Timing:** with the Phase C session; the numbers above make it plannable
  today. Do NOT change tokens before browser confirmation of the estimates.

### P1.2 Published facts are `sourced`, not `verified`
- **What:** every published person/contact/group claim traces to department
  documents but none is independently confirmed (consciously accepted,
  ADR-0005). Open conflicts: Казіміров roster status; secretary phone;
  school-name variant.
- **Impact:** a wrong published name/contact on a live site is an
  institutional embarrassment; production hides review marks, so the public
  reads these as settled.
- **Effort:** one human conversation + a small flip-to-verified session
  (roadmap Phase A).
- **Risk if ignored:** compounding exposure as traffic grows (analytics now
  measures it).
- **Timing:** the department conversation should be scheduled now; code
  follows whenever it lands.

### P1.3 Mobile menu keyboard behavior unverified
- **What:** the `<details>` disclosure menu has correct focus and route-close
  behavior in code, but Escape-to-close and outside-click-close don't exist,
  and real keyboard/screen-reader behavior was never tested.
- **Impact:** primary navigation on mobile; if non-conformant, a keyboard user
  can't navigate the site.
- **Effort:** test in the P0.2 session; fixes likely small (or accept the
  disclosure pattern with documented rationale).
- **Risk if ignored:** core-task accessibility failure.
- **Timing:** same session as P0.2/P1.1.

## P2 — future optimization

### P2.1 Photography pipeline incomplete
- **What:** zero images site-wide; registry empty by design; inventory ready;
  consent pending. Reserved plates are intentional and presentable.
- **Impact:** "feels complete" gap to lay stakeholders — perception, not
  defect.
- **Effort:** consent (human) + one integration session (roadmap Phase B).
- **Risk if ignored:** none technical; the design degrades gracefully forever.
- **Timing:** Phase B, after/with the verification conversation.

### P2.2 Monolithic dictionaries
- **What:** all UI strings live in two ~175-line files (`content/pages/`).
  Fine at 5 pages; painful at 15 (merge conflicts, scrolling, review noise).
- **Impact:** maintainability only.
- **Effort:** mechanical split into per-page modules re-exported through the
  same `en`/`ua` objects (shape unchanged, zero call-site changes).
- **Risk if ignored:** slow friction growth; no failure mode.
- **Timing:** first session that adds a new page/section (Phase D).

### P2.3 Publications field too weak for a publications surface
- **What:** `StaffMember.publications?: Claim<string[]>` — flat citation
  strings. A real publications surface (Phase D ambition) needs a typed
  collection (year, venue, authors, DOI, per-entry provenance).
- **Impact:** none now (field unused); rework cost if Phase D builds on it
  as-is.
- **Effort:** design a `content/publications/` collection when Phase D starts.
- **Timing:** gate of Phase D; do not build speculatively.

### P2.4 Content collections require a developer to edit
- **What:** every fact change is a TypeScript edit + PR. Correct for now
  (the type system IS the integrity layer) but unworkable for department
  self-service at scale (100 staff / news cadence).
- **Impact:** bus-factor and handover risk (roadmap Phase F).
- **Effort:** the Phase F playbook first (documented edit workflow); only
  consider tooling/CMS if a real non-developer editor materializes.
- **Timing:** Phase F; revisit only on real demand.

## P3 — optional

### P3.1 Deliberate dormant API surface (keep; re-justify annually)
- `verified()` — waits for Phase A. `editorial()` — trust-vocabulary
  completeness. `fromStaffDirectory` (v1) — kept while v1 remains a cited
  document in `SOURCES`. `QuoteBlock.cite` — honesty affordance.
  `legacyDepartmentContacts` — documented unpublished backlog.
- **Risk if ignored:** none; ~30 lines.

### P3.2 True orphans
- ~~`dict.brand.full`~~ — resolved 2026-06-11 (motion/finishing pass): now
  renders as the footer identity line, as this entry suggested.
- `HeroFact` type export + `SITE_URL` const export — exported, never imported
  externally; un-export opportunistically.
- `getHead()`'s `?? staff[0]` fallback — silently renders the wrong person if
  the `head` id ever disappears; replace with a thrown error at next touch.

### P3.3 Naming/structure nits (recorded, not worth churn)
- `ResearchAreaCard` / `StaffCard` are rows, not cards (the components
  themselves say so) — renaming would touch many files for zero behavior.
- Two `site.ts` files (`src/lib/site.ts` = origin resolution,
  `src/content/site.ts` = identity constants) — confusable; project-map
  disambiguates them.
- `schoolName` provenance is carried by `getSchool()` but never review-marked
  (SectionHeader API takes a plain string). Cosmetic review-mode gap.
- Head's email duplicated as a fact in `staff.ts` and `contacts.ts`
  (`departmentEmail`) — two claims, one real-world value; if it changes,
  update both (note exists in neither — added to content-status backlog).

## No known architecture debt

Re-verified 2026-06-11 (deep audit): static-first holds; one `"use client"`
file (header); zero runtime deps beyond Next/React/Tailwind + the
operator-added `@vercel/analytics` (PR #7); typed content schema enforced;
person-publication gate now a single shared implementation
(`content/staff/publication.ts`); SEO surfaces complete and consistent; no
dead routes; no unreachable components.
