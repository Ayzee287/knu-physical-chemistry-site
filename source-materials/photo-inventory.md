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

Internal records (not rendered; download only if/when featured): Діюк
(…/1/Diuk.jpg, 920), Болдирєва (…/1/Boldireva.jpg, 912), Гайдай
(…/1/Gaidai.jpg, 910), Малишева (…/1/Malisheva.JPG, 917), Яцимирський А. В.
(…/1/Yatsymyrskyi_AV-new-3.jpg, 922), Гуральський (infopacket 923 only).

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
| Олексенко | infopacket `913.jpg` | 1200×1600 | **B− conditional.** Resolution excellent, but document-photo genre (saturated blue backdrop, flash). Publishable only with the sanctioned monochrome treatment + tight crop; better to request a newer portrait. |
| Роїк | physchem `Roik.jpg` | 363×451 | **C.** Video-frame quality (soft focus, colour artefacts), tight face crop with no headroom. Below the plate bar — request original. |
| Усенко | physchem `Usenko.jpg` | 301×374 | **C.** Casual snapshot, blown highlights, tilted framing. Below the bar — request original. |
| Іщенко | both sources | 137×147 | **F — unusable.** Identical thumbnail in BOTH university systems; no plate size can carry it. Original must come from the department. |
| Group photo (Фрицький at desk) | vstup `fritskij-chem-fac.jpg` | 519×452 | **B− documentary.** Genuine "scientist at work" register, but low resolution + strong yellow cast; usable small, not as the band figure. |

**Consequence for the pipeline:** even WITH consent, publishing today would
put thumbnail-class files into designed plates for 3 of 5 people — worse than
the reserved state. The Phase B conversation is therefore a **consent +
originals** request, not consent alone (the 1200×1600 Олексенко file proves
the university systems hold originals for at least some staff). Readiness
order once originals+consent arrive: head (immediate, file already
publication-grade) → others as originals clear the bar. The homepage band
slot (now the head-lineage register, D020) receives the first documentary
image; portrait plates on /staff fill per person.
