import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DealerLoginForm } from "@/components/dealer/dealer-login-form";
import { XStarfield } from "@/components/home/x-starfield";
import { ProductLogo } from "@/components/ui/product-logo";
import { DEALER_COPY } from "@/lib/content/dealer";
import { getLocale } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const copy = DEALER_COPY[await getLocale()];
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    // A login screen has nothing worth indexing.
    robots: { index: false, follow: true },
  };
}

/**
 * Dealer login: the homepage's moving x starfield behind a two-column
 * opening (welcome copy with the official neXa sys and nexus logos, the
 * sign-in card). The form is a stub until the dealer backend exists
 * (lib/dealer-auth.ts).
 */
export default async function DealerLoginPage() {
  const copy = DEALER_COPY[await getLocale()];
  return (
    <>
      <XStarfield />
      <section
        aria-labelledby="bayi-baslik"
        data-starfield="1"
        className="relative z-[1] flex min-h-[max(560px,calc(75svh-var(--header-h)))] flex-col text-ink"
        style={{ background: "radial-gradient(45% 60% at 12% 10%, var(--k-glow-red), transparent 70%)" }}
      >
        <div className="mx-auto grid w-full max-w-page-max flex-1 items-center gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-20 lg:px-10">
          <div>
            <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink-2">
              <span aria-hidden="true" className="h-0.5 w-6 bg-red" />
              {copy.eyebrow}
            </p>
            <h1 id="bayi-baslik" className="mt-5 text-balance text-[clamp(2.25rem,4.4vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-ink-2">{copy.lead}</p>
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-3">{copy.programs}</p>
              <ul className="mt-4 flex items-center gap-6">
                <li>
                  <ProductLogo product="nexa" height={44} />
                </li>
                <li aria-hidden="true" className="h-9 w-px bg-line-2" />
                <li>
                  <ProductLogo product="nexus" height={48} />
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 text-ink shadow-[var(--k-shadow-lg)] sm:p-9">
            <h2 className="text-2xl font-extrabold tracking-tight">{copy.cardTitle}</h2>
            <p className="mt-1.5 text-ink-2">{copy.cardLead}</p>
            <div className="mt-7">
              <DealerLoginForm />
            </div>
            <p className="mt-7 border-t border-line pt-6 text-sm text-ink-2">
              {copy.applyLead}{" "}
              <Link
                href={copy.applyHref}
                className="inline-flex items-center gap-1 font-semibold text-red underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                {copy.apply}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
