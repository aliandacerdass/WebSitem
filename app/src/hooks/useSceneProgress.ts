import { useEffect, useRef, type RefObject } from "react";

type Mode = "pin" | "enter";

type Options = {
  /**
   * pin: sticky sahne; 0 = bölüm ekranın üstüne değdi, 1 = sahnenin sonu.
   * enter: 0 = bölüm ekranın altından girdi, 1 = üstü ekranın %30'una ulaştı.
   */
  mode?: Mode;
  /** Her karede hedefe yaklaşma oranı; küçükse daha yumuşak. */
  ease?: number;
  /** Her karede çağrılır (rota çizimi gibi JS'le sürülen işler için). */
  onFrame?: (p: number) => void;
  /** Hareket azaltılmışken sabit kalınacak değer (çoğu sahne için son hal). */
  rest?: number;
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Bölümün kaydırma ilerlemesini 0-1 arasında hesaplar, yumuşatır ve
 * elemana `--p` CSS değişkeni olarak yazar. React durumu kullanılmaz:
 * her kaydırma konumu tek bir görünüme denk gelir, aşağı inip çıkmak
 * animasyonu bozamaz. Hareket azaltılmışsa p sabit `rest` değerinde kalır.
 */
export function useSceneProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { mode = "enter", ease = 0.12, onFrame, rest = 1 }: Options = {},
) {
  const frameRef = useRef(onFrame);
  frameRef.current = onFrame;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const set = (p: number) => {
      el.style.setProperty("--p", p.toFixed(4));
      frameRef.current?.(p);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(rest);
      return;
    }

    let raf = 0;
    let target = 0;
    let shown = 0;

    const read = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (mode === "pin") {
        const total = r.height - vh;
        target = total > 0 ? clamp(-r.top / total) : 0;
      } else {
        target = clamp((vh - r.top) / (vh * 0.7));
      }
    };
    const tick = () => {
      raf = 0;
      shown += (target - shown) * ease;
      if (Math.abs(target - shown) > 0.0005) {
        raf = requestAnimationFrame(tick);
      } else {
        shown = target;
      }
      set(shown);
    };
    const schedule = () => {
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    read();
    shown = target;
    set(shown);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, mode, ease, rest]);
}
