import type { Step } from "@/lib/content/company";

/**
 * Numbered process steps ("Nasıl Çalışır?", "Çalışma Yaklaşımımız",
 * "Yolculuğumuz"). An ordered list, so the sequence is real structure, not
 * just visual numbering. Four across from lg, two from sm, stacked on phones;
 * separators are borders, so they disappear cleanly when the row wraps.
 */
export function Steps({
  steps,
  numbered = true,
  columns = 4,
}: {
  steps: Step[];
  numbered?: boolean;
  columns?: 2 | 4;
}) {
  const grid = columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2";
  return (
    <ol className={`grid gap-y-8 sm:gap-x-8 ${grid}`}>
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <li
            key={step.title}
            className="flex gap-4 lg:border-l lg:border-slate-200 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
          >
            <div className="flex shrink-0 items-start gap-3">
              {numbered && (
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-full bg-brand-red/10 text-sm font-bold text-red"
                >
                  {i + 1}
                </span>
              )}
              <Icon aria-hidden="true" className="size-8 text-red" strokeWidth={1.6} />
            </div>
            <div>
              <h3 className="text-base font-bold text-ink">
                {numbered && <span className="sr-only">{i + 1}. adım: </span>}
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
