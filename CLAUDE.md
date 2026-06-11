@AGENTS.md

# Operational entrypoint

This file is the single entrypoint for an AI operator session. Read it, then
read the documents listed under "Read before any task". Everything else is
discoverable from there.

## Mission

Institutional website for the **Department of Physical Chemistry**, Faculty of
Chemistry, Taras Shevchenko National University of Kyiv (founded 1905). The
site is a curated research-flagship presence — *a publication, not a product
catalogue* — sibling to the KNU Chemistry faculty site, deliberately darker in
register. Trustworthiness is the product: every fact is traceable, nothing is
fabricated, curation is stated as intentional.

## Read before any task

1. `docs/project-map.md` — the whole architecture in one document.
2. `docs/decisions/` — ADR-0001…0005 (provenance policy, architecture, design
   direction, curated publication governance ×2). Skim titles; read the ones
   your task touches.
3. Vault `00_MOC/current-state.md` — live project state (single source of truth).
4. Vault `05_Operations/sprint-board.md` — what is in flight right now.
5. If touching visuals: vault `04_Design/design-language.md`.

Vault root: `AI-Studio/01_Clients/KNU_Physical_Chemistry/` (sibling of this
repo under `Workspace/`).

## Stack and layout

- Next.js 16.x (App Router, static-first) · React 19.x · TypeScript strict ·
  Tailwind 4. This Next version may differ from training data — consult
  `node_modules/next/dist/docs/` when in doubt.
- App code in `src/`, typed content collections in `content/`, raw source
  documents in `source-materials/` (committed snapshots — provenance evidence).
- Path aliases: `@/*` → `src/*`, `@content/*` → `content/*`.
- No CMS, no runtime content loaders: **the type system is the content schema.**
- Images only via the typed registry `src/lib/images.ts` (empty until
  photography clears consent); components render designed reserved states.

## i18n (non-negotiable)

- UA is the canonical **language**; EN is the canonical **dictionary shape**
  (`content/pages/en.ts`; `ua.ts` is type-checked against it — parity is
  compiler-enforced).
- Routes `/{ua,en}/...`, UA is x-default. The route segment is `ua` but the
  rendered `lang` attribute and hreflang are BCP-47 `uk` (map in `src/lib/i18n.ts`).
- **Zero russian-language text anywhere in published content** (operator
  directive 2026-06-10). Check with a Unicode-aware grep for `[ыэъёЫЭЪЁ]`;
  note that Windows `grep -P` false-positives on UTF-8 lead bytes — use ripgrep.

## Provenance and publication policy (the heart of the project)

- Every discrete factual claim is a `Claim<T>` (`src/lib/provenance.ts`) with a
  trust state: `verified` | `sourced` | `placeholder` | `editorial`.
- **sourced ≠ verified.** Sourced = traceable to a reference document, not yet
  independently confirmed. Verified = independently confirmed. Verification
  removes review marks; it is performed by a HUMAN with the department, never
  by an AI session deciding a claim "looks right".
- Two independent publication gates for people (ADR-0004):
  1. **visibility** — only `featured` records render; `internal` records have
     no render path (curated institution, not a directory).
  2. **provenance** — featured records publish with `sourced` provenance under
     explicit operator authorization (ADR-0005 amendment); records with no
     factual sourcing render as honest pending placeholders (ADR-0001).
- Volatile bio statistics (h-index, publication counts, prizes) are **never**
  published — source notes only.
- `ReviewMark` renders trust-state tags in dev/review builds only
  (`NEXT_PUBLIC_PROVENANCE_REVIEW=1`); production renders nothing.

## Design language (summary — full rules in vault design-language + ADR-0003)

- Tokens: `ink` (hero only) · `navy` (text/identity) · `ivory` (paper) ·
  `sand` (warm band) · `copper` (THE single accent, small elements only) ·
  `slate` (body). Serif: Cormorant→Lora chain; body: Inter.
- Typography-first; hairline-separated editorial rows, never card grids.
- Loud/quiet pacing: at most ONE monumental band per page; staff and contacts
  stay entirely quiet on purpose.
- Full-bleed bands use the `py-16 sm:py-20 lg:py-24` triad (hero excepted).
- Motion: hover affordances only; `prefers-reduced-motion` honoured.
- Heading levels track the document tree, not visual size.
- Forbidden: glassmorphism, gradients, neon, dashboards, startup typography,
  luxury framing, cinematic heroes, over-animation, AI-cliché visuals, stats
  counters, fabricated prestige.

## Forbidden behaviors

- Never publish a person with bare `placeholder` provenance; never flip a claim
  to `verified(...)` without independent human confirmation.
- Never add russian-language text to published content.
- No fake content, no fabricated/loosely-attributed quotes, no placeholder
  biographies, no `dangerouslySetInnerHTML`, no unnecessary dependencies.
- Don't re-litigate settled decisions (ADRs, D-log) — supersede with a new
  entry if circumstances changed.
- Don't add new archival devices without retiring one (the device set is
  complete).
- Copy must never apologize for curation ("under construction", "data will
  appear later"). Curation is stated as deliberate.

## Workflows

**Branch:** never work directly on `main`; one branch = one scoped objective;
push with `--set-upstream`. The operator merges PRs. Before pushing more
commits to a branch with an open PR, check the PR state — if merged, branch
anew (D006 incident). No `gh` CLI on this machine: use the GitHub REST API
with the token from `git credential fill` (D002).

**Validation (every session, before finishing):**
`npm run lint` · `npm run typecheck` · `npm run build` — all must be green.

**Deployment:** Vercel project `ayzee287s-projects/knu-physical-chemistry-site`,
Git integration on `main` — every merge deploys automatically. Production is
live and public. If production ever 404s/401s, check (in order): Framework
Preset = Next.js, Deployment Protection scope, assigned domains — see
`docs/deployment.md` incident records (D008, D010) before touching code.
`robots.ts` blanket-disallows non-production deployments; preview URLs never
compete in search.

**Vault sync (mandatory, ends every implementation batch):** update the vault
docs the session touched — at minimum `00_MOC/current-state.md` and
`05_Operations/sprint-board.md`; plus `04_Design/*` for design reasoning and
`05_Operations/decision-log.md` (D-NNN, newest first) for non-trivial
decisions. Record state AND reasoning. Repo owns architecture/product records
(ADRs, audits, roadmap); vault owns operations (state, sequencing, decisions,
sprint board). Cross-reference, never duplicate (D001).

## Vault structure

```
00_MOC/         current-state · content-status · decisions-index · roadmap (session sequencing)
01_Context/     project-vision · institutional-positioning · stakeholders
02_Content/     content-pipeline
03_Architecture/ content-architecture · frontend-architecture · i18n · image-strategy
04_Design/      design-language · homepage-direction · typography · mobile-ux
05_Operations/  decision-log · sprint-board
06_Research/    department-analysis · official-site-analysis · research-directions
```
