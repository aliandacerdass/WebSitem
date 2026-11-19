import { useCallback, useEffect, useRef, useState } from "react";

import { useSceneProgress } from "../../hooks/useSceneProgress";

type Stop = {
  id: string;
  tag: string;
  date: string;
  title: string;
  desc: string;
  /** O durakta aşılması gereken engel: tek cümle. */
  hurdle?: string;
  wins?: string[];
  /** Rotanın bu durağa vardığı oran (0-1), yol uzunluğuna göre ölçüldü. */
  at: number;
  /** journey.jpg üzerindeki çizili iğnenin yüzde konumu (1600x900). */
  pin?: { x: number; y: number; ring: number };
};

const stops: Stop[] = [
  {
    id: "btu",
    tag: "Başlangıç",
    date: "2024",
    title: "BTÜ, Yapay Zekâ ve Makine Öğrenmesi",
    desc: "Bursa Teknik Üniversitesi'nde bölüme başlangıç: Python, C ve Java temelleri, her kavram sıfırdan. 2026'da endüstri mühendisliği çift ana dalı.",
    hurdle: "Sıfırdan yazılım dilleri öğrenirken bir yandan kendimi geliştirmeye çalışmak.",
    wins: [
      "GPA 3.52 / 4.00",
      "Data League bootcamp ve Kaggle datathonu",
      "BTÜ Yapay Zekâ Topluluğu yönetim kurulu",
    ],
    at: 0,
    pin: { x: 18.4, y: 77.6, ring: 4.5 },
  },
  {
    id: "tua",
    tag: "İlk dereceler",
    date: "Mart 2026",
    title: "TUA Astro Hackathon 1.liği",
    desc: "Türkiye'nin ilk ulusal uzay temalı hackathonunda Ay rotası optimizasyonu ile Bursa üniversiteleri arasında 1.lik. Aynı ay Çanakkale Veri Bilimi Olimpiyatı'nda 2.lik.",
    hurdle:
      "A* düz mesafeye göre çalışınca rota dik yamaçlardan geçiyordu: maliyet fonksiyonuna eğim ve termal risk eklendi.",
    wins: [
      "Bursa üniversiteleri arası 1.lik, Türkiye 4.lüğü",
      "Veri Bilimi Olimpiyatı 2.liği",
      "NASA yükseklik verisinde topografya duyarlı A*",
    ],
    at: 0.235,
    pin: { x: 45.3, y: 66.0, ring: 2.6 },
  },
  {
    id: "gdg",
    tag: "AquaGate",
    date: "Temmuz 2026",
    title: "Build with AI 2.liği",
    desc: "GDG Bursa hackathonunda AquaGate: yapay zekânın su ayak izini görünür kılan ve gereksiz model çağrılarını önleyen ağ geçidi.",
    hurdle:
      "Prompt kısaldıkça doğruluk düşüyordu: token maliyeti ile çıktı kalitesi arasında ölçülebilir bir denge kurmak gerekti.",
    wins: [
      "GDG Bursa 2.liği",
      "Anlamsal önbellek ve küçük modele yönlendirme",
      "Su ve enerji tasarrufu ölçümü",
    ],
    at: 0.432,
    pin: { x: 36.0, y: 53.9, ring: 2.0 },
  },
  {
    id: "microsoft",
    tag: "Microsoft",
    date: "Temmuz-Ağustos 2026",
    title: "Microsoft AI Innovators",
    desc: "Microsoft programında internetsiz çalışan doküman asistanı: Foundry Local üzerinde RAG, otomatik testler ve ölçülmüş değerlendirme.",
    hurdle:
      "Wi-Fi kapalıyken çalıştığını söylemek yetmezdi: ağ gerçekten kesilip soğuk açılış test edildi.",
    wins: [
      "17/17 doğru cevap, 5/5 doğru ret",
      "45 otomatik test",
      "Çoklu ajan sistemleri ve Azure AI Foundry",
    ],
    at: 0.571,
    pin: { x: 47.7, y: 46.8, ring: 1.6 },
  },
  {
    id: "muninn",
    tag: "Girişim",
    date: "Eylül-Ekim 2026",
    title: "Muninn'i kurduk",
    desc: "Ayberk Kar ile kurucu ortaklık: internete çıkamayan fabrikalar için uzman onaylı ortak hafıza. Hasat 2026'da yarı final.",
    hurdle:
      "Daha büyük model her zaman daha iyi değildi: ortalama yükselirken bazı cevaplar geriliyordu. Kabul Kapısı bu yüzden doğdu.",
    wins: [
      "Çalışan internetsiz prototip",
      "Hasat 2026 yarı finali",
      "Otomotiv yan sanayiyle ilk saha görüşmesi",
    ],
    at: 0.722,
    pin: { x: 57.7, y: 39.2, ring: 1.4 },
  },
  {
    id: "nasa",
    tag: "Global tur",
    date: "Kasım 2026",
    title: "NASA Space Apps Challenge",
    desc: "SafePath: astronottan önce rover'ın yolu denediği Mars haritası. Bursa'da 8.lik ve global tura katılım.",
    hurdle:
      "Gizli bir engel çıktığında rotayı baştan hesaplamak yavaştı: D* Lite ile yalnızca bozulan kısım onarıldı.",
    wins: ["Bursa 8.liği, global tur", "Gerçek NASA arazi verisi", "36 onarım 0,13 saniyede"],
    at: 0.824,
    pin: { x: 65.6, y: 34.7, ring: 1.2 },
  },
  {
    id: "sirada",
    tag: "Sırada",
    date: "2027",
    title: "İlk fabrika pilotu",
    desc: "BTÜ Teknopark ön kuluçka başvurusu yapıldı. Hedef, Muninn'in bir fabrikanın kalite departmanında ilk pilotu.",
    at: 0.97,
  },
];

