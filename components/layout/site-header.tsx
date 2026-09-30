"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, LogIn, Menu, X } from "lucide-react";
import { KerintiWordmark } from "@/components/ui/kerinti-wordmark";
import { ProductLogo } from "@/components/ui/product-logo";
import { LanguageSwitch } from "@/components/i18n/language-switch";
import { useLocale } from "@/components/i18n/locale-provider";
import type { L } from "@/lib/i18n";
import { DEALER_LOGIN_HREF, headerNav, type NavEntry } from "@/lib/site";
import { ThemeSwitch, ThemeToggle } from "./theme-toggle";

/**
 * Site header (2026-09 template).
 *
 * A sticky, translucent bar rendered once by app/layout.tsx. From lg up it
 * condenses into a floating pill once the page scrolls, and a thin red line
 * under it tracks reading progress (scroll-driven CSS, see .k-progress).
 * Past the first screen it slides away while scrolling down and comes back
 * on any scroll up (never while the pointer or focus is in it).
 *
 * From lg up: logo, four nav entries (two of them dropdowns), the TR/EN
 * switch, theme toggle and "Bayi Girişi". Below lg: logo, the language
 * switch and a menu button that opens a full-height sheet with accordions,
 * dealer login and a labelled theme switch.
 *
 * Dropdowns follow the disclosure pattern: a button with aria-expanded
 * controlling a panel. With a mouse they open on hover and close only when
 * the pointer leaves the trigger and its panel; a click on the trigger never
 * closes an open panel (no open/close flicker when hover and click meet).
 * With touch or keyboard, a click toggles. Escape closes (focus returns to
 * the trigger), as do an outside click and navigation.
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

const T: L<{
  view: string;
  watch: string;
  mainMenu: string;
  mobileMenu: string;
  dealer: string;
  appearance: string;
  skip: string;
  homeLabel: string;
  openMenu: string;
  closeMenu: string;
}> = {
  tr: {
    view: "İncele",
    watch: "İzleyin",
    mainMenu: "Ana menü",
    mobileMenu: "Mobil menü",
    dealer: "Bayi Girişi",
    appearance: "Görünüm",
    skip: "İçeriğe geç",
    homeLabel: "Kerinti — ana sayfa",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
  },
  en: {
    view: "View",
    watch: "Take a look",
    mainMenu: "Main menu",
    mobileMenu: "Mobile menu",
    dealer: "Dealer login",
    appearance: "Appearance",
    skip: "Skip to content",
    homeLabel: "Kerinti — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};

/* ---------------------------------------------------------------- desktop */

