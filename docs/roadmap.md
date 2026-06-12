# Maintenance roadmap

Product roadmap, phased. Supersedes `docs/roadmap/roadmap.md` (2026-06-10
bootstrap version). Session-level sequencing lives in the vault
(`00_MOC/roadmap.md`); this document owns WHAT and WHY, not session order.

Standing context: the site is **launched** — production is public, PR #1–#6
merged, validation green. Everything below is improvement of a live site, so
every phase must preserve: provenance discipline, curated publication
governance (ADR-0004/0005), bilingual parity, zero russian-language content,
and the archival design language (ADR-0003).

---

## Phase A — Verification

**Goal:** convert the published curated set from `sourced` to `verified(...)`:
head, dean, 4 key faculty, department contacts, 6 research groups, history
record. Review marks disappear; the trust posture becomes unconditional.

**Work:** one department confirmation pass (human conversation), then a small
code session flipping provenance constructors and removing stale source notes.
Resolve recorded conflicts: Казіміров В. П. roster status; secretary phone
(239-33-70); school name variant.

**Dependencies:** department availability — a human task; no code prerequisite.

**Risks:** the department corrects a published fact (mitigated: everything is
traceable to their own documents, and corrections are one-line content edits);
indefinite stakeholder silence (mitigated: ADR-0005 already makes `sourced`
publication legitimate — nothing breaks while waiting).

**Success criteria:** zero `sourced` claims in the published surface; review
mode shows no marks on /staff, /about, /contacts; vault `content-status.md`
backlog empty.

## Phase B — Photography (rescoped again by ADR-0010, 2026-06-12)

**Goal:** upgrade the portrait set and add documentary imagery. Publication
is complete: under ADR-0010 (presence over perfection) **every featured
person carries their official portrait** — /staff ×5, /about dean, homepage
leaders ×4 — rendered as archival monochrome prints through the shared
plate. What remains is asset QUALITY, not presence.

**Work:** replacement request to the department — originals for Іщенко
(137px, first priority), the dean (100×150) and Усенко; a better portrait
for Роїк; documentary department/laboratory photographs for the homepage
century band (first documentary image lands in the lineage column, D020).
As assets arrive: optimise, swap in `src/lib/images.ts` (one-line edits,
zero layout change).

**Dependencies:** department response only; the Phase A verification
conversation is the natural moment to ask (same stakeholder).

**Risks:** department objecting to a published portrait (one-line removal;
sources documented per registry entry); upscaled low-res files on HiDPI
screens (mitigated by plate sizes + monochrome grading; tracked as debt
P2.1).

**Success criteria:** all featured records carry grade-B-or-better portraits;
one documentary image in the century band; `npm run build` green with
optimised local images only (no hotlinks).

## Phase C — Accessibility

**Goal:** complete the formal audit the code-level fixes (2026-06-11) began,
and close whatever it finds.

**Work:** contrast measurement (copper-on-sand, copper-on-ivory, sand-tones on
ink/navy) against WCAG AA; keyboard pass on the mobile `<details>` menu (focus
order, escape behavior, trap check); screen-reader pass (NVDA/VoiceOver) over
both locales; zoom/reflow at 200%; verify heading outline and landmark
structure page by page. Fix findings.

**Dependencies:** none — runnable today. Combine with the responsive browser
pass (same instrumented-browser session, both are "first real render" debts).

**Risks:** copper (#9a6a3f) on sand (#e8e0d0) may fail AA for small text —
the fix must adjust tone within the palette's discipline, not abandon the
accent system; `<details>`-based menu may need a JS upgrade if keyboard
behavior is non-conformant (keep it dependency-free).

**Success criteria:** documented audit results in `docs/`; AA contrast for all
text surfaces; full keyboard operability; no heading/landmark violations;
findings either fixed or recorded with rationale.

## Phase D — Research expansion

**Goal:** deepen /research only with department-confirmed material: per-group
detail (projects, collaborations, selected publications with verbatim
citations), possibly per-direction anchors enriched with confirmed equipment/
methods.

**Work:** gated content sessions following the existing collection pattern
(`Claim<T>`, bilingual, conservative paraphrase). The `publications?` field on
records already exists for verbatim, source-backed citations.

**Dependencies:** **blocked on real data** — requires Phase A contact to yield
confirmed material. Do not start speculatively (vault roadmap rule).

**Risks:** scope creep toward a directory/database (the curation governance
must hold: identity, not inventory); unsourced "improvements" sneaking in
during enthusiasm (every addition needs a provenance constructor).

**Success criteria:** any new content is department-confirmed, bilingual,
provenance-carried; /research stays an editorial programme document (rows,
not grids); no orphaned anchors.

## Phase E — SEO & discoverability

**Goal:** the site is found for the searches a prospective student or
collaborator actually makes, in both languages.

**Work:** verify production indexing (Search Console for the production
domain; sitemap fetch; hreflang cluster validation); structured data
(`Organization`/`CollegeOrUniversity` + `Person` for verified staff — only
after Phase A so JSON-LD never asserts unverified facts); OpenGraph image
(typographic, on-brand, both locales); request inbound links from chem.knu.ua
and physchem.knu.ua (the legacy site should reference its successor).

**Dependencies:** Phase A for any person-level structured data; operator
access for Search Console and the inbound-link conversations.

**Risks:** structured data outrunning verification (hard rule: JSON-LD only
from `verified` claims); the legacy site continuing to outrank the new one
(mitigation is the inbound link + time).

**Success criteria:** both locales indexed with correct canonicals/hreflang;
rich-result tests pass; OG previews render correctly in link sharing; the new
site outranks the ©2009 legacy site for the department's name query.

## Phase F — Institutional publication readiness

**Goal:** the site becomes the department's OFFICIAL site of record — owned,
governed, and maintainable beyond the current operator.

**Work:** university domain (or agreed subdomain) attached, with redirect
strategy from the legacy site; stakeholder sign-off pass over every published
claim (builds on Phase A); a content-update playbook for non-developers (how a
fact changes: edit collection → PR → review marks → merge); ownership/access
handover plan (Vercel project, GitHub repo, domain); uptime/error monitoring
appropriate to an institutional site.

**Dependencies:** Phases A (verified facts) and C (a11y conformance —
institutional sites carry accessibility obligations); university IT
cooperation for DNS.

**Risks:** institutional process latency (months, not days — keep the
*.vercel.app domain serving meanwhile); governance vacuum after handover (the
playbook + CLAUDE.md + project-map are the mitigation — they ARE the
institutional memory).

**Success criteria:** official domain serving; legacy site redirects or
prominently links; department formally acknowledges the site as its record;
a named maintainer (human or operator-run process) exists; documentation
sufficient for a cold-start contributor.

---

## Out of scope until asked

CMS, news/events feed (no news source exists), admissions content, EN-first
surfaces, stats/counters, member directories.
