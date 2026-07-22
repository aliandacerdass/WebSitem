const waypoints = [
  {
    tag: "Bölüm 01",
    title: "İlk satırlar",
    desc: "Python ile programlamaya giriş: temeli sağlam atmak için her kavram sıfırdan.",
  },
  {
    tag: "Bölüm 02",
    title: "Makine öğrenmesi temelleri",
    desc: "Gradyan iniş, regresyon, sinir ağları: formülleri deftere kendi elimle yazarak.",
  },
  {
    tag: "Bölüm 03",
    title: "Mobil: Fal Uygulaması",
    desc: "Flutter ile ilk gerçek ürün: kahve falı yorumlayan uygulama.",
  },
  {
    tag: "Bölüm 04",
    title: "Ajan takımları",
    desc: "Yedi rollü AI konseyi: LLM ajanlarını bir şirket gibi çalıştırma deneyi.",
  },
  {
    tag: "Bölüm 05",
    title: "Andaç Anime",
    desc: "Character Bible ve LoRA eğitimiyle tutarlı, özgün bir karakter kimliği.",
  },
  {
    tag: "Sırada",
    title: "aliandacerdass.dev ve ötesi",
    desc: "Bu site ve defterin yeni sayfaları: daha büyük modeller, daha cesur ürünler.",
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
