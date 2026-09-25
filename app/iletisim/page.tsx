import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import {
  CalendarClock,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { ContactForm, ContactFormFromUrl } from "@/components/contact/contact-form";
import { EditorialHero } from "@/components/layout/editorial-hero";
import { RequestFlowBoard } from "@/components/stages/request-flow-board";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { ButtonLink, Container, IconTile, SectionHeader } from "@/components/ui/primitives";
import { CONTACT_TOPICS, FAQS } from "@/lib/content/company";
import { CONTACT_FORM_HREF, DIRECTIONS_HREF, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Kerinti Soft ile iletişime geçin: demo talebi, satış öncesi bilgi, teknik destek ve iş birliği.",
};

const { contact } = SITE;

const CHANNELS = [
  {
    title: "Telefon",
    value: contact.phoneDisplay,
    href: contact.phoneHref,
    note: "Sorularınız için bizi hemen arayabilirsiniz.",
    icon: Phone,
  },
  {
    title: "E-posta",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: "Tüm soru, talep ve görüşleriniz için bize e-posta gönderebilirsiniz.",
    icon: Mail,
  },
  {
    title: "Adres",
    value: contact.address.short,
    href: DIRECTIONS_HREF,
    note: contact.address.lines.join(", "),
    icon: MapPin,
  },
  {
    title: "Çalışma Saatleri",
    value: contact.hours,
    note: "Mesai saatleri içerisinde size yardımcı olmaktan memnuniyet duyarız.",
    icon: Clock,
  },
];

export default function ContactPage() {
  return (
    <>
      <EditorialHero
        ariaLabel="Kerinti Soft iletişim"
        eyebrow="KERİNTİ / İLETİŞİM"
        headline={
          <>
            Konuşarak
            <br />
            <em>başlayalım.</em>
          </>
        }
        description={
          <>
            Demo, destek ya da iş birliği.
            <br />
            Doğru ekibe ulaşın.
          </>
        }
        primary={{ label: "Mesaj gönderin", href: CONTACT_FORM_HREF }}
        secondary={{ label: "Bizi arayın", href: SITE.contact.phoneHref }}
        aside={{
          lead: SITE.contact.address.short,
          label: "Yol tarifi alın",
          href: DIRECTIONS_HREF,
        }}
        stageLabel="KERİNTİ / TALEP AKIŞI"
        stage={<RequestFlowBoard />}
        caption={
          <>
            Mesajınız, <em>doğru ekibe.</em>
          </>
        }
        stageDescription="Bir iletişim talebinin alındı, ekibe iletildi ve görüşme planlandı adımlarından geçişini gösteren animasyon."
        linksLabel="İletişim kanalları"
        links={[
          { label: "Telefon", href: SITE.contact.phoneHref },
          { label: "E-posta", href: `mailto:${SITE.contact.email}` },
          { label: "Mesaj formu", href: "#iletisim-formu" },
        ]}
        footer={{
          left: "KERİNTİ YAZILIM / NEXA",
          scrollHref: "#kanallar",
          scrollLabel: "İletişim kanallarını görün",
          right: "HAFTA İÇİ 09:00 – 18:00.",
        }}
      />

      <div className="bg-surface">
        {/* İletişim Kanalları */}
        <section aria-labelledby="kanallar" className="pt-14 pb-10 lg:pt-16">
          <Container>
            <SectionHeader
              id="kanallar"
              title="İletişim Kanalları"
              lead="Bize dilediğiniz kanaldan ulaşabilirsiniz. Ekibimiz en kısa sürede size dönüş yapacaktır."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {CHANNELS.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.title} className="flex gap-4 rounded-xl border border-slate-200 p-5">
                    <IconTile>
                      <Icon className="size-8" strokeWidth={1.5} />
                    </IconTile>
                    <div className="min-w-0">
                      <h3 className="font-bold text-ink">{c.title}</h3>
                      {c.href ? (
                        <a
                          href={c.href}
                          {...(c.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="mt-0.5 block break-words font-semibold text-ink hover:text-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 font-semibold text-ink">{c.value}</p>
                      )}
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{c.note}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>

        {/* Form + office */}
        <section aria-label="Mesaj ve ofis bilgileri" className="py-10">
          <Container className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div
              id="iletisim-formu"
              className="scroll-mt-6 rounded-2xl border border-slate-200 p-6 sm:p-8"
            >
              <h2 className="text-2xl font-bold text-ink">Bize Mesaj Gönderin</h2>
              <p className="mt-1 text-slate-600">
                Formu doldurun, ekibimiz en kısa sürede sizinle iletişime geçsin.
              </p>
              <div className="mt-5">
                {/* useSearchParams needs a Suspense boundary; the fallback is
                    the same form, so the prerendered HTML is complete. */}
                <Suspense fallback={<ContactForm />}>
                  <ContactFormFromUrl />
                </Suspense>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-ink">Ofisimiz &amp; Konum</h2>
              <p className="mt-1 text-slate-600">
                Bizi ziyaret edebilir veya harita üzerinden yol tarifi alabilirsiniz.
              </p>

              <div className="mt-6 rounded-xl bg-[radial-gradient(120%_120%_at_0%_0%,#4a0d17,#111116_70%)] p-6 text-white">
                <MapPin aria-hidden="true" className="size-8 text-red" strokeWidth={1.8} />
                <p className="mt-3 text-lg font-semibold">Kerinti Soft</p>
                <address className="mt-1 text-sm not-italic leading-relaxed text-white/80">
                  {contact.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <ButtonLink
                  href={DIRECTIONS_HREF}
                  variant="light"
                  className="mt-5"
                  icon={<Navigation aria-hidden="true" className="size-4" />}
                >
                  Yol Tarifi Al
                  <span className="sr-only"> (Google Haritalar, yeni sekmede açılır)</span>
                </ButtonLink>
              </div>

              <dl className="mt-6 divide-y divide-slate-100 text-sm">
                {[
                  { icon: Phone, term: "Telefon", detail: <a href={contact.phoneHref} className="hover:text-red">{contact.phoneDisplay}</a> },
                  { icon: Mail, term: "E-posta", detail: <a href={`mailto:${contact.email}`} className="break-all hover:text-red">{contact.email}</a> },
                  { icon: Clock, term: "Çalışma Saatleri", detail: contact.hours },
                  {
                    icon: CalendarClock,
                    term: "Toplantı",
                    detail:
                      "Yüz yüze veya online toplantı için randevu alabilirsiniz. Sizi ofisimizde ağırlamaktan memnuniyet duyarız.",
                  },
                ].map(({ icon: Icon, term, detail }) => (
                  <div key={term} className="grid grid-cols-[1.5rem_7.5rem_minmax(0,1fr)] items-start gap-2 py-3.5 max-sm:grid-cols-[1.5rem_minmax(0,1fr)]">
                    <Icon aria-hidden="true" className="size-5 text-red" strokeWidth={1.8} />
                    <dt className="font-semibold text-ink">{term}</dt>
                    <dd className="text-slate-600 max-sm:col-start-2">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        {/* Size Nasıl Yardımcı Olabiliriz? */}
        <section aria-labelledby="yardim" className="py-10">
          <Container>
            <SectionHeader
              id="yardim"
              title="Size Nasıl Yardımcı Olabiliriz?"
              lead="İhtiyacınıza en uygun başlığı seçin; form konu seçili olarak açılır."
            />
            <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {CONTACT_TOPICS.map((t) => {
                const Icon = t.icon;
                return (
                  <li key={t.value}>
                    <Link
                      href={`/iletisim?konu=${t.value}#iletisim-formu`}
                      className="group flex h-full items-center gap-4 rounded-xl border border-slate-200 p-5 transition-colors hover:border-brand-red/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                    >
                      <IconTile>
                        <Icon className="size-8" strokeWidth={1.5} />
                      </IconTile>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-ink">{t.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                          {t.text}
                        </span>
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className="size-5 shrink-0 text-red transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>

        {/* SSS */}
        <section aria-labelledby="sss" className="pt-10 pb-14 lg:pb-16">
          <Container>
            <SectionHeader id="sss" title="Sıkça Sorulan Sorular" lead="En çok merak edilen soruları yanıtladık." />
            <div className="mt-8">
              <FaqAccordion items={FAQS} />
            </div>
          </Container>
        </section>
      </div>

      <CtaBand
        title="Kerinti Soft ile iletişime geçin."
        secondary="call"
      />
    </>
  );
}
