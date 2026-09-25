import { HomeHero } from "@/components/home/home-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { DesignGallery } from "@/components/sections/design-gallery";
import { DifferenceBlock, ProductComparison, ProductShowcase } from "@/components/sections/product-sections";

/**
 * Homepage (2026-09 redesign, reference: web.kerinti.com.tr).
 *
 * Kerinti is presented as a company with two products, so the opening is
 * company-level and each product then gets its own accent-coloured
 * showcase. The restaurant-specific sections that used to live here (module
 * grid, sectors, testimonials) remain on their own pages.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProductShowcase slug="nexa" />
      <ProductShowcase slug="nexus" flip tinted />
      <DifferenceBlock />
      <ProductComparison />
      <DesignGallery />
      <CtaBand
        badge="Kerinti"
        badgeNote="neXa sys · nexus"
        title="İşinizin akışını birlikte kuralım."
        lead="İhtiyacınızı dinleyelim, size uygun çözümü canlı bir demoyla gösterelim."
        image={false}
      />
    </>
  );
}
