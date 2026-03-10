# griluju.cz

Obsahový web o grilování pro český trh. Monetizace přes AdSense a affiliate programy.

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

| Soubor | Obsah |
|---|---|
| [`docs/architecture.md`](docs/architecture.md) | Tech stack, struktura projektu, klíčová rozhodnutí |
| [`docs/components.md`](docs/components.md) | Inventář komponent, props, použití |
| [`docs/design.md`](docs/design.md) | Design systém, barvy, typografie |
| [`docs/plan.md`](docs/plan.md) | Implementační plán, fáze projektu |
| [`docs/setup-checklist.md`](docs/setup-checklist.md) | Manuální kroky před spuštěním (Cloudflare, GA4, Cookieyes…) |
| [`CLAUDE.md`](CLAUDE.md) | Instrukce pro AI agenta |

## Klíčové konvence

- Obsah v `/content/posts/[slug]/index.mdx`
- Affiliate přesměrování přes `/go/[slug]` — nikdy přímé URL
- Interní linky hledat v `content-index.json`
- Czech root path bez `/cs/` prefixu — route group `app/(cs)/`
- Obrázky: WebP only, max 150 kB, vždy `width` + `height`

## Struktura URL

| Kategorie | URL |
|---|---|
| Homepage | `/` |
| Recept | `/pulled-pork-krok-za-krokem` |
| Kategorie recepty | `/kategorie/recepty` |
| Affiliate redirect | `/go/weber-master-touch` |
| Autor | `/o-mne` |
