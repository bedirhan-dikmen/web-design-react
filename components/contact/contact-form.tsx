"use client";

import { useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheck, LoaderCircle, Mail, Phone, Send } from "lucide-react";
import { CONTACT_TOPICS } from "@/lib/content/company";
import { SECTORS } from "@/lib/content/sectors";
import {
  buildMailto,
  submitContactForm,
  type ContactPayload,
} from "@/lib/contact-service";
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

const BUSINESS_TYPES = [...SECTORS.map((s) => s.title), "Diğer"];

/** Order matters: the first invalid field in this order receives focus. */
const FIELD_ORDER: Field[] = ["name", "company", "phone", "email", "businessType", "topic", "message", "consent"];

function validate(v: ContactPayload): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Lütfen adınızı ve soyadınızı girin.";
  const digits = v.phone.replace(/\D/g, "");
  if (!digits) e.phone = "Lütfen telefon numaranızı girin.";
  else if (digits.length < 10 || digits.length > 13)
    e.phone = "Telefon numarası 05XX XXX XX XX biçiminde olmalı.";
  if (!v.email.trim()) e.email = "Lütfen e-posta adresinizi girin.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "Geçerli bir e-posta adresi girin (örnek@firma.com).";
  if (!v.topic) e.topic = "Lütfen bir konu seçin.";
  if (v.message.trim().length < 10) e.message = "Lütfen mesajınızı en az 10 karakter olarak yazın.";
  if (!v.consent) e.consent = "Devam etmek için aydınlatma metnini onaylamanız gerekiyor.";
  return e;
}

/** Reads `?konu=` so topic cards and "Demo Talep Et" links can preset it. */
export function ContactFormFromUrl() {
  const topic = useSearchParams().get("konu") ?? "";
  return <ContactForm initialTopic={CONTACT_TOPICS.some((t) => t.value === topic) ? topic : ""} />;
}

/**
 * The contact form.
 *
 * Validation runs on submit, then live per field once that field has been
 * blurred or a submit has been attempted — so nobody is scolded mid-typing.
 * Every error is tied to its input with aria-describedby and aria-invalid; on
 * a failed submit focus moves to the first invalid field and a summary is
 * announced. Delivery goes through lib/contact-service.ts, which reports
 * honestly when no backend is configured.
 */
