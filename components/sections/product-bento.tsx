"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductScreen, useAutoCycle, type SceneKind } from "@/components/home/product-screens";
import { useLocale } from "@/components/i18n/locale-provider";
import { Container } from "@/components/ui/primitives";
import { ProductLogo } from "@/components/ui/product-logo";
import { COMPARISON, PRODUCTS, type ProductSlug } from "@/lib/content/products";
import type { L } from "@/lib/i18n";
import { ACCENT, SectionTitle } from "./product-accent";

/**
 * The two program cards (/urun). Each card carries a small live window
 * that cycles through that product's screens with the same soft transition
 * as the hero; the tabs in its title bar jump to a screen. The window tilts
 * back a little on hover. The two cards start out of phase so they never
 * change at the same moment.
 *
 * Sizing: the window renders at most ~540 CSS px wide (16:10 box), so the
 * 1442–1672px captures stay ≥ 2x.
 */

const SCREENS: Record<ProductSlug, { kind: SceneKind; label: L<string> }[]> = {
  nexa: [
    { kind: "dashboard", label: { tr: "Panel", en: "Panel" } },
    { kind: "pos", label: { tr: "Kasa", en: "Till" } },
    { kind: "kitchen", label: { tr: "Mutfak", en: "Kitchen" } },
  ],
  nexus: [
    { kind: "nexus-tasks", label: { tr: "Görevler", en: "Tasks" } },
    { kind: "nexus-report", label: { tr: "Raporlar", en: "Reports" } },
  ],
};

const GLOW: Record<ProductSlug, string> = {
  nexa: "radial-gradient(60% 55% at 85% 0%, var(--k-glow-red), transparent 70%)",
  nexus: "radial-gradient(60% 55% at 85% 0%, rgb(120 120 135 / 0.18), transparent 70%)",
};

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function LiveWindow({ slug }: { slug: ProductSlug }) {
  const locale = useLocale();
  const screens = SCREENS[slug];
  const { ref, index, setIndex } = useAutoCycle(screens.length, 4200, false, slug === "nexus" ? 2100 : 0);
  return (
    <div ref={ref} className="[perspective:1400px]">
      <div className="origin-bottom overflow-hidden rounded-xl bg-surface shadow-[0_24px_50px_-28px_rgb(0_0_0/0.45)] ring-1 ring-line transition-transform duration-700 ease-out group-hover:[transform:rotateX(5deg)_translateY(-6px)]">
        <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-3 py-2">
          <span aria-hidden="true" className="flex gap-1">
            <span className="size-2 rounded-full bg-line-2" />
            <span className="size-2 rounded-full bg-line-2" />
            <span className="size-2 rounded-full bg-line-2" />
          </span>
          <div role="group" aria-label={locale === "en" ? `${PRODUCTS.en[slug].name} screens` : `${PRODUCTS.tr[slug].name} ekranları`} className="ml-auto flex gap-1">
            {screens.map((s, i) => (
              <button
                key={s.kind}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${FOCUS} ${
                  i === index ? "bg-surface text-ink shadow-sm ring-1 ring-line" : "text-ink-3 hover:text-ink"
                }`}
              >
                {s.label[locale]}
              </button>
            ))}
          </div>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
          {screens.map((s, i) => (
            <div key={s.kind} data-on={i === index} aria-hidden={i !== index} className="k-scene absolute inset-0 overflow-hidden">
              <ProductScreen kind={s.kind} sizes="(min-width: 1024px) 540px, 90vw" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * One product card: mark and category, headline, the live window, features
 * and the CTA (/urun). The homepage uses the lower ProductShowcase card.
 */
export function ProductCard({ slug }: { slug: ProductSlug }) {
  const locale = useLocale();
  const p = PRODUCTS[locale][slug];
  const a = ACCENT[slug];
  return (
    <article
      id={slug}
      data-spotlight
      className="group relative flex scroll-mt-[calc(var(--header-h)+16px)] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-2 transition-[border-color,box-shadow] duration-500 hover:border-line-2 hover:shadow-[0_30px_70px_-40px_rgb(0_0_0/0.4)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: GLOW[slug] }} />

      <div className="p-7 pb-6 sm:p-8 sm:pb-6">
        <div className="flex items-center justify-between gap-4">
          <ProductLogo product={slug} height={slug === "nexa" ? 34 : 40} />
          <span className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink-2">
            <span aria-hidden="true" className={`size-1.5 rounded-full ${slug === "nexa" ? "bg-red-fill" : "bg-ink"}`} />
            {p.category}
          </span>
        </div>
        <h3 className="mt-6 text-balance text-xl font-bold leading-snug tracking-tight text-ink sm:text-2xl">
          {p.headline[0]} <span className="text-ink-3">{p.headline[1]}</span>
        </h3>
        <p className="mt-2 text-sm text-ink-2">{p.lead}</p>
      </div>

      <div className="px-7 sm:px-8">
        <LiveWindow slug={slug} />
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-3 px-7 pt-7 sm:grid-cols-3 sm:px-8" aria-label={locale === "en" ? `${p.name} features` : `${p.name} özellikleri`}>
        {p.features.map((f, i) => (
          <li
            key={f.title}
            className="flex items-center gap-2.5 text-sm font-medium text-ink-2 transition-transform duration-500 group-hover:translate-x-0.5"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            <span aria-hidden="true" className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${a.soft} ${a.text}`}>
              <f.icon className="size-3.5" strokeWidth={2} />
            </span>
            <span className="leading-tight">{f.title}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-4 p-7 pt-8 sm:p-8">
        <span className="text-xs text-ink-3">{p.idealFor}</span>
        <Link
          href={p.href}
          className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${a.button} ${FOCUS}`}
        >
          {p.cta}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export function ProductBento() {
  const c = COMPARISON[useLocale()];
  return (
    <section id="programlar" aria-labelledby="programlar-baslik" className="scroll-mt-[calc(var(--header-h)+16px)] py-12 lg:py-16">
      <Container>
        <SectionTitle id="programlar-baslik" eyebrow={c.eyebrow} title={c.title} />
        <div data-reveal-group className="mt-10 grid gap-5 lg:grid-cols-2">
          {(["nexa", "nexus"] as const).map((slug) => (
            <ProductCard key={slug} slug={slug} />
          ))}
        </div>
      </Container>
    </section>
  );
}
