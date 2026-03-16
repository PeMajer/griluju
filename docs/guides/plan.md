# griluju.cz — Implementační plán

Přehled fází projektu, SEO strategie a affiliate programů.

Struktura projektu → viz [docs/architecture.md](../architecture.md).

---

## Phase 1: Scaffolding — HOTOVO

PR: https://github.com/PeMajer/griluju/pull/1

1. ~~Next.js 16 App Router, TypeScript, Tailwind v4~~ — Hotovo
2. ~~i18n routing: `app/(cs)/` route group, Czech na root path~~ — Hotovo
3. ~~content-collections 0.14 (MDX, Zod schema)~~ — Hotovo
4. ~~Layout: Header, Footer, Navigation, Homepage, stránka článku~~ — Hotovo
5. ~~Autor stránka `/o-mne` (EEAT)~~ — Hotovo
6. ~~Affiliate link manager: `/go/[product]` + `affiliates.config.ts`~~ — Hotovo (meta refresh, static export kompatibilní)
7. ~~Schema komponenty: Recipe, HowTo, FAQ, Product (JSON-LD)~~ — Hotovo
8. ~~Hreflang komponenta~~ — Hotovo
9. ~~Google Consent Mode v2 + GA4Script~~ — Hotovo
10. ~~Cookie banner (vanilla-cookieconsent)~~ — Hotovo
11. ~~Privacy Policy + Cookie Policy stránky~~ — Hotovo
12. ~~Sitemap generátor (post-build script)~~ — Hotovo
13. ~~content-index.json + generate script~~ — Hotovo
14. ~~GitHub Action: auto-update content-index.json při merge~~ — Hotovo
15. ~~Cloudflare Pages deploy (`output: 'export'`)~~ — Hotovo
16. ~~Lighthouse mobile 90+~~ — Hotovo (aktuální skóre: Mobile 93 / Desktop 100)

### Nice to have (neuděláno)

- Interaktivní teplotní tabulka
- BBQ timer
- RSS feed
- Dark mode

---

## Phase 2: První obsah

Autor napíše 10–15 Layer-1 článků ručně. Pořadí:

1. Teplomer na gril — jak jsem ho vybiral (affiliate, EEAT)
2. Pulled pork krok za krokem (pillar, vlastní fotky)
3. Jak grilovat steak (vysoký objem)
4. Nejlepsi grily do 5000 Kc (affiliate, srovnání)
5. Jak grilovat zeleninu (nízká konkurence)
6. Grilovaci marinada (informační)
7. Jak spravne roztopit gril (začátečníci)
8. Plynovy vs uhlikovy gril (srovnání)
9. Picanha na grilu (niche)
10. Jak grilovat hermelin (český klasik)

Každý článek vyžaduje: vlastní fotky, odstavec z vlastní zkušenosti, konkrétní čísla, 3–5 interních odkazů, schema markup.

---

## Phase 3: AI Pipeline

Po 10–15 ručních článcích → AI-assisted produkce.

### Jednoduchý workflow

1. Napsat zadání článku (šablona → viz [agent-workflow.md](../agent-workflow.md))
2. AI vygeneruje MDX draft
3. Autor zkontroluje fakta, doplní kontext
4. Přidat interní linky (check `content-index.json`)
5. Commit → auto deploy

### GitHub Issues workflow (pro 10+ článků/týden)

1. Vytvořit Issue se šablonou zadání
2. Claude Code na VM přečte Issue → vygeneruje MDX + PR
3. Autor zkontroluje PR, doplní `[DOPLNI]` bloky, přidá fotky
4. Merge → auto deploy

---

## SEO — prioritní klíčová slova

| Klíčové slovo | Objem | Obtížnost | Typ |
|---|---|---|---|
| jak grilovat kure | 1 000–3 000 | střední | informační |
| jak grilovat steak | 1 000–3 000 | střední | informační |
| jak grilovat zeleninu | 500–1 500 | nízká | informační |
| jak grilovat hermelin | 500–1 000 | nízká | informační |
| pulled pork recept | 300–700 | nízká | informační |
| grilovaci marinada | 500–1 500 | nízká | informační |
| nejlepsi gril do 5000 Kc | 500–1 500 | střední | transakční |
| nejlepsi plynovy gril | 500–1 000 | střední | transakční |
| plynovy vs uhlikovy gril | 300–700 | nízká | srovnání |
| grilovaci teplomer recenze | 100–300 | velmi nízká | transakční |

**Pravidlo poměru obsahu:** 1:2 (Layer-1 : Layer-2) trvale. Nikdy ne horší než 1:3.

---

## Affiliate programy

| Program | Provize | Priorita |
|---|---|---|
| Mall.cz | 2–4 % | Start — snadné schválení |
| Alza.cz | 1–3 % | Start — záloha |
| Heureka | 1–5 % | Vhodné pro srovnávací články |
| Besteto.cz | 3–6 % | Specializované grilovací vybavení |
| Weber CZ | TBD | Kontaktovat po 5 publikovaných článcích |
| Amazon.de | 3–10 % | Přidat po 1 000+ návštěvách/měsíc |
