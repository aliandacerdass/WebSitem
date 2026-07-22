import { IconMail } from "./icons";

export function Contact() {
  return (
    <section id="iletisim" className="border-t border-[var(--hairline)] bg-[var(--paper-2)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-28 text-center md:px-8 md:py-40">
        <IconMail className="h-10 w-10" />
        <a
          href="mailto:aliandacerdass@gmail.com"
          className="underline-draw mt-8 text-5xl font-black tracking-tighter md:text-7xl"
        >
          İletişime Geç
        </a>
        <p className="mt-8 max-w-[50ch] text-base leading-relaxed text-[var(--ink)]/70">
          Yeni bir proje, staj, iş birliği veya sadece merak: defterin kapısı açık.
        </p>
        <div className="site-mono mt-10 flex flex-col items-center gap-3 text-sm md:flex-row md:gap-8">
          <a href="tel:+905054696151" className="hover:text-[var(--ink-blue)]">
            +90 505 469 61 51
          </a>
          <a
            href="https://www.linkedin.com/in/aliandacerdass/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--ink-blue)]"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <footer className="border-t border-[var(--hairline)]">
        <div className="site-mono mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-[var(--ink)]/60 md:flex-row md:px-8">
          <span>© 2026 Ali Andaç Erdaş</span>
          <span>aliandacerdass.dev</span>
          <div className="flex gap-5">
            <a
              href="mailto:aliandacerdass@gmail.com"
              className="hover:text-[var(--ink-blue)]"
            >
              E-posta
            </a>
            <a
              href="https://github.com/aliandacerdass"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--ink-blue)]"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aliandacerdass/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--ink-blue)]"
            >
              LinkedIn
            </a>
            <a href="tel:+905054696151" className="hover:text-[var(--ink-blue)]">
              Telefon
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
