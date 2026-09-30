"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheck, LoaderCircle, Mail, Phone, Send } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import { CONTACT_TOPICS } from "@/lib/content/company";
import { SECTORS } from "@/lib/content/sectors";
import { buildMailto, submitContactForm, type ContactPayload } from "@/lib/contact-service";
import type { L } from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Field = keyof ContactPayload;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "sent" | "unavailable" | "error";

const EMPTY: ContactPayload = {
  name: "",
  company: "",
  phone: "",
  email: "",
  businessType: "",
  topic: "",
  message: "",
  consent: false,
};

type Copy = {
  errors: { name: string; phone: string; phoneFormat: string; email: string; emailFormat: string; topic: string; message: string; consent: string };
  required: string;
  requiredNote: string;
  errorCount: (n: number) => string;
  legend: string;
  name: [string, string];
  company: [string, string];
  phone: string;
  email: string;
  businessType: string;
  otherBusiness: string;
  select: string;
  topic: string;
  message: [string, string];
  consent: [string, string, string];
  sending: string;
  send: string;
  sent: string;
  unavailableTitle: string;
  unavailableBody: string;
  mail: string;
  error: (phone: string, email: string) => string;
  fallbackTopic: string;
};

const T: L<Copy> = {
  tr: {
    errors: {
      name: "Lütfen adınızı ve soyadınızı girin.",
      phone: "Lütfen telefon numaranızı girin.",
      phoneFormat: "Telefon numarası 05XX XXX XX XX biçiminde olmalı.",
      email: "Lütfen e-posta adresinizi girin.",
      emailFormat: "Geçerli bir e-posta adresi girin (örnek@firma.com).",
      topic: "Lütfen bir konu seçin.",
      message: "Lütfen mesajınızı en az 10 karakter olarak yazın.",
      consent: "Devam etmek için aydınlatma metnini onaylamanız gerekiyor.",
    },
    required: "(zorunlu)",
    requiredNote: "ile işaretli alanlar zorunludur.",
    errorCount: (n) => `Formda ${n} alan düzeltilmeli.`,
    legend: "İletişim bilgileriniz",
    name: ["Ad Soyad", "Adınızı soyadınızı girin"],
    company: ["İşletme / Firma Adı", "İşletme veya firma adınız"],
    phone: "Telefon",
    email: "E-posta",
    businessType: "İşletme Türü",
    otherBusiness: "Diğer",
    select: "Seçiniz",
    topic: "Konu",
    message: ["Mesajınız", "Mesajınızı yazın"],
    consent: ["Kişisel verilerimin işlenmesine ilişkin", "aydınlatma metnini", "okudum, kabul ediyorum."],
    sending: "Gönderiliyor…",
    send: "Mesaj Gönder",
    sent: "Mesajınız bize ulaştı. Ekibimiz en kısa sürede sizinle iletişime geçecek.",
    unavailableTitle: "Çevrimiçi form gönderimi henüz aktif değil; mesajınız iletilmedi.",
    unavailableBody: "Bilgileriniz kaybolmadı. Aşağıdaki düğmeyle mesajınızı hazır bir e-posta olarak gönderebilir ya da bizi arayabilirsiniz.",
    mail: "E-posta ile gönder",
    error: (phone, email) => `Mesajınız gönderilemedi. Lütfen tekrar deneyin ya da bize ${phone} numarasından veya ${email} adresinden ulaşın.`,
    fallbackTopic: "İletişim",
  },
  en: {
    errors: {
      name: "Please enter your full name.",
      phone: "Please enter your phone number.",
      phoneFormat: "Please enter a phone number of 10 to 13 digits.",
      email: "Please enter your e-mail address.",
      emailFormat: "Please enter a valid e-mail address (name@company.com).",
      topic: "Please choose a topic.",
      message: "Please write at least 10 characters.",
      consent: "Please confirm the privacy notice to continue.",
    },
    required: "(required)",
    requiredNote: "marks a required field.",
    errorCount: (n) => `${n} ${n === 1 ? "field needs" : "fields need"} attention.`,
    legend: "Your contact details",
    name: ["Full name", "Your first and last name"],
    company: ["Business / company", "Your business or company name"],
    phone: "Phone",
    email: "E-mail",
    businessType: "Business type",
    otherBusiness: "Other",
    select: "Select",
    topic: "Topic",
    message: ["Your message", "Write your message"],
    consent: ["I have read and accept the", "privacy notice", "on how my personal data is processed."],
    sending: "Sending…",
    send: "Send message",
    sent: "Your message has reached us. Our team will contact you shortly.",
    unavailableTitle: "Online form delivery is not active yet; your message was not sent.",
    unavailableBody: "Nothing you typed is lost. Use the button below to send it as a ready-made e-mail, or call us.",
    mail: "Send by e-mail",
    error: (phone, email) => `Your message could not be sent. Please try again, or reach us on ${phone} or at ${email}.`,
    fallbackTopic: "Contact",
  },
};

