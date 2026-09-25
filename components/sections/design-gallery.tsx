import { StageFrame } from "@/components/motion/stage-motion";
import { OrderFlowBoard } from "@/components/stages/order-flow-board";
import { ModuleConsoleBoard } from "@/components/stages/module-console-board";
import { NexusWorkspaceBoard } from "@/components/stages/nexus-workspace-board";
import { PhoneScreenshot, ScreenshotFrame } from "@/components/ui/screenshot";
import { Container } from "@/components/ui/primitives";
import { GALLERY } from "@/lib/content/products";
import { SectionTitle } from "./product-sections";

/**
 * "İşlerimiz / Tasarım Örnekleri" — a gallery built from live product UI.
 *
 * Nothing here is a flattened composite: the neXa tiles are the flat
 * captures from /public/images/product at or below their 2x-safe width, the
 * two stage boards are the existing animated components (inside StageFrame,
 * so each has its pause button), and the nexus tile
 * is the code-drawn workspace. The stage boards were designed on the navy
 * hero ground, so their tiles keep that ground.
 */

type Tile = {
  title: string;
  product: "neXa sys" | "nexus";
  note: string;
  span: string;
  ground: "light" | "dark";
  body: React.ReactNode;
};

const TILES: Tile[] = [
  {
    title: "Yönetim paneli",
    product: "neXa sys",
    note: "Günlük ciro, sipariş dağılımı ve satış grafiği tek bakışta.",
    span: "lg:col-span-7",
    ground: "light",
    // 1442px source; tile content is ≤ 640 CSS px.
    body: <ScreenshotFrame shot="dashboard" maxWidth={640} />,
  },
  {
    title: "QR menü",
    product: "neXa sys",
    note: "Misafirin telefonunda, uygulama indirmeden.",
    span: "lg:col-span-5",
    ground: "light",
    body: <PhoneScreenshot width={220} />,
  },
  {
    title: "Görev panosu",
    product: "nexus",
    note: "Ekiplerin işi, onayları ve tahsilatları aynı ekranda.",
    span: "lg:col-span-5",
    ground: "light",
    body: <NexusWorkspaceBoard />,
  },
  {
    title: "Mutfak ekranı",
    product: "neXa sys",
    note: "Siparişler hazırlık sırasına göre sütunlara akar.",
    span: "lg:col-span-7",
    ground: "light",
    body: <ScreenshotFrame shot="kitchen" maxWidth={640} />,
  },
  {
    title: "Sipariş akışı",
    product: "neXa sys",
    note: "Bir siparişin QR menüden rapora yolculuğu, canlı bileşen olarak.",
    span: "lg:col-span-6",
    ground: "dark",
    body: (
      <StageFrame caption="Tek sipariş, dört durak." description="Örnek bir siparişin QR menü, kasa, mutfak ve rapor adımlarından geçişini gösteren animasyon.">
        <OrderFlowBoard />
      </StageFrame>
    ),
  },
  {
    title: "Modül paneli",
    product: "neXa sys",
    note: "İhtiyacınız olan modülleri seçin, gerisini sonra ekleyin.",
    span: "lg:col-span-6",
    ground: "dark",
    body: (
      <StageFrame caption="Her modül, tek panelde." description="neXa modüllerinin sırayla vurgulandığı ve her birinin özelliklerinin gösterildiği animasyon.">
        <ModuleConsoleBoard />
      </StageFrame>
    ),
  },
];

export function DesignGallery() {
  return (
    <section id="islerimiz" aria-labelledby="galeri-baslik" className="bg-surface py-20 lg:py-28">
      <Container width="page">
        <SectionTitle id="galeri-baslik" eyebrow={GALLERY.eyebrow} title={GALLERY.title} lead={GALLERY.lead} />
        <ul className="mt-12 grid gap-5 lg:grid-cols-12">
          {TILES.map((t) => (
            <li
              key={t.title}
              className={`flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line ${t.span}`}
            >
              <div
                className={`flex flex-1 items-center justify-center p-6 sm:p-8 ${
                  t.ground === "dark" ? "bg-[linear-gradient(160deg,#002f77,#001f52)]" : "bg-surface-2"
                }`}
              >
                {t.body}
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line bg-surface p-5">
                <h3 className="font-bold text-ink">{t.title}</h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    t.product === "nexus" ? "bg-nexus-soft text-nexus" : "bg-nexa-soft text-nexa"
                  }`}
                >
                  {t.product}
                </span>
                <p className="w-full text-sm text-ink-2">{t.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
