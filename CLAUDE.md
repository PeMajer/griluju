# griluju.cz

Grilovací obsahový web pro CZ trh. Monetizace AdSense + affiliate.
Autor = frontend developer + aktivní grilar (pomalé grilování, BBQ, steaky).
Domény: `griluju.cz` (hlavní) + `griluju.com` (301 → .cz).

## Detailed docs

- **Architektura & stack:** `.claude/docs/architecture.md`
- **Konvence kódu:** `.claude/docs/conventions.md`

## Dokumentace (plná reference)

| Soubor | Obsah |
|---|---|
| [docs/architecture.md](docs/architecture.md) | Tech stack, struktura, routing, affiliate systém, performance |
| [docs/commands.md](docs/commands.md) | Dev příkazy, build skripty, gh CLI |
| [docs/components.md](docs/components.md) | Inventář komponent s props a příklady |
| [docs/design.md](docs/design.md) | Design systém — barvy, typografie, Tailwind v4 pravidla |
| [docs/agent-workflow.md](docs/agent-workflow.md) | Chování agenta, checklist, průzkum projektu |
| [docs/guides/article-workflow.md](docs/guides/article-workflow.md) | Životní cyklus článku od zadání po publikaci |
| [docs/guides/tone-of-voice.md](docs/guides/tone-of-voice.md) | Tón, styl, zakázané fráze, pravidla psaní |
| [docs/lessons.md](docs/lessons.md) | Patterny z minulých korekcí — číst na začátku session |

---

## Skills — kdy je použít

- **`/review`** — před každým commitem (lint + build + obsahové kontroly)
- **`/new-article`** — při vytváření nového článku (branch + frontmatter + obsah + PR)
- **`/process-transcripts`** — fetchne nové přepisy z YouTube pipeline a vygeneruje české BBQ články
- **`/session-end`** — uzavření sezení (stav, uncommitted změny, kontext pro příště)
- **`/systematic-debugging`** — když oprava nefunguje napoprvé; 4-fázový protokol s hard stop po 3 pokusech

---

## Work Strategy

**Paralelizuj** — když lze task rozdělit na nezávislé části, vždy spusť subagenty nebo tool calls paralelně (jedna zpráva, více volání současně). Sekvenční jako výchozí je antipattern.

**Prohledávej paralelně** — preferuj paralelní hledání v kódu (Glob + Grep ve stejné zprávě). Při nejistotě kde hledat, použij `Explore` agenta místo opakovaných Grep volání.

**Čti před psaním** — nikdy nenavrhuj změny kódu, který jsi nečetl. Přečti relevantní soubory, pochop kontext, pak piš.

**Minimální zásah** — dělej jen to, co bylo požádáno. Neopravuj okolní kód, nepřidávej komentáře, nerefaktoruj "dokud jsi u toho". Jednoduchá oprava nepotřebuje architekturu.

**Selhání = zastav a přehodnoť** — pokud přístup nefunguje na první nebo druhý pokus, neopakuj totéž. Zastav, diagnostikuj root cause, změň přístup. Po 3 neúspěšných pokusech spusť `/systematic-debugging`.

**Evidence first** — nikdy neříkej "should work" bez spuštění příkazu a přečtení výstupu. Hotovo = zelený output v terminálu.

**Používej specializované agenty** — pro průzkum kódu a čtení více souborů najednou použij `Explore` agenta. Pro plánování složité implementace použij `Plan` agenta. Vždy s `model: "sonnet"`.

---

## Hranice — co agent smí a nesmí

✅ **Always safe:** Čtení souborů, spouštění lint/build, prohledávání kódu, editace obsahu

⚠️ **Ask first:**
- Task vyžaduje smazání nebo zásadní restrukturalizaci existujících souborů
- Existují 2+ validní architektonické přístupy s reálnými trade-offs
- Instrukce je v rozporu s CLAUDE.md
- Chybí závislost nebo API klíč

🚫 **Never:**
- Nikdy nepushuj přímo do `main` — vždy branch + PR
- Nikdy necommituj s rozbité buildem nebo unresolved lint chybami
- Nikdy nepoužívej raw affiliate URL — vždy `/go/[product-slug]`
- Nikdy nepřidávej novou komponentu pokud existující lze rozšířit
- **Nikdy nespojuj `git add` a `git commit` přes `&&`** — pre-commit hook se spustí jen pokud příkaz začíná `git commit`
- Nikdy nepište "Jako jazykový model AI..."

---

## Git — workflow pro každý úkol

1. Zjisti aktuální branch: `git branch --show-current`
2. Pokud `main` → vždy nová branch. Feature branch → porovnej s existujícími změnami.
3. Nová branch: `git checkout main && git pull origin main && git checkout -b [type/popis]`
4. Naming: `feature/`, `fix/`, `content/[slug]`, `issue-<číslo>`
5. Implementuj → `/review` → commit → push → `gh pr create` (automaticky, bez ptaní)

IMPORTANT: Commit messages v angličtině, stručné.

---

## Dokumentace

Když měníš kód, zkontroluj jestli existuje relevantní dokumentace v `docs/` která ho popisuje. Pokud ano, aktualizuj ji. Nenechávej docs out of sync s kódem.

---

## Self-review před dokončením

1. Najdi VŠECHNA místa, která závisí na tom co jsi změnil.
2. Spusť `/review` — lint, build, obsahové kontroly.
3. Projdi git diff jako celek před tím než prohlásíš hotovo.
4. Zeptej se sám sebe: **"Schválil by to zkušený developer?"** Pokud ne, oprav to.
