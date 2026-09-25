import Image from "next/image";

/**
 * Real neXa screenshots, framed.
 *
 * Every entry here is a flat capture from /static_design, published under
 * /public/images/product. `maxCss` is the safe rendered width at 2x density
 * (docs/VISUAL_ASSET_ARCHITECTURE.md): the frame never grows past it, so UI
 * text stays sharp on high-DPR screens. Layouts may render smaller, never
 * larger.
 */
export const SCREENSHOTS = {
  dashboard: {
    src: "/images/product/nexa-dashboard-1442x1091.png",
    width: 1442,
    height: 1091,
    maxCss: 721,
    alt: "neXa yönetim paneli: günlük satış, sipariş sayısı, satış grafiği ve sipariş dağılımı",
  },
  pos: {
    src: "/images/product/nexa-pos-1448x1086.png",
    width: 1448,
    height: 1086,
    maxCss: 724,
    alt: "neXa kasa ekranı: kategori ve ürün seçimi ile masa sipariş listesi",
  },
  kitchen: {
    src: "/images/product/nexa-kitchen-1672x941.png",
    width: 1672,
    height: 941,
    maxCss: 836,
    alt: "neXa mutfak ekranı: Hazırlanıyor, Pişiyor ve Hazır sütunlarında siparişler",
  },
  mobile: {
    src: "/images/product/nexa-mobile-941x1672.png",
    width: 941,
    height: 1672,
    maxCss: 470,
    alt: "neXa QR menü: kategoriler ve sepete eklenebilen ürünler",
  },
} as const;

export type ScreenshotKey = keyof typeof SCREENSHOTS;

/** Landscape capture in a light window frame. */
export function ScreenshotFrame({
  shot,
  maxWidth = 640,
  eager = false,
  dark = false,
}: {
  shot: Exclude<ScreenshotKey, "mobile">;
  /** CSS px cap; clamped to the asset's safe width. */
  maxWidth?: number;
  eager?: boolean;
  dark?: boolean;
}) {
  const s = SCREENSHOTS[shot];
  const cap = Math.min(maxWidth, s.maxCss);
  return (
    <div
      className={`w-full overflow-hidden rounded-xl shadow-[0_24px_60px_-24px_rgba(0,20,60,0.55)] ring-1 ${
        dark ? "ring-white/15" : "ring-line"
      }`}
      style={{ maxWidth: cap }}
    >
      <Image
        src={s.src}
        width={s.width}
        height={s.height}
        alt={s.alt}
        sizes={`(min-width: 1024px) ${cap}px, 92vw`}
        quality={90}
        {...(eager ? { fetchPriority: "high" as const, loading: "eager" as const } : {})}
        className="w-full"
      />
    </div>
  );
}

/** The QR menu capture inside a phone-shaped frame. */
export function PhoneScreenshot({ width = 280 }: { width?: number }) {
  const s = SCREENSHOTS.mobile;
  const cap = Math.min(width, s.maxCss);
  return (
    <div
      className="w-full rounded-[2.2rem] bg-board-900 p-2.5 shadow-[0_24px_60px_-24px_rgba(0,20,60,0.6)] ring-1 ring-board-700"
      style={{ maxWidth: cap }}
    >
      <Image
        src={s.src}
        width={s.width}
        height={s.height}
        alt={s.alt}
        sizes={`${cap}px`}
        quality={90}
        className="w-full rounded-[1.7rem]"
      />
    </div>
  );
}
