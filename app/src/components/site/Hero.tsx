import { useRef, type CSSProperties } from "react";

import { useSceneProgress } from "../../hooks/useSceneProgress";

// Giriş: Wright of Derby'nin Orrery tablosu tam ekran. Kaydırdıkça kamera
// lambanın aydınlattığı gezegen modeline doğru iter, başlık yukarı süzülüp
// söner, sahne kararır. p=0 başlangıç (metin görünür), JS yokken de böyle.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useSceneProgress(ref, { mode: "pin", rest: 0, ease: 0.1 });

  return (
    <section
      ref={ref}
      data-scene
      data-theme="dark"
      className="relative h-[135vh] bg-[var(--night)]"
      style={{ "--p": 0 } as CSSProperties}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <img
          src="/assets/art/orrery.jpg"
          alt="Joseph Wright of Derby, Orrery Üzerine Ders Veren Filozof: lambanın aydınlattığı yüzler bir gezegen modelinin etrafında toplanmış"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover [object-position:52%_62%]"
          style={{
            transform: "scale(calc(1.02 + var(--p) * 0.18))",
            transformOrigin: "47% 66%",
          }}
        />
        {/* Metnin oturduğu köşede scrim; tablonun geri kalanı açık kalır */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(135% 110% at 0% 100%, rgb(11 11 10 / 0.92) 0%, rgb(11 11 10 / 0.62) 45%, transparent 78%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--night)]"
          style={{ opacity: "calc(var(--p) * 0.55)" }}
        />

        <div
          className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl flex-col gap-7 px-5 pb-14 text-[var(--cream)] md:px-10 md:pb-20"
          style={{
            transform: "translateY(calc(var(--p) * -14vh))",
            opacity: "calc(1 - var(--p) * 1.3)",
          }}
        >
          <p className="label text-[var(--cream)]/90 [text-shadow:0_1px_12px_rgb(0_0_0/0.8)]">
            ✦ Yapay zekâ ve makine öğrenmesi · Endüstri mühendisliği · Bursa
          </p>
          <h1 className="serif max-w-[14ch] text-[clamp(3rem,7.4vw,7.6rem)] leading-[0.92]">
            Sistemleri kurar, ölçer, <em className="italic">ürüne</em> çeviririm.
          </h1>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[46ch] text-base leading-relaxed text-[var(--cream)]/80 md:text-lg">
              Ben Ali Andaç Erdaş: Bursa Teknik Üniversitesi'nde yapay zekâ öğrencisi, internetsiz
              çalışan kurumsal yapay zekâ girişimi Muninn'in kurucu ortağı.
            </p>
            <a href="#eserler" className="label underline-draw w-fit text-[var(--cream)]">
              Çalışmaları gör
            </a>
          </div>
        </div>

        <p className="label absolute bottom-5 right-5 z-10 hidden text-[10px] text-[var(--cream)]/45 md:block md:right-10">
          Joseph Wright of Derby, Orrery Üzerine Ders, 1766
        </p>
      </div>
    </section>
  );
}
