"use client";

import { useEffect, useRef } from "react";
import { KerintiWordmark } from "@/components/ui/kerinti-wordmark";

/**
 * Hero visual: one QR code that keeps breaking apart and coming back,
 * slowly (a 26s loop).
 *
 * The code sits straight on the hero (no card); a red scan line passes over it, then every
 * module, the three finder squares included, lifts off, turns into a small
 * Kerinti x in the same size, weight and colours as the page's own x marks
 * (x-starfield.tsx), and drifts out into the hero. The marks
 * float and twinkle for a moment, then fly home and the code rebuilds.
 * The squares are pure black (pure white on the dark theme); the Kerinti
 * logo sits in the clear middle, as on a table QR menu.
 *
 * The pattern is decorative (seeded, not a scannable code). Drawn on one
 * canvas that overhangs its box, device pixel ratio capped at 2, ~330
 * particles; it stops while off screen or in a background tab, and shows the
 * assembled code, still, under prefers-reduced-motion. Colours follow the
 * theme tokens.
 *
 * Sizing: a square capped at 520 CSS px (less on short screens, so the
 * hero stays about three quarters of the first screen).
 */

const N = 25; // modules per side
const CYCLE = 26; // seconds
// Phase boundaries within the cycle (seconds).
const HOLD_END = 6.5;
const OUT_END = 13;
const DRIFT_END = 17.5;
const BACK_END = 24;
const LAG = 1.2; // max per-module start offset, s
/** The canvas is this many times the component box, centred on it. */
const OVER = 1.6;

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Module = { c: number; r: number; fixed: boolean; red: boolean; ang: number; dist: number; spin: number; lag: number; wob: number; xr: number; tw: number };

/** A QR-like pattern: finders, timing lines, one alignment square, seeded data, a clear centre for the logo. */
function buildModules(): Module[] {
  const rand = rng(11);
  const cells: boolean[][] = Array.from({ length: N }, () => Array(N).fill(false));
  const fixed: boolean[][] = Array.from({ length: N }, () => Array(N).fill(false));
  const reserve = (c0: number, r0: number, size: number) => {
    for (let r = r0; r < r0 + size; r++) for (let c = c0; c < c0 + size; c++) if (r >= 0 && c >= 0 && r < N && c < N) fixed[r][c] = true;
  };
  const finder = (c0: number, r0: number) => {
    reserve(c0 - 1, r0 - 1, 9);
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 7; c++) {
        const ring = r === 0 || r === 6 || c === 0 || c === 6;
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        cells[r0 + r][c0 + c] = ring || core;
      }
  };
  finder(0, 0);
  finder(N - 7, 0);
  finder(0, N - 7);
  for (let i = 8; i < N - 8; i++) {
    cells[6][i] = i % 2 === 0;
    cells[i][6] = i % 2 === 0;
  }
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) cells[16 + r][16 + c] = r === 0 || r === 4 || c === 0 || c === 4 || (r === 2 && c === 2);
  reserve(16, 16, 5);
  const mid = Math.floor(N / 2);
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      if (fixed[r][c] || r === 6 || c === 6) continue;
      if (Math.abs(r - mid) <= 4 && Math.abs(c - mid) <= 4) continue; // logo area (9×9)
      cells[r][c] = rand() < 0.5;
    }

  const out: Module[] = [];
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      if (!cells[r][c]) continue;
      const isFixed = fixed[r][c];
      // Scatter away from the centre, with some spread around that direction.
      const base = Math.atan2(r - mid, c - mid);
      out.push({
        c,
        r,
        fixed: isFixed,
        red: !isFixed && rand() < 0.2,
        ang: base + (rand() - 0.5) * 1.8,
        // Finder squares travel less, so the code's outline stays readable
        // a little longer as it breaks up.
        dist: (isFixed ? 0.25 : 0.35) + rand() * 0.55,
        spin: (rand() - 0.5) * 2,
        lag: (isFixed ? 0.5 : 0) * LAG + rand() * LAG * 0.5,
        wob: rand() * Math.PI * 2,
        // Same range as the page's field marks.
        xr: 2 + rand() * 4.5,
        tw: rand() * Math.PI * 2,
      });
    }
  return out;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

/** 0 = assembled, 1 = fully scattered, for module `m` at cycle time `t`. */
function spread(t: number, lag: number) {
  if (t < HOLD_END + lag) return 0;
  if (t < OUT_END + lag) return ease(clamp01((t - HOLD_END - lag) / (OUT_END - HOLD_END)));
  if (t < DRIFT_END) return 1;
  if (t < BACK_END - (LAG - lag)) return 1 - ease(clamp01((t - DRIFT_END) / (BACK_END - DRIFT_END - LAG)));
  return 0;
}

