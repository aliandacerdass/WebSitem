import { useEffect, useRef, useState } from "react";

type Work = {
  id: string;
  meta: string;
  title: string;
  lede: string;
  body: string;
  metric: string;
  metricLabel: string;
  link: { href: string; label: string };
  art: { src: string; alt: string; credit: string; engraving?: boolean };
  plate?: { src: string; alt: string };
};

const works: Work[] = [
  {
    id: "muninn",
    meta: "2026 · Kurucu ortak",
    title: "Muninn",
    lede: "İnternete çıkamayan fabrikalar için uzman onaylı ortak hafıza.",
    body: "Çalışan sorar; cevap yoksa soru uzmana düşer, uzman bir kez onaylar, bilgi herkesin olur. Yerel modeller, Türkçe arama ve Wi-Fi kapalıyken test edilmiş Docker kurulumu. Kabul Kapısı, yeni bir modeli kurumun kendi sorularıyla soru soru sınar.",
    metric: "%95 → %67",
    metricLabel: "Kabul Kapısı'nın durdurduğu model geçişi: 7 soru geriledi",
    link: { href: "https://muninnhq.com/", label: "muninnhq.com" },
    art: {
      src: "/assets/art/odin.jpg",
      alt: "Odin tahtında, omuzlarında Huginn ve Muninn kuzgunları",
      credit: "Odin ve kuzgunları Huginn ile Muninn, 19. yüzyıl gravürü",
      engraving: true,
    },
    plate: {
      src: "/assets/plates/muninn.jpg",
      alt: "Muninn Kabul Kapısı ekranı ve GEÇEMEZ damgası",
    },
  },
  {
    id: "safepath",
    meta: "Kasım 2026 · NASA Space Apps Challenge",
    title: "SafePath",
    lede: "Önce rover yürür, sonra astronot.",
    body: "Jezero kraterinde astronot için katmanlı Mars haritası. Rota motorunu ben yazdım: D* Lite gerçek NASA arazi verisinde en hızlı, en güvenli ve en verimli üç rotayı hesaplar, batarya ve oksijeni kontrol eder, gizli bir engelde yolu baştan değil yerinde onarır.",
    metric: "0,13 sn",
    metricLabel: "36 yerinde onarımın toplam süresi. Bursa 8.liği, global tur",
    link: { href: "https://aliandacerdass.github.io/NASA_Spaceapp26/", label: "Canlı demo" },
    art: {
      src: "/assets/art/astronomer.jpg",
      alt: "Vermeer, Astronom: penceredeki ışıkta gök küresine uzanan bilgin",
      credit: "Johannes Vermeer, Astronom, 1668",
    },
    plate: { src: "/assets/plates/safepath.jpg", alt: "SafePath açılış ekranı ve Mars küresi" },
  },
  {
    id: "aquagate",
    meta: "Temmuz 2026 · GDG Bursa Build with AI",
    title: "AquaGate",
    lede: "Yapay zekânın görünmeyen su faturası.",
    body: "Uygulamalarla dil modelleri arasına giren bir ağ geçidi. Gereksiz model çağrılarını prompt kırpma, anlamsal önbellek ve basit soruları küçük modele yönlendirerek önler; tasarruf edilen su ve enerjiyi WUE/PUE yöntemiyle ölçüp canlı gösterir.",
    metric: "2.",
    metricLabel: "GDG Bursa Build with AI hackathonu, beş kişilik takım",
    link: { href: "https://github.com/aliandacerdass/GDGHackathon2026", label: "GitHub" },
    art: {
      src: "/assets/art/airpump.jpg",
      alt: "Wright of Derby, Hava Pompasında Bir Kuş Üzerine Deney: mum ışığında toplanmış izleyiciler",
      credit: "Joseph Wright of Derby, Hava Pompası Deneyi, 1768",
    },
  },
  {
    id: "microsoft",
    meta: "Temmuz-Ağustos 2026 · Microsoft AI Innovators",
    title: "İnternetsiz doküman asistanı",
    lede: "Ağ yokken de kaynağıyla cevap veren yapay zekâ.",
    body: "Microsoft programında Foundry Local üzerinde tamamen yerel çalışan bir RAG asistanı: veri işleme, embedding, arama ve cevap üretimi. 45 otomatik test ve 22 soruluk değerlendirme setiyle ölçüldü; ağ gerçekten kesilip çalıştığı doğrulandı.",
    metric: "17/17",
    metricLabel: "doğru cevap ve 5/5 doğru ret",
    link: { href: "https://github.com/aliandacerdass/MicrosoftBuildLocalLLM", label: "GitHub" },
    art: {
      src: "/assets/art/geographer.jpg",
      alt: "Vermeer, Coğrafyacı: belgelerin üzerine eğilmiş, pusulalı bilgin",
      credit: "Johannes Vermeer, Coğrafyacı, 1669",
    },
  },
];

