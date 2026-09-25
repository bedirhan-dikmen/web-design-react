"use client";

import { Quote } from "lucide-react";
import { useStageStep } from "@/components/motion/stage-motion";
import { SECTORS } from "@/lib/content/sectors";
import { TESTIMONIALS } from "@/lib/content/social-proof";

/**
 * /referanslar stage — a deck of customer quotes, dealt one at a time, over a
 * slowly running strip of the business types neXa serves.
 *
 * The quotes come from lib/content/social-proof.ts. While they are demo
 * entries each card keeps its visible "Örnek yorum" label, exactly as on the
 * rest of the site; nothing here presents them as real customers.
 */

const STEP_MS = 4200;

export function QuoteDeckBoard() {
  const { ref, step } = useStageStep(STEP_MS);
  const current = TESTIMONIALS[step % TESTIMONIALS.length];
  const strip = [...SECTORS, ...SECTORS];

  return (
    <div ref={ref} data-board="quotes" aria-hidden="true" className="relative mx-auto w-full max-w-[600px] select-none pt-6">
      <div className="relative mx-auto h-[19rem] max-w-[30rem]">
        {/* The cards waiting underneath. */}
        <div className="absolute inset-x-6 top-6 h-[15rem] rotate-[4deg] rounded-2xl bg-white/10 ring-1 ring-white/15" />
        <div className="absolute inset-x-3 top-3 h-[15.5rem] -rotate-[3deg] rounded-2xl bg-white/20 ring-1 ring-white/15" />

        <figure
          key={`q-${step}`}
          className="absolute inset-x-0 top-0 flex h-[16rem] animate-card-in flex-col rounded-2xl bg-white p-6 text-brand-navy-deep shadow-[0_40px_90px_-30px_rgba(0,8,30,0.85)]"
        >
          <div className="flex items-center justify-between">
            <Quote className="size-7 text-brand-red" />
            {current.demo && (
              <span className="rounded-full bg-board-100 px-2.5 py-0.5 text-[0.7rem] font-medium text-board-500">
                Örnek yorum
              </span>
            )}
          </div>
          <blockquote className="mt-4 flex-1 text-lg leading-snug tracking-tight">“{current.quote}”</blockquote>
          <figcaption className="border-t border-board-100 pt-3 text-sm">
            <span className="font-semibold">{current.author}</span>
            <span className="text-board-500"> · {current.context}</span>
          </figcaption>
        </figure>
      </div>

      <div className="relative mt-4 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee gap-2">
          {strip.map((s, i) => (
            <li key={`${s.slug}-${i}`} className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs text-white/75">
              {s.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
