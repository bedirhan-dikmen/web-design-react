import Image from "next/image";
import { SCREENSHOTS, type ScreenshotKey } from "@/lib/content/screenshots";
import { getLocale } from "@/lib/i18n-server";

/**
 * Real neXa screenshots, framed (server components). The capture data and
 * safe sizes live in lib/content/screenshots.ts.
 */

/** Landscape capture in a light window frame. */
export async function ScreenshotFrame({
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
  const locale = await getLocale();
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
        alt={s.alt[locale]}
        sizes={`(min-width: 1024px) ${cap}px, 92vw`}
        quality={90}
        {...(eager ? { fetchPriority: "high" as const, loading: "eager" as const } : {})}
        className="w-full"
      />
    </div>
  );
}

/** The QR menu capture inside a phone-shaped frame. */
export async function PhoneScreenshot({ width = 280 }: { width?: number }) {
  const s = SCREENSHOTS.mobile;
  const locale = await getLocale();
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
        alt={s.alt[locale]}
        sizes={`${cap}px`}
        quality={90}
        className="w-full rounded-[1.7rem]"
      />
    </div>
  );
}
