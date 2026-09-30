import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from "./i18n";

/**
 * The visitor's language, from the cookie the header switch sets. Server
 * components and generateMetadata call this; client components read the
 * same value through useLocale() (components/i18n/locale-provider.tsx).
 *
 * Reading cookies opts the route into dynamic rendering, which is intended:
 * the language must be right on the first byte.
 */
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
