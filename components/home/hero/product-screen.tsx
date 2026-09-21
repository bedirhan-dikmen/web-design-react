import Image from "next/image";
import { safeMaxCssWidth, TARGET_DENSITY } from "@/lib/assets";

/**
 * Layer D — a flat NeXa UI screenshot staged inside a real device body.
 *
 * The screenshot is never distorted: `object-contain`, intrinsic aspect ratio,
 * `h-auto w-full`, no skew, no scale-up, no `image-rendering` hack. What this
 * file adds is the hardware around it. `/static_design` contains no
 * transparent device renders (docs/ASSET_MANIFEST.md, Phase 01E), so every
 * bezel, chin, stand and base below is built in CSS.
 *
 * ## Why container query units
 *
 * Bezel thickness, corner radius and stand proportions are all fractions of
 * the device's own width, and that width is fluid (a percentage of a fluid
 * cluster). `%` padding would work, but `%` border-radius resolves per-axis
 * and turns corners into ellipses. `cqw` is one honest unit for both: the
 * device root declares `container-type: inline-size`, and 1cqw == 1% of that
 * device's rendered width. Every number in GEOMETRY is therefore readable as
 * "percent of this device's width", exactly as it was measured off image.png.
 *
 * ## On the rotation
 *
 * Angles are measured from image.png by comparing the left and right edge
 * heights of each device (a taller edge is the nearer one). They stay in the
 * 5-12 degree range: enough to read as staged hardware on a counter, never
 * enough to smear UI text. Every screen here runs at 2.8x-6.8x source
 * density, so the resampling cost of the turn is absorbed many times over.
 * The perspective origin is declared once on the cluster so all five objects
 * share one 3D context.
 */

export type DeviceKind = "monitor" | "display" | "pos" | "phone";

type Geometry = {
  /** Bezel thickness, in cqw (percent of the device's own width). */
  side: number;
  top: number;
  chin: number;
  /** Outer shell corner radius, cqw. */
  radius: number;
  /** Screen corner radius, cqw. */
  screenRadius: number;
  /** Tailwind classes painting the shell material. */
  shell: string;
};

/**
 * Measured from image.png (1045x803). Each value is the measured pixel
 * thickness divided by that device's measured body width.
 *
 *   monitor  body 531 wide — light silver frame, 12-19px bezel
 *   display  body 380 wide — black slab, 20px top / 30px chin
 *   pos      body 330 wide — black, 12px top / 20px chin, on a wedge base
 *   phone    body 133 wide — black, thick rounded shell
 */
const GEOMETRY: Record<DeviceKind, Geometry> = {
  monitor: {
    side: 2.3,
    top: 2.3,
    chin: 3.4,
    radius: 3.2,
    screenRadius: 1.2,
    // Brushed light frame, lit from the upper left as the room is.
    shell:
      "bg-[linear-gradient(158deg,#f2f5f9_0%,#d5dbe4_30%,#aab3c1_66%,#7d8797_100%)]",
  },
  display: {
    side: 2.5,
    top: 5.3,
    chin: 7.9,
    radius: 2.4,
    screenRadius: 0.9,
    shell:
      "bg-[linear-gradient(162deg,#3a3f47_0%,#1b1f25_38%,#0b0e13_100%)]",
  },
  pos: {
    side: 3.2,
    top: 3.6,
    chin: 6.1,
    radius: 3,
    screenRadius: 1.2,
    shell:
      "bg-[linear-gradient(160deg,#41464e_0%,#1d2127_40%,#0a0d12_100%)]",
  },
  phone: {
    side: 5.5,
    top: 5.5,
    chin: 6.5,
    radius: 15,
    screenRadius: 10.5,
    shell:
      "bg-[linear-gradient(148deg,#4a5059_0%,#15191f_34%,#05070b_100%)]",
  },
};

export type ProductScreenProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  device: DeviceKind;
  /** Degrees of rotateY. Positive turns the right edge away from the viewer. */
  tilt?: number;
  /** Hard ceiling in CSS px, from safeMaxCssWidth(naturalWidth, 2). */
  maxCssWidth?: number;
  /**
   * Largest width the *image inside the bezel* can ever render at, in CSS px.
   * Drives `sizes`. MUST be an absolute length: percentages are invalid in
   * `sizes`, and a percentage makes the browser fall back to 100vw and fetch
   * the widest candidate (we were pulling 1920px files for a 536px screen).
   */
  maxRenderedPx: number;
  className?: string;
};

/** Glass. Deliberately weak — this must never compete with the UI beneath. */
function ScreenGlass({ radius }: { radius: number }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.04)_16%,transparent_34%)]"
      style={{ borderRadius: `${radius}cqw` }}
    />
  );
}

