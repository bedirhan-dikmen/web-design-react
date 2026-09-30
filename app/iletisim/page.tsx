import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarClock, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { ContactForm, ContactFormFromUrl } from "@/components/contact/contact-form";
import { XStarfield } from "@/components/home/x-starfield";
import { EditorialHero } from "@/components/layout/editorial-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { RequestFlowBoard } from "@/components/stages/request-flow-board";
import { ButtonLink, Container, IconTile, SectionHeader } from "@/components/ui/primitives";
import { FAQS } from "@/lib/content/company";
import type { L } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { CONTACT_FORM_HREF, DIRECTIONS_HREF, MAP_EMBED_SRC, SITE } from "@/lib/site";

/**
 * Contact page: the editorial hero with the request-flow stage over the
 * homepage's moving x starfield, the contact channels, the form and the
 * office card side by side at equal height (the office card carries a live
 * Google Maps view of the address), then the questions in one column. No
 * closing call to action: the page is the call to action.
 */

type Copy = {
  metaTitle: string;
  metaDescription: string;
  aria: string;
  eyebrow: string;
  headline: [string, string];
  description: [string, string];
  primary: string;
  secondary: string;
  asideLabel: string;
  stageLabel: string;
  caption: [string, string];
  stageDescription: string;
  linksLabel: string;
  links: [string, string, string];
  footer: { left: string; scroll: string };
  channelsTitle: string;
  channelsLead: string;
  channels: { phone: [string, string]; email: [string, string]; address: string; hours: [string, string] };
  formTitle: string;
  formLead: string;
  officeTitle: string;
  officeLead: string;
  mapTitle: string;
  directions: string;
  newTab: string;
  meeting: [string, string];
  sectionLabel: string;
  faqTitle: string;
  faqLead: string;
};

