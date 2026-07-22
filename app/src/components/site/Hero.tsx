import { useEffect, useRef } from "react";

// C3: maskeli hero. Dev "ANDAÇ" tipinin icinden gorsel gorunur; scroll
// maskeyi buyutur, gorsel full-bleed olur. Sticky + scrub (pin-spacer yok).
// Ilk kare eksiksiz cizilir; reduced-motion'da maske katmani gizli, statik hal.
export function Hero() {
  const wrapRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !wrapRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });
        tl.to(overlayRef.current, { scale: 26, ease: "none", transformOrigin: "50% 47%" }, 0)
          .to(imgRef.current, { scale: 1, ease: "none" }, 0)
          .to(titleRef.current, { y: -140, ease: "none" }, 0.15);

        // Baslik satiri mount'ta kurulur (viewport'a bagli degil)
        gsap.from(titleRef.current!.children, {
          y: 44,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
        });

        cleanup = () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section id="hero" ref={wrapRef} className="relative h-[220vh] md:h-[280vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <img
          ref={imgRef}
          src="/assets/hero.jpg"
          alt="Gece çalışma masası: makine öğrenmesi notları, kod ve kahve"
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />

        {/* Kagit rengi ortu, ANDAÇ seklinde deligi var; scroll ile buyur */}
        <svg
          ref={overlayRef}
          className="absolute inset-0 h-full w-full will-change-transform motion-reduce:hidden"
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
          className="absolute inset-x-0 bottom-14 z-10 mx-auto flex max-w-6xl flex-col items-start gap-5 px-5 md:px-8"
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
