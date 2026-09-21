import Image from "next/image";

/**
 * Layer A (photographic environment) + Layer B (contrast overlays).
 *
 * The source is 1672x941 — see docs/ASSET_MANIFEST.md. That is native at
 * 1366x768 and undersized above it. It is used here strictly as atmosphere:
 * no readable product UI lives in this layer, so softness at 2560+ costs
 * mood, not legibility. No blur, no sharpen filter, no transform: scale().
 *
 * Swapping in the eventual 3840x2160 export means changing HERO_BACKGROUND
 * only; nothing in the hero layout depends on these dimensions.
 */
const HERO_BACKGROUND = {
  src: "/images/hero/hero-restaurant-1672x941.png",
  width: 1672,
  height: 941,
  /**
   * Phase 01D pushed this from 62% to 76%.
   *
   * The source frames a dining room: tables and place settings fill the
   * middle, the lit back bar sits at the far right. At 62% the devices ended
   * up staged over a dinner table, which read as contextually wrong. At 76%
   * the crop favours the back bar and its warm working light, much closer to
   * the cashier / service-point scene this hero wants. The copy still sits
   * over the dark left region.
   *
   * A purpose-shot counter photograph is the real fix; see
   * docs/ASSET_MANIFEST.md.
   */
  /*
   * NOTE: the hero container is wider (about 2.03) than this source (1.78),
   * so `cover` scales to width and crops VERTICALLY — the X component here is
   * inert at desktop sizes and only the Y applies. Kept explicit so a taller
   * replacement asset behaves predictably.
   */
} as const;

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-brand-navy-deep">
      <Image
        src={HERO_BACKGROUND.src}
        alt=""
        aria-hidden="true"
        fill
        // Next 16 deprecates `priority` in favour of `preload`. This is the LCP
        // element, so it must not lazy-load.
        preload
        // Full-bleed layer, so the browser really does need the widest
        // candidate available. Contrast this with the product screens, which
        // declare their true bounded widths.
        sizes="100vw"
        // The source is 1672px. next/image never upscales past the source, so
        // the widest candidate it can emit IS the original — no resampling is
        // introduced by the pipeline. Default q=75 WebP does visibly muddy
        // bokeh highlights though, so this steps up. Softness above 1672 CSS
        // px is a source-resolution limit, recorded in docs/ASSET_MANIFEST.md,
        // and is NOT masked with filters here.
        quality={88}
        // Positioned by class, not inline style, so the desktop stage can
        // re-frame it (hero-stage.css .hs-bg-img).
        className="object-cover [object-position:76%_46%]"
      />

      {/*
        Layer B — CSS only, no baked-in gradients.
        Horizontal pass guarantees headline contrast on the left; the vertical
        pass seats the header and keeps the bottom edge from competing with
        the white section boundary.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-brand-navy-deep/92 via-brand-navy/42 to-brand-navy/6"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-brand-navy-deep/30 via-transparent to-brand-navy-deep/58"
      />
    </div>
  );
}
