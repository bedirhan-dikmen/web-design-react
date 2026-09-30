import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LiveWindow } from "@/components/sections/product-bento";
import { ACCENT } from "@/components/sections/product-accent";
import { Container } from "@/components/ui/primitives";
import { ProductLogo } from "@/components/ui/product-logo";
import { PRODUCTS, type ProductSlug } from "@/lib/content/products";
import { getLocale } from "@/lib/i18n-server";
import { DEMO_HREF } from "@/lib/site";
import { BrandX } from "./brand-x";

/**
 * One product on the homepage, on two equal columns:
 *
 *   neXa:  X ⟩ [ heading ][ card ]
 *   nexus:     [ card ][ heading ] ⟨ X
 *
 * so one product's card takes exactly the column the other's heading takes
 * (same start, same width), and the pair reads as a mirrored, proportional
 * composition. The gutters widen where needed so the X never sits under
 * the copy. Each section is half a desktop
 * screen (header included), so neXa and nexus fill one screen together.
 *
 * The card is kept low: official logo on top, then the live window beside
 * the feature list. Below lg the X moves to the top corner and the heading
 * stacks above the card.
 *
 * Sizing: the live window renders at most ~360 CSS px wide, so the
 * 1442–1672px captures stay above 4x.
 */

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const GLOW: Record<ProductSlug, string> = {
  nexa: "radial-gradient(60% 70% at 100% 0%, var(--k-glow-red), transparent 70%)",
  nexus: "radial-gradient(60% 70% at 0% 0%, rgb(120 120 135 / 0.16), transparent 70%)",
};

export async function ProductShowcase({ product, side, index }: { product: ProductSlug; side: "left" | "right"; index: number }) {
  const locale = await getLocale();
  const en = locale === "en";
  const p = PRODUCTS[locale][product];
  const a = ACCENT[product];
  const titleId = `${product}-baslik`;
  const xLeft = side === "left";

  return (
    <section
      aria-labelledby={titleId}
      className="relative isolate overflow-hidden pb-8 pt-40 sm:pt-44 lg:flex lg:min-h-[calc(50svh-var(--header-h)/2)] lg:items-center lg:py-4"
    >
      <BrandX product={product} side={side} />
      {/* .k-showcase-gutter widens the gutters where the X would otherwise
          reach the content (globals.css). */}
      <Container className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12 k-showcase-gutter">
        <div
          data-reveal
          className={`flex flex-col ${xLeft ? "" : "lg:col-start-2 lg:row-start-1"}`}
        >
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink-2">
            <span aria-hidden="true" className={`h-0.5 w-5 ${product === "nexa" ? "bg-red" : "bg-ink"}`} />
            <span className="font-mono text-ink-3">0{index}</span>
            {p.category}
          </p>
          <h3 id={titleId} className="mt-4 text-balance text-[clamp(1.75rem,3vw,2.625rem)] font-bold leading-[1.08] tracking-[-0.035em] text-ink">
            {p.headline[0]} <em>{p.headline[1]}</em>
          </h3>
          <p className="mt-3 text-pretty text-base leading-relaxed text-ink-2">
            {p.lead} <span className="text-ink-3">{p.idealFor}.</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={p.href}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${a.button} ${FOCUS}`}
            >
              {p.cta}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href={DEMO_HREF}
              className={`inline-flex items-center rounded-full border border-line-2 bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink-3 ${FOCUS}`}
            >
              {en ? "Request a demo" : "Demo Talep Et"}
            </Link>
          </div>
        </div>

        <article
          id={product}
          data-reveal
          data-spotlight
          aria-label={en ? `${p.name} screens and features` : `${p.name} ekranları ve özellikleri`}
          className={`group relative scroll-mt-[calc(var(--header-h)+16px)] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface-2 p-5 transition-[border-color,box-shadow] duration-500 hover:border-line-2 hover:shadow-[0_30px_70px_-40px_rgb(0_0_0/0.4)] ${
            xLeft ? "" : "lg:col-start-1 lg:row-start-1"
          }`}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: GLOW[product] }} />

          <div className="mb-4 flex items-center justify-between gap-4">
            <ProductLogo product={product} height={product === "nexa" ? 36 : 42} />
            <span className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink-2">
              <span aria-hidden="true" className={`size-1.5 rounded-full ${product === "nexa" ? "bg-red-fill" : "bg-ink"}`} />
              {p.category}
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,10rem)] sm:items-center">
            <LiveWindow slug={product} />
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1" aria-label={en ? `${p.name} features` : `${p.name} özellikleri`}>
              {p.features.map((f, i) => (
                <li
                  key={f.title}
                  className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink-2 transition-transform duration-500 group-hover:translate-x-0.5"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <span aria-hidden="true" className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${a.soft} ${a.text}`}>
                    <f.icon className="size-3.5" strokeWidth={2} />
                  </span>
                  <span className="leading-tight">{f.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Container>
    </section>
  );
}
