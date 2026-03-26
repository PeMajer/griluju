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

## Phase 2: První obsah — HOTOVO (11 článků)

Minimální práh 10 ručních článků splněn → přechod na Phase 3 odemčen.

### Publikované články (11)

1. ~~Pulled pork krok za krokem~~ — `pulled-pork-krok-za-krokem`
2. ~~Jak grilovat steak~~ — `dokonaly-steak-na-grilu`
3. ~~Jak grilovat zeleninu~~ — `grilovana-zelenina`
4. ~~Weber Master-Touch recenze~~ — `weber-master-touch-recenze`
5. ~~Brisket low & slow~~ — `brisket-low-slow`
6. ~~Vepřová žebra 3-2-1~~ — `zebirka-bbq-glazura-3-2-1`
7. ~~Reverse sear metoda~~ — `reverse-sear-metoda`
8. ~~Losos na cedrovém prkénku~~ — `losos-na-cedrovem-prkenku`
9. ~~Jehněčí kotlety s rozmarýnem~~ — `jehneci-kotlety-rozmaryn-cesnek`
10. ~~Kuřecí křídélka s medovou glazurou~~ — `krupava-kureci-kridela-medova-glazura`
11. ~~Studené uzení steaku~~ — `studene-uzeni-steak`

### Z původního plánu dosud nepsáno

- Teplomer na gril — jak jsem ho vybiral (affiliate, EEAT)
- Nejlepsi grily do 5000 Kc (affiliate, srovnání)
- Grilovaci marinada (informační)
- Jak spravne roztopit gril (začátečníci)
- Plynovy vs uhlikovy gril (srovnání)
- Picanha na grilu (niche)
- Jak grilovat hermelin (český klasik)

Každý článek vyžaduje: vlastní fotky, odstavec z vlastní zkušenosti, konkrétní čísla, 3–5 interních odkazů, schema markup.

---

## Phase 3: AI Pipeline — AKTIVNÍ (od 2026-03-26)

Práh 10 ručních článků překročen → AI-assisted produkce zahájena.

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
| Mall.cz | 2–4 % | ⬜ Registrace TODO — `affiliates.config.ts` má placeholder UTM |
| Alza.cz | 1–3 % | ⬜ Registrace TODO — `affiliates.config.ts` má placeholder UTM |
| Heureka | 1–5 % | ⬜ Registrace TODO |
| Besteto.cz | 3–6 % | ⬜ Registrace TODO |
| Weber CZ | TBD | ⬜ Kontaktovat (5+ článků splněno) |
| Amazon.de | 3–10 % | ⏳ Přidat po 1 000+ návštěvách/měsíc |
