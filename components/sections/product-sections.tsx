import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { NexaMark } from "@/components/ui/nexa-mark";
import { NexusMark } from "@/components/ui/nexus-mark";
import { Container } from "@/components/ui/primitives";
import { PhoneScreenshot, ScreenshotFrame } from "@/components/ui/screenshot";
import { NexusWorkspaceBoard } from "@/components/stages/nexus-workspace-board";
import { COMPARISON, DIFFERENCE, PRODUCTS, type Product, type ProductSlug } from "@/lib/content/products";
import { CONTACT_FORM_HREF, DEMO_HREF } from "@/lib/site";

/**
 * Sections for the redesigned homepage and product pages.
 *
 * Each product carries its own accent (see the neXa / nexus tokens in
 * app/globals.css). Tailwind only generates classes it can see as literals,
 * so the per-product class sets live in the ACCENT map below instead of
 * being assembled from strings.
 */

export const ACCENT: Record<
  ProductSlug,
  { text: string; soft: string; button: string; ring: string; rule: string; glow: string; Mark: typeof NexaMark }
> = {
  nexa: {
    text: "text-nexa",
    soft: "bg-nexa-soft",
    button: "bg-nexa-fill text-white hover:bg-nexa-fill-strong focus-visible:outline-nexa",
    ring: "hover:border-nexa/40",
    rule: "bg-nexa",
    glow: "var(--k-glow-nexa)",
    Mark: NexaMark,
  },
  nexus: {
    text: "text-nexus",
    soft: "bg-nexus-soft",
    button: "bg-nexus-fill text-white hover:bg-nexus-fill-strong focus-visible:outline-nexus",
    ring: "hover:border-nexus/40",
    rule: "bg-nexus",
    glow: "var(--k-glow-nexus)",
    Mark: NexusMark,
  },
};

export function Eyebrow({ children, rule = "bg-red", className = "text-ink-2" }: { children: React.ReactNode; rule?: string; className?: string }) {
  return (
    <p className={`flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em] ${className}`}>
      <span aria-hidden="true" className={`h-0.5 w-6 ${rule}`} />
      {children}
    </p>
  );
}

