# Project map

One-document architecture orientation. Updated 2026-06-11. If this drifts from
the code, the code wins — fix the map.

```
src/app/                     routes (App Router, all static)
src/components/              layout / sections / cards / ui
src/lib/                     i18n · seo · site · provenance · images · utils
src/content/site.ts          institutional constants (names, locations)
src/styles/globals.css       design tokens (@theme) + base layer (interaction clock, ADR-0007)
src/styles/motion.css        complete motion + interaction-device vocabulary (ADR-0006/0007)
content/                     typed bilingual content collections
source-materials/            committed source snapshots (provenance evidence)
docs/                        ADRs · audits · deployment · roadmap · this map
```

## Pages (5 routes × 2 locales, all SSG)

| Route | File | Composition |
| --- | --- | --- |
| `/{lang}` | `src/app/[lang]/page.tsx` | InstitutionalHero (ink) → research digest (5 indexed rows) → research leaders (4 typographic rows, ADR-0008; names deep-link to /staff anchors) → recognition record (4 dated rows) → century band (sand: prose | head lineage register, numbers strip — D020) → navy closer. Cadence: ink → ivory → sand → navy. |
| `/{lang}/about` | `…/about/page.tsx` | PageIntro → QuoteBlock epigraph → body → LeadershipSection (dean) → history band (sand, 1905 watermark, 8 head periods) → official links. |
| `/{lang}/research` | `…/research/page.tsx` | PageIntro → scope note → 5 direction rows (h2) → 6 group rows (h3, copper direction eyebrow links) → school band (sand, 1944 watermark, bibliography). |
| `/{lang}/staff` | `…/staff/page.tsx` | PageIntro → head section → leading faculty (StaffCards) → roster pointer to official site. Deliberately all-quiet. |
| `/{lang}/contacts` | `…/contacts/page.tsx` | PageIntro → ContactSection (4-col grid: address, dept phone/email, faculty phone/email, official links). All-quiet. |

System surfaces: `src/app/page.tsx` (root → `/ua` redirect), `not-found.tsx`
(bilingual 404, outside `[lang]`), `robots.ts`, `sitemap.ts`, `icon.svg`.

## Content collections (`content/`)

| Collection | Exports | Notes |
| --- | --- | --- |
| `pages/en.ts`, `pages/ua.ts` | `en`, `ua` dictionaries | EN = canonical shape; `ua: typeof en` enforces parity at compile time. All UI strings live here. |
| `history/history.ts` | `founded`, `periods`, `getHistory()` | 8 head periods 1905→present; past facts publish with `sourced` provenance (ADR-0001 targets current-personnel claims). |
| `staff/staff.ts` | `staff`, `getStaff()`, `getHead()`, `getResearchLeaders()` | 11 records; only `featured` resolve publicly (5). `resolve()` enforces both gates. Leaders = head + group-leading professors, `areaId`-joined (ADR-0008). |
| `staff/leadership.ts` | `leadership`, `getDean()` | Faculty leadership, separate from departmental staff by design. |
| `research/research.ts` | `researchAreas`, `getResearchAreas()` | 5 directions from the v3 profile. |
| `research/groups.ts` | `researchGroups`, `getResearchGroups()` | 6 groups, each `areaId`-linked to its parent direction. |
| `research/school.ts` | `schoolName/Lineage/Dissertations`, `schoolFounded`, `schoolDissertationsCount`, `selectedWorks`, `getSchool()` | 1944 school; UA-language bibliography only (language policy). Display figures feed the homepage numbers strip. |
| `research/recognition.ts` | `recognition`, `getRecognition()` | 4 dated results/honours (2007–2021), `sourced` under ADR-0008; volatile metrics and undated honours stay in source notes. |
| `contacts/contacts.ts` | `contact`, `officialLinks`, `legacyDepartmentContacts`, `getContact()` | `legacyDepartmentContacts` = deliberately unpublished backlog. |

Pattern: each collection stores `Localised<T>` (`{ua, en}`) values wrapped in
`Claim<T>`, and exposes a `getX(lang)` resolver returning flat, locale-resolved
view types consumed by pages.

## Components

**Layout** — `Container` (75rem, px-6/8) · `Header` (sticky, desktop nav +
`<details>` mobile menu, language switcher preserving path) · `Footer`
(identity, address, nav, official links) · `InstitutionalHero` (ink masthead:
eyebrow, masthead rule [single, drawn once — ADR-0007], H1, serif statement, CTAs, fact rail with 1905 keystone) ·
`PageIntro` (sub-page opener: eyebrow, serif H1, lead) · `SectionHeader`
(eyebrow-over-hairline + serif H2; `tone="dark"` for ink/navy bands).

