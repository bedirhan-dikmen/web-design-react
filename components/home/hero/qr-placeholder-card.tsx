import { KerintiWordmark } from "@/components/ui/kerinti-wordmark";

/**
 * ASSET BLOCKER — QR table-stand card.
 *
 * image.png shows an acrylic QR menu stand on the counter, 102x187 px in that
 * frame (aspect 0.545, reproduced below). There is no vector QR asset, and
 * Phase 01 Step 8 forbids both enlarging a raster QR lifted from the reference
 * and generating a real live code that would encode production Kerinti data.
 * So this builds the physical card for real and leaves the code area a visibly
 * inert placeholder: a CSS checker pattern, not scannable.
 *
 * Type and spacing are in `cqw` so the card's contents scale with the cluster
 * instead of breaking out of it at small widths — 1cqw is 1% of the card's own
 * rendered width.
 */
export function QrPlaceholderCard({ tilt = 0 }: { tilt?: number }) {
  return (
    <div
      className="relative"
      style={{
        containerType: "inline-size",
        transform: tilt ? `rotateY(${tilt}deg)` : undefined,
        transformOrigin: "bottom center",
      }}
    >
      {/* The printed card. Aspect 0.545 matches image.png's measured stand. */}
      <div
        className="relative flex flex-col justify-between bg-[linear-gradient(168deg,#ffffff_0%,#f4f5f7_58%,#dfe2e7_100%)] ring-1 ring-black/10"
        style={{
          aspectRatio: "0.545",
          padding: "7cqw 6cqw 5cqw",
          borderRadius: "1.6cqw",
          boxShadow: "0 3cqw 6cqw -2cqw rgba(0,0,0,0.8)",
        }}
      >
        <p
          className="text-center font-bold uppercase leading-[1.25] text-brand-navy"
          style={{ fontSize: "8.5cqw" }}
        >
          Masa 12
          <br />
          QR Menü
        </p>

        {/* Placeholder — deliberately not a scannable code. */}
        <div
          role="img"
          aria-label="QR kod alanı (yer tutucu)"
          className="mx-auto aspect-square w-[74%] [background-image:repeating-conic-gradient(var(--color-brand-navy)_0deg_90deg,transparent_90deg_180deg)] [background-size:16.6%_16.6%]"
        />

        <p
          className="text-center leading-[1.3] text-neutral-500"
          style={{ fontSize: "5.4cqw" }}
        >
          Menüyü görmek için
          <br />
          QR kodu okutun.
        </p>

        <div className="flex justify-center">
          <KerintiWordmark
            className="max-w-[80%]"
          />
        </div>

        {/* Sheen across the print, as the acrylic sleeve has in the reference. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.55)_0%,transparent_22%,transparent_78%,rgba(255,255,255,0.3)_100%)]"
          style={{ borderRadius: "1.6cqw" }}
        />
      </div>

      {/* Acrylic foot: the angled leg the card leans back on. */}
      <div
        aria-hidden="true"
        className="mx-auto bg-[linear-gradient(to_bottom,rgba(226,234,246,0.75),rgba(120,136,164,0.35)_55%,rgba(20,28,48,0.5))]"
        style={{
          width: "72%",
          height: "6cqw",
          clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0 100%)",
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.28)_46%,transparent_74%)]"
        style={{ bottom: "-3cqw", width: "116%", height: "9cqw" }}
      />
    </div>
  );
}
