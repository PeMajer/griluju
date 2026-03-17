# Architektura projektu — griluju.cz

## Tech Stack

| Vrstva | Technologie | Verze | Poznámka |
|---|---|---|---|
| Framework | Next.js App Router | 16.1.6 | Static export (`output: 'export'`) |
| Jazyk | TypeScript | ^5 | Striktní typy |
| Stylování | Tailwind CSS v4 | ^4 | CSS-based config, bez `tailwind.config.ts` |
| Obsah | content-collections | 0.14.x | MDX soubory, Zod schema |
| Deploy | Cloudflare Pages | — | CDN, free tier |
| Email | Brevo | — | Newslettery (připraveno) |
| Analytics | GA4 + Search Console | — | Consent Mode v2 |

### Proč static export?

`output: 'export'` v `next.config.ts` generuje čisté HTML/CSS/JS — žádný Node.js server. To umožňuje deploy na Cloudflare Pages zdarma s globální CDN. **Důsledek:** API routes (`route.ts`) nejsou podporovány. Affiliate přesměrování proto používají `page.tsx` s meta refresh místo serverových redirectů.

---

## Struktura projektu

```
griluju/
├── CLAUDE.md                          # Instrukce pro AI agenta
├── affiliates.config.ts               # Registr affiliate odkazů
├── content-collections.ts             # Zod schema pro MDX obsah
├── content-index.json                 # Auto-generovaný index článků (pro interní linky)
├── next.config.ts                     # output: export, withContentCollections
├── tsconfig.json
│
├── content/
│   └── posts/
│       └── [slug]/
│           └── index.mdx              # Obsah článku (frontmatter + MDX)
│
├── docs/                              # Projektová dokumentace
│
├── public/
│   ├── _redirects                     # Cloudflare Pages: griluju.com → griluju.cz
│   ├── robots.txt                     # SEO: crawl pravidla + Sitemap odkaz
│   └── images/
│       └── [slug]/                    # Obrázky článků (WebP)
│
├── scripts/
│   ├── generate-content-index.mjs     # Regeneruje content-index.json
│   ├── generate-sitemap.mjs           # Generuje sitemap.xml do out/
│   └── convert-images-to-webp.mjs     # Konvertuje JPG/PNG → WebP (sharp)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (metadata, passthrough)
│   │   ├── globals.css                # Tailwind v4 + design tokens + .prose styly
│   │   ├── (cs)/                      # Route group — Czech obsah bez URL prefixu
│   │   │   ├── layout.tsx             # lang="cs", Header, Footer, GA4, ConsentMode
│   │   │   ├── page.tsx               # Homepage — grid článků
│   │   │   ├── [slug]/page.tsx        # Stránka článku
│   │   │   ├── o-mne/page.tsx         # Autor (EEAT)
│   │   │   ├── kontakt/page.tsx
│   │   │   ├── ochrana-soukromi/page.tsx
│   │   │   └── cookies/page.tsx
│   │   └── go/
│   │       └── [product]/page.tsx     # Affiliate redirect (meta refresh)
│   │
│   ├── components/                    # viz docs/components.md
│   │
│   └── lib/
│       ├── content.ts                 # content-collections helpers
│       ├── i18n.ts                    # siteConfig + překlady
│       └── affiliates.ts             # Re-export z affiliates.config.ts
│
└── .github/
    └── workflows/
        ├── content-index.yml          # Auto-update content-index.json při merge do main
        └── lighthouse.yml             # Lighthouse CI — mobile audit na každém PR, komentář se skóre
```

---

## Routing

Projekt používá Next.js **route group** `(cs)` pro českou lokalizaci. Route group přidává sdílený layout (header, footer, analytics) bez přidání URL segmentu.

```
app/(cs)/page.tsx         → /
app/(cs)/[slug]/page.tsx  → /nazev-clanku
app/(cs)/o-mne/page.tsx   → /o-mne
app/go/[product]/page.tsx → /go/weber-master-touch
```

**i18n příprava:** Budoucí `/de/` lokalizace se přidá jako `app/de/` složka vedle `(cs)`. Česká verze zůstane na root path.

---

## Content Collections

Články jsou spravovány přes `content-collections` knihovnu. Konfigurace v `content-collections.ts`:

```ts
// Zod schema pro frontmatter
{
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(),
  updated: z.string().optional(),
  author: z.string(),
  category: z.enum(["recepty", "navod", "recenze"]),
  keywords: z.array(z.string()),
  image: z.string().optional(),
  affiliate: z.boolean().default(false),
}
```

MDX se kompiluje při buildu přes `@content-collections/mdx`. Výsledek je dostupný jako `post.content` (React komponenta) a `post.mdxContent` ve stránkách článků.

### content-index.json

Auto-generovaný soubor obsahující seznam všech publikovaných článků (slug, title, description, category, date). Slouží jako lookup tabulka pro:
- AI agenta při psaní interních odkazů
- Komponenty `RelatedArticles`

Regeneruje se automaticky GitHub Action při každém mergi do `main`. Ručně: `node scripts/generate-content-index.mjs`.

---

## Affiliate systém

Všechny affiliate URL jsou centralizovány v `affiliates.config.ts`. Nikdy se nepíší přímo do článků.

**Tok:**
1. Článek obsahuje link na `/go/weber-master-touch`
2. `app/go/[product]/page.tsx` načte URL z `getAffiliateUrl(slug, locale)`
3. Stránka renderuje `<meta http-equiv="refresh">` → přesměrování na affiliate URL
4. Meta refresh je staticky exportovatelný (na rozdíl od serverových redirectů)

Affiliate URL obsahují UTM parametry: `?utm_source=griluju&utm_medium=affiliate`.

