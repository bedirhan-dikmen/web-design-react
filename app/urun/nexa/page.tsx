import type { Metadata } from "next";
import { Check, ChefHat, ChartColumn, QrCode, ReceiptText } from "lucide-react";
import { EditorialHero } from "@/components/layout/editorial-hero";
import { OrderFlowBoard } from "@/components/stages/order-flow-board";
import { CtaBand } from "@/components/sections/cta-band";
import { ModuleGrid } from "@/components/sections/module-grid";
import { Steps } from "@/components/sections/steps";
import { ArrowLink, Container, SectionHeader } from "@/components/ui/primitives";
import { PhoneScreenshot, ScreenshotFrame } from "@/components/ui/screenshot";
import { modulesBySlug, type Module } from "@/lib/content/modules";
import { DEMO_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "neXa sys — Sipariş Yönetim Sistemi",
  description:
    "neXa; QR menü, kasa, mutfak ekranı ve raporlamayı tek platformda birleştiren modüler restoran yönetim sistemi.",
};

/** One order's path through neXa, in the order the modules hand it on. */
const FLOW = [
  {
    title: "Sipariş",
    text: "Misafir QR menüden ya da garson kasadan siparişi oluşturur.",
    icon: QrCode,
  },
  {
    title: "Kasa",
    text: "Sipariş masaya işlenir, adisyon anında hazır olur.",
    icon: ReceiptText,
  },
  {
    title: "Mutfak",
    text: "Sipariş mutfak ekranına düşer, hazırlık durumu takip edilir.",
    icon: ChefHat,
  },
  {
    title: "Rapor",
    text: "Her satış yönetim paneline yansır, gün anlık izlenir.",
    icon: ChartColumn,
  },
];

const [QR, POS, KITCHEN, REPORTS] = modulesBySlug([
  "qr-menu",
  "kasa-pos",
  "mutfak-ekrani",
  "raporlama",
]);

const OTHER_MODULES = modulesBySlug([
  "masa-yonetimi",
  "rezervasyon",
  "stok-depo",
  "cari-takip",
  "e-fatura",
  "vardiya",
  "caller-id",
]);

/** Text column for a feature row, driven by the module catalogue. */
function FeatureCopy({ module, eyebrow }: { module: Module; eyebrow: string }) {
  const Icon = module.icon;
  return (
    <div className="max-w-xl">
      <p className="flex items-center gap-2 text-sm font-semibold text-red">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
        {eyebrow}
      </p>
      <h3 className="mt-3 text-[clamp(1.5rem,2vw,2rem)] font-bold leading-tight tracking-tight text-ink">
        {module.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-slate-600 lg:text-[1.0625rem]">
        {module.description}
      </p>
      <ul className="mt-5 space-y-2.5">
        {module.points.map((p) => (
          <li key={p} className="flex gap-3 text-[0.9375rem] text-slate-700">
            <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-red" strokeWidth={2.5} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureRow({
  children,
  media,
  flip = false,
  tinted = false,
}: {
  children: React.ReactNode;
  media: React.ReactNode;
  flip?: boolean;
  tinted?: boolean;
}) {
  return (
    <div className={tinted ? "bg-slate-50" : "bg-surface"}>
      <Container>
        {/* Capped narrower than the page: at 1920 a full-width row put the
            screenshot and its copy ~200px apart with nothing between. */}
        <div className="mx-auto grid max-w-6xl items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className={flip ? "lg:order-2" : ""}>{children}</div>
          <div className={`flex justify-center ${flip ? "lg:order-1 lg:justify-start" : "lg:justify-end"}`}>
            {media}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function NexaPage() {
  return (
    <>
      <EditorialHero
        ariaLabel="neXa restoran yönetim sistemi"
        eyebrow="KERİNTİ / NEXA ÜRÜN"
        headline={
          <>
            Bir sipariş,
            <br />
            tek bir <em>akış.</em>
          </>
        }
        description={
          <>
            Masadan mutfağa, kasadan rapora.
            <br />
            Hepsi aynı sistemde.
          </>
        }
        detail="neXa, restoranların tüm operasyonlarını tek platformda birleştiren, modüler ve ölçeklenebilir bir restoran yönetim sistemidir."
        primary={{ label: "Demo talep edin", href: DEMO_HREF }}
        secondary={{ label: "Modülleri inceleyin", href: "/moduller" }}
        aside={{
          lead: "Hangi modüllerle başlayacağınızı birlikte seçelim.",
          label: "İşletmenize uygun kurguyu bulun",
          href: "/cozumler",
        }}
        stageLabel="NEXA / SİPARİŞ AKIŞI"
        stage={<OrderFlowBoard />}
        caption={
          <>
            Tek sipariş, <em>dört durak.</em>
          </>
        }
        stageDescription="Örnek bir siparişin QR menü, kasa, mutfak ve rapor adımlarından geçişini gösteren animasyon."
        linksLabel="Öne çıkan neXa modülleri"
        links={[
          { label: "QR Menü ve Sipariş", href: "/moduller#qr-menu" },
          { label: "Kasa (POS)", href: "/moduller#kasa-pos" },
          { label: "Raporlama", href: "/moduller#raporlama" },
        ]}
        footer={{
          left: "KERİNTİ YAZILIM / NEXA",
          scrollHref: "#akis-baslik",
          scrollLabel: "Siparişin yolculuğunu inceleyin",
          right: "SİPARİŞTEN RAPORA.",
        }}
      />

      <section aria-labelledby="akis-baslik" className="bg-surface py-14 lg:py-16">
        <Container>
          <SectionHeader
            id="akis-baslik"
            title="Siparişten rapora, tek akış"
            lead="Bir sipariş neXa'da masadan mutfağa, oradan yönetim paneline kesintisiz ilerler."
          />
          <div className="mt-8 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <Steps steps={FLOW} />
          </div>
        </Container>
      </section>

      <section aria-label="neXa modülleri yakından">
        <FeatureRow tinted media={<PhoneScreenshot width={290} />}>
          <FeatureCopy module={QR} eyebrow="Misafir tarafı" />
        </FeatureRow>
        <FeatureRow flip media={<ScreenshotFrame shot="pos" maxWidth={640} />}>
          <FeatureCopy module={POS} eyebrow="Salon ve kasa" />
        </FeatureRow>
        <FeatureRow tinted media={<ScreenshotFrame shot="kitchen" maxWidth={640} />}>
          <FeatureCopy module={KITCHEN} eyebrow="Mutfak" />
        </FeatureRow>
        <FeatureRow flip media={<ScreenshotFrame shot="dashboard" maxWidth={640} />}>
          <FeatureCopy module={REPORTS} eyebrow="Yönetim" />
        </FeatureRow>
      </section>

      <section aria-labelledby="diger-baslik" className="bg-surface py-14 lg:py-16">
        <Container>
          <SectionHeader
            id="diger-baslik"
            title="İşletmenizi tamamlayan modüller"
            lead="İhtiyacınız olan modüllerle başlayın, işletmeniz büyüdükçe genişletin."
            action={<ArrowLink href="/moduller">Tüm Modüller</ArrowLink>}
          />
          <div className="mt-8">
            <ModuleGrid modules={OTHER_MODULES} columns="compact" moreHref="/moduller" />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
