import type { Metadata, Viewport } from "next";
import { Caveat, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageMotion } from "@/components/motion/page-motion";
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

/*
 * Handwriting face for the hero wall script. The approved target shows a
 * brush-marker hand; no brand handwriting asset exists, so this is a close
 * temporary stand-in rendered as DOM text — which stays crisp at any
 * resolution rather than being baked into a raster.
 *
 * latin-ext is required for the Turkish glyphs in "Lezzetle isletmeler icin
 * Akilli Cozumler".
 */
const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Kerinti Soft", template: "%s | Kerinti Soft" },
  description: "Restoran ve yeme-içme işletmeleri için dijital çözümler.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Light is the default theme. The inline script swaps in a saved choice
    // before first paint, which is why hydration may see a different value.
    <html lang="tr" data-theme="light" suppressHydrationWarning className={`${manrope.variable} ${caveat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="bg-surface font-sans text-ink">
        <SiteHeader />
        <main id="icerik" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <PageMotion />
      </body>
    </html>
  );
}
