# Design Brief — aliandacerdass.dev (kişisel portfolyo)

## Design read
Ali Andaç Erdaş: YZ/ML öğrencisi + girişimci adayı. Hedef kitle: işverenler,
iş birlikçiler, startup çevresi. Duygusal kayıt: ciddi merak, disiplinli
öğrenme, üretim iştahı. "Parlak junior değil, sistemli inşacı" hissi.

## Concept spine
**"Site bir laboratuvar defteridir."** Sıfırdan öğrenen bir ML öğrencisinin
deney günlüğü: her bölüm bir defter girişi, her proje bir deney kaydı,
zaman çizelgesi bir eğitim koşusu (training run). Kağıt + mürekkep + kod.

## Delivery tier
**cinema** — Lenis + GSAP ScrollTrigger, Tier-1 maskeli hero, scroll bölümleri.

## Locked palette (savunma: defterin materyal dünyası; kağıt + mürekkep)
- Zemin: `#f6f6f3` (soğuk kağıt beyazı; kremsi/bej DEĞİL)
- İkincil zemin: `#ecece7` (hafif ton kayması, aynı aile)
- Metin: `#16181d` (mürekkep siyahı, saf #000 değil)
- **Tek accent: `#2743c7` mürekkep mavisi** (dolma kalem mavisi; doygunluk <80)
- Çizgi/hairline: `#d8d8d2`
Yasaklı ailelerden hiçbiri değil: bej+pirinç yok, siyah+neon yok, mor yok.

## Locked type
- Display: **Satoshi** (tracking-tight, ağır kesimler)
- Mono: **JetBrains Mono** (defter etiketi/kod hissi; tarih, etiket, metrik)
Serif yok.

## Tier-1 technique
**C3 — Scroll-driven mask reveal.** Sayfa dev "ANDAÇ" display tipinin içinde
açılır; scroll maskeyi büyütür, hero görseli full-bleed olur (clip-path,
ScrollTrigger scrub). Savunma: defterin kapağını açmak = ismin içinden içeriğe
girmek; spine'ın "girişten deneye" hareketini birebir sahneler. İnteraktif
(scroll kontrol eder), pasif loop değil. Mobil: kısa pin (150vh), aynı maske.
Reduced-motion: maske açık final hali, statik.

## Section plan (6 bölüm, 5 farklı layout ailesi, eyebrow bütçesi: 2)
1. **Hero** — masked-type reveal (C3), full-bleed görsel + isim + tek CTA. [eyebrow yok]
2. **Hakkımda** — split 50/50: sol portre plakası, sağ kısa manifesto metni. [eyebrow 1: "DEFTER 01"]
3. **Projeler** — dikey deney kayıtları listesi: geniş satırlar, hover'da görsel plaka açılır (liste + reveal ailesi). Fal Uygulaması (Flutter kahve falı), Şirket AI Konseyi (7 rollü), Andaç Anime (LoRA karakter).
4. **Yetenekler** — asimetrik grid: 1 büyük hücre (ML/Python) + küçük hücreler; hücrelerde üretilmiş ikon seti. Bento, boş hücre yok.
5. **Yolculuk (Özgeçmiş)** — yatay kaydırmalı zaman rayı (D1 hafif versiyonu, Tier-1 değil, seasoning): eğitim + projeler kronolojik. [eyebrow 2: "EĞİTİM KOŞUSU"]
6. **İletişim + footer** — full-width tek satır dev tip + mono detay satırı.

## Asset plan (Higgsfield üretimi)
- Hero görseli: 2 aday — mürekkep mavisi ışıkta çalışma masası/defter/kod natürmortu, sinematik.
- Bölüm plakaları: hakkımda portresi (stilize, yüz değil silüet/masa başı), 3 proje plakası (kahve falı, konsey, anime-LoRA temalı), yolculuk rayı için geniş panorama.
- Özel ikon seti: 6 adet, tek çizgi stili, mürekkep mavisi (python, model, mobil, fikir, defter, mail).
- Logo/monogram: "AA" mürekkep monogramı + favicon.
- OG kartı + launch cover.
- Video loop (cinema): hero natürmortunun ~5s ışık süpürmesi (kredi izinle).

## CTA inventory (her biri kendi giysisiyle, ortak buton stili yok)
- **"Projeleri Gör"** (hero, primary): mürekkep-dolum girişi; hover'da soldan mavi dolar, metin kağıt rengine döner.
- **"İletişime Geç"** (iletişim bölümü): underline-draw; hover'da alt çizgi mürekkep gibi çekilir.
- **"CV İndir"** (hakkımda): mono chip, kesik köşe, hover'da `-translate-y-[1px]` + gölge.
Etiketler sayfa genelinde tekil; eş anlamlı ikinci etiket yok.
