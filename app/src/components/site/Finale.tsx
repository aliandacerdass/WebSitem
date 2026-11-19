import { useRef, type PointerEvent } from "react";

const contacts = [
  { href: "mailto:aliandacerdass@gmail.com", label: "aliandacerdass@gmail.com" },
  { href: "https://www.linkedin.com/in/aliandacerdass/", label: "LinkedIn ↗", external: true },
  { href: "https://github.com/aliandacerdass", label: "GitHub ↗", external: true },
  { href: "tel:+905054696151", label: "+90 505 469 61 51" },
];

/**
 * Kapanış: Friedrich'in Gezgin'i ileriye bakar, imlece hafifçe karşılık
 * verir. Sayfa burada çözülür ve durur: davet, iletişim, künye.
 */
export function Finale() {
  const artRef = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = artRef.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translate3d(${(-mx * 18).toFixed(1)}px, ${(-my * 12).toFixed(1)}px, 0) scale(1.07)`;
  };

  return (
    <section
      id="iletisim"
      data-theme="dark"
      onPointerMove={onMove}
      className="bg-[var(--abyss)] text-[var(--cream)]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-10 md:py-24">
        <div className="order-2 md:order-1">
          <h2 className="serif text-[clamp(2.8rem,6.4vw,6rem)] leading-[0.95]">
            Sıradaki deneyi <em className="italic">birlikte</em> yapalım.
          </h2>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-[var(--cream)]/75 md:text-lg">
            Staj, proje ya da iş birliği için yazın. Yapay zekâyı fabrikaya, sahaya ve gerçek
            kullanıcıya taşımak istiyorum.
          </p>
          <a
            href="/cv.pdf"
            download="Ali-Andac-Erdas-CV.pdf"
            className="label mt-10 inline-block border border-[var(--cream)] px-6 py-3.5 transition-colors hover:bg-[var(--cream)] hover:text-[var(--abyss)] motion-reduce:transition-none"
          >
            CV İndir
          </a>
          <ul className="mt-10 space-y-3">
            {contacts.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="site-mono underline-draw text-sm text-[var(--cream)]/85 md:text-base"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <figure className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[4/5] max-h-[70vh] overflow-hidden">
            <div
              ref={artRef}
              className="absolute inset-0 transition-transform duration-700 ease-out motion-reduce:transition-none"
              style={{ transform: "scale(1.07)" }}
            >
              <img
                src="/assets/art/wanderer.jpg"
                alt="Caspar David Friedrich, Sis Denizi Üzerindeki Gezgin: kayanın üstünde sise bakan yolcu"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <figcaption className="label mt-4 text-[10px] text-[var(--cream)]/45">
            Caspar David Friedrich, Sis Denizi Üzerindeki Gezgin, 1818
          </figcaption>
        </figure>
      </div>

      <footer className="border-t border-[var(--cream)]/12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 md:flex-row md:items-start md:justify-between md:px-10">
          <p className="label text-[10px] text-[var(--cream)]/55">© 2026 Ali Andaç Erdaş</p>
          <p className="max-w-[80ch] text-xs leading-relaxed text-[var(--cream)]/45">
            Görseller kamu malıdır: Joseph Wright of Derby, Orrery Üzerine Ders (1766, Derby Museum
            and Art Gallery) ve Hava Pompası Deneyi (1768, National Gallery, Londra); Johannes
            Vermeer, Astronom (1668, Louvre) ve Coğrafyacı (1669, Städel Müzesi); Caspar David
            Friedrich, Sis Denizi Üzerindeki Gezgin (1818, Hamburger Kunsthalle); Odin ve
            kuzgunları, 19. yüzyıl gravürü.
          </p>
        </div>
      </footer>
    </section>
  );
}
