import type { Metadata, Viewport } from "next";
import { Caveat, Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

/*
 * Placeholder typeface for the foundation phase.
 *
 * `latin-ext` is required, not optional: the site is Turkish and the copy
 * relies on ş, ğ, ı, İ, ç and ö. Without it those glyphs fall back to a
 * different face mid-word. The real brand typeface is a later decision.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
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
    <html lang="tr" className={`${inter.variable} ${caveat.variable}`}>
      <body className="font-sans text-slate-900">
        <main id="icerik">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
