import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { DesignGallery } from "@/components/sections/design-gallery";
import { ProductBento } from "@/components/sections/product-sections";

export const metadata: Metadata = {
  title: "Ürünler",
  description: "neXa sys sipariş yönetim sistemi ve nexus iş yönetim platformu.",
};

/** Product overview: the two products (page heading), the gallery, a CTA. */
export default function ProductsPage() {
  return (
    <>
      <ProductBento headingAs="h1" />
      <DesignGallery />
      <CtaBand title="Hangisi size uygun? Birlikte karar verelim." />
    </>
  );
}
