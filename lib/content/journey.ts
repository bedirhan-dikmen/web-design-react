import type { L } from "@/lib/i18n";

/**
 * Homepage FAQ, covering both programs, in Turkish and English. Answers
 * only repeat what the site already states elsewhere (company.ts, products.ts,
 * the neXa and nexus pages); the nexus answers restate its feature list and
 * `idealFor` line, which are themselves awaiting owner confirmation.
 */
export const HOME_FAQS: L<{ question: string; answer: string }[]> = {
  tr: [
    {
      question: "neXa sys ile nexus arasındaki fark ne?",
      answer: "neXa sys; QR menü, kasa, mutfak ekranı ve raporlamayı bir araya getiren sipariş yönetim sistemidir. nexus ise görev, onay, müşteri ve rapor süreçlerini tek ekranda toplayan iş yönetim sistemidir.",
    },
    {
      question: "neXa sys hangi işletmeler için uygundur?",
      answer: "Restoranlar, kafeler, pastaneler, fast food zincirleri, oteller ve birden fazla şubesi olan yeme-içme grupları için.",
    },
    {
      question: "nexus hangi işletmeler için uygundur?",
      answer: "Ekipleri ve süreçleri büyüyen işletmeler için: görevlerin, onayların, müşteri ve cari kayıtlarının, teklif ve faturaların tek yerden izlenmesi gereken her işletme.",
    },
    {
      question: "nexus ile neleri yönetebilirim?",
      answer: "Görev ve iş takibi, tanımlı adımlarla ilerleyen onay akışları, müşteri ve cari kayıtları, tekliften faturaya süreç, yönetim raporları ve rol ile yetki tanımları.",
    },
    {
      question: "neXa sys'te tüm modülleri birden almam gerekiyor mu?",
      answer: "Hayır. neXa sys modülerdir; ihtiyacınız olan modüllerle başlar, işletmeniz büyüdükçe yenilerini eklersiniz.",
    },
    {
      question: "Kurulum ve eğitim veriyor musunuz?",
      answer: "Evet. Sistemi işletmenizde devreye alıyor, ekibinize eğitim veriyor ve kurulumdan sonra da destek vermeye devam ediyoruz.",
    },
    {
      question: "Demo talebinden sonra süreç nasıl ilerliyor?",
      answer: "Ekibimiz sizinle iletişime geçer, ihtiyaçlarınızı dinler ve ilgilendiğiniz programı (neXa sys ya da nexus) göstermek için bir görüşme planlar.",
    },
  ],
  en: [
    {
      question: "What is the difference between neXa sys and nexus?",
      answer: "neXa sys is an order management system that brings the QR menu, till, kitchen display and reporting together. nexus is a business management system that puts tasks, approvals, customers and reports on one screen.",
    },
    {
      question: "Which businesses is neXa sys for?",
      answer: "Restaurants, cafés, patisseries, fast food chains, hotels and food and beverage groups with more than one branch.",
    },
    {
      question: "Which businesses is nexus for?",
      answer: "Businesses whose teams and processes are growing: any business that needs to follow tasks, approvals, customer accounts, quotes and invoices in one place.",
    },
    {
      question: "What can I manage with nexus?",
      answer: "Tasks and work tracking, approval flows with defined steps, customer accounts, the path from quote to invoice, management reports, and roles and permissions.",
    },
    {
      question: "Do I have to take every neXa sys module at once?",
      answer: "No. neXa sys is modular: you start with the modules you need and add more as your business grows.",
    },
    {
      question: "Do you provide setup and training?",
      answer: "Yes. We put the system into use at your business, train your team and keep supporting you after setup.",
    },
    {
      question: "What happens after a demo request?",
      answer: "Our team contacts you, listens to your needs and schedules a meeting to show you the program you are interested in (neXa sys or nexus).",
    },
  ],
};
