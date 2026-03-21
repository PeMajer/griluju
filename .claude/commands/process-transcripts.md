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

**5 pravidel která nesmíš porušit:**
1. Intro = max 3 věty, žádný filler, rovnou k věci nebo ke konkrétní chybě — žádné "V tomto článku"
2. Vždy konkrétní číslo — nikdy "trochu", "chvíli", "dostatek"; °C, minuty, gramy, lžíce
3. Alespoň 1 věta z první osoby s konkrétní volbou nebo chybou — ne "mám rád", ale "zjistil jsem na prvním Wagyu: vytáhl jsem ho při 50 °C, byl medium well"
4. Závěr = 2–3 čísla nebo pravidla, žádná filler věta
5. Přepis je anglicky — adaptuj pro českého čtenáře, nepřekládej doslova; převeď °F → °C, libry → kg, unce → g

**Příklady — hlas autora:**

Intro — špatně (AI tón):
> Studené uzení je technika, která přináší intenzivní kouřovou chuť. V tomto článku vám ukážeme postup krok za krokem.

Intro — správně (Petrův hlas):
> Reverse sear jsem dělal roky. Kouřová chuť vždy slabá, kůrka průměrná — maso strávilo v kouři 20 minut, ne 90. Studené uzení to mění: nejdřív hodina a půl kouře při 30 °C, pak prudké opečení na litině.

Osobní zkušenost — špatně (abstraktní):
> Tučné steaky reagují na teplo jinak než libové. Sundejte je dříve než obvykle.

Osobní zkušenost — správně (konkrétní chyba + číslo):
> Tučné steaky se přepálí dřív, než čekáte. Zjistil jsem to na prvním Wagyu Denver: vytáhl jsem ho při 50 °C jako libový filet, po odpočinku byl medium well. Od té doby sundávám silně mramorované kusy při 47–48 °C.

**Jazykové kontroly při psaní:**
- Anglicismy nahradit kde existuje český ekvivalent — "sear" → "opečení", ale "reverse sear" a "Texas crutch" ponechat jako termíny
- "per side" → "z každé strany", ne "na stranu"
- "carryover cooking" → "teplota v mase po sundání stoupne / dojde výš" — nikdy "carryover" samotně
- Lžíce a lžičky vždy s gramáží nebo objemem: "1 polévková lžíce (15 ml)", "1 čajová lžička (5 g)"
- Cizí přívlastek za podstatným jménem: "štěpky hickory", ne "hickory štěpky"
- Shody rodu: "v litinové pánvi" (ženský rod), ne "v litinovém pánvi"
- "abych", ne "aby jsem"
- Skloňovat značky: "na Weberu", ne "na Weber Kettle"

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

Pokud článek vyžaduje hero image → přidej `{/* HERO IMAGE NEEDED */}` za frontmatter (MDX syntaxe — HTML komentáře nefungují).

### 4b. Rewrite pass — hlas autora

Po napsání draftu proveď rewrite se zaměřením pouze na tón:

- Přečti intro — zní jako člověk nebo jako AI shrnutí? Pokud AI, přepiš.
- Najdi věty začínající "Je důležité", "V tomto článku", "Doufám", "Grilovani je" — smaž nebo přepiš.
- Je v článku alespoň jedna věta kde Petr říká co konkrétně dělá a proč, nebo jakou chybu udělal?
- Závěr: jsou tam 2–3 konkrétní čísla nebo pravidla, nebo filler?
- Prohledej celý text na samostatné anglicismy (sear, upgrade, relace) — nahradit; technické termíny (reverse sear, Texas crutch, brisket) nechat.

**Hlas autora — konkrétní vzory k opravě:**

Intro:
- Zní první věta jako AI shrnutí tématu? ("X je technika která...") → přepsat na konkrétní situaci nebo chybu
- Je v intro číslo? Pokud ne, pravděpodobně chybí konkrétnost

Osobní zkušenost:
- Hledej věty se "jsem" — zní každá přirozeně jak by ji řekl člověk přes plot?
- Chybí alespoň jedna věta kde Petr říká co konkrétně dělá a proč, nebo jakou chybu udělal?

Perex (description / první odstavec pod nadpisem):
- Obsahuje perex všechna čísla s jednotkami? Číslo bez jednotky v perexu je vždy chyba.

### 4c. Validační průchod — role kritika

Po rewrite passu přepni roli: jsi editor který hledá chyby, ne autor. Nepřepisuješ celý článek — pouze opravuješ konkrétní problémy.

**1. Tabulky**
Projdi každou buňku. Zakázaná vágní slova: `srovnatelné`, `podobné`, `průměrné`, `standardní`, `běžné`, `dostačující`, `odpovídající`, `přiměřené`, `obvyklé`
Pokud takové slovo najdeš → nahraď ho konkrétním popisem nebo číslem. Pokud buňku nelze vyplnit konkrétně → přeformuluj celý řádek nebo ho smaž.

**2. Čísla bez kontextu**
Každé číslo musí mít jednotku nebo vysvětlení ve stejné větě.
- Špatně: "Skončil jsem u 90" → Správně: "Skončil jsem u 90 minut"
- Špatně: "dává 90" → Správně: "dává steaku 90 minut kouře"
- Špatně: "při 205" → Správně: "při 205 °C"

**3. Předložky u teplot a časů**
Zakázané: "na teplotě", "na X °C" → Správně: "při teplotě", "při X °C"

**4. První osoba — přirozenost**
- "ustálil jsem se na" → nahraď: "skončil jsem u"
- "rozhodl jsem se pro" → nahraď: "dělám" / "volím"
- "dospěl jsem k závěru" → nahraď přímým tvrzením
- "osobně považuji" → smaž "osobně", větu zkrať
- věty začínající "Je třeba poznamenat" → celou frázi smaž, větu přepiš

**5. Instrumentál po "být"**
- Špatně: "rozdíl je otázka času" → Správně: "rozdíl je otázkou času"
- Špatně: "výsledek je kombinace X a Y" → Správně: "výsledek je kombinací X a Y"

**6. Závěr / Shrnutí**
Zakázané: věta bez čísla nebo konkrétního pravidla, "Doufám, že...", "Zkuste to a uvidíte", "Grilovani je...", "Závěrem lze říci"
Pokud takovou větu najdeš → smaž nebo nahraď konkrétním pravidlem.

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
