import type { ProductSlug } from "@/lib/content/products";

/**
 * The large Kerinti X that sits half off-screen beside a product
 * (after web.kerinti.com.tr, where it flanks the product sections). The
 * small x marks streaming out of it are not drawn here: the element is a
 * [data-x-anchor] for the homepage starfield (x-starfield.tsx), which spawns
 * part of its own marks around it, so the spray and the background are one
 * system.
 *
 * Geometry is the reference site's own X (viewBox 211 × 217), split into its
 * two strokes. The "\" stroke is one piece; the "/" stroke is two halves
 * that part slightly at the crossing and breathe open and shut, so the mark
 * never reads as a static logo. neXa's X is all red, nexus leads with
 * graphite.
 *
 * Motion is CSS only (transform, see .k-bx-* in globals.css): the mark
 * floats and tilts. Under prefers-reduced-motion it holds still.
 * Decorative only.
 */

const STROKE_A = "0,0 56,0 211,217 155,217"; // "\"
const HALF_B1 = "155,0 211,0 133.5,108.5 77.5,108.5"; // "/" upper half
const HALF_B2 = "77.5,108.5 133.5,108.5 56,217 0,217"; // "/" lower half

export function BrandX({ product, side }: { product: ProductSlug; side: "left" | "right" }) {
  // neXa's X is all Kerinti red; nexus leads with graphite.
  const lead = product === "nexa" ? "text-red-fill" : "text-ink";
  const second = "text-red-fill";
  // On the left edge the X is mirrored so its open side faces the content.
  const mirror = side === "left";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The large X, centred on the section edge so half of it shows. */}
      <div
        data-x-anchor={side}
        className={`k-bx-float absolute top-16 w-[var(--bx-w)] [--bx-w:clamp(150px,26vw,400px)] lg:[--bx-w:clamp(200px,22vw,360px)] sm:top-20 lg:top-1/2 ${
          side === "left" ? "left-0 -translate-x-[46%] lg:-translate-x-[60%]" : "right-0 translate-x-[46%] lg:translate-x-[60%]"
        } -translate-y-1/2`}
      >
        <svg viewBox="-12 -12 235 241" className={`relative block h-auto w-full ${mirror ? "-scale-x-100" : ""}`} focusable="false">
          <g className={`k-bx-half-a ${second}`}>
            <polygon points={HALF_B1} fill="currentColor" />
          </g>
          <g className={`k-bx-half-b ${second}`}>
            <polygon points={HALF_B2} fill="currentColor" />
          </g>
          <polygon points={STROKE_A} fill="currentColor" className={lead} />
        </svg>
      </div>
    </div>
  );
}
