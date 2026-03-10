# Design systém — griluju.cz

Tailwind CSS v4 bez `tailwind.config.ts`. Veškerá konfigurace je v `src/app/globals.css`.

---

## Barvy

### Primární paleta

| Token | Hex | Použití |
|---|---|---|
| `orange-600` | `#ea580c` | CTA, aktivní nav link, linky v textu, akcenty |
| `orange-700` | `#c2410c` | Hover stav orange-600 elementů |
| `orange-50` | `#fff7ed` | Jemné pozadí (affiliate disclosure banner) |
| `amber-500` | `#f59e0b` | Affiliate disclosure ikona |

### Neutrální paleta

| Token | Hex | Použití |
|---|---|---|
| `#ffffff` | bílá | Pozadí stránek, header |
| `#171717` | skoro černá | Výchozí barva textu (CSS var `--foreground`) |
| `#111827` | `gray-900` | Nadpisy (H2, H3, strong) |
| `#374151` | `gray-700` | Odstavcový text, položky seznamů |
| `#4b5563` | `gray-600` | Sekundární text (blockquote, metadata) |
| `#6b7280` | `gray-500` | Placeholder text, ikony |
| `#e5e7eb` | `gray-200` | Bordery (header border, table borders) |
| `#f9fafb` | `gray-50` | Jemná pozadí (footer, table header) |

### CSS custom properties (globals.css)

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

---

## Typografie

Projekt nepoužívá vlastní web font — záměrná volba pro výkon (nulový font loading overhead).

**Font stack:** `Arial, Helvetica, sans-serif`

### Stupnice nadpisů (prose)

| Element | Velikost | Tloušťka | Barva |
|---|---|---|---|
| H1 (article title) | Tailwind `text-3xl` / `text-4xl` | `font-bold` (700) | `gray-900` |
| H2 | `1.5rem` (24px) | 700 | `#111827` |
| H3 | `1.25rem` (20px) | 600 | `#111827` |

### Typografické konvence

- **Line height:** 1.75 pro odstavcový text (čitelnost na webu)
- **Odstavce:** barva `#374151`, ne černá — jemnější kontrast
- **Linky:** orange-600, hover orange-700, bez underline v hoveru
- **Blockquote:** levý border orange-600, italic, barva `#4b5563`

---

## Spacing a layout

**Max šířka obsahu:** `max-w-5xl` (80rem = 1280px) centrovaná

**Padding:** `px-4` na mobile, `sm:px-6` od 640px

**Mřížka článků (homepage):** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

## Komponenty designu

### Karta článku

```
┌─────────────────────────┐
│  [Hero image 16:9]      │
├─────────────────────────┤
│  RECEPTY · 15. 3. 2026  │  ← kategorie uppercase, šedý text
│                         │
│  Titulek článku         │  ← hover: orange-600
│  popis perex...         │  ← 2-line clamp, gray-600
│                         │
│  Číst dál →             │  ← orange-600 link
└─────────────────────────┘
```

### Affiliate disclosure banner

```
┌─────────────────────────────────────────────────┐
│  ⚠  Tento článek obsahuje affiliate odkazy...   │  ← amber/orange banner
└─────────────────────────────────────────────────┘
```

Zobrazuje se pouze pokud frontmatter obsahuje `affiliate: true`.

### Navigation active state

Aktivní link dostane `text-orange-600` barvu. Ostatní linky jsou `text-gray-700` s hover `text-orange-600`.

---

## Obrázky

| Typ | Formát | Max velikost | Rozměry |
|---|---|---|---|
| Hero článku | WebP | 150 kB | Doporučeno 1200×675 (16:9) |
| Produktová fotka | WebP | 100 kB | Doporučeno 800×800 (1:1) |
| Avatar autora | — | — | Iniciály "TM" (CSS, bez obrázku) |

**Pravidla:**
- Vždy WebP, nikdy JPEG/PNG v produkci
- Vždy `width` a `height` na `<Image>` komponentě (CLS prevence)
- Hero obrázky s `priority` propem (LCP optimalizace)
- Ukládat do `/public/images/[slug]/`
- Komprimovat přes [squoosh.app](https://squoosh.app) nebo `cwebp`

---

## Prose styly (článkový text)

Prose třída `.prose` je definována manuálně v `globals.css` (bez `@tailwindcss/typography`). Aplikuje se na wrapper div kolem MDX obsahu.

```tsx
<div className="prose">
  <MDXContent />
</div>
```

Klíčové prose styly:

```css
.prose h2    { font-size: 1.5rem; font-weight: 700; color: #111827; }
.prose h3    { font-size: 1.25rem; font-weight: 600; color: #111827; }
.prose p     { line-height: 1.75; color: #374151; }
.prose a     { color: #ea580c; }
.prose a:hover { color: #c2410c; }
.prose blockquote { border-left: 4px solid #ea580c; }
.prose table th { background: #f9fafb; }
.prose img   { border-radius: 0.5rem; }
```

---

## Best practices

### Výkon (Lighthouse 90+ mobile)

- Hero image `priority` prop — zajistí preload pro LCP
- Vždy `width` + `height` na `<Image>` — eliminuje CLS
- WebP max 150 kB — rychlé načtení na mobilu
- Žádné custom web fonty — nulový font blocking time
- `next/script afterInteractive` pro GA4 — neblokuje render

### Přístupnost

- Sémantické HTML: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`
- H1 vždy jen jeden na stránku (z frontmatter `title`, ne v MDX body)
- Alt text na všech obrázcích
- Kontrast: orange-600 na bílém pozadí splňuje WCAG AA pro velký text

### Konzistence

- Nové UI prvky vždy v orange-600 / gray-900 paletě
- Zakulacené rohy: `rounded-lg` (0.5rem) pro karty a obrázky
- Hover efekty: plynulý přechod `transition-colors`
- Spacing: multiples of 4 (Tailwind default) — nepoužívat custom px hodnoty

---

## Budoucí design rozhodnutí (neimplementováno)

| Funkce | Poznámka |
|---|---|
| Dark mode | Připravit CSS vars pro dark variantu, implementovat při > 50 článcích |
| Custom web font | Zvážit až bude jasný brand — přidat `font-display: swap` |
| Design tokeny | Při přidání DE lokalizace zvážit přesun do `tailwind.config.ts` |
