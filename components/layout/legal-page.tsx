import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/ui/primitives";
import type { LegalDoc } from "@/lib/content/legal";
import { getLocale } from "@/lib/i18n-server";
import { legalLinks } from "@/lib/site";

/**
 * Shared layout for the legal texts: compact hero, a sticky table of contents
 * from lg up, and the numbered sections in a readable 68ch column. The texts
 * exist in Turkish only; in English a notice says so above them.
 */
export async function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  const locale = await getLocale();
  const en = locale === "en";
  const showDraft = !doc.reviewed && process.env.NODE_ENV !== "production";
  return (
    <>
      <PageIntro eyebrow={en ? "Kerinti / Legal" : "Kerinti / Yasal"} title={doc.title} lead={doc.lead} />
      <Container className="grid gap-12 py-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-14">
        <aside className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <nav aria-label={en ? "Sections" : "Bölümler"} lang="tr">
            <ol className="space-y-2 text-sm">
              {doc.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#bolum-${i + 1}`} className="flex gap-3 text-ink-2 hover:text-ink">
                    <span className="font-mono text-xs text-red">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <ul className="mt-8 space-y-2 border-t border-line pt-6 text-sm">
            {legalLinks(locale).filter((l) => l.href !== path).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-semibold text-ink hover:text-red">
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <article className="max-w-[68ch]" lang="tr">
          {en && (
            <p lang="en" className="mb-8 rounded-[var(--radius-md)] border border-line-2 bg-surface-2 p-4 text-sm text-ink-2">
              This document is available in Turkish only. The Turkish text is the binding version. For questions, write to{" "}
              <a href="mailto:info@kerinti.com.tr" className="font-semibold text-ink underline underline-offset-4">
                info@kerinti.com.tr
              </a>
              .
            </p>
          )}
          {showDraft && (
            <p className="mb-8 rounded-[var(--radius-md)] border border-dashed border-line-2 bg-surface-2 p-4 text-sm text-ink-2">
              Geliştirme önizlemesi: bu metin taslaktır, hukuki incelemeden sonra yayına alınmalıdır.
            </p>
          )}
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-3">Son güncelleme: {doc.updated}</p>
          {doc.sections.map((s, i) => (
            <section key={s.title} id={`bolum-${i + 1}`} className="scroll-mt-[calc(var(--header-h)+24px)] border-b border-line py-8 last:border-0">
              <h2 className="flex items-baseline gap-3 text-xl font-bold tracking-tight text-ink">
                <span className="font-mono text-sm text-red">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-ink-2">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </Container>
    </>
  );
}
