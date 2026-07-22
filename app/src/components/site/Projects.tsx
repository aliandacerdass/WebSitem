type Project = {
  id: string;
  title: string;
  desc: string;
  stack: string;
  img: string | null;
  alt: string;
  fit?: "contain";
};

const projects: Project[] = [
  {
    id: "kayit-01",
    title: "Fal Uygulaması",
    desc: "Kahve falı yorumlayan mobil uygulama. Fincan fotoğrafından yapay zeka destekli yorum üretir.",
    stack: "Flutter · Supabase · YZ",
    img: "/assets/project-fal.jpg",
    alt: "Kahve fincanı ve fal uygulaması ekranı",
  },
  {
    id: "kayit-02",
    title: "Şirket AI Konseyi",
    desc: "Yedi farklı role sahip yapay zeka konseyi: strateji, ürün ve girişim kararlarını birlikte tartışan ajan takımı.",
    stack: "LLM Ajanları · Orkestrasyon",
    img: "/assets/project-konsey.jpg",
    alt: "Yuvarlak masada yedi düğümlü yapay zeka konseyi görselleştirmesi",
  },
  {
    id: "kayit-03",
    title: "Andaç Anime",
    desc: "Özgün anime karakteri: Character Bible ile sabitlenen kimlik ve LoRA eğitimiyle tutarlı görsel üretim.",
    stack: "LoRA · Görsel Üretim",
    img: "/assets/project-anime.jpg",
    alt: "Anime karakter tasarım sayfaları ve renk paletleri",
  },
  {
    id: "kayit-04",
    title: "Ay Rotası Optimizasyonu",
    desc: "Ay yüzeyi görevleri için otonom rota motoru: NASA yükseklik verisi (GeoTIFF DEM) üzerinde topografya duyarlı A*, eğim ve termal risk maliyetli üç görev profili. TUA Astro Hackathon projesi.",
    stack: "Python · A* · NASA DEM",
    img: "/assets/project-ayrotasi.jpg",
    alt: "Ay yüzeyi haritasında mürekkep mavisi rota ve ara noktalar",
  },
  {
    id: "kayit-05",
    title: "SmartGrid-Core",
    desc: "Akıllı şebekede dinamik enerji dağıtımı: Hash Map telemetri katmanı, kritiklik öncelikli Min-Heap kuyruğu, mesafe bazlı güç kaybı modeli, CLI ve SVG animasyonlu SCADA paneli.",
    stack: "Python · Veri Yapıları · SCADA",
    img: "/assets/project-smartgrid.jpg",
    alt: "Akıllı şebeke şeması: santraller, rüzgar türbinleri ve merkez düğüm",
  },
  {
    id: "kayit-06",
    title: "CV Booster",
    desc: "LLM destekli metin iyileştirme sistemli mobil uygulama: Python (FastAPI) REST API, IP ve cihaz bazlı hız sınırlama, ölçeklenebilir backend-frontend mimarisi, yayına hazır kurulum.",
    stack: "FastAPI · LLM · REST API",
    img: "/assets/project-cvbooster.png",
    alt: "CV Booster uygulama logosu",
    fit: "contain",
  },
];

export function Projects() {
  return (
    <section id="projeler" className="border-t border-[var(--hairline)] bg-[var(--paper-2)]">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <h2 className="text-4xl font-bold tracking-tighter md:text-5xl">Deney kayıtları</h2>
        <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[var(--ink)]/70">
          Her proje deftere işlenmiş bir deney: hipotez, kurulum, sonuç.
        </p>

        <div className="mt-14">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="project-row group grid gap-6 border-t border-[var(--ink)]/15 py-10 md:grid-cols-[1fr_360px] md:gap-12"
            >
              <div className="flex flex-col justify-center">
                <span className="site-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-blue)]">
                  {p.id}
                </span>
                <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-[var(--ink)]/75">
                  {p.desc}
                </p>
                <span className="site-mono mt-4 text-xs text-[var(--ink)]/55">{p.stack}</span>
              </div>
              {p.img && p.fit === "contain" ? (
                <div className="plate-reveal dot-grid flex aspect-[3/2] w-full items-center justify-center rounded-[4px] border border-[var(--ink)]/15 bg-white">
                  <img
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-3/5 w-auto object-contain"
                  />
                </div>
              ) : p.img ? (
                <img
                  src={p.img}
                  alt={p.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="plate-reveal aspect-[3/2] w-full rounded-[4px] object-cover"
                />
              ) : (
                <div className="plate-reveal dot-grid flex aspect-[3/2] w-full items-center justify-center rounded-[4px] border border-[var(--ink)]/15 bg-[var(--paper)]">
                  <span className="site-mono text-5xl font-medium text-[var(--ink-blue)]">
                    {p.id.slice(-2)}
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
