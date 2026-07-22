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
- Git: `origin` = Higgsfield repo (deploy kaynağı), `github` = https://github.com/aliandacerdass/WebSitem.git (yedek/vitrin)
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

## Kaldığımız yer (son güncelleme: 22 Tem 2026)
- Site iskeleti oluşturuldu, görseller yerleşti, hafıza + görev yapısı kuruldu.
- Sırada: sitenin kodlanması (bkz. tasks.md)
