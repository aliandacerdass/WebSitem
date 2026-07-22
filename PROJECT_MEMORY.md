# PROJECT_MEMORY — WebSitem (aliandacerdass.dev portfolyo)

## Proje ne?
Ali Andaç Erdaş kişisel portfolyo sitesi. YZ/ML öğrencisi + girişimci kimliği.
İçerik: hero, hakkımda, projeler (Fal Uygulaması, AI Konsey, Andaç Anime),
yetenekler, yolculuk (özgeçmiş), iletişim.

## Konum ve altyapı
- Yerel: `~/Projects/WebSitem` (kod `app/` içinde)
- Stack: React 19 + TanStack Start (SSR), Vite 7, bun, Tailwind v4, Cloudflare Worker
- Higgsfield website id: `8431daac-93f8-4d2a-a4c6-0f81ed8c893d`
- Canlı URL: https://aliandac-dev.higgsfield.app (deploy: `higgsfield website deploy <id>`)
- Hedef domain: aliandacerdass.dev (Namecheap, GitHub Student Pack ile alındı; DNS yönlendirme henüz YAPILMADI)
- Git: `origin` = Higgsfield repo (deploy kaynağı), `github` = https://github.com/aliandacerdass/WebSitem.git
- HOSTING KARARI (22 Tem): ana yayın GitHub Pages (statik, gh-pages dalı,
  GH_PAGES=1 prerender build, Actions otomatik). aliandacerdass.dev buraya
  bağlanacak. Higgsfield deploy'u da duruyor (SSR, aliandac-dev.higgsfield.app).
  İhtiyaç olursa Cloudflare'e geçilebilir.
- Her commit Türkçe, her adımda iki remote'a da push.

## Tasarım anayasası (app/design-brief.md — detay orada)
- Konsept: "site bir laboratuvar defteri" (deney günlüğü)
- Palet: kağıt beyazı #f6f6f3, mürekkep siyahı #16181d, TEK accent mürekkep mavisi #2743c7
- Tip: Satoshi (display) + JetBrains Mono (etiket/kod)
- Tier: cinema (Lenis + GSAP ScrollTrigger)
- Tier-1 wow: C3 maskeli hero — dev "ANDAÇ" tipinin içinden scroll ile açılan görsel
- Em-dash (—) sitede tamamen yasak; tek CTA etiketi kuralı

## Görseller
- `app/public/assets/`: hero.jpg, about.jpg, project-fal.jpg, project-konsey.jpg, project-anime.jpg, journey.jpg (kullanıcı ChatGPT ile üretti, sips ile optimize edildi)
- `refs/icons-ref.png`: ikon seti referansı; sitede ikonlar inline SVG olarak aynı stilde çizilecek
- Higgsfield CLI üretimi ÇALIŞMIYOR: free plan, `job_minimum_basic_plan_required` hatası

## Kritik notlar
- Deploy sadece `origin`'e (Higgsfield) push edilen main'den build alır; GitHub repo vitrin/yedek.
- SSR hard rule: top-level `window` erişimi çökertir; sadece useEffect/guard içinde.
- Scratchpad'den ~/Projects/WebSitem'e taşındı (22 Tem 2026).

## Gerçek kimlik verileri (LinkedIn'den, 22 Tem 2026)
- Bursa Teknik Üniversitesi, Yapay Zeka ve Makine Öğrenmesi, 1. yıl bitti
- GDG Build with AI hackathonu 2.lik (LLM prompt optimizasyonu, Green AI)
- TUA Astro Hackathon: BURSA ÜNİVERSİTELERİ ARASI 1.LİK (Türkiye 4.lüğü), 29.03.2026
- Veri Bilimi Olimpiyatı 2.lik (27.03.2026)
- Microsoft AI Innovators kabulü; sertifikalar: Miuul Python for DS, MathWorks
  Statistics Onramp, BTK Git/GitHub, Data League
- CV Booster: LLM destekli mobil uygulama (FastAPI, rate limiting) — ana deneyim
- DİKKAT: Thresholdai.tech'ten AYRILDI; sitede/anlatımda kullanma, "kendi
  girişim denemelerim" de. CV: app/public/cv.pdf (kaynak ~/Documents/AliAndacErdasCVE.pdf)
- Telefon: +90 505 469 61 51 · LinkedIn: linkedin.com/in/aliandacerdass

## Kaldığımız yer (son güncelleme: 22 Tem 2026, akşam)
- Site KODLANDI ve CANLIDA: https://aliandac-dev.higgsfield.app
- /basarilar sayfası eklendi (yarışmalar, programlar, sertifikalar); projelere
  Ay Rotası + SmartGrid-Core eklendi; yolculuk gerçek verilerle güncellendi.
- 6 bölüm: maskeli ANDAÇ hero (C3), hakkımda, deney kayıtları (3 proje),
  alet çantası (bento + inline SVG ikonlar), yolculuk (yatay ray), iletişim.
- Typecheck + build + mekanik grep kapısı temiz. qa:fill scripti iskelette yok,
  kontroller elle grep ile yapıldı.
- app-meta.json dolduruldu (og_title, favicon.svg, hero.jpg og görseli).
- Sırada: kullanıcı gözden geçirmesi + DNS bağlama (bkz. tasks.md)
