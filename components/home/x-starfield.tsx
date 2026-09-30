"use client";

import { useEffect, useRef } from "react";

/**
 * Homepage x marks, drawn on one canvas but living on the page (they scroll
 * with the content, so nothing reads as a fixed layer sliding under it).
 *
 *   Field  — inside the regions marked [data-starfield="<density>"]: the
 *            hero ("1") and, sparser, "Yaklaşımımız" ("0.35"). Marks drift
 *            slowly in all directions, breathe, sway and twinkle, and fade
 *            in and out over their life; they soften toward the region
 *            edges.
 *   Spray  — around each large brand X ([data-x-anchor="left|right"], see
 *            brand-x.tsx), on its own: while the X is on screen, marks are
 *            born around it and stream out of it (sideways, up and down)
 *            and fade away. The product sections have no other marks.
 *
 * About one mark in five is Kerinti red.
 *
 * Cost: one fixed 2D canvas, device pixel ratio capped at 2, at most ~220
 * field marks plus 150 spray marks, two short strokes each, and only those on
 * screen are drawn; element positions are read on scroll/resize and once a
 * second. It stops while the tab is hidden and draws a single still frame
 * under prefers-reduced-motion. Colours follow the theme toggle.
 *
 * Decorative only: aria-hidden, no pointer events.
 */

type Mark = {
  /** Page coordinates (y includes the scroll offset). */
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  spin: number;
  phase: number;
  pulse: number;
  red: boolean;
  age: number;
  life: number;
  alive: boolean;
  /** Index into `regions` (field marks) or -1 (spray). */
  region: number;
};

type Region = { top: number; bottom: number; density: number };
type Anchor = { x: number; y: number; r: number; dir: 1 | -1 };

const AREA_PER_MARK = 9000;
const MAX_FIELD = 220;
const SPARKS = 150;
const EDGE = 90; // px of soft fade at a region's top and bottom

function readColors() {
  const s = getComputedStyle(document.documentElement);
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    ink: s.getPropertyValue("--k-ink").trim() || "#16161a",
    red: "#d80017",
    alpha: dark ? 0.62 : 0.46,
  };
}

