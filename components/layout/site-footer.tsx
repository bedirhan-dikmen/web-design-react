import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { KerintiWordmark } from "@/components/ui/kerinti-wordmark";
import { Container } from "@/components/ui/primitives";
import { FOOTER_GROUPS, SITE } from "@/lib/site";

/**
 * Site-wide footer, following the reference hierarchy: brand, link groups,
 * contact, then a copyright bar. Contact data and links come from lib/site.ts;
 * social icons render only when real profile URLs exist there.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const { contact } = SITE;

  return (
    <footer className="border-t border-line bg-[var(--k-footer-bg)] text-ink">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-[1.3fr_repeat(3,minmax(0,0.8fr))_1.4fr] lg:gap-8 lg:py-16">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Link href="/" aria-label="Kerinti — ana sayfa" className="inline-block">
            <KerintiWordmark />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
            İşletmeniz için geliştirilen akıllı yazılım çözümleri: neXa sys sipariş
            yönetimi ve nexus iş yönetim platformu.
          </p>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-semibold">{group.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h2 className="text-sm font-semibold">İletişim</h2>
          <address className="mt-3 space-y-2.5 text-sm not-italic text-ink-2">
            <p className="flex gap-2.5">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" />
              <span>{contact.address.short}</span>
            </p>
            <p className="flex gap-2.5">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" />
              <a href={contact.phoneHref} className="hover:text-ink">
                {contact.phoneDisplay}
              </a>
            </p>
            <p className="flex gap-2.5">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-3" />
              <a href={`mailto:${contact.email}`} className="break-all hover:text-ink">
                {contact.email}
              </a>
            </p>
          </address>
          {SITE.social.length > 0 && (
            <ul className="mt-5 flex gap-3">
              {SITE.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-2 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-5 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. Tüm hakları saklıdır.
          </p>
          <p>{SITE.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
