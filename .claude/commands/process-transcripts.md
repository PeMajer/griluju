Zpracuj nové přepisy z YouTube pipeline — fetchni nepřečtené přepisy, vygeneruj české BBQ články a commitni je jako drafty k review.

## Postup

### 1. Načti kontext projektu

```bash
cat content-index.json
```

Projdi 2–3 existující články v `content/posts/` jako referenci struktury a tónu.

### 2. Fetchni seznam nových přepisů

Načti credentials z `.env.local`:

```bash
source .env.local
```

```bash
curl -s -H "X-Api-Key: $PIPELINE_API_KEY" \

"$PIPELINE_BASE_URL/api/v1/videos?status=transcript_ready&queued_for_blog=false" | jq .
```

Zpracuj jen videa kde `queued_for_blog: false`.

### 3. Pro každé video fetchni přepis

```bash
curl -s -H "X-Api-Key: $PIPELINE_API_KEY" \
  "$PIPELINE_BASE_URL/api/v1/transcripts/{video_id}" | jq .
```

Odpověď obsahuje: `video_id`, `title`, `channel`, `published_at`, `language`, `source_type`, `cleaned_transcript`.

> **Whisper přepisy** (`source_type: "whisper"`): Před psaním článku projdi přepis a vypiš:
> 1. Všechna čísla (teploty, časy, váhy) — ověř, že dávají smysl v kontextu (Whisper zaměňuje podobně znějící hodnoty: 130 °C vs 180 °C)
> 2. Vlastní jména (řezy masa, techniky, značky) — ověř správný pravopis (ribeye, wagyu, Weber)
> 3. Věty kde přepis nedává smysl — označ je [OVĚŘIT]
>
> Teprve po tomto kroku piš článek.

### 4. Vygeneruj článek

Pro každý přepis vytvoř branch:

```bash
git checkout main && git pull origin main && git checkout -b content/[slug]
```

#### KROK 1 — extrahuj z transkriptu (před psaním)

Z přepisu vytáhni a zapiš si:

**a) Hlavní tezi** — co je v tomto videu jinak nebo lepší než běžný postup?
**b) Osobní momenty** — kdy autor něco zjistil, pokazil nebo byl překvapený? (konkrétní situace > obecné pravidlo)
**c) Konkrétní čísla** — teploty, časy, množství, poměry
**d) Varování** — na co si dát pozor, kde lidé chybují

Teprve po extrakci piš článek.

#### KROK 2 — napiš článek

Postupuj dle `.claude/commands/new-article.md` kroky 2–5.

Podkladem jsou data extrahovaná v KROKU 1. Přirovnání a konkrétní příběhy z transkriptu zachovej celé.

Hero image zpravidla chybí → přidej `{/* HERO IMAGE NEEDED */}` za frontmatter (MDX syntaxe — HTML komentáře nefungují).

### 5. Označ video jako zpracované

Po commitu článku označ video v pipeline:

```bash
curl -s -X PATCH \
  -H "X-Api-Key: $PIPELINE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"video": {"queued_for_blog": true}}' \
  "$PIPELINE_BASE_URL/api/v1/videos/{video_id}"
```

### 6. Commit a PR

```bash
git add content/posts/[slug]/
git commit
git push -u origin content/[slug]
gh pr create --title "[slug]: název článku" --body "Draft z pipeline přepisu — ke kontrole před publikací."
```

Opakuj kroky 3–6 pro každé nové video.
