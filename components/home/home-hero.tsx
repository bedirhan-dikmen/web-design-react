import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME } from "@/lib/content/products";
import { DEMO_HREF } from "@/lib/site";
import { HeroShowcase } from "./hero-showcase";

/**
 * Company-level homepage hero (minimal pass, 2026-09).
 *
 * Layers, per docs/VISUAL_ASSET_ARCHITECTURE.md:
 *   A/B  background: CSS only — the theme's hero gradient, one red glow and
 *        a faint grid. No photo, nothing to upscale.
 *   C    copy: eyebrow, headline, one-line lead and two CTAs as DOM text.
 *   D    HeroShowcase: neXa capture / nexus panel behind a two-tab switch,
 *        capped at 620px so it never scales with 4K.
 */
export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-baslik"
      className="relative isolate flex min-h-[max(560px,calc(100svh-var(--header-h)))] flex-col overflow-hidden text-ink"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(40% 50% at 10% 0%, var(--k-glow-red), transparent 70%), var(--k-hero-bg)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--k-hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--k-hero-grid) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(60% 60% at 70% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(60% 60% at 70% 40%, black, transparent)",
        }}
      />

      <div className="mx-auto grid w-full max-w-page-max flex-1 items-center gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:px-10">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs font-semibold text-ink-2 backdrop-blur">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-red" />
            {HOME.eyebrow}
          </p>
          <h1 id="hero-baslik" className="mt-5 text-balance text-[clamp(2.25rem,4.2vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em]">
            {HOME.headline[0]} <span className="text-hero-gradient">{HOME.headline[1]}</span>
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-ink-2 sm:text-lg">{HOME.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={DEMO_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-red-fill px-5 py-3 text-[0.9375rem] font-semibold text-white shadow-lg shadow-red/20 transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-red-fill-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {HOME.primary}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="#programlar"
              className="inline-flex items-center rounded-full border border-line-2 bg-surface/60 px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink-3 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {HOME.secondary}
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}
