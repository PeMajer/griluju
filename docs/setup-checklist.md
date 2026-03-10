# Setup Checklist — ruční kroky před spuštěním

Věci které musí udělat člověk — registrace, API klíče, live testy.

---

## 1. Cloudflare Pages — deploy

**Kde:** cloudflare.com → Pages

1. Přihlas se na [cloudflare.com](https://cloudflare.com) (nebo založ účet, je zdarma)
2. Workers & Pages → Create → Connect to Git
3. Vyber GitHub repo `PeMajer/griluju`
4. Build settings:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
5. Deploy → počkej na první build (~2 min)
6. Po buildu dostaneš URL ve tvaru `griluju-xyz.pages.dev` — to je zatím testovací adresa

**Napojení domény `griluju.cz`:**
1. Cloudflare Pages → Custom domains → Add custom domain → `griluju.cz`
2. Cloudflare ti řekne co nastavit v DNS — pokud je doména už na Cloudflare DNS, přidá to automaticky
3. SSL se nastaví sám (~5 min)

**Napojení `griluju.com` jako redirect:**
1. Přidej `griluju.com` jako další custom domain na stejný Pages projekt
2. Nebo nastav Cloudflare Bulk Redirect: `griluju.com/*` → `https://griluju.cz/$1` (301)
   - Workers & Pages → nejde přes Pages, ale přes Cloudflare Redirect Rules (dashboard → Rules → Redirect Rules)

---

## 2. Google Analytics 4

**Kde:** analytics.google.com

1. Přihlas se Google účtem
2. Admin → Create Account → název: `griluju.cz`
3. Create Property → název: `griluju.cz`, časová zóna: Czech Republic, měna: CZK
4. Business details → Media & Entertainment, Small
5. Create → Web → URL: `griluju.cz`, Stream name: `griluju.cz`
6. Po vytvoření dostaneš **Measurement ID** ve tvaru `G-XXXXXXXXXX`

**Nastavení v projektu:**
1. V kořeni projektu vytvoř soubor `.env.local`:
   ```
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```
   (nahraď `G-XXXXXXXXXX` svým skutečným ID)
2. `.env.local` je v `.gitignore` — **nikdy ho necommituj**
3. Stejnou proměnnou nastav i v Cloudflare Pages:
   - Pages → Settings → Environment variables → Add variable
   - Name: `NEXT_PUBLIC_GA4_ID`, Value: `G-XXXXXXXXXX`
   - Nastav pro Production i Preview
   - Po uložení spusť nový deploy (Pages → Deployments → Retry)

**Ověření:** Po deployi otevři web, počkej 30 sekund, zkontroluj GA4 → Realtime report.

**Google Search Console** (nastav zároveň):
1. search.google.com/search-console → Add property → URL prefix: `https://griluju.cz`
2. Ověření přes Google Analytics (pokud je GA4 nastaven, Search Console to rozpozná automaticky)
3. Po ověření: Sitemaps → Add sitemap → `sitemap.xml`

---

## 3. Cookieyes — cookie banner

**Kde:** cookieyes.com

1. Založ účet na [cookieyes.com](https://www.cookieyes.com) — free plán do 100 stránek/měsíc
2. Add Website → URL: `https://griluju.cz`, Language: Czech
3. Customize banner — stačí výchozí šablona, nebo uprav barvy (orange = `#ea580c` odpovídá designu)
4. Po uložení dostaneš script tag, v URL bude tvé **Cookieyes ID** — vypadá takto:
   ```
   https://cdn-cookieyes.com/client_data/TOTO_JE_TVOIE_ID/script.js
   ```
5. Zkopíruj jen tu část ID (hash za `/client_data/`)

**Nastavení v projektu:**
- Otevři `src/components/ui/CookieBanner.tsx`
- Nahraď `COOKIEYES_ID` svým skutečným ID:
  ```tsx
  src="https://cdn-cookieyes.com/client_data/TVOIE_SKUTECNE_ID/script.js"
  ```
- Commitni a pushni na branch, PR do main → automatický deploy

**Pozor:** Cookieyes musí být nainstalován PŘED podáním žádosti o Google AdSense. Bez funkčního cookie banneru s Consent Mode v2 AdSense žádost zamítne.

---

## 4. Affiliate programy — registrace

Registruj se hned, schválení trvá 2–7 dní. Nepotřebuješ hotový web — stačí funkční doména.

### Mall.cz (priorita 1)

- URL: [affiliate.mall.cz](https://affiliate.mall.cz)
- Vyplň: web URL, kategorie obsahu (Home & Garden / Sports & Outdoor), krátký popis webu
- Schválení: manuální, 2–5 dní
- Po schválení dostaneš přístup do rozhraní kde generuješ affiliate linky

### Alza.cz (priorita 1 — záloha)

- URL: [alza.cz/affiliate](https://www.alza.cz/affiliate)
- Stejný postup jako Mall.cz
- Schválení: 2–7 dní

### Heureka.cz (priorita 2)

- URL: [sluzby.heureka.cz/affiliate](https://sluzby.heureka.cz/affiliate)
- Rychlejší schválení než Mall/Alza
- Vhodné pro srovnávací články

### Co udělat po schválení:

1. Vygeneruj testovací affiliate odkaz na konkrétní produkt (např. Weber Master-Touch)
2. Otevři `affiliates.config.ts` v projektu
3. Nahraď placeholder URL skutečnými affiliate URL:
   ```ts
   "weber-master-touch": {
     cs: "https://www.mall.cz/...-tvuj-affiliate-link",
   }
   ```
4. Commitni, push, PR → deploy

**Poznámka:** Amazon.de přidej až po 1 000+ návštěvách/měsíc — vyžadují 3 konverze za 180 dní, jinak vyhodí z programu.

---

## 5. Lighthouse audit — 90+ mobile score

Podmínka spuštění webu. Testuj **po každé větší změně šablony**.

**Kde testovat:**
- [pagespeed.web.dev](https://pagespeed.web.dev) — zadej URL webu, vyber Mobile
- Nebo DevTools → Lighthouse → Mobile → Analyze

**Co opravit pokud skóre padá:**

| Problém | Příčina | Řešení |
|---|---|---|
| LCP > 2.5s | Hero obrázek bez `priority` | Přidat `priority` prop na `<Image>` v ArticleHeader |
| CLS > 0.1 | `<Image>` bez `width`/`height` | Vždy definuj rozměry |
| FCP pomalý | Velké obrázky | Zkomprimuj přes squoosh.app, max 150 kB |
| Score < 90 | JS bundle | Next.js static export by měl být OK, zkontroluj třetí strany (Cookieyes, GA4) |

**Kdy testovat:**
- Před prvním publikováním článku
- Po přidání Cookieyes scriptu (může zpomalit)
- Po každé změně layoutu

---

## Pořadí kroků

```
1. Cloudflare Pages deploy (testovací URL)
2. Google Analytics 4 + Search Console
3. Nastav NEXT_PUBLIC_GA4_ID v Cloudflare Pages env vars
4. Cookieyes registrace + nastav ID v CookieBanner.tsx
5. Deploy s Cookieyes ID
6. Lighthouse audit na live URL
7. Affiliate registrace (Mall.cz, Alza.cz) — pošli hned, čeká se
8. Po schválení affiliate → aktualizuj affiliates.config.ts
9. Napiš první článek (Phase 2)
```

---

## Stav

| Krok | Status |
|---|---|
| Cloudflare Pages deploy | ⬜ TODO |
| GA4 property + Measurement ID | ⬜ TODO |
| GA4 ID v .env.local + Cloudflare env vars | ⬜ TODO |
| Search Console + sitemap | ⬜ TODO |
| Cookieyes registrace + ID v CookieBanner.tsx | ⬜ TODO |
| Lighthouse mobile 90+ | ⬜ TODO |
| Mall.cz affiliate registrace | ⬜ TODO |
| Alza.cz affiliate registrace | ⬜ TODO |
| affiliates.config.ts aktualizovat po schválení | ⬜ TODO |
