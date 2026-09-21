/**
 * The polished stone counter the whole product cluster stands on.
 *
 * This is what stops the devices reading as floating stickers. Every object in
 * the cluster is positioned so its foot lands on the contact line drawn here,
 * and each one casts a mirror reflection down into the top plane.
 *
 * Built entirely from CSS — no new raster asset, nothing to upscale, no blur
 * filter over a photograph. The geometry is measured off image.png (1045x803),
 * expressed relative to the cluster box (x 35..1015, y 55..745):
 *
 *   contact line (device feet)   y 650  ->  86% of cluster height
 *   front bullnose rim starts    y 725  ->  97%
 *   rim ends / front face begins y 765  -> 103%
 *
 * The band below therefore starts at 76% of the cluster height. It overhangs
 * the cluster by 28% so the front face reaches the bottom of the hero instead
 * of floating as a bar with photograph underneath it, giving a 52%-tall strip
 * split 40.4 / 11.5 / 48.1 into top plane, rim and front face.
 *
 * ## Tonal direction
 *
 * The light in the photograph comes from the bar behind and above, so the
 * stone is *darkest just under the devices* and brightens toward the viewer,
 * peaking on the bullnose where the edge catches the lamps head-on. Getting
 * this backwards (bright at the back, falling to the front) is what made the
 * first pass read as grey fog rather than polished marble.
 *
 * Every band fades to fully transparent at its outer edge — top, bottom and
 * both ends. A counter that stops on a hard line is a rectangle pasted over a
 * photograph; one that dissolves is a bar running out of frame.
 */

/** Dissolve both ends into the photograph instead of cutting them off. */
const EDGE_FADE =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 13%, rgba(0,0,0,0.6) 24%, black 34%, black 71%, rgba(0,0,0,0.5) 86%, rgba(0,0,0,0.1) 95%, transparent 100%)";

/**
 * Veining and mottling. Two kinds, because stone needs both: hairline veins
 * for structure, and broad soft clouding so the slab does not read as one flat
 * wash of colour. Contrast stays low — this is stone under dim warm light, and
 * anything stronger starts competing with the UI text above it.
 */
const VEINS = [
  "linear-gradient(104deg, transparent 25.4%, rgba(255,248,235,0.3) 27.4%, rgba(255,248,235,0.12) 28.6%, transparent 30.2%)",
  "linear-gradient(97deg, transparent 45.4%, rgba(255,245,228,0.22) 47.3%, transparent 49.4%)",
  "linear-gradient(113deg, transparent 61%, rgba(88,68,46,0.3) 63.2%, rgba(88,68,46,0.1) 64.4%, transparent 66%)",
  "linear-gradient(88deg, transparent 76.2%, rgba(255,244,226,0.2) 78.1%, transparent 80.4%)",
  "linear-gradient(120deg, transparent 10%, rgba(82,64,44,0.24) 12.2%, transparent 14.6%)",
  "linear-gradient(94deg, transparent 87%, rgba(255,247,232,0.18) 89%, transparent 91.4%)",
  "linear-gradient(107deg, transparent 35%, rgba(74,58,42,0.16) 36.6%, transparent 38.4%)",
  // Broad clouding: the slab's own colour variation, not lighting.
  "radial-gradient(46% 120% at 18% 70%, rgba(255,240,214,0.16) 0%, transparent 70%)",
  "radial-gradient(38% 110% at 52% 30%, rgba(70,56,42,0.16) 0%, transparent 72%)",
  "radial-gradient(42% 130% at 88% 60%, rgba(255,236,206,0.14) 0%, transparent 74%)",
].join(",");

/**
 * Warm pools from the bar lighting behind the scene, plus the cool spill from
 * the navy room on the left. These sit under the veins so the stone still
 * reads as one material.
 */
const LIGHT_POOLS = [
  "radial-gradient(72% 155% at 80% 110%, rgba(255,172,86,0.5) 0%, rgba(255,158,74,0.18) 40%, transparent 72%)",
  "radial-gradient(52% 130% at 34% 112%, rgba(255,226,186,0.26) 0%, transparent 64%)",
  "radial-gradient(60% 120% at 6% 40%, rgba(150,182,236,0.16) 0%, transparent 70%)",
].join(",");

/** Darkest under the devices, brightening toward the viewer. */
const STONE_TOP =
  "linear-gradient(to bottom, rgba(58,52,46,0) 0%, rgba(72,63,54,0.52) 9%, rgba(101,89,74,0.86) 26%, rgba(132,116,95,0.91) 52%, rgba(166,146,118,0.93) 78%, rgba(197,174,140,0.94) 100%)";

/** The bullnose: the brightest line in the scene, lit edge-on. */
const STONE_RIM =
  "linear-gradient(to bottom, rgba(246,233,209,0.96) 0%, rgba(223,206,178,0.95) 34%, rgba(168,152,130,0.94) 74%, rgba(104,93,80,0.92) 100%)";

/** Front face: falls straight into shadow and dissolves before it ends. */
const STONE_FACE =
  "linear-gradient(to bottom, rgba(46,38,32,0.94) 0%, rgba(24,21,24,0.86) 34%, rgba(12,14,24,0.5) 72%, rgba(8,11,22,0) 100%)";

export function CounterSurface() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[-22%] bottom-[-28%] top-[76%]"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      {/* ---- polished top plane ----------------------------------------- */}
      <div
        className="absolute inset-x-0 top-0 h-[40.4%]"
        style={{ backgroundImage: `${VEINS},${LIGHT_POOLS},${STONE_TOP}` }}
      >
        {/* Broad specular sweep across the polish, brightest where the bar
            lamps are. Kept weak and wide: strong enough to say "this surface
            is wet-polished", never so strong that it flattens the veining
            back into a single wash. */}
        <div className="absolute inset-x-[4%] bottom-[3%] h-[52%] bg-[linear-gradient(101deg,transparent_2%,rgba(255,255,255,0.07)_18%,rgba(255,234,202,0.19)_46%,rgba(255,255,255,0.06)_74%,transparent_96%)]" />
      </div>

      {/* ---- bullnose rim ------------------------------------------------ */}
      <div
        className="absolute inset-x-0 top-[40.4%] h-[11.5%]"
        style={{ backgroundImage: `${VEINS},${STONE_RIM}` }}
      >
        {/* The turn-under, where the rounded edge rolls away from the light. */}
        <div className="absolute inset-x-0 bottom-0 h-[18%] bg-linear-to-b from-transparent to-black/45" />
      </div>

      {/* ---- front face -------------------------------------------------- */}
      <div
        className="absolute inset-x-0 bottom-0 top-[51.9%]"
        style={{ backgroundImage: STONE_FACE }}
      />
    </div>
  );
}
