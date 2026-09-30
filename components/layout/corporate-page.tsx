import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/layout/page-intro";
import { CtaBand } from "@/components/sections/cta-band";
import { Container, SectionHeader } from "@/components/ui/primitives";
import { CORPORATE_PAGES, type CorporatePage } from "@/lib/content/corporate";
import type { L } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const ABOUT: L<{ href: string; label: string; lead: string }> = {
  tr: { href: "/hakkimizda", label: "Hakkımızda", lead: "Biz kimiz, ne geliştiriyoruz." },
  en: { href: "/hakkimizda", label: "About us", lead: "Who we are, what we build." },
};

/**
 * Shared layout for the Kurumsal pages (Misyonumuz, Vizyonumuz,
 * Sürdürülebilirlik), in the plain corporate style: compact intro, the
 * statement set large and upright, a row of pillars, then links to the
 * sibling pages and the shared call to action.
 */
export async function CorporatePageView({ page }: { page: L<CorporatePage> }) {
  const locale = await getLocale();
  const p = page[locale];
  const siblings = [ABOUT[locale], ...CORPORATE_PAGES[locale]].filter((s) => s.href !== p.href);

  return (
    <>
      <PageIntro
        eyebrow={p.eyebrow}
        title={
          <>
            {p.title[0]} <em>{p.title[1]}</em>
          </>
        }
        lead={p.lead}
      />

      <section aria-label={p.label} className="py-12 lg:py-16">
        <Container>
          <p
            data-reveal
            className="max-w-4xl border-l-2 border-red pl-6 text-balance text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.25] tracking-[-0.025em] text-ink sm:pl-8"
          >
            {p.statement}
          </p>
        </Container>
      </section>

      <section aria-labelledby="dayanaklar" className="border-y border-line bg-surface-2 py-12 lg:py-16">
        <Container>
          <SectionHeader id="dayanaklar" title={p.pillarsTitle} />
          <ul
            data-reveal-group
            className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          >
            {p.pillars.map((pillar) => (
              <li key={pillar.title} className="bg-surface p-6 sm:p-7">
                <span className="flex size-10 items-center justify-center rounded-xl bg-red-soft text-red">
                  <pillar.icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{pillar.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <nav aria-label={locale === "en" ? "Company pages" : "Kurumsal sayfalar"} className="pb-4 pt-12 lg:pt-16">
        <Container>
          <ul className="grid gap-3 sm:grid-cols-3">
            {siblings.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex h-full items-center justify-between gap-4 rounded-[var(--radius-md)] border border-line p-5 transition-colors hover:border-line-2 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <span>
                    <span className="block font-semibold text-ink">{s.label}</span>
                    <span className="mt-0.5 block text-sm text-ink-3">{s.lead}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-ink-3 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-red" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <CtaBand />
    </>
  );
}
