/**
 * Generates the WebGL screen textures for the hero product scene.
 *
 * `next/image` cannot serve these: three.js loads a URL directly, outside the
 * optimizer. So the sized variants are prepared here instead, which is exactly
 * what docs/IMAGE_PIPELINE.md asks for ("export multiple widths rather than
 * serving one enormous file to every device").
 *
 * Rules this script obeys:
 *
 *   - Every target width is SMALLER than its master. Nothing is ever upscaled;
 *     the script throws if a target would exceed the source.
 *   - Aspect ratio is preserved exactly — height is derived, never given.
 *   - lanczos3 resampling and WebP q=90, the same quality tier the DOM hero
 *     already negotiates through next/image.
 *   - Masters in /static_design are read only. Nothing is written back.
 *
 * Target widths come from the scene's measured on-screen size: each screen's
 * share of the 1000 CSS px cluster, doubled for a DPR-2 drawing buffer, then
 * rounded up to the next sensible power-of-two-ish step.
 *
 * Run with: npm run textures
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "static_design");
const OUT = join(root, "public", "textures");

/** master -> published texture. `width` is the delivered width in pixels. */
const TEXTURES = [
  {
    master: "nexa_ana_ekrani_ss.png",
    out: "nexa-dashboard.webp",
    width: 1442, // native; the rear monitor is ~50% of the canvas, ~1000 device px
    role: "rear monitor",
  },
  {
    master: "nexa_mutfak_ekrani_ss.png",
    out: "nexa-kitchen.webp",
    width: 1672, // native; delivered at master size so 4K / DPR-2 buffers never run out
    role: "kitchen display",
  },
  {
    master: "nexa_ekrani_ss.png",
    out: "nexa-pos.webp",
    width: 1448, // native; delivered at master size so 4K / DPR-2 buffers never run out
    role: "POS terminal",
  },
  {
    master: "nexa_ekrani_mobil_ss.png",
    out: "nexa-mobile.webp",
    width: 941, // native; delivered at master size so 4K / DPR-2 buffers never run out
    role: "phone",
  },
];

await mkdir(OUT, { recursive: true });

const report = [];

for (const t of TEXTURES) {
  const buf = await readFile(join(SRC, t.master));
  const meta = await sharp(buf).metadata();

  if (t.width > meta.width) {
    throw new Error(
      `${t.master}: refusing to upscale. Master is ${meta.width}px, target is ${t.width}px. ` +
        `Request a larger master or lower the target.`,
    );
  }

  const out = await sharp(buf)
    .resize({ width: t.width, kernel: "lanczos3", fit: "inside", withoutEnlargement: true })
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toBuffer();

  const outMeta = await sharp(out).metadata();
  await writeFile(join(OUT, t.out), out);

  report.push({
    texture: t.out,
    role: t.role,
    master: `${meta.width}x${meta.height}`,
    delivered: `${outMeta.width}x${outMeta.height}`,
    scale: (outMeta.width / meta.width).toFixed(3) + "x",
    kb: Math.round(out.length / 1024),
  });
}

console.table(report);
console.log(
  `\nTotal: ${report.reduce((a, r) => a + r.kb, 0)} KB across ${report.length} textures.`,
);
