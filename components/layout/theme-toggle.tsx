"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/**
 * Light / dark theme switch.
 *
 * The source of truth is <html data-theme>, set before first paint by
 * THEME_INIT_SCRIPT (lib/theme.ts, inlined by app/layout.tsx) from the
 * visitor's saved choice, light by default. This component only reads that
 * attribute and flips it; the choice is remembered in localStorage when
 * storage is available.
 */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const setTheme = (next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked (private mode etc.): the switch still works for this visit.
    }
  };
  return { theme, setTheme };
}

/** Round icon button for the header bar. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Aydınlık temaya geç" : "Koyu temaya geç"}
      title={dark ? "Aydınlık tema" : "Koyu tema"}
      className={`flex size-10 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-surface-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`}
    >
      {dark ? <Sun aria-hidden="true" className="size-[18px]" /> : <Moon aria-hidden="true" className="size-[18px]" />}
    </button>
  );
}

/** Labelled two-option switch for the mobile menu. */
export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
    { value: "light", label: "Aydınlık", Icon: Sun },
    { value: "dark", label: "Koyu", Icon: Moon },
  ];
  return (
    <div role="group" aria-label="Tema" className="grid grid-cols-2 gap-1 rounded-[var(--radius-sm)] bg-surface-3 p-1">
      {options.map(({ value, label, Icon }) => {
        const on = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={on}
            onClick={() => setTheme(value)}
            className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink ${
              on ? "bg-surface text-ink shadow-sm" : "text-ink-2 hover:text-ink"
            }`}
          >
            <Icon aria-hidden="true" className="size-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
