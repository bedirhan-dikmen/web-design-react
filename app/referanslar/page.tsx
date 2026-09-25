import type { Metadata } from "next";
import { EditorialHero } from "@/components/layout/editorial-hero";
import { QuoteDeckBoard } from "@/components/stages/quote-deck-board";
import { CtaBand } from "@/components/sections/cta-band";
import { SectorGrid } from "@/components/sections/sector-grid";
import { BrandStrip, Testimonials } from "@/components/sections/social-proof";
import { Container, SectionHeader } from "@/components/ui/primitives";
import { SECTORS } from "@/lib/content/sectors";
import { BRANDS } from "@/lib/content/social-proof";
import { DEMO_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Referanslar",
  description: "neXa ile dijital dönüşüm yolculuğuna eşlik ettiğimiz yeme-içme işletmeleri.",
};

/**
 * References. The structure is final; the content is not. Customer quotes are
 * demo entries (visibly labelled) and the logo strip is empty until approved
 * logo files exist — see lib/content/social-proof.ts. No customer name, count
 * or brand is claimed here.
 */
export default function ReferencesPage() {
  const showBrands = BRANDS.length > 0 || process.env.NODE_ENV !== "production";

  return (
    <>
      <EditorialHero
        ariaLabel="Referanslar"
        eyebrow="KERİNTİ / REFERANSLAR"
        headline={
          <>
            Güven,
            <br />
            <em>serviste</em> kazanılır.
          </>
        }
        description={
          <>
            Her gün, her masada.
            <br />
            İşletmelerle birlikte büyüyoruz.
          </>
        }
        detail="Farklı konsept ve ölçeklerdeki yeme-içme işletmelerinin dijital dönüşüm yolculuğuna eşlik ediyoruz."
        primary={{ label: "Demo talep edin", href: DEMO_HREF }}
        secondary={{ label: "Bizi tanıyın", href: "/hakkimizda" }}
        aside={{
          lead: "İşletmeniz hangi sektörde?",
          label: "Sektör çözümlerini inceleyin",
          href: "/cozumler",
        }}
        stageLabel="KERİNTİ / MÜŞTERİ SESİ"
        stage={<QuoteDeckBoard />}
        caption={
          <>
            Birlikte <em>büyüyoruz.</em>
          </>
        }
        stageDescription="Örnek yorum olarak işaretlenmiş alıntı kartlarının sırayla gösterildiği animasyon."
        linksLabel="Sayfa bölümleri"
        links={[
          { label: "Müşteri yorumları", href: "#yorum-baslik" },
          { label: "Kimlerle çalışıyoruz", href: "#kimlerle-baslik" },
          { label: "İletişim", href: "/iletisim" },
        ]}
        footer={{
          left: "KERİNTİ YAZILIM / NEXA",
          scrollHref: "#yorum-baslik",
          scrollLabel: "Yorumları okuyun",
          right: "DAHA İYİ RESTORANLAR İÇİN.",
        }}
      />

      <div className="bg-white">
        <section aria-labelledby="yorum-baslik" className="pt-14 pb-12 lg:pt-16">
          <Container>
            <SectionHeader
              id="yorum-baslik"
              title="Müşterilerimiz Ne Diyor?"
              lead="neXa ile işletmeler büyüyor, misafirler mutlu oluyor."
            />
            <div className="mt-8">
              <Testimonials />
            </div>
          </Container>
        </section>

        {showBrands && (
          <section aria-labelledby="marka-baslik" className="py-12">
            <Container>
              <SectionHeader id="marka-baslik" title="Güvenilir markaların tercihi" />
              <div className="mt-8">
                <BrandStrip />
              </div>
            </Container>
          </section>
        )}

        <section aria-labelledby="kimlerle-baslik" className="pt-12 pb-14 lg:pb-16">
          <Container>
            <SectionHeader
              id="kimlerle-baslik"
              title="Kimlerle Çalışıyoruz?"
              lead="Restoranlardan otellere, tek şubeden çok şubeli gruplara."
            />
            <div className="mt-8">
              <SectorGrid sectors={SECTORS} />
            </div>
          </Container>
        </section>
      </div>

      <CtaBand />
    </>
  );
}
