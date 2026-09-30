# Tasarım Denetimi — 2026-09-27

Kapsam: 11 rota, header, footer, görseller, hareket. İnceleme Chrome'da, 1536×691
(masaüstü) ve 390 px genişlikte (mobil), açık ve koyu temada yapıldı. Kod
`e424da1` commit'i.

## 1. Sayfa sayfa notlar

| Rota | Hero şablonu | Gözlem |
|---|---|---|
| `/` | `HomeHero` (grid + ürün sekmeli vitrin) | Güçlü ilk ekran. Hero'dan sonra yalnızca 4 blok var: bento, 3 adımlı yaklaşım, galeri, CTA. Sosyal kanıt, sektörler, rakamlar ve SSS yok. Mobilde vitrin kutusu ilk açılışta boş görünüyor ve altında büyük bir boşluk kalıyor. |
| `/urun` | yok | Ana sayfadaki `ProductBento` + `DesignGallery` bloklarının birebir kopyası. Kendi girişi, karşılaştırma tablosu yok ama menüde "Ürünleri karşılaştır" olarak geçiyor. |
| `/urun/nexa` | `EditorialHero` | En zengin sayfa: akış, 4 özellik satırı, modül ızgarası. İçerik 1800 px'lik kapsayıcıda olduğu için header'la hizalı değil. |
| `/urun/nexus` | `PageIntro` (üçüncü bir stil) | Zayıf. Hero'nun sağ tarafında yalnızca küçük bir logo var. Tek bir pano, 6 özellik, CTA. Ekran görüntüsü yok. neXa sayfasıyla aynı yapıda değil. |
| `/moduller` | `EditorialHero` | 11 kart, hızlı atlama çipleri. Aynı modül ızgarası neXa ve Hakkımızda sayfalarında da tekrarlanıyor. |
| `/cozumler` | `EditorialHero` | 6 sektör kartı, iyi fotoğraflar. En iyi görsel sayfa. |
| `/referanslar` | `EditorialHero` | **Yayına hazır değil**: 3 "Örnek yorum" ve 6 adet "Onaylı logo bekleniyor" kutusu var. Sektör fotoğrafları 3. kez kullanılıyor. |
| `/hakkimizda` | `EditorialHero` | Uzun (4100 px). Modül ızgarası ve sektör fotoğrafları tekrar ediyor. Ekip, rakamlar ve fotoğraf yok. |
| `/marka` | `PageIntro` | Dahili bir rehber, ziyaretçiye yönelik değil. Header menüsünde "Kurumsal" altında duruyor. |
| `/iletisim` | `EditorialHero` | Kanallar, form, konum ve SSS eksiksiz. Formdaki onay kutusu **aydınlatma metnine bağlanmıyor** (böyle bir sayfa yok). |
| `/bayi-girisi` | ayrı iki sütunlu düzen | Temiz ve yeterli. |

## 2. Sistem genelinde tutarsızlıklar

1. **Üç farklı içerik genişliği.** Header `1240/1400 px`, ana sayfa `1240 px`,
   `Container` bileşeni ise `content-max = 1800 px` kullanıyor. 1536 px
   ekranda footer ve iç sayfaların içeriği sol kenardan 40 px'te başlıyor,
   logo ise 185 px'te. Göze en çok batan sorun bu.
