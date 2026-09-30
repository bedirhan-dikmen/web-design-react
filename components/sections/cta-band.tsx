import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import type { L } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { CONTACT_FORM_HREF, DEMO_HREF } from "@/lib/site";

const T: L<{ title: [string, string, string]; demo: string; contact: string }> = {
  tr: { title: ["İşinizin akışını", "birlikte", "kuralım."], demo: "Demo Talep Et", contact: "Bize Ulaşın" },
  en: { title: ["Let’s build your", "workflow", "together."], demo: "Request a demo", contact: "Contact us" },
};

/**
 * Closing call to action above the footer: one line, two buttons, inside a
 * rounded panel that follows the theme. It reads the same on every page
 * that shows it (owner decision, 2026-09: the end of every page looks the
 * same), so it takes no props. The contact page, the dealer login and the
 * legal texts leave it out.
 */
export async function CtaBand() {
  const t = T[await getLocale()];
  const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
  return (
    <section aria-labelledby="cta-band-title" className="py-10 lg:py-14">
      <Container>
        <div
          data-reveal
          data-spotlight
          className="flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[var(--radius-lg)] border border-line p-8 sm:p-10 md:flex-row md:items-center"
          style={{ background: "radial-gradient(60% 140% at 0% 0%, var(--k-glow-red), transparent 70%), var(--k-hero-bg)" }}
        >
          <h2 id="cta-band-title" className="max-w-xl text-balance text-[clamp(1.625rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.035em] text-ink">
            {t.title[0]} <em>{t.title[1]}</em> {t.title[2]}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={DEMO_HREF}
              className={`inline-flex items-center gap-2 rounded-full bg-red-fill px-5 py-3 text-[0.9375rem] font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-red-fill-strong ${FOCUS}`}
            >
              {t.demo}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href={CONTACT_FORM_HREF}
              className={`inline-flex items-center rounded-full border border-line-2 bg-surface px-5 py-3 text-[0.9375rem] font-semibold text-ink hover:border-ink-3 ${FOCUS}`}
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
