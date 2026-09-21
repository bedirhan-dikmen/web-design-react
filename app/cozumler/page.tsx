import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { EditorialHero } from "@/components/layout/editorial-hero";
import { SectorShowBoard } from "@/components/stages/sector-show-board";
import { CtaBand } from "@/components/sections/cta-band";
import { Container, SectionHeader } from "@/components/ui/primitives";
import { modulesBySlug } from "@/lib/content/modules";
import { SECTOR_IMAGE_SIZE, SECTORS, type Sector } from "@/lib/content/sectors";
import { DEMO_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Çözümler",
  description:
    "Restoran, kafe, pastane, fast food, otel ve çok şubeli yeme-içme işletmeleri için NeXa çözümleri.",
};

/**
 * One sector: its photograph at the source's own 4:3 ratio, what that kind
 * of business needs, and which NeXa modules answer it. The module chips deep
 * link to the matching card on the Modüller page.
 */
function SectorSolution({ sector }: { sector: Sector }) {
  const modules = modulesBySlug(sector.moduleSlugs);
  return (
    <article
      id={sector.slug}
      aria-labelledby={`${sector.slug}-baslik`}
      className="grid scroll-mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    >
      <Image
        src={sector.image}
        width={SECTOR_IMAGE_SIZE.width}
        height={SECTOR_IMAGE_SIZE.height}
        alt={sector.imageAlt}
        sizes="(min-width: 1280px) 360px, (min-width: 640px) 40vw, 100vw"
        className="aspect-[4/3] h-full w-full object-cover"
      />
      <div className="p-6 lg:p-7">
        <h3
          id={`${sector.slug}-baslik`}
          className="text-xl font-bold text-brand-navy-deep"
        >
          {sector.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-brand-red">{sector.tagline}</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-600">
          {sector.description}
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
          {sector.focus.map((f) => (
            <li key={f} className="flex gap-2.5">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-red" strokeWidth={2.5} />
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
          Önerilen modüller
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {modules.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/moduller#${m.slug}`}
                className="inline-block rounded-full bg-brand-navy/[0.06] px-3 py-1 text-xs font-medium text-brand-navy-deep transition-colors hover:bg-brand-red/10 hover:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              >
                {m.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function SolutionsPage() {
  return (
    <>
      <EditorialHero
        ariaLabel="Sektörlere özel NeXa çözümleri"
        eyebrow="KERİNTİ / ÇÖZÜMLER"
        headline={
          <>
            Her mutfağın
            <br />
            kendi <em>düzeni</em> var.
          </>
        }
        description={
          <>
            Restoran, kafe, otel ya da zincir.
            <br />
            NeXa işletmenize göre kurulur.
          </>
        }
        detail="Farklı konsept ve ölçeklerdeki yeme-içme işletmelerinin dijital dönüşüm yolculuğuna eşlik ediyoruz."
        primary={{ label: "Demo talep edin", href: DEMO_HREF }}
        secondary={{ label: "Modülleri inceleyin", href: "/moduller" }}
        aside={{
          lead: "Birden fazla şubeniz mi var?",
          label: "Yeme-içme grupları çözümü",
          href: "#yeme-icme-gruplari",
        }}
        stageLabel="NEXA / SEKTÖRLER"
        stage={<SectorShowBoard />}
        caption={
          <>
            Her konsepte, <em>doğru kurgu.</em>
          </>
        }
        stageDescription="Sektör fotoğraflarının sırayla geçtiği ve her sektör için önerilen modüllerin gösterildiği animasyon."
        linksLabel="Sektörlere git"
        links={[
          { label: "Restoranlar", href: "#restoranlar" },
          { label: "Kafeler", href: "#kafeler" },
          { label: "Oteller", href: "#oteller" },
        ]}
        footer={{
          left: "KERİNTİ YAZILIM / NEXA",
          scrollHref: "#sektor-baslik",
          scrollLabel: "Sektörünüzü seçin",
          right: "HER ÖLÇEKTE İŞLETME.",
        }}
      />

      <section aria-labelledby="sektor-baslik" className="bg-slate-50 py-14 lg:py-16">
        <Container>
          <SectionHeader
            id="sektor-baslik"
            title="Kimler için?"
            lead="Her ölçekteki yeme-içme işletmesi için, daha akıllı bir gelecek."
          />
          <div className="mt-8 grid gap-5 xl:grid-cols-2">
            {SECTORS.map((s) => (
              <SectorSolution key={s.slug} sector={s} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="İşletmenize özel çözümü birlikte planlayalım."
        lead="Konseptinizi ve hedeflerinizi dinleyelim, size en uygun NeXa kurgusunu hazırlayalım."
      />
    </>
  );
}
