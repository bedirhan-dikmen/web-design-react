# Yayına Alma (v2) — CasaOS + Docker + Cloudflare Tunnel

Sitenin 2. sürümü GitHub'da **`v2`** dalındadır ve tek bir Docker
konteynerinde çalışır (`web-design-react-v2`). İlk sürümle (`web-design-react`,
port `3080`) ve sunucudaki diğer sitelerle çakışmaz: proje, imaj, konteyner ve
ağ adlarının hepsi `-v2` ile biter, ev ağındaki port **3030**'dur.

```
İnternet ──► Cloudflare ──► tünel ──► <sunucu-ip>:3030 ──► web-design-react-v2 (Next.js, iç port 3000)
```

| | v1 | v2 |
| --- | --- | --- |
| Git dalı | `main` | `v2` |
| Klasör | `web-design-react` | `web-design-react-v2` |
| Compose projesi / konteyner | `web-design-react` | `web-design-react-v2` |
| Ev ağı portu | `3080` | `3030` |

## 1. Sunucuda kurulum

CasaOS sunucusuna SSH ile bağlanın (veya CasaOS Terminal'i açın). v2'yi
ayrı bir klasöre, `v2` dalından indirin:

```bash
git clone -b v2 https://github.com/bedirhan-dikmen/web-design-react.git web-design-react-v2
cd web-design-react-v2

cp .env.example .env     # varsayılanlar: WEB_PORT=3030, tünel kapalı
docker compose up -d --build
```

İlk derleme birkaç dakika sürer. Durumu kontrol edin:

```bash
docker compose ps          # web-design-react-v2: healthy olmalı
docker compose logs -f     # canlı loglar (Ctrl+C ile çıkış)
```

Ev ağından açın: `http://<sunucu-ip>:3030`

## 2. Cloudflare'de yayına alma

### Sunucuda zaten bir Cloudflare tüneli varsa (önerilen)

Diğer siteleriniz için çalışan tünel v2 için de kullanılabilir; yeni tünel
ya da token gerekmez.

1. `.env` içinde tünel satırları **boş** kalsın (varsayılan):

   ```
   COMPOSE_PROFILES=
   CLOUDFLARE_TUNNEL_TOKEN=
   ```

2. Cloudflare Zero Trust → **Networks → Tunnels → mevcut tünel → Public
   Hostname → Add**:
   - **Subdomain / Domain:** v2 için yeni bir alt alan adı + alan adınız
     (ör. `v2` + `bodor.com.tr`). v1'in kullandığı adı seçmeyin.
   - **Service type:** `HTTP`
   - **URL:** `<sunucu-ip>:3030` (ör. `192.168.1.111:3030`)

Kayıttan birkaç saniye sonra site alan adında açılır; SSL'i Cloudflare verir.

### Sunucuda hiç tünel yoksa (v2 kendi tünelini çalıştırır)

1. <https://one.dash.cloudflare.com> → **Networks → Tunnels → Create a
   tunnel** → **Cloudflared**, ad: ör. `web-design-react-v2`.
2. Kurulum komutundaki `--token` sonrasındaki uzun metni kopyalayın.
3. **Public Hostname** ekleyin: Service `HTTP`, URL **`web:3000`**
   (`web`, compose içindeki servisin adıdır; tünel konteyneri siteye iç ağ
   üzerinden bu adla ulaşır, `localhost` yazmayın).
4. Sunucuda `.env`:

   ```
   COMPOSE_PROFILES=tunnel
   CLOUDFLARE_TUNNEL_TOKEN=<kopyaladığınız token>
   ```

5. `docker compose up -d --build` — `web-design-react-v2-tunnel` konteyneri
   de başlar. Cloudflare panelinde tünel **Healthy** görünmelidir.

## 3. Güncelleme (yeni kod yayınlamak)

```bash
cd web-design-react-v2
git pull
docker compose up -d --build
```

Eski konteyner, yenisi hazır olunca değiştirilir. Kullanılmayan eski imajları
temizlemek için ara sıra: `docker image prune -f`

## Ayarlar (`.env`)

| Değişken | Açıklama |
| --- | --- |
| `WEB_PORT` | Ev ağındaki port (varsayılan `3030`). Sunucudaki başka bir sitenin kullandığı portu seçmeyin. |
| `COMPOSE_PROFILES` | `tunnel` → bu projenin kendi Cloudflare tüneli de başlar. Boş bırakırsanız yalnızca site çalışır. |
| `CLOUDFLARE_TUNNEL_TOKEN` | Cloudflare tünel token'ı. **Gizlidir, GitHub'a gönderilmez** (`.env` git'e dahil değil). IP adresi yazılmaz. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | İletişim formunun gönderileceği adres (isteğe bağlı). Değiştirince `docker compose up -d --build` gerekir. |
| `TZ` | Saat dilimi (varsayılan `Europe/Istanbul`). |

## CasaOS arayüzünden kurmak isterseniz

CasaOS → **App Store → Custom Install → Import** ile `docker-compose.yml`
içe aktarılabilir; panelde "Kerinti Web Sitesi v2" olarak görünür. Site
kaynak koddan **derlendiği** için dosyaların sunucuda olması gerekir; en
sorunsuz yol yukarıdaki `git clone -b v2` + `docker compose up -d --build`
adımlarıdır.

## Sorun giderme

- **v1 ile v2 karıştı** → Her sürümü kendi klasöründe yönetin:
  `web-design-react` (v1) ve `web-design-react-v2` (v2). `docker compose`
  komutlarını her zaman ilgili klasörün içinde çalıştırın; diğer sürümün
  konteynerini `docker rm` ile **silmeyin**.
- **`port is already allocated`** → 3030 başka bir site tarafından
  kullanılıyor: `.env` içinde `WEB_PORT` değerini değiştirin ve Cloudflare'deki
  URL'yi de aynı porta güncelleyin.
- **Cloudflare 502 veriyor** → `docker compose ps` ile konteynerin `healthy`
  olduğunu, Cloudflare'deki URL'nin `<sunucu-ip>:3030` (mevcut tünel) ya da
  `web:3000` (kendi tüneli) olduğunu kontrol edin.
- **cloudflared sürekli yeniden başlıyor** → token eksik veya hatalı:
  `docker compose logs cloudflared`
