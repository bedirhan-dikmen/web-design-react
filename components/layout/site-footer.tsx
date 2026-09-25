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
    <footer className="bg-night text-white">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-[1.3fr_repeat(3,minmax(0,0.8fr))_1.4fr] lg:gap-8 lg:py-16">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Link href="/" aria-label="Kerinti — ana sayfa" className="inline-block">
            <KerintiWordmark />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
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
                    className="text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
          <address className="mt-3 space-y-2.5 text-sm not-italic text-white/65">
            <p className="flex gap-2.5">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white/80" />
              <span>{contact.address.short}</span>
            </p>
            <p className="flex gap-2.5">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white/80" />
              <a href={contact.phoneHref} className="hover:text-white">
                {contact.phoneDisplay}
              </a>
            </p>
            <p className="flex gap-2.5">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-white/80" />
              <a href={`mailto:${contact.email}`} className="break-all hover:text-white">
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
                    className="text-sm text-white/65 hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. Tüm hakları saklıdır.
          </p>
          <p>{SITE.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
