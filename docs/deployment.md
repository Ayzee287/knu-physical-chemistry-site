# Deployment (Vercel)

Project: `ayzee287s-projects/knu-physical-chemistry-site` · Git integration
active, production branch `main`. Every merge to `main` builds and deploys
automatically.

## LAUNCH BLOCKER — current status (re-verified 2026-06-10, end of quality pass)

**The site cannot be reached publicly. This is the only launch blocker, and it
is operator-only — there is no code fix.**

| Question | Answer |
| --- | --- |
| What is broken? | The public URL is unreachable. The real production deployment exists and is healthy, but (a) **Deployment Protection (Vercel Authentication) is ON for production** → it answers `401` with a `_vercel_sso_nonce` cookie, and (b) **no public production domain is assigned** → `knu-physical-chemistry-site.vercel.app` returns platform `404 NOT_FOUND`. |
| Is the build the problem? | No. Every `main` commit builds and deploys successfully (verified via GitHub deployments API; latest healthy deployment `…-6fwdz83x6-…` serves, behind the 401). |
| Who can fix it? | The **Vercel project owner (operator)** only. Requires dashboard access; not doable from the repo, the GitHub API, or CI. Claude has no Vercel credentials. |
| How long does it take? | **~2 minutes**, two settings toggles. |
| What blocks launch after this? | Nothing technical. Content/design are deployable today (see `docs/launch-readiness.md`). |

### Exact operator steps
1. Project → **Settings → Deployment Protection** → Vercel Authentication →
   set **Only Preview Deployments** (or Disabled). Saves immediately.
2. Project → **Settings → Domains** → confirm a public production domain is
   attached. If `knu-physical-chemistry-site.vercel.app` is unavailable, assign
   any free `*.vercel.app` (e.g. `knu-physchem.vercel.app`) or the eventual
   university domain.
3. Verify: open the production domain → homepage loads, `/ua` and `/en`
   navigate, no auth wall.
4. (Optional) Settings → Environment Variables → `NEXT_PUBLIC_SITE_URL` = final
   origin. Until set, code falls back to `VERCEL_PROJECT_PRODUCTION_URL`, so
   canonical URLs and the sitemap remain correct.

## Incident record — production 404 (2026-06-10)

**Symptom:** `knu-physical-chemistry-site.vercel.app` returned platform-level
`404 X-Vercel-Error: NOT_FOUND`.

**Finding:** builds were never the problem. All commits on `main` deployed
successfully (verified via GitHub commit statuses + deployments API; latest
production deployment serves at
`knu-physical-chemistry-site-cwot6ezfs-ayzee287s-projects.vercel.app`).
Two dashboard-level causes:

1. **Deployment Protection (Vercel Authentication) covers production** — the
   real production deployment answers `401 Authentication Required` to the
   public.
2. **No public production domain is attached** — the tested
   `knu-physical-chemistry-site.vercel.app` alias does not belong to the
   project (platform NOT_FOUND, i.e. unassigned/taken), so there is nothing
   public to hit even once protection is lifted.

**Operator fix (dashboard, ~2 minutes):**

1. Project → Settings → **Deployment Protection** → Vercel Authentication →
   set to **Only Preview Deployments** (or Disabled).
2. Project → Settings → **Domains** → confirm/assign the public production
   domain (if `knu-physical-chemistry-site.vercel.app` is unavailable, pick a
   free one, e.g. `knu-physchem.vercel.app`, or attach the university domain
   when ready).
3. Optionally set `NEXT_PUBLIC_SITE_URL` to the final origin (Settings →
   Environment Variables). Until then the code already falls back to
   `VERCEL_PROJECT_PRODUCTION_URL` (`src/lib/site.ts`), so canonical URLs and
   the sitemap stay correct automatically.

## Standing facts

- Framework preset: Next.js; no `vercel.json` needed — defaults are correct.
- `robots.ts` blanket-disallows indexing on every non-production environment
  (`VERCEL_ENV !== "production"`); preview URLs never compete in search.
- Preview deployments stay behind Vercel Authentication — that is fine and
  intentional; only production must be public.
