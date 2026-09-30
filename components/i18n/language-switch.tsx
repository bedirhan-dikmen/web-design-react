"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, LOCALES, type Locale } from "@/lib/i18n";
import { useLocale } from "./locale-provider";

/** Remember the choice for a year and mark the document's language. */
function persistLocale(next: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  document.documentElement.lang = next;
}

/**
 * TR / EN switch. Stores the choice in a cookie for a year and re-renders
 * the current page on the server in the new language (same URL, scroll kept).
 */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (next: Locale) => {
    if (next === locale) return;
    persistLocale(next);
    startTransition(() => router.refresh());
  };

  return (
    <div
      role="group"
      aria-label={locale === "tr" ? "Dil seçin" : "Choose language"}
      aria-busy={pending || undefined}
      className={`inline-flex items-center rounded-full border border-line-2 p-0.5 text-xs font-bold ${className}`}
    >
      {LOCALES.map((l) => {
        const on = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => choose(l)}
            aria-pressed={on}
            aria-label={l === "tr" ? "Türkçe" : "English"}
            className={`rounded-full px-2.5 py-1.5 uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
              on ? "bg-ink text-surface" : "text-ink-2 hover:text-ink"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
