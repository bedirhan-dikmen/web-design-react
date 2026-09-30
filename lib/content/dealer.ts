import type { L } from "@/lib/i18n";
import { DEALER_APPLY_HREF } from "@/lib/site";

/** Copy for the dealer login page (/bayi-girisi), in Turkish and English. */
export type DealerCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  programs: string;
  cardTitle: string;
  cardLead: string;
  identifierLabel: string;
  identifierPlaceholder: string;
  passwordLabel: string;
  showPassword: string;
  hidePassword: string;
  remember: string;
  forgot: string;
  forgotHref: string;
  submit: string;
  pending: string;
  allRequired: string;
  results: Record<"not-available" | "invalid-credentials" | "network", string>;
  errors: { identifier: string; email: string; code: string; password: string };
  applyLead: string;
  apply: string;
  applyHref: string;
};

export const DEALER_COPY: L<DealerCopy> = {
  tr: {
    metaTitle: "Bayi Girişi",
    metaDescription: "Kerinti bayi paneline giriş.",
    eyebrow: "Bayi Girişi",
    title: "Bayi paneline hoş geldiniz.",
    lead: "neXa sys ve nexus müşterilerinizi, lisanslarınızı ve taleplerinizi bayi panelinden takip edin.",
    programs: "Bayisi olduğunuz programlar",
    cardTitle: "Giriş yapın",
    cardLead: "Bayi kodunuz veya e-posta adresiniz ile giriş yapabilirsiniz.",
    identifierLabel: "Bayi kodu veya e-posta",
    identifierPlaceholder: "ör. KRT-1042 veya ad@firma.com",
    passwordLabel: "Şifre",
    showPassword: "Şifreyi göster",
    hidePassword: "Şifreyi gizle",
    remember: "Beni hatırla",
    forgot: "Şifremi unuttum",
    /** No reset flow exists yet; support handles resets via the contact form. */
    forgotHref: "/iletisim?konu=destek#iletisim-formu",
    submit: "Giriş Yap",
    pending: "Kontrol ediliyor…",
    allRequired: "Tüm alanlar zorunludur.",
    results: {
      "not-available": "Bayi paneli henüz kullanıma açılmadı. Hesabınızla ilgili işlemler için lütfen bizimle iletişime geçin.",
      "invalid-credentials": "Bayi kodu/e-posta veya şifre hatalı. Lütfen tekrar deneyin.",
      network: "Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.",
    },
    errors: {
      identifier: "Bayi kodunuzu veya e-posta adresinizi girin.",
      email: "Geçerli bir e-posta adresi girin (ör. ad@firma.com).",
      code: "Bayi kodu 4–20 karakter olmalı; yalnızca harf, rakam ve tire içerebilir.",
      password: "Şifrenizi girin.",
    },
    applyLead: "Henüz bayimiz değil misiniz?",
    apply: "Bayilik başvurusu yapın",
    applyHref: DEALER_APPLY_HREF,
  },
  en: {
    metaTitle: "Dealer login",
    metaDescription: "Sign in to the Kerinti dealer panel.",
    eyebrow: "Dealer login",
    title: "Welcome to the dealer panel.",
    lead: "Follow your neXa sys and nexus customers, licences and requests from the dealer panel.",
    programs: "Programs you sell",
    cardTitle: "Sign in",
    cardLead: "Sign in with your dealer code or e-mail address.",
    identifierLabel: "Dealer code or e-mail",
    identifierPlaceholder: "e.g. KRT-1042 or name@company.com",
    passwordLabel: "Password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    remember: "Remember me",
    forgot: "Forgot password",
    forgotHref: "/iletisim?konu=destek#iletisim-formu",
    submit: "Sign in",
    pending: "Checking…",
    allRequired: "All fields are required.",
    results: {
      "not-available": "The dealer panel is not open yet. Please contact us for anything about your account.",
      "invalid-credentials": "The dealer code/e-mail or password is incorrect. Please try again.",
      network: "Could not connect. Check your internet connection and try again.",
    },
    errors: {
      identifier: "Enter your dealer code or e-mail address.",
      email: "Enter a valid e-mail address (e.g. name@company.com).",
      code: "A dealer code is 4–20 characters: letters, digits and dashes only.",
      password: "Enter your password.",
    },
    applyLead: "Not a dealer yet?",
    apply: "Apply to become a dealer",
    applyHref: DEALER_APPLY_HREF,
  },
};
