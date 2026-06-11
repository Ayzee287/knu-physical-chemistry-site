# 0001 — Provenance architecture and the withhold-unverified policy

Date: 2026-06-10 · Status: accepted · **Amended by ADR-0005** (featured
records publish with `sourced` provenance on operator authorization; the
withhold rule below remains the default for everything else)

## Decision

Inherit the KNU Chemistry faculty project's provenance model wholesale
(`src/lib/provenance.ts`): every discrete factual claim is a `Claim<T>` with a
trust state — `verified`, `sourced`, `placeholder`, `editorial`.

Adopt the faculty project's publication policy (its decision D018) for people:
a person whose claim is merely `sourced` is **not published**. The public site
renders an honest pending placeholder; the sourced name/degree/honours stay in
the content collection as the verification-backlog record.

## Why

- The only person source we hold is an auto-generated staff directory document
  (see `source-materials/`) — secondary, unverified.
- The head-of-department record includes a NAS-of-Ukraine corresponding-
  membership honour — a hard claim that must be checked against the NAS register.
- Incorrect real data on an institutional site is worse than an honest pending
  state, and this site has a real chance of official adoption.

## Consequences

- `/staff` ships structurally complete but shows a pending head and a roster
  notice pointing to the official site of record until verification happens.
- Verifying a person is a one-line change: flip the claim to `verified(...)`.
