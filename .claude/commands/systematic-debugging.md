Hloubkové debugování — najdi root cause před tím, než cokoliv opravíš.

Spouštěj když: oprava nefunguje napoprvé, nebo chyba není jasně pochopená.

## Fáze 1 — Root cause investigation

Nespěchej na opravu. Nejdřív pochop problém.

```bash
# Co se nedávno změnilo?
git log -10 --oneline

# Reprodukuj chybu deterministicky
npm run build 2>&1 | tail -50
npm run lint 2>&1
```

Přečti chybovou hlášku **celou** — nespoléhej na první řádek. Stack trace ukazuje kde problém leží.

Pro vícevrstvé chyby (Next.js build → MDX kompilace → komponenta) vytipuj kde přesně selhává:
- Selžuje build nebo lint?
- Je chyba v TypeScript typech, nebo v runtime logice?
- Týká se konkrétního souboru, nebo celého buildu?

## Fáze 2 — Pattern analysis

Najdi fungující příklad podobné věci v kódu:

```bash
# Najdi fungující obdobu v komponentách
grep -rn '<klíčový_pattern>' src/ --include="*.tsx" --include="*.ts" | head -20

# Najdi podobné MDX frontmatter
grep -rn '<klíčový_pattern>' content/ --include="*.mdx" | head -20
```

Porovnej fungující příklad s nefungujícím. Identifikuj konkrétní rozdíl.

## Fáze 3 — Hypotéza a ověření

Formuluj jednu konkrétní hypotézu: _"Problém je v X, protože Y."_

Udělej **jednu** minimální změnu. Neopravuj víc věcí naráz — pak nevíš co pomohlo.

Spusť `npm run build` nebo `npm run lint` a zkontroluj výsledek.

## Fáze 4 — Stop pravidlo

**Pokud 3 nebo více pokusů o opravu selhalo → STOP.**

Nepokračuj ve flickování symptomů. Místo toho:
1. Přehodnoť základní předpoklady — je problém tam kde si myslíš?
2. Zkontroluj, zda problém není v závislosti nebo konfiguraci (next.config.ts, content-collections.ts)
3. Zkontroluj, zda architektura dává smysl — static export má omezení
4. Přečti relevantní dokumentaci v `docs/` nebo kód obdobné funkcionality od začátku

Toto pravidlo existuje protože po 3 neúspěšných pokusech je velmi pravděpodobné, že řešíš špatný problém nebo na špatném místě.
