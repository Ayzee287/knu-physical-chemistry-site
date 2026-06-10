import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

// Ukrainian-first: the bare root sends visitors to the default locale.
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
