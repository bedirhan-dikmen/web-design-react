import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { PageIntro } from "@/components/layout/page-intro";
import { CtaBand } from "@/components/sections/cta-band";
import { Steps } from "@/components/sections/steps";
import { ArrowLink, Container, SectionHeader } from "@/components/ui/primitives";
import { ProductLogo } from "@/components/ui/product-logo";
import { APPROACH, REASONS, VALUES } from "@/lib/content/company";
import { PRODUCTS } from "@/lib/content/products";
import type { L } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

/**
 * About page, in the plain corporate style (no animated stage): a compact
 * intro, who we are, the two programs, how we work, values and a short list
 * of reasons. Written to cover both programs and to avoid superlatives; it
 * states no founding date, headcount, customer count, award or
 * certification, because none were supplied.
 */

const T: L<{
  metaDescription: string;
  eyebrow: string;
  title: [string, string];
  lead: string;
  whoTitle: string;
  who: string[];
  whatEyebrow: string;
  whatTitle: string;
  approachTitle: string;
  approachLead: string;
  valuesTitle: string;
  more: string;
  reasonsTitle: string;
}> = {
  tr: {
    metaDescription: "Kerinti Soft; sipariş yönetimi için neXa sys, iş yönetimi için nexus yazılımlarını geliştiren, Giresun Teknopark merkezli bir yazılım şirketidir.",
    eyebrow: "Kurumsal / Hakkımızda",
    title: ["Sahaya yakın bir", "yazılım ekibi."],
    lead: "Sipariş yönetimi için neXa sys'i, iş yönetimi için nexus'u geliştiriyoruz.",
    whoTitle: "Biz kimiz?",
    who: [
      "Kerinti Soft, Giresun Teknopark'ta kurulu bir yazılım şirketidir. İşletmelerin günlük işini kolaylaştıran, pratik ve kullanımı kolay yazılımlar geliştiriyoruz.",
      "Kurulumu, eğitimi ve desteği aynı ekip veriyor; konuştuğunuz ekip, sistemi kuran ekiptir.",
    ],
    whatEyebrow: "Programlarımız",
    whatTitle: "Ne geliştiriyoruz?",
    approachTitle: "Çalışma yaklaşımımız",
    approachLead: "Her projede aynı dört adımla ilerliyoruz.",
    valuesTitle: "Değerlerimiz",
    more: "Devamını okuyun",
    reasonsTitle: "Neden Kerinti?",
  },
  en: {
    metaDescription: "Kerinti Soft is a software company based at Giresun Teknopark that builds neXa sys for order management and nexus for business management.",
    eyebrow: "Company / About us",
    title: ["A software team", "close to the field."],
    lead: "We build neXa sys for order management and nexus for business management.",
    whoTitle: "Who we are",
    who: [
      "Kerinti Soft is a software company based at Giresun Teknopark. We build practical, easy-to-use software that makes everyday business work easier.",
      "The same team handles setup, training and support; the team you talk to is the team that installs the system.",
    ],
    whatEyebrow: "Our programs",
    whatTitle: "What we build",
    approachTitle: "How we work",
    approachLead: "Every project follows the same four steps.",
    valuesTitle: "Our values",
    more: "Read more",
    reasonsTitle: "Why Kerinti?",
  },
};

/** Values that have a page of their own under Kurumsal (by position). */
const VALUE_PAGES = ["/misyon", "/vizyon"];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "en" ? "About us" : "Hakkımızda", description: T[locale].metaDescription };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = T[locale];
  const products = PRODUCTS[locale];

  return (
    <>
      <PageIntro
        eyebrow={t.eyebrow}
        title={
          <>
            {t.title[0]} <em>{t.title[1]}</em>
          </>
        }
        lead={t.lead}
      />

      {/* Who we are */}
      <section aria-labelledby="biz-kimiz" className="py-12 lg:py-16">
        <Container className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:gap-16">
          <SectionHeader id="biz-kimiz" title={t.whoTitle} className="lg:self-start" />
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink-2 lg:text-[1.0625rem]">
            {t.who.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* The two programs */}
      <section aria-labelledby="ne-gelistiriyoruz" className="border-y border-line bg-surface-2 py-12 lg:py-16">
        <Container>
          <SectionHeader id="ne-gelistiriyoruz" eyebrow={t.whatEyebrow} title={t.whatTitle} />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {(["nexa", "nexus"] as const).map((slug) => {
              const p = products[slug];
              return (
                <li key={slug}>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6 transition-colors hover:border-line-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:p-7"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <ProductLogo product={slug} height={slug === "nexa" ? 36 : 42} />
                      <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-2">{p.category}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">
                      {p.headline[0]} {p.headline[1]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      {p.lead} {p.idealFor}.
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink group-hover:text-red">
                      {p.cta}
                      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* How we work */}
      <section aria-labelledby="yaklasim" className="py-12 lg:py-16">
        <Container>
          <SectionHeader id="yaklasim" title={t.approachTitle} lead={t.approachLead} />
          <div className="mt-8 rounded-2xl border border-line p-6 sm:p-8">
            <Steps steps={APPROACH[locale]} />
          </div>
        </Container>
      </section>

      {/* Values */}
      <section aria-labelledby="degerler" className="border-t border-line py-12 lg:py-16">
        <Container>
          <SectionHeader id="degerler" title={t.valuesTitle} />
          <ul className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
            {VALUES[locale].map((v, i) => (
              <li key={v.title} className="flex flex-col bg-surface p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-red-soft text-red">
                  <v.icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{v.text}</p>
                {VALUE_PAGES[i] && (
                  <span className="mt-auto block pt-4">
                    <ArrowLink href={VALUE_PAGES[i]}>{t.more}</ArrowLink>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why Kerinti */}
      <section aria-labelledby="neden" className="pb-4 pt-4 lg:pb-8">
        <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:gap-16">
          <SectionHeader id="neden" title={t.reasonsTitle} className="lg:self-start" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {REASONS[locale].map((r) => (
              <li key={r.title} className="flex gap-3 rounded-xl border border-line p-4">
                <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-red" strokeWidth={2.2} />
                <div>
                  <h3 className="text-[0.9375rem] font-semibold text-ink">{r.title}</h3>
                  <p className="mt-0.5 text-sm text-ink-2">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