function DropdownPanel({ menu, id, onNavigate }: { menu: Menu; id: string; onNavigate: () => void }) {
  const t = T[useLocale()];
  const wide = Boolean(menu.products);
  const feature = menu.feature;
  return (
    // before: an invisible bridge over the 12px gap, so moving the mouse from
    // the trigger into the panel never counts as leaving it.
    <div
      id={id}
      className={`absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-[var(--radius-lg)] border border-line bg-surface p-2 shadow-[var(--k-shadow-lg)] before:absolute before:inset-x-0 before:-top-3 before:h-3 ${
        wide ? (feature ? "w-[860px]" : "w-[640px]") : "w-[320px]"
      }`}
    >
      <div className={wide ? (feature ? "grid grid-cols-[1.1fr_1fr_0.85fr] gap-2" : "grid grid-cols-[1.15fr_1fr] gap-2") : ""}>
        {menu.products && (
          <ul className="space-y-1 rounded-[var(--radius-md)] bg-surface-2 p-2">
            {menu.products.map((p) => {
              return (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    onClick={onNavigate}
                    className={`group flex flex-col gap-2 rounded-[var(--radius-sm)] p-3 transition-colors hover:bg-surface ${FOCUS}`}
                  >
                    <ProductLogo product={p.slug} height={p.slug === "nexa" ? 30 : 34} />
                    <span className="text-sm leading-snug text-ink-2">{p.description}</span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold ${p.slug === "nexa" ? "text-nexa" : "text-nexus"}`}
                    >
                      {t.view}
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
        {feature && (
          <Link
            href={feature.href}
            onClick={onNavigate}
            className={`group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[var(--radius-md)] p-4 text-white ${FOCUS}`}
          >
            {/* 1122px photo at ≤ 260 CSS px: > 4x, no upscaling. */}
            <Image
              src={feature.image}
              width={feature.width}
              height={feature.height}
              alt=""
              sizes="260px"
              className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <span className="text-sm font-bold">{feature.title}</span>
            <span className="mt-0.5 text-xs text-white/80">{feature.text}</span>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold">
              {t.watch}
              <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

function DesktopNav({ pathname }: { pathname: string }) {
  const locale = useLocale();
  const nav = headerNav(locale);
  const [open, setOpen] = useState<string | null>(null);
  const lastPointer = useRef<string>("keyboard");
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
    hoverTimer.current = setTimeout(() => setOpen(id), id ? 60 : 220);
  };

  // Mouse: a click only ever opens (hover already handles closing).
  // Touch, pen or keyboard (a click with no pointer before it): a click toggles.
  const clickTrigger = (id: string, expanded: boolean) => {
    clearTimeout(hoverTimer.current);
    if (lastPointer.current === "mouse") setOpen(id);
    else setOpen(expanded ? null : id);
    lastPointer.current = "keyboard";
  };

  return (
    <nav ref={navRef} aria-label={T[locale].mainMenu} className="relative hidden lg:block">
      <ul className="flex items-center gap-1">
        {nav.map((entry) => {
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
                  {current && <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-red" />}
                </Link>
              </li>
            );
          }
          const panelId = `${uid}-${entry.id}`;
          const expanded = open === entry.id;
          const current = menuActive(pathname, entry);
          return (
            // Wide panels (Ürünler) centre on the nav, narrow ones on their trigger.
            <li key={entry.id} className={entry.products ? "" : "relative"} onPointerEnter={(e) => hover(entry.id, e)} onPointerLeave={(e) => hover(null, e)}>
              <button
                ref={(el) => {
                  triggers.current[entry.id] = el;
                }}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onPointerDown={(e) => {
                  lastPointer.current = e.pointerType;
                }}
                onClick={() => clickTrigger(entry.id, expanded)}
                className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${FOCUS} ${
                  expanded ? "bg-surface-3 text-ink" : current ? "text-ink" : "text-ink-2 hover:bg-surface-3 hover:text-ink"
                }`}
              >
                {entry.label}
                <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                {current && <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-red" />}
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
  const locale = useLocale();
  const t = T[locale];
  const nav = headerNav(locale);
  const [section, setSection] = useState<string | null>(() => {
    const active = nav.find((e): e is Menu => e.kind === "menu" && menuActive(pathname, e));
    return active?.id ?? null;
  });
  const uid = useId();

  return (
    <div
      id={id}
      className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto border-t border-line bg-surface lg:hidden"
    >
      <nav aria-label={t.mobileMenu} className="mx-auto flex min-h-full w-full max-w-page-max flex-col px-5 pb-8 pt-2 sm:px-6">
        <ul>
          {nav.map((entry) => {
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
                                  return (
                          <li key={p.slug}>
                            <Link
                              href={p.href}
                              onClick={onClose}
                              className={`flex h-full flex-col gap-2 rounded-[var(--radius-md)] border border-line bg-surface-2 p-4 ${FOCUS}`}
                            >
                              <ProductLogo product={p.slug} height={p.slug === "nexa" ? 30 : 34} />
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
            href={DEALER_LOGIN_HREF}
            onClick={onClose}
            aria-current={isActive(pathname, DEALER_LOGIN_HREF) ? "page" : undefined}
            className={`flex items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-line-2 px-5 py-3.5 font-semibold text-ink hover:bg-surface-2 ${FOCUS}`}
          >
            <LogIn aria-hidden="true" className="size-4" />
            {t.dealer}
          </Link>
          <div className="pt-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-3">{t.appearance}</p>
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
  const t = T[useLocale()];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openedFor, setOpenedFor] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileId = useId();

  if (openedFor !== pathname) {
    setOpenedFor(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  // Hide on scroll down, show on scroll up. The bar always shows over the
  // first screen (the hero), and never tucks away while the visitor is using
  // it: pointer over it (open dropdowns), keyboard focus inside it.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      setScrolled(y > 4);
      const header = headerRef.current;
      const inUse = !!header && (header.matches(":hover") || header.contains(document.activeElement));
      if (y < window.innerHeight * 0.8 || inUse) setTucked(false);
      else if (dy > 6) setTucked(true);
      else if (dy < -6) setTucked(false);
      if (Math.abs(dy) > 6 || y < window.innerHeight * 0.8) lastY = y;
    };
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

  const pill = scrolled && !mobileOpen;
  const hidden = tucked && !mobileOpen;

  return (
    <header
      ref={headerRef}
      onFocus={() => setTucked(false)}
      className={`sticky top-0 z-50 h-[var(--header-h)] border-b transition-[box-shadow,border-color,translate] duration-300 ease-out ${
        scrolled || mobileOpen ? "border-[var(--k-header-line)] shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)] lg:border-transparent lg:shadow-none" : "border-transparent"
      } ${hidden ? "-translate-y-[calc(100%+16px)]" : ""}`}
    >
      {/* The blur lives on its own layer: backdrop-filter on <header> would
          make it the containing block for the fixed mobile sheet. From lg up
          it fades out once the bar condenses into the pill. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-300 ${pill ? "lg:opacity-0" : ""}`}
        style={{ background: mobileOpen ? "var(--k-surface)" : "var(--k-header-bg)" }}
      />
      <a
        href="#icerik"
        className="sr-only z-[60] rounded-md bg-ink px-4 py-2 font-semibold text-surface focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        {t.skip}
      </a>
      <div
        className={`relative mx-auto flex h-full w-full max-w-page-max items-center gap-6 px-5 transition-[max-width,height,margin,padding,border-radius,box-shadow,background-color] duration-300 ease-out sm:px-6 lg:px-10 ${
          pill
            ? "lg:mt-2 lg:h-14 lg:max-w-[1180px] lg:rounded-full lg:border lg:border-[var(--k-header-line)] lg:bg-[var(--k-header-bg)] lg:px-5 lg:shadow-[0_12px_40px_-16px_rgb(0_0_0/0.35)] lg:backdrop-blur-xl"
            : ""
        }`}
      >
        {pill && (
          <span aria-hidden="true" className="absolute inset-x-8 bottom-0 hidden h-px overflow-hidden lg:block">
            <span className="k-progress h-full w-full bg-red" />
          </span>
        )}
        <Link href="/" aria-label={t.homeLabel} className={`shrink-0 rounded-md ${FOCUS}`}>
          <KerintiWordmark widthClass="w-[104px] sm:w-[116px]" eager />
        </Link>

        <div className="flex flex-1 justify-center">
          <DesktopNav pathname={pathname} />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitch />
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
            <span className="lg:max-xl:sr-only">{t.dealer}</span>
          </Link>

          <button
            ref={menuButton}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((v) => !v)}
            className={`ml-1 flex size-10 items-center justify-center rounded-full border border-line-2 text-ink transition-colors hover:bg-surface-3 lg:hidden ${FOCUS}`}
          >
            <span className="sr-only">{mobileOpen ? t.closeMenu : t.openMenu}</span>
            {mobileOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      {/* .k-progress owns display (scroll-timeline support), so visibility
          per breakpoint lives on the wrapper. */}
      <span aria-hidden="true" className={`absolute bottom-0 h-0.5 overflow-hidden ${pill ? "inset-x-0 lg:hidden" : "inset-x-0"}`}>
        <span className="k-progress h-full w-full bg-red" />
      </span>
      {mobileOpen && <MobileMenu id={mobileId} pathname={pathname} onClose={() => closeMobile(false)} />}
    </header>
  );
}