// Çizili rotanın sıralı noktaları (1600x900). journey-base.jpg bu rota
// silinerek üretildi; orijinal görsel bu çizgi boyunca maskeyle açılır.
const ROUTE =
  "M318 758 L343 740.8 L379.6 723.6 L426.2 708.7 L475.6 696.4 L525.5 684.3 L575.7 671.8 L625.7 659.9 L671.4 648.1 L703.7 637 L714.4 624.8 L704.2 609.7 L683.4 596.9 L659.5 588.3 L628.5 581.1 L584.9 573.3 L538.6 565.2 L504.2 557.4 L486.7 549.8 L484 542.7 L494.2 535.3 L516.5 527.5 L543 521.1 L563.3 516.8 L577 512.1 L590.2 504.4 L608.5 494.8 L636.1 486.1 L671.2 478.9 L710 472.4 L747.6 466.2 L775.3 459.3 L787.4 451.9 L785.6 445.3 L775.5 439.7 L766.5 433 L767.9 424.3 L788.4 415.3 L830.1 408 L880.4 402.4 L925.3 397.8 L955.5 392.7 L968.9 387.5 L971.5 383.8 L965.3 378.6 L948.3 370 L930.4 364.5 L923.8 362.3 L931.6 358.2 L960.5 353.2 L1006.4 349 L1048.9 344.5 L1072 340.3 L1076.2 336.3 L1069.4 329.6 L1058.6 323.5 L1056.9 319.8 L1073.5 315.3 L1103.2 310.5 L1136.8 307.2 L1166.8 304.3 L1185 301.4 L1183.5 296.6 L1170.4 289.4 L1169.5 284.8 L1189.4 281.9 L1216 277.4 L1230.2 271.5 L1221.3 265.3 L1205.6 259.4 L1207.8 253.2 L1215 246.8 L1207.5 241 L1191.9 236.1 L1182.2 231.5 L1186.6 227 L1197.9 221.5";

// Kaydırma ilerlemesinden çizim oranına: başta ve sonda kısa bir duraklama.
const DRAW_START = 0.04;
const DRAW_SPAN = 0.86;
const drawOf = (p: number) => Math.min(1, Math.max(0, (p - DRAW_START) / DRAW_SPAN));
const stopIndexAt = (d: number) => {
  let idx = 0;
  stops.forEach((s, i) => {
    if (d + 0.004 >= s.at) idx = i;
  });
  return idx;
};

