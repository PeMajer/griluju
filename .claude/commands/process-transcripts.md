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

> **Dvě fáze — záměrně oddělené role:**
> Generování probíhá ve dvou průchodech: autor (krok 4 + 4b) a kritik (krok 4c).
> Kombinace obou rolí v jednom průchodu vede ke kompromisu — agent přepíná mezi psaním a kontrolou a dělá obojí hůř.
> **Nejdřív napiš, pak zkontroluj. Nepřekrývej tyto dvě fáze.**

Pro každý přepis vytvoř article branch a soubor:

```bash
git checkout main && git pull origin main && git checkout -b content/[slug]
```

**Před psaním přečti celý `docs/guides/tone-of-voice.md`** — obsahuje pravidla tónu, struktury i jazykové kontroly.

**Referenční styl:** Přečti `.claude/docs/reference-article.md` a piš přesně tímto stylem — délka odstavců, způsob vysvětlení kroků, osobní momenty.

#### KROK 1 — extrahuj z transkriptu (před psaním)

Z přepisu vytáhni a zapiš si:

**a) Hlavní tezi** — co je v tomto videu jinak nebo lepší než běžný postup?
**b) Osobní momenty** — kdy autor něco zjistil, pokazil nebo byl překvapený? (konkrétní situace > obecné pravidlo)
**c) Konkrétní čísla** — teploty, časy, množství, poměry
**d) Varování** — na co si dát pozor, kde lidé chybují

Teprve po extrakci piš článek.

#### KROK 2 — napiš článek

Postupuj dle `.claude/commands/new-article.md` kroky 2–3c (Frontmatter → Psaní → Rewrite pass → Validační průchod).

Podkladem jsou data extrahovaná v KROKU 1. Přirovnání a konkrétní příběhy z transkriptu zachovej celé.

Hero image zpravidla chybí → přidej `{/* HERO IMAGE NEEDED */}` za frontmatter (MDX syntaxe — HTML komentáře nefungují).

### 4b. Rewrite pass — hlas autora

Viz `docs/guides/tone-of-voice.md → Rewrite pass — hlas autora`.

### 4c. Validační průchod — role kritika

Viz `docs/guides/tone-of-voice.md → Validační průchod — role kritika`.

### 5. Validace

Spusť `/review` — lint + build.

Ověř manuálně podle kontrolního seznamu z `docs/guides/tone-of-voice.md`:
- [ ] Frontmatter kompletní
- [ ] Jednotky převedeny (°F → °C, libry → kg)
- [ ] ≥3 interní odkazy ze `content-index.json`
- [ ] Žádná zakázaná fráze ze seznamu v tone-of-voice.md
- [ ] Žádná raw affiliate URL (pouze `/go/[slug]`)

**Jazyková kontrola** (specifická rizika při překladu z angličtiny):
- [ ] Shody rodu přívlastku: "z českého řeznictví", ne "z české řeznictví"
- [ ] "abych", ne "aby jsem"
- [ ] Cizí přívlastek za podstatným jménem: "štěpky hickory", ne "hickory štěpky"
- [ ] Skloňování značek: "na Weberu", ne "na Weber Kettle"
- [ ] Anglicismy nahrazeny kde existuje český ekvivalent
- [ ] Neskloňovatelné termíny (Texas crutch, reverse sear) ponechány v originále, vysvětleny česky

**Gramatika (validační průchod):**
- [ ] Žádné "na teplotě" — vždy "při teplotě"
- [ ] Instrumentál po "být": "je otázkou", "je součástí", "je kombinací"
- [ ] Žádné "ustálil jsem se" — přirozenější alternativa ("skončil jsem u")
- [ ] Všechna čísla v perexu a description mají jednotku ve stejné větě
- [ ] Každá buňka tabulky obsahuje konkrétní hodnotu nebo popis (ne "srovnatelné" apod.)

### 6. Označ video jako zpracované

Po commitu článku označ video v pipeline:

```bash
curl -s -X PATCH \
  -H "X-Api-Key: $PIPELINE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"video": {"queued_for_blog": true}}' \
  "$PIPELINE_BASE_URL/api/v1/videos/{video_id}"
```

### 7. Commit a PR

```bash
git add content/posts/[slug]/
git commit
git push -u origin content/[slug]
gh pr create --title "[slug]: název článku" --body "Draft z pipeline přepisu — ke kontrole před publikací."
```

Opakuj kroky 3–7 pro každé nové video.