export function XStarfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = readColors();
    let w = 0;
    let h = 0;
    let regions: Region[] = [];
    let anchors: Anchor[] = [];
    let field: Mark[] = [];
    const sparks: Mark[] = [];
    let raf = 0;
    let last = 0;
    let lastMeasure = 0;

    const look = () => ({
      rot: (Math.random() - 0.5) * 0.5,
      spin: 0.2 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      pulse: 0.5 + Math.random() * 1.1,
      red: Math.random() < 0.2,
    });

    const fieldMark = (region: number, midLife = false): Mark => {
      const g = regions[region] ?? { top: 0, bottom: h, density: 1 };
      const ang = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 9; // slow drift, px/s
      const life = 8 + Math.random() * 10;
      return {
        ...look(),
        x: Math.random() * w,
        y: g.top + Math.random() * (g.bottom - g.top),
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        size: 2 + Math.random() * 4.5,
        age: midLife ? Math.random() * life : 0,
        life,
        alive: true,
        region,
      };
    };

    /** A spray mark out of one of the anchors on screen, or a dead slot. */
    const spark = (): Mark => {
      const scroll = window.scrollY;
      const onScreen = anchors.filter((a) => a.y - scroll > -a.r && a.y - scroll < h + a.r);
      if (onScreen.length === 0) return { ...fieldMark(0), alive: false, region: -1 };
      const a = onScreen[Math.floor(Math.random() * onScreen.length)];
      // Mostly sideways into the page, some straight up/down, some anywhere.
      const pick = Math.random();
      let ang: number;
      if (pick < 0.45) ang = (Math.random() - 0.5) * 0.9;
      else if (pick < 0.75) ang = (Math.random() < 0.5 ? -1 : 1) * (Math.PI / 2 + (Math.random() - 0.5) * 0.7);
      else ang = (Math.random() - 0.5) * Math.PI * 1.2;
      const cos = Math.cos(ang) * a.dir;
      const sin = Math.sin(ang);
      // Born just outside the mark itself (most of it is under the X or off screen).
      const start = a.r * (0.55 + Math.random() * 0.55);
      const speed = 12 + Math.random() * 26;
      return {
        ...look(),
        x: a.x + cos * start,
        y: a.y + sin * start,
        vx: cos * speed,
        vy: sin * speed,
        size: 3 + Math.random() * 4.5,
        age: 0,
        life: 6 + Math.random() * 6,
        alive: true,
        region: -1,
      };
    };

    const measure = () => {
      const scroll = window.scrollY;
      regions = Array.from(document.querySelectorAll<HTMLElement>("[data-starfield]")).map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top + scroll, bottom: r.bottom + scroll, density: Number(el.dataset.starfield) || 1 };
      });
      anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-x-anchor]")).map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + scroll + r.height / 2, r: r.width / 2, dir: el.dataset.xAnchor === "right" ? -1 : 1 };
      });
    };

    /** Field marks per region, from its area and density. */
    const fill = () => {
      const next: Mark[] = [];
      regions.forEach((g, i) => {
        const n = Math.round((((g.bottom - g.top) * w) / AREA_PER_MARK) * g.density);
        const have = field.filter((m) => m.region === i);
        for (let k = 0; k < n && next.length < MAX_FIELD; k++) next.push(have[k] ?? fieldMark(i, true));
      });
      field = next;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measure();
      fill();
      while (sparks.length < SPARKS) {
        const s = spark();
        s.age = Math.random() * s.life;
        sparks.push(s);
      }
    };

    const stroke = (x: number, y: number, r: number, alpha: number, red: boolean, a: number) => {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = red ? colors.red : colors.ink;
      ctx.lineWidth = Math.max(0.8, r * 0.34);
      const c = Math.cos(a) * r;
      const d = Math.sin(a) * r;
      ctx.beginPath();
      ctx.moveTo(x - c + d, y - d - c);
      ctx.lineTo(x + c - d, y + d + c);
      ctx.moveTo(x + c + d, y + d - c);
      ctx.lineTo(x - c - d, y - d + c);
      ctx.stroke();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      const scroll = window.scrollY;
      for (const m of field) {
        const py = m.y - scroll;
        if (py < -20 || py > h + 20) continue;
        const g = regions[m.region];
        if (!g) continue;
        const edge = Math.max(0, Math.min(1, (m.y - g.top) / EDGE, (g.bottom - m.y) / EDGE));
        const env = Math.max(0, Math.min(1, m.age / 2, (m.life - m.age) / 2.5));
        const breathe = 0.78 + 0.32 * Math.sin(t * m.pulse + m.phase);
        const twinkle = 0.65 + 0.35 * Math.sin(t * m.pulse * 1.7 + m.phase * 2);
        stroke(m.x, py, m.size * breathe, colors.alpha * edge * env * twinkle, m.red, m.rot + Math.sin(t * m.spin + m.phase) * 0.3);
      }
      for (const m of sparks) {
        if (!m.alive) continue;
        const py = m.y - scroll;
        if (py < -20 || py > h + 20) continue;
        const env = Math.max(0, Math.min(1, m.age / 1, (m.life - m.age) / 2));
        const grow = 0.7 + 0.5 * Math.min(1, m.age / m.life);
        const breathe = 0.8 + 0.3 * Math.sin(t * m.pulse + m.phase);
        stroke(m.x, py, m.size * grow * breathe, colors.alpha * 1.25 * env, m.red, m.rot + Math.sin(t * m.spin + m.phase) * 0.3);
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      // Layout can shift after load (fonts, reveals): re-read positions each second.
      if (now - lastMeasure > 1000) {
        lastMeasure = now;
        measure();
      }
      for (let i = 0; i < field.length; i++) {
        const m = field[i];
        m.age += dt;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.age >= m.life) field[i] = fieldMark(m.region);
      }
      for (let i = 0; i < sparks.length; i++) {
        const m = sparks[i];
        m.age += dt;
        if (!m.alive || m.age >= m.life) {
          // Dead slots retry now and then, so a newly visible X fills up gradually.
          if (m.alive || Math.random() < dt * 5) sparks[i] = spark();
          continue;
        }
        m.x += m.vx * dt;
        m.y += m.vy * dt;
      }
      draw(now / 1000);
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (reduced || raf || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    // Paint a first frame right away (also covers reduced motion and a tab
    // that opens in the background).
    draw(performance.now() / 1000);
    start();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (!raf) draw(performance.now() / 1000);
      }, 120);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onScroll = () => {
      if (!raf) {
        measure();
        draw(performance.now() / 1000);
      }
    };
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (!raf) draw(performance.now() / 1000);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.clearTimeout(resizeTimer);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 block" />;
}