function Art({ w, className = "" }: { w: Work; className?: string }) {
  return (
    <img
      src={w.art.src}
      alt={w.art.alt}
      loading="lazy"
      className={`h-full w-full object-cover ${className}`}
      style={w.art.engraving ? { filter: "sepia(0.4) brightness(0.9) contrast(1.05)" } : undefined}
    />
  );
}

/**
 * Eserler: masaüstünde solda sabit çerçeve, sağda kayan dört kayıt. Ortadaki
 * kayıt değişince çerçevedeki tablo alttan yukarı silinerek değişir; köşede
 * ürünün gerçek ekranı plaka olarak durur. Mobilde her kaydın tablosu kendi
 * üstünde.
 */
export function Works() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="eserler"
      data-theme="dark"
      className="grid-lines bg-[var(--night)] text-[var(--cream)]"
    >
      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-28">
        <h2 className="serif text-[clamp(2.6rem,6vw,5.5rem)] leading-none">Eserler</h2>
        <p className="mt-4 max-w-[48ch] text-base text-[var(--cream)]/65">
          Dört deney: ne kurdum, nasıl ölçtüm, sonuç ne oldu.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-5 pb-20 md:grid-cols-2 md:px-10 md:pb-24">
        {/* Masaüstü: sabit çerçeve */}
        <div className="sticky top-0 hidden h-dvh items-center md:flex">
          <figure className="w-full">
            <div className="relative mx-auto aspect-[4/5] max-h-[72vh] w-full">
              <div className="absolute inset-0 overflow-hidden bg-[var(--abyss)]">
                {works.map((w, i) => (
                  <div
                    key={w.id}
                    className="work-layer absolute inset-0"
                    data-active={i === active}
                    aria-hidden={i !== active}
                  >
                    <Art w={w} />
                  </div>
                ))}
              </div>
              {works.map((w, i) =>
                w.plate ? (
                  <img
                    key={w.id}
                    src={w.plate.src}
                    alt={w.plate.alt}
                    loading="lazy"
                    className={`absolute -bottom-6 -right-6 w-[46%] border border-[var(--cream)]/20 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.7)] transition-all duration-700 motion-reduce:transition-none ${
                      i === active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  />
                ) : null,
              )}
              <span aria-hidden="true" className="absolute -left-3 -top-3 text-[var(--cream)]/40">
                ✦
              </span>
            </div>
            <figcaption className="label mt-10 text-[10px] text-[var(--cream)]/45">
              {works[active].art.credit}
            </figcaption>
          </figure>
        </div>

        {/* Kayıtlar */}
        <div>
          {works.map((w, i) => (
            <article
              key={w.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
              className="flex min-h-[48vh] flex-col justify-center border-t border-[var(--cream)]/12 py-12 md:py-14"
            >
              <div className="mb-8 aspect-[4/3] overflow-hidden md:hidden">
                <Art w={w} />
              </div>
              <p className="label text-[var(--cream)]/55">{w.meta}</p>
              <h3 className="serif mt-4 text-[clamp(2.4rem,4.4vw,4rem)] leading-[1.02]">
                {w.title}
              </h3>
              <p className="serif mt-3 text-2xl italic text-[var(--cream)]/80">{w.lede}</p>
              <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-[var(--cream)]/70">
                {w.body}
              </p>
              <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-5">
                <span className="serif text-[clamp(2.4rem,4vw,3.6rem)] leading-none text-[var(--cream)]">
                  {w.metric}
                </span>
                <span className="max-w-[26ch] pb-1 text-sm leading-snug text-[var(--cream)]/55">
                  {w.metricLabel}
                </span>
              </div>
              <a
                href={w.link.href}
                target="_blank"
                rel="noreferrer"
                className="label underline-draw mt-8 w-fit text-[var(--cream)]"
              >
                {w.link.label} ↗
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
