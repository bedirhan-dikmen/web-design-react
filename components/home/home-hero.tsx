import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
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
 *   A/B  background: CSS only — night gradient plus two product-coloured
 *        glows and a faint grid. No photo, so nothing can be upscaled.
 *   C    copy: eyebrow, headline, lead, CTAs and product chips as DOM text.
 *   D    product cluster: the real neXa dashboard capture (1442px source,
 *        rendered ≤ 620 CSS px → ≥ 2.3x density) and the code-drawn nexus
 *        board. The cluster is capped at 720px so it never scales with 4K.
 *
 * Below xl the cluster is dropped in favour of two product chips: the
 * dashboard text would be unreadable at phone width and the cluster
 * collides with the header at 1024×768, and the spec asks for
 * lower density on mobile rather than a scaled-down desktop scene.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-baslik" className="relative isolate flex min-h-[max(640px,100svh)] flex-col overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 55% at 78% 30%, rgb(34 211 238 / 0.16), transparent 70%), radial-gradient(45% 55% at 92% 85%, rgb(139 92 246 / 0.2), transparent 70%), radial-gradient(40% 50% at 8% 10%, rgb(216 0 23 / 0.22), transparent 70%), linear-gradient(180deg, #15151b 0%, #0c0c10 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(70% 70% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 70% at 50% 40%, black, transparent)",
        }}
      />

      <SiteHeader />

      <div className="mx-auto grid w-full max-w-page-max flex-1 items-center gap-12 px-5 pb-16 pt-6 sm:px-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:gap-10 lg:px-10 lg:pb-20">
        <div>
          <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
            <span aria-hidden="true" className="h-0.5 w-6 bg-red" />
            {HOME.eyebrow}
          </p>
          <h1 id="hero-baslik" className="mt-6 text-balance text-[clamp(2.5rem,5.2vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            {HOME.headline[0]}{" "}
            <span className="bg-gradient-to-r from-[#5eead4] via-[#a5b4fc] to-[#c4b5fd] bg-clip-text text-transparent">
              {HOME.headline[1]}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/75">{HOME.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#programlar"
              className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-red px-6 py-3.5 font-semibold text-white shadow-lg shadow-red/25 transition-colors hover:bg-red-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {HOME.primary}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href={CONTACT_FORM_HREF}
              className="inline-flex items-center rounded-[var(--radius-sm)] border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
                    className="group flex h-full flex-col gap-2 rounded-[var(--radius-md)] border border-white/12 bg-white/[0.04] p-4 transition-colors hover:border-white/30 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Mark size={22} variant="on-dark" title={p.name} />
                    <span className="text-sm text-white/70">{p.category}</span>
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
            <span className="absolute -top-3.5 left-5 rounded-full bg-nexa px-3 py-1 text-xs font-bold shadow-lg">neXa sys</span>
          </div>
          <div className="absolute right-0 top-[44%] w-[52%] max-w-[380px]">
            <NexusWorkspaceBoard />
            <span className="absolute -top-3.5 right-5 rounded-full bg-nexus px-3 py-1 text-xs font-bold shadow-lg">nexus</span>
          </div>
        </div>
      </div>
    </section>
  );
}