/** Order matters: the first invalid field in this order receives focus. */
const FIELD_ORDER: Field[] = ["name", "company", "phone", "email", "businessType", "topic", "message", "consent"];

function validate(v: ContactPayload, t: Copy["errors"]): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = t.name;
  const digits = v.phone.replace(/\D/g, "");
  if (!digits) e.phone = t.phone;
  else if (digits.length < 10 || digits.length > 13) e.phone = t.phoneFormat;
  if (!v.email.trim()) e.email = t.email;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = t.emailFormat;
  if (!v.topic) e.topic = t.topic;
  if (v.message.trim().length < 10) e.message = t.message;
  if (!v.consent) e.consent = t.consent;
  return e;
}

/** Reads `?konu=` so "Demo Talep Et" links can preset the topic. */
export function ContactFormFromUrl() {
  const topic = useSearchParams().get("konu") ?? "";
  return <ContactForm initialTopic={CONTACT_TOPICS.tr.some((t) => t.value === topic) ? topic : ""} />;
}

/**
 * The contact form, in the page's language.
 *
 * Validation runs on submit, then live per field once that field has been
 * blurred or a submit has been attempted — so nobody is scolded mid-typing.
 * Every error is tied to its input with aria-describedby and aria-invalid; on
 * a failed submit focus moves to the first invalid field and a summary is
 * announced. Delivery goes through lib/contact-service.ts, which reports
 * honestly when no backend is configured. Topic values stay the same in both
 * languages; the e-mail fallback to the (Turkish) team is written in Turkish.
 */
