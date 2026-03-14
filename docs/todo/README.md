# TODO — Co musíš doplnit ty

Věci které musí udělat člověk — obsah, registrace, live testy.

---

## Obsah & data

### Osobní příběh — stránka /o-mne

**Soubor:** `src/app/(cs)/o-mne/page.tsx` → `<!-- PLACEHOLDER: personal-story -->`

Napiš agentovi 3–5 vět o:
1. Kdy a jak jsi začal grilovat (rok, okolnost)
2. Zlomový moment — kdy jsi to začal brát vážně
3. Co tě na grilování nejvíc baví / čemu se specializuješ
4. Proč jsi založil tento web

Agent z toho sestaví plnohodnotný text.

### Vlastní fotky (průběžně, od Měsíce 2)

Unsplash placeholdery jsou v `/public/images/` — staženy automaticky.

Postupně nahrazuj vlastními WebP fotkami (max 150 kB, přirozené světlo, tmavé prkénko).

---

## Technické kroky

### Lighthouse audit — 90+ mobile score

Podmínka spuštění webu. Testuj po každé větší změně šablony.

**Kde testovat:**
- **MCP (doporučeno):** řekni agentovi "spusť Lighthouse na griluju.cz" — vrátí skóre bez otevírání prohlížeče
  ```
  https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://griluju.cz&strategy=mobile
  ```
- [pagespeed.web.dev](https://pagespeed.web.dev) — manuální

**Co opravit pokud skóre padá:**

| Problém | Příčina | Řešení |
|---|---|---|
| LCP > 2.5s | Hero obrázek bez `priority` | Přidat `priority` prop na `<Image>` v ArticleHeader |
| CLS > 0.1 | `<Image>` bez `width`/`height` | Vždy definuj rozměry |
| FCP pomalý | Velké obrázky | Zkomprimuj přes squoosh.app, max 150 kB |

### Affiliate programy — registrace

Registruj se hned, schválení trvá 2–7 dní.

| Program | URL | Priorita |
|---|---|---|
| Mall.cz | [affiliate.mall.cz](https://affiliate.mall.cz) | 1 |
| Alza.cz | [alza.cz/affiliate](https://www.alza.cz/affiliate) | 1 |
| Heureka.cz | [sluzby.heureka.cz/affiliate](https://sluzby.heureka.cz/affiliate) | 2 |

**Po schválení:**
1. Vygeneruj affiliate odkaz na konkrétní produkt (např. Weber Master-Touch)
2. Otevři `affiliates.config.ts` a nahraď placeholder URL skutečnými affiliate URL
3. Commitni, push, PR → deploy

> Amazon.de přidej až po 1 000+ návštěvách/měsíc — vyžadují 3 konverze za 180 dní.

---

## Stav

| Úkol | Status |
|---|---|
| Osobní příběh /o-mne | ⬜ TODO |
| Kontaktní info /kontakt | ✅ done |
| Vlastní fotky (průběžně) | ⬜ TODO |
| Lighthouse mobile 90+ | ⬜ TODO |
| Mall.cz affiliate registrace | ⬜ TODO |
| Alza.cz affiliate registrace | ⬜ TODO |
| affiliates.config.ts aktualizovat po schválení | ⬜ TODO |
