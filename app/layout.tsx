import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { PageMotion } from "@/components/motion/page-motion";
import { getLocale } from "@/lib/i18n-server";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

/*
 * Brand typeface, matching the live reference site (web.kerinti.com.tr).
 *
 * `latin-ext` is required, not optional: the site is Turkish and the copy
 * relies on ş, ğ, ı, İ, ç and ö. Without it those glyphs fall back to a
 * different face mid-word.
 */
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});


export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: { default: "Kerinti Soft", template: "%s | Kerinti Soft" },
    description:
      locale === "en"
        ? "Kerinti Soft builds neXa sys for order management and nexus for business management."
        : "Kerinti Soft; sipariş yönetimi için neXa sys, iş yönetimi için nexus yazılımlarını geliştirir.",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return (
    // Light is the default theme. The inline script swaps in a saved choice
    // before first paint, which is why hydration may see a different value.
    <html lang={locale} data-theme="light" suppressHydrationWarning className={manrope.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="bg-surface font-sans text-ink">
        <LocaleProvider locale={locale}>
          <SiteHeader />
          <main id="icerik" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <SiteFooter />
          <PageMotion />
        </LocaleProvider>
      </body>
    </html>
  );
}
