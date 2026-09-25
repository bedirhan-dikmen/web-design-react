import { DEALER_APPLY_HREF } from "@/lib/site";

/** Copy for the dealer login page (/bayi-girisi). */
export const DEALER_COPY = {
  eyebrow: "Bayi Girişi",
  title: "Bayi paneline hoş geldiniz.",
  lead: "Siparişlerinizi, lisanslarınızı ve müşterilerinizi bayi panelinden takip edin.",
  cardTitle: "Giriş yapın",
  cardLead: "Bayi kodunuz veya e-posta adresiniz ile giriş yapabilirsiniz.",
  identifierLabel: "Bayi kodu veya e-posta",
  identifierPlaceholder: "ör. KRT-1042 veya ad@firma.com",
  passwordLabel: "Şifre",
  remember: "Beni hatırla",
  forgot: "Şifremi unuttum",
  /** No reset flow exists yet; support handles resets via the contact form. */
  forgotHref: "/iletisim?konu=destek#iletisim-formu",
  submit: "Giriş Yap",
  pending: "Kontrol ediliyor…",
  results: {
    "not-available":
      "Bayi paneli henüz kullanıma açılmadı. Hesabınızla ilgili işlemler için lütfen bizimle iletişime geçin.",
    "invalid-credentials": "Bayi kodu/e-posta veya şifre hatalı. Lütfen tekrar deneyin.",
    network: "Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.",
  },
  applyLead: "Henüz bayimiz değil misiniz?",
  apply: "Bayilik başvurusu yapın",
  applyHref: DEALER_APPLY_HREF,
};
