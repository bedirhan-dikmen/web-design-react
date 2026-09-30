import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/primitives";
import { ProductLogo } from "@/components/ui/product-logo";
import { LOGO_RULES, SWATCH_GROUPS } from "@/lib/content/brand";
import type { ProductSlug } from "@/lib/content/products";
import type { L } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  logos: string;
  roles: Record<ProductSlug, string>;
  light: string;
  dark: string;
  colours: string;
  rules: string;
  do: string;
  dont: string;
};

const T: L<Copy> = {
  tr: {
    metaTitle: "Marka Rehberi",
    metaDescription: "neXa sys ve nexus logoları, Kerinti renk paleti ve kullanım kuralları.",
    eyebrow: "Kerinti / Marka",
    title: "İki program, tek bir aile.",
    lead: "neXa sys ve nexus'un resmî logoları, Kerinti renk paleti ve kullanım kuralları.",
    logos: "Logolar",
    roles: { nexa: "Sipariş yönetim sistemi", nexus: "İş yönetim sistemi" },
    light: "Açık zemin",
    dark: "Koyu zemin",
    colours: "Renk paleti",
    rules: "Kullanım kuralları",
    do: "Yapın",
    dont: "Yapmayın",
  },
  en: {
    metaTitle: "Brand guide",
    metaDescription: "neXa sys and nexus logos, the Kerinti colour palette and usage rules.",
    eyebrow: "Kerinti / Brand",
    title: "Two programs, one family.",
    lead: "The official neXa sys and nexus logos, the Kerinti colour palette and usage rules.",
    logos: "Logos",
    roles: { nexa: "Order management system", nexus: "Business management system" },
    light: "Light ground",
    dark: "Dark ground",
    colours: "Colour palette",
    rules: "Usage rules",
    do: "Do",
    dont: "Don’t",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const t = T[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

/**
 * Brand guide: the official program logos (light- and dark-ground versions,
 * from web.kerinti.com.tr), the palette and the usage rules.
 */
export default async function BrandPage() {
  const locale = await getLocale();
  const t = T[locale];

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section aria-labelledby="logolar-baslik" className="py-12 lg:py-16">
        <Container>
          <h2 id="logolar-baslik" className="text-3xl font-extrabold tracking-tight text-ink">
            {t.logos}
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {(["nexa", "nexus"] as const).map((slug) => (
              <article key={slug} className="rounded-[var(--radius-lg)] border border-line p-6 sm:p-8">
                <h3 className="text-xl font-bold text-ink">{slug === "nexa" ? "neXa sys" : "nexus"}</h3>
                <p className="text-sm font-medium text-ink-3">{t.roles[slug]}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  <li>
                    <div className="flex h-40 items-center justify-center rounded-[var(--radius-md)] border border-line bg-white">
                      <ProductLogo product={slug} height={slug === "nexa" ? 64 : 76} ground="light" />
                    </div>
                    <p className="mt-1.5 text-xs font-medium text-ink-3">{t.light}</p>
                  </li>
                  <li>
                    <div className="flex h-40 items-center justify-center rounded-[var(--radius-md)] bg-[#111116]">
                      <ProductLogo product={slug} height={slug === "nexa" ? 64 : 76} ground="dark" />
                    </div>
                    <p className="mt-1.5 text-xs font-medium text-ink-3">{t.dark}</p>
                  </li>
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="renk-baslik" className="bg-surface-2 py-12 lg:py-16">
        <Container>
          <h2 id="renk-baslik" className="text-3xl font-extrabold tracking-tight text-ink">
            {t.colours}
          </h2>
          <div className="mt-8 space-y-12">
            {SWATCH_GROUPS[locale].map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-bold text-ink">{group.title}</h3>
                <p className="mt-1 text-ink-2">{group.lead}</p>
                <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {group.swatches.map((s) => (
                    <li key={s.token} className="overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface">
                      <div aria-hidden="true" className="h-20" style={{ background: s.hex }} />
                      <div className="p-3">
                        <p className="text-sm font-semibold text-ink">{s.name}</p>
                        <p className="font-mono text-xs text-ink-2">{s.hex}</p>
                        <p className="mt-1 text-xs text-ink-3">
                          <code>--color-{s.token}</code>
                        </p>
                        <p className="mt-1 text-xs text-ink-3">{s.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="kural-baslik" className="py-12 lg:py-16">
        <Container>
          <h2 id="kural-baslik" className="text-3xl font-extrabold tracking-tight text-ink">
            {t.rules}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-line p-6">
              <h3 className="flex items-center gap-2 font-bold text-success">
                <Check aria-hidden="true" className="size-5" /> {t.do}
              </h3>
              <ul className="mt-4 space-y-3 text-ink-2">
                {LOGO_RULES[locale].do.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-line p-6">
              <h3 className="flex items-center gap-2 font-bold text-danger">
                <X aria-hidden="true" className="size-5" /> {t.dont}
              </h3>
              <ul className="mt-4 space-y-3 text-ink-2">
                {LOGO_RULES[locale].dont.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