export function ContactForm({ initialTopic = "" }: { initialTopic?: string }) {
  const locale = useLocale();
  const t = T[locale];
  const topics = CONTACT_TOPICS[locale];
  const businessTypes = [...SECTORS[locale].map((s) => s.title), t.otherBusiness];
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactPayload>({ ...EMPTY, topic: initialTopic });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [sentPayload, setSentPayload] = useState<ContactPayload | null>(null);

  // A link on this same page can change ?konu= after mount. Adopt the new
  // topic without remounting, so anything already typed survives.
  const [seenTopic, setSeenTopic] = useState(initialTopic);
  if (initialTopic !== seenTopic) {
    setSeenTopic(initialTopic);
    if (initialTopic) setValues((v) => ({ ...v, topic: initialTopic }));
  }

  const errors = validate(values, t.errors);
  const visibleError = (f: Field) => (attempted || touched[f] ? errors[f] : undefined);
  const id = (f: Field) => `${uid}-${f}`;

  const set = <K extends Field>(field: K, value: ContactPayload[K]) => setValues((v) => ({ ...v, [field]: value }));
  const blur = (f: Field) => setTouched((prev) => ({ ...prev, [f]: true }));

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    const invalid = FIELD_ORDER.find((f) => errors[f]);
    if (invalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(invalid))}`)?.focus();
      return;
    }
    setStatus("submitting");
    const result = await submitContactForm(values);
    setSentPayload(values);
    setStatus(result.status);
    if (result.status === "sent") {
      setValues({ ...EMPTY });
      setTouched({});
      setAttempted(false);
    }
  }

  const errorCount = Object.keys(errors).length;
  // The e-mail goes to the Turkish team: use the Turkish topic name.
  const topicLabel = CONTACT_TOPICS.tr.find((x) => x.value === (sentPayload?.topic ?? values.topic))?.title ?? T.tr.fallbackTopic;

  const inputBase =
    "mt-1.5 block w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink placeholder:text-ink-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 disabled:bg-surface-2";
  const inputClass = (f: Field) => `${inputBase} ${visibleError(f) ? "border-brand-red" : "border-line-2 focus:border-ink"}`;

  const label = (f: Field, text: string, required = false) => (
    <label htmlFor={id(f)} className="text-sm font-medium text-ink">
      {text}
      {required && (
        <>
          <span aria-hidden="true" className="text-red"> *</span>
          <span className="sr-only"> {t.required}</span>
        </>
      )}
    </label>
  );

  const error = (f: Field) =>
    visibleError(f) ? (
      <p id={`${id(f)}-hata`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-strong">
        <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
        {visibleError(f)}
      </p>
    ) : null;

  const aria = (f: Field) => ({
    "aria-invalid": visibleError(f) ? true : undefined,
    "aria-describedby": visibleError(f) ? `${id(f)}-hata` : undefined,
  });

  const busy = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-not`}>
      <p id={`${uid}-not`} className="text-sm text-ink-3">
        <span aria-hidden="true" className="text-red">*</span> {t.requiredNote}
      </p>

      {/* Announces the error count once, after a failed submit. */}
      <div aria-live="assertive" className="sr-only">
        {attempted && errorCount > 0 ? t.errorCount(errorCount) : ""}
      </div>

      <fieldset disabled={busy} className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <legend className="sr-only">{t.legend}</legend>
        <div>
          {label("name", t.name[0], true)}
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            placeholder={t.name[1]}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            required
            className={inputClass("name")}
            {...aria("name")}
          />
          {error("name")}
        </div>
        <div>
          {label("company", t.company[0])}
          <input
            id={id("company")}
            name="company"
            autoComplete="organization"
            placeholder={t.company[1]}
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            className={inputClass("company")}
          />
        </div>
        <div>
          {label("phone", t.phone, true)}
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="05XX XXX XX XX"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            required
            className={inputClass("phone")}
            {...aria("phone")}
          />
          {error("phone")}
        </div>
        <div>
          {label("email", t.email, true)}
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={locale === "en" ? "name@company.com" : "ornek@firma.com"}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            required
            className={inputClass("email")}
            {...aria("email")}
          />
          {error("email")}
        </div>
        <div>
          {label("businessType", t.businessType)}
          <select
            id={id("businessType")}
            name="businessType"
            value={values.businessType}
            onChange={(e) => set("businessType", e.target.value)}
            className={inputClass("businessType")}
          >
            <option value="">{t.select}</option>
            {businessTypes.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          {label("topic", t.topic, true)}
          <select
            id={id("topic")}
            name="topic"
            value={values.topic}
            onChange={(e) => set("topic", e.target.value)}
            onBlur={() => blur("topic")}
            required
            className={inputClass("topic")}
            {...aria("topic")}
          >
            <option value="">{t.select}</option>
            {topics.map((x) => (
              <option key={x.value} value={x.value}>
                {x.title}
              </option>
            ))}
          </select>
          {error("topic")}
        </div>
        <div className="sm:col-span-2">
          {label("message", t.message[0], true)}
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            placeholder={t.message[1]}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
            required
            className={`${inputClass("message")} resize-y`}
            {...aria("message")}
          />
          {error("message")}
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id={id("consent")}
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              onBlur={() => blur("consent")}
              required
              className="mt-0.5 size-5 shrink-0 accent-brand-red"
              {...aria("consent")}
            />
            <label htmlFor={id("consent")} className="text-sm text-ink-2">
              {t.consent[0]}{" "}
              <Link href="/kvkk" target="_blank" className="font-semibold text-ink underline underline-offset-2 hover:text-red">
                {t.consent[1]}
              </Link>{" "}
              {t.consent[2]}
              <span aria-hidden="true" className="text-red"> *</span>
            </label>
          </div>
          {error("consent")}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={busy}
        aria-disabled={busy}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-red-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red disabled:cursor-wait disabled:opacity-75"
      >
        {busy ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            {t.sending}
          </>
        ) : (
          <>
            {t.send}
            <Send aria-hidden="true" className="size-4" />
          </>
        )}
      </button>

      <div aria-live="polite" className="mt-4">
        {status === "sent" && (
          <p role="status" className="flex gap-2.5 rounded-lg border border-line bg-surface-2 p-4 text-sm text-ink">
            <CircleCheck aria-hidden="true" className="size-5 shrink-0" />
            {t.sent}
          </p>
        )}
        {status === "unavailable" && sentPayload && (
          <div role="status" className="rounded-lg border border-line-2 bg-surface-2 p-4 text-sm text-ink">
            <p className="flex gap-2.5 font-medium">
              <CircleAlert aria-hidden="true" className="size-5 shrink-0 text-red" />
              {t.unavailableTitle}
            </p>
            <p className="mt-1.5 pl-7.5 text-ink-2">{t.unavailableBody}</p>
            <div className="mt-3 flex flex-wrap gap-2 pl-7.5">
              <a
                href={buildMailto(sentPayload, topicLabel)}
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 font-semibold text-surface hover:bg-ink-2"
              >
                <Mail aria-hidden="true" className="size-4" />
                {t.mail}
              </a>
              <a href={SITE.contact.phoneHref} className="inline-flex items-center gap-2 rounded-lg border border-line-2 px-4 py-2 font-semibold hover:bg-surface-3">
                <Phone aria-hidden="true" className="size-4" />
                {SITE.contact.phoneDisplay}
              </a>
            </div>
          </div>
        )}
        {status === "error" && (
          <p role="alert" className="flex gap-2.5 rounded-lg border border-danger/40 bg-red-soft p-4 text-sm text-ink">
            <CircleAlert aria-hidden="true" className="size-5 shrink-0 text-danger" />
            {t.error(SITE.contact.phoneDisplay, SITE.contact.email)}
          </p>
        )}
      </div>
    </form>
  );
}
