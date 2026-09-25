"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

/**
 * Accessible accordion (WAI-ARIA disclosure pattern).
 *
 * Each question is a real <button> inside a heading, with aria-expanded and
 * aria-controls pointing at its answer region. Enter/Space come for free from
 * the button element; items open independently. Answers stay in the DOM
 * (`hidden` when collapsed) so find-in-page still reaches them.
 */
export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="grid items-start gap-3 md:grid-cols-2">
      {items.map((item, i) => {
        const expanded = open.has(i);
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.question} className="rounded-xl border border-slate-200 bg-surface">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-[0.9375rem] font-semibold text-ink hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                {item.question}
                <Plus
                  aria-hidden="true"
                  className={`size-5 shrink-0 text-ink transition-transform ${expanded ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="px-5 pb-5 text-sm leading-relaxed text-slate-600"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
