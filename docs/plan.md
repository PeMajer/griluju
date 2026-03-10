# griluju.cz — Implementation Plan

Reference for the AI agent. Full business plan is maintained separately.

---

## Project Structure

```
griluju/
├── CLAUDE.md                    # Agent instructions
├── docs/
│   └── plan.md                  # This file
├── content/
│   └── posts/
│       └── [slug]/
│           └── index.mdx        # Article content
├── content-collections.ts       # content-collections config (Zod schema)
├── content-index.json           # Auto-generated article index
├── affiliates.config.ts         # Affiliate link registry
├── scripts/
│   ├── generate-content-index.mjs  # Generates content-index.json
│   └── generate-sitemap.mjs        # Generates sitemap.xml into out/
├── .github/
│   └── workflows/
│       └── content-index.yml    # Auto-update content-index.json on merge
├── public/
│   ├── _redirects               # Cloudflare Pages: / → /cs/ (301)
│   └── images/
│       └── [slug]/              # Article images (WebP)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (minimal, imports globals.css)
│   │   ├── page.tsx             # Root redirect / → /cs/
│   │   ├── globals.css          # Tailwind base + prose styles
│   │   ├── [locale]/
│   │   │   ├── layout.tsx       # Locale layout with hreflang, consent mode
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── o-mne/
│   │   │   │   └── page.tsx     # About me (EEAT)
│   │   │   ├── kontakt/
│   │   │   │   └── page.tsx     # Contact
│   │   │   ├── ochrana-soukromi/
│   │   │   │   └── page.tsx     # Privacy Policy
│   │   │   ├── cookies/
│   │   │   │   └── page.tsx     # Cookie Policy
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Article page (MDX rendering)
│   │   └── go/
│   │       └── [product]/
│   │           └── page.tsx     # Affiliate redirect (meta refresh, static)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── article/
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleHeader.tsx
│   │   │   ├── AuthorBio.tsx       # Author byline + link to profile
│   │   │   ├── AffiliateDisclosure.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   └── RelatedArticles.tsx
│   │   ├── schema/
│   │   │   ├── RecipeSchema.tsx
│   │   │   ├── HowToSchema.tsx
│   │   │   ├── FAQSchema.tsx
│   │   │   └── ProductSchema.tsx
│   │   ├── tools/                  # (Phase 1 nice-to-have, not yet created)
│   │   │   ├── TemperatureTable.tsx
│   │   │   └── GrillTimer.tsx
│   │   ├── email/                  # (not yet created)
│   │   │   └── NewsletterForm.tsx
│   │   ├── seo/
│   │   │   ├── Hreflang.tsx
│   │   │   └── ConsentMode.tsx        # Google Consent Mode v2
│   │   └── ui/
│   │       └── CookieBanner.tsx       # Cookieyes wrapper (needs real ID)
│   ├── lib/
│   │   ├── content.ts             # content-collections helpers
│   │   ├── i18n.ts                # Locale config and translations
│   │   └── affiliates.ts          # Affiliate redirect logic
│   └── styles/                    # (unused — globals.css is in src/app/)
├── next.config.ts                 # output: 'export', withContentCollections
├── tsconfig.json
└── package.json
```

---

## Phase 1: Scaffolding (Week 2-3) — DONE

PR: https://github.com/PeMajer/griluju/pull/1

### Must have

1. ~~**Next.js 15 App Router** with TypeScript and Tailwind CSS~~ — Done (Next.js 16.1.6, Tailwind v4)
2. ~~**i18n routing**: Czech content at root path (no `/cs/` prefix), `app/(cs)/` route group~~ — Done (refactored from `[locale]` approach)
3. ~~**content-collections** setup for MDX articles in `/content/posts/[slug]/`~~ — Done (v0.14, Zod schema, `@content-collections/mdx`)
4. ~~**Basic layout**: Header, Footer, Navigation, Homepage, Article page~~ — Done
5. ~~**Author profile page** (`/o-mne`) — EEAT requirement~~ — Done
6. ~~**Affiliate link manager**: `/go/[product]` route + `affiliates.config.ts`~~ — Done (static pages with meta refresh, compatible with `output: 'export'`)
7. ~~**Schema components**: Recipe, HowTo, FAQ, Product (JSON-LD in head)~~ — Done; BlogPosting schema auto-injected on all article pages
8. ~~**Hreflang component** in layout (currently only cs-CZ)~~ — Done
9. ~~**Google Consent Mode v2** initialization in layout before GA4~~ — Done; GA4Script component added (activate by setting NEXT_PUBLIC_GA4_ID in .env.local)
10. ~~**Cookie banner** placeholder (Cookieyes script tag)~~ — Done (needs real Cookieyes ID)
11. ~~**Privacy Policy + Cookie Policy** pages (generated content)~~ — Done
12. ~~**Sitemap** generation (`next-sitemap` or custom)~~ — Done (custom post-build script `scripts/generate-sitemap.mjs`)
13. ~~**content-index.json** — auto-generated list of all articles~~ — Done (+ `scripts/generate-content-index.mjs`)
14. ~~**GitHub Action**: update content-index.json on merge to main~~ — Done (`.github/workflows/content-index.yml`)
15. ~~**Cloudflare Pages** compatible output~~ — Done (`output: 'export'`, `images: { unoptimized: true }`)
16. **Lighthouse mobile 90+** before launch — TODO (needs deploy to test)

