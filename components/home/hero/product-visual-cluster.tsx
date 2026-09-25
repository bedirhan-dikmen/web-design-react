import type { ReactNode } from "react";
import { ProductScreen } from "./product-screen";
import { QrPlaceholderCard } from "./qr-placeholder-card";
import { CounterSurface } from "./counter-surface";

/**
 * The product scene, laid out to image.png's measured geometry.
 *
 * Every number below was read off image.png (1045x803) with a 25px grid
 * overlaid, then expressed as a fraction of the scene box x 35..1015,
 * y 55..745 — 980 x 690, aspect 1.42, which is the cluster's aspect ratio.
 *
 *   object    left    width   measured box (image.png px)
 *   monitor   23.2%   53.9%   262..790  x  80..385
 *   pos       25.9%   33.7%   289..619  x 359..649 (incl. wedge base)
 *   kitchen   59.9%   39.8%   622..1012 x 370..660
 *   phone     11.9%   15.5%   154..287  x 306..629
 *   qr stand   0.6%   11.2%    42..149  x 455..645
 *
 * All five feet land on the counter's contact line at 86% of the cluster
 * height, which is where CounterSurface draws the stone.
 *
 * ## Why widths are anchored and heights are not
 *
 * Our screenshots carry their true aspect ratios and are never cropped or
 * stretched (docs/IMAGE_PIPELINE.md). Three of them are shaped differently
 * from the hardware in image.png — most of all the dashboard, 1.32 against
 * the reference monitor's 1.75. So each object matches the reference's
 * measured *width* and its *contact point*, and its height falls where the
 * asset's real ratio puts it.
 *
 * For the monitor that means the body runs about 15% of the cluster height
 * lower than the reference's. That overhang is invisible: the reference
 * composition already stacks the phone (11.9-27.4%), the POS (25.9-59.6%)
 * and the kitchen display (59.9-99.7%) across the monitor's full 23.2-77.1%
 * span, and all three reach further down the frame than the monitor does.
 * Anchoring the monitor by its top edge is therefore exact where it shows.
 *
 * ## Density
 *
 * At the 1000px cluster cap the images inside the bezels render at 514, 378,
 * 315 and 138 CSS px. `maxRenderedPx` is doubled into `sizes`, and next/image
 * serves the narrowest candidate that satisfies it, so Chrome at DPR 1 fetches
 * 1028, 755, 629 and 276 px files — a measured 2.0x for all four, which is the
 * floor docs/VISUAL_ASSET_ARCHITECTURE.md asks for. The originals (1442, 1672,
 * 1448, 941) leave headroom above that, so a high-DPR display gets more still,
 * capped by the source. Matching the reference's scale therefore costs no
 * sharpness.
 */

const DASHBOARD = {
  src: "/images/product/nexa-dashboard-1442x1091.png",
  width: 1442,
  height: 1091,
  maxCssWidth: 721,
  maxRenderedPx: 514,
} as const;

const POS = {
  src: "/images/product/nexa-pos-1448x1086.png",
  width: 1448,
  height: 1086,
  maxCssWidth: 724,
  maxRenderedPx: 315,
} as const;

const KITCHEN = {
  src: "/images/product/nexa-kitchen-1672x941.png",
  width: 1672,
  height: 941,
  maxCssWidth: 836,
  maxRenderedPx: 378,
} as const;

const MOBILE = {
  src: "/images/product/nexa-mobile-941x1672.png",
  width: 941,
  height: 1672,
  maxCssWidth: 470,
  maxRenderedPx: 138,
} as const;

/**
 * Mirror reflection in the polished stone.
 *
 * `scaleY(-1)` about the bottom edge maps the object's box [0, h] onto
 * [h, 2h] — directly below its own footprint, which is exactly where a
 * reflection belongs. The mask is authored in the *unflipped* local space and
 * is carried through the transform with the paint, so it runs `to top`:
 * opaque at the object's foot, gone by mid-body.
 *
 * `children` is rendered twice. Both copies resolve to the same next/image
 * URL, so the reflection costs one extra decode-free DOM subtree and no
 * network request.
 */
const REFLECTION_MASK =
  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 18%, rgba(0,0,0,0.12) 38%, transparent 58%)";

function Grounded({
  className,
  reflect = true,
  children,
}: {
  className: string;
  /**
   * Off for the monitor only. It is anchored by its top edge, so its box ends
   * at 62.7% of the cluster — well above the stone — and a mirror struck from
   * there would hang in mid-air rather than in the counter.
   */
  reflect?: boolean;
  children: ReactNode;
}) {
  if (!reflect) return <div className={className}>{children}</div>;

  return (
    <div className={className}>
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.28]"
        style={{
          transform: "scaleY(-1)",
          transformOrigin: "bottom",
          maskImage: REFLECTION_MASK,
          WebkitMaskImage: REFLECTION_MASK,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function ProductVisualCluster() {
  return (
    <div
      className="relative mx-auto aspect-[1.42] w-full max-w-cluster-max"
      // One shared perspective for the whole scene: the objects sit in a
      // single consistent 3D space and Chrome composites one context, not six.
      style={{ perspective: "2600px", perspectiveOrigin: "48% 62%" }}
    >
      <CounterSurface />

      {/* Main monitor — the neXa dashboard. Dominant, furthest back, turned
          slightly so its right edge comes toward the viewer (image.png's right
          bezel shows its side face). Anchored by its top edge; see above. */}
      <Grounded
        className="absolute left-[23.2%] top-[3.6%] z-10 w-[53.9%]"
        reflect={false}
      >
        <ProductScreen
          {...DASHBOARD}
          device="monitor"
          tilt={-7}
          alt="neXa ana ekranı: bugünkü ciro, toplam sipariş, satış grafiği ve sipariş dağılımı."
        />
      </Grounded>

      {/* Kitchen display — right of frame, angled inward toward the counter.
          The strongest turn in the scene: 300px right edge against 261 left. */}
      <Grounded className="absolute bottom-[12.3%] left-[59.9%] z-20 w-[39.8%]">
        <ProductScreen
          {...KITCHEN}
          device="display"
          tilt={-11}
          alt="neXa mutfak ekranı: hazırlanıyor, pişiyor ve hazır sipariş sütunları."
        />
      </Grounded>

      {/* POS terminal — front and centre on its branded wedge base, standing
          over the monitor's lower half exactly as image.png stages it. Turned
          the other way: its left side faces us. */}
      <Grounded className="absolute bottom-[13.9%] left-[25.9%] z-30 w-[33.7%]">
        <ProductScreen
          {...POS}
          device="pos"
          tilt={6}
          alt="neXa sipariş ekranı: masa için ürün listesi, sipariş özeti ve ödeme toplamı."
        />
      </Grounded>

      {/* Phone — front left, paired with the QR stand. */}
      <Grounded className="absolute bottom-[15.2%] left-[11.9%] z-40 w-[15.5%]">
        <ProductScreen
          {...MOBILE}
          device="phone"
          tilt={5}
          alt="neXa mobil QR menü: kategoriler ve sepet özeti."
        />
      </Grounded>

      {/* QR stand — frontmost object, beside the phone on the counter. */}
      <Grounded className="absolute bottom-[14.5%] left-[0.6%] z-50 w-[11.2%]">
        <QrPlaceholderCard tilt={9} />
      </Grounded>
    </div>
  );
}
