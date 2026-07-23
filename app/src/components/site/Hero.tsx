import { useEffect, useRef } from "react";

// C3: maskeli hero. Dev "ANDAÇ" tipinin icinden gorsel gorunur; scroll
// maskeyi buyutur, gorsel full-bleed olur. Sticky + dogrudan scroll'dan
// hesaplanan transform (kutuphane durumu yok: her scroll pozisyonu tek bir
// gorunume denk gelir, asagi inip cikmak animasyonu bozamaz).
// Ilk kare eksiksiz cizilir; reduced-motion'da maske katmani gizli, statik hal.
export function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const holeRef = useRef<SVGGElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const maskRectRef = useRef<SVGRectElement>(null);
  const paperRectRef = useRef<SVGRectElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrap = wrapRef.current;
    const overlay = overlayRef.current;
    const hole = holeRef.current;
    const img = imgRef.current;
    const title = titleRef.current;
    if (!wrap || !overlay || !hole || !img || !title) return;

    let raf = 0;
    let target = 0;
    let shown = 0;
    // viewBox yuksekligi ekran oranina gore hesaplanir; sabit 560 olsaydi
    // "slice" dar/dik ekranda yanlari kirpar, ANDAÇ'in ucu ekran disinda
    // kalirdi. Genislik hep 1000: yazi her ekranda ayni oranda sigar.
    let vh = 560;
    // Buyutme SVG'nin ICINDE, vektorel yapilir (CSS transform degil): maske
    // deligi her karede yeniden cizilir, raster onbellek bozulmasi olmaz.
    // Merkez: D harfinin ici, x=568; y yazi merkezinin 7 birim ustu.
    const apply = (p: number) => {
      // Maske %85'te tamamen acilir; kalan %15 bitmis gorseli sabit tutar.
      const pm = Math.min(1, p / 0.85);
      // Ustel olcek: zoom hizi bastan sona algisal olarak sabit.
      const sc = Math.pow(45, pm);
      const cy = vh / 2 - 7;
      hole.setAttribute(
        "transform",
        `translate(568 ${cy}) scale(${sc}) translate(-568 -${cy})`,
      );
      img.style.transform = `scale(${1.1 - pm * 0.1})`;
      const tp = Math.min(1, Math.max(0, (p - 0.15) / 0.85));
      title.style.transform = `translateY(${-140 * tp}px)`;
    };
    const measure = () => {
      const sticky = overlay.parentElement;
      if (!sticky) return;
      const { clientWidth: w, clientHeight: h } = sticky;
      if (!w || !h) return;
      vh = Math.round((1000 * h) / w);
      overlay.setAttribute("viewBox", `0 0 1000 ${vh}`);
      for (const r of [maskRectRef.current, paperRectRef.current]) {
        r?.setAttribute("height", String(vh));
      }
      textRef.current?.setAttribute("y", String(vh / 2));
    };
    const readTarget = () => {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      target = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    };
    // Yumusatma: gosterilen deger hedefe her karede kademeli yaklasir;
    // scroll ne kadar sicrarsa sicrasin animasyon hizi sinirli kalir.
    const tick = () => {
      raf = 0;
      shown += (target - shown) * 0.11;
      if (Math.abs(target - shown) > 0.0004) {
        raf = requestAnimationFrame(tick);
      } else {
        shown = target;
      }
      apply(shown);
    };
    const schedule = () => {
      readTarget();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      measure();
      schedule();
    };
    measure();
    readTarget();
    shown = target;
    apply(shown);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
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
          className="absolute inset-0 h-full w-full motion-reduce:hidden"
                    viewBox="0 0 1000 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <mask id="hero-mask">
              <rect ref={maskRectRef} width="1000" height="560" fill="white" />
              <g ref={holeRef}>
              <text
                ref={textRef}
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
              </g>
            </mask>
          </defs>
          <rect ref={paperRectRef} width="1000" height="560" fill="var(--paper)" mask="url(#hero-mask)" />
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
