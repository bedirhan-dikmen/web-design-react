import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { COOKIES } from "@/lib/content/legal";

export const metadata: Metadata = { title: COOKIES.title, description: COOKIES.lead };

export default function CookiePolicyPage() {
  return <LegalPage doc={COOKIES} path="/cerez-politikasi" />;
}
