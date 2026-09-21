"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { DEMO_HREF, NAV_ITEMS } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Desktop link row (xl and up) plus the mobile menu (below xl).
 *
 * The desktop classes are the approved Phase 01 styling, unchanged; only the
 * hrefs and the active state are now real. The mobile menu is a disclosure,
 * not a modal: a button with aria-expanded controlling a panel that drops
 * below the header. It moves focus to its first link when opened, closes on
 * Escape (returning focus to the button), on a link click, and on any route
 * change.
 */
export function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedFor, setOpenedFor] = useState(pathname);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on navigation. Tracking the path the menu was opened on, during
  // render, avoids a set-state-in-effect round trip.
  if (openedFor !== pathname) {
    setOpenedFor(pathname);
    if (open) setOpen(false);
  }

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <nav aria-label="Ana menü" className="hidden flex-1 justify-center xl:flex">
        <ul className="flex items-center gap-7 text-[0.9375rem]">
          {NAV_ITEMS.map((item) => {
            const current = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={
                    current
                      ? "relative text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-brand-red after:content-['']"
                      : "text-white/80 transition-colors hover:text-white"
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="order-last flex size-11 items-center justify-center rounded-lg border border-white/25 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:hidden"
      >
        <span className="sr-only">{open ? "Menüyü kapat" : "Menüyü aç"}</span>
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-50 border-t border-white/10 bg-brand-navy-deep/98 shadow-2xl shadow-black/40 backdrop-blur xl:hidden"
      >
        <nav aria-label="Mobil menü" className="mx-auto w-full max-w-content-max px-5 py-4 sm:px-6">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const current = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-white/10 last:border-b-0">
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => close(false)}
                    className={`flex items-center justify-between py-3.5 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      current ? "font-semibold text-white" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {current && (
                      <span aria-hidden="true" className="h-0.5 w-5 rounded bg-brand-red" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={DEMO_HREF}
            onClick={() => close(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand-red px-5 py-3.5 font-semibold text-white hover:bg-brand-red-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Demo Talep Et
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.25} />
          </Link>
        </nav>
      </div>
    </>
  );
}
