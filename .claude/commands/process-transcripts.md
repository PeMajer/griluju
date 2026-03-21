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

> **Whisper přepisy** (`source_type: "whisper"`) mohou obsahovat přepisové chyby — ověř číselné hodnoty (teploty, časy) a vlastní jména.

### 4. Vygeneruj článek

Pro každý přepis vytvoř article branch a soubor:

```bash
git checkout main && git pull origin main && git checkout -b content/[slug]
```

**Před psaním přečti celý `docs/guides/tone-of-voice.md`** — obsahuje pravidla tónu, struktury i jazykové kontroly. Klíčové body:

- Přepis je anglicky — adaptuj pro českého čtenáře, nepřekládej doslova
- Převeď americké jednotky: °F → °C, libry → kg, unce → g
- Žádné vágní množství — vždy konkrétní čísla (°C, minuty, gramy)
- Krátké věty, aktivum, konkrétní podmět
- Intro max 3 věty, rovnou k věci
- Alespoň 1 odstavec z první osoby s konkrétním detailem nebo chybou
- 3–5 interních odkazů — použij slugy z `content-index.json`
- Závěr = 2–3 klíčová čísla nebo pravidla, žádný filler

**Frontmatter:**
```mdx
---
title: "..."
description: "..."        # 140–160 znaků
date: "YYYY-MM-DD"
category: "recepty" | "navod" | "recenze"
slug: "url-slug-bez-diakritiky"
image: "/images/[slug]/hero.webp"
imageWidth: 1200
imageHeight: 800
author: "Petr Majer"
tags: []
affiliate: false
---
```

Pokud článek vyžaduje hero image → přidej placeholder komentář `<!-- HERO IMAGE NEEDED -->` za frontmatter.

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
