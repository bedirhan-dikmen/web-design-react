# Yayına Alma — CasaOS + Docker + Cloudflare Tunnel

Site tek bir Docker konteynerinde çalışır (`web`). İsteğe bağlı ikinci
konteyner (`cloudflared`) siteyi Cloudflare Tunnel üzerinden alan adınızda
yayınlar: modemde port açmanız gerekmez, SSL sertifikasını Cloudflare verir.

```
İnternet ──► Cloudflare ──► cloudflared (tünel) ──► web:3000 (Next.js)
                                                     ▲
                        Ev ağı: http://<sunucu-ip>:3080
```

## Sunucuda zaten bir Cloudflare tüneli varsa (önerilen)

Sunucuda başka siteler için çalışan bir Cloudflare tüneli zaten varsa yeni
tünel ya da token gerekmez; bu siteyi o tünele eklemek yeterlidir:

1. `.env` içinde tünel satırlarını **boş** bırakın:

   ```
   COMPOSE_PROFILES=
   CLOUDFLARE_TUNNEL_TOKEN=
   ```

   `CLOUDFLARE_TUNNEL_TOKEN` alanına IP adresi **yazılmaz**; o alan yalnızca
   Cloudflare'in verdiği uzun token içindir.
2. Siteyi başlatın: `docker compose up -d --build --remove-orphans`
3. Cloudflare Zero Trust → Networks → Tunnels → **mevcut tünel** → Public
   Hostname ekleyin: `kerinti2` + `bodor.com.tr`, Type `HTTP`,
   URL `<sunucu-ip>:3080` (ör. `192.168.1.111:3080`).

Aşağıdaki "Cloudflare Tunnel" bölümü yalnızca sunucuda hiç tünel yoksa ve bu
proje kendi tünelini çalıştıracaksa gereklidir.

## 1. Cloudflare Tunnel oluşturun (bir kez)

1. <https://one.dash.cloudflare.com> → **Networks → Tunnels → Create a tunnel**.
2. Tür olarak **Cloudflared** seçin, tünele bir ad verin (ör. `web-design-react`).
   Sunucuda başka bir site de yayındaysa bu site için **ayrı bir tünel**
   oluşturun; her sitenin kendi token'ı olsun.
3. Kurulum ekranında gösterilen komuttaki `--token` sonrasındaki uzun metni
   kopyalayın. Bu sizin **tünel token**'ınızdır (komutu çalıştırmanıza gerek
   yok, token'ı `.env` dosyasına koyacağız).
4. **Public Hostname** ekleyin:
   - **Subdomain / Domain:** ör. `www` + `kerinti.com.tr` (veya kök alan adı)
   - **Service type:** `HTTP`
   - **URL:** `web:3000`

   > `web`, docker-compose içindeki servisin adıdır. Tünel konteyneri siteye
   > iç ağ üzerinden bu adla ulaşır; `localhost` **yazmayın**.

## 2. Sunucuda kurulum

CasaOS sunucusuna SSH ile bağlanın (veya CasaOS Terminal'i açın):

```bash
git clone https://github.com/bedirhan-dikmen/web-design-react.git
cd web-design-react

cp .env.example .env
nano .env        # CLOUDFLARE_TUNNEL_TOKEN= satırına token'ı yapıştırın

docker compose up -d --build
```

İlk derleme birkaç dakika sürer. Durumu kontrol edin:

```bash
docker compose ps          # web: healthy, cloudflared: running olmalı
docker compose logs -f     # canlı loglar (Ctrl+C ile çıkış)
```

- Ev ağından: `http://<sunucu-ip>:3080`
- İnternetten: Cloudflare'de tanımladığınız alan adı

Cloudflare panelinde tünelin durumu **Healthy** görünmelidir.

## 3. Güncelleme (yeni kod yayınlamak)

```bash
cd web-design-react
git pull
docker compose up -d --build
```

Eski konteyner, yenisi hazır olunca değiştirilir. Kullanılmayan eski imajları
temizlemek için ara sıra: `docker image prune -f`

## Ayarlar (`.env`)

| Değişken | Açıklama |
| --- | --- |
| `WEB_PORT` | Ev ağındaki port (varsayılan `3080`). Sunucudaki başka bir sitenin kullandığı portu seçmeyin. |
| `COMPOSE_PROFILES` | `tunnel` → Cloudflare tüneli de başlar. Boş bırakırsanız yalnızca site çalışır. |
| `CLOUDFLARE_TUNNEL_TOKEN` | Cloudflare tünel token'ı. **Gizlidir, GitHub'a gönderilmez** (`.env` git'e dahil değil). |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | İletişim formunun gönderileceği adres (isteğe bağlı). Değiştirince `docker compose up -d --build` gerekir. |
| `TZ` | Saat dilimi (varsayılan `Europe/Istanbul`). |

## CasaOS arayüzünden kurmak isterseniz

CasaOS → **App Store → Custom Install → Import** ile `docker-compose.yml`
içe aktarılabilir. Ancak site kaynak koddan **derlendiği** için bu yöntemde
de dosyaların sunucuda olması gerekir; en sorunsuz yol yukarıdaki
`git clone` + `docker compose up -d --build` adımlarıdır. Konteynerler bu
şekilde başlatıldıktan sonra CasaOS panelinde de görünür ve oradan
durdurulup başlatılabilir.

## Sorun giderme

- **Aynı sunucuda başka siteler de var** → Bu projenin bütün adları kendine
  özgüdür: proje ve konteyner `web-design-react`, tünel konteyneri
  `web-design-react-tunnel`, ağ `web-design-react`. Böylece diğer
  sitelerle karışmaz. Bu projeyi yönetirken komutları her zaman bu klasörün
  içinde `docker compose ...` ile çalıştırın; başka bir sitenin
  konteynerini `docker rm` ile **silmeyin**.
- **`port is already allocated`** → `.env` içinde `WEB_PORT` değerini değiştirin.
- **Tünel bağlanıyor ama site açılmıyor (502)** → Cloudflare'deki Public
  Hostname URL'si `web:3000` olmalı; `docker compose ps` ile `web`
  konteynerinin `healthy` olduğunu kontrol edin.
- **cloudflared sürekli yeniden başlıyor** → `.env` içindeki token eksik veya
  hatalı: `docker compose logs cloudflared`
- **Tünel kullanmıyorum** → `.env` içinde `COMPOSE_PROFILES=` satırını boş
  bırakın; yalnızca site çalışır.
