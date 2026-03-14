# griluju.cz — Claude Code Instructions

## About
Grilovaci obsahovy web pro cesky trh. Monetizace pres AdSense a affiliate.
Autor = frontend developer + aktivni grilar, specializace na pomale grilovani, BBQ a steaky.

Domeny: `griluju.cz` (hlavni) + `griluju.com` (301 redirect na .cz).

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Content**: content-collections v0.14 (MDX), soubory v `/content/posts/[slug]/`
- **Deploy**: Cloudflare Pages (static export, `output: 'export'`)
- **Repo**: GitHub + GitHub Actions
- **Email**: Brevo (ex-Sendinblue)
- **Analytics**: GA4 + Google Search Console

Tailwind v4 — bez `tailwind.config.ts`, konfigurace přes CSS v `src/app/globals.css`.
Affiliate redirecty používají `page.tsx` s meta refresh (ne `route.ts`) — `output: 'export'` nepodporuje API routes.

## Dev Commands

```bash
npm run dev       # dev server on port 3000
npm run build     # production build
npm run lint      # lint check
```

Postbuild scripts (spouštěny automaticky po buildu, nebo ručně):
```bash
node scripts/generate-content-index.mjs  # regeneruje content-index.json
node scripts/generate-sitemap.mjs        # generuje sitemap.xml do out/
```

## Language & Tone

- Write all UI text, articles, and user-facing content in **Czech**
- Code comments in **English**
- Informal but knowledgeable tone — like explaining to a friend who grills
- First person where natural ("Osobne pouzivam...", "Zkusil jsem...")
- Specific numbers: temperatures, times, weights — always precise
- Never use generic filler: "grilovani je radost", "V tomto clanku se dozvite", "Doufam ze se vam recept libil"

## i18n

