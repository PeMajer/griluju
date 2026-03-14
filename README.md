# griluju.cz

Obsahový web o grilování pro český trh.

**Tech:** Next.js 16 · TypeScript · Tailwind CSS v4 · MDX · Cloudflare Pages

---

## Rychlý start

```bash
npm install
npm run dev        # dev server na http://localhost:3000
npm run build      # produkční build do out/
npm run lint       # lint check
```

Po buildu (nebo ručně):
```bash
node scripts/generate-content-index.mjs   # regeneruje content-index.json
node scripts/generate-sitemap.mjs         # generuje sitemap.xml do out/
```

## Dokumentace

Kompletní dokumentace je v [`docs/`](docs/README.md).

| Soubor | Obsah |
|---|---|
| [Architektura](docs/architecture.md) | Tech stack, struktura projektu, klíčová rozhodnutí |
| [Komponenty](docs/components.md) | Inventář komponent, props, použití |
| [Design systém](docs/design.md) | Barvy, typografie, best practices |
| [Implementační plán](docs/guides/plan.md) | Fáze projektu, SEO, content pipeline |
| [Setup checklist](docs/guides/setup-checklist.md) | Cloudflare Pages, GA4, cookie banner… |
| [CLAUDE.md](CLAUDE.md) | Instrukce pro AI agenta |

## Klíčové konvence

- Obsah v `/content/posts/[slug]/index.mdx`
- Interní linky hledat v `content-index.json`
- Czech root path bez `/cs/` prefixu — route group `app/(cs)/`
- Obrázky: WebP only, max 150 kB, vždy `width` + `height`

## Struktura URL

| Stránka | URL |
|---|---|
| Homepage | `/` |
| Článek | `/pulled-pork-krok-za-krokem` |
| Kategorie | `/kategorie/recepty` |
| Autor | `/o-mne` |
