# Launch readiness — assessment (updated 2026-06-11; site is LAUNCHED)

> **2026-06-11:** the deployment blocker is resolved (D008 access config +
> D010 framework preset — see `deployment.md`); production is live and public.
> The site launched. This document remains as the quality ledger for the
> NEEDS WORK items, which are now post-launch debt — tracked with priorities
> in `technical-debt.md`.

Honest classification. **READY** = deployable as-is. **NEEDS WORK** =
shippable but visibly improvable; not a hard blocker. **BLOCKED** = launch
cannot happen until resolved.

| Area | Status | Reason / what's left |
| --- | --- | --- |
| **Deployment** | **READY** (was BLOCKED) | Resolved 2026-06-11: protection scoped to previews, public domain assigned, framework preset corrected to Next.js. Production live. |
| Content | READY | Curated, sourced, honest. Self-undermining "site under construction" copy removed this pass; curation now stated as intentional. |
| Research | READY | 5 directions + 6 groups (each tagged with its parent direction) + scientific school; all sourced from the June-2026 department profile. |
| Staff | READY | Curated set published (dean, head, 4 key faculty + ORCID); internal roster withheld by policy, stated honestly. |
| Translation | READY | Full UA/EN parity, compiler-enforced; language audit clean (zero russian characters in built HTML). |
| Credibility | READY* | Provenance discipline intact, no fabrication, bio statistics withheld. *All published facts are `sourced`, not yet `verified` — one department confirmation pass converts them and removes review marks. Published under operator authority (ADR-0005). |
| Design | READY* | Coherent archival system (1905 identity, copper accent, loud/quiet pacing). *Not yet browser-verified — see Responsiveness. |
| **Responsiveness** | **NEEDS WORK** | Reviewed and reasoned at code level (breakpoints, min-widths, stacking) but **never verified in a real browser** at 360/768/1280. Long-standing debt; needs one rendering session. No known defect, but unverified. |
| **Photography** | **NEEDS WORK** | Zero images site-wide. Reserved plates are intentional and elegant, but the site is image-free. Inventory ready (`source-materials/photo-inventory.md`); gated on department consent. Biggest gap to "feels complete". |
| **Accessibility** | **NEEDS WORK** | Foundations present (skip link, `aria-current`, focus-visible rings incl. dark-surface inversion, sr-only notes, semantic landmarks). No formal audit: copper-on-sand/ivory contrast, mobile-menu keyboard trap, heading order not yet checked. |

## Bottom line

Launched — no blocker remains (2026-06-11). The site is live and presentable
to a stakeholder today; the three NEEDS WORK items (responsive verification,
photography, a11y audit) are the path from "presentable" to "polished" and are
tracked with priorities in `technical-debt.md`.
