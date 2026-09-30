import type { Metadata } from "next";
import { CorporatePageView } from "@/components/layout/corporate-page";
import { MISSION } from "@/lib/content/corporate";
import { getLocale } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const page = MISSION[await getLocale()];
  return { title: page.label, description: page.statement };
}

export default function Page() {
  return <CorporatePageView page={MISSION} />;
}
