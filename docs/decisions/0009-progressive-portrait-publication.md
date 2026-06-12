# 0009 — Progressive portrait publication from official university sources

Date: 2026-06-12 · Status: accepted · Supersedes the Phase B consent gate and
the D021 all-or-none section rule; amends the photography posture of
ADR-0001/0005.

## Decision

Portraits originating from the university's OWN official information systems
(physchem.knu.ua, infopacket.knu.ua / s3.esoc.knu.ua, knu.ua,
vstup.chem.knu.ua) are publishable on explicit operator authorization
(directive, 2026-06-12), as **progressive enhancement**:

1. Each portrait publishes **independently**, the moment a technically
   usable asset exists. The complete-set requirement is removed.
2. **Quality bar per asset:** at least ~2× the largest render size
   (plates render ≤128px wide → ≥~256px source), recognizable, undistorted,
   and not visually degrading at plate size. Below the bar → held, and the
   asset goes on the originals-request list.
3. **No reserved frames, ever.** A record without a usable asset renders the
   photo-less typographic layout. Mixed photo/photo-less sections are the
   normal state while the set completes.
4. Files are localised into `public/images/staff/` and served only through
   the typed registry (`src/lib/images.ts`), each entry documenting its
   official source and quality grade. Hotlinking remains forbidden.

Published today: **head** (grade A, infopacket 900.jpg, 792×792) ·
**Олексенко** (grade B, infopacket 913.jpg, 1200×1600) · **Роїк** (grade C+,
physchem Roik.jpg, 363×451 — flagged for replacement). Held: **Іщенко**
(137×147 in both systems), **Усенко** (snapshot genre, blown highlights),
**dean** (100×150) — all on the originals-request list
(source-materials/photo-inventory.md).

## Why

- The images are the institution's own published official portraits, used
  for the same representational purpose on a site representing that
  institution — not third-party, scraped or private material. The operator,
  as responsible owner, judged the prior consent gate unnecessarily strict
  for this class of material and directed publication (same authorization
  pattern as ADR-0005).
- The empty-frame problem (D013 → D020 → D021) showed that *absence devices*
  cannot carry presence. D021's typographic fallback is kept as the
  permanent photo-less form; this ADR adds the photographs themselves.
- All-or-none (D021) was right when zero assets were cleared; with
  publication authorized per-asset, it would hold three publishable
  portraits hostage to two thumbnails. Progressive enhancement matches how
  the set will actually complete.

## Boundaries that hold

- The quality bar is non-negotiable: a recognizable-but-degrading file
  (Іщенко's 137px thumbnail) harms presence more than absence does.
- Sources remain documented per registry entry; the department can request
  replacement or removal of any portrait at any time (one-line edits).
- No decorative, stock, or hero imagery — photography remains informational
  (people, eventually documentary department imagery).
