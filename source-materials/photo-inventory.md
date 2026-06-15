# Photo inventory — official portrait sources (v3 profile, 2026-06-10)

Official portrait URLs of record for the curated set, from the v3 department
profile. **Never hotlinked.** Pipeline (docs in `src/lib/images.ts`): download
→ confirm permission/consent with the department → optimise → place under
`public/images/staff/<id>.jpg` → register in the typed registry → reference
by `photo: "<key>"` from the staff collection.

| Collection id | Person | Primary URL | Fallback (infopacket) | Intended local path |
| --- | --- | --- | --- | --- |
| head | Фрицький І. О. | physchem.knu.ua/images/fritsky1.jpg | …/person_photo/900.jpg | /images/staff/head.jpg |
| ishchenko | Іщенко О. В. | physchem.knu.ua/1/Ishenko.jpg | …/person_photo/903.jpg | /images/staff/ishchenko.jpg |
| oleksenko | Олексенко Л. П. | physchem.knu.ua/1/Oleksenko.jpg | …/person_photo/913.jpg | /images/staff/oleksenko.jpg |
| roik | Роїк О. С. | physchem.knu.ua/1/Roik.jpg | …/person_photo/914.png | /images/staff/roik.jpg |
| usenko | Усенко Н. І. | physchem.knu.ua/1/Usenko.jpg | …/person_photo/906.jpg | /images/staff/usenko.jpg |
| (dean) | Воловенко Ю. М. | knu.ua/img/departments-admin/chemistry/volovenko.png (v1 doc) | — | /images/staff/dean.jpg |

Teaching-staff records — **LOCALISED and PUBLISHED with portraits** (D026;
ADR-0012 directory). Downloaded from the official sources, optimised into
`public/images/staff/`, registered, `photo:` keys added — every /staff record
now renders a plate. Localised sizes: Діюк 305×381, Болдирєва 258×328, Гайдай
394×525, Яцимирський А. В. 794×978, Гуральський 354×472 (infopacket 923),
Малишева 209×263 (physchem pre-framed portrait — the infopacket 917 original
is 2592×1944 LANDSCAPE, rejected: a 3:4 crop needs browser-verified
positioning; low-res accepted under the presence rule, larger than the live
Іщенко 137px). Replacement of any = one-line registry edit. **Every featured
AND teaching-staff portrait is now local; the registry is complete for the
published set.**

Group photos (research surface candidates, vstup.chem.knu.ua):
fritskij-chem-fac.jpg · ishenko-chem-facultet-2.jpg · oleksenko-chem-fac.jpg
· roik.jpg · malisheva-chem-facultet.jpg · diuk-chem-facultet_0.jpg.

Fallback bucket base: `s3.esoc.knu.ua/infopacket-bucket/person_photo/`.
Consent/licensing confirmation with the department is the gating human step.

## Quality assessment (2026-06-12, D020 — evaluation only, nothing committed/published)

Both sources were downloaded to a LOCAL, non-repo evaluation folder
(`Workspace/.photo-eval/`) and visually inspected. The two systems hold
DIFFERENT files per person — check both before requesting originals.

| Person | Best source | Size | Verdict |
| --- | --- | --- | --- |
| Фрицький (head) | infopacket `900.jpg` | 792×792 | **A — publication-grade.** Professional environmental portrait, lab apparatus softly in background; crops cleanly to the 3:4 plate, eyes upper third. The Phase B anchor image. |
| Олексенко | infopacket `913.jpg` | 1200×1600 | **B− conditional.** Resolution excellent, but document-photo genre (saturated blue backdrop, flash). The shared muted-colour grading (ADR-0011) tames the backdrop; tight crop helps; still better to request a newer portrait. |
| Роїк | physchem `Roik.jpg` | 363×451 | **C.** Video-frame quality (soft focus, colour artefacts), tight face crop with no headroom. Below the plate bar — request original. |
| Усенко | physchem `Usenko.jpg` | 301×374 | **C.** Casual snapshot, blown highlights, tilted framing. Below the bar — request original. |
| Іщенко | both sources | 137×147 | **F — unusable.** Identical thumbnail in BOTH university systems; no plate size can carry it. Original must come from the department. |
| Group photo (Фрицький at desk) | vstup `fritskij-chem-fac.jpg` | 519×452 | **B− documentary.** Genuine "scientist at work" register, but low resolution + strong yellow cast; usable small, not as the band figure. |

## Publication state (2026-06-12, ADR-0010 — supersedes the ADR-0009 held list)

Operator directive 2026-06-12 (second): **presence over perfection — every
available official portrait publishes**; the quality bar no longer gates
rendering and grades are internal documentation only. All portraits render
through the shared `Portrait` plate as a **gently muted colour print**
(`saturate-[0.85] contrast-[0.97]` in the component — ADR-0011, 2026-06-15,
supersedes ADR-0010's grayscale: the integration layer that lets mixed-grade
sources share one register, kept in colour so the people stay alive rather
than reading funerary).

| Person | Status | File |
| --- | --- | --- |
| Фрицький (head) | **PUBLISHED** (grade A) | `public/images/staff/head.jpg` (infopacket 900.jpg, 792×792) |
| Олексенко | **PUBLISHED** (grade B) | `public/images/staff/oleksenko.jpg` (infopacket 913.jpg, 1200×1600) |
| Роїк | **PUBLISHED** (grade C+, replacement list) | `public/images/staff/roik.jpg` (physchem Roik.jpg, 363×451) |
| Іщенко | **PUBLISHED** (grade F, replacement list — FIRST priority) | `public/images/staff/ishchenko.jpg` (physchem/infopacket identical, 137×147) |
| Усенко | **PUBLISHED** (grade C, replacement list) | `public/images/staff/usenko.jpg` (physchem Usenko.jpg, 301×374) |
| Воловенко (dean) | **PUBLISHED** (grade F, replacement list) | `public/images/staff/dean.png` (knu.ua volovenko.png, 100×150) |

**Originals request to the department (the remaining human step — now a
REPLACEMENT request, publication no longer waits):** originals for Іщенко
(first priority), the dean and Усенко; a better portrait for Роїк; plus any
documentary department/laboratory photographs for the homepage century band
(the lineage column receives the first documentary image, D020). The
1200×1600 Олексенко file proves the university systems hold originals for
some staff — ask where that set lives. Replacement = one registry edit; no
layout changes.
