import type { Metadata } from "next";
import { Check, ChefHat, ChartColumn, QrCode, ReceiptText } from "lucide-react";
import { EditorialHero } from "@/components/layout/editorial-hero";
import { OrderFlowBoard } from "@/components/stages/order-flow-board";
import { CtaBand } from "@/components/sections/cta-band";
import { ModuleDetailCard } from "@/components/sections/module-grid";
import { Steps } from "@/components/sections/steps";
import { Container, SectionHeader } from "@/components/ui/primitives";
import { PhoneScreenshot, ScreenshotFrame } from "@/components/ui/screenshot";
import type { Step } from "@/lib/content/company";
import { modules, modulesBySlug, type Module } from "@/lib/content/modules";
import type { L } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { CONTACT_FORM_HREF, DEMO_HREF } from "@/lib/site";

/**
 * neXa sys program page: editorial hero with the order-flow stage → one
 * order's path → the four main modules with real screenshots → every other
 * module. Module copy comes from lib/content/modules.ts.
 */

type Copy = {
  metaTitle: string;
  metaDescription: string;
  aria: string;
  eyebrow: string;
  headline: [string, string, string];
  description: [string, string];
  primary: string;
  secondary: string;
  asideLead: string;
  asideLabel: string;
  stageLabel: string;
  caption: [string, string];
  stageDescription: string;
  linksLabel: string;
  footer: { left: string; scroll: string; right: string };
  flowTitle: [string, string];
  flowLead: string;
  flow: Step[];
  rowsLabel: string;
  eyebrows: [string, string, string, string];
  otherTitle: [string, string, string];
  otherLead: string;
  allLabel: string;
};

const T: L<Copy> = {
  tr: {
    metaTitle: "neXa sys — Sipariş Yönetim Sistemi",
    metaDescription: "neXa sys; QR menü, kasa, mutfak ekranı ve raporlamayı tek sistemde birleştiren modüler sipariş yönetim sistemi.",
    aria: "neXa sys sipariş yönetim sistemi",
    eyebrow: "KERİNTİ / NEXA SYS",
    headline: ["Bir sipariş,", "tek bir", "akış."],
    description: ["Masadan mutfağa, kasadan rapora.", "Hepsi aynı sistemde."],
    primary: "Demo talep edin",
    secondary: "Modülleri inceleyin",
    asideLead: "Hangi modüllerle başlayacağınızı birlikte seçelim.",
    asideLabel: "Bize ulaşın",
    stageLabel: "NEXA SYS / SİPARİŞ AKIŞI",
    caption: ["Tek sipariş,", "dört durak."],
    stageDescription: "Örnek bir siparişin QR menü, kasa, mutfak ve rapor adımlarından geçişini gösteren animasyon.",
    linksLabel: "Öne çıkan neXa sys modülleri",
    footer: { left: "KERİNTİ YAZILIM / NEXA SYS", scroll: "Siparişin yolculuğunu inceleyin", right: "SİPARİŞTEN RAPORA." },
    flowTitle: ["Siparişten rapora,", "tek akış."],
    flowLead: "Bir sipariş neXa sys'te masadan mutfağa, oradan yönetim paneline kesintisiz ilerler.",
    flow: [
      { title: "Sipariş", text: "Misafir QR menüden ya da garson kasadan siparişi oluşturur.", icon: QrCode },
      { title: "Kasa", text: "Sipariş masaya işlenir, adisyon hazır olur.", icon: ReceiptText },
      { title: "Mutfak", text: "Sipariş mutfak ekranına düşer, hazırlık durumu takip edilir.", icon: ChefHat },
      { title: "Rapor", text: "Her satış yönetim paneline yansır.", icon: ChartColumn },
    ],
    rowsLabel: "neXa sys modülleri yakından",
    eyebrows: ["Misafir tarafı", "Salon ve kasa", "Mutfak", "Yönetim"],
    otherTitle: ["İşletmenizi", "tamamlayan", "modüller"],
    otherLead: "İhtiyacınız olan modüllerle başlayın, işletmeniz büyüdükçe genişletin.",
    allLabel: "Tüm neXa sys modülleri",
  },
  en: {
    metaTitle: "neXa sys — Order Management System",
    metaDescription: "neXa sys is a modular order management system that brings the QR menu, till, kitchen display and reporting into one system.",
    aria: "neXa sys order management system",
    eyebrow: "KERINTI / NEXA SYS",
    headline: ["One order,", "one", "flow."],
    description: ["Table to kitchen, till to report.", "All in the same system."],
    primary: "Request a demo",
    secondary: "See the modules",
    asideLead: "Let’s pick the modules you start with together.",
    asideLabel: "Contact us",
    stageLabel: "NEXA SYS / ORDER FLOW",
    caption: ["One order,", "four stops."],
    stageDescription: "Animation showing an example order passing through the QR menu, till, kitchen and report steps.",
    linksLabel: "Featured neXa sys modules",
    footer: { left: "KERINTI SOFTWARE / NEXA SYS", scroll: "Follow an order's journey", right: "FROM ORDER TO REPORT." },
    flowTitle: ["From order to report,", "one flow."],
    flowLead: "In neXa sys an order moves from the table to the kitchen and on to the management panel without breaks.",
    flow: [
      { title: "Order", text: "The guest orders from the QR menu, or the waiter at the till.", icon: QrCode },
      { title: "Till", text: "The order is added to the table and the bill is ready.", icon: ReceiptText },
      { title: "Kitchen", text: "The order lands on the kitchen display and preparation is tracked.", icon: ChefHat },
      { title: "Report", text: "Every sale shows up on the management panel.", icon: ChartColumn },
    ],
    rowsLabel: "neXa sys modules up close",
    eyebrows: ["Guest side", "Floor and till", "Kitchen", "Management"],
    otherTitle: ["Modules that", "complete", "your business"],
    otherLead: "Start with the modules you need and extend as your business grows.",
    allLabel: "All neXa sys modules",
  },
};

