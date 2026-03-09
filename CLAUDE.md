# griluju.cz — Claude Code Instructions

## About
Grilovaci obsahovy web pro cesky trh. Monetizace pres AdSense a affiliate.
Autor = frontend developer + aktivni grilar, specializace na pomale grilovani, BBQ a steaky.

Domeny: `griluju.cz` (hlavni) + `griluju.com` (301 redirect na .cz).

## Tech Stack

- **Framework**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Content**: content-collections (MDX), soubory v `/content/posts/[slug]/`
- **Deploy**: Cloudflare Pages (static export)
- **Repo**: GitHub + GitHub Actions
- **Email**: Brevo (ex-Sendinblue)
- **Analytics**: GA4 + Google Search Console

## Dev Commands

```bash
npm run dev       # dev server on port 3000
npm run build     # production build
npm test          # run tests
npm run lint      # lint check
```

## Language & Tone

- Write all UI text, articles, and user-facing content in **Czech**
- Code comments in **English**
- Informal but knowledgeable tone — like explaining to a friend who grills
- First person where natural ("Osobne pouzivam...", "Zkusil jsem...")
- Specific numbers: temperatures, times, weights — always precise
- Never use generic filler: "grilovani je radost", "V tomto clanku se dozvite", "Doufam ze se vam recept libil"

## i18n

- `/cs/` as default locale with redirect from root
- hreflang component in layout, currently only `cs-CZ`
- UI translations in a single config file, not scattered across components
- Prepared for future `/de/` and `/en/` locales

## Article Structure (MDX)

```
/content/posts/[slug]/
  index.mdx        # article content
```

### Frontmatter

```yaml
title: "Pulled pork krok za krokem"
slug: "pulled-pork-krok-za-krokem"
description: "SEO meta description, max 155 chars"
date: "2026-03-15"
updated: "2026-03-15"
author: "Tomas Majer"
category: "recepty"        # recepty | navod | recenze | srovnani
keywords: ["pulled pork", "BBQ", "uzeni masa"]
image: "/images/pulled-pork/hero.webp"
affiliate: true            # shows affiliate disclosure
```

### Article body conventions

- H1 = title (from frontmatter, not in body)
- Intro: 2-3 sentences why the topic matters
- H2 sections: logical flow, not bullet lists
- Conclusion: practical summary, actionable
- Internal links: 3-5 per article, descriptive anchor text (never "click here")
- Affiliate links: always use `/go/[product-slug]` redirect, never raw URLs

## Affiliate Link Manager

- All affiliate URLs managed in `affiliates.config.ts`
- Redirect prefix: `/go/[product-slug]` -> actual affiliate URL
- Per-locale config: `mall.cz` for `/cs/`, `amazon.de` for `/de/` (future)
- Affiliate disclosure required in header of every article with affiliate links

## Schema Markup

Shared components for structured data:

| Schema    | Where                    |
|-----------|--------------------------|
| Recipe    | All recipe articles      |
| HowTo     | Tutorial/guide articles  |
| FAQPage   | Longer articles with Q&A |
| Product   | Product review articles  |

## Images

- Store in `/public/images/[slug]/`
- Format: WebP only
- Max size: recipe photo 150 kB, product photo 100 kB
- Always set `width` and `height` on `<Image>` (CLS prevention)
- Hero image: use `priority` prop (LCP optimization)
- Layer-1 articles: placeholder `[VLASTNI FOTO AUTORA]` — author adds during review
- Layer-2 articles: Unsplash via API

## Content Layers

- **Layer 1 (vlastni)**: Written by author or heavily rewritten AI draft. Must include personal experience paragraph, own photos, specific numbers from real grilling, mention of a mistake or surprise.
- **Layer 2 (AI-assisted)**: AI writes, author reviews facts and adds context. Fact-check required.
- **Ratio**: Maintain 1:2 (layer-1 : layer-2) permanently. Never worse than 1:3.

## GDPR & Analytics

- Cookie banner: Cookieyes integration
- Consent Mode v2 in root `layout.tsx` before GA4 script
- Privacy Policy + Cookie Policy pages required

## Performance

- Lighthouse mobile score 90+ required before publishing
- Test with PageSpeed Insights after every template change

## Git Workflow

- Branch naming: `feature/popis`, `fix/popis`, `content/slug-clanku`
- Commit messages: Czech, concise
- Always open PR, never push directly to main
- content-index.json auto-updated by GitHub Action on merge to main
- **Auto-commit**: Pri komplexnich ukolech (vice souboru, vice kroku) commituj a pushni automaticky bez ptani. Vytvor feature branch, commitni, pushni, vytvor PR.

## What Never To Do

- Never write "Jako jazykovy model AI..."
- Never add generic conclusions without value
- Never use bullet points where flowing text works better
- Never use raw affiliate URLs in articles — always `/go/` prefix
- Never publish without internal links (minimum 3)
