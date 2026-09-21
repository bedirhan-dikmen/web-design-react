/**
 * Generates the counter's marble texture for the WebGL hero scene.
 *
 * Why generated rather than lifted from image.png: the stone in image.png is
 * only ~1045 px wide, seen in steep perspective, and full of baked-in device
 * reflections. Cropping it would put other objects' mirror images into our
 * counter and would need a 3-4x upscale at 1920+ — both forbidden by
 * docs/IMAGE_PIPELINE.md. So the same stone is synthesised at 4096 px instead,
 * with its palette and vein character measured off image.png:
 *
 *   - cool grey-white ground, not beige (the previous pass read as brown);
 *   - a dense network of thin charcoal "crackle" veins running in several
 *     directions, which is what makes it read as real polished stone;
 *   - a few long, soft diagonal drifts and faint white veins;
 *   - fine granular speckle, visible on the bullnose in the reference.
 *
 * Every noise function is periodic, so the texture tiles seamlessly — the
 * counter plane repeats it without a visible seam. Deterministic: the same
 * seed always produces the same slab.
 *
 * Run with: npm run marble
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public", "textures");
const FILE = "counter-marble-4096x2048.webp";

const W = 4096;
const H = 2048;

// ---- seeded periodic Perlin noise --------------------------------------

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260921);
const PERM = new Uint16Array(512);
{
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
}
const GX = new Float32Array(256);
const GY = new Float32Array(256);
for (let i = 0; i < 256; i++) {
  const a = rand() * Math.PI * 2;
  GX[i] = Math.cos(a);
  GY[i] = Math.sin(a);
}

const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);

/** Perlin noise in [-1, 1] that repeats every `px` x `py` lattice cells. */
function pnoise(x, y, px, py) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const x0 = ((xi % px) + px) % px;
  const y0 = ((yi % py) + py) % py;
  const x1 = (x0 + 1) % px;
  const y1 = (y0 + 1) % py;
  const g = (ix, iy, dx, dy) => {
    const h = PERM[PERM[ix & 255] + (iy & 255)];
    return GX[h] * dx + GY[h] * dy;
  };
  const u = fade(xf);
  const v = fade(yf);
  const a = g(x0, y0, xf, yf) + u * (g(x1, y0, xf - 1, yf) - g(x0, y0, xf, yf));
  const b =
    g(x0, y1, xf, yf - 1) + u * (g(x1, y1, xf - 1, yf - 1) - g(x0, y1, xf, yf - 1));
  return (a + v * (b - a)) * 1.41;
}

/** fBm over tile coordinates u,v in [0,1). Base lattice is `bx` x `by`. */
function fbm(u, v, bx, by, octaves, offset = 0) {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  let fx = bx;
  let fy = by;
  for (let o = 0; o < octaves; o++) {
    sum += amp * pnoise(u * fx + offset * 17.3, v * fy + offset * 9.1, fx, fy);
    norm += amp;
    amp *= 0.5;
    fx *= 2;
    fy *= 2;
  }
  return sum / norm;
}

/** Ridged noise: 1 on the zero-crossings, falling away either side. */
function ridge(u, v, bx, by, octaves, offset) {
  let sum = 0;
  let amp = 0.6;
  let norm = 0;
  let fx = bx;
  let fy = by;
  for (let o = 0; o < octaves; o++) {
    const n = 1 - Math.abs(pnoise(u * fx + offset, v * fy - offset, fx, fy));
    sum += amp * n * n;
    norm += amp;
    amp *= 0.45;
    fx *= 2;
    fy *= 2;
  }
  return sum / norm;
}

const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
const mix = (a, b, t) => a + (b - a) * t;

// ---- palette, measured off image.png ------------------------------------

const LIGHT = [200, 199, 197]; // lit grey-white ground
const MID = [122, 120, 121]; // clouded grey
const DARK = [62, 59, 61]; // charcoal veins
const WHITE = [236, 236, 233]; // quartz veins

// ---- render --------------------------------------------------------------

const px = Buffer.alloc(W * H * 3);
const TAU = Math.PI * 2;
const t0 = Date.now();

for (let y = 0; y < H; y++) {
  const v = y / H;
  for (let x = 0; x < W; x++) {
    const u = x / W;

    // Domain warp — gives the veins their folded, geological flow.
    const wu = u + 0.06 * fbm(u, v, 4, 2, 6, 1);
    const wv = v + 0.12 * fbm(u, v, 4, 2, 6, 2);

    // Clouding of the ground, with enough octaves to read as mineral
    // mottling rather than a smooth airbrushed gradient.
    const cloud = smooth(-0.45, 0.55, fbm(wu, wv, 6, 3, 7, 3));

    // Veins are the zero-crossings of noise fields. Unlike thresholded
    // ridges, a zero set is a set of continuous curves, so veins never break
    // into the isolated dashes an earlier pass produced. Each field gets a
    // hairline core plus a wide, faint halo — the smoky edge real veins have.
    const vein = (n, width, mod) => {
      const a = Math.abs(n);
      const w = width * (0.35 + 1.3 * mod);
      return { core: 1 - smooth(0, w, a), halo: 1 - smooth(0, w * 7, a) };
    };
    const mod = smooth(-0.5, 0.5, fbm(wu, wv, 4, 2, 3, 13));
    const v1 = vein(fbm(wu, wv, 3, 3, 6, 5), 0.016, mod);
    const v2 = vein(fbm(wu + 0.21, wv, 6, 6, 5, 11), 0.011, 1 - mod);
    const v3 = vein(fbm(wu, wv + 0.37, 12, 10, 4, 17), 0.007, mod);
    const dark = Math.min(
      1,
      0.78 * v1.core + 0.45 * v2.core + 0.28 * v3.core + 0.22 * v1.halo + 0.12 * v2.halo,
    );

    // Faint white quartz veins.
    const q = vein(fbm(wu, wv, 5, 5, 5, 9), 0.007, 1 - mod);
    const quartz = 0.5 * q.core + 0.08 * q.halo;

    // Granular speckle.
    const grain = pnoise(u * 900, v * 450, 900, 450) * 6 + pnoise(u * 300, v * 150, 300, 150) * 5;
    const i = (y * W + x) * 3;
    for (let c = 0; c < 3; c++) {
      let col = mix(LIGHT[c], MID[c], cloud * 0.85);
      col = mix(col, WHITE[c], quartz);
      col = mix(col, DARK[c], dark);
      px[i + c] = Math.max(0, Math.min(255, Math.round(col + grain)));
    }
  }
  if (y % 256 === 0) process.stdout.write(`.${y}`);
}

await mkdir(OUT, { recursive: true });
const info = await sharp(px, { raw: { width: W, height: H, channels: 3 } })
  .webp({ quality: 88, effort: 6 })
  .toFile(join(OUT, FILE));

console.log(
  `\n${FILE}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB, ${(
    (Date.now() - t0) /
    1000
  ).toFixed(1)}s`,
);
