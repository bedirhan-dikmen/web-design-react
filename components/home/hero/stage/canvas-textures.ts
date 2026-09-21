import * as THREE from "three";

/**
 * Textures painted at runtime with the 2D canvas API.
 *
 * Three kinds of surface in this scene are *artwork*, not photographs: the
 * Kerinti wordmark on the POS base, the printed face of the QR table stand, and
 * the counter's fade-out mask. None of them exists as a file.
 *
 * Drawing them here rather than shipping rasters means they are resolution-free
 * (generated at the size the scene actually needs), they inherit the site's own
 * type, and — for the wordmark especially — nothing is traced from a reference
 * screenshot, which Phase 01 forbids. The QR area stays a deliberately inert
 * QR-style module grid: it is not a scannable code and encodes nothing.
 *
 * Every function here touches `document`, so they must only run on the client.
 * They are called from inside the WebGL scene, which is itself client-only and
 * dynamically imported.
 */

const BRAND_RED = "#e81532";

/**
 * The site's font stack, resolved from the document.
 *
 * A canvas `ctx.font` string is parsed with the CSS font shorthand grammar but
 * is not part of the cascade, so `var(--font-inter)` is invalid there: the
 * assignment is silently dropped and every `fillText` falls back to 10px
 * sans-serif. Reading the computed style resolves the custom property to the
 * real family list next/font generated, so 3D type matches DOM type.
 */
function sansStack(): string {
  try {
    const resolved = getComputedStyle(document.body).fontFamily;
    if (resolved) return resolved;
  } catch {
    /* fall through to the generic stack */
  }
  return "ui-sans-serif, system-ui, sans-serif";
}

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context unavailable");
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement, srgb = true) {
  const texture = new THREE.CanvasTexture(canvas);
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

/**
 * The `kerinti` wordmark for the POS base, on transparent ground.
 *
 * ASSET BLOCKER: no vector logo exists in this repository, so this is styled
 * DOM type rendered to a canvas — the same stand-in the DOM hero uses, isolated
 * to one place so swapping in the real SVG touches one function.
 */
export function createWordmarkTexture(): THREE.CanvasTexture {
  const sans = sansStack();
  const { canvas, ctx } = makeCanvas(512, 160);
  ctx.clearRect(0, 0, 512, 160);
  ctx.fillStyle = BRAND_RED;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `italic 800 108px ${sans}`;
  ctx.fillText("kerinti", 256, 84);
  return toTexture(canvas);
}

/**
 * A QR-style module grid: three finder squares, timing rows, one alignment
 * square and a seeded field of data modules — the structure a real code has,
 * so the card reads as printed stationery rather than a chessboard.
 *
 * It is decorative and encodes nothing; a scanner will not resolve it. When
 * the real table URL is decided, replace this with a generated vector code.
 */
function drawQrModules(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  colour: string,
) {
  const n = 29; // version-3 grid
  const cell = size / n;
  const grid: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));
  const reserved: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));

  const finder = (r0: number, c0: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = r0 + r;
        const cc = c0 + c;
        if (rr < 0 || cc < 0 || rr >= n || cc >= n) continue;
        reserved[rr][cc] = true;
        const ring = Math.max(Math.abs(r - 3), Math.abs(c - 3));
        grid[rr][cc] = ring !== 2 && ring <= 3;
      }
    }
  };
  finder(0, 0);
  finder(0, n - 7);
  finder(n - 7, 0);

  // Alignment pattern.
  const a = n - 9;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      reserved[a + r][a + c] = true;
      grid[a + r][a + c] = Math.max(Math.abs(r), Math.abs(c)) !== 1;
    }
  }

  // Timing patterns.
  for (let i = 8; i < n - 8; i++) {
    reserved[6][i] = reserved[i][6] = true;
    grid[6][i] = grid[i][6] = i % 2 === 0;
  }

  // Seeded data modules, so the card is identical on every load.
  let seed = 0x4b3e21;
  const next = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!reserved[r][c]) grid[r][c] = next() < 0.47;
    }
  }

  ctx.fillStyle = colour;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      // +0.5px overlap so adjacent modules do not show hairline seams.
      if (grid[r][c]) ctx.fillRect(x + c * cell, y + r * cell, cell + 0.5, cell + 0.5);
    }
  }
}

