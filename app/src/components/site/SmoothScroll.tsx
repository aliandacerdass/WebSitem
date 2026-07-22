import { useEffect, type ReactNode } from "react";

// Lenis + GSAP ScrollTrigger koprusu. autoRaf kapali, gsap.ticker surer;
// kopru olmadan scrub takilir. Tamamen client-side (useEffect).
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
