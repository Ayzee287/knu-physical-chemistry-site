# KNU Physical Chemistry — Department Website

Institutional website of the Department of Physical Chemistry at the Faculty of
Chemistry, Taras Shevchenko National University of Kyiv.

Bilingual (Ukrainian primary, English secondary), static-first, content-conscious.
A sibling of the KNU Chemistry faculty site project, inheriting its visual
language and provenance-aware content architecture while developing its own
department-level identity.

## Stack

- Next.js (App Router, statically generated pages)
- TypeScript (strict)
- Tailwind CSS 4
- No CMS, no database — typed content collections in plain TypeScript

## Structure

```
content/            Typed content collections (the editable layer)
  staff/            Academic staff records (with provenance + publication policy)
  research/         Research directions
  contacts/         Contact facts and official links
  pages/            Bilingual page dictionaries (ua.ts is canonical language,
                    en.ts is the canonical shape)
src/
  app/              App Router routes: /{ua,en}/{about,staff,research,contacts}
  components/       Layout, cards, sections, UI primitives
  content/          Site identity constants
  lib/              i18n, provenance, SEO, site origin, image registry
  styles/           Design tokens (Tailwind @theme)
  types/            Content collection schemas
public/images/      Local image storage (staff/research/campus)
source-materials/   Raw source documents content was extracted from
docs/               Decisions, roadmap, content audit
```

## Content integrity

Every discrete factual claim (a name, a phone number, an address) carries
provenance: `verified`, `sourced` (traceable but unverified), `placeholder`, or
`editorial`. Unverified people are **withheld from the public site** and render
as honest pending placeholders; the sourced records remain in the collections as
the verification backlog. In development, inline review marks show the trust
state of every claim; production builds render none of this tooling.

See `docs/content-audit/` for what the current sources do and do not provide.

## Development

```bash
npm install
npm run dev        # development server
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

`NEXT_PUBLIC_SITE_URL` sets the canonical origin in production.
`NEXT_PUBLIC_PROVENANCE_REVIEW=1` enables provenance review marks in a preview build.
