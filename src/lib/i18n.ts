import { en } from "@content/pages/en";
import { ua } from "@content/pages/ua";

export const locales = ["ua", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ua";

// Locale facts used by SEO output (canonical/hreflang/OpenGraph and the sitemap).
// The route segment is "ua" but the language is Ukrainian → ISO 639-1 "uk".
export const hreflang: Record<Locale, string> = { ua: "uk", en: "en" };
export const ogLocale: Record<Locale, string> = { ua: "uk_UA", en: "en_US" };

// English is the canonical dictionary SHAPE; Ukrainian is the canonical LANGUAGE
// and is type-checked against the English shape for structural parity.
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { ua, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix an app path with the active locale. "" / "/" → the locale home. */
export function href(lang: Locale, path: string): string {
  if (!path || path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}
