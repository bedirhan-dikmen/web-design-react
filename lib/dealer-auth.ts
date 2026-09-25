/**
 * Dealer (bayi) authentication — client-side contract and STUB.
 *
 * TODO(backend): there is no dealer backend yet. Replace `signInDealer` with
 * a POST to the real auth endpoint (HTTPS, server-side session cookie set as
 * HttpOnly + Secure + SameSite). Until then it always answers
 * "not-available". It must never report success, and nothing here may
 * persist the password (no localStorage, sessionStorage, cookies or logs).
 * `remember` is only forwarded so the backend can choose a longer session.
 */

export type DealerLoginInput = {
  /** Dealer code or e-mail address. */
  identifier: string;
  password: string;
  remember: boolean;
};

export type DealerLoginErrors = Partial<Record<"identifier" | "password", string>>;

export type DealerLoginResult =
  | { ok: true; redirectTo: string }
  | { ok: false; reason: "not-available" | "invalid-credentials" | "network" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Dealer code format is an assumption (letters/digits/dash, 4–20 chars) until
 * the real scheme is known. TODO(backend): confirm the format.
 */
const DEALER_CODE = /^[A-Za-z0-9-]{4,20}$/;

/** Field validation. Passwords are only checked for presence at sign-in. */
export function validateDealerLogin(input: Pick<DealerLoginInput, "identifier" | "password">): DealerLoginErrors {
  const errors: DealerLoginErrors = {};
  const id = input.identifier.trim();
  if (!id) {
    errors.identifier = "Bayi kodunuzu veya e-posta adresinizi girin.";
  } else if (id.includes("@") ? !EMAIL.test(id) : !DEALER_CODE.test(id)) {
    errors.identifier = id.includes("@")
      ? "Geçerli bir e-posta adresi girin (ör. ad@firma.com)."
      : "Bayi kodu 4–20 karakter olmalı; yalnızca harf, rakam ve tire içerebilir.";
  }
  if (!input.password) {
    errors.password = "Şifrenizi girin.";
  }
  return errors;
}

/** STUB — see the TODO at the top of this file. */
export async function signInDealer(input: DealerLoginInput): Promise<DealerLoginResult> {
  void input; // Intentionally unused until the backend exists; never stored.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: false, reason: "not-available" };
}
