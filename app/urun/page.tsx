import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { CtaBand } from "@/components/sections/cta-band";
import { DesignGallery } from "@/components/sections/design-gallery";
import { ProductComparison } from "@/components/sections/product-sections";

export const metadata: Metadata = {
  title: "Programlarımız",
  description: "neXa sys sipariş yönetim sistemi ve nexus iş yönetim platformu.",
};

/** Product overview: both products side by side, then the design gallery. */
export default function ProductsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Ürünler"
        title="İşinizi büyüten iki güçlü çözüm."
        lead="Siparişin hızına neXa sys, işletmenin bütününe nexus. Aynı ekip, aynı kalite anlayışı."
      />
      <ProductComparison />
      <DesignGallery />
      <CtaBand badge="Kerinti" badgeNote="neXa sys · nexus" title="Hangisi size uygun? Birlikte karar verelim." lead="İşletmenizi dinleyip size uygun ürünü canlı bir demoyla gösterelim." image={false} />
    </>
  );
}
