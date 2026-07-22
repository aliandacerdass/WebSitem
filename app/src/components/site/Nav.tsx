export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--hairline)] bg-[var(--paper)]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#hero" className="text-sm font-bold tracking-tight">
          Ali Andaç Erdaş
          <span className="text-[var(--ink-blue)]">.</span>
        </a>
        <div className="flex items-center gap-5 md:gap-8">
          <a href="#hakkimda" className="hidden text-sm hover:text-[var(--ink-blue)] md:block">
            Hakkımda
          </a>
          <a href="#projeler" className="text-sm hover:text-[var(--ink-blue)]">
            Projeler
          </a>
          <a href="#yolculuk" className="hidden text-sm hover:text-[var(--ink-blue)] md:block">
            Yolculuk
          </a>
          <a
            href="mailto:aliandacerdass@gmail.com"
            className="site-mono text-xs text-[var(--ink-blue)]"
          >
            aliandacerdass@gmail.com
          </a>
        </div>
      </nav>
    </header>
  );
}