**Per-locale konfigurace:** Každý produkt může mít různé URL pro různé lokalizace (`cs`, `de`). Fallback na `cs` pokud locale-specific URL chybí.

---

## SEO & Schema Markup

Každá stránka článku automaticky generuje `BlogPosting` JSON-LD schema v hlavičce. Specializované schéma komponenty (`RecipeSchema`, `HowToSchema`, `FAQSchema`, `ProductSchema`) se přidávají manuálně dle typu článku.

**Hreflang:** Komponenta `Hreflang` renderuje `<link rel="alternate">` tagy. Aktuálně pouze `cs-CZ` a `x-default`. Rozšíří se při přidání DE lokalizace.

**Google Consent Mode v2:** Skript `ConsentMode` se inicializuje v `<head>` *před* GA4 scriptem. Všechny typy souhlasu jsou defaultně `denied` (GDPR compliance). `CookieBanner` (vanilla-cookieconsent) aktualizuje consent stav po interakci uživatele přes `gtag('consent', 'update', ...)`.

---

## Prostředí a env proměnné

| Proměnná | Kde nastavit | Popis |
|---|---|---|
| `NEXT_PUBLIC_GA4_ID` | `.env.local` + Cloudflare Pages env vars | GA4 Measurement ID (G-XXXXXXXXXX) |

GA4Script komponenta vrací `null` pokud proměnná není nastavena — analytics je bezpečně vypnuté v dev prostředí.

`.env.local` je v `.gitignore` — **nikdy necommitovat**.

---

## Build pipeline

```
npm run build
  └── next build
        ├── content-collections kompilace MDX
        ├── static export do out/
        └── postbuild:
              └── generate-sitemap.mjs → out/sitemap.xml
```

Cloudflare Pages spouští `npm run build` automaticky při každém push na `main`.

---

## Performance

Aktuální skóre (produkce, Chrome): **Mobile 91+ / Desktop 100**.

### Obrázky — rozměry a komprese

`images: { unoptimized: true }` (static export) — Next.js neprovádí automatickou optimalizaci. Pravidla pro ruční přípravu:

| Typ obrázku | Rozměr | Kvalita | Max velikost |
|---|---|---|---|
| Hero desktop (`hero.webp`) | 1200 × 675 px | 48 | ~70 kB |
| Hero desktop 2x (`hero@2x.webp`) | 1920 × 1080 px | 48 | ~220 kB |
| Hero mobile (`hero-mobile.webp`) | 640 × 360 px | 48 | ~50 kB |
| Hero mobile 2x (`hero-mobile@2x.webp`) | 1024 × 576 px | 48 | ~100 kB |
| Article card (`recepty/*.webp`) | 600 × 800 px | 70 | ~90 kB |
| Autor avatar (`petr.webp`) | 112 × 112 px | 80 | ~5 kB |

**Lighthouse mobile a srcset:** Lighthouse emuluje Moto G Power (412px viewport, DPR 2.625). Se srcsetem `640w / 1024w / 1200w / 1920w` a `sizes="(max-width: 768px) 100vw, 1200px"` stahuje Lighthouse variantu `1200w` (hero.webp) — proto musí být tato varianta dobře zkomprimovaná (q48 z originálu JPG).

**Proč 600×800 pro kartičky:** `ArticleCard` používá `aspect-[3/4]` s `fill` + `object-cover`. S `unoptimized: true` browser stahuje vždy plnou bitmapu — resize na portrait odpovídající kartičce je jediný způsob jak snížit download size. `sizes` prop na `<Image>` je bez optimalizace ignorován.

**Nástroj pro konverzi:** `node scripts/convert-images-to-webp.mjs` — převede JPG/PNG na WebP, přeskočí existující.

### Další konfigurace

- **Inline CSS:** `experimental.inlineCss: true` v `next.config.ts` — CSS se vkládá přímo do HTML, eliminuje render-blocking `<link>` stylesheety. Výsledný HTML je větší (~40 kB gzip), ale FCP a LCP jsou výrazně lepší.
- **Hero image preload:** `<img srcset fetchPriority="high">` — React 19 auto-generuje `<link rel="preload" imageSrcSet>` do `<head>`. Nepoužívat manuální `<link rel="preload">` — způsobuje dvojité stažení.
- **Font split:** Lora normal je preloadovaná (`display: "swap"`), Lora italic se načítá bez preloadu (`display: "optional"`, `preload: false`). Snižuje počet konkurujících preload requestů pro LCP.
- **GA4 lazyOnload:** GA4 script používá `strategy="lazyOnload"` — načte se až po `onload` eventu, neuberá bandwidth při kritickém načítání.
- **NewsletterCTA lazy:** Na článkových stránkách se načítá přes `next/dynamic` (`ssr: false`) — JS chunk se stahuje až po hydrataci.
- **cookieconsent.css:** Nekopírovat CSS z `node_modules` do statického importu — blokuje render (32 KB). CSS se načítá dynamicky přes `<link>` v `useEffect` z `public/cookieconsent.css`. Při update balíčku je nutné zkopírovat: `cp node_modules/vanilla-cookieconsent/dist/cookieconsent.css public/cookieconsent.css`
- **Browserslist:** `.browserslistrc` cílí na last 2 verze moderních browserů — vyřazuje zbytečné legacy polyfilly (~13 kB).
- **Měření:** pagespeed.web.dev po každém deployi na produkci.

---

## Známé technické dluhy

| Problém | Soubor | Priorita |
|---|---|---|
| `AuthorBio.tsx` linkuje na `/cs/o-mne` místo `/o-mne` | `src/components/article/AuthorBio.tsx` | Střední |
| Chybí stránky `/kategorie/recepty` a `/kategorie/navody` | Navigation.tsx na ně linkuje | Střední |
