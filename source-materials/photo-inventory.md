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
