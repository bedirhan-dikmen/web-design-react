import { SITE } from "@/lib/site";

/**
 * Legal texts: KVKK aydınlatma metni and the cookie policy.
 *
 * DRAFT — NOT LEGALLY REVIEWED. Written against KVKK md. 10 (aydınlatma
 * yükümlülüğü) and md. 11 (ilgili kişinin hakları) from what the site
 * actually does: the contact form collects name, business, phone, e-mail,
 * business type, topic and message; the theme choice is kept in
 * localStorage; the language choice in the "kerinti-lang" cookie; the dealer
 * login sets a session cookie; the contact page embeds a Google Maps frame.
 * No analytics or advertising tools are installed.
 *
 * The texts are Turkish only (legal wording is not machine-translated); the
 * English site shows a notice above them (components/layout/legal-page.tsx).
 *
 * Before launch the company must confirm the legal entity name (unvan),
 * MERSİS/VERBİS details if any, the hosting/e-mail providers data is shared
 * with, and retention periods. Until `reviewed` is true the pages show a
 * draft notice in development builds.
 */

export type LegalSection = { title: string; body: string[] };
export type LegalDoc = { title: string; lead: string; updated: string; reviewed: boolean; sections: LegalSection[] };

const { contact } = SITE;
const address = contact.address.lines.join(", ");

export const KVKK: LegalDoc = {
  title: "KVKK Aydınlatma Metni",
  lead: "Kişisel verilerinizin hangi amaçla, hangi hukuki sebeple işlendiğini ve haklarınızı açıklıyoruz.",
  updated: "27 Eylül 2026",
  reviewed: false,
  sections: [
    {
      title: "Veri sorumlusu",
      body: [
        `6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla ${SITE.name} (“Kerinti”) tarafından aşağıda açıklanan kapsamda işlenmektedir.`,
        `Adres: ${address}. E-posta: ${contact.email}. Telefon: ${contact.phoneDisplay}.`,
      ],
    },
    {
      title: "İşlenen kişisel veriler",
      body: [
        "İletişim formu, e-posta veya telefon yoluyla bize ilettiğiniz ad soyad, işletme veya firma adı, telefon numarası, e-posta adresi, işletme türü, talep konusu ve mesaj içeriği.",
        "Bayi girişi kullanan iş ortaklarımız için bayi kodu veya e-posta adresi ve oturum bilgisi.",
      ],
    },
    {
      title: "İşleme amaçları",
      body: [
        "Demo, bilgi, destek ve iş birliği taleplerinizi yanıtlamak; görüşme planlamak; teklif ve sözleşme süreçlerini yürütmek; bayi panelinin güvenli kullanımını sağlamak ve yasal yükümlülüklerimizi yerine getirmek.",
      ],
    },
    {
      title: "Hukuki sebepler",
      body: [
        "Kişisel verileriniz KVKK md. 5/2 kapsamında; bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (c), hukuki yükümlülüğümüzün yerine getirilmesi (ç) ve temel hak ve özgürlüklerinize zarar vermemek kaydıyla meşru menfaatlerimiz (f) hukuki sebeplerine dayanılarak işlenir.",
      ],
    },
    {
      title: "Toplama yöntemi",
      body: ["Verileriniz internet sitemizdeki formlar, e-posta, telefon ve yüz yüze görüşmeler aracılığıyla, kısmen otomatik ve otomatik olmayan yollarla toplanır."],
    },
    {
      title: "Aktarım",
      body: [
        "Kişisel verileriniz, yukarıdaki amaçlarla sınırlı olarak ve KVKK md. 8 ve 9'daki şartlara uygun biçimde; barındırma ve e-posta hizmeti aldığımız tedarikçilerle ve talep hâlinde yetkili kamu kurum ve kuruluşlarıyla paylaşılabilir.",
      ],
    },
    {
      title: "Haklarınız",
      body: [
        "KVKK md. 11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme, aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini, şartları oluştuğunda silinmesini veya yok edilmesini isteme, bu işlemlerin aktarılan üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz sonucu aleyhinize bir sonuç çıkmasına itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
        `Başvurularınızı ${contact.email} adresine e-posta ile veya ${address} adresine yazılı olarak iletebilirsiniz. Başvurular en geç 30 gün içinde sonuçlandırılır.`,
      ],
    },
  ],
};

export const COOKIES: LegalDoc = {
  title: "Çerez Politikası",
  lead: "Sitemizde yalnızca çalışması için gerekli olan tarayıcı depolamasını kullanıyoruz.",
  updated: "27 Eylül 2026",
  reviewed: false,
  sections: [
    {
      title: "Çerez nedir?",
      body: [
        "Çerezler ve benzeri teknolojiler (ör. yerel depolama), bir internet sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük veri dosyalarıdır.",
      ],
    },
    {
      title: "Kullandıklarımız",
      body: [
        "Tema tercihi: açık veya koyu görünüm seçiminiz tarayıcınızın yerel depolamasında “kerinti-theme” anahtarıyla saklanır. Bir sonraki ziyaretinizde aynı görünümü sunmak dışında bir amaçla kullanılmaz.",
        "Dil tercihi: Türkçe veya İngilizce seçiminiz “kerinti-lang” adlı bir çerezde bir yıl saklanır; sayfaları seçtiğiniz dilde sunmak dışında bir amaçla kullanılmaz.",
        "Bayi oturumu: bayi girişi yapan iş ortaklarımız için oturumu sürdürmeye yarayan zorunlu bir oturum çerezi kullanılır.",
        "İletişim sayfasındaki harita Google Haritalar'dan yüklenir; bu içerik görüntülendiğinde Google kendi çerezlerini kullanabilir. Bunun dışında sitemizde analiz, reklam veya üçüncü taraf takip çerezi bulunmamaktadır.",
      ],
    },
    {
      title: "Tercihlerinizi yönetme",
      body: [
        "Tarayıcınızın ayarlarından çerezleri ve yerel depolamayı dilediğiniz zaman silebilir veya engelleyebilirsiniz. Zorunlu çerezleri engellemeniz hâlinde bayi girişi gibi bazı özellikler çalışmayabilir.",
      ],
    },
    {
      title: "İletişim",
      body: [`Sorularınız için ${contact.email} adresinden bize ulaşabilirsiniz. Kişisel verilerinizin işlenmesine ilişkin ayrıntılar KVKK Aydınlatma Metni'nde yer alır.`],
    },
  ],
};