/** The printed face of the QR table stand. */
export function createQrCardTexture(): THREE.CanvasTexture {
  const sans = sansStack();
  const w = 1024;
  const h = Math.round(w / (1.02 / 1.87)); // the stand's real aspect
  const { canvas, ctx } = makeCanvas(w, h);

  // Matte card stock, very slightly cooler at the bottom where the acrylic
  // sleeve shades it.
  const paper = ctx.createLinearGradient(0, 0, w * 0.3, h);
  paper.addColorStop(0, "#ffffff");
  paper.addColorStop(0.7, "#f6f7f9");
  paper.addColorStop(1, "#e8ebf0");
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#1c2230";
  ctx.textAlign = "center";
  ctx.font = `700 112px ${sans}`;
  ctx.fillText("MASA 12", w / 2, h * 0.12);
  ctx.fillText("QR MENÜ", w / 2, h * 0.19);

  const qr = Math.round(w * 0.62);
  drawQrModules(ctx, (w - qr) / 2, Math.round(h * 0.26), qr, "#11151d");

  ctx.fillStyle = "#5d6270";
  ctx.font = `500 50px ${sans}`;
  ctx.fillText("Menüyü görmek için", w / 2, h * 0.715);
  ctx.fillText("QR kodu okutun.", w / 2, h * 0.76);

  ctx.fillStyle = BRAND_RED;
  ctx.font = `italic 800 124px ${sans}`;
  ctx.fillText("kerinti", w / 2, h * 0.9);

  return toTexture(canvas);
}

/**
 * Rounded-rectangle alpha mask for a screen of the given aspect (w/h).
 *
 * Screens are drawn as plain quads; this trims their corners to the panel's
 * real radius. `radius` is a fraction of the shorter side. Resolution is
 * modest on purpose — only the corner curves carry information, and linear
 * filtering keeps them smooth at any display size.
 */
export function createRoundedRectAlpha(aspect: number, radius: number) {
  const long = 512;
  const w = aspect >= 1 ? long : Math.round(long * aspect);
  const h = aspect >= 1 ? Math.round(long / aspect) : long;
  const { canvas, ctx } = makeCanvas(w, h);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, radius * Math.min(w, h));
  ctx.fill();
  return toTexture(canvas, false);
}

/**
 * Alpha map for the counter's top plane.
 *
 * The slab is finite, and its far edge would otherwise cut a hard horizontal
 * line across the photographic background. This fades the back of the surface
 * to nothing, and softens the extreme left and right for the same reason. The
 * front stays fully opaque: it meets the bullnose.
 *
 * Orientation: the top plane is laid flat with `rotation.x = -PI/2`, which maps
 * its local +Y onto world -Z — away from the camera. Textures also default to
 * `flipY`, putting this canvas's *top* row at v = 1. So the top of the canvas
 * below is the far edge of the counter, and the bottom of it is the near edge.
 * The slab is only ~5.1 units deep, and the monitor foot starts 0.02 of the way in
 * from the far edge, so the fade is short: a soft back edge, then solid stone.
 */
export function createCounterAlphaTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(256, 256);

  const depthFade = ctx.createLinearGradient(0, 0, 0, 256);
  depthFade.addColorStop(0, "#000000"); // far edge: gone
  depthFade.addColorStop(0.04, "#6a6a6a");
  depthFade.addColorStop(0.1, "#ffffff"); // from the monitor foot forward
  depthFade.addColorStop(1, "#ffffff");
  ctx.fillStyle = depthFade;
  ctx.fillRect(0, 0, 256, 256);

  // Soften the ends of the bar so it runs out of frame rather than stopping.
  ctx.globalCompositeOperation = "multiply";
  const sideFade = ctx.createLinearGradient(0, 0, 256, 0);
  sideFade.addColorStop(0, "#000000");
  sideFade.addColorStop(0.1, "#8a8a8a");
  sideFade.addColorStop(0.22, "#ffffff");
  sideFade.addColorStop(0.78, "#ffffff");
  sideFade.addColorStop(0.9, "#8a8a8a");
  sideFade.addColorStop(1, "#000000");
  ctx.fillStyle = sideFade;
  ctx.fillRect(0, 0, 256, 256);

  return toTexture(canvas, false);
}

/**
 * Alpha map for the counter's front face: solid just under the bullnose,
 * dissolving toward its foot so the counter runs out of the bottom of the
 * hero instead of ending on a line.
 */
export function createFaceAlphaTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(16, 256);
  const fade = ctx.createLinearGradient(0, 0, 0, 256);
  fade.addColorStop(0, "#ffffff");
  fade.addColorStop(0.35, "#bdbdbd");
  fade.addColorStop(1, "#000000");
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, 16, 256);
  return toTexture(canvas, false);
}

/**
 * A faint diagonal sheen for screen glass: the room reflected in the pane.
 * Drawn additively over the UI at low opacity, so it adds depth without
 * lowering text contrast. Two soft bands, brightest toward the upper left
 * where the key light sits.
 */
export function createGlassSheenTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(256, 256);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 256, 256);
  const g = ctx.createLinearGradient(0, 0, 256, 256);
  g.addColorStop(0, "rgba(255,255,255,0.10)");
  g.addColorStop(0.28, "rgba(255,255,255,0.06)");
  g.addColorStop(0.34, "rgba(255,255,255,0.0)");
  g.addColorStop(0.52, "rgba(255,255,255,0.0)");
  g.addColorStop(0.58, "rgba(255,255,255,0.035)");
  g.addColorStop(0.7, "rgba(255,255,255,0.0)");
  g.addColorStop(1, "rgba(255,255,255,0.0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return toTexture(canvas);
}
