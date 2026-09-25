import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { CONTACT_FORM_HREF, DEMO_HREF, SITE } from "@/lib/site";

/**
 * Closing call to action (minimal pass, 2026-09): one line, two buttons,
 * inside a rounded panel that follows the theme. The earlier dish photo was
 * dropped; the band carries no imagery.
 */
export function CtaBand({
  title = "Demo ile başlayalım.",
  secondary = "contact",
}: {
  title?: string;
  /** The second button: a link to the contact form, or a phone call. */
  secondary?: "contact" | "call";
}) {
  const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
  return (
    <section aria-labelledby="cta-band-title" className="py-16 lg:py-20">
      <Container width="page">
        <div
          data-reveal
          data-spotlight
          className="flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[var(--radius-lg)] border border-line p-8 sm:p-10 md:flex-row md:items-center"
          style={{ background: "radial-gradient(60% 140% at 0% 0%, var(--k-glow-red), transparent 70%), var(--k-hero-bg)" }}
        >
          <h2 id="cta-band-title" className="max-w-xl text-balance text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
            {title}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={DEMO_HREF}
              className={`inline-flex items-center gap-2 rounded-full bg-red-fill px-5 py-3 text-[0.9375rem] font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-red-fill-strong ${FOCUS}`}
            >
              Demo Talep Et
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            {secondary === "call" ? (
              <a
                href={SITE.contact.phoneHref}
                className={`inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface px-5 py-3 text-[0.9375rem] font-semibold text-ink hover:border-ink-3 ${FOCUS}`}
              >
                <Phone aria-hidden="true" className="size-4" />
                Bizi Arayın
              </a>
            ) : (
              <Link
                href={CONTACT_FORM_HREF}
                className={`inline-flex items-center rounded-full border border-line-2 bg-surface px-5 py-3 text-[0.9375rem] font-semibold text-ink hover:border-ink-3 ${FOCUS}`}
              >
                Bize Ulaşın
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
