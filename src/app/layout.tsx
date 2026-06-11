import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/site";
import "@/styles/globals.css";

// Serif (Latin) — editorial identity for English headings.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

// Serif (Cyrillic) — renders Ukrainian headings, chained after Cormorant.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  display: "swap",
});

// Body — Latin + Cyrillic.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// `metadataBase` is set once here so every page can declare canonical / hreflang /
// OpenGraph URLs as relative paths that resolve against the real production origin.
// Locale pages compose their own absolute titles with the LOCALISED brand suffix
// in lib/seo.ts buildMetadata; the `title.template` here only covers non-locale
// surfaces (e.g. the bilingual 404 page).
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default:
      "Department of Physical Chemistry — Taras Shevchenko National University of Kyiv",
    template: "%s — KNU Physical Chemistry",
  },
  description:
    "The Department of Physical Chemistry at the Faculty of Chemistry, Taras Shevchenko National University of Kyiv.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${cormorant.variable} ${lora.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-ivory font-sans text-navy antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
