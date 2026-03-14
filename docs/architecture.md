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
│   └── images/
│       └── [slug]/                    # Obrázky článků (WebP)
│
├── scripts/
│   ├── generate-content-index.mjs     # Regeneruje content-index.json
│   └── generate-sitemap.mjs           # Generuje sitemap.xml do out/
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
        └── content-index.yml          # Auto-update content-index.json při merge do main
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
  category: z.enum(["recepty", "navod", "recenze", "srovnani"]),
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
              ├── generate-content-index.mjs
              └── generate-sitemap.mjs → out/sitemap.xml
```

Cloudflare Pages spouští `npm run build` automaticky při každém push na `main`.

---

## Známé technické dluhy

| Problém | Soubor | Priorita |
|---|---|---|
| `AuthorBio.tsx` linkuje na `/cs/o-mne` místo `/o-mne` | `src/components/article/AuthorBio.tsx` | Střední |
| `next-mdx-remote` nainstalován, ale nepoužíván | `package.json` | Nízká |
| `AuthorBio.tsx` linkuje na `/cs/o-mne` místo `/o-mne` | `src/components/article/AuthorBio.tsx` | Střední |
| Chybí stránky `/kategorie/recepty` a `/kategorie/navody` | Navigation.tsx na ně linkuje | Střední |