const T: L<Copy> = {
  tr: {
    metaTitle: "İletişim",
    metaDescription: "Kerinti Soft ile iletişime geçin: demo talebi, satış öncesi bilgi, teknik destek ve iş birliği.",
    aria: "Kerinti Soft iletişim",
    eyebrow: "KERİNTİ / İLETİŞİM",
    headline: ["Konuşarak", "başlayalım."],
    description: ["Demo, destek ya da iş birliği.", "Doğru ekibe ulaşın."],
    primary: "Mesaj gönderin",
    secondary: "Bizi arayın",
    asideLabel: "Yol tarifi alın",
    stageLabel: "KERİNTİ / TALEP AKIŞI",
    caption: ["Mesajınız,", "doğru ekibe."],
    stageDescription: "Bir iletişim talebinin alındı, ekibe iletildi ve görüşme planlandı adımlarından geçişini gösteren animasyon.",
    linksLabel: "İletişim kanalları",
    links: ["Telefon", "E-posta", "Mesaj formu"],
    footer: { left: "KERİNTİ YAZILIM", scroll: "İletişim kanallarını görün" },
    channelsTitle: "İletişim kanalları",
    channelsLead: "Bize dilediğiniz kanaldan ulaşabilirsiniz.",
    channels: {
      phone: ["Telefon", "Sorularınız için bizi arayabilirsiniz."],
      email: ["E-posta", "Soru, talep ve görüşleriniz için."],
      address: "Adres",
      hours: ["Çalışma saatleri", "Mesai saatleri içinde dönüş yapıyoruz."],
    },
    formTitle: "Bize mesaj gönderin",
    formLead: "Formu doldurun, ekibimiz sizinle iletişime geçsin.",
    officeTitle: "Ofisimiz ve konum",
    officeLead: "Bizi ziyaret edebilir ya da haritadan yol tarifi alabilirsiniz.",
    mapTitle: "Kerinti Soft ofisinin haritadaki konumu",
    directions: "Yol tarifi al",
    newTab: " (Google Haritalar, yeni sekmede açılır)",
    meeting: ["Görüşme", "Yüz yüze veya online görüşme için randevu alabilirsiniz."],
    sectionLabel: "Mesaj ve ofis bilgileri",
    faqTitle: "Sıkça sorulan sorular",
    faqLead: "En çok merak edilen soruların yanıtları.",
  },
  en: {
    metaTitle: "Contact",
    metaDescription: "Get in touch with Kerinti Soft: demo requests, pre-sales information, technical support and partnerships.",
    aria: "Contact Kerinti Soft",
    eyebrow: "KERINTI / CONTACT",
    headline: ["Let’s start", "with a talk."],
    description: ["Demo, support or partnership.", "Reach the right team."],
    primary: "Send a message",
    secondary: "Call us",
    asideLabel: "Get directions",
    stageLabel: "KERINTI / REQUEST FLOW",
    caption: ["Your message,", "to the right team."],
    stageDescription: "Animation showing a contact request being received, passed to the team and a meeting being scheduled.",
    linksLabel: "Contact channels",
    links: ["Phone", "E-mail", "Message form"],
    footer: { left: "KERINTI SOFTWARE", scroll: "See the contact channels" },
    channelsTitle: "Contact channels",
    channelsLead: "Reach us through whichever channel suits you.",
    channels: {
      phone: ["Phone", "Call us with your questions."],
      email: ["E-mail", "For questions, requests and feedback."],
      address: "Address",
      hours: ["Office hours", "We reply within office hours."],
    },
    formTitle: "Send us a message",
    formLead: "Fill in the form and our team will get in touch.",
    officeTitle: "Our office",
    officeLead: "Visit us, or get directions from the map.",
    mapTitle: "Location of the Kerinti Soft office on the map",
    directions: "Get directions",
    newTab: " (Google Maps, opens in a new tab)",
    meeting: ["Meetings", "Book a face-to-face or online meeting."],
    sectionLabel: "Message and office details",
    faqTitle: "Frequently asked questions",
    faqLead: "Answers to the questions we hear most.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const t = T[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = T[locale];
  const { contact } = SITE;

  const channels = [
    { title: t.channels.phone[0], value: contact.phoneDisplay, href: contact.phoneHref, note: t.channels.phone[1], icon: Phone },
    { title: t.channels.email[0], value: contact.email, href: `mailto:${contact.email}`, note: t.channels.email[1], icon: Mail },
    { title: t.channels.address, value: contact.address.short, href: DIRECTIONS_HREF, note: contact.address.lines.join(", "), icon: MapPin },
    { title: t.channels.hours[0], value: contact.hours[locale], note: t.channels.hours[1], icon: Clock },
  ];

  return (
    <>
      <XStarfield />
      <div className="relative z-[1]">
        <EditorialHero
          starfield
          ariaLabel={t.aria}
          eyebrow={t.eyebrow}
          headline={
            <>
              {t.headline[0]}
              <br />
              <em>{t.headline[1]}</em>
            </>
          }
          description={
            <>
              {t.description[0]}
              <br />
              {t.description[1]}
            </>
          }
          primary={{ label: t.primary, href: CONTACT_FORM_HREF }}
          secondary={{ label: t.secondary, href: contact.phoneHref }}
          aside={{ lead: contact.address.short, label: t.asideLabel, href: DIRECTIONS_HREF }}
          stageLabel={t.stageLabel}
          stage={<RequestFlowBoard />}
          caption={
            <>
              {t.caption[0]} <em>{t.caption[1]}</em>
            </>
          }
          stageDescription={t.stageDescription}
          linksLabel={t.linksLabel}
          links={[
            { label: t.links[0], href: contact.phoneHref },
            { label: t.links[1], href: `mailto:${contact.email}` },
            { label: t.links[2], href: "#iletisim-formu" },
          ]}
          footer={{ left: t.footer.left, scrollHref: "#kanallar", scrollLabel: t.footer.scroll, right: contact.hours[locale].toLocaleUpperCase(locale) }}
        />

        {/* Contact channels */}
        <section aria-labelledby="kanallar" className="py-12 lg:py-16">
          <Container>
            <SectionHeader id="kanallar" title={t.channelsTitle} lead={t.channelsLead} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {channels.map((c) => (
                <li key={c.title} className="flex gap-4 rounded-xl border border-line bg-surface p-5">
                  <IconTile>
                    <c.icon className="size-7" strokeWidth={1.5} />
                  </IconTile>
                  <div className="min-w-0">
                    <h3 className="font-bold text-ink">{c.title}</h3>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-0.5 block break-words font-semibold text-ink hover:text-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-semibold text-ink">{c.value}</p>
                    )}
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{c.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Form + office: equal height side by side from lg up. */}
        <section aria-label={t.sectionLabel} className="pb-12 lg:pb-16">
          <Container className="grid gap-6 lg:grid-cols-2">
            <div id="iletisim-formu" className="flex scroll-mt-[calc(var(--header-h)+16px)] flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-ink">{t.formTitle}</h2>
              <p className="mt-1 text-ink-2">{t.formLead}</p>
              <div className="mt-5">
                {/* useSearchParams needs a Suspense boundary; the fallback is
                    the same form, so the prerendered HTML is complete. */}
                <Suspense fallback={<ContactForm />}>
                  <ContactFormFromUrl />
                </Suspense>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-ink">{t.officeTitle}</h2>
              <p className="mt-1 text-ink-2">{t.officeLead}</p>

              {/* Google Maps embed (keyless). Grows to fill the card so both
                  cards end at the same line. See the cookie policy. */}
              <div className="relative mt-5 min-h-[280px] flex-1 overflow-hidden rounded-xl border border-line bg-surface-2">
                <iframe
                  title={t.mapTitle}
                  src={MAP_EMBED_SRC}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                />
              </div>

              <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink">Kerinti Soft</p>
                  <address className="mt-1 text-sm not-italic leading-relaxed text-ink-2">
                    {contact.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
                <ButtonLink href={DIRECTIONS_HREF} icon={<Navigation aria-hidden="true" className="size-4" />}>
                  {t.directions}
                  <span className="sr-only">{t.newTab}</span>
                </ButtonLink>
              </div>

              <p className="mt-5 flex gap-2.5 border-t border-line pt-4 text-sm text-ink-2">
                <CalendarClock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" strokeWidth={1.8} />
                <span>
                  <span className="font-semibold text-ink">{t.meeting[0]}: </span>
                  {t.meeting[1]}
                </span>
              </p>
            </div>
          </Container>
        </section>

        {/* FAQ, one column */}
        <section aria-labelledby="sss" className="border-t border-line py-12 lg:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <SectionHeader id="sss" title={t.faqTitle} lead={t.faqLead} />
              <div className="mt-8">
                <FaqAccordion items={FAQS[locale]} />
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