export function SectionTitle({ id, eyebrow, title, lead, center = false }: { id: string; eyebrow: string; title: string; lead?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center [&>p:first-child]:justify-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-4 text-balance text-[clamp(1.875rem,3vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-ink">
        {title}
      </h2>
      {lead && <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-2">{lead}</p>}
    </div>
  );
}

/** Product UI for a showcase. neXa uses real captures; nexus is drawn in code. */
export function ProductVisual({ slug }: { slug: ProductSlug }) {
  if (slug === "nexus") {
    return (
      <div className="w-full max-w-[640px]">
        <NexusWorkspaceBoard />
      </div>
    );
  }
  // Dashboard capture is 1442px wide → safe to 721 CSS px; capped at 600.
  // Phone capture is 941px wide → safe to 470; rendered at 150.
  return (
    <div className="relative w-full max-w-[640px] pb-10 pr-6 sm:pr-10">
      <ScreenshotFrame shot="dashboard" maxWidth={600} />
      <div className="absolute -bottom-2 right-0 w-[26%] min-w-24 max-w-[150px]">
        <PhoneScreenshot width={150} />
      </div>
    </div>
  );
}

function ButtonPair({ product }: { product: Product }) {
  const a = ACCENT[product.slug];
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link
        href={product.href}
        className={`inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-5 py-3 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${a.button}`}
      >
        {product.nameAcc} İnceleyin
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
      <Link
        href={CONTACT_FORM_HREF}
        className="inline-flex items-center rounded-[var(--radius-sm)] border border-line-2 px-5 py-3 font-semibold text-ink transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        Bize Ulaşın
      </Link>
    </div>
  );
}

/** One product in its own accent: copy + features on one side, UI on the other. */
export function ProductShowcase({ slug, flip = false, tinted = false }: { slug: ProductSlug; flip?: boolean; tinted?: boolean }) {
  const product = PRODUCTS[slug];
  const a = ACCENT[slug];
  const headingId = `urun-${slug}-baslik`;
  return (
    <section
      id={slug}
      aria-labelledby={headingId}
      className={`relative isolate overflow-hidden py-20 lg:py-28 ${tinted ? "bg-surface-2" : "bg-surface"}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: `radial-gradient(40% 60% at ${flip ? "15%" : "85%"} 40%, ${a.glow}, transparent 70%)` }}
      />
      <Container width="page" className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={flip ? "lg:order-2" : ""}>
          <a.Mark size={30} title={product.name} />
          <p className={`mt-6 text-sm font-bold uppercase tracking-[0.14em] ${a.text}`}>{product.category}</p>
          <h2 id={headingId} className="mt-3 text-balance text-[clamp(1.875rem,3vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-ink">
            {product.headline[0]} <span className={a.text}>{product.headline[1]}</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">{product.lead}</p>
          <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {product.features.slice(0, 4).map((f) => (
              <li key={f.title} className="flex gap-3">
                <span aria-hidden="true" className={`flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] ${a.soft} ${a.text}`}>
                  <f.icon className="size-[18px]" strokeWidth={2} />
                </span>
                <span>
                  <span className="block font-semibold text-ink">{f.title}</span>
                  <span className="block text-sm leading-relaxed text-ink-2">{f.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <ButtonPair product={product} />
        </div>
        <div className={`flex justify-center ${flip ? "lg:order-1 lg:justify-start" : "lg:justify-end"}`}>
          <ProductVisual slug={slug} />
        </div>
      </Container>
    </section>
  );
}

/** "Bizim Farkımız": anla / geliştir / devreye al. */
export function DifferenceBlock() {
  return (
    <section aria-labelledby="fark-baslik" className="bg-surface py-20 lg:py-28">
      <Container width="page">
        <SectionTitle id="fark-baslik" eyebrow={DIFFERENCE.eyebrow} title={DIFFERENCE.title} lead={DIFFERENCE.lead} />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {DIFFERENCE.steps.map((s, i) => (
            <li key={s.title} className="group relative rounded-[var(--radius-lg)] border border-line bg-surface p-7 transition-colors hover:border-red/30">
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-red-soft text-red">
                  <s.icon className="size-5" strokeWidth={2} />
                </span>
                <span aria-hidden="true" className="text-4xl font-extrabold tracking-tight text-line-2">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Side-by-side product cards, each with "Keşfet" and "Demo Talep Et". */
export function ProductComparison({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <section id="programlar" aria-labelledby="programlar-baslik" className="bg-surface-2 py-20 lg:py-28">
      <Container width="page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center text-ink-2">{COMPARISON.eyebrow}</Eyebrow>
          <Heading id="programlar-baslik" className="mt-4 text-balance text-[clamp(1.875rem,3vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-ink">
            {COMPARISON.title}
          </Heading>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">{COMPARISON.lead}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {(["nexa", "nexus"] as const).map((slug) => {
            const p = PRODUCTS[slug];
            const a = ACCENT[slug];
            return (
              <article key={slug} className={`flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-7 transition-colors sm:p-9 ${a.ring}`}>
                <div aria-hidden="true" className={`-mx-7 -mt-7 mb-7 h-1 rounded-t-[var(--radius-lg)] sm:-mx-9 sm:-mt-9 ${a.rule}`} />
                <a.Mark size={30} title={p.name} />
                <p className={`mt-5 text-sm font-bold uppercase tracking-[0.14em] ${a.text}`}>{p.category}</p>
                <h3 className="mt-2 text-2xl font-extrabold leading-snug tracking-tight text-ink">
                  {p.headline[0]}, {p.headline[1]}
                </h3>
                <ul className="mt-6 space-y-3">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-ink-2">
                      <Check aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${a.text}`} strokeWidth={2.5} />
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-line pt-5 text-sm text-ink-3">
                  <span className="font-semibold text-ink-2">Kimler için:</span> {p.idealFor}
                </p>
                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  <Link
                    href={p.href}
                    className={`inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-5 py-3 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${a.button}`}
                  >
                    {p.nameAcc} Keşfedin
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                  <Link
                    href={DEMO_HREF}
                    className="inline-flex items-center rounded-[var(--radius-sm)] border border-line-2 px-5 py-3 font-semibold text-ink transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    Demo Talep Et
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** All features of one product as a grid (product pages). */
export function FeatureGrid({ slug }: { slug: ProductSlug }) {
  const p = PRODUCTS[slug];
  const a = ACCENT[slug];
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {p.features.map((f) => (
        <li key={f.title} className="rounded-[var(--radius-lg)] border border-line bg-surface p-6">
          <span aria-hidden="true" className={`flex size-11 items-center justify-center rounded-[var(--radius-md)] ${a.soft} ${a.text}`}>
            <f.icon className="size-5" strokeWidth={2} />
          </span>
          <h3 className="mt-5 text-lg font-bold text-ink">{f.title}</h3>
          <p className="mt-1.5 leading-relaxed text-ink-2">{f.text}</p>
        </li>
      ))}
    </ul>
  );
}
