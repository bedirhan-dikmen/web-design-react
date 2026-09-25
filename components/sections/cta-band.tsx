import Image from "next/image";
import { Phone } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { CONTACT_FORM_HREF, DEMO_HREF, SITE } from "@/lib/site";

const DISH = {
  src: "/images/cta/plated-dish-1448x1086.png",
  width: 1448,
  height: 1086,
};

/**
 * The dark call-to-action band above the footer (night palette since the
 * 2026-09 redesign; it was navy before).
 *
 * The plated-dish photograph (1448x1086) sits on the right and dissolves into
 * the navy through a mask, as in the references. It renders at most ~560 CSS
 * px wide, so the source carries ~2.6x density. It is decoration only: the
 * band's message is all DOM text, and on narrow screens the image is dropped
 * rather than squeezed.
 */
export function CtaBand({
  badge = "neXa",
  badgeNote = "Restoran Sipariş Yönetim Sistemi",
  title = "İşletmenizi bir adım öteye taşıyın.",
  lead = "Siz de neXa ile tanışın, restoranınızın potansiyelini keşfedin.",
  secondary = "contact",
  image = true,
}: {
  badge?: string;
  badgeNote?: string;
  title?: string;
  lead?: string;
  /** The second button: a link to the contact form, or a phone call. */
  secondary?: "contact" | "call";
  /** The restaurant dish photo; off for company-level pages. */
  image?: boolean;
}) {
  return (
    <section
      aria-labelledby="cta-band-title"
      className="relative isolate overflow-hidden bg-night text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(50%_120%_at_0%_0%,rgb(216_0_23/0.28),transparent_70%),linear-gradient(100deg,#111116_0%,#1b1b22_100%)]"
      />
      {image && (
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] max-w-[560px] md:block"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 38%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 38%)",
        }}
      >
        <Image
          src={DISH.src}
          width={DISH.width}
          height={DISH.height}
          alt=""
          // Never wider than the 560px slot. Below md the slot is display:none
          // and the lazy image is never fetched.
          sizes="560px"
          quality={88}
          className="h-full w-full object-cover object-[35%_55%]"
        />
        <p className="absolute right-6 top-5 hidden rotate-[-8deg] font-script text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] lg:block">
          Lezzetle
          <br />
          Büyüyün.
        </p>
      </div>
      )}

      <Container className={`grid items-center gap-7 py-12 md:grid-cols-[minmax(0,1fr)_auto] lg:py-14 ${image ? "md:pr-[42%] xl:pr-[36%]" : ""}`}>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/35 px-3 py-0.5 text-sm font-semibold">
              {badge}
            </span>
            <span className="text-sm text-white/75">{badgeNote}</span>
          </div>
          <h2
            id="cta-band-title"
            className="mt-4 text-balance text-[clamp(1.6rem,2.6vw,2.25rem)] font-bold leading-tight tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-2 text-white/80 lg:text-[1.0625rem]">{lead}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={DEMO_HREF} size="lg" arrow>
            Demo Talep Et
          </ButtonLink>
          {secondary === "call" ? (
            <ButtonLink
              href={SITE.contact.phoneHref}
              variant="outline-light"
              size="lg"
              icon={<Phone aria-hidden="true" className="size-4" />}
            >
              Bizi Ara
            </ButtonLink>
          ) : (
            <ButtonLink href={CONTACT_FORM_HREF} variant="light" size="lg">
              Bize Ulaşın
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