/** Text column for a feature row, driven by the module catalogue. */
function FeatureCopy({ module, eyebrow }: { module: Module; eyebrow: string }) {
  const Icon = module.icon;
  return (
    <div className="max-w-xl">
      <p className="flex items-center gap-2 text-sm font-semibold text-red">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
        {eyebrow}
      </p>
      <h3 className="mt-3 text-[clamp(1.5rem,2vw,2rem)] font-bold leading-tight tracking-tight text-ink">{module.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink-2 lg:text-[1.0625rem]">{module.description}</p>
      <ul className="mt-5 space-y-2.5">
        {module.points.map((p) => (
          <li key={p} className="flex gap-3 text-[0.9375rem] text-ink-2">
            <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-red" strokeWidth={2.5} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureRow({
  id,
  children,
  media,
  flip = false,
  tinted = false,
}: {
  id: string;
  children: React.ReactNode;
  media: React.ReactNode;
  flip?: boolean;
  tinted?: boolean;
}) {
  return (
    <div id={id} className={`scroll-mt-[var(--header-h)] ${tinted ? "bg-surface-2" : "bg-surface"}`}>
      <Container>
        {/* Capped narrower than the page: at 1920 a full-width row put the
            screenshot and its copy ~200px apart with nothing between. */}
        <div className="mx-auto grid max-w-6xl items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
          <div className={flip ? "lg:order-2" : ""}>{children}</div>
          <div className={`flex justify-center ${flip ? "lg:order-1 lg:justify-start" : "lg:justify-end"}`}>{media}</div>
        </div>
      </Container>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = T[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function NexaPage() {
  const locale = await getLocale();
  const t = T[locale];
  const [QR, POS, KITCHEN, REPORTS] = modulesBySlug(["qr-menu", "kasa-pos", "mutfak-ekrani", "raporlama"], locale);
  const other = modulesBySlug(["masa-yonetimi", "rezervasyon", "stok-depo", "cari-takip", "e-fatura", "vardiya", "caller-id"], locale);

  return (
    <>
      <EditorialHero
        ariaLabel={t.aria}
        eyebrow={t.eyebrow}
        headline={
          <>
            {t.headline[0]}
            <br />
            {t.headline[1]} <em>{t.headline[2]}</em>
          </>
        }
        description={
          <>
            {t.description[0]}
            <br />
            {t.description[1]}
          </>
        }
        primary={{ label: t.primary, href: DEMO_HREF }}
        secondary={{ label: t.secondary, href: "#moduller" }}
        aside={{ lead: t.asideLead, label: t.asideLabel, href: CONTACT_FORM_HREF }}
        stageLabel={t.stageLabel}
        stage={<OrderFlowBoard />}
        caption={
          <>
            {t.caption[0]} <em>{t.caption[1]}</em>
          </>
        }
        stageDescription={t.stageDescription}
        linksLabel={t.linksLabel}
        links={[
          { label: QR.title, href: "#qr-menu" },
          { label: POS.title, href: "#kasa-pos" },
          { label: REPORTS.title, href: "#raporlama" },
        ]}
        footer={{ left: t.footer.left, scrollHref: "#akis-baslik", scrollLabel: t.footer.scroll, right: t.footer.right }}
      />

      <section aria-labelledby="akis-baslik" className="bg-surface py-12 lg:py-16">
        <Container>
          <SectionHeader
            id="akis-baslik"
            title={
              <>
                {t.flowTitle[0]} <em>{t.flowTitle[1]}</em>
              </>
            }
            lead={t.flowLead}
          />
          <div className="mt-8 rounded-2xl border border-line p-6 sm:p-8">
            <Steps steps={t.flow} />
          </div>
        </Container>
      </section>

      <section aria-label={t.rowsLabel}>
        <FeatureRow id={QR.slug} tinted media={<PhoneScreenshot width={290} />}>
          <FeatureCopy module={QR} eyebrow={t.eyebrows[0]} />
        </FeatureRow>
        <FeatureRow id={POS.slug} flip media={<ScreenshotFrame shot="pos" maxWidth={640} />}>
          <FeatureCopy module={POS} eyebrow={t.eyebrows[1]} />
        </FeatureRow>
        <FeatureRow id={KITCHEN.slug} tinted media={<ScreenshotFrame shot="kitchen" maxWidth={640} />}>
          <FeatureCopy module={KITCHEN} eyebrow={t.eyebrows[2]} />
        </FeatureRow>
        <FeatureRow id={REPORTS.slug} flip media={<ScreenshotFrame shot="dashboard" maxWidth={640} />}>
          <FeatureCopy module={REPORTS} eyebrow={t.eyebrows[3]} />
        </FeatureRow>
      </section>

      <section id="moduller" aria-labelledby="diger-baslik" className="scroll-mt-[var(--header-h)] bg-surface py-12 lg:py-16">
        <Container>
          <SectionHeader
            id="diger-baslik"
            title={
              <>
                {t.otherTitle[0]} <em>{t.otherTitle[1]}</em> {t.otherTitle[2]}
              </>
            }
            lead={t.otherLead}
          />
          <nav aria-label={t.allLabel} className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {modules(locale).map((m) => (
                <li key={m.slug}>
                  <a
                    href={`#${m.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-2 transition-colors hover:border-red hover:text-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <m.icon aria-hidden="true" className="size-3.5" strokeWidth={2} />
                    {m.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {other.map((m) => (
              <ModuleDetailCard key={m.slug} module={m} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
