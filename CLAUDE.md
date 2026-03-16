# griluju.cz

Grilovací obsahový web pro CZ trh. Monetizace AdSense + affiliate.
Autor = frontend developer + aktivní grilar (pomalé grilování, BBQ, steaky).
Domény: `griluju.cz` (hlavní) + `griluju.com` (301 → .cz).

**Stack:** Next.js 16 App Router, TypeScript, Tailwind v4 (CSS config, bez `tailwind.config.ts`),
content-collections 0.14 (MDX), Cloudflare Pages (`output: 'export'` — API routes nejsou podporovány).

## Dokumentace

| Soubor | Obsah |
|---|---|
| [docs/architecture.md](docs/architecture.md) | Tech stack, struktura, routing, affiliate systém, performance |
| [docs/commands.md](docs/commands.md) | Dev příkazy, build skripty, gh CLI |
| [docs/agent-workflow.md](docs/agent-workflow.md) | Chování agenta, checklist, průzkum projektu, tvorba článků |
| [docs/guides/article-workflow.md](docs/guides/article-workflow.md) | Životní cyklus článku od zadání po publikaci |
| [docs/guides/tone-of-voice.md](docs/guides/tone-of-voice.md) | Tón, styl, zakázané fráze, pravidla psaní |
| [docs/lessons.md](docs/lessons.md) | Patterny z minulých korekcí — číst na začátku session |

---

## Hranice — co agent smí a nesmí

🚫 **NEVER (hard stops):**
- Nikdy nepushuj přímo do `main` — vždy branch + PR
- Nikdy necommituj s rozbité buildem nebo unresolved lint chybami
- Nikdy nepoužívej raw affiliate URL — vždy `/go/[product-slug]`
- Nikdy nepřidávej novou komponentu pokud existující lze rozšířit
- Nikdy nepište "Jako jazykový model AI..."

⚠️ **Ask first (zastav a zeptej se):**
- Task vyžaduje smazání nebo zásadní restrukturalizaci existujících souborů
- Existují 2+ validní architektonické přístupy s reálnými trade-offs
- Instrukce je v rozporu s CLAUDE.md
- Chybí závislost nebo API klíč

✅ **Proceed without asking:**
- Task je jasně ohraničený, přístup je zřejmý z kódu
- Reverzibilní změna (obsah, styling, config)
- Odpovídá etablovanému patternu v projektu

---

## Git — workflow pro každý úkol

1. Zjisti aktuální branch: `git branch --show-current`
2. Pokud `main` → vždy nová branch. Feature branch → porovnej s existujícími změnami.
3. Nová branch: `git checkout main && git pull origin main && git checkout -b [type/popis]`
4. Naming: `feature/`, `fix/`, `content/[slug]`, `issue-<číslo>`
5. Implementuj → lint → build → commit → push → `gh pr create` (automaticky, bez ptaní)

IMPORTANT: Commit messages v češtině, stručné. Neprovádět `git push --force`.

---

## Jazyk a obsah

- UI texty a články v **češtině**, code comments v angličtině
- H1 z frontmatteru (nikdy v body), 3–5 interních odkazů na článek (ze `content-index.json`)
- Affiliate: vždy `/go/[slug]`, nikdy raw URL; updatovat `affiliates.config.ts`
- Obrázky: WebP, vždy `width` + `height`, `priority` na hero image
- Lighthouse mobile 90+ před publikací
