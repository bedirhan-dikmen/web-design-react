import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { EditorialHero } from "@/components/layout/editorial-hero";
import { ApproachTimelineBoard } from "@/components/stages/approach-timeline-board";
import { CtaBand } from "@/components/sections/cta-band";
import { ModuleCard } from "@/components/sections/module-grid";
import { SectorGrid } from "@/components/sections/sector-grid";
import { Steps } from "@/components/sections/steps";
import { ArrowLink, ButtonLink, Container, IconTile, SectionHeader } from "@/components/ui/primitives";
import { APPROACH, JOURNEY, REASONS, VALUES } from "@/lib/content/company";
import { ABOUT_MODULE_SLUGS, modulesBySlug } from "@/lib/content/modules";
import { SECTORS } from "@/lib/content/sectors";
import { CONTACT_FORM_HREF, DEMO_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Kerinti Soft; restoran, kafe, pastane, fast food zincirleri, oteller ve çok şubeli yeme-içme işletmeleri için yazılım çözümleri geliştiren bir teknoloji şirketidir.",
};

/**
 * About page, following the about reference section by section. All copy is
 * transcribed from that mockup; it states no founding date, headcount,
 * customer count, award or certification, because none were supplied.
 *
 * The reference's two team photographs do not exist in the project, so the
 * hero uses the restaurant photograph and "Biz Kimiz?" is text only.
 */
