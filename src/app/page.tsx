import { permanentRedirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

// Ukrainian-first: the bare root sends visitors to the default locale.
// Permanent (308): the root will never serve content itself, and a permanent
// status lets crawlers consolidate any signals onto /ua.
export default function RootPage() {
  permanentRedirect(`/${defaultLocale}`);
}
