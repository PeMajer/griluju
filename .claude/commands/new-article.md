Vytvoř nový článek od začátku — branch, frontmatter, obsah, obrázky, PR.

Použij když dostaneš zadání článku (GitHub Issue nebo přímý příkaz).

## Postup

### 1. Příprava

```bash
# Načti přehled existujících článků pro interní linky
cat content-index.json
```

Projdi 2–3 existující články v `content/posts/` jako referenci struktury a tónu.

Vytvoř branch:
```bash
git checkout main && git pull origin main && git checkout -b content/[slug]
```

### 2. Frontmatter — povinné pole

```mdx
---
title: "Název článku (H1)"
description: "Meta description, 140–160 znaků, obsahuje klíčové slovo"
date: "YYYY-MM-DD"
category: "recepty" | "navod" | "recenze" | "srovnani"
slug: "url-slug-bez-diakritiky"
image: "/images/[slug]/hero.webp"
imageWidth: 1200
imageHeight: 800
author: "Petr Majer"
tags: ["tag1", "tag2"]
affiliate: true  # pouze pokud článek obsahuje affiliate produkty
---
```

### 3. Struktura článku

- **Intro** (2–3 věty) — žádný filler, rovnou k věci
- **H2 sekce** — logický postup, konkrétní informace
- **3–5 interních odkazů** — použij slugy z `content-index.json`, popisné anchory
- **Affiliate produkty** — pouze přes `/go/[slug]`, nikdy raw URL
- **Závěr** — shrnutí nebo doporučení

Rozsah: recepty 1 000–2 000 slov, návody 1 500–3 000 slov.

### 4. Obrázky

Hero image: `/public/images/[slug]/hero.webp`
- Rozměry: 1200×800 px (nebo ekvivalentní poměr)
- Formát: WebP
- Vždy `priority` prop na hero image

Pokud obrázek chybí → použij placeholder `[VLASTNÍ FOTO AUTORA]` pro Layer-1, pro Layer-2 Unsplash reference.

### 5. Validace před commitem

Spusť `/review` — lint + build + obsahové kontroly.

Ověř manuálně:
- [ ] Frontmatter kompletní
- [ ] ≥3 interní odkazy
- [ ] Žádná raw affiliate URL
- [ ] Hero image existuje v `/public/images/[slug]/`
- [ ] H1 není v body (pochází z frontmatteru)

### 6. Commit a PR

```bash
git add content/posts/[slug]/ public/images/[slug]/
git commit
git push -u origin content/[slug]
gh pr create --title "[slug]: název článku" --body "..."
```
