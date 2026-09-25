"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, LogIn, Menu, X } from "lucide-react";
import { KerintiWordmark } from "@/components/ui/kerinti-wordmark";
import { NexaMark } from "@/components/ui/nexa-mark";
import { NexusMark } from "@/components/ui/nexus-mark";
import { DEALER_LOGIN_HREF, DEMO_HREF, HEADER_NAV, type NavEntry } from "@/lib/site";
import { ThemeSwitch, ThemeToggle } from "./theme-toggle";

/**
 * Site header (2026-09 redesign).
 *
 * A sticky, translucent bar rendered once by app/layout.tsx; pages no longer
 * embed it in their heroes. From lg up: logo, five nav entries (two of them
 * dropdowns), theme toggle, "Bayi Girişi" (secondary) and "Demo Talep Et"
 * (primary). Below lg: logo, Demo, and a menu button that opens a
 * full-height sheet with accordions, the CTAs and a labelled theme switch.
 *
 * Dropdowns follow the disclosure pattern: a button with aria-expanded
 * controlling a panel. They open on click (and on hover for mouse users),
 * close on Escape (focus returns to the trigger), on an outside click, and on
 * navigation.
 */

type Menu = Extract<NavEntry, { kind: "menu" }>;

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

function isActive(pathname: string, href: string) {
  const path = href.split(/[?#]/)[0];
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
}

function menuActive(pathname: string, menu: Menu) {
  return menu.match.some((m) => isActive(pathname, m));
}

const MARKS = { nexa: NexaMark, nexus: NexusMark };

/* ---------------------------------------------------------------- desktop */

function DropdownPanel({ menu, id, onNavigate }: { menu: Menu; id: string; onNavigate: () => void }) {
  const wide = Boolean(menu.products);
  return (
    <div
      id={id}
      className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-[var(--radius-lg)] border border-line bg-surface p-2 shadow-[var(--k-shadow-lg)] ${
        wide ? "w-[640px]" : "w-[320px]"
      }`}
    >
      <div className={wide ? "grid grid-cols-[1.15fr_1fr] gap-2" : ""}>
        {menu.products && (
          <ul className="space-y-1 rounded-[var(--radius-md)] bg-surface-2 p-2">
            {menu.products.map((p) => {
              const Mark = MARKS[p.slug];
              return (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    onClick={onNavigate}
                    className={`group flex flex-col gap-2 rounded-[var(--radius-sm)] p-3 transition-colors hover:bg-surface ${FOCUS}`}
                  >
                    <Mark size={22} />
                    <span className="text-sm leading-snug text-ink-2">{p.description}</span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold ${p.slug === "nexa" ? "text-nexa" : "text-nexus"}`}
                    >
                      İncele
                      <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <ul className="space-y-0.5 p-1">
          {menu.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={onNavigate} className={`block rounded-[var(--radius-sm)] px-3 py-2.5 transition-colors hover:bg-surface-2 ${FOCUS}`}>
                <span className="block text-sm font-semibold text-ink">{l.label}</span>
                {l.description && <span className="mt-0.5 block text-xs text-ink-3">{l.description}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DesktopNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const uid = useId();
  const navRef = useRef<HTMLElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [openedFor, setOpenedFor] = useState(pathname);

  // Close on navigation, tracked during render (no effect round trip).
  if (openedFor !== pathname) {
    setOpenedFor(pathname);
    if (open) setOpen(null);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggers.current[open]?.focus();
        setOpen(null);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const hover = (id: string | null, e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(id), id ? 60 : 180);
  };

  return (
    <nav ref={navRef} aria-label="Ana menü" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {HEADER_NAV.map((entry) => {
          if (entry.kind === "link") {
            const current = isActive(pathname, entry.href);
            return (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  aria-current={current ? "page" : undefined}
                  className={`relative block rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${FOCUS} ${
                    current ? "text-ink" : "text-ink-2 hover:bg-surface-3 hover:text-ink"
                  }`}
                >
                  {entry.label}
                  {current && <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-[15px] h-0.5 rounded bg-red" />}
                </Link>
              </li>
            );
          }
          const panelId = `${uid}-${entry.id}`;
          const expanded = open === entry.id;
          const current = menuActive(pathname, entry);
          return (
            <li key={entry.id} className="relative" onPointerEnter={(e) => hover(entry.id, e)} onPointerLeave={(e) => hover(null, e)}>
              <button
                ref={(el) => {
                  triggers.current[entry.id] = el;
                }}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : entry.id)}
                className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${FOCUS} ${
                  expanded ? "bg-surface-3 text-ink" : current ? "text-ink" : "text-ink-2 hover:bg-surface-3 hover:text-ink"
                }`}
              >
                {entry.label}
                <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                {current && <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-[15px] h-0.5 rounded bg-red" />}
              </button>
              {expanded && <DropdownPanel menu={entry} id={panelId} onNavigate={() => setOpen(null)} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ----------------------------------------------------------------- mobile */

function MobileMenu({ id, pathname, onClose }: { id: string; pathname: string; onClose: () => void }) {
  const [section, setSection] = useState<string | null>(() => {
    const active = HEADER_NAV.find((e): e is Menu => e.kind === "menu" && menuActive(pathname, e));
    return active?.id ?? null;
  });
  const uid = useId();

  return (
    <div
      id={id}
      className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto border-t border-line bg-surface lg:hidden"
    >
      <nav aria-label="Mobil menü" className="mx-auto flex min-h-full w-full max-w-page-max flex-col px-5 pb-8 pt-2 sm:px-6">
        <ul>
          {HEADER_NAV.map((entry) => {
            if (entry.kind === "link") {
              const current = isActive(pathname, entry.href);
              return (
                <li key={entry.href} className="border-b border-line">
                  <Link
                    href={entry.href}
                    aria-current={current ? "page" : undefined}
                    onClick={onClose}
                    className={`flex items-center justify-between py-4 text-lg font-semibold ${FOCUS} ${current ? "text-red" : "text-ink"}`}
                  >
                    {entry.label}
                  </Link>
                </li>
              );
            }
            const expanded = section === entry.id;
            const panelId = `${uid}-${entry.id}`;
            return (
              <li key={entry.id} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setSection(expanded ? null : entry.id)}
                  className={`flex w-full items-center justify-between py-4 text-left text-lg font-semibold ${FOCUS} ${
                    menuActive(pathname, entry) ? "text-red" : "text-ink"
                  }`}
                >
                  {entry.label}
                  <ChevronDown aria-hidden="true" className={`size-5 text-ink-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
                <div id={panelId} hidden={!expanded} className="pb-4">
                  {entry.products && (
                    <ul className="mb-2 grid gap-2 sm:grid-cols-2">
                      {entry.products.map((p) => {
                        const Mark = MARKS[p.slug];
                        return (
                          <li key={p.slug}>
                            <Link
                              href={p.href}
                              onClick={onClose}
                              className={`flex h-full flex-col gap-2 rounded-[var(--radius-md)] border border-line bg-surface-2 p-4 ${FOCUS}`}
                            >
                              <Mark size={22} />
                              <span className="text-sm text-ink-2">{p.description}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <ul>
                    {entry.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={onClose}
                          aria-current={isActive(pathname, l.href) && !l.href.includes("#") ? "page" : undefined}
                          className={`block rounded-[var(--radius-sm)] px-3 py-2.5 text-ink-2 hover:bg-surface-2 hover:text-ink ${FOCUS}`}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto space-y-3 pt-8">
          <Link
            href={DEMO_HREF}
            onClick={onClose}
            className={`flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-red-fill px-5 py-3.5 font-semibold text-white hover:bg-red-fill-strong ${FOCUS}`}
          >
            Demo Talep Et
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            href={DEALER_LOGIN_HREF}
            onClick={onClose}
            aria-current={isActive(pathname, DEALER_LOGIN_HREF) ? "page" : undefined}
            className={`flex items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-line-2 px-5 py-3.5 font-semibold text-ink hover:bg-surface-2 ${FOCUS}`}
          >
            <LogIn aria-hidden="true" className="size-4" />
            Bayi Girişi
          </Link>
          <div className="pt-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-3">Görünüm</p>
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </div>
  );
}

/* ----------------------------------------------------------------- header */

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openedFor, setOpenedFor] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileId = useId();

  if (openedFor !== pathname) {
    setOpenedFor(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback((returnFocus: boolean) => {
    setMobileOpen(false);
    if (returnFocus) menuButton.current?.focus();
  }, []);

  // Mobile sheet: lock page scroll, Escape closes, close if resized to desktop.
  useEffect(() => {
    if (!mobileOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMobile(true);
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && closeMobile(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [mobileOpen, closeMobile]);

  return (
    <header
      className={`sticky top-0 z-50 h-[var(--header-h)] border-b transition-[box-shadow,border-color] ${
        scrolled || mobileOpen ? "border-[var(--k-header-line)] shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)]" : "border-transparent"
      }`}
    >
      {/* The blur lives on its own layer: backdrop-filter on <header> would
          make it the containing block for the fixed mobile sheet. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 backdrop-blur-xl backdrop-saturate-150"
        style={{ background: mobileOpen ? "var(--k-surface)" : "var(--k-header-bg)" }}
      />
      <a
        href="#icerik"
        className="sr-only z-[60] rounded-md bg-ink px-4 py-2 font-semibold text-surface focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        İçeriğe geç
      </a>
      <div className="mx-auto flex h-full w-full max-w-page-max items-center gap-6 px-5 sm:px-6 lg:px-10 xl:max-w-[1400px]">
        <Link href="/" aria-label="Kerinti — ana sayfa" className={`shrink-0 rounded-md ${FOCUS}`}>
          <KerintiWordmark widthClass="w-[104px] sm:w-[116px]" />
        </Link>

        <div className="flex flex-1 justify-center">
          <DesktopNav pathname={pathname} />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle className="hidden lg:flex" />
          <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-line-2 lg:block" />
          <Link
            href={DEALER_LOGIN_HREF}
            aria-current={isActive(pathname, DEALER_LOGIN_HREF) ? "page" : undefined}
            className={`hidden items-center gap-2 rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold transition-colors lg:inline-flex ${FOCUS} ${
              isActive(pathname, DEALER_LOGIN_HREF) ? "bg-surface-3 text-ink" : "text-ink-2 hover:bg-surface-3 hover:text-ink"
            }`}
          >
            <LogIn aria-hidden="true" className="size-4" />
            <span className="lg:max-xl:sr-only">Bayi Girişi</span>
          </Link>
          <Link
            href={DEMO_HREF}
            className={`hidden items-center gap-2 rounded-full bg-red-fill px-4.5 py-2.5 text-[0.9375rem] font-semibold text-white shadow-md shadow-red/20 transition-colors hover:bg-red-fill-strong sm:inline-flex ${FOCUS}`}
          >
            Demo Talep Et
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>

          <button
            ref={menuButton}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((v) => !v)}
            className={`ml-1 flex size-10 items-center justify-center rounded-full border border-line-2 text-ink transition-colors hover:bg-surface-3 lg:hidden ${FOCUS}`}
          >
            <span className="sr-only">{mobileOpen ? "Menüyü kapat" : "Menüyü aç"}</span>
            {mobileOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && <MobileMenu id={mobileId} pathname={pathname} onClose={() => closeMobile(false)} />}
    </header>
  );
}
