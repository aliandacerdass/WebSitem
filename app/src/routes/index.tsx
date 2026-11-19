import { createFileRoute } from "@tanstack/react-router";

import { SmoothScroll } from "../components/site/SmoothScroll";
import { Nav } from "../components/site/Nav";
import { Hero } from "../components/site/Hero";
import { Manifesto } from "../components/site/Manifesto";
import { Works } from "../components/site/Works";
import { Archive } from "../components/site/Archive";
import { Journey } from "../components/site/Journey";
import { Ledger } from "../components/site/Ledger";
import { Finale } from "../components/site/Finale";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <Nav />
      <main className="min-h-dvh bg-[var(--cream)] text-[var(--ink)]">
        <Hero />
        <Manifesto />
        <Works />
        <Archive />
        <Journey />
        <Ledger />
        <Finale />
      </main>
    </SmoothScroll>
  );
}
