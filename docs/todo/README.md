# TODO — Co musíš doplnit ty

Věci které musí udělat člověk — obsah, registrace, live testy.

---

## Obsah & data

### ~~Osobní příběh — stránka /o-mne~~ ✅ HOTOVO

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
   - **Mall.cz:** přihlas se do affiliate panelu → sekce *Deeplinks* → zadej URL produktu na Mall.cz → panel vygeneruje trackovaný odkaz ve tvaru `https://www.mall.cz/...?partner=XXX`
   - **Alza.cz:** přihlas se do affiliate panelu → *Nástroje → Generátor odkazů* → vlož URL produktu na Alza.cz → zkopíruj vygenerovaný odkaz
   - **Heureka.cz:** přihlas se do affiliate rozhraní → *Deeplink generátor* → zadej URL produktu na Heureka.cz → zkopíruj odkaz s parametrem `utm_source` nebo trackovacím ID
2. Otevři `affiliates.config.ts` a nahraď placeholder URL skutečnými affiliate URL
3. Commitni, push, PR → deploy

> Amazon.de přidej až po 1 000+ návštěvách/měsíc — vyžadují 3 konverze za 180 dní.

---

## Stav

| Úkol | Status |
|---|---|
| Osobní příběh /o-mne | ✅ done |
| Kontaktní info /kontakt | ✅ done |
| Vlastní fotky (průběžně) | ⬜ TODO |
| Lighthouse mobile 90+ | ✅ done (91+) |
| Mall.cz affiliate registrace | ⬜ TODO |
| Alza.cz affiliate registrace | ⬜ TODO |
| affiliates.config.ts aktualizovat po schválení | ⬜ TODO |
