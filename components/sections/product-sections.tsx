import { Container } from "@/components/ui/primitives";
import { DIFFERENCE, PRODUCTS, type ProductSlug } from "@/lib/content/products";
import { getLocale } from "@/lib/i18n-server";
import { ACCENT, SectionTitle } from "./product-accent";

/**
 * Server sections for the homepage and product pages: "Yaklaşımımız" and the
 * feature grid. Shared accents and the section title live in product-accent.
 */

/**
 * Anla / geliştir / devreye al, as one line of work rather than three
 * cards: the title on the left, a single rule to its right. Each step sits
 * on the rule as its own icon; above its title a short "when" label (önce /
 * ardından / sonrasında da) says where it falls. Once the list is in view
 * the red line draws across in a loop with a dot at its tip, and each icon
 * turns from grey to red as the line reaches it (.k-flow-* in globals.css).
 * Below md the rule turns vertical and the steps stack beside it.
 */
export async function DifferenceBlock() {
  const d = DIFFERENCE[await getLocale()];
  return (
    <section aria-labelledby="fark-baslik" data-starfield="0.35" className="py-12 lg:py-16">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
        <SectionTitle
          id="fark-baslik"
          eyebrow={d.eyebrow}
          title={d.title}
          lead={d.lead}
        />

        <ol data-reveal className="k-flow relative grid gap-10 pl-16 md:grid-cols-3 md:gap-8 md:pl-0 md:pt-[4.5rem]">
          {/* The rule: grey track, red fill, travelling dot (through the icon centres). */}
          <span aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-line-2 md:inset-x-6 md:bottom-auto md:left-6 md:top-[23px] md:h-px md:w-auto">
            <span className="k-flow-fill absolute inset-0 bg-red-fill" />
            <span className="k-flow-dot absolute -ml-[3px] -mt-[3px] size-[7px] rounded-full bg-red-fill shadow-[0_0_0_5px_var(--k-glow-red)] md:top-0" />
          </span>

          {d.steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span
                aria-hidden="true"
                className={`k-flow-node k-flow-node-${i} absolute -left-16 top-0 flex size-12 items-center justify-center rounded-2xl bg-surface text-ink-3 ring-1 ring-line-2 md:-top-[4.5rem] md:left-0`}
              >
                <s.icon className="size-5" strokeWidth={1.8} />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-red">{d.when[i]}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink">{s.title}</h3>
              <p className="mt-2 max-w-[30ch] text-[0.9375rem] leading-relaxed text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** All features of one product as a compact grid (product pages). */
export async function FeatureGrid({ slug }: { slug: ProductSlug }) {
  const p = PRODUCTS[await getLocale()][slug];
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
