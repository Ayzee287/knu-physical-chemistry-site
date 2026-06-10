@AGENTS.md

# Operational notes

- Stack: Next.js 16.2.7 (App Router, static-first), React 19.2.4, TypeScript strict, Tailwind 4.
- Source layout: app code in `src/`, typed content collections in `content/`, raw source documents in `source-materials/`.
- Path aliases: `@/*` → `src/*`, `@content/*` → `content/*`.
- i18n: UA is the canonical language, EN the canonical dictionary shape (`content/pages/en.ts`); routes are `/{ua,en}/...` with UA as x-default.
- Provenance: every discrete factual claim is a `Claim<T>` (`src/lib/provenance.ts`). Publication policy: unverified people are withheld from public HTML and rendered as honest placeholders (docs/decisions/0001). Never publish a `sourced` person; flip to `verified(...)` only after independent confirmation.
- Validation before finishing any session: `npm run lint`, `npm run typecheck`, `npm run build`.
- Git: never work directly on `main`; one branch = one scoped objective; push with `--set-upstream`.
- Next.js note: this Next version may differ from training data — consult `node_modules/next/dist/docs/` when in doubt.
