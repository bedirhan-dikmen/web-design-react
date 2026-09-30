import type { Metadata } from "next";
import { CorporatePageView } from "@/components/layout/corporate-page";
import { VISION } from "@/lib/content/corporate";
import { getLocale } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const page = VISION[await getLocale()];
  return { title: page.label, description: page.statement };
}

export default function Page() {
  return <CorporatePageView page={VISION} />;
}
