import { useRef, useState, type PointerEvent } from "react";

type Entry = {
  name: string;
  desc: string;
  year: string;
  img?: string;
  href?: string;
};

const entries: Entry[] = [
  {
    name: "Ay Rotası Optimizasyonu",
    desc: "TUA Astro Hackathon 1.liği: NASA yükseklik verisinde eğim ve termal risk maliyetli A* rota motoru.",
    year: "Mart 2026",
    img: "/assets/project-ayrotasi.jpg",
  },
  {
    name: "HackathonBuilder",
    desc: "Claude, GPT ve Gemini'den kurulu konsey ve hakem; kaynakları doğrulayan araştırma ajanları.",
    year: "2026",
    href: "https://github.com/aliandacerdass/HackathonBuilder",
  },
  {
    name: "Türkçe Makale Özetleri",
    desc: "Her sabah öne çıkan yapay zekâ makalelerini Türkçe özetleyip yayımlayan otomatik hat.",
    year: "2026",
    href: "https://github.com/aliandacerdass/AI-ML-TurkceMakaleArsivi",
  },
  {
    name: "SmartGrid-Core",
    desc: "Yenilenebilir enerjiyi kritiklik sırasıyla dağıtan şebeke simülatörü ve SCADA paneli.",
    year: "Haziran 2026",
    img: "/assets/project-smartgrid.jpg",
    href: "https://github.com/aliandacerdass/SmartGrid-Core",
  },
  {
    name: "CV Booster",
    desc: "LLM destekli CV iyileştirme uygulaması: FastAPI, IP ve cihaz bazlı hız sınırı.",
    year: "2025",
    img: "/assets/project-cvbooster.png",
  },
  {
    name: "Fal Uygulaması",
    desc: "Fincan fotoğrafından yapay zekâ destekli yorum üreten mobil uygulama.",
    year: "2025",
    img: "/assets/project-fal.jpg",
  },
  {
    name: "Şirket AI Konseyi",
    desc: "Strateji ve ürün kararlarını tartışan yedi rollü yapay zekâ konseyi.",
    year: "2026",
    img: "/assets/project-konsey.jpg",
  },
  {
    name: "Andaç Anime",
    desc: "Character Bible ve LoRA ile her pozda aynı kalan özgün karakter.",
    year: "2026",
    img: "/assets/project-anime.jpg",
  },
];

/**
 * Arşiv: sekiz deney tek ekranda dizin olarak. Masaüstünde satırın üstüne
 * gelince görseli imleci izleyen bir plakada açılır.
 */
export function Archive() {
  const [preview, setPreview] = useState<string | null>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent) => {
    const el = plateRef.current;
    if (!el || e.pointerType !== "mouse") return;
    el.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 110}px, 0)`;
  };

  return (
    <section
      id="arsiv"
      data-theme="light"
      className="bg-[var(--cream-2)] text-[var(--ink)]"
      onPointerMove={move}
    >
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="serif text-[clamp(2.6rem,6vw,5.5rem)] leading-none">Arşiv</h2>
          <p className="max-w-[40ch] text-base text-[var(--ink)]/65">
            Hackathonlar, ders projeleri ve kendi denemelerim.
          </p>
        </div>

        <ul className="mt-10 border-b border-[var(--ink)]/15">
          {entries.map((e) => {
            const inner = (
              <>
                <span className="serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight md:col-span-4">
                  {e.name}
                </span>
                <span className="text-sm leading-relaxed text-[var(--ink)]/70 md:col-span-6 md:text-base">
                  {e.desc}
                </span>
                <span className="label text-[var(--ink)]/50 md:col-span-2 md:text-right">
                  {e.year}
                  {e.href ? " ↗" : ""}
                </span>
              </>
            );
            const cls =
              "grid gap-2 border-t border-[var(--ink)]/15 py-4 transition-colors md:grid-cols-12 md:items-baseline md:gap-6 motion-reduce:transition-none";
            const hover = {
              onPointerEnter: (ev: PointerEvent) => {
                if (ev.pointerType === "mouse") setPreview(e.img ?? null);
              },
              onPointerLeave: () => setPreview(null),
            };
            return (
              <li key={e.name}>
                {e.href ? (
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${cls} hover:text-[var(--ink-blue)]`}
                    {...hover}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cls} {...hover}>
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div
        ref={plateRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      >
        <div
          className={`h-[200px] w-[280px] overflow-hidden border border-[var(--ink)]/15 bg-[var(--cream)] shadow-[0_20px_40px_-16px_rgb(0_0_0/0.45)] transition-opacity duration-300 motion-reduce:transition-none ${
            preview ? "opacity-100" : "opacity-0"
          }`}
        >
          {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : null}
        </div>
      </div>
    </section>
  );
}
