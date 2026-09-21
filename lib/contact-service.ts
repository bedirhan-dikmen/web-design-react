import { SITE } from "@/lib/site";

/**
 * Contact form submission — the one seam between the form UI and delivery.
 *
 * BACKEND PENDING. This project has no API route, mail service or CRM hook,
 * and one must not be faked. So:
 *
 *   - If `NEXT_PUBLIC_CONTACT_ENDPOINT` is set, the payload is POSTed there as
 *     JSON and a 2xx response counts as delivered.
 *   - If it is not set, `submitContactForm` returns `unavailable` without
 *     pretending anything was sent, and the form offers the visitor a real
 *     fallback: an e-mail prefilled with their message (`buildMailto`), or a
 *     phone call.
 *
 * Wiring a real backend means setting that variable (or replacing the body of
 * `submitContactForm`); the form component does not change.
 */

export type ContactPayload = {
  name: string;
  company: string;
  phone: string;
  email: string;
  businessType: string;
  topic: string;
  message: string;
  consent: boolean;
};

export type SubmitResult =
  | { status: "sent" }
  | { status: "unavailable" }
  | { status: "error" };

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export async function submitContactForm(payload: ContactPayload): Promise<SubmitResult> {
  if (!ENDPOINT) return { status: "unavailable" };
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok ? { status: "sent" } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}

/** A mailto: link carrying the visitor's message, for the no-backend case. */
export function buildMailto(payload: ContactPayload, topicLabel: string): string {
  const lines = [`Ad Soyad: ${payload.name}`];
  if (payload.company) lines.push(`İşletme / Firma: ${payload.company}`);
  lines.push(`Telefon: ${payload.phone}`, `E-posta: ${payload.email}`);
  if (payload.businessType) lines.push(`İşletme Türü: ${payload.businessType}`);
  lines.push("", payload.message);
  const subject = `${topicLabel} — ${payload.name}`;
  return `mailto:${SITE.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}
