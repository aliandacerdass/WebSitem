import { useEffect, useRef } from "react";

// C3: maskeli hero. Dev "ANDAÇ" tipinin icinden gorsel gorunur; scroll
// maskeyi buyutur, gorsel full-bleed olur. Sticky + dogrudan scroll'dan
// hesaplanan transform (kutuphane durumu yok: her scroll pozisyonu tek bir
// gorunume denk gelir, asagi inip cikmak animasyonu bozamaz).
// Ilk kare eksiksiz cizilir; reduced-motion'da maske katmani gizli, statik hal.
export function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrap = wrapRef.current;
    const overlay = overlayRef.current;
    const img = imgRef.current;
    const title = titleRef.current;
    if (!wrap || !overlay || !img || !title) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      overlay.style.transform = `scale(${1 + p * 25})`;
      img.style.transform = `scale(${1.1 - p * 0.1})`;
      const tp = Math.min(1, Math.max(0, (p - 0.15) / 0.85));
      title.style.transform = `translateY(${-140 * tp}px)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section id="hero" ref={wrapRef} className="relative h-[220vh] md:h-[280vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <img
          ref={imgRef}
          src="/assets/hero.jpg"
          alt="Gece çalışma masası: makine öğrenmesi notları, kod ve kahve"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />

        {/* Kagit rengi ortu, ANDAÇ seklinde deligi var; scroll ile buyur */}
        <svg
          ref={overlayRef}
          className="absolute inset-0 h-full w-full will-change-transform motion-reduce:hidden"
          style={{ transformOrigin: "50% 47%" }}
          viewBox="0 0 1000 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <mask id="hero-mask">
              <rect width="1000" height="560" fill="white" />
              <text
                x="500"
                y="300"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "196px",
                  letterSpacing: "-0.04em",
                }}
              >
                ANDAÇ
              </text>
            </mask>
          </defs>
          <rect width="1000" height="560" fill="var(--paper)" mask="url(#hero-mask)" />
        </svg>

        <div
          ref={titleRef}
          className="hero-rise absolute inset-x-0 bottom-14 z-10 mx-auto flex max-w-6xl flex-col items-start gap-5 px-5 md:px-8"
        >
          <p className="site-mono text-xs text-[var(--ink)] motion-reduce:text-[var(--paper)] md:text-sm">
            Ali Andaç Erdaş · Yapay Zeka ve Makine Öğrenmesi
          </p>
          <a
            href="#projeler"
            className="ink-fill inline-block border border-[var(--ink-blue)] px-6 py-3 text-sm font-bold text-[var(--ink)] transition-colors motion-reduce:text-[var(--paper)]"
          >
            Projeleri Gör
          </a>
        </div>
      </div>
    </section>
  );
}
