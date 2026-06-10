# Source materials

Raw documents that content was extracted from. Files here are **citation
targets**, not published content — `sourced` claims in the content collections
point at them.

## chemistry_faculty_knu.html

Faculty-of-Chemistry staff directory, auto-generated June 2026 from knu.ua,
chem.knu.ua and anchem.knu.ua (per its own footer). Secondary source —
everything taken from it requires independent verification.

Relevant to this repository: the head-of-department record for Physical
Chemistry and the faculty-level administration/contacts. The detailed staff
listings inside it belong to the **Analytical Chemistry** department and are
out of scope here. Its photo URLs are remote legacy links — kept for a future
download-and-localise pass, never hotlinked.

## chemistry_faculty_knu_v2.html

Expanded staff directory, received 2026-06-10 (~20:30, via 7z archive).
Supersedes v1 in coverage: full teaching rosters for ALL five departments
(incl. an 11-person Physical Chemistry roster), the dean's office, and
department heads with fresher detail (cites a July-2025 rector's order).
Still an auto-generated secondary source — nothing publishes from it without
verification. Recorded conflicts vs the legacy teachers page: Казіміров
absent in v2; several emails differ (institutional @knu.ua preferred where
both exist); the head's NAS honour appears in the heads section but not the
roster section of the same document.

## physchem-knu-ua/

Page snapshots of the department's legacy official site (physchem.knu.ua,
DW6 template, ©2009, windows-1251 encoding), retrieved 2026-06-10:

- `napriamki_ukr.html` — «Основні наукові напрямки» → sourced research areas
  in `content/research/research.ts`.
- `history_ukr.html` — «Історія кафедри» (founded 1905; heads lineage) →
  `content/history/history.ts`.
- `contacts_ukr.html` — department contacts. **Not published**: visible
  copy-paste error in the heading, conflicting old address, deprecated
  mailboxes. Backlog record in `content/contacts/contacts.ts`.
- `fritsky_prof_ukr.html` — the head's group subsection (corroborates the
  head-of-department record; labs 218/203/104/120 listed).
- `shkola_ukr.html` — «Наукова школа з фізичної хімії»: school name, founded
  1944 (Frantsevych), lineage, monograph list → published school block in
  `content/research/school.ts`. Leadership/headcount figures NOT published.
- `teachers_ukr.html` — **roster of 10 teaching staff** with degrees, rooms,
  phones, emails. Several @knu.ua addresses ⇒ the page is substantially newer
  than the ©2009 footer. Current-personnel claims — withheld per ADR-0001;
  this is the primary candidate list for department confirmation.
- `groups_ukr.html` — five research groups (named by their leaders) — withheld
  for the same reason.
- `results_ukr.html` — research results narrative (overlaps shkola page).

The site is the department's own published record — authoritative as
self-description. The ©2009 footer understates freshness in places (the
teachers page and the 2012 textbook entry prove later updates), but every
current-state claim taken from it still carries a confirm-with-department note.
