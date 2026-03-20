# Architecture — griluju.cz

## Stack

| Vrstva | Tech | Poznámka |
|---|---|---|
| Framework | Next.js 16 App Router | `output: 'export'` — static HTML/CSS/JS |
| Jazyk | TypeScript 5 | Striktní typy |
| Stylování | Tailwind CSS v4 | CSS-based config, **bez** `tailwind.config.ts` |
| Obsah | content-collections 0.14 | MDX soubory, Zod schema |
| Deploy | Cloudflare Pages | CDN, free tier |

## Kritická omezení

- **Žádné API routes** — `output: 'export'` neumožňuje `route.ts`. Affiliate redirecty řeší `page.tsx` s meta refresh.
- **Žádná automatická optimalizace obrázků** — `images: { unoptimized: true }`. Obrázky připravovat ručně jako WebP.
- **Žádný Node.js server** — vše musí být staticky exportovatelné.

## Struktura složek

```
content/posts/[slug]/index.mdx   # MDX články
public/images/[slug]/            # WebP obrázky článků
src/app/(cs)/                    # Route group — CZ obsah bez URL prefixu
src/app/go/[product]/page.tsx    # Affiliate redirect (meta refresh)
src/components/                  # Komponenty — viz docs/components.md
src/lib/content.ts               # content-collections helpers
src/lib/i18n.ts                  # siteConfig + překlady
affiliates.config.ts             # Registr affiliate URL (centrální)
content-index.json               # Auto-generovaný index článků
```

## Routing

```
app/(cs)/page.tsx          → /
app/(cs)/[slug]/page.tsx   → /nazev-clanku
app/(cs)/o-mne/page.tsx    → /o-mne
app/go/[product]/page.tsx  → /go/weber-master-touch
```

## Affiliate systém

Tok: `/go/[slug]` → `app/go/[product]/page.tsx` → načte URL z `affiliates.config.ts` → meta refresh na affiliate URL.

**Pravidlo:** Nikdy raw URL v článcích. Vždy `/go/[slug]`. Nový produkt → přidat do `affiliates.config.ts`.

## Content schema (frontmatter)

```ts
title, slug, description, date, updated? , author,
category: "recepty" | "navod" | "recenze",
keywords: string[], image?, affiliate: boolean
```

## Klíčové skripty

```bash
node scripts/generate-content-index.mjs  # regenerace content-index.json
node scripts/generate-sitemap.mjs        # sitemap.xml → out/
node scripts/convert-images-to-webp.mjs  # JPG/PNG → WebP
```

## GitHub Actions

- `content-index.yml` — auto-update `content-index.json` při merge do main
- `lighthouse.yml` — Lighthouse CI audit na každém PR (target: mobile 90+)
