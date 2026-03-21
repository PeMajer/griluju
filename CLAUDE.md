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
- **`/session-end`** — uzavření sezení (stav, uncommitted změny, kontext pro příště)
- **`/systematic-debugging`** — když oprava nefunguje napoprvé; 4-fázový protokol s hard stop po 3 pokusech

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
- Nikdy nepište "Jako jazykový model AI..."

---

## Git — workflow pro každý úkol

1. Zjisti aktuální branch: `git branch --show-current`
2. Pokud `main` → vždy nová branch. Feature branch → porovnej s existujícími změnami.
3. Nová branch: `git checkout main && git pull origin main && git checkout -b [type/popis]`
4. Naming: `feature/`, `fix/`, `content/[slug]`, `issue-<číslo>`
5. Implementuj → `/review` → commit → push → `gh pr create` (automaticky, bez ptaní)

IMPORTANT: Commit messages v češtině, stručné. Vždy volej `git add` a `git commit` jako **dvě samostatná volání** — nikdy nespojuj `&&`. Pre-commit hook se spustí pouze pokud příkaz začíná `git commit`.

---

## Dokumentace

Když měníš kód, zkontroluj jestli existuje relevantní dokumentace v `docs/` která ho popisuje. Pokud ano, aktualizuj ji. Nenechávej docs out of sync s kódem.

---

## Pipeline integrace — přepisy z YouTube

Nová videa z YouTube jsou automaticky zpracována pipeline projektem (`griluju-yt-pipeline`) běžícím v OrbStack VM. Agent může přepisy fetchovat přes HTTP API.

### API

- **Base URL:** `http://192.168.139.146:3000`
- **Auth header:** `X-Api-Key: <hodnota z PIPELINE_API_KEY>`

> Hodnotu `PIPELINE_API_KEY` najdeš v `.env` souboru pipeline projektu (`/Users/majer/Projects/griluju-yt-pipeline/.env`).

### Endpoints

**Seznam videí s přepisem (ještě nezpracovaných blogem):**
```
GET /api/v1/videos?status=completed
```
Vrátí seznam videí. Zpracovat jen ta kde `queued_for_blog: false`.

**Detail přepisu:**
```
GET /api/v1/transcripts/{video_id}
```
Vrátí:
```json
{
  "video_id": "...",
  "title": "...",
  "channel": "...",
  "published_at": "...",
  "language": "en",
  "source_type": "manual_subtitles|auto_captions|whisper",
  "cleaned_transcript": "..."
}
```

**Označit video jako zpracované (povinné po vygenerování článku):**
```
PATCH /api/v1/videos/{video_id}
Body: {"video": {"queued_for_blog": true}}
```

### Postup při zpracování přepisů

1. Fetchni seznam: `GET /api/v1/videos?status=completed`
2. Pro každé video kde `queued_for_blog: false` fetchni přepis
3. Vygeneruj článek dle `docs/guides/tone-of-voice.md` a `docs/guides/article-workflow.md`
4. Označ video jako zpracované: `PATCH /api/v1/videos/{video_id}` s `queued_for_blog: true`
5. Přepis je v angličtině — adaptuj pro českého čtenáře, nepřekládej doslova
6. Převeď americké jednotky: °F → °C, libry → kg, unce → g

> **Poznámka ke zdroji:** Pokud je `source_type: "whisper"`, přepis byl generován speech-to-text a může obsahovat přepisové chyby — buď opatrný u číselných hodnot (teploty, časy) a vlastních jmen.

---

## Self-review před dokončením

1. Najdi VŠECHNA místa, která závisí na tom co jsi změnil.
2. Spusť `/review` — lint, build, obsahové kontroly.
3. Projdi git diff jako celek před tím než prohlásíš hotovo.
4. Zeptej se sám sebe: **"Schválil by to zkušený developer?"** Pokud ne, oprav to.

**Evidence first** — nikdy neříkej "should work", "pravděpodobně projde" nebo "zdá se OK" bez spuštění příkazu a přečtení výstupu. Hotovo znamená zelený output.
