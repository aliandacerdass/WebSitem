const waypoints = [
  {
    tag: "Bölüm 01",
    title: "BTÜ, Yapay Zeka ve Makine Öğrenmesi",
    desc: "Bursa Teknik Üniversitesi'nde bölüme başlangıç: Python, C ve Java temelleri, her kavram sıfırdan.",
  },
  {
    tag: "Bölüm 02",
    title: "Data League",
    desc: "Üniversiteler arası veri ligi: 4 haftalık bootcamp ve Kaggle eleme datathonu, sertifikayla tamamlandı.",
  },
  {
    tag: "Bölüm 03",
    title: "TUA Astro Hackathon, 1.lik",
    desc: "Türkiye'nin ilk ulusal uzay temalı hackathonunda Ay rotası optimizasyonu ile Bursa üniversiteleri arasında 1.lik.",
  },
  {
    tag: "Bölüm 04",
    title: "Build with AI, 2.lik",
    desc: "GDG Bursa'nın çadırlı hackathonunda LLM prompt optimizasyonu projesiyle 2.lik ödülü.",
  },
  {
    tag: "Bölüm 05",
    title: "Microsoft AI Innovators",
    desc: "Microsoft mentorluğunda yaz programı: çoklu ajan sistemleri, Agent Framework ve Azure AI Foundry.",
  },
  {
    tag: "Sırada",
    title: "Kendi girişim denemelerim",
    desc: "CV Booster, Fal Uygulaması ve ajan takımları: fikirden ürüne her deneme, bir sonraki girişimin temeli.",
  },
];

export function Journey() {
  return (
    <section
      id="yolculuk"
      className="relative border-t border-[var(--hairline)] bg-[var(--paper)]"
    >
      <img
        src="/assets/journey.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <p className="site-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-blue)]">
          Eğitim Koşusu
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tighter md:text-5xl">Yolculuk</h2>

        <div className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6">
          {waypoints.map((w) => (
            <article
              key={w.tag}
              className="w-[270px] shrink-0 snap-start rounded-[4px] border border-[var(--ink)]/15 bg-[var(--paper)]/92 p-6 backdrop-blur-sm"
            >
              <span className="site-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-blue)]">
                {w.tag}
              </span>
              <h3 className="mt-3 text-lg font-bold tracking-tight">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/75">{w.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
