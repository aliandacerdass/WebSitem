import { useRef, type CSSProperties } from "react";

import { useSceneProgress } from "../../hooks/useSceneProgress";

const awards = [
  {
    place: "1.",
    title: "TUA Astro Hackathon",
    note: "Bursa üniversiteleri arası; Türkiye 4.lüğü",
    date: "Mart 2026",
  },
  { place: "2.", title: "Çanakkale Veri Bilimi Olimpiyatı", note: "Türkiye", date: "Mart 2026" },
  { place: "2.", title: "GDG Bursa Build with AI", note: "AquaGate ile", date: "Temmuz 2026" },
  {
    place: "8.",
    title: "NASA Space Apps Challenge",
    note: "Bursa; global tura katılım",
    date: "Kasım 2026",
  },
  {
    place: "Yarı final",
    title: "Hasat 2026",
    note: "Teknopark İstanbul, Muninn ile",
    date: "Ekim 2026",
  },
];

const toolkit = [
  {
    group: "Yapay zekâ",
    items:
      "LLM entegrasyonu, RAG, embedding, yerel LLM'ler (Ollama, Foundry Local), çoklu ajan sistemleri, model değerlendirme",
  },
  {
    group: "Backend ve araçlar",
    items: "FastAPI, REST API, Docker, Git ve GitHub, GitHub Actions, Supabase, Cloudflare Workers",
  },
  { group: "Programlama", items: "Python, C, Java" },
  { group: "Algoritmalar", items: "Rota planlama (A*, D* Lite), graf arama" },
  {
    group: "Sertifikalar",
    items: "BTK Akademi Git ve GitHub, MathWorks Statistics Onramp, Miuul Python ile Veri Bilimi",
  },
  { group: "Diller", items: "Türkçe (ana dil), İngilizce (B2, BTÜ hazırlık programı)" },
];

/**
 * Kanıtlar: dereceler büyük sıra numaralarıyla, yanında alet çantası.
 * Satırlar sahne girerken sırayla yükselir.
 */
export function Ledger({ id = "kanitlar" }: { id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useSceneProgress(ref, { mode: "enter" });

  return (
    <section
      id={id}
      ref={ref}
      data-scene
      data-theme="dark"
      className="grid-lines bg-[var(--night)] text-[var(--cream)]"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-5 py-20 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-7">
          <h2 className="serif text-[clamp(2.6rem,6vw,5.5rem)] leading-none">Dereceler</h2>
          <ol className="mt-10">
            {awards.map((a, i) => (
              <li
                key={a.title}
                className="kin-line grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-t border-[var(--cream)]/12 py-4 md:grid-cols-[7rem_1fr_auto] md:gap-6"
                style={{ "--d": 0.1 + i * 0.07 } as CSSProperties}
              >
                <span
                  className={`serif leading-none text-[var(--cream)] ${
                    a.place.length > 2 ? "text-2xl italic md:text-3xl" : "text-5xl md:text-6xl"
                  }`}
                >
                  {a.place}
                </span>
                <span>
                  <span className="block text-lg font-medium md:text-xl">{a.title}</span>
                  <span className="mt-1 block text-sm text-[var(--cream)]/60">{a.note}</span>
                </span>
                <span className="label col-start-2 text-[var(--cream)]/45 md:col-start-auto">
                  {a.date}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="md:col-span-5">
          <h2 className="serif text-[clamp(2rem,4vw,3.4rem)] leading-none">Alet çantası</h2>
          <dl className="mt-10 space-y-5">
            {toolkit.map((t, i) => (
              <div
                key={t.group}
                className="kin-line border-t border-[var(--cream)]/12 pt-4"
                style={{ "--d": 0.2 + i * 0.06 } as CSSProperties}
              >
                <dt className="label text-[var(--cream)]/50">{t.group}</dt>
                <dd className="mt-2 text-base leading-relaxed text-[var(--cream)]/85">{t.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