2. **Dört farklı hero dili.** `HomeHero`, `EditorialHero` (serif italik vurgu,
   duraklat düğmesi, 3'lü bağlantı şeridi), `PageIntro` ve bayi düzeni. Serif
   italik vurgu yalnızca bazı sayfalarda görünüyor.
3. **Aynı içerik tekrar tekrar kullanılıyor.** Sektör fotoğrafları 3 sayfada,
   modül ızgarası 3 sayfada, bento + galeri 2 sayfada.
4. **Bölüm ritmi.** Başlık ölçekleri ve dikey boşluklar sayfadan sayfaya
   değişiyor. Bazı bölümler "eyebrow + H2" düzenini kullanıyor, bazıları
   kullanmıyor.

## 3. Header

İyi yanları: sticky ve blur, erişilebilir açılır menüler (Escape ile kapanma,
aria), ürün kartlı mega menü, mobilde akordeonlu tam ekran menü, tema
anahtarı.

Geliştirilebilecekler: kaydırınca küçülen/"pill" forma geçen bar yok. Mega
menüde ürün ekranı önizlemesi yok. Aktif sayfa çizgisi `-15px` gibi sabit bir
değerle konumlanıyor. `/marka` dahili bir sayfa olduğu hâlde menüde görünüyor.

## 4. Footer

- Kapsayıcı genişliği yüzünden içerik header'la hizalı değil (bkz. 2.1).
- KVKK aydınlatma metni, çerez politikası ve gizlilik bağlantıları yok.
  Türkiye'de form toplayan bir site için bunlar yasal olarak gerekli.
- Sosyal medya bağlantıları boş (`SITE.social = []`).
- Bülten, "sistem durumu" ya da büyük marka imzası gibi güncel footer
  öğeleri yok.

## 5. Görseller ve medya

| Grup | Adet | Boyut | Kullanım |
|---|---|---|---|
| `images/product/*` (UI) | 4 | 941–1672 px, 1,3–1,7 MB PNG | Vitrinlerde, `next/image` ile kullanılıyor |
| `images/sectors/*` (foto) | 6 | 1448×1086, ~2 MB PNG | 3 sayfada |
| `images/scenes/*` | 4 | 1122–1448 px | **Kullanılmıyor** |
| `images/cta/plated-dish` | 1 | 1448×1086 | **Kullanılmıyor** |
| `images/hero/hero-restaurant` | 1 | 1672×941 | Yalnızca kullanılmayan bir bileşende geçiyor |
| `textures/*.webp` | 5 | — | Yalnızca kullanılmayan three.js sahnesinde geçiyor |
| `brand/kerinti-logo.png` | 1 | 1600×803 PNG | Logo. **SVG'si yok** |

- **GIF ya da video yok.** Güncel sitelerde ürün, GIF yerine kısa ve sessiz
  `MP4/WebM` döngüleriyle gösteriliyor (GIF'ten 5–10 kat küçük, renkleri
  bozulmuyor). Bunun için gerçek ürün ekran kayıtları gerekli.
- UI görsellerinin çözünürlüğü, kısıtlı gösterim boyutları için yeterli
  (620–1000 px kap). Daha büyük gösterilirlerse 2× kuralı bozulur.
- Kullanılmayan kod: `hero-section.tsx`, `hero-background.tsx`,
  `hero-script-text.tsx` ve `stage/*`, yani three.js sahnesinin tamamı.
  `three`, `@react-three/fiber` ve `@react-three/drei` bağımlılıkları
  yalnızca bu kod için duruyor.

## 6. Hareket

Mevcut olanlar: fade-up reveal, kart spotlight'ı, neXa hero'sunda otomatik
ilerleyen sekmeler (duraklatılabiliyor), `prefers-reduced-motion` desteği.

Eksik olanlar: sayfalar arası geçiş (View Transitions), scroll'a bağlı
anlatım (sticky ürün hikâyesi), sayılarda sayaç animasyonu, logo şeridi
(marquee).

## 7. 2026 trendleriyle karşılaştırma

| Trend | Durum |
|---|---|
| Bento grid | ✅ Var (ana sayfa) |
| Açık/koyu tema | ✅ Var |
| Tek, tutarlı tasarım sistemi (tek container, tek hero ailesi) | ❌ 3 genişlik, 4 hero |
| Etkileşimli ürün vitrini (sekmeli, canlı) | ✅ Kısmen (ana sayfa, neXa) |
| Scroll'a bağlı ürün anlatımı (sticky + adım adım ekran değişimi) | ❌ |
| Kısa video döngüleri (GIF yerine) | ❌ Kaynak kayıt yok |
| Sosyal kanıt: logo şeridi, rakamlar, gerçek yorumlar | ❌ Yer tutucular var |
| Kaydırınca küçülen pill navbar ve önizlemeli mega menü | ◐ Mega menü var, önizleme ve küçülme yok |
| Büyük ve bilgi yoğun footer (yasal, sosyal, bülten) | ❌ |
| View Transitions ile sayfa geçişi | ❌ |
| Karşılaştırma tablosu ve SSS ile karar desteği | ◐ SSS yalnızca İletişim'de |
| Vektör logo ve ikon | ◐ Ürün logoları SVG, Kerinti logosu PNG |

## 8. Önerilen şablon (aşamalı)

- **M1 — Temel:** tek container tokeni (1240 px, geniş bölümler için 1400
  px), tip ölçeği, bölüm ritmi (`Section` + `SectionHeader`). Tek bir
  `PageHero` bileşeni, varyantları: `home`, `product`, `page`, `compact`.
- **M2 — Header ve footer:** kaydırınca küçülen bar, mega menüye ekran
  önizlemesi. Footer header'la hizalanır, yasal sayfalara bağlanır, sosyal
  bağlantılar gelince görünür.
- **M3 — Ana sayfa:** hero → logo/rakam şeridi → bento → scroll'a bağlı
  "bir siparişin yolculuğu" → sektör kaydırıcısı → yorumlar (yalnızca
  gerçekler) → SSS → CTA.
- **M4 — Ürün şablonu:** neXa ve nexus aynı iskeleti kullanır. `/urun`
  gerçek bir karşılaştırma sayfasına dönüşür.
- **M5 — Medya:** video döngüleri (kayıt gelince), Kerinti logosunun SVG'si,
  kullanılmayan görsellerin ve three.js'in temizlenmesi.
- **M6 — Hareket:** View Transitions, scroll'a bağlı animasyonlar, sayaçlar.
  Hepsi reduced-motion'a uyar.

## 9. Sahibinden gereken girdiler

1. Gerçek referans logoları ve müşteri yorumları (izinli). Gelmezse
   `/referanslar` sayfası sadeleştirilmeli.
2. KVKK aydınlatma metni ve çerez politikası metni.
3. Ürün ekran kayıtları (neXa QR → kasa → mutfak akışı; 10–20 sn, 1920 px+).
4. Kerinti logosunun vektör (SVG/AI) dosyası.
5. Sosyal medya hesaplarının adresleri.
6. Kanıtlanabilir rakamlar (işletme sayısı, günlük sipariş vb.).

## 10. Uygulama durumu (2026-09-27)

| Aşama | Durum | Ne yapıldı |
|---|---|---|
| M1 Temel | ✅ | Tek genişlik (`--spacing-page-max: 1280px`); `Container` ve `Section` bileşenleri. `SectionHeader` ortak eyebrow ve başlık ölçeğini kullanıyor. Başlıklardaki `<em>` her yerde Instrument Serif italik. `EditorialHero`, `PageIntro` ve ana sayfa hero'su aynı tipografiyi kullanıyor. |
| M2 Header/footer | ✅ | Kaydırınca pill'e dönüşen header, okuma ilerleme çizgisi, fotoğraflı mega menü kartı, nokta biçiminde aktif sayfa göstergesi. Footer "Bu işler *bitecek.*" ile açılıyor, header'la hizalı ve yasal bağlantıları içeriyor. `/kvkk` ve `/cerez-politikasi` sayfaları eklendi (**taslak metin, hukuki onay bekliyor**). |
| M3 Ana sayfa | ✅ | Hero → rakam şeridi ve modül bandı → bento → scroll'a bağlı "Bir siparişin yolculuğu" → sektör kaydırıcısı → yaklaşım → SSS → CTA. |
| M4 Ürün şablonu | ✅ | `/urun` karşılaştırma tablosu ve galeriden oluşuyor. nexus, neXa ile aynı iskelette: editorial hero, akış, özellikler, kardeş ürün, CTA. |
| M5 Medya | ◐ | three.js sahnesi, texture'lar, 3 bağımlılık ve Caveat fontu kaldırıldı. Kullanılmayan 4 sahne fotoğrafı yolculuk anlatımında ve mega menüde kullanılıyor. **Hâlâ eksik:** video kayıtları, logonun SVG'si. |
| M6 Hareket | ✅ | Sayfa geçişi (`app/template.tsx`), scroll'a bağlı ilerleme çizgisi, sayaçlar, marquee, sticky anlatım. Hepsi reduced-motion'a uyuyor. |

Örnek yorumlar ve logo alanı artık yalnızca geliştirme ortamında görünüyor;
production'da gizli.
