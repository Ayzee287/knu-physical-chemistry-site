# Deployment (Vercel)

Project: `ayzee287s-projects/knu-physical-chemistry-site` · Git integration
active, production branch `main`. Every merge to `main` builds and deploys
automatically.

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