### Implementation notes

- Next.js 16 was installed (latest at time of scaffolding). App Router API is compatible with 15.
- Affiliate redirects use `page.tsx` with meta refresh instead of `route.ts` because `output: 'export'` doesn't support API routes.
- `tailwind.config.ts` not needed — Tailwind v4 uses CSS-based config in `globals.css`.
- `src/styles/` directory not used — `globals.css` lives in `src/app/`.
- Czech content uses `app/(cs)/` route group — no `/cs/` in URLs. Future DE: add `app/de/` folder.
- GA4 ID: set `NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX` in `.env.local` to activate analytics.

### Nice to have (not yet done)

- Temperature table interactive tool
- BBQ timer tool
- RSS feed
- Dark mode

---

## Phase 2: First Content (Week 4-8)

Author writes 10-15 articles manually (Layer 1). Order:

1. Teplomer na gril — jak jsem ho vybiral (affiliate, EEAT)
2. Pulled pork krok za krokem (pillar article, own photos)
3. Jak grilovat steak (high search volume)
4. Nejlepsi grily do 5000 Kc (affiliate, comparison)
5. Jak grilovat zeleninu (low competition)
6. Grilovaci marinada (informational)
7. Jak spravne roztopit gril (beginner)
8. Plynovy vs uhlikovy gril (comparison)
9. Picanha na grilu (niche, low competition)
10. Jak grilovat hermelin (Czech classic, high volume)

Each article needs:
- Own photos (WebP, max 150 kB)
- Personal experience paragraph
- Specific numbers (temps, times, weights)
- 3-5 internal links
- Schema markup where applicable

---

## Phase 3: AI Pipeline (Week 8+)

After 10-15 manual articles, start AI-assisted content production.

### Simple workflow (recommended)

1. Write article prompt with template (see below)
2. AI generates MDX draft
3. Author reviews, adds context, fixes facts
4. Add internal links (check content-index.json)
5. Commit to repo -> auto deploy

### GitHub Issues workflow (optional, for 10+ articles/week)

1. Create Issue with article template
2. Claude Code on VM reads Issue, generates MDX + PR
3. Author reviews PR, fills `[DOPLNI]` placeholders, adds photos
4. Merge -> auto deploy

### Article Issue template

```markdown
## Clanek: [Nazev]

**Klicove slovo:** [hlavni KW]
**Typ obsahu:** vrstva-1 / vrstva-2
**Kategorie:** recepty / navod / recenze / srovnani
**Cilova delka:** ~1500 / ~2500 slov
**Affiliate produkty:** [produkty nebo kategorie]

## Cilova skupina a intent
[Kdo clanek cte a co hleda]

## Povinne body clanku
[Co musi clanek obsahovat]

## Kontext (vrstva-1)
[Konkretni zkusenosti, cisla, chyby ktere agent zapracuje]

## Fotka
Typ: vlastni / Unsplash query: [vyraz]
```

---

## Content Categories

| Category   | URL prefix    | Content type          |
|------------|---------------|-----------------------|
| recepty    | /cs/recepty/  | Recipes with steps    |
| navod      | /cs/navody/   | How-to guides         |
| recenze    | /cs/recenze/  | Product reviews       |
| srovnani   | /cs/srovnani/ | Product comparisons   |

---

## SEO Targets

### Priority keywords (start here)

| Keyword                        | Volume    | Difficulty | Type          |
|--------------------------------|-----------|------------|---------------|
| jak grilovat kure              | 1000-3000 | medium     | informational |
| jak grilovat steak             | 1000-3000 | medium     | informational |
| jak grilovat zeleninu          | 500-1500  | low        | informational |
| jak grilovat hermelin          | 500-1000  | low        | informational |
| pulled pork recept             | 300-700   | low        | informational |
| grilovaci marinada             | 500-1500  | low        | informational |
| nejlepsi gril do 5000 Kc       | 500-1500  | medium     | transactional |
| nejlepsi plynovy gril          | 500-1000  | medium     | transactional |
| plynovy vs uhlikovy gril       | 300-700   | low        | comparison    |
| grilovaci teplomer recenze     | 100-300   | very low   | transactional |

### Content ratio rule

Maintain **1:2** ratio of Layer-1 (own) to Layer-2 (AI-assisted) articles permanently.
Never let ratio drop below 1:3. Google HCU penalizes AI-heavy domains.

---

## Affiliate Programs

| Program    | Commission | Priority                         |
|------------|------------|----------------------------------|
| Mall.cz    | 2-4%       | Start — easy approval            |
| Alza.cz    | 1-3%       | Start — backup                   |
| Heureka    | 1-5%       | Good for comparison articles     |
| Besteto.cz | 3-6%       | Specialized grilling equipment   |
| Weber CZ   | TBD        | Contact after 5 published articles |
| Amazon.de  | 3-10%      | Add after 1000+ visits/month     |

---

## Performance Requirements

- Lighthouse mobile score: **90+**
- LCP: hero image with `priority` prop
- CLS: always set `width` + `height` on images
- Images: WebP only, recipe max 150 kB, product max 100 kB
- Test after every template change: PageSpeed Insights
