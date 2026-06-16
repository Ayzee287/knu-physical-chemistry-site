import type { MetadataRoute } from "next";
import { locales, defaultLocale, hreflang } from "@/lib/i18n";
import { INDEXABLE_PATHS } from "@/lib/seo";
import { getStaffProfilePaths } from "@content/staff/staff";
import { absoluteUrl } from "@/lib/site";

// One entry per (locale, route), each carrying the full hreflang cluster so
// crawlers see UA/EN as alternates of the same page. Absolute URLs come from the
// single resolved site origin (lib/site.ts) — no localhost leakage.
//
// The fixed pages (INDEXABLE_PATHS) are joined by the per-person profile routes
// (`/staff/<slug>`, ADR-0014), derived from the staff collection so the sitemap
// cannot drift from the routable set.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [...INDEXABLE_PATHS, ...getStaffProfilePaths()];

  return locales.flatMap((loc) =>
    paths.map((path) => {
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[hreflang[l]] = absoluteUrl(`/${l}${path}`);
      }
      languages["x-default"] = absoluteUrl(`/${defaultLocale}${path}`);

      return {
        url: absoluteUrl(`/${loc}${path}`),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1 : 0.7,
        alternates: { languages },
      };
    }),
  );
}
