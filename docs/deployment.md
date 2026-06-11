# Deployment (Vercel)

Project: `ayzee287s-projects/knu-physical-chemistry-site` · Git integration
active, production branch `main`. Every merge to `main` builds and deploys
automatically.

## Current status — LIVE (since 2026-06-11)

**Production is publicly reachable and serving both locales.** The 2026-06-10
launch blocker (deployment protection + unassigned domain, D008) and the
subsequent framework-preset 404 (D010) are both resolved. There is no open
deployment issue.

## Troubleshooting order (learned the hard way)

If production ever 404s/401s again, check the **dashboard before the code** —
both historical incidents were configuration, not application defects:

1. **Framework Preset** = Next.js (not "Other") — D010.
2. **Deployment Protection** scope — Vercel Authentication must cover
   *previews only*, never production — D008.
3. **Domains** — a public production domain must be attached — D008.
4. Root Directory and Production Branch (`main`) are correct.
5. Only then suspect the application; builds succeeding while production 404s
   is the signature of a platform-config cause.

## Incident record — production 401/404 (2026-06-10, resolved · D008)

**Symptom:** public URL unreachable: the real production deployment answered
`401` (`_vercel_sso_nonce` cookie), and `knu-physical-chemistry-site.vercel.app`
returned platform `404 NOT_FOUND`.

**Finding:** builds were never the problem — every `main` commit deployed
successfully (verified via GitHub statuses + deployments API). Two
dashboard-level causes: (1) Deployment Protection (Vercel Authentication)
covered production; (2) no public production domain was attached to the
project.

**Fix (operator, dashboard):** Deployment Protection → "Only Preview
Deployments"; Domains → assign public production domain. `NEXT_PUBLIC_SITE_URL`
optional — code falls back to `VERCEL_PROJECT_PRODUCTION_URL`
(`src/lib/site.ts`), so canonical URLs and the sitemap stay correct either way.

## Incident record — framework preset 404 (resolved 2026-06-11 · D010)

**Symptom:** production still returned 404 after D008's access fixes, despite
successful builds.

**Root cause:** the Vercel project was configured with Framework Preset
**"Other"** instead of **Next.js** — deployments built but published with an
incorrect runtime configuration.

**Fix:** Framework Preset → Next.js; production redeployed without cache.

**Prevention:** always verify Framework Preset, Root Directory and Production
Branch before investigating application code.

## Standing facts

- Framework preset: **Next.js** (verify after any project re-import); no
  `vercel.json` needed — defaults are correct.
- `robots.ts` blanket-disallows indexing on every non-production environment
  (`VERCEL_ENV !== "production"`); preview URLs never compete in search.
- Preview deployments stay behind Vercel Authentication — intentional; only
  production must be public.
- `NEXT_PUBLIC_SITE_URL` may be set to the final origin once a permanent
  (university) domain exists; until then the production-URL fallback is
  correct.
