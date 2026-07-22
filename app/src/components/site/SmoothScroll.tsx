import { useEffect, type ReactNode } from "react";

// Lenis yumusak scroll. Hero kendi transformunu dogrudan scroll'dan
// hesapladigi icin GSAP koprusune gerek yok; daha az JS, daha hizli acilis.
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: true, lerp: 0.12 });
      cleanup = () => lenis.destroy();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
