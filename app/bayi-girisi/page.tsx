import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DealerLoginForm } from "@/components/dealer/dealer-login-form";
import { NexaMark } from "@/components/ui/nexa-mark";
import { NexusMark } from "@/components/ui/nexus-mark";
import { DEALER_COPY } from "@/lib/content/dealer";

export const metadata: Metadata = {
  title: "Bayi Girişi",
  description: "Kerinti bayi paneline giriş.",
  // A login screen has nothing worth indexing.
  robots: { index: false, follow: true },
};

export default function DealerLoginPage() {
  return (
    <section aria-labelledby="bayi-baslik" className="relative isolate flex min-h-[max(640px,calc(100svh-var(--header-h)))] flex-col overflow-hidden text-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 60% at 12% 10%, var(--k-glow-red), transparent 70%), radial-gradient(40% 50% at 90% 90%, var(--k-glow-nexus), transparent 70%), var(--k-hero-bg)",
        }}
      />

      <div className="mx-auto grid w-full max-w-page-max flex-1 items-center gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-20 lg:px-10">
        <div>
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink-2">
            <span aria-hidden="true" className="h-0.5 w-6 bg-red" />
            {DEALER_COPY.eyebrow}
          </p>
          <h1 id="bayi-baslik" className="mt-5 text-balance text-[clamp(2.25rem,4.4vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight">
            {DEALER_COPY.title}
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-ink-2">{DEALER_COPY.lead}</p>
          <div className="mt-10 hidden items-center gap-6 lg:flex">
            <NexaMark size={24} />
            <NexusMark size={24} />
          </div>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 text-ink shadow-[var(--k-shadow-lg)] sm:p-9">
          <h2 className="text-2xl font-extrabold tracking-tight">{DEALER_COPY.cardTitle}</h2>
          <p className="mt-1.5 text-ink-2">{DEALER_COPY.cardLead}</p>
          <div className="mt-7">
            <DealerLoginForm />
          </div>
          <p className="mt-7 border-t border-line pt-6 text-sm text-ink-2">
            {DEALER_COPY.applyLead}{" "}
            <Link
              href={DEALER_COPY.applyHref}
              className="inline-flex items-center gap-1 font-semibold text-red underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              {DEALER_COPY.apply}
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
