# 0002 — Repository architecture

Date: 2026-06-10 · Status: accepted

## Decision

- App code lives in `src/` (`app`, `components`, `content`, `lib`, `styles`,
  `types`); editable content collections live at the repository root in
  `content/` (`staff`, `research`, `pages`, `contacts`).
- Path aliases: `@/*` → `src/*`, `@content/*` → `content/*`.
- Collections are plain typed TypeScript modules. No CMS, no markdown loader,
  no runtime content pipeline — the type system is the schema.
- Raw source documents are committed under `source-materials/` so every
  `sourced` claim has its citation target inside the repository.
- Bilingual model inherited from the faculty project: UA is the canonical
  language; EN (`content/pages/en.ts`) is the canonical dictionary shape that
  UA is type-checked against. Routes are `/{ua,en}/...`; hreflang x-default
  points at UA.
- Stack pinned to the faculty project's known-good versions: Next 16.2.7,
  React 19.2.4, Tailwind 4, ESLint 9 flat config.

## Why

Separating the editable layer (`content/`) from the system layer (`src/`) keeps
future content maintenance — the realistic long-term mode of this site — away
from application code, without inventing a CMS the department doesn't need.
