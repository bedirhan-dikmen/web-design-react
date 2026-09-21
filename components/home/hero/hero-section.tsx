import { EditorialHero } from "@/components/layout/editorial-hero";
import { DEMO_HREF } from "@/lib/site";
import { LiveBoard } from "./live-board";

/** Homepage opening: one service, replayed live on the NeXa dashboard. */
export function HeroSection() {
  return (
    <EditorialHero
      ariaLabel="NeXa restoran yönetimi"
      eyebrow="KERİNTİ’DEN / NEXA"
      headline={
        <>
          İyi servisin
          <br />
          bir <em>ritmi</em> var.
        </>
      }
      description={
        <>
          Masanın, mutfağın, kasanın.
          <br />
          NeXa ile hepsi aynı ritimde.
        </>
      }
      detail="QR menüden siparişe, kasadan mutfağa. Restoranınızın ihtiyaç duyduğu araçlar, birlikte çalışan tek bir sistemde."
      primary={{ label: "Demo talep edin", href: DEMO_HREF }}
      secondary={{ label: "NeXa’yı keşfedin", href: "/urun" }}
      aside={{
        lead: "Restoran, kafe veya çok şubeli işletme.",
        label: "İşletmenize uygun çözümü bulun",
        href: "/cozumler",
      }}
      stageLabel="NEXA / RESTORAN YÖNETİMİ"
      stage={<LiveBoard />}
      caption={
        <>
          Her adımda, <em>aynı uyum.</em>
        </>
      }
      stageDescription="Örnek verilerle gösterilen restoran yönetimi animasyonu."
      linksLabel="Öne çıkan NeXa modülleri"
      links={[
        { label: "QR Menü ve Sipariş", href: "/moduller#qr-menu" },
        { label: "Kasa (POS)", href: "/moduller#kasa-pos" },
        { label: "Mutfak Ekranı", href: "/moduller#mutfak-ekrani" },
      ]}
      footer={{
        left: "KERİNTİ YAZILIM / NEXA",
        scrollHref: "#cozum-baslik",
        scrollLabel: "İşletmenize uygun özellikleri keşfedin",
        right: "RESTORANINIZIN HER NOKTASINDA.",
      }}
    />
  );
}
