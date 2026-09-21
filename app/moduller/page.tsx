import type { Metadata } from "next";
import { EditorialHero } from "@/components/layout/editorial-hero";
import { ModuleConsoleBoard } from "@/components/stages/module-console-board";
import { CtaBand } from "@/components/sections/cta-band";
import { ModuleDetailCard } from "@/components/sections/module-grid";
import { Container, SectionHeader } from "@/components/ui/primitives";
import { MODULES } from "@/lib/content/modules";
import { DEMO_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Modüller",
  description:
    "QR menü, kasa (POS), mutfak ekranı, rezervasyon, stok, e-fatura, cari takip, raporlama ve daha fazlası: NeXa modülleri.",
};

export default function ModulesPage() {
  return (
    <>
      <EditorialHero
        ariaLabel="NeXa modülleri"
        eyebrow="NEXA / MODÜLLER"
        headline={
          <>
            Her ihtiyaç için
            <br />
            bir <em>modül.</em>
          </>
        }
        description={
          <>
            Siparişten kasaya, mutfaktan muhasebeye.
            <br />
            Hepsi birlikte çalışır.
          </>
        }
        detail="QR menü, kasa, mutfak ekranı, stok, e-fatura ve raporlama; hepsi aynı ekosistemde, birbirinden haberdar."
        primary={{ label: "Demo talep edin", href: DEMO_HREF }}
        secondary={{ label: "NeXa’yı keşfedin", href: "/urun" }}
        aside={{
          lead: "Hangi modül işletmenize uygun?",
          label: "Sektör çözümlerine bakın",
          href: "/cozumler",
        }}
        stageLabel="NEXA / MODÜL PANELİ"
        stage={<ModuleConsoleBoard />}
        caption={
          <>
            On bir modül, <em>tek panel.</em>
          </>
        }
        stageDescription="NeXa modüllerinin sırayla öne çıkarıldığı ve her birinin özelliklerinin gösterildiği animasyon."
        linksLabel="Modüllere git"
        links={[
          { label: "Mutfak Ekranı", href: "#mutfak-ekrani" },
          { label: "Stok ve Depo", href: "#stok-depo" },
          { label: "E-Fatura", href: "#e-fatura" },
        ]}
        footer={{
          left: "KERİNTİ YAZILIM / NEXA",
          scrollHref: "#modul-listesi",
          scrollLabel: "Tüm modülleri inceleyin",
          right: "İHTİYACINIZ KADAR NEXA.",
        }}
      />

      <section aria-labelledby="modul-listesi" className="bg-white py-14 lg:py-16">
        <Container>
          <SectionHeader
            id="modul-listesi"
            title="NeXa modülleri"
            lead="Bir modüle gitmek için seçin."
          />
          <nav aria-label="Modüller" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {MODULES.map((m) => (
                <li key={m.slug}>
                  <a
                    href={`#${m.slug}`}
                    className="inline-block rounded-full border border-slate-200 px-3.5 py-1.5 text-sm text-slate-700 transition-colors hover:border-brand-red/40 hover:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                  >
                    {m.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {MODULES.map((m) => (
              <ModuleDetailCard key={m.slug} module={m} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="İşletmenize uygun modülleri birlikte seçelim."
        lead="İhtiyaçlarınızı dinleyelim, size en uygun kurguyu planlayalım."
      />
    </>
  );
}
