import { HeroSection } from "@/components/home/hero/hero-section";
import { CtaBand } from "@/components/sections/cta-band";
import { ModuleGrid } from "@/components/sections/module-grid";
import { SectorGrid } from "@/components/sections/sector-grid";
import { BrandStrip, Testimonials } from "@/components/sections/social-proof";
import { Steps } from "@/components/sections/steps";
import { ArrowLink, Container, SectionHeader } from "@/components/ui/primitives";
import { HOW_IT_WORKS } from "@/lib/content/company";
import { MODULES } from "@/lib/content/modules";
import { SECTORS } from "@/lib/content/sectors";
import { BRANDS } from "@/lib/content/social-proof";

/**
 * Homepage. The hero is frozen (Phase 02 brief) and is rendered as-is; every
 * section below it follows the order of the homepage reference.
 */
export default function HomePage() {
  const showBrands = BRANDS.length > 0 || process.env.NODE_ENV !== "production";

  return (
    <>
      <HeroSection />

      <div className="bg-white">
        <section aria-labelledby="cozum-baslik" className="pt-14 pb-12 lg:pt-16">
          <Container>
            <SectionHeader
              id="cozum-baslik"
              title="Tüm restoran süreçleriniz için eksiksiz bir çözüm"
              lead="NeXa, restoran işletmelerinin ihtiyaç duyduğu tüm araçları tek platformda sunar."
              action={<ArrowLink href="/moduller">Tüm Özellikleri Keşfet</ArrowLink>}
            />
            <div className="mt-8">
              <ModuleGrid modules={MODULES} moreHref="/moduller" />
            </div>
          </Container>
        </section>

        <section aria-labelledby="kimler-baslik" className="py-12">
          <Container>
            <SectionHeader
              id="kimler-baslik"
              title="Kimler için?"
              lead="Her ölçekteki yeme-içme işletmesi için, daha akıllı bir gelecek."
              action={<ArrowLink href="/cozumler">Sektör Çözümlerimizi İncele</ArrowLink>}
            />
            <div className="mt-8">
              <SectorGrid sectors={SECTORS} />
            </div>
          </Container>
        </section>

        <section aria-labelledby="nasil-baslik" className="py-12">
          <Container>
            <SectionHeader
              id="nasil-baslik"
              title="Nasıl Çalışır?"
              lead="Dakikalar içinde başlayın, farkı hemen hissedin."
            />
            <div className="mt-8 rounded-2xl border border-slate-200 p-6 sm:p-8">
              <Steps steps={HOW_IT_WORKS} />
            </div>
          </Container>
        </section>

        <section aria-labelledby="yorum-baslik" className="py-12">
          <Container>
            <SectionHeader
              id="yorum-baslik"
              title="Müşterilerimiz Ne Diyor?"
              lead="NeXa ile işletmeler büyüyor, misafirler mutlu oluyor."
              action={<ArrowLink href="/referanslar">Tüm Referansları Gör</ArrowLink>}
            />
            <div className="mt-8">
              <Testimonials />
            </div>
          </Container>
        </section>

        {showBrands && (
          <section aria-labelledby="marka-baslik" className="pt-4 pb-14 lg:pb-16">
            <Container>
              <SectionHeader
                id="marka-baslik"
                title="Güvenilir markaların tercihi"
                action={<ArrowLink href="/referanslar">Tüm Referanslarımız</ArrowLink>}
              />
              <div className="mt-8">
                <BrandStrip />
              </div>
            </Container>
          </section>
        )}
      </div>

      <CtaBand />
    </>
  );
}
