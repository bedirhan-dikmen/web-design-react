"use client";

import { Check } from "lucide-react";
import { useStageStep } from "@/components/motion/stage-motion";
import { MODULES } from "@/lib/content/modules";

/**
 * /moduller stage — a control panel of every neXa module.
 *
 * All eleven modules sit in a grid; one lights up per step and a detail card
 * opens beside it with that module's own description and capability list,
 * straight from lib/content/modules.ts. A progress bar under the active tile
 * shows when the next one comes.
 */

const STEP_MS = 2800;

export function ModuleConsoleBoard() {
  const { ref, step, still } = useStageStep(STEP_MS);
  const active = step % MODULES.length;
  const current = MODULES[active];
  const Icon = current.icon;

  return (
    <div ref={ref} data-board="console" aria-hidden="true" className="relative mx-auto w-full max-w-[640px] select-none pb-24 pt-4 sm:pb-8">
      <div className="animate-float-slow rounded-2xl bg-[#1c1c22] p-4 shadow-[0_40px_90px_-30px_rgba(0,8,30,0.85)] ring-1 ring-white/15 sm:p-5">
        <div className="mb-3 flex items-center justify-between text-[0.7rem] font-medium tracking-wide text-white/60">
          <span>NEXA / MODÜLLER</span>
          <span className="tabular-nums">
            {String(active + 1).padStart(2, "0")} / {MODULES.length}
          </span>
        </div>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {MODULES.map((m, i) => {
            const TileIcon = m.icon;
            const on = i === active;
            return (
              <li
                key={m.slug}
                className={`relative overflow-hidden rounded-xl p-3 transition-all duration-500 ${
                  on ? "scale-[1.03] bg-white text-brand-navy-deep shadow-xl shadow-black/30" : "bg-white/[0.06] text-white/75"
                }`}
              >
                <TileIcon className={`size-5 ${on ? "text-brand-red" : "text-white/60"}`} strokeWidth={1.8} />
                <p className="mt-2 text-[0.7rem] font-semibold leading-tight">{m.title}</p>
                {on && !still && (
                  <span
                    key={`p-${step}`}
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-progress bg-brand-red"
                    style={{ animationDuration: `${STEP_MS}ms` }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div
        key={`detail-${active}-${step}`}
        className="absolute -bottom-2 right-0 w-[16rem] animate-card-in rounded-2xl bg-white p-4 shadow-2xl shadow-black/35 sm:-right-8 sm:bottom-auto sm:top-[45%]"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
            <Icon className="size-5" />
          </span>
          <p className="text-sm font-bold text-brand-navy-deep">{current.title}</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-board-500">{current.summary}</p>
        <ul className="mt-2.5 space-y-1 border-t border-board-100 pt-2.5">
          {current.points.slice(0, 3).map((p) => (
            <li key={p} className="flex gap-2 text-xs text-board-700">
              <Check className="mt-0.5 size-3.5 shrink-0 text-brand-red" strokeWidth={2.5} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
