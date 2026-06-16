import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  getDictionary,
  hreflang,
  ogLocale,
  type Locale,
} from "@/lib/i18n";

// Per-page metadata builder. Metadata in Next is shallowly merged and a layout's
// `alternates`/`openGraph` are *inherited wholesale* by child pages — so canonical
// and hreflang MUST be set per page, or every sub-page points at the home page.
// This builder produces correct, locale-aware metadata from one place.
//
// Titles are composed here as absolute strings with the LOCALISED brand suffix
// (dict.brand.short), not via the root layout's title template — the template is
// locale-agnostic and would append the English brand to Ukrainian page titles.

const SITE_NAME = "KNU Physical Chemistry";

// The site-wide OG card (src/app/opengraph-image.tsx, D031). Each page sets its
// own `openGraph` object here, which suppresses the file-convention image merge,
// so the card is referenced explicitly. The bare route path (no cache-busting
// hash) is served by the static image handler and resolves to an absolute URL
// against `metadataBase`. The alt text is the institution's Latin identity —
// the card carries no page-specific or unverified content.
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Department of Physical Chemistry — Taras Shevchenko National University of Kyiv",
} as const;

/**
 * Indexable app paths (after the locale segment), in sitemap order. The home is
 * "". Keep this in sync with the routes under `src/app/[lang]/`; it drives the sitemap.
 */
export const INDEXABLE_PATHS = [
  "",
  "/about",
  "/staff",
  "/research",
  "/contacts",
] as const;

/** Build the hreflang map for a given app path (path is everything after the locale). */
function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const loc of locales) {
    map[hreflang[loc]] = `/${loc}${path}`;
  }
  // x-default points at the primary (Ukrainian) version.
  map["x-default"] = `/${defaultLocale}${path}`;
  return map;
}

export function buildMetadata({
  lang,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  lang: Locale;
  /** App path after the locale segment. "" for the locale home, "/about" etc. */
  path: string;
  title: string;
  description: string;
  /** Home page sets the full title verbatim, bypassing the brand-suffix pattern. */
  absoluteTitle?: boolean;
}): Metadata {
  const url = `/${lang}${path}`;
  const alternateLocales = locales
    .filter((loc) => loc !== lang)
    .map((loc) => ogLocale[loc]);
  const brand = getDictionary(lang).brand.short;

  return {
    title: {
      absolute: absoluteTitle ? title : `${title} — ${brand}`,
    },
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocale[lang],
      alternateLocale: alternateLocales,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      // summary_large_image pairs with the site-wide opengraph-image card
      // (src/app/opengraph-image.tsx, D031).
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
