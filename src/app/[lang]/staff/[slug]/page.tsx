import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaffProfileView } from "@/components/sections/staff-profile-view";
import { findStaffBySlug, getRoutableStaffSlugs } from "@content/staff/staff";
import { resolveProfile } from "@content/staff/profiles";
import { SOURCES } from "@/lib/provenance";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ lang: string; slug: string }> };

// Fully static: the only valid routes are the prerendered (locale × published
// member) pairs below. Any other slug is a static 404 — no on-demand SSR (the
// site is static-first, and the routable set is closed by the staff collection).
export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getRoutableStaffSlugs();
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const member = findStaffBySlug(slug, lang);
  if (!member) return {};
  const dict = getDictionary(lang);
  const description = member.focus
    ? `${member.role}. ${member.focus}`
    : `${member.role} — ${dict.brand.full}.`;
  return buildMetadata({
    lang,
    path: `/staff/${slug}`,
    title: member.name,
    description,
  });
}

export default async function StaffProfilePage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const member = findStaffBySlug(slug, lang);
  if (!member) notFound();
  const dict = getDictionary(lang);
  // Optional rich profile; null → the page renders the directory identity only.
  const profile = resolveProfile(member.id, lang);

  return (
    <StaffProfileView
      member={member}
      profile={profile}
      lang={lang}
      dict={dict}
      officialUrl={SOURCES.physchemKnu.url}
    />
  );
}
