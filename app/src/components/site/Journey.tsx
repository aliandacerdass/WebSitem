import { useEffect, useRef, useState } from "react";

type Waypoint = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  /** Not defterinden kazanımlar: kısa, tek satırlık maddeler. */
  wins: string[];
  /** Tarih biliniyorsa mono etiket olarak basılır. */
  date?: string;
  /** journey.jpg üzerindeki iğnenin yüzde konumu (1600x900 ölçüsünden). */
  x: number;
  y: number;
  /** İşaret halkasının çapı, harita genişliğinin yüzdesi olarak.
   *  Çizili iğne ufka doğru küçüldüğü için her durakta farklı. */
  ring: number;
};

const waypoints: Waypoint[] = [
  {
    id: "bolum-01",
    tag: "Bölüm 01",
    title: "BTÜ, Yapay Zeka ve Makine Öğrenmesi",
    desc: "Bursa Teknik Üniversitesi'nde bölüme başlangıç: Python, C ve Java temelleri, her kavram sıfırdan.",
    wins: ["1. yıl tamamlandı", "Python, C ve Java temelleri"],
    x: 18.4,
    y: 77.6,
    ring: 4.5,
  },
  {
    id: "bolum-02",
    tag: "Bölüm 02",
    title: "Data League",
    desc: "Üniversiteler arası veri ligi: 4 haftalık bootcamp ve Kaggle eleme datathonu, sertifikayla tamamlandı.",
    wins: ["4 haftalık bootcamp", "Kaggle eleme datathonu", "Sertifika"],
    x: 45.3,
    y: 66.0,
    ring: 2.6,
  },
  {
    id: "bolum-03",
    tag: "Bölüm 03",
    title: "TUA Astro Hackathon, 1.lik",
    desc: "Türkiye'nin ilk ulusal uzay temalı hackathonunda Ay rotası optimizasyonu ile Bursa üniversiteleri arasında 1.lik.",
    wins: [
      "Bursa üniversiteleri arası 1.lik",
      "Türkiye genelinde 4.lük",
      "NASA yükseklik verisi üzerinde topografya duyarlı A*",
    ],
    date: "29.03.2026",
    x: 36.0,
    y: 53.9,
    ring: 2.0,
  },
  {
    id: "bolum-04",
    tag: "Bölüm 04",
    title: "Build with AI, 2.lik",
    desc: "GDG Bursa'nın çadırlı hackathonunda LLM prompt optimizasyonu projesiyle 2.lik ödülü.",
    wins: ["GDG Bursa 2.lik", "LLM prompt optimizasyonu", "Green AI yaklaşımı"],
    x: 47.7,
    y: 46.8,
    ring: 1.6,
  },
  {
    id: "bolum-05",
    tag: "Bölüm 05",
    title: "Microsoft AI Innovators",
    desc: "Microsoft mentorluğunda yaz programı: çoklu ajan sistemleri, Agent Framework ve Azure AI Foundry.",
    wins: ["Programa kabul", "Çoklu ajan sistemleri", "Agent Framework ve Azure AI Foundry"],
    x: 57.7,
    y: 39.2,
    ring: 1.4,
  },
  {
    id: "sirada",
    tag: "Sırada",
    title: "Kendi girişim denemelerim",
    desc: "CV Booster, Fal Uygulaması ve ajan takımları: fikirden ürüne her deneme, bir sonraki girişimin temeli.",
    wins: ["CV Booster: LLM destekli mobil uygulama", "Fal Uygulaması", "Ajan takımları"],
    x: 65.6,
    y: 34.7,
    ring: 1.2,
  },
];

/**
 * Çizimdeki iğnenin etrafına oturan halka. Kendi iğnemi çizmiyorum: çizili
 * iğneyi ikizlemek yerine sadece işaretliyorum. Ölçü sarmalayıcıdan gelir,
 * o da harita genişliğinin yüzdesi olduğu için her ekranda hizada kalır.
 */
function PinRing({ open }: { open: boolean }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full bg-[var(--ink-blue)]/12 transition-all duration-300 motion-reduce:transition-none ${
          open ? "scale-[1.7] opacity-100" : "scale-50 opacity-0"
        }`}
      />
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full border-2 border-[var(--ink-blue)] transition-all duration-300 motion-reduce:transition-none ${
          open
            ? "scale-100 opacity-100"
            : "scale-75 opacity-30 group-hover:scale-95 group-hover:opacity-80"
        }`}
      />
    </>
  );
}

