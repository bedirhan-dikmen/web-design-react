"use client";

import { useStageStep } from "@/components/motion/stage-motion";
import { APPROACH, VALUES } from "@/lib/content/company";

/**
 * /hakkimizda stage — how Kerinti works, as a timeline that fills.
 *
 * The four approach steps from the about page stack vertically; the rail fills
 * to the active step, which opens to show its text while the others stay
 * collapsed. A value card (misyon, vizyon, …) changes alongside it. All copy
 * is from lib/content/company.ts.
 */

const STEP_MS = 3000;

export function ApproachTimelineBoard() {
  const { ref, step } = useStageStep(STEP_MS);
  const active = step % APPROACH.length;
  const value = VALUES[step % VALUES.length];
  const ValueIcon = value.icon;

  return (
    <div ref={ref} data-board="approach" aria-hidden="true" className="relative mx-auto w-full max-w-[620px] select-none pb-32 pt-4">
      <div className="animate-float-slow rounded-2xl bg-[#0b3268] p-5 shadow-[0_40px_90px_-30px_rgba(0,8,30,0.85)] ring-1 ring-white/15 sm:mr-10 sm:p-6">
        <p className="text-[0.7rem] font-medium tracking-wide text-white/60">KERİNTİ / ÇALIŞMA YAKLAŞIMI</p>
        <ol className="relative mt-4">
          <span className="absolute bottom-4 left-[17px] top-4 w-0.5 bg-white/15" />
          <span
            className="absolute left-[17px] top-4 w-0.5 bg-brand-red transition-[height] duration-700 ease-out"
            style={{ height: `calc(${(active / (APPROACH.length - 1)) * 100}% - 2rem)` }}
          />
          {APPROACH.map((s, i) => {
            const StepIcon = s.icon;
            const on = i === active;
            const done = i < active;
            return (
              <li key={s.title} className="relative flex gap-4 pb-3 last:pb-0">
                <span
                  className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                    on ? "bg-brand-red text-white shadow-lg shadow-brand-red/40" : done ? "bg-white text-brand-red" : "bg-[#123d7a] text-white/50"
                  }`}
                >
                  <StepIcon className="size-4" />
                </span>
                <div
                  className={`min-w-0 flex-1 rounded-xl px-3.5 py-2 transition-colors duration-500 ${
                    on ? "bg-white text-brand-navy-deep" : "text-white/60"
                  }`}
                >
                  <p className="text-sm font-semibold">{s.title}</p>
                  {on && <p key={`t-${step}`} className="mt-1 animate-card-in text-xs leading-relaxed text-board-500">{s.text}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div
        key={`v-${step}`}
        className="absolute bottom-0 right-0 w-[16rem] animate-card-in rounded-2xl bg-white p-4 shadow-2xl shadow-black/35 sm:-right-2"
      >
        <ValueIcon className="size-7 text-brand-red" strokeWidth={1.6} />
        <p className="mt-2 text-sm font-bold text-brand-navy-deep">{value.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-board-500">{value.text}</p>
      </div>
    </div>
  );
}
