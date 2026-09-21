# Kerinti Soft — Web Sitesi

Kerinti Soft ve NeXa restoran yönetim sistemi için kurumsal web sitesi.
Next.js 16 (App Router), React 19, Tailwind CSS 4.

## Geliştirme

```bash
npm install
npm run dev        # http://localhost:3000
```

Kontroller: `npm run lint`, `npm run typecheck`, `npm run build`.

## Yayına alma

Docker + CasaOS + Cloudflare Tunnel adımları: **[DEPLOY.md](DEPLOY.md)**

```bash
cp .env.example .env     # Cloudflare tünel token'ını girin
docker compose up -d --build
```

## Yapı

| Klasör | İçerik |
| --- | --- |
| `app/` | Sayfalar: `/`, `/urun`, `/moduller`, `/cozumler`, `/referanslar`, `/hakkimizda`, `/iletisim` |
| `components/` | Bileşenler (`layout/editorial-hero` sayfa başları, `stages/` canlı sahneler) |
| `lib/` | İçerik ve site verisi (`lib/site.ts` iletişim bilgileri, `lib/content/` modüller, sektörler) |
| `public/` | Yayında kullanılan görseller |
| `static_design/`, `reference/` | Kaynak tasarım dosyaları — yayında kullanılmaz |
| `docs/` | Görsel kalite kuralları ve varlık listesi (`ASSET_MANIFEST.md`) |