function WinList({ wins }: { wins: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {wins.map((w) => (
        <li key={w} className="flex gap-2 text-sm leading-snug text-[var(--ink)]/80">
          <span
            aria-hidden="true"
            className="mt-[7px] size-1 shrink-0 rounded-full bg-[var(--ink-blue)]"
          />
          <span>{w}</span>
        </li>
      ))}
    </ul>
  );
}

export function Journey() {
  const [openId, setOpenId] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Escape ile kapat, harita dışına tıklayınca kapat.
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (mapRef.current && !mapRef.current.contains(e.target as Node)) setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openId]);

  return (
    <section id="yolculuk" className="relative border-t border-[var(--hairline)] bg-[var(--paper)]">
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <p className="site-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-blue)]">
          Eğitim Koşusu
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tighter md:text-5xl">Yolculuk</h2>
        <p className="mt-4 hidden max-w-lg text-sm text-[var(--ink)]/70 md:block">
          Patikadaki iğnelere dokun: her durakta ne kazandığımı okuyabilirsin.
        </p>
        <p className="mt-4 max-w-lg text-sm text-[var(--ink)]/70 md:hidden">
          Her durakta ne kazandığım kartların içinde.
        </p>

        {/* Harita: sadece md ve üstü. Yüzde koordinatlar 1600x900 orana bağlı,
            bu yüzden görsel kırpılmadan (aspect-ratio ile) basılıyor. */}
        <div
          ref={mapRef}
          className="relative mt-12 hidden aspect-[16/9] w-full select-none md:block"
        >
          <img
            src="/assets/journey.jpg"
            alt="Ufuktaki dağa uzanan, iğnelerle işaretlenmiş patika çizimi"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full rounded-[4px] object-cover"
          />

          {waypoints.map((w, i) => {
            const open = openId === w.id;
            // Sağ yarıdaki iğnelerde kart sola açılsın, ekran dışına taşmasın.
            const flipX = w.x > 55;
            // Ufka yakin iğnelerde yukarida yer yok: kart asagi acilir.
            const flipY = w.y < 45;
            return (
              <div
                key={w.id}
                className="group absolute aspect-square -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${w.x}%`, top: `${w.y}%`, width: `${w.ring}%` }}
              >
                <PinRing open={open} />
                {/* Şeffaf tetikleyici: çizili iğneyi ikizlemez, sadece işaretler.
                    Uzaktaki iğneler küçüldüğü için dokunma hedefi 44px sabit. */}
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${w.id}-panel`}
                  onClick={() => setOpenId(open ? null : w.id)}
                  className="site-pin absolute left-1/2 top-1/2 size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink-blue)] focus-visible:ring-offset-2"
                >
                  <span className="sr-only">
                    {i + 1}. durak, {w.tag}: {w.title}
                  </span>
                </button>

                {open ? (
                  <article
                    id={`${w.id}-panel`}
                    style={{
                      transform: `translate(${flipX ? "calc(-100% + 22px)" : "-22px"}, ${
                        flipY ? "34px" : "calc(-100% - 14px)"
                      })`,
                    }}
                    className="absolute left-1/2 top-0 z-10 w-[290px] rounded-[4px] border border-[var(--ink)]/15 bg-[var(--paper)]/97 p-5 shadow-lg backdrop-blur-sm"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="site-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-blue)]">
                        {w.tag}
                      </span>
                      {w.date ? (
                        <span className="site-mono text-[11px] text-[var(--ink)]/45">{w.date}</span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-base font-bold leading-tight tracking-tight">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/75">{w.desc}</p>
                    <WinList wins={w.wins} />
                  </article>
                ) : null}
                <span className="sr-only">{i + 1}. durak</span>
              </div>
            );
          })}
        </div>

        {/* Mobil: harita yerine kartlar, içerik aynı. */}
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 md:hidden">
          {waypoints.map((w) => (
            <article
              key={w.id}
              className="w-[270px] shrink-0 snap-start rounded-[4px] border border-[var(--ink)]/15 bg-[var(--paper)]/92 p-6 backdrop-blur-sm"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="site-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-blue)]">
                  {w.tag}
                </span>
                {w.date ? (
                  <span className="site-mono text-[11px] text-[var(--ink)]/45">{w.date}</span>
                ) : null}
              </div>
              <h3 className="mt-3 text-lg font-bold tracking-tight">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/75">{w.desc}</p>
              <WinList wins={w.wins} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
