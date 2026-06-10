// Single source of truth for the site's absolute origin and indexing policy.
//
// Canonical URLs, hreflang, OpenGraph, the sitemap and robots all need ONE
// consistent absolute origin, resolved here once so a missing env var never
// leaks localhost into production metadata.
//
// Resolution order (first match wins):
//   1. NEXT_PUBLIC_SITE_URL          — explicit, authoritative. Set this in prod.
//   2. VERCEL_PROJECT_PRODUCTION_URL — stable production domain on Vercel.
//   3. VERCEL_URL                    — per-deployment preview URL on Vercel.
//   4. http://localhost:3000         — local dev only.

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

function withProtocol(host: string): string {
  return /^https?:\/\//.test(host) ? host : `https://${host}`;
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(withProtocol(explicit));

  const prodDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prodDomain) return stripTrailingSlash(withProtocol(prodDomain));

  const deployUrl = process.env.VERCEL_URL;
  if (deployUrl) return stripTrailingSlash(withProtocol(deployUrl));

  return "http://localhost:3000";
}

/** Absolute origin of the site, no trailing slash. */
export const SITE_URL = resolveSiteUrl();

/** Reusable URL instance for `metadataBase`. */
export const siteUrl = new URL(SITE_URL);

/**
 * Only true on a Vercel *production* deployment. Preview and local builds stay
 * unindexed so review URLs never compete with the canonical site in search.
 */
export const allowIndexing = process.env.VERCEL_ENV === "production";

/** Join the site origin with an app path → a fully-qualified absolute URL. */
export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
