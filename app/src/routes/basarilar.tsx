import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "../components/site/Nav";
import { Contact } from "../components/site/Contact";

export const Route = createFileRoute("/basarilar")({
  head: () => ({
    meta: [
      { title: "Başarılar · Ali Andaç Erdaş" },
      {
        name: "description",
        content:
          "Yarışma sonuçları, programlar ve sertifikalar: hackathon ödülleri, Microsoft AI Innovators ve daha fazlası.",
      },
    ],
  }),
  component: Achievements,
});

const results = [
  {
    tag: "2.lik Ödülü",
    title: "Build with AI Hackathonu",
    org: "GDG Bursa (Google Developers Group)",
    desc: "Türkiye'nin ilk çadırlı hackathonu. LLM kullanımında arka plandaki prompt süreçlerini otomatik optimize eden eklenti: veri merkezi yükünü hafifletip yapay zekanın su tüketimini azaltan bir Green AI çözümü.",
    stack: "LLM · Prompt Optimizasyonu · Sürdürülebilirlik",
  },
  {
    tag: "Türkiye 4.lüğü",
    title: "TUA Astro Hackathon",
    org: "Sanayi ve Teknoloji Bakanlığı · Türkiye Uzay Ajansı · TÜMMİAD · Valentura",
    desc: "Türkiye'nin ilk ulusal uzay temalı hackathonu. Ay yüzeyi görevleri için otonom rota optimizasyonu: NASA yükseklik verisi üzerinde topografya duyarlı A* motoru, eğim ve termal risk maliyet modeli, üç uyarlanabilir görev profili.",
    stack: "Python · A* · NASA GeoTIFF DEM",
  },
];

const programs = [
  {
    tag: "Kabul",
    title: "Microsoft AI Innovators Yaz Programı",
    org: "Microsoft",
    desc: "Microsoft mentorluğunda 4 haftalık program: çoklu ajan sistemleri ve uçtan uca yapay zeka ürünleri. Agent Framework ve Azure AI Foundry odaklı.",
    stack: "Multi-Agent · Azure AI Foundry",
  },
  {
    tag: "Başvuru",
    title: "Y Combinator 2026 Yaz",
    org: "Thresholdai.tech",
    desc: "Kurucu ortağı olduğum girişim: seri üretim tesislerini özerk, atıksız ortamlara dönüştüren çoklu ajan sistemi. YC 2026 Yaz dönemine resmi başvuru yapıldı.",
    stack: "Girişim · Çoklu Ajan Sistemleri",
  },
];

const certificates = [
  {
    tag: "Sertifika",
    title: "Data League",
    org: "BTÜ Bilişim ve Kodlama Topluluğu",
    desc: "Üniversiteler arası Data League ve Datathon: 4 haftalık veri bilimi bootcamp programı ve çevrimiçi Kaggle eleme datathonu tamamlandı.",
    stack: "Veri Bilimi · Kaggle · Makine Öğrenmesi",
  },
];

function Row({ item }: { item: (typeof results)[number] }) {
  return (
    <article className="grid gap-4 border-t border-[var(--ink)]/15 py-8 md:grid-cols-[180px_1fr] md:gap-10">
      <span className="site-mono h-fit w-fit border border-[var(--ink-blue)] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[var(--ink-blue)]">
        {item.tag}
      </span>
      <div>
        <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
        <p className="site-mono mt-1 text-xs text-[var(--ink)]/55">{item.org}</p>
        <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-[var(--ink)]/75">
          {item.desc}
        </p>
        <span className="site-mono mt-3 inline-block text-xs text-[var(--ink)]/55">
          {item.stack}
        </span>
      </div>
    </article>
  );
}

function Achievements() {
  return (
    <main className="min-h-dvh bg-[var(--paper)] text-[var(--ink)]">
      <Nav />

      <header className="mx-auto max-w-6xl px-5 pb-16 pt-36 md:px-8 md:pt-44">
        <p className="site-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-blue)]">
          Defter 02
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-tighter md:text-7xl">Başarılar</h1>
        <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-[var(--ink)]/75">
          Deftere işlenen sonuçlar: yarışma dereceleri, kabul edilen programlar
          ve sertifikalar. Detaylar ve duyurular LinkedIn profilimde.
        </p>
        <a
          href="https://www.linkedin.com/in/aliandacerdass/"
          target="_blank"
          rel="noreferrer"
          className="ink-fill mt-8 inline-block border border-[var(--ink-blue)] px-6 py-3 text-sm font-bold transition-colors"
        >
          LinkedIn ↗
        </a>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <h2 className="site-mono text-xs uppercase tracking-[0.18em] text-[var(--ink)]/55">
          Yarışma Sonuçları
        </h2>
        <div className="mt-6">
          {results.map((r) => (
            <Row key={r.title} item={r} />
          ))}
        </div>

        <h2 className="site-mono mt-16 text-xs uppercase tracking-[0.18em] text-[var(--ink)]/55">
          Programlar ve Girişim
        </h2>
        <div className="mt-6">
          {programs.map((r) => (
            <Row key={r.title} item={r} />
          ))}
        </div>

        <h2 className="site-mono mt-16 text-xs uppercase tracking-[0.18em] text-[var(--ink)]/55">
          Sertifikalar
        </h2>
        <div className="mt-6">
          {certificates.map((r) => (
            <Row key={r.title} item={r} />
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
