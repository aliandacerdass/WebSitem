import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "../components/site/Nav";
import { Ledger } from "../components/site/Ledger";
import { Finale } from "../components/site/Finale";

export const Route = createFileRoute("/basarilar")({
  head: () => ({
    meta: [
      { title: "Başarılar · Ali Andaç Erdaş" },
      {
        name: "description",
        content:
          "Dereceler ve programlar: TUA Astro Hackathon 1.liği, GDG Build with AI 2.liği, NASA Space Apps global turu, Hasat 2026 yarı finali ve Microsoft AI Innovators.",
      },
    ],
  }),
  component: Achievements,
});

function Achievements() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--night)] text-[var(--cream)]">
        <section
          data-theme="dark"
          className="mx-auto max-w-7xl px-5 pb-8 pt-32 md:px-10 md:pb-12 md:pt-40"
        >
          <p className="label text-[var(--cream)]/55">✦ Başarılar</p>
          <h1 className="serif mt-6 max-w-[16ch] text-[clamp(3rem,8vw,7.5rem)] leading-[0.92]">
            Yarışmalar, programlar, <em className="italic">dereceler</em>.
          </h1>
          <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-[var(--cream)]/70 md:text-lg">
            Programlar: Microsoft AI Innovators (Temmuz-Ağustos 2026), Data League bootcamp ve
            Kaggle datathonu. Projelerin ayrıntısı ana sayfadaki Eserler ve Arşiv bölümlerinde.
          </p>
        </section>
        <Ledger id="dereceler" />
        <Finale />
      </main>
    </>
  );
}