export default function AboutPage() {
  return (
    <>
      <EditorialHero
        ariaLabel="Kerinti Soft hakkında"
        eyebrow="KERİNTİ / HAKKIMIZDA"
        headline={
          <>
            Restoranı bilen
            <br />
            bir <em>ekip.</em>
          </>
        }
        description={
          <>
            Sahaya yakın, restoran odaklı.
            <br />
            Uzun vadeli bir iş ortağı.
          </>
        }
        primary={{ label: "Demo talep edin", href: DEMO_HREF }}
        secondary={{ label: "İletişime geçin", href: CONTACT_FORM_HREF }}
        aside={{
          lead: "neXa’yı geliştiren ekip.",
          label: "Ürünü yakından tanıyın",
          href: "/urun",
        }}
        stageLabel="KERİNTİ / YAKLAŞIM"
        stage={<ApproachTimelineBoard />}
        caption={
          <>
            Sizi dinleyerek <em>başlıyoruz.</em>
          </>
        }
        stageDescription="Kerinti'nin dört adımlı çalışma yaklaşımını ve değerlerini sırayla gösteren animasyon."
        linksLabel="Sayfa bölümleri"
        links={[
          { label: "Biz Kimiz?", href: "#biz-kimiz" },
          { label: "Çalışma Yaklaşımımız", href: "#yaklasim" },
          { label: "Yolculuğumuz", href: "#yolculuk" },
        ]}
        footer={{
          left: "KERİNTİ YAZILIM / NEXA",
          scrollHref: "#biz-kimiz",
          scrollLabel: "Bizi tanıyın",
          right: "SAHAYA YAKIN, DAİMA YANINIZDA.",
        }}
      />

      <div className="bg-surface">
        {/* Biz Kimiz? + values */}
        <section aria-labelledby="biz-kimiz" className="pt-14 pb-12 lg:pt-16">
          <Container>
            <div className="max-w-4xl">
              <SectionHeader id="biz-kimiz" eyebrow="Hakkımızda" title="Biz Kimiz?" />
              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600 lg:text-[1.0625rem]">
                <p>
                  <strong className="font-semibold text-ink">Kerinti Soft</strong>,
                  restoran, kafe, pastane, fast food zincirleri, oteller ve çok şubeli yeme-içme
                  işletmeleri için pratik, ölçeklenebilir ve kullanıcı dostu yazılım çözümleri
                  geliştiren bir teknoloji şirketidir.
                </p>
                <p>
                  Sektörün dinamiklerini yakından tanıyan ekibimizle, işletmelerin günlük
                  operasyonlarını kolaylaştıran, verimliliği artıran ve sürdürülebilir büyümeyi
                  destekleyen neXa restoran yönetim sistemini geliştiriyoruz.
                </p>
                <p>
                  Daha iyi işletmeler için teknolojinin gerçek değer yarattığına inanıyor; sahaya
                  yakın, çözüm odaklı ve uzun vadeli bir iş ortağı olarak yol alıyoruz.
                </p>
              </div>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <li key={v.title} className="rounded-xl border border-slate-200 p-6">
                    <IconTile>
                      <Icon className="size-9" strokeWidth={1.5} />
                    </IconTile>
                    <h3 className="mt-3 text-lg font-bold text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>

        {/* Ne Geliştiriyoruz? */}
        <section aria-labelledby="ne-gelistiriyoruz" className="py-12">
          <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-12">
            <div>
              <SectionHeader
                id="ne-gelistiriyoruz"
                eyebrow="neXa Ekosistemi"
                title="Ne Geliştiriyoruz?"
                lead="neXa, restoranların tüm operasyonlarını tek platformda birleştiren, modüler ve ölçeklenebilir bir restoran yönetim sistemidir. İşletmelerin bugünkü ihtiyaçlarına ve yarının hedeflerine birlikte odaklanır."
              />
              <ButtonLink href="/urun/nexa" className="mt-6" arrow>
                neXa&apos;yı Keşfet
              </ButtonLink>
            </div>
            <ul className="grid gap-3 min-[420px]:grid-cols-2 md:grid-cols-4">
              {modulesBySlug(ABOUT_MODULE_SLUGS).map((m) => (
                <ModuleCard key={m.slug} module={m} />
              ))}
            </ul>
          </Container>
        </section>

        {/* Çalışma Yaklaşımımız */}
        <section aria-labelledby="yaklasim" className="py-12">
          <Container>
            <SectionHeader
              id="yaklasim"
              title="Çalışma Yaklaşımımız"
              lead="Sizi dinliyor, ihtiyaçlarınıza en uygun çözümü birlikte tasarlıyor ve her adımda yanınızda oluyoruz."
            />
            <div className="mt-8 rounded-2xl border border-slate-200 p-6 sm:p-8">
              <Steps steps={APPROACH} />
            </div>
          </Container>
        </section>

        {/* Neden Kerinti? */}
        <section aria-labelledby="neden" className="py-12">
          <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-12">
            <SectionHeader
              id="neden"
              title="Neden Kerinti?"
              lead="Restoranların ihtiyaçlarını gerçekten anlayan ve bu alana odaklanan bir çözüm ortağıyız."
            />
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {REASONS.map((r) => (
                <li key={r.title} className="flex gap-3 rounded-xl border border-slate-200 p-4">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-red" strokeWidth={2.2} />
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-ink">{r.title}</h3>
                    <p className="mt-0.5 text-sm text-slate-600">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Kimlerle Çalışıyoruz? */}
        <section aria-labelledby="kimlerle" className="py-12">
          <Container>
            <SectionHeader
              id="kimlerle"
              title="Kimlerle Çalışıyoruz?"
              lead="Farklı konsept ve ölçeklerdeki yeme-içme işletmelerinin dijital dönüşüm yolculuğuna eşlik ediyoruz."
              action={<ArrowLink href="/cozumler">Sektör Çözümlerimiz</ArrowLink>}
            />
            <div className="mt-8">
              <SectorGrid sectors={SECTORS} showTagline={false} />
            </div>
          </Container>
        </section>

        {/* Yolculuğumuz */}
        <section aria-labelledby="yolculuk" className="pt-12 pb-14 lg:pb-16">
          <Container>
            <SectionHeader
              id="yolculuk"
              title="Yolculuğumuz"
              lead="Daha iyi işletmeler için çıktığımız bu yolculukta, her zaman daha fazlası için çalışıyoruz."
            />
            <div className="mt-8 rounded-2xl border border-slate-200 p-6 sm:p-8">
              <Steps steps={JOURNEY} numbered={false} />
            </div>
          </Container>
        </section>
      </div>

      <CtaBand
        title="Kerinti Soft ile tanışın."
      />
    </>
  );
}
