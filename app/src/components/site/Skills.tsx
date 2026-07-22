import { IconBulb, IconNetwork, IconNotebook, IconPhone, IconSnake } from "./icons";

export function Skills() {
  return (
    <section className="border-t border-[var(--hairline)] bg-[var(--paper)]">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <h2 className="text-4xl font-bold tracking-tighter md:text-5xl">Alet çantası</h2>

        <div className="mt-14 grid gap-3 md:grid-cols-4 md:grid-rows-2">
          <div className="dot-grid flex flex-col justify-between rounded-[4px] border border-[var(--ink)]/15 p-7 md:col-span-2 md:row-span-2">
            <IconNetwork className="h-14 w-14" />
            <div>
              <h3 className="mt-10 text-2xl font-bold tracking-tight">
                Makine Öğrenmesi ve Python
              </h3>
              <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-[var(--ink)]/70">
                Temelden kuruyorum: gradyan inişten model eğitimine, veri
                hazırlıktan değerlendirmeye. Ana dilim Python.
              </p>
            </div>
          </div>

          <div className="rounded-[4px] border border-[var(--ink)]/15 bg-[var(--paper-2)] p-6">
            <IconPhone className="h-9 w-9" />
            <h3 className="mt-5 font-bold tracking-tight">Flutter ile Mobil</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/70">
              Fal Uygulaması dahil, fikirden mağazaya uygulama geliştirme.
            </p>
          </div>

          <div className="rounded-[4px] border border-[var(--ink)]/15 p-6">
            <IconSnake className="h-9 w-9" />
            <h3 className="mt-5 font-bold tracking-tight">LLM Ajanları</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/70">
              Çok rollü ajan takımları kurma, yönlendirme ve orkestrasyon.
            </p>
          </div>

          <div className="rounded-[4px] border border-[var(--ink)]/15 p-6">
            <IconBulb className="h-9 w-9" />
            <h3 className="mt-5 font-bold tracking-tight">Girişimcilik</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/70">
              Geleceğin problemlerine ürün düşünmek, fikirden şirkete.
            </p>
          </div>

          <div className="rounded-[4px] border border-[var(--ink)]/15 bg-[var(--ink-blue)] p-6 text-[var(--paper)]">
            <IconNotebook className="h-9 w-9 [&]:stroke-[var(--paper)]" style={{ stroke: "var(--paper)" }} />
            <h3 className="mt-5 font-bold tracking-tight">Sürekli Öğrenme</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--paper)]/85">
              Her gün defter açık: yeni model, yeni araç, yeni deney.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
