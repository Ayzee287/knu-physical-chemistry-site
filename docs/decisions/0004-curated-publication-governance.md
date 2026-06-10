# 0004 — Curated publication governance (two independent gates)

Date: 2026-06-10 · Status: accepted

## Decision

Person publication runs through two independent gates:

1. **Visibility (editorial curation)** — `StaffMember.visibility` is
   `featured` or `internal`. Only featured records have any public render
   path. Internal records exist for normalization, verification and
   operations; rendering them is not a missing feature but a policy boundary.
   The public site is a curated institution, not a staff directory.
2. **Provenance (trust)** — every person claim carries its provenance state;
   what renders publicly is governed by ADR-0001 as amended by ADR-0005.

## Why

The staff directories deliver full rosters; the temptation is to render
everything. A century-old department is presented through its leadership,
key figures and scientific schools — not a phonebook. Separating the
editorial gate from the trust gate lets the archive grow without the public
surface bloating.

## Consequences

- Adding someone to the site is a deliberate two-step: flip `visibility`,
  satisfy the provenance rule.
- The internal roster can be complete and current without any public effect.
