import { useEffect, useState } from "react";

const links = [
  { href: "/#eserler", label: "Çalışmalar" },
  { href: "/#yolculuk", label: "Yolculuk", wide: true },
  { href: "/basarilar", label: "Başarılar", wide: true },
  { href: "/#iletisim", label: "İletişim" },
];

/**
 * Üst menü, altından geçen bölümün temasına göre renk değiştirir. Bölümler
 * `data-theme="dark|light"` taşır. Sayfanın en üstünde (giriş tablosunun
 * üstünde) zemin şeffaf; aşağı inince metin menünün altında kalmasın diye
 * koyu ya da açık buzlu zemin gelir.
 */
export function Nav() {
  const [dark, setDark] = useState(true);
  const [top, setTop] = useState(true);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setDark(e.target.getAttribute("data-theme") === "dark");
        }
      },
      { rootMargin: "0px 0px -94% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => setTop(window.scrollY < 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const skin = dark
    ? top
      ? "border-transparent bg-transparent text-[var(--cream)]"
      : "border-[var(--cream)]/10 bg-[var(--night)]/80 text-[var(--cream)] backdrop-blur-md"
    : "border-[var(--hairline)] bg-[var(--cream)]/85 text-[var(--ink)] backdrop-blur-md";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 motion-reduce:transition-none ${skin}`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="/" className="serif whitespace-nowrap text-2xl">
          Ali Andaç Erdaş
        </a>
        <div className="flex items-center gap-5 md:gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`label underline-draw ${l.wide ? "hidden md:inline" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