**Sections** — `LeadershipSection` (quiet dean block on /about) ·
`ContactSection` (contact record grid).

**Cards** — `ResearchAreaCard` (indexed editorial row; optional `href` makes the
title a link [home digest]; `headingLevel` 2|3 tracks the document outline) ·
`StaffCard` (Portrait beside record; drops null lines for withheld people).

**UI** — `Portrait` (fixed 3:4 plate; registration-mark reserve) · `Figure`
(documentary plate with caption bar + plate index — currently dormant: no
render site until Phase B photography returns it to the homepage century
band) · `QuoteBlock` (copper-rule epigraph; `cite` only with confirmed
attribution) · `ExternalLink` (↗, new tab, sr-only note) · `ReviewMark`
(dev/review-only provenance tag). `CenturyRule` retired in D020 — the head
lineage register carries the same era years with the people.

## Data flow

```
content/*.ts  (Claim<Localised<T>>, typed at compile time)
   └─ getX(lang) resolvers  → flat locale-resolved view types (src/types/content.ts)
        └─ page components (server, async params { lang })
             └─ presentational components (no data fetching anywhere)
```

Everything is resolved at build time; there is no runtime data source, no
client state beyond the header's mobile menu (the only `"use client"` file).

## Localization flow

1. `generateStaticParams` emits `ua` + `en`; `isLocale()` guards, else 404.
2. `getDictionary(lang)` returns the typed dictionary; `href(lang, path)`
   prefixes internal links.
3. `[lang]/layout.tsx` renders `<div lang={hreflang[lang]}>` — route segment
   `ua` maps to BCP-47 `uk` (single map in `src/lib/i18n.ts`, shared with SEO).
   The `#main` wrapper is `key={lang}` so a UA↔EN switch replays the page
   arrival instead of reusing the container (ADR-0007 follow-up / D017).
4. Root `<html lang="uk">` (UA-primary); the EN subtree overrides via the div.

## SEO flow

- `src/lib/site.ts` resolves the absolute origin once
  (`NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL` →
  localhost) → `metadataBase` in the root layout.
- `buildMetadata()` (`src/lib/seo.ts`) is called by EVERY page: canonical,
  hreflang cluster (uk/en/x-default), OpenGraph, localized brand-suffixed
  titles. Never rely on layout metadata inheritance — it would make every
  sub-page claim the home page as canonical.
- `INDEXABLE_PATHS` in seo.ts drives `sitemap.ts` (one entry per locale×route
  with full hreflang alternates). Keep in sync with `src/app/[lang]/` routes.
- `robots.ts`: blanket disallow unless `VERCEL_ENV === "production"`.

## Provenance system

`src/lib/provenance.ts` — trust states `verified | sourced | placeholder |
editorial`; `Claim<T>` pairs value + provenance; constructors (`sourced()`,
`verified()`, …) and per-source conveniences (`fromDeptProfile`, `fromPhyschem`,
`fromChemKnu`, `fromStaffDirectory[V2]`). `SOURCES` registers every reference
document with retrieval dates; snapshots live in `source-materials/`.
`isReviewMode()` gates `ReviewMark` rendering (dev or
`NEXT_PUBLIC_PROVENANCE_REVIEW=1`; resolved at build time).

## Publication gates (who renders publicly)

```
StaffMember
  ├─ visibility: "featured" | "internal"   ← editorial curation (ADR-0004)
  │     internal → NO render path at all
  └─ person: Claim<…>.provenance.state     ← trust gate (ADR-0001 + 0005)
        verified | sourced → renders (review mark until verified)
        placeholder/editorial → honest pending placeholder ("Ім'я уточнюється")
```

Curated public set (operator-authorized, ADR-0005): dean (about), head + 4 key
faculty (staff), 6 group designations (research). Bio statistics never publish.
The remaining roster is normalized as `internal` — archived, unrendered.

## Where the truth lives

| Question | Document |
| --- | --- |
| Why this architecture? | `docs/decisions/0002` |
| Why this design? | `docs/decisions/0003` + vault `04_Design/design-language.md` |
| Who may be published? | `docs/decisions/0001`, `0004`, `0005` |
| What is the live state? | vault `00_MOC/current-state.md` |
| What happened, when? | vault `05_Operations/decision-log.md` + sprint board |
| What sources exist? | `docs/content-audit/` + `source-materials/README.md` |
| What's next? | `docs/roadmap.md` (product) + vault `00_MOC/roadmap.md` (sessions) |
| What's still owed? | `docs/technical-debt.md` |
