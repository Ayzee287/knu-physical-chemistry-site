# 0012 — /staff is the complete teaching-staff directory; the homepage stays curated

Date: 2026-06-15 · Status: accepted · Amends ADR-0004/0005 (the curated
publication boundary) for the /staff surface only.

## Decision

1. **/staff now lists the department's COMPLETE teaching staff** — all eleven
   records from the official source (the head + ten teachers), in three
   sections:
   - **Завідувач кафедри** — the head.
   - **Провідні викладачі** — the curated leading faculty (Іщенко, Олексенко,
     Роїк, Усенко).
   - **Викладацький та науковий склад** — the remaining teaching staff
     (Гайдай, Малишева, Діюк, Болдирєва, Яцимирський А. В., Гуральський).
2. **A third visibility tier, `staff`, carries the directory.** The model is
   now `featured | staff | internal`. `featured` = the curated leadership set
   (homepage + /staff sections 1–2). `staff` = teaching & research staff
   (/staff section 3 only). `internal` keeps its meaning — no public render
   path — and is now used only by faculty-level records (the vice-deans in
   `leadership.ts`), not by departmental staff.
3. **The homepage stays curated.** `getResearchLeaders()` is unchanged — the
   four research leaders only. No `staff`-tier person is promoted to the
   homepage. The "Провідні викладачі" curation is unchanged.
4. **Same trust + content rules.** Every record still publishes through the
   shared person gate (sourced → renders with review marks). Volatile bio
   statistics still never publish. Missing fields are left empty, never
   invented (e.g. Болдирєва has no source-documented focus → no focus line;
   Гуральський has no ORCID).
5. **The official site stays the record of authority** for any research staff
   beyond the enumerated teaching faculty — a confident pointer note below the
   directory, not an apology.

## Why

- The previous posture ("curated institution, not a directory"; internal
  records never render) was right for the *leadership* surfaces, but it left
  /staff showing 5 of the department's 11 teachers while the source lists all
  11 with full, already-collected data in the collection. For a page titled
  "Співробітники" that is a completeness gap, not curation — the operator
  directed the full teaching staff be shown.
- Splitting curation by SURFACE (homepage = leaders only; /staff = complete)
  keeps both values: the front page still reads as a research flagship, and
  the staff page answers "who teaches here?" honestly and in full.
- The records were already authored and source-checked (they sat as
  `internal`); publishing them is a visibility flip, not new content — so the
  provenance discipline is unchanged.

## Boundaries that hold

- No bio statistics, no fabricated fields, no invented focus lines.
- The homepage and "Провідні викладачі" curation are untouched.
- Portraits remain progressive enhancement (ADR-0009/0011): the six new
  records carry no localised asset yet, so each is a typography-only card —
  no empty frames. Localising their official portraits is a follow-up
  registry edit (photo-inventory.md), never a publication blocker.
- `internal` is retained for genuinely non-departmental records.