export function ProductScreen({
  src,
  width,
  height,
  alt,
  device,
  tilt = 0,
  maxCssWidth,
  maxRenderedPx,
  className = "",
}: ProductScreenProps) {
  const g = GEOMETRY[device];
  const ceiling = maxCssWidth ?? safeMaxCssWidth(width, TARGET_DENSITY.productUi);

  return (
    <div
      className={`relative ${className}`}
      style={{
        // 1cqw == 1% of this device's width for everything below.
        containerType: "inline-size",
        width: `min(100%, ${ceiling}px)`,
        // rotateY only — the perspective lives once on the cluster container.
        // Five separate perspective() contexts froze the compositor.
        transform: tilt ? `rotateY(${tilt}deg)` : undefined,
        transformOrigin: "bottom center",
      }}
    >
      {/* ---- body shell ------------------------------------------------- */}
      <div
        className={`relative ${g.shell}`}
        style={{
          borderRadius: `${g.radius}cqw`,
          padding: `${g.top}cqw ${g.side}cqw ${g.chin}cqw`,
          boxShadow:
            "0 2.2cqw 5cqw -1.6cqw rgba(0,0,0,0.75), inset 0 0.12cqw 0 rgba(255,255,255,0.28), inset 0 -0.12cqw 0 rgba(0,0,0,0.5)",
        }}
      >
        {/* Recessed lip: the millimetre of shadow where the glass drops into
            the frame. Without it the screenshot reads as a printed sticker. */}
        <div
          className="relative overflow-hidden bg-black"
          style={{
            borderRadius: `${g.screenRadius}cqw`,
            boxShadow: "inset 0 0 0 0.25cqw rgba(0,0,0,0.85)",
          }}
        >
          <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            /*
             * Absolute length only — a percentage here is invalid and makes
             * the browser fall back to 100vw.
             *
             * Doubled deliberately. docs/VISUAL_ASSET_ARCHITECTURE.md asks for
             * ~2 source pixels per rendered CSS pixel on UI-bearing raster,
             * and asking for the exact rendered width would deliver 1.0x on a
             * 1x display. The browser multiplies again by DPR, and next/image
             * caps at the source width, so this never over-fetches beyond the
             * original file.
             */
            sizes={`(max-width: 1023px) 40vw, ${maxRenderedPx * 2}px`}
            quality={90}
            className="h-auto w-full object-contain"
          />
          <ScreenGlass radius={g.screenRadius} />
        </div>

        {device === "phone" && (
          <>
            {/* Dynamic-island pill, sized to sit wholly inside the top bezel
                so it never covers a pixel of the screenshot. */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
              style={{ top: "1.1cqw", width: "26cqw", height: "3.6cqw" }}
            />
            {/* Side buttons on the right edge. */}
            <span
              aria-hidden="true"
              className="absolute rounded-r-[0.6cqw] bg-[linear-gradient(to_right,#2a2f36,#0b0e12)]"
              style={{ right: "-0.7cqw", top: "22cqw", width: "0.9cqw", height: "11cqw" }}
            />
            <span
              aria-hidden="true"
              className="absolute rounded-l-[0.6cqw] bg-[linear-gradient(to_left,#2a2f36,#0b0e12)]"
              style={{ left: "-0.7cqw", top: "18cqw", width: "0.9cqw", height: "6cqw" }}
            />
          </>
        )}

        {device === "display" && (
          <>
            {/* Camera pinhole in the top bezel. */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#4a515c]"
              style={{ top: "2.1cqw", width: "0.7cqw", height: "0.7cqw" }}
            />
            {/* Etched wordmark on the chin, as the reference hardware has. */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center justify-center font-semibold uppercase tracking-[0.35em] text-white/22"
              style={{ height: `${g.chin}cqw`, fontSize: "1.5cqw" }}
            >
              nexa
            </span>
          </>
        )}
      </div>

      {/* ---- what it stands on ------------------------------------------ */}
      {device === "monitor" && <MonitorStand />}
      {device === "display" && <DisplayFoot />}
      {device === "pos" && <PosBase />}

      {/* Contact shadow — the dark pool directly under the footprint. CSS
          lighting, not a blur applied to any image. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.3)_46%,transparent_74%)]"
        style={{ bottom: "-1.6cqw", width: "104%", height: "5.5cqw" }}
      />
    </div>
  );
}

/** Slim neck and oval foot. Mostly occluded by the POS, as in image.png. */
function MonitorStand() {
  return (
    <div aria-hidden="true" className="relative">
      <div
        className="mx-auto bg-[linear-gradient(to_right,#6b7482,#aab3c1_38%,#59616e)]"
        style={{ width: "7cqw", height: "6.5cqw" }}
      />
      <div
        className="mx-auto rounded-[50%] bg-[linear-gradient(to_bottom,#b9c1cd,#6d7684_55%,#2b3038)]"
        style={{ width: "26cqw", height: "2.4cqw" }}
      />
    </div>
  );
}

/** Low wedge foot: the kitchen slab leans back on a short stand. */
function DisplayFoot() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto bg-[linear-gradient(to_bottom,#2b3038,#0a0d12)]"
      style={{
        width: "26cqw",
        height: "2.8cqw",
        clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)",
      }}
    />
  );
}

/**
 * The POS wedge. Measured at 73% of the terminal's width and 17.3% of it
 * tall, carrying the Kerinti wordmark on its front face.
 */
function PosBase() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex items-center justify-center bg-[linear-gradient(to_bottom,#31363e_0%,#181c22_34%,#05070a_100%)]"
      style={{
        width: "73cqw",
        height: "17.3cqw",
        clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)",
      }}
    >
      <span
        className="font-extrabold lowercase italic leading-none tracking-tight text-brand-red"
        style={{ fontSize: "8cqw" }}
      >
        kerinti
      </span>
    </div>
  );
}
