import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { KVKK } from "@/lib/content/legal";

export const metadata: Metadata = { title: KVKK.title, description: KVKK.lead };

export default function KvkkPage() {
  return <LegalPage doc={KVKK} path="/kvkk" />;
}
