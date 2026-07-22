export function About() {
  return (
    <section id="hakkimda" className="border-t border-[var(--hairline)] bg-[var(--paper)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-8 md:py-32">
        <figure className="relative">
          <img
            src="/assets/about.jpg"
            alt="Çalışma masasında ders çalışan Ali Andaç, arkadan"
            className="aspect-[3/4] w-full rounded-[4px] object-cover"
          />
          <figcaption className="site-mono mt-3 text-[11px] text-[var(--ink)]/60">
            Gece vardiyası, defter açık.
          </figcaption>
        </figure>

        <div className="flex flex-col justify-center">
          <p className="site-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-blue)]">
            Defter 01
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter md:text-5xl">
            Sıfırdan öğrenen, üreterek ilerleyen.
          </h2>
          <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-[var(--ink)]/80">
            Yapay zeka ve makine öğrenmesi öğrencisiyim. Temelden başlayıp her
            konuyu kendi ellerimle kurarak öğreniyorum: modeller, mobil
            uygulamalar, yapay zeka ajanları. Amacım öğrendiklerimi gerçek
            ürünlere ve kendi girişimlerime dönüştürmek.
          </p>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-[var(--ink)]/80">
            Bu site bir laboratuvar defteri gibi: her proje bir deney kaydı,
            her adım bir öğrenme.
          </p>
          <a
            href="https://github.com/aliandacerdass"
            target="_blank"
            rel="noreferrer"
            className="site-mono mt-8 inline-block w-fit border border-[var(--ink)]/25 px-4 py-2 text-xs transition-transform hover:-translate-y-[1px] hover:border-[var(--ink-blue)] hover:text-[var(--ink-blue)] hover:shadow-sm motion-reduce:transition-none"
          >
            GitHub Profilim ↗
          </a>
        </div>
      </div>
    </section>
  );
}
