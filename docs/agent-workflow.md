# Agent Workflow — griluju.cz

Pravidla chování AI agenta při práci na projektu.

---

## Před každým úkolem

1. Přečíst relevantní existující soubory — nikdy nepsat naslepo.
2. Zkontrolovat, jestli existující pattern v kódu (komponenta, config, struktura článku) — a přesně ho sledovat.
3. Pro content tasky: projít `/content/posts/` jako referenci tónu a struktury.
4. Pro code tasky: po editaci spustit `npm run lint` a opravit všechny chyby.

---

## Rozhodování — kdy pokračovat vs. zeptat se

✅ **Pokračuj bez ptaní:**
- Task je jasně ohraničený a správný přístup je zřejmý z existujícího kódu.
- Změna je reverzibilní (obsah, styling, config hodnoty).
- Instrukce odpovídá etablovanému patternu v projektu.

⚠️ **Zastav a zeptej se:**
- Task vyžaduje smazání nebo zásadní restrukturalizaci existujících souborů.
- Existují 2+ validní architektonické přístupy s reálnými trade-offs.
- Instrukce je v rozporu s CLAUDE.md.
- Chybí závislost nebo API klíč.

---

## Scope úkolu

- Velké úkoly rozlom na commity — jeden logický celek na commit.
- Pokud task zasahuje více než 5 souborů → feature branch + PR.
- Code task: read → edit → lint → build check → commit.
- Content task: viz [guides/article-workflow.md](guides/article-workflow.md).

---

## Elegance check

Pro netriviální code změny (nová komponenta, refactor, architektonické rozhodnutí) se zastavit a ověřit:
- "Existuje jednodušší způsob jak dosáhnout stejného výsledku?"
- "Kopíruje to existující pattern, nebo zavádím nový zbytečně?"

Pro jednoduché opravy přeskočit — nepřekomplikovávat.

---

## Subagent strategie

Agent (subagent_type: Explore/Plan, model: sonnet) použít pro:
- **Research & exploration** — hledání souborů, pochopení patternů, čtení více souborů paralelně
- **Paralelní nezávislé tasky** — např. kontrola dvou různých částí projektu současně

Nepoužívat pro: jednoduché čtení souborů, editaci jednoho souboru, tasky které potřebují hlavní kontext.

---

## Checklist před dokončením

- [ ] `npm run lint` — bez chyb
- [ ] `npm run build` — prochází
- [ ] Nové MDX články mají ≥3 interní odkazy a validní frontmatter
- [ ] Affiliate links používají `/go/` prefix, nikdy raw URL
- [ ] Obrázky v MDX existují v `/public/images/[slug]/`
- [ ] Žádný hardcoded český text mimo `src/lib/i18n.ts`
- [ ] Git: feature branch vytvořena, změny commitnuty, PR otevřeno

---

## Průzkum projektu

| Hledám | Kde začít |
|---|---|
| Routing a layout patterny | `src/app/` |
| UI komponenty (co existuje) | `src/components/` |
| Referenci struktury článku | `content/posts/` |
| Affiliate produkty | `affiliates.config.ts` |
| Sdílené utility a helpers | `src/lib/` |
| Interní linky pro článek | `content-index.json` |

---

## Workflow při tvoření článku

1. Přečíst `content-index.json` — přehled existujících článků pro interní linky.
2. Vytvořit `content/posts/[slug]/index.mdx` s kompletním frontmatterem.
3. Napsat intro (2–3 věty, bez filleru), H2 sekce s plynulým textem.
4. Přidat 3–5 interních odkazů s popisnými anchory (ze `content-index.json`).
5. Affiliate produkty jen přes `/go/` (updatovat `affiliates.config.ts` pro nový produkt).
6. Obrázek: `[VLASTNI FOTO AUTORA]` pro Layer-1, Unsplash reference pro Layer-2.
7. Ověřit rozsah: recepty 1 000–2 000 slov, návody 1 500–3 000 slov.
8. Commitnout na `content/[slug]` a otevřít PR.

---

## Šablona pro zadání článku (GitHub Issue)

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

---

## Error handling

- `npm run build` selže → oprav před commitem, nikdy nenechej build rozbité.
- Nejasné lint pravidlo → sleduj stávající code style ve stejném souboru.
- Chybí import → zkontroluj `package.json` před přidáním nové závislosti.

---

## Lessons Learned

Po každé korekci od uživatele přidat pattern do `docs/lessons.md` — co šlo špatně + pravidlo.

Na začátku session přečíst `docs/lessons.md` pro patterny relevantní pro aktuální task.
