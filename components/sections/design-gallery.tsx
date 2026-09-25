import { NexusWorkspaceBoard } from "@/components/stages/nexus-workspace-board";
import { PhoneScreenshot, ScreenshotFrame } from "@/components/ui/screenshot";
import { Container } from "@/components/ui/primitives";
import { GALLERY } from "@/lib/content/products";
import { SectionTitle } from "./product-sections";

/**
 * "İşlerimiz" — a compact bento of real product UI.
 *
 * Nothing here is a flattened composite: the neXa tiles are flat captures
 * from /public/images/product rendered well below their 2x-safe width, and
 * the nexus tile is the code-drawn workspace. Titles only; the UI speaks.
 */

type Tile = { title: string; product: "neXa sys" | "nexus"; span: string; body: React.ReactNode };

const TILES: Tile[] = [
  // 1442px source → ≤ 560 CSS px.
  { title: "Yönetim paneli", product: "neXa sys", span: "lg:col-span-7", body: <ScreenshotFrame shot="dashboard" maxWidth={560} /> },
  // 941px source → 180 CSS px.
  { title: "QR menü", product: "neXa sys", span: "lg:col-span-5", body: <PhoneScreenshot width={180} /> },
  { title: "Görev panosu", product: "nexus", span: "lg:col-span-5", body: <div className="w-full max-w-[440px]"><NexusWorkspaceBoard /></div> },
  // 1672px source → ≤ 560 CSS px.
  { title: "Mutfak ekranı", product: "neXa sys", span: "lg:col-span-7", body: <ScreenshotFrame shot="kitchen" maxWidth={560} /> },
];

export function DesignGallery() {
  return (
    <section id="islerimiz" aria-labelledby="galeri-baslik" className="scroll-mt-[calc(var(--header-h)+16px)] py-16 lg:py-24">
      <Container width="page">
        <SectionTitle id="galeri-baslik" eyebrow={GALLERY.eyebrow} title={GALLERY.title} />
        <ul data-reveal-group className="mt-10 grid gap-5 lg:grid-cols-12">
          {TILES.map((t) => (
            <li key={t.title} data-spotlight className={`group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-2 ${t.span}`}>
              <div className="flex flex-1 items-center justify-center p-6 transition-transform duration-500 ease-out group-hover:scale-[1.015] sm:p-8">
                {t.body}
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-line bg-surface px-5 py-3.5">
                <h3 className="text-sm font-semibold text-ink">{t.title}</h3>
                <span className="text-xs font-medium text-ink-3">{t.product}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
