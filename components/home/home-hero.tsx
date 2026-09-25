import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NexaMark } from "@/components/ui/nexa-mark";
import { NexusMark } from "@/components/ui/nexus-mark";
import { ScreenshotFrame } from "@/components/ui/screenshot";
import { NexusWorkspaceBoard } from "@/components/stages/nexus-workspace-board";
import { HOME, PRODUCTS } from "@/lib/content/products";
import { CONTACT_FORM_HREF } from "@/lib/site";

/**
 * Company-level homepage hero (redesign).
 *
 * Layers, per docs/VISUAL_ASSET_ARCHITECTURE.md:
 *   A/B  background: CSS only — the theme's hero gradient plus product-
 *        coloured glows and a faint grid (all --k-* tokens, so light and dark
 *        are each designed, not inverted). No photo, nothing to upscale.
 *   C    copy: eyebrow, headline, lead, CTAs and product chips as DOM text.
 *   D    product cluster: the real neXa dashboard capture (1442px source,
 *        rendered ≤ 620 CSS px → ≥ 2.3x density) and the code-drawn nexus
 *        board. The cluster is capped at 720px so it never scales with 4K.
 *
 * Below xl the cluster is dropped in favour of two product chips: the
 * dashboard text would be unreadable at phone width and the cluster
 * crowds the copy at 1024×768, and the spec asks for
 * lower density on mobile rather than a scaled-down desktop scene.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-baslik" className="relative isolate flex min-h-[max(600px,calc(100svh-var(--header-h)))] flex-col overflow-hidden text-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 55% at 78% 30%, var(--k-glow-nexa), transparent 70%), radial-gradient(45% 55% at 92% 85%, var(--k-glow-nexus), transparent 70%), radial-gradient(40% 50% at 8% 10%, var(--k-glow-red), transparent 70%), var(--k-hero-bg)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--k-hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--k-hero-grid) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(70% 70% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 70% at 50% 40%, black, transparent)",
        }}
      />

      <div className="mx-auto grid w-full max-w-page-max flex-1 items-center gap-12 px-5 py-14 sm:px-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:gap-10 lg:px-10 lg:pb-20">
        <div>
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink-2">
            <span aria-hidden="true" className="h-0.5 w-6 bg-red" />
            {HOME.eyebrow}
          </p>
          <h1 id="hero-baslik" className="mt-6 text-balance text-[clamp(2.5rem,5.2vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            {HOME.headline[0]}{" "}
            <span className="text-hero-gradient">
              {HOME.headline[1]}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-2">{HOME.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#programlar"
              className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-red-fill px-6 py-3.5 font-semibold text-white shadow-lg shadow-red/25 transition-colors hover:bg-red-fill-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {HOME.primary}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href={CONTACT_FORM_HREF}
              className="inline-flex items-center rounded-[var(--radius-sm)] border border-line-2 bg-surface/60 px-6 py-3.5 font-semibold text-ink transition-colors hover:border-ink-3 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {HOME.secondary}
            </Link>
          </div>

          <ul aria-label="Ürünlerimiz" className="mt-12 grid max-w-xl gap-3 sm:grid-cols-2">
            {(["nexa", "nexus"] as const).map((slug) => {
              const p = PRODUCTS[slug];
              const Mark = slug === "nexa" ? NexaMark : NexusMark;
              return (
                <li key={slug}>
                  <Link
                    href={`#${slug}`}
                    className="group flex h-full flex-col gap-2 rounded-[var(--radius-md)] border border-line bg-surface/70 p-4 shadow-sm backdrop-blur transition-colors hover:border-line-2 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <Mark size={22} title={p.name} />
                    <span className="text-sm text-ink-2">{p.category}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* The dashboard leads (top-left, 86%); nexus overlaps only its
            lower-right corner so both products stay legible. pb reserves the
            room the nexus board hangs into. */}
        <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-[720px] pb-[30%] xl:block">
          <div className="relative w-[86%]">
            <ScreenshotFrame shot="dashboard" maxWidth={620} dark />
            <span className="absolute -top-3.5 left-5 rounded-full bg-nexa-fill px-3 py-1 text-white text-xs font-bold shadow-lg">neXa sys</span>
          </div>
          <div className="absolute right-0 top-[44%] w-[52%] max-w-[380px]">
            <NexusWorkspaceBoard />
            <span className="absolute -top-3.5 right-5 rounded-full bg-nexus-fill px-3 py-1 text-white text-xs font-bold shadow-lg">nexus</span>
          </div>
        </div>
      </div>
    </section>
  );
}
