import { createFileRoute } from "@tanstack/react-router";

import { SmoothScroll } from "../components/site/SmoothScroll";
import { Nav } from "../components/site/Nav";
import { Hero } from "../components/site/Hero";
import { About } from "../components/site/About";
import { Projects } from "../components/site/Projects";
import { Skills } from "../components/site/Skills";
import { Journey } from "../components/site/Journey";
import { Contact } from "../components/site/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <main className="min-h-dvh bg-[var(--paper)] text-[var(--ink)]">
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
