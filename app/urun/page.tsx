import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { CtaBand } from "@/components/sections/cta-band";
import { ProductBento } from "@/components/sections/product-bento";
import { ProductLogo } from "@/components/ui/product-logo";
import type { L } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const T: L<{ title: string; metaDescription: string; eyebrow: string; heading: [string, string]; lead: string }> = {
  tr: {
    title: "Programlar",
    metaDescription: "neXa sys sipariş yönetim sistemi ve nexus iş yönetim sistemi.",
    eyebrow: "Kerinti / Programlar",
    heading: ["İşinize göre", "iki program."],
    lead: "Sipariş için neXa sys, ekip ve süreçler için nexus.",
  },
  en: {
    title: "Programs",
    metaDescription: "neXa sys order management system and nexus business management system.",
    eyebrow: "Kerinti / Programs",
    heading: ["Two programs,", "one for each job."],
    lead: "neXa sys for orders, nexus for teams and processes.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const t = T[await getLocale()];
  return { title: t.title, description: t.metaDescription };
}

/**
 * Programs overview: a compact intro, then the two live program cards, each
 * leading to its own page where the program (and, for neXa, every module)
 * is introduced in full.
 */
export default async function ProductsPage() {
  const t = T[await getLocale()];
  return (
    <>
      <PageIntro
        eyebrow={t.eyebrow}
        title={
          <>
            {t.heading[0]} <em>{t.heading[1]}</em>
          </>
        }
        lead={t.lead}
        aside={
          <div className="flex items-center gap-5 rounded-full border border-line bg-surface/70 px-6 py-3 backdrop-blur">
            <ProductLogo product="nexa" height={34} />
            <span aria-hidden="true" className="h-8 w-px bg-line-2" />
            <ProductLogo product="nexus" height={38} />
          </div>
        }
      />
      <ProductBento />
      <CtaBand />
    </>
  );
}