export function ContactForm({ initialTopic = "" }: { initialTopic?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactPayload>({ ...EMPTY, topic: initialTopic });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [sentPayload, setSentPayload] = useState<ContactPayload | null>(null);

  // A topic card clicked on this same page changes ?konu= after mount. Adopt
  // the new topic without remounting, so anything already typed survives.
  const [seenTopic, setSeenTopic] = useState(initialTopic);
  if (initialTopic !== seenTopic) {
    setSeenTopic(initialTopic);
    if (initialTopic) setValues((v) => ({ ...v, topic: initialTopic }));
  }

  const errors = validate(values);
  const visibleError = (f: Field) => ((attempted || touched[f]) ? errors[f] : undefined);
  const id = (f: Field) => `${uid}-${f}`;

  const set = <K extends Field>(field: K, value: ContactPayload[K]) =>
    setValues((v) => ({ ...v, [field]: value }));
  const blur = (f: Field) => setTouched((t) => ({ ...t, [f]: true }));

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
  const topicLabel =
    CONTACT_TOPICS.find((t) => t.value === (sentPayload?.topic ?? values.topic))?.title ?? "İletişim";

  const inputBase =
    "mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-[0.9375rem] text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 disabled:bg-slate-50";
  const inputClass = (f: Field) =>
    `${inputBase} ${visibleError(f) ? "border-brand-red" : "border-slate-300 focus:border-brand-navy"}`;

  const label = (f: Field, text: string, required = false) => (
    <label htmlFor={id(f)} className="text-sm font-medium text-brand-navy-deep">
      {text}
      {required && (
        <>
          <span aria-hidden="true" className="text-brand-red"> *</span>
          <span className="sr-only"> (zorunlu)</span>
        </>
      )}
    </label>
  );

  const error = (f: Field) =>
    visibleError(f) ? (
      <p id={`${id(f)}-hata`} className="mt-1.5 flex items-center gap-1.5 text-sm text-brand-red-strong">
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
      <p id={`${uid}-not`} className="text-sm text-slate-500">
        <span aria-hidden="true" className="text-brand-red">*</span> ile işaretli alanlar zorunludur.
      </p>

      {/* Announces the error count once, after a failed submit. */}
      <div aria-live="assertive" className="sr-only">
        {attempted && errorCount > 0 ? `Formda ${errorCount} alan düzeltilmeli.` : ""}
      </div>

      <fieldset disabled={busy} className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <legend className="sr-only">İletişim bilgileriniz</legend>
        <div>
          {label("name", "Ad Soyad", true)}
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            placeholder="Adınızı soyadınızı girin"
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
          {label("company", "İşletme / Firma Adı")}
          <input
            id={id("company")}
            name="company"
            autoComplete="organization"
            placeholder="İşletme veya firma adınız"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            className={inputClass("company")}
          />
        </div>
        <div>
          {label("phone", "Telefon", true)}
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
          {label("email", "E-posta", true)}
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ornek@firma.com"
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
          {label("businessType", "İşletme Türü")}
          <select
            id={id("businessType")}
            name="businessType"
            value={values.businessType}
            onChange={(e) => set("businessType", e.target.value)}
            className={inputClass("businessType")}
          >
            <option value="">Seçiniz</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          {label("topic", "Konu", true)}
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
            <option value="">Seçiniz</option>
            {CONTACT_TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.title}
              </option>
            ))}
          </select>
          {error("topic")}
        </div>
        <div className="sm:col-span-2">
          {label("message", "Mesajınız", true)}
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            placeholder="Size nasıl yardımcı olabiliriz?"
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
            {/* KVKK notice text is pending from the company; until a page for
                it exists this stays plain text rather than a dead link. */}
            <label htmlFor={id("consent")} className="text-sm text-slate-600">
              Kişisel verilerimin işlenmesine ilişkin aydınlatma metnini okudum, kabul ediyorum.
              <span aria-hidden="true" className="text-brand-red"> *</span>
            </label>
          </div>
          {error("consent")}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={busy}
        aria-disabled={busy}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-red-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:cursor-wait disabled:opacity-75"
      >
        {busy ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
            Gönderiliyor…
          </>
        ) : (
          <>
            Mesaj Gönder
            <Send aria-hidden="true" className="size-4" />
          </>
        )}
      </button>

      <div aria-live="polite" className="mt-4">
        {status === "sent" && (
          <p role="status" className="flex gap-2.5 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
            <CircleCheck aria-hidden="true" className="size-5 shrink-0" />
            Mesajınız bize ulaştı. Ekibimiz en kısa sürede sizinle iletişime geçecek.
          </p>
        )}
        {status === "unavailable" && sentPayload && (
          <div role="status" className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="flex gap-2.5 font-medium">
              <CircleAlert aria-hidden="true" className="size-5 shrink-0" />
              Çevrimiçi form gönderimi henüz aktif değil; mesajınız iletilmedi.
            </p>
            <p className="mt-1.5 pl-7.5">
              Bilgileriniz kaybolmadı. Aşağıdaki düğmeyle mesajınızı hazır bir e-posta olarak
              gönderebilir ya da bizi arayabilirsiniz.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 pl-7.5">
              <a
                href={buildMailto(sentPayload, topicLabel)}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2 font-semibold text-white hover:bg-brand-navy-deep"
              >
                <Mail aria-hidden="true" className="size-4" />
                E-posta ile gönder
              </a>
              <a
                href={SITE.contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-lg border border-amber-300 px-4 py-2 font-semibold hover:bg-amber-100"
              >
                <Phone aria-hidden="true" className="size-4" />
                {SITE.contact.phoneDisplay}
              </a>
            </div>
          </div>
        )}
        {status === "error" && (
          <p role="alert" className="flex gap-2.5 rounded-lg bg-red-50 p-4 text-sm text-red-800">
            <CircleAlert aria-hidden="true" className="size-5 shrink-0" />
            Mesajınız gönderilemedi. Lütfen tekrar deneyin ya da bize {SITE.contact.phoneDisplay}{" "}
            numarasından veya {SITE.contact.email} adresinden ulaşın.
          </p>
        )}
      </div>
    </form>
  );
}
