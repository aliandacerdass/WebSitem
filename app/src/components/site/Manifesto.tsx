import { useRef, type CSSProperties } from "react";

import { useSceneProgress } from "../../hooks/useSceneProgress";

const lines = [
  "Bursa Teknik Üniversitesi'nde yapay zekâ ve makine öğrenmesi okuyorum, endüstri mühendisliğinde çift ana dal yapıyorum.",
  "Muninn'in kurucu ortağıyım: internete çıkamayan fabrikalar için yerel yapay zekâ.",
];

// Rakamların hepsi gerçek: GPA, derece sayısı (TUA, Çanakkale, GDG, NASA,
// Hasat) ve sitede listelenen proje sayısı (4 eser + 8 arşiv).
const facts = [
  { value: "3.52", label: "GPA, 4.00 üzerinden" },
  { value: "5", label: "derece ve ödül" },
  { value: "12", label: "proje ve deney" },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  useSceneProgress(ref, { mode: "enter" });

  return (
    <section
      id="hakkimda"
      ref={ref}
      data-scene
      data-theme="light"
      className="bg-[var(--cream)] text-[var(--ink)]"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-24">
        <p className="label text-[var(--ink)]/50 md:col-span-3 md:pt-4">✦ Hakkımda</p>

        <div className="md:col-span-9">
          <h2 className="serif text-[clamp(1.9rem,3.5vw,3.5rem)] leading-[1.1] [&>span+span]:mt-4">
            {lines.map((l, i) => (
              <span key={l} className="kin-line block" style={{ "--d": i * 0.14 } as CSSProperties}>
                {l}
              </span>
            ))}
          </h2>

          <p
            className="kin-line mt-8 block max-w-[56ch] text-base leading-relaxed text-[var(--ink)]/75 md:text-lg"
            style={{ "--d": 0.3 } as CSSProperties}
          >
            Her işi bir deney gibi kuruyorum: hipotez, ölçüm, sonuç. Bir modelin ne kadar iyi
            olduğunu ortalamasına değil, hangi soruda gerilediğine bakarak anlıyorum.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--hairline)] pt-8">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className="kin-line block"
                style={{ "--d": 0.4 + i * 0.06 } as CSSProperties}
              >
                <dt className="label text-[var(--ink)]/50">{f.label}</dt>
                <dd className="serif mt-2 text-[clamp(2.6rem,5vw,4.5rem)] leading-none">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/cv.pdf"
              download="Ali-Andac-Erdas-CV.pdf"
              className="label border border-[var(--ink)] px-5 py-3 transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)] motion-reduce:transition-none"
            >
              CV İndir
            </a>
            <a
              href="https://github.com/aliandacerdass"
              target="_blank"
              rel="noreferrer"
              className="label border border-[var(--ink)]/25 px-5 py-3 transition-colors hover:border-[var(--ink-blue)] hover:text-[var(--ink-blue)] motion-reduce:transition-none"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
