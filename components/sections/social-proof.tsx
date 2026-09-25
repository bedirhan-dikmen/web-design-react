import Image from "next/image";
import { Quote } from "lucide-react";
import { BRANDS, TESTIMONIALS } from "@/lib/content/social-proof";

/**
 * Customer feedback row. Demo entries carry a visible "Örnek yorum" label —
 * see lib/content/social-proof.ts for why nothing here is presented as a real
 * customer statement.
 */
export function Testimonials() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {TESTIMONIALS.map((t) => (
        <figure
          key={t.quote}
          className="flex flex-col rounded-xl border border-slate-200 bg-surface p-6"
        >
          {t.demo && (
            <span className="mb-3 self-start rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
              Örnek yorum
            </span>
          )}
          <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-slate-700">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-5 border-t border-slate-100 pt-4 text-sm">
            <span className="block font-semibold text-ink">{t.author}</span>
            <span className="text-slate-500">{t.context}</span>
          </figcaption>
        </figure>
      ))}

      <div className="flex flex-col justify-center rounded-xl bg-[radial-gradient(120%_120%_at_0%_0%,#4a0d17,#111116_70%)] p-7 text-white">
        <Quote aria-hidden="true" className="size-9 text-white/40" />
        <p className="mt-3 text-2xl font-bold leading-snug">
          Daha iyi restoranlar için teknoloji.
        </p>
        <p className="mt-2 text-sm text-white/75">Sizin başarınız, bizim motivasyonumuz.</p>
      </div>
    </div>
  );
}

/**
 * Customer logo strip. Renders approved logos only. While BRANDS is empty it
 * renders nothing in production; in development it shows labelled empty slots
 * so the section's place in the layout can still be reviewed.
 */
export function BrandStrip() {
  if (BRANDS.length === 0) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <ul
        aria-label="Referans logo alanları (geliştirme önizlemesi)"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      >
        {Array.from({ length: 6 }, (_, i) => (
          <li
            key={i}
            className="flex h-16 items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400"
          >
            Onaylı logo bekleniyor
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
      {BRANDS.map((b) => (
        <li key={b.name} className="flex justify-center">
          <Image
            src={b.logo}
            width={b.width}
            height={b.height}
            alt={b.name}
            sizes="160px"
            className="h-10 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}
