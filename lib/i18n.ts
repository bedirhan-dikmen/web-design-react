/**
 * Site languages. Turkish is the default; English is offered from the
 * header switch. The visitor's choice lives in a cookie so the server can
 * render the right language on the first byte (see lib/i18n-server.ts);
 * URLs stay the same in both languages.
 *
 * Content modules keep both languages side by side as `L<T>` pairs
 * ({ tr, en }) so a missing translation is a type error, not a blank.
 */

export type Locale = "tr" | "en";
export const LOCALES: Locale[] = ["tr", "en"];
export const DEFAULT_LOCALE: Locale = "tr";
export const LOCALE_COOKIE = "kerinti-lang";

/** A value in both languages. */
export type L<T> = Record<Locale, T>;

export function isLocale(value: unknown): value is Locale {
  return value === "tr" || value === "en";
}

/** BCP 47 tag for Intl and <html lang>. */
export const LOCALE_TAG: L<string> = { tr: "tr-TR", en: "en-GB" };
