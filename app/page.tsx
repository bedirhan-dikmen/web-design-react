import { HomeHero } from "@/components/home/home-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { DesignGallery } from "@/components/sections/design-gallery";
import { DifferenceBlock, ProductBento } from "@/components/sections/product-sections";

/**
 * Homepage (minimal pass, 2026-09). Five blocks: hero with the product
 * switcher, the two products as a bento, the three-step approach, a compact
 * gallery of real screens, and a one-line call to action.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProductBento />
      <DifferenceBlock />
      <DesignGallery />
      <CtaBand title="İşinizin akışını birlikte kuralım." />
    </>
  );
}
