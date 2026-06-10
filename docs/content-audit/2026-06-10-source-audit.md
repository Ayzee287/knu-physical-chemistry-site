# Content audit — what the sources actually provide

Date: 2026-06-10 · Source: `source-materials/chemistry_faculty_knu.html`
(faculty staff directory, auto-generated June 2026 from knu.ua / chem.knu.ua /
anchem.knu.ua), plus sourced records inherited from the faculty project.

## What exists for the Department of Physical Chemistry

| Item | Status | Where it landed |
| --- | --- | --- |
| Head of department (Фрицький І. О., д.х.н., проф., чл.-кор. НАН) | sourced, unverified → **withheld** | `content/staff/staff.ts` (backlog record) |
| Head's stated field (фізична та координаційна хімія) | sourced signal | `content/research/research.ts` (coordination-chemistry area) |
| Official department site (physchem.knu.ua, legacy frames) | sourced, unconfirmed | `content/contacts/contacts.ts` |
| Faculty address / phone / email | sourced from chem.knu.ua | `content/contacts/contacts.ts`, labelled as faculty-level |
| Department's place among the five faculty departments | sourced structure | editorial copy on /about and home |

## What does NOT exist in any source we hold

- **Departmental staff roster** — the directory document covers the dean's
  office and the Analytical Chemistry department in detail, but names only the
  head for Physical Chemistry. No names, degrees, emails, ORCIDs, photos.
- **Department-specific contacts** — no room, phone or email of the department.
- **Research groups, topics, publications** — nothing beyond the head's field.
- **History of the department** — nothing usable; do not improvise one.
- **Photography** — no department imagery. The directory's photo URLs cover
  other units; they are kept in the source document for reference only and are
  not hotlinked anywhere.

## Verification backlog (in priority order)

1. Head of department: post-holder, degree/title, NAS corresponding-membership
   (check the NAS register), preferred EN transliteration → then flip the claim
   to `verified(...)` to publish.
2. Department contacts: rooms, phone, email — request from the department.
3. Staff roster: request an authoritative list (or confirm against
   physchem.knu.ua once its authority is established).
4. Research directions: confirm/replace the editorial framing with the
   department's actual group structure.
5. Photography: collect, license-check and localise under `public/images/`.
