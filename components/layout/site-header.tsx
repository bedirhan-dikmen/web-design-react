import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { KerintiWordmark } from "@/components/ui/kerinti-wordmark";
import { DEMO_HREF } from "@/lib/site";
import { HeaderNav } from "./header-nav";

/**
 * Sits inside the hero rather than above it, so the navy scene reads as one
 * opening chapter (Phase 01, Step 3). It is transparent by design — the hero,
 * or an inner page's PageHero, supplies the background behind it.
 *
 * Phase 02 kept the approved styling and changed behaviour only: real routes,
 * active state from the current path, a working Demo link, and a mobile menu
 * below xl (see HeaderNav).
 */
export function SiteHeader() {
  return (
    <header className="relative z-40 w-full">
      <div className="mx-auto flex w-full max-w-content-max items-center gap-4 px-5 py-5 sm:gap-8 sm:px-6 lg:px-10 lg:py-6">
        <Link href="/" aria-label="Kerinti — ana sayfa" className="shrink-0">
          <KerintiWordmark />
        </Link>

        <HeaderNav />

        <div className="ml-auto flex items-center gap-4 xl:ml-0">
          <Link
            href={DEMO_HREF}
            className="hidden items-center gap-2 rounded-md bg-brand-red px-5 py-2.5 text-[0.9375rem] font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-brand-red-strong sm:inline-flex"
          >
            Demo Talep Et
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.25} />
          </Link>

          {/* Turkish is the only language today, so this is a label, not a
              control: a dropdown that offers nothing would be a dead end. */}
          <span className="hidden items-center gap-1 text-[0.9375rem] text-white/80 sm:inline-flex">
            <span className="sr-only">Dil: Türkçe</span>
            <span aria-hidden="true">TR</span>
            <ChevronDown aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </header>
  );
}
