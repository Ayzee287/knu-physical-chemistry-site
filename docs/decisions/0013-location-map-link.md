# 0013 — Department location: an external map link, not an embedded map

Date: 2026-06-15 · Status: accepted · Revised 2026-06-16 (D026): provider
switched from OpenStreetMap to the operator-supplied Google Maps place link.

## Decision

The /contacts page makes the location easier to find with a single **external
map link**, rendered through the shared `ExternalLink` component (↗, new tab)
directly under the postal address. The invariant decision — **a link, never an
embedded iframe** — is what protects privacy and performance; the *provider* is
a content choice.

- **Provider (revised D026): the official Google Maps place link the operator
  supplied** (`https://maps.app.goo.gl/GopvEMmZJcgTeKtK6`). Because it is a
  plain link, **no Google script, cookie, or tracking pixel loads on our
  page** — the visitor only meets Google after clicking, in their own tab —
  so the privacy/performance properties of the original decision are intact.
  The short link resolves to the department's verified pin, so the site still
  asserts no hand-entered coordinates.
- **Superseded:** the first version linked to an OpenStreetMap *address-search*
  URL (no operator pin existed yet). The operator's own Google Maps place link
  is more authoritative (a verified pin, not a geocoder guess) and is what
  most visitors will use for directions; reverting to OSM is a one-line edit.

## Options considered

| Option | Verdict |
| --- | --- |
| **Embedded interactive map (Google Maps / Mapbox iframe)** | **Rejected.** Third-party tracking + cookies (consent-banner pressure on a deliberately cookieless site), a runtime dependency / API key to maintain, layout weight and a network request on a quiet page, and an accessibility/keyboard-trap surface. Disproportionate for "where is the building?". |
| **Embedded Leaflet + self-hosted/OSM tiles** | **Rejected.** Adds a JS map library + tile loading to an otherwise static, dependency-light site (Next/React/Tailwind only) for one pin — fails the no-unnecessary-dependency rule. |
| **Static map image (rendered tile)** | **Rejected.** Requires a tile-provider key or a committed image asset to maintain (and to re-shoot if the building/marker changes); provider attribution/licensing; no real interactivity. A committed PNG of a map is stale by construction. |
| **External link to Google Maps (CHOSEN, D026)** | The operator supplied an official Google Maps place link (a verified pin). As an external link it carries the same privacy/performance profile as any other — no script/cookie loads on our page; Google is met only after the click, in the visitor's own tab. Most universally used for directions, and authoritative (operator-owned pin). |
| **External link to OpenStreetMap (first version, superseded)** | Zero dependency/tracking, but it could only *address-search* (no operator pin existed), so the pin was a geocoder guess. Superseded once the operator provided the Google place link. Still a one-line revert if ever wanted. |

## Why this fits the project

- **Privacy:** no third-party script, cookie, or tracking pixel — consistent
  with the cookieless, consent-banner-free posture.
- **Dependency footprint:** none. No new package, no key, no build step.
- **Performance / accessibility:** it is a link. No iframe, no map JS, no
  focus trap, no layout shift; the address stays selectable plain text.
- **Maintenance:** the address is the single source of truth; the link is
  derived from it (`encodeURIComponent`), so there is nothing to keep in sync
  and no coordinate to verify by hand.
- **Source integrity:** by querying the address rather than embedding a
  lat/long, the pin is whatever the authoritative OSM record resolves — we do
  not publish coordinates we cannot confirm offline.

## Boundaries

- One link, under the address, on /contacts only — not a new page, section,
  or visual motif. Uses the existing `ExternalLink` device.
- If the department later supplies verified coordinates or prefers a Google
  link, both are one-line content edits in `content/contacts/contacts.ts`.