function readColors() {
  const s = getComputedStyle(document.documentElement);
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    ink: s.getPropertyValue("--k-ink").trim() || "#16161a",
    // The code itself: pure black, or pure white on the dark theme.
    code: dark ? "#ffffff" : "#000000",
    red: "#d80017",
    // Scattered marks match the page's x marks (x-starfield.tsx).
    alpha: dark ? 0.62 : 0.46,
  };
}

export function HeroQr() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = wrap.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !box || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const modules = buildModules();
    let colors = readColors();
    let size = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = box.clientWidth * OVER;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = reduced ? 0 : ((now - start) / 1000) % CYCLE;
      ctx.clearRect(0, 0, size, size);
      // The code occupies the middle 62% of the component box.
      const q = (size / OVER) * 0.62;
      const m = q / N;
      const x0 = (size - q) / 2;
      const y0 = (size - q) / 2;
      const half = size / 2;

      // Scan line while assembled.
      if (!reduced && t < HOLD_END) {
        const p = t / HOLD_END;
        const y = y0 + p * q;
        const g = ctx.createLinearGradient(0, y - 14, 0, y + 2);
        g.addColorStop(0, "rgba(216,0,23,0)");
        g.addColorStop(1, "rgba(216,0,23,0.35)");
        ctx.fillStyle = g;
        ctx.fillRect(x0 - m, y - 14, q + 2 * m, 16);
        ctx.fillStyle = colors.red;
        ctx.fillRect(x0 - m, y, q + 2 * m, 1.5);
      }

      ctx.lineCap = "round";
      const tt = now / 1000;
      for (const mod of modules) {
        const hx = x0 + mod.c * m + m / 2;
        const hy = y0 + mod.r * m + m / 2;
        // Squares are always the code colour; red appears only once a module
        // has turned into an x mark.
        const color = colors.code;
        const markColor = mod.red ? colors.red : colors.code;
        const k = spread(t, mod.lag);
        if (k <= 0.001) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = color;
          ctx.fillRect(hx - m / 2 + 0.3, hy - m / 2 + 0.3, m - 0.2, m - 0.2);
          continue;
        }
        const d = mod.dist * half * k;
        const px = hx + Math.cos(mod.ang) * d + Math.sin(tt * 0.4 + mod.wob) * 8 * k;
        const py = hy + Math.sin(mod.ang) * d + Math.cos(tt * 0.33 + mod.wob) * 8 * k;
        const shape = clamp01((k - 0.05) / 0.35); // square → x
        const rot = mod.spin * k;
        // Square, fading out as it leaves.
        if (shape < 1) {
          ctx.globalAlpha = 1 - shape;
          ctx.fillStyle = color;
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(rot);
          ctx.fillRect(-m / 2, -m / 2, m, m);
          ctx.restore();
        }
        // x mark in the page's style: its size, stroke and faintness, with
        // the same breathing and twinkle.
        if (shape > 0) {
          const breathe = 0.8 + 0.3 * Math.sin(tt * 0.8 + mod.tw);
          const twinkle = 0.65 + 0.35 * Math.sin(tt * 1.3 + mod.tw * 2);
          const r = (m * 0.5 * (1 - shape) + mod.xr * shape) * breathe;
          ctx.globalAlpha = shape * (1 - (1 - colors.alpha * twinkle) * k);
          ctx.strokeStyle = markColor;
          ctx.lineWidth = Math.max(0.8, r * 0.34);
          const a = Math.PI / 4 + rot * 0.15 + Math.sin(tt * 0.27 + mod.wob) * 0.3 * k;
          const c = Math.cos(a) * r;
          const s = Math.sin(a) * r;
          ctx.beginPath();
          ctx.moveTo(px - c, py - s);
          ctx.lineTo(px + c, py + s);
          ctx.moveTo(px + s, py - c);
          ctx.lineTo(px - s, py + c);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (reduced || raf || document.hidden || !visible) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    draw(performance.now());
    play();

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(box);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
      else stop();
    });
    io.observe(box);
    const onVisibility = () => (document.hidden ? stop() : play());
    document.addEventListener("visibilitychange", onVisibility);
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[520px] lg:max-w-[min(520px,calc(75svh-140px))]"
    >
      {/* The canvas overhangs the box (OVER = 1.6) so the marks drift out into the hero. */}
      <canvas ref={canvasRef} className="pointer-events-none absolute -left-[30%] -top-[30%] h-[160%] w-[160%] max-w-none" />
      {/* Kerinti logo in the clear 9×9 centre of the code (22% of the box; logo 20%, ≤ 104px). */}
      <div className="absolute left-1/2 top-1/2 flex w-[20%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <KerintiWordmark widthClass="w-full" eager />
      </div>
    </div>
  );
}