function Notes({ stop }: { stop: Stop }) {
  if (!stop.hurdle && !stop.wins) return null;
  return (
    <>
      {stop.hurdle ? (
        <div className="mt-5 border-t border-[var(--ink)]/10 pt-4">
          <p className="label text-[10px] text-[var(--ink)]/45">Engel</p>
          <p className="mt-1.5 text-sm leading-snug text-[var(--ink)]/80">{stop.hurdle}</p>
        </div>
      ) : null}
      {stop.wins ? (
        <div className="mt-4 border-t border-[var(--ink)]/10 pt-4">
          <p className="label text-[10px] text-[var(--ink)]/45">Kazanım</p>
          <ul className="mt-1.5 space-y-1.5">
            {stop.wins.map((w) => (
              <li key={w} className="flex gap-2 text-sm leading-snug text-[var(--ink)]/85">
                <span
                  aria-hidden="true"
                  className="mt-[7px] size-1 shrink-0 rounded-full bg-[var(--ink-blue)]"
                />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

function StopHead({ stop }: { stop: Stop }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="label text-[var(--ink-blue)]">{stop.tag}</span>
        <span className="label text-[10px] text-[var(--ink)]/45">{stop.date}</span>
      </div>
      <h3 className="serif mt-3 text-3xl leading-tight">{stop.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/75">{stop.desc}</p>
    </>
  );
}

/**
 * Yolculuk (zirve): harita sabitlenir, kaydırdıkça mürekkep rota kendini
 * çizer. Rota bir durağa varınca çizili iğnenin halkası yanar ve not o
 * durağa geçer. Kendi iğnemizi çizmiyoruz; yalnızca halka. JS kapalıyken
 * ya da hareket azaltılmışken rota tam çizili, bütün duraklar liste hâlinde.
 */
export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const measureRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const activeRef = useRef(stops.length - 1);
  const [active, setActive] = useState(stops.length - 1);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.motion = "on";
    }
  }, []);

  const onFrame = useCallback((p: number) => {
    const d = drawOf(p);
    maskPathRef.current?.setAttribute("stroke-dashoffset", String(1 - d));
    const m = measureRef.current;
    const tip = tipRef.current;
    if (m && tip) {
      const pt = m.getPointAtLength(m.getTotalLength() * d);
      tip.setAttribute("cx", pt.x.toFixed(1));
      tip.setAttribute("cy", pt.y.toFixed(1));
      tip.style.opacity = d > 0.002 && d < 0.999 ? "1" : "0";
    }
    const idx = stopIndexAt(d);
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  }, []);

  useSceneProgress(ref, { mode: "pin", ease: 0.14, onFrame });

  const goTo = (s: Stop) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (s.at * DRAW_SPAN + DRAW_START + 0.01) * total,
      behavior: "smooth",
    });
  };

  const current = stops[active];

  return (
    <section
      id="yolculuk"
      ref={ref}
      data-scene
      data-theme="light"
      className="journey relative bg-[var(--cream)] text-[var(--ink)]"
    >
      <div className="journey-sticky flex flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 pb-8 pt-24 md:px-10 md:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="serif text-[clamp(2.6rem,6vw,5.5rem)] leading-none">Yolculuk</h2>
            <p className="max-w-[36ch] text-sm text-[var(--ink)]/65 md:text-base">
              Bir öğrenciden bir girişime: her durakta aştığım engel ve kazandığım şey.
            </p>
          </div>

          <div className="mt-8 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_330px] md:gap-10">
            {/* Harita: yüzde koordinatlar 1600x900 orana bağlı, kırpılmadan basılıyor */}
            <div className="relative aspect-[16/9] w-full select-none">
              <svg
                viewBox="0 0 1600 900"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Ufuktaki dağa uzanan, iğnelerle işaretlenmiş patika; rota kaydırdıkça mürekkeple çiziliyor"
              >
                <defs>
                  <mask
                    id="yolculuk-rota"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="1600"
                    height="900"
                  >
                    <path
                      ref={maskPathRef}
                      d={ROUTE}
                      fill="none"
                      stroke="#fff"
                      strokeWidth={22}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={1}
                      strokeDasharray="1 1"
                      strokeDashoffset={0}
                    />
                  </mask>
                </defs>
                <image href="/assets/journey-base.jpg" width="1600" height="900" />
                <image
                  href="/assets/journey.jpg"
                  width="1600"
                  height="900"
                  mask="url(#yolculuk-rota)"
                />
                <path ref={measureRef} d={ROUTE} fill="none" stroke="none" />
                <circle
                  ref={tipRef}
                  r="7"
                  cx="318"
                  cy="758"
                  fill="var(--ink-blue)"
                  className="ink-pulse"
                  style={{ opacity: 0 }}
                />
              </svg>

              {stops.map((s, i) =>
                s.pin ? (
                  <div
                    key={s.id}
                    className="group absolute aspect-square -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${s.pin.x}%`, top: `${s.pin.y}%`, width: `${s.pin.ring}%` }}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-full bg-[var(--ink-blue)]/15 transition-all duration-500 motion-reduce:transition-none ${
                        i === active ? "scale-[1.8] opacity-100" : "scale-50 opacity-0"
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-full border-2 border-[var(--ink-blue)] transition-all duration-500 motion-reduce:transition-none ${
                        i <= active ? "scale-100 opacity-100" : "scale-75 opacity-0"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => goTo(s)}
                      className="absolute left-1/2 top-1/2 size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink-blue)] focus-visible:ring-offset-2"
                    >
                      <span className="sr-only">
                        {s.tag}, {s.date}: {s.title}
                      </span>
                    </button>
                  </div>
                ) : null,
              )}
            </div>

            {/* Etkin durağın notu */}
            <article
              key={current.id}
              aria-live="polite"
              className="journey-card animate-in fade-in slide-in-from-bottom-2 border border-[var(--ink)]/12 bg-[var(--cream)] p-6 duration-500 motion-reduce:animate-none"
            >
              <StopHead stop={current} />
              <Notes stop={current} />
            </article>
          </div>
        </div>
      </div>

      {/* JS yokken ya da hareket azaltılmışken: bütün duraklar */}
      <ol className="journey-fallback mx-auto grid max-w-7xl gap-4 px-5 pb-24 md:grid-cols-2 md:px-10">
        {stops.map((s) => (
          <li key={s.id} className="border border-[var(--ink)]/12 p-6">
            <StopHead stop={s} />
            <Notes stop={s} />
          </li>
        ))}
      </ol>
    </section>
  );
}
