"use client";

import { useEffect, useId, useRef, useState } from "react";
import { NexaMark } from "@/components/ui/nexa-mark";
import { NexusMark } from "@/components/ui/nexus-mark";
import { ScreenshotFrame } from "@/components/ui/screenshot";
import { NexusWorkspaceBoard } from "@/components/stages/nexus-workspace-board";
import { useReducedMotion } from "@/components/motion/stage-motion";

/**
 * Hero product switcher: a two-tab control (neXa sys / nexus) over one
 * visual. It auto-advances every ROTATE_MS with a progress line, pauses while
 * hovered or focused, and never auto-advances under reduced motion.
 *
 * Sizing: the neXa dashboard capture is 1442px wide and renders at most
 * 600 CSS px (≥ 2.4x density). The nexus panel is DOM, sharp at any size.
 */

const ROTATE_MS = 6000;

const TABS = [
  { id: "nexa", label: "neXa sys", Mark: NexaMark },
  { id: "nexus", label: "nexus", Mark: NexusMark },
] as const;

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const reduced = useReducedMotion();
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const auto = !reduced && !hold;

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % TABS.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [auto, active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (active + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      className="w-full max-w-[620px]"
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
    >
      <div role="tablist" aria-label="Ürün önizlemesi" onKeyDown={onKey} className="mb-4 inline-flex gap-1 rounded-full border border-line bg-surface/70 p-1 backdrop-blur">
        {TABS.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden rounded-full px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                on ? "bg-surface shadow-sm" : "opacity-60 hover:opacity-100"
              }`}
            >
              <t.Mark size={18} title={t.label} />
              {on && auto && (
                <span
                  key={`p-${active}`}
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-0.5 h-px origin-left animate-progress bg-red"
                  style={{ animationDuration: `${ROTATE_MS}ms` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Both panels share one grid cell and cross-fade; the hidden one is
          inert so it is neither focusable nor announced. */}
      <div className="grid">
        {TABS.map((t, i) => {
          const on = i === active;
          return (
            <div
              key={t.id}
              role="tabpanel"
              id={`${uid}-panel-${t.id}`}
              aria-labelledby={`${uid}-tab-${t.id}`}
              inert={!on}
              className={`[grid-area:1/1] transition-[opacity,transform] duration-500 ease-out ${
                on ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
              }`}
            >
              {t.id === "nexa" ? <ScreenshotFrame shot="dashboard" maxWidth={600} /> : <NexusWorkspaceBoard />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
