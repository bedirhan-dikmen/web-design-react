import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { KerintiWordmark } from "@/components/ui/kerinti-wordmark";
import { Container } from "@/components/ui/primitives";
import type { L } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { DIRECTIONS_HREF, footerGroups, legalLinks, SITE } from "@/lib/site";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const T: L<{ slogan: [string, string]; contact: string; rights: string; legal: string; top: string; home: string }> = {
  tr: {
    slogan: ["Bu işler", "bitecek."],
    contact: "İletişim",
    rights: "Tüm hakları saklıdır.",
    legal: "Yasal metinler",
    top: "Başa dön",
    home: "Kerinti — ana sayfa",
  },
  en: {
    slogan: ["We get", "it done."],
    contact: "Contact",
    rights: "All rights reserved.",
    legal: "Legal",
    top: "Back to top",
    home: "Kerinti — home",
  },
};

/**
 * Site-wide footer, the same on every page (rendered once by
 * app/layout.tsx), on the same 1280px box as the header:
 *
 *   1. brand (with the logo's own slogan, "bu işler bitecek") + link groups
 *      + contact, in one compact row;
 *   2. a bar with copyright, the legal texts and "back to top".
 *
 * Contact data and links come from lib/site.ts; social links render only
 * when real profile URLs exist there.
 */
export async function SiteFooter() {
  const locale = await getLocale();
  const t = T[locale];
  const year = new Date().getFullYear();
  const { contact } = SITE;

  return (
    <footer className="relative z-[1] border-t border-line bg-[var(--k-footer-bg)] text-ink">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.6fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] lg:gap-8 lg:py-10">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Link href="/" aria-label={t.home} className={`inline-block rounded-md ${FOCUS}`}>
            <KerintiWordmark widthClass="w-[108px]" />
          </Link>
          <p className="k-accent mt-3 text-2xl font-semibold tracking-[-0.03em]">
            {t.slogan[0]} <em>{t.slogan[1]}</em>
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-2">{SITE.tagline[locale]}</p>
          {SITE.social.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {SITE.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block rounded-full border border-line-2 px-3 py-1.5 text-xs font-semibold text-ink-2 hover:text-ink ${FOCUS}`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {footerGroups(locale).map((group) => (
          <nav key={group.title} aria-label={group.title} className="col-span-2 sm:col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-3">{group.title}</h2>
            {/* Long groups run in two columns so the footer stays low. */}
            <ul className={`mt-3 gap-x-6 text-sm ${group.links.length > 4 ? "columns-2 [&>li]:mb-2" : "flex flex-wrap gap-y-2 sm:block sm:space-y-2"}`}>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`text-ink-2 transition-colors hover:text-ink ${FOCUS}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-3">{t.contact}</h2>
          <address className="mt-3 space-y-2 text-sm not-italic text-ink-2">
            <a href={DIRECTIONS_HREF} target="_blank" rel="noopener noreferrer" className={`flex gap-2.5 hover:text-ink ${FOCUS}`}>
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" />
              <span>{contact.address.short}</span>
            </a>
            <a href={contact.phoneHref} className={`flex gap-2.5 hover:text-ink ${FOCUS}`}>
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" />
              {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`} className={`flex gap-2.5 break-all hover:text-ink ${FOCUS}`}>
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" />
              {contact.email}
            </a>
            <p className="pl-6.5 text-xs text-ink-3">{contact.hours[locale]}</p>
          </address>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-4 text-xs text-ink-3 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name}. {t.rights}
          </p>
          <nav aria-label={t.legal}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks(locale).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`hover:text-ink ${FOCUS}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#icerik" className={`inline-flex items-center gap-1 font-semibold text-ink-2 hover:text-ink ${FOCUS}`}>
                  {t.top}
                  <ArrowUp aria-hidden="true" className="size-3.5" />
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
