# Workflow — tvorba článku

Životní cyklus článku od zadání po publikaci. Platí pro Layer-1 i Layer-2.

---

## Přehled kroků

1. [Zadání a příprava](#1-zadání-a-příprava)
2. [Psaní](#2-psaní)
3. [Obrázky](#3-obrázky)
4. [Technická kontrola](#4-technická-kontrola)
5. [Publikace](#5-publikace)

---

## 1. Zadání a příprava

**Zkontroluj `content-index.json`** — přehled existujících článků pro interní odkazy.

**Zvol kategorii a slug:**

| Kategorie | Frontmatter | URL prefix |
|---|---|---|
| recepty | `recepty` | `/recepty/` |
| navod | `navod` | `/navody/` |
| recenze | `recenze` | `/recenze/` | Recenze i srovnání produktů |

**Vytvoř branch:**
```bash
git checkout main && git pull origin main
git checkout -b content/[slug]
```

---

## 2. Psaní

Vytvoř soubor `content/posts/[slug]/index.mdx` s kompletním frontmatterem:

```yaml
title: "Název článku"
slug: "slug-clanku"
description: "SEO meta description, max 155 znaků"
date: "2026-03-15"
updated: "2026-03-15"
author: "Petr Majer"
category: "recepty"
keywords: ["kw1", "kw2"]
image: "/images/[slug]/hero.jpg"
affiliate: true
```

**Pravidla psaní:** viz [Tone & Voice](tone-of-voice.md)

Klíčové body:
- Intro: 2–3 věty, rovnou k věci, bez filleru
- H2 sekce: plynulý text, ne bullet listy
- Všechna množství konkrétní: gramy, °C, minuty
- Layer-1: alespoň jeden odstavec z první osoby s konkrétním detailem nebo chybou
- Závěr: praktické shrnutí 2–3 čísel, žádný filler
- 3–5 interních odkazů s popisným anchor textem (ze `content-index.json`)
- Affiliate produkty přes `/go/[slug]`, nikdy raw URL

---

## 3. Obrázky

Obrázky ukládej do `public/images/[slug]/`. Formát: **WebP**, max 150 kB (recepty), 100 kB (produkty).

**Zpracování fotek před přidáním do projektu** — viz [AI obrázky](ai-images.md)

### Layer-1 (vlastní fotky)

Máš vlastní fotku, Gemini/Firefly ji upravil (pozadí, světlo, retuš):

```bash
# EXIF z originálu přenese na AI výstup, original smaže
bash scripts/fix-exif.sh --from-original ~/Fotky/IMG_1234.jpg ~/Downloads/upravena.jpg
```

Poté fotku přidej do projektu:
```bash
cp ~/Downloads/upravena.jpg public/images/[slug]/hero.jpg
```

### Layer-2 (čistě AI fotky)

Nemáš vlastní originál:

```bash
bash scripts/fix-exif.sh public/images/[slug]/hero.jpg
```

### Obecná pravidla

- Hero image: vždy `priority` prop (LCP optimalizace)
- Vždy nastavit `width` a `height` (CLS prevence)
- Exportovat z Apple Fotek přes **File → Export → Export 1 Photo** (ne sdílet přes iMessage — stripuje EXIF)

---

## 4. Technická kontrola

```bash
npm run lint       # musí projít bez chyb
npm run build      # nesmí selhat
```

Zkontroluj:
- [ ] Frontmatter kompletní (všechna povinná pole)
- [ ] Obrázky existují v `public/images/[slug]/` a mají upravený EXIF
- [ ] 3–5 interních odkazů, pouze na existující články z `content-index.json`
- [ ] Affiliate produkty přes `/go/` prefix
- [ ] Lint i build prochází bez chyb
- [ ] Žádný hardcoded český text mimo `src/lib/i18n.ts`

---

## 5. Publikace

```bash
git add .
git commit -m "content: přidat článek [slug]"
git push origin content/[slug]
gh pr create --title "content: [název článku]" --base main
```

Po merge do `main` GitHub Action automaticky aktualizuje `content-index.json`.
