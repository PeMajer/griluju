Vytvoř nový článek od začátku — branch, frontmatter, obsah, obrázky, PR.

Použij když dostaneš zadání článku (GitHub Issue nebo přímý příkaz).

## Postup

### 1. Příprava

```bash
# Načti přehled existujících článků pro interní linky
cat content-index.json
```

Projdi 2–3 existující články v `content/posts/` jako referenci struktury a tónu.

**Před psaním přečti celý `docs/guides/tone-of-voice.md`** — obsahuje pravidla tónu, struktury, jazykové kontroly, rewrite pass a validační průchod.

Přečti `.claude/docs/reference-article.md` a piš přesně tímto stylem — délka odstavců, způsob vysvětlení kroků, osobní momenty.

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

### 3. Psaní článku

> **Dvě fáze — záměrně oddělené role:**
> Nejdřív napiš celý draft (krok 3), pak zkontroluj (kroky 3b + 3c).
> Kombinace obou rolí v jednom průchodu vede ke kompromisu — agent přepíná mezi psaním a kontrolou a dělá obojí hůř.
> **Nepřekrývej tyto dvě fáze.**

**Struktura:** úvod s tezí → sekce s vysvětlením → praktický postup → srovnání nebo výsledek → shrnutí
**Délka:** srovnatelná s referenčním článkem, každá sekce nadpis + min. 2 odstavce
**Odstavce:** min. 3–4 věty — žádné holé odrážky tam kde může být věta
**Každou sekci rozveď** — nestačí říct co, řekni proč a co se stane když to neuděláš
**Osobní momenty rozpiš** — "vytáhl jsem ho při 50 °C, po odpočinku byl medium well" je lepší než "tučné steaky se přepečou"

**5 pravidel která nesmíš porušit:**
1. Intro = max 3 věty, žádný filler, rovnou k věci nebo ke konkrétní chybě — žádné "V tomto článku"
2. Vždy konkrétní číslo — nikdy "trochu", "chvíli", "dostatek"; °C, minuty, gramy, lžíce
3. Alespoň 1 věta z první osoby s konkrétní volbou nebo chybou — ne "mám rád", ale "zjistil jsem na prvním Wagyu: vytáhl jsem ho při 50 °C, byl medium well"
4. Závěr = 2–3 čísla nebo pravidla, žádná filler věta
5. Zdroj v angličtině: adaptuj pro českého čtenáře, nepřekládej doslova; převeď °F → °C, libry → kg, unce → g

**Příklady — hlas autora:**

Intro — špatně (AI tón):
> Studené uzení je technika, která přináší intenzivní kouřovou chuť. V tomto článku vám ukážeme postup krok za krokem.

Intro — správně (Petrův hlas):
> Reverse sear jsem dělal roky. Kouřová chuť vždy slabá, kůrka průměrná — maso strávilo v kouři 20 minut, ne 90. Studené uzení to mění: nejdřív hodina a půl kouře při 30 °C, pak prudké opečení na litině.

Osobní zkušenost — špatně (abstraktní):
> Tučné steaky reagují na teplo jinak než libové. Sundejte je dříve než obvykle.

Osobní zkušenost — správně (konkrétní chyba + číslo):
> Tučné steaky se přepálí dřív, než čekáte. Zjistil jsem to na prvním Wagyu Denver: vytáhl jsem ho při 50 °C jako libový filet, po odpočinku byl medium well. Od té doby sundávám silně mramorované kusy při 47–48 °C.

**Jazykové kontroly při psaní:** viz `docs/guides/tone-of-voice.md → Přirozená čeština` a `Gramatické pasti`.

**Interní odkazy a affiliate:**
- **3–5 interních odkazů** — použij slugy z `content-index.json`, popisné anchory
- **Affiliate produkty** — pouze přes `/go/[slug]`, nikdy raw URL

Rozsah: recepty 1 000–2 000 slov, návody 1 500–3 000 slov.

### 3b. Rewrite pass — hlas autora

Viz `docs/guides/tone-of-voice.md → Rewrite pass — hlas autora`.

### 3c. Validační průchod — role kritika

Viz `docs/guides/tone-of-voice.md → Validační průchod — role kritika`.

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
