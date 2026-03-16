# Lessons Learned

Patterns from past corrections. Review at session start when relevant.

---

## Workflow

- **GitHub Actions PR permissions**: `gh pr create` v Actions selže pokud není povoleno "Allow GitHub Actions to create and approve pull requests" v nastavení repozitáře. Řešení: commitovat přímo do main, nebo explicitně zapnout v Settings → Actions → General.

## Performance / Lighthouse

- **Lighthouse nelze spustit lokálně v CI prostředí:** arm64 prostředí nemá Chrome. Místo lokálního měření použij GitHub Actions workflow `.github/workflows/lighthouse.yml` — spustí se automaticky na každém PR.
- **Preload hero image při `unoptimized: true`:** Next.js nepřidá `<link rel="preload">` automaticky. Je nutné ho vložit ručně do JSX stránky — React 19 ho hoistuje do `<head>`.
- **CI Lighthouse měření mají vysokou varianci:** stejný kód dává ±15 bodů mezi runy podle vytížení CI runneru. Nespoléhej na CI čísla pro ladění drobných změn — finální pravdu říká PageSpeed Insights po deployi.
- **vanilla-cookieconsent nelze lazily loadovat přes next/dynamic ani dynamic import():** `next/dynamic { ssr: false }` způsobí blokující CSS stylesheet přes Turbopack; `import()` uvnitř useEffect změní jak Turbopack generuje chunky a TBT se zhorší. Statický import je nejlepší varianta.
- **TBT 400–500ms mobile je architekturální limit Next.js/React:** React runtime + hydratace na 4× throttled CPU potřebuje ~400ms. Nelze snížit bez změny frameworku. Na produkci (reálný telefon, bez throttlingu) odpovídá ~100ms.

## Skripty / Shell

- **`date -j` je macOS only**: Na Linuxu použij `date -d`. Nejlepší cross-platform řešení pro date arithmetic je `exiftool` samotný (`-DateTimeOriginal-=0:0:5 0:0:0`).
- **exiftool date shift formát**: `Y:M:D H:MM:SS` — `3:0:0 0:0:0` = 3 roky, `0:0:3 0:0:0` = 3 dny. Záměna způsobí posun o roky místo dní.
