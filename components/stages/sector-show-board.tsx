"use client";

import Image from "next/image";
import { useStageStep } from "@/components/motion/stage-motion";
import { modulesBySlug } from "@/lib/content/modules";
import { SECTOR_IMAGE_SIZE, SECTORS } from "@/lib/content/sectors";

/**
 * /cozumler stage — one business type after another.
 *
 * The sector photographs cross-fade with a slow settle-in zoom; a tab row with
 * a progress bar shows which sector is on and which is next, and a card
 * lists the neXa modules recommended for it (from lib/content/sectors.ts).
 * All photographs are 4:3 sources shown in a 4:3 frame — nothing is cropped.
 */

const STEP_MS = 3400;

export function SectorShowBoard() {
  const { ref, step, still } = useStageStep(STEP_MS);
  const active = step % SECTORS.length;
  const sector = SECTORS[active];
  const modules = modulesBySlug(sector.moduleSlugs).slice(0, 4);

  return (
    <div ref={ref} data-board="sectors" aria-hidden="true" className="relative mx-auto w-full max-w-[620px] select-none pb-20 pt-4 sm:pb-10">
      <div className="flex gap-1.5 overflow-hidden pb-3">
        {SECTORS.map((s, i) => (
          <span
            key={s.slug}
            className={`relative shrink-0 overflow-hidden rounded-full px-3 py-1 text-[0.7rem] font-medium transition-colors duration-500 ${
              i === active ? "bg-white text-brand-navy-deep" : "bg-white/10 text-white/65"
            }`}
          >
            {s.title}
            {i === active && !still && (
              <span
                key={`p-${step}`}
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-progress bg-brand-red"
                style={{ animationDuration: `${STEP_MS}ms` }}
              />
            )}
          </span>
        ))}
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_40px_90px_-30px_rgba(0,8,30,0.85)] ring-1 ring-white/15">
        {SECTORS.map((s, i) => (
          <Image
            key={s.slug}
            src={s.image}
            width={SECTOR_IMAGE_SIZE.width}
            height={SECTOR_IMAGE_SIZE.height}
            alt=""
            sizes="(min-width: 1024px) 560px, 88vw"
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            } ${i === active && !still ? "animate-kenburns" : ""}`}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-brand-navy-deep/70 via-transparent to-transparent" />
        <p
          key={`t-${active}`}
          className="absolute bottom-4 left-5 animate-card-in text-2xl font-semibold tracking-tight text-white"
        >
          {sector.title}
        </p>
      </div>

      <div
        key={`card-${step}`}
        className="absolute -bottom-2 right-0 w-[15rem] animate-card-in rounded-2xl bg-white p-4 shadow-2xl shadow-black/35 sm:-right-6 sm:bottom-2"
      >
        <p className="text-xs font-medium text-brand-red">{sector.tagline}</p>
        <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-board-400">
          Önerilen modüller
        </p>
        <ul className="mt-1.5 flex flex-wrap gap-1">
          {modules.map((m) => (
            <li key={m.slug} className="rounded-full bg-brand-navy/[0.07] px-2 py-0.5 text-[0.7rem] font-medium text-brand-navy-deep">
              {m.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
