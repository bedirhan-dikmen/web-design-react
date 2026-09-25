import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NexaMark } from "@/components/ui/nexa-mark";
import { NexusMark } from "@/components/ui/nexus-mark";
import { Container } from "@/components/ui/primitives";
import { ScreenshotFrame } from "@/components/ui/screenshot";
import { NexusWorkspaceBoard } from "@/components/stages/nexus-workspace-board";
import { COMPARISON, DIFFERENCE, PRODUCTS, type ProductSlug } from "@/lib/content/products";

/**
 * Sections for the homepage and product pages (minimal pass, 2026-09).
 *
 * Each product carries its own accent (neXa red, nexus graphite; see the
 * tokens in app/globals.css). Tailwind only generates classes it can see as
 * literals, so the per-product class sets live in ACCENT.
 */

export const ACCENT: Record<ProductSlug, { text: string; soft: string; button: string; Mark: typeof NexaMark }> = {
  nexa: {
    text: "text-nexa",
    soft: "bg-nexa-soft",
    button: "bg-nexa-fill text-white hover:bg-nexa-fill-strong",
    Mark: NexaMark,
  },
  nexus: {
    text: "text-nexus",
    soft: "bg-nexus-soft",
    button: "bg-nexus-fill text-white hover:bg-nexus-fill-strong",
    Mark: NexusMark,
  },
};

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function SectionTitle({ id, eyebrow, title, as: Heading = "h2" }: { id: string; eyebrow: string; title: string; as?: "h1" | "h2" }) {
  return (
    <div data-reveal>
      <p className="text-sm font-semibold text-red">{eyebrow}</p>
      <Heading id={id} className="mt-2 text-balance text-[clamp(1.625rem,2.6vw,2.25rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink">
        {title}
      </Heading>
    </div>
  );
}

/** Cropped UI preview for a product card (top of the UI, faded at the bottom). */
function Peek({ slug }: { slug: ProductSlug }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-56 overflow-hidden sm:h-64"
      style={{
        maskImage: "linear-gradient(to bottom, black 55%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent)",
      }}
    >
      <div className="absolute inset-x-6 top-0 transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:inset-x-10">
        {/* Dashboard capture: 1442px source, ≤ 520 CSS px here (≥ 2.7x). */}
        {slug === "nexa" ? <ScreenshotFrame shot="dashboard" maxWidth={520} /> : <NexusWorkspaceBoard />}
      </div>
    </div>
  );
}

/** Two product cards (bento). Doubles as the comparison: tags side by side. */
export function ProductBento({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section id="programlar" aria-labelledby="programlar-baslik" className="scroll-mt-[calc(var(--header-h)+16px)] py-16 lg:py-24">
      <Container width="page">
        <SectionTitle id="programlar-baslik" eyebrow={COMPARISON.eyebrow} title={COMPARISON.title} as={headingAs} />
        <div data-reveal-group className="mt-10 grid gap-5 lg:grid-cols-2">
          {(["nexa", "nexus"] as const).map((slug) => {
            const p = PRODUCTS[slug];
            const a = ACCENT[slug];
            return (
              <article
                key={slug}
                id={slug}
                data-spotlight
                className="group flex scroll-mt-[calc(var(--header-h)+16px)] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-2 transition-colors hover:border-line-2"
              >
                <div className="p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <a.Mark size={26} title={p.name} />
                    <span className="text-xs font-semibold text-ink-3">{p.category}</span>
                  </div>
                  <h3 className="mt-6 text-balance text-xl font-bold leading-snug tracking-tight text-ink sm:text-2xl">
                    {p.headline[0]} <span className="text-ink-3">{p.headline[1]}</span>
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${p.name} özellikleri`}>
                    {p.highlights.map((h) => (
                      <li key={h} className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-2">
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex items-center gap-4">
                    <Link
                      href={p.href}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${a.button} ${FOCUS}`}
                    >
                      {p.nameAcc} İnceleyin
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
                <Peek slug={slug} />
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** Anla / geliştir / devreye al — one compact row. */
export function DifferenceBlock() {
  return (
    <section aria-labelledby="fark-baslik" className="border-y border-line bg-surface-2 py-16 lg:py-20">
      <Container width="page" className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:gap-16">
        <SectionTitle id="fark-baslik" eyebrow={DIFFERENCE.eyebrow} title={DIFFERENCE.title} />
        <ol data-reveal-group className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-3">
          {DIFFERENCE.steps.map((s, i) => (
            <li key={s.title} data-spotlight className="bg-surface p-6">
              <span aria-hidden="true" className="font-mono text-xs font-semibold text-red">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-bold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** All features of one product as a compact grid (product pages). */
export function FeatureGrid({ slug }: { slug: ProductSlug }) {
  const p = PRODUCTS[slug];
  const a = ACCENT[slug];
  return (
    <ul data-reveal-group className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {p.features.map((f) => (
        <li key={f.title} data-spotlight className="flex gap-4 bg-surface p-6">
          <span aria-hidden="true" className={`flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] ${a.soft} ${a.text}`}>
            <f.icon className="size-[18px]" strokeWidth={2} />
          </span>
          <span>
            <span className="block font-semibold text-ink">{f.title}</span>
            <span className="mt-0.5 block text-sm text-ink-2">{f.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
