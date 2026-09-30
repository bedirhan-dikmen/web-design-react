import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductLogo } from "@/components/ui/product-logo";
import { HOME } from "@/lib/content/products";
import { getLocale } from "@/lib/i18n-server";
import { DEMO_HREF } from "@/lib/site";
import { HeroQr } from "./hero-qr";

/**
 * Company-level homepage hero (2026-09 template).
 *
 * Layers, per docs/VISUAL_ASSET_ARCHITECTURE.md:
 *   A/B  background: CSS only — a translucent tint, one red glow and a
 *        faint grid over the page's x starfield (XStarfield, fixed behind
 *        the homepage). No photo, nothing to upscale.
 *   C    copy: the page-hero family's eyebrow and headline (serif <em>
 *        accent), one-line lead and two CTAs, all DOM text.
 *   C'   the two product logos (official artwork from web.kerinti.com.tr)
 *        between the lead and the CTAs, each linking to its product.
 *   D    HeroQr: one looping animation, a QR code that scatters into x
 *        marks and rebuilds itself (canvas, no app screenshots), capped
 *        at 520px.
 *
 * From lg up it takes about three quarters of the first screen (header
 * included), so the top of the next section always shows; on phones and tablets it is sized
 * by its content so the next section is not pushed below an empty band.
 */
export async function HomeHero() {
  const locale = await getLocale();
  const home = HOME[locale];
  return (
    <section
      aria-labelledby="hero-baslik"
      data-starfield="1"
      className="relative isolate flex flex-col overflow-hidden text-ink lg:min-h-[max(460px,calc(75svh-var(--header-h)))]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40% 50% at 10% 0%, var(--k-glow-red), transparent 70%), linear-gradient(180deg, color-mix(in srgb, var(--k-surface-2) 45%, transparent), transparent)",
        }}
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

      <div className="mx-auto grid w-full max-w-page-max flex-1 items-center gap-12 px-5 pb-12 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:px-10 lg:py-10">
        <div className="max-w-xl">
          <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-2">
            <span aria-hidden="true" className="h-0.5 w-[22px] bg-red" />
            {home.eyebrow}
          </p>
          <h1 id="hero-baslik" className="mt-5 text-balance text-[clamp(2.25rem,4.3vw,3.875rem)] font-semibold leading-[1.04] tracking-[-0.05em]">
            {home.headline[0]}
            <br />
            <em>{home.headline[1]}</em> {home.headline[2]}
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-ink-2 sm:text-lg">{home.lead}</p>
          <ul aria-label={locale === "en" ? "Our programs" : "Programlarımız"} className="mt-7 flex items-center gap-6">
            <li>
              <Link href="/urun/nexa" className="block rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                <ProductLogo product="nexa" height={46} eager />
              </Link>
            </li>
            <li aria-hidden="true" className="h-9 w-px bg-line-2" />
            <li>
              <Link href="/urun/nexus" className="block rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                <ProductLogo product="nexus" height={50} eager />
              </Link>
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={DEMO_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-red-fill px-5 py-3 text-[0.9375rem] font-semibold text-white shadow-lg shadow-red/20 transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-red-fill-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {home.primary}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="#programlar"
              className="inline-flex items-center rounded-full border border-line-2 bg-surface/60 px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink-3 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {home.secondary}
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <HeroQr />
        </div>
      </div>
    </section>
  );
}