- Czech content at root path (no `/cs/` prefix) — `app/(cs)/` route group handles this
- Hreflang component in layout, currently only `cs-CZ`
- UI translations in a single config file (`src/lib/i18n.ts`), not scattered across components
- Prepared for future `/de/` and `/en/` locales — add `app/de/` when expanding

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
author: "Petr Majer"
category: "recepty"        # recepty | navod | recenze
keywords: ["pulled pork", "BBQ", "uzeni masa"]
image: "/images/pulled-pork/hero.webp"
affiliate: true            # shows affiliate disclosure
```

### Category URL structure

| Category  | Frontmatter value | URL prefix      | Content type        |
|-----------|-------------------|-----------------|---------------------|
| recepty   | `recepty`         | `/recepty/`     | Recipes with steps  |
| navod     | `navod`           | `/navody/`      | How-to guides       |
| recenze   | `recenze`         | `/recenze/`     | Product reviews and comparisons |

### Article body conventions

- H1 = title (from frontmatter, not in body)
- Intro: 2-3 sentences why the topic matters
- H2 sections: logical flow, not bullet lists
- Conclusion: practical summary, actionable
- Internal links: 3-5 per article, descriptive anchor text (never "click here")
- Affiliate links: always use `/go/[product-slug]` redirect, never raw URLs
- For internal links, consult `content-index.json` to find existing published articles

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

- Cookie banner: vanilla-cookieconsent (open source, zdarma, bez registrace)
- Consent Mode v2 in root `layout.tsx` before GA4 script
- Privacy Policy + Cookie Policy pages required

## Performance

- Lighthouse mobile score 90+ required before publishing
- Test with PageSpeed Insights after every template change

## Git Workflow

- **NIKDY nepushuj přímo do `main`** — vždy vytvoř novou branch a otevři PR
- Branch naming: `feature/popis`, `fix/popis`, `content/slug-clanku`, `issue-<číslo>`
- Commit messages: Czech, concise
- Neprovádej `git push --force` na žádnou branch
- content-index.json auto-updated by GitHub Action on merge to main
- **Context management**: Pri zpracovani vice komplexnich ukolu za sebou pouzivej `/clear` pro uvolneni kontextu mezi ukoly.

### Workflow pro každý nový úkol

Při každém novém úkolu:

1. Zjisti aktuální branch (`git branch --show-current`) a zkontroluj změny (`git log main..HEAD --oneline`)
2. **Rozhodnutí — nový úkol vs. pokračování:**
   - Pokud aktuální branch je `main` → vždy nová branch
   - Pokud aktuální branch je feature branch → porovnej zadání se stávajícími změnami (`git diff main..HEAD --name-only`). Pokud se zadání týká stejných souborů nebo logicky navazuje → pokračuj na stávající branch. Pokud je zadání nesouvisející → checkout main, pull, nová branch.
3. Při startu na nové branchi: `git checkout main && git pull origin main`, pak `git checkout -b feature/popis`
4. Implementuj změny
5. Commitni a pushni: bez ptání, automaticky
6. Otevři PR pomocí `gh pr create` — bez ptání, automaticky

## Autonomous Agent Work

### Before Starting Any Task

1. Read the relevant existing files first — never write blind.
2. Check if a similar pattern already exists in the codebase (component, config, article structure) and follow it exactly.
3. If the task involves content, check `/content/posts/` for existing articles to match tone and structure.
4. For code changes, run `npm run lint` after editing and fix all errors before finishing.

### Decision Making — When to Proceed vs. Ask

Proceed without asking when:
- The task is clearly scoped and the right approach is obvious from existing code.
- The change is reversible (content, styling, config values).
- The instruction matches an established pattern in the codebase.

Stop and ask when:
- The task requires deleting or fundamentally restructuring existing files.
- Two or more valid architectural approaches exist with real trade-offs.
- An instruction contradicts something in this file.
- A required dependency or API key is missing.

### Task Scoping

- Break large tasks into commits — one logical change per commit.
- If a task spans more than 5 files, create a feature branch and open a PR.
- For content tasks (new article): create the MDX file, verify frontmatter completeness, add internal links, then commit on a `content/slug` branch.
- For code tasks: read → edit → lint → build check → commit.

### Elegance Check

For any non-trivial code change (new component, refactor, architectural decision), pause and ask:
- "Is there a simpler way to achieve the same result?"
- "Does this follow the existing pattern in the codebase, or am I introducing a new one unnecessarily?"

Skip this for simple, obvious fixes — don't over-engineer.

### Subagent Strategy

Use subagents (Agent tool) to keep the main context window clean:
- **Research & exploration**: finding files, understanding patterns, reading multiple files in parallel
- **Parallel independent tasks**: e.g. checking two different parts of the codebase simultaneously
- **Always use `model: "sonnet"`** when spawning subagents

Don't use subagents for: simple file reads, single-file edits, or tasks that need the main context.

### Self-Verification Checklist

Run through this before marking any task done:

- [ ] All linter errors resolved (`npm run lint`)
- [ ] No TypeScript errors (`npm run build` or type-check)
- [ ] New MDX articles have ≥3 internal links and valid frontmatter
- [ ] Affiliate links use `/go/` prefix, never raw URLs
- [ ] Images referenced in MDX exist in `/public/images/[slug]/`
- [ ] No hardcoded Czech text outside the translations config
- [ ] Git: feature branch created, changes committed, PR opened

### Exploring the Codebase

When you need to understand a part of the project before editing:

- Start with `src/app/` for routing and layout patterns.
- `src/components/` for UI building blocks — check what exists before creating new.
- `content/posts/` for article structure reference.
- `affiliates.config.ts` before adding any product links.
- `src/lib/` for shared utilities and data-fetching helpers.

### Content Article Workflow

1. Read `content-index.json` — get overview of existing articles for internal links.
2. Create `/content/posts/[slug]/index.mdx` with complete frontmatter.
3. Write intro (2-3 sentences, no filler), H2 sections with flowing text.
4. Add 3-5 internal links with descriptive anchors (slugy z `content-index.json`).
5. Add affiliate links via `/go/` only (update `affiliates.config.ts` if new product).
6. Place image placeholder `[VLASTNI FOTO AUTORA]` for Layer-1, or Unsplash reference for Layer-2.
7. Verify word count is appropriate for category (recipe: 1000–2000 words, guide: 1500–3000).
8. Commit on branch `content/[slug]` and open PR.

### Article Prompt Template (Phase 3 AI Pipeline)

When creating an article via GitHub Issue or prompt, use this structure:

```markdown
## Clanek: [Nazev]

**Klicove slovo:** [hlavni KW]
**Typ obsahu:** vrstva-1 / vrstva-2
**Kategorie:** recepty / navod / recenze
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

### Lessons Learned

After any correction from the user, add a pattern to `docs/lessons.md`:
- What went wrong
- The rule to prevent it next time

At the start of a new session, check `docs/lessons.md` for patterns relevant to the current task.

### Error Handling

- If `npm run build` fails after your changes, fix it before committing — never leave the build broken.
- If a lint rule is unclear, follow the existing code style in the same file rather than guessing.
- If an import is missing, check `package.json` before adding a new dependency — prefer using what's already installed.

## Agent Task Workflow

When picking up a GitHub issue:

1. Run `git checkout main && git pull origin main` before starting
2. Create a new branch: `issue-<number>` or `feature/<description>`
3. Read the full issue with `gh issue view <number>`
4. Implement the solution, run tests (`npm test`, `npm run lint`, `npm run build`)
5. Commit changes and push the branch
6. Open a PR with `gh pr create` — reference the issue in the PR body (e.g. "Closes #42")
7. Do NOT merge the PR — wait for human review

## What Never To Do

- Never write "Jako jazykovy model AI..."
- Never add generic conclusions without value
- Never use bullet points where flowing text works better
- Never use raw affiliate URLs in articles — always `/go/` prefix
- Never publish without internal links (minimum 3)
- Never edit `main` branch directly — always branch + PR
- Never commit with a broken build or unresolved lint errors
- Never create a new component if an existing one can be extended
