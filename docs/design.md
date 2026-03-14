# Design systém — griluju.cz

Referenční dokument pro stylování komponent a stránek. Vzorový projekt: `griluju-orange-flame` (React/Vite + Tailwind v3). Produkční projekt: Next.js 16 + **Tailwind v4**.

---

## Fonty

| Role | Font | Variable | Třídy |
|---|---|---|---|
| Nadpisy (display) | Playfair Display | `--font-display` | `font-display` nebo inline `fontFamily: "var(--font-display)"` |
| Tělo | DM Sans | `--font-body` | `font-body` (výchozí na body) |
| Mono | DM Mono | `--font-mono` | `font-mono` |

**Nastavení v `layout.tsx`:**
```tsx
const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-var",
  axes: ["opsz"],   // ← povinné, optická osa pro správné vykreslení
  display: "swap",
});
// body: antialiased (povinné pro DM Sans)
```

**Globální pravidlo v `globals.css`:**
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}
```
Toto zajistí Playfair Display na všech nadpisech bez inline stylů. Inline `style={{ fontFamily: "var(--font-display)" }}` pak slouží jen jako fallback/explicitní override tam kde je potřeba.

---

## Barvy — CSS tokeny

Definovány v `globals.css` v `:root`. Nikdy nepoužívej raw hex, vždy token.

| Token | Hodnota | Použití |
|---|---|---|
| `--heat` | `hsl(16,82%,50%)` | CTA, aktivní nav, badge, akcenty |
| `--heat-dk` | tmavší heat | Hover stav |
| `--heat-lt` | světlejší heat | Hover fill na pill tagech |
| `--coal` | tmavě hnědočerná | Primární text, nadpisy |
| `--stone` | středně šedohnědá | Sekundární text, perex, meta |
| `--smoke` | světlý border | Jemné bordery |
| `--bg` | teplá bílá | Pozadí stránek |
| `--bg-warm` | o stupeň teplejší | Pill filtry inactive, jemná pozadí |
| `--bg-card` | bílá/krémová | Pozadí karet |
| `--dark` | tmavě hnědočerná | Dark sekce (Footer, Newsletter, MeatTemp) |
| `--dark-fg` | světlá | Text v dark sekcích |
| `--dark-fg-muted` | ztlumená světlá | Sekundární text v dark sekcích |
| `--dark-border` | jemný border | Bordery v dark sekcích |

> **Pozor:** `--dark-*` tokeny NEJSOU dark mode — jsou to barvy pro tmavé sekce (Footer, Hero, tabulka teplot). Dark mode je odstraněn.

---

## Tailwind v4 — kritické rozdíly oproti v3

### 1. `text-*` utility nenastavuje `line-height`

V Tailwind v3 každá `text-*` třída bundlovala `line-height`. Ve v4 nastavuje **pouze `font-size`**.

**Důsledek:** Pokud nepřidáš `leading-*`, element zdědí `line-height` z rodiče (browser default ~1.2), což je výrazně menší než ve vzoru.

**Pravidlo: vždy přidej explicitní `leading-*` k `text-*`.**

Referenční hodnoty (odpovídají Tailwind v3 defaults):

| Třída | font-size | Správný `leading-` | line-height px |
|---|---|---|---|
| `text-xs` | 12px | `leading-4` | 16px |
| `text-sm` | 14px | `leading-5` | 20px |
| `text-base` | 16px | `leading-6` | 24px |
| `text-lg` | 18px | `leading-relaxed` | ~29px |
| `text-xl` | 20px | `leading-7` | 28px |
| `text-2xl` | 24px | `leading-8` nebo `leading-snug` | 32px / ~33px |
| `text-3xl` | 30px | `leading-tight` | ~37px |
| `text-4xl` | 36px | `leading-tight` | 45px |
| `text-5xl+` | 48px+ | `leading-[1.1]` | ratio |

### 2. Custom theme tokeny pro `max-w-*` nefungují spolehlivě

Pokus o `--width-container: 75rem` v `@theme inline` nevygeneroval `max-w-container` utility správně → layout byl full-width.

**Pravidlo: vždy použij `max-w-[75rem]` (arbitrary value), ne custom token.**

### 3. `container` třída není nakonfigurována

Vzor (orange-flame) používá `container` s `padding: 1.5rem` v `tailwind.config`. V Tailwind v4 bez config souboru toto nefunguje. Místo toho explicitně `mx-auto max-w-[75rem] px-6`.

---

## Šířky kontejnerů — pravidlo pro padding

**Klíčový problém:** Pokud máš `max-w-5xl px-6` na jednom elementu, padding odebírá z max-width. Vzor (orange-flame) má padding na vnějším `container`, takže `max-w-5xl` dá plných 1024px obsahu.

**Vzor pro úzké sekce (max-w-5xl, max-w-2xl, max-w-xl...):**
```tsx
// ❌ Špatně — obsah = 1024px - 48px = 976px
<section className="py-24">
  <div className="mx-auto max-w-5xl px-6">

// ✅ Správně — obsah = 1024px
<section className="py-24 px-6">
  <div className="mx-auto max-w-5xl">
```

**Pro hlavní šířku stránky (max-w-[75rem]) je `px-6` na stejném elementu OK** — obě verze dají 1152px a odpovídají orange-flame `container` (1200px - 48px padding).

### Přehled šířek sekcí

| Sekce | Max-width | Obsah (px) |
|---|---|---|
| Header, Hero, Články, Footer | `max-w-[75rem]` + `px-6` | 1152px |
| Teploty masa (dark) | `px-6` na section + `max-w-5xl` na div | 1024px |
| O mně | `px-6` na section + `max-w-2xl` na div | 672px |
| Newsletter CTA | `max-w-lg` + `px-6` | ~464px |
| CategoryPage | `max-w-[75rem]` + `px-6` | 1152px |

---

## Typografické konstanty — hotové třídy

### Nadpisy sekcí (H1, H2)

```tsx
// Category page H1
<h1 className="mb-3 text-4xl md:text-5xl leading-tight text-coal"
    style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>

// HP H2 (světlé sekce)
<h2 className="text-4xl md:text-5xl text-coal"
    style={{ fontFamily: "var(--font-display)" }}>
// + perex pod ním:
<p className="mt-3 text-lg leading-relaxed text-stone">

// Dark sekce H2 (MeatTemp, Newsletter...)
<h2 className="mb-4 text-3xl md:text-4xl"
    style={{ fontFamily: "var(--font-display)", color: "var(--dark-fg)", fontWeight: 700 }}>
// + perex:
<p className="text-lg leading-relaxed" style={{ color: "var(--dark-fg-muted)" }}>
```

### Hero H1

```tsx
<h1 className="mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]"
    style={{ fontFamily: "var(--font-display)", fontWeight: 900, color: "var(--dark-fg)" }}>
  Grilování,{" "}
  <em className="text-heat whitespace-nowrap">které funguje</em>
</h1>
```

> `whitespace-nowrap` na víceoslovních frázích v nadpisech — zabrání ošklivému zalomení uvnitř fráze. Celá fráze pak spadne jako celek na další řádek.

### ArticleCard

```tsx
// H3 — featured (2/3 col)
className={`font-display mt-1 mb-2 text-coal group-hover:text-heat transition-colors duration-200
  text-2xl md:text-3xl leading-tight`}
style={{ fontWeight: 700 }}

// H3 — standard (1/3 col)
className={`font-display mt-1 mb-2 text-coal group-hover:text-heat transition-colors duration-200
  text-xl leading-7`}
style={{ fontWeight: 700 }}

// Description
className={`text-stone mb-3 leading-relaxed ${featured ? "line-clamp-3" : "text-sm line-clamp-2"}`}

// Meta (datum + čas čtení)
className="flex items-center justify-between text-xs text-stone"
```

### Eyebrow / badge text

```tsx
// Eyebrow nad H1 (hero)
<span className="mb-4 inline-block font-semibold text-sm uppercase tracking-widest text-heat">

// Badge na kartě
<span className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-wider
  text-white px-2.5 py-1 rounded-full z-10"
  style={{ backgroundColor: badgeColor }}>
```

> Eyebrow nepoužívá `font-mono` — body font `font-semibold text-sm`.

### CTA tlačítka

```tsx
// Primární (heat)
className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold
  text-white bg-heat hover:bg-heat-dk transition-colors duration-150"

// Sekundární (ghost/border)
className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium
  transition-colors duration-150"
style={{ border: "1px solid rgba(245,240,235,0.35)", color: "var(--dark-fg)" }}
```

> Vždy `text-sm` na CTA — bez něj zdědí `font-size` z rodiče a je příliš velké.

---

## Komponentní vzory

### ArticleGrid layout

```
Row 1: grid grid-cols-1 lg:grid-cols-3 lg:items-stretch gap-x-8 gap-y-10 mb-14
  ├── lg:col-span-2 → <ArticleCard featured /> (posts[0])
  └── flex flex-col gap-10
        ├── <ArticleCard /> (posts[1])
        └── <ArticleCard /> (posts[2])

{posts.slice(3).length > 0 && (
  <div className="mb-14">
    <h3 className="text-2xl leading-snug text-coal" style={{ fontFamily: "var(--font-display)" }}>
      {moreHeading}
    </h3>
  </div>
)}

Row 2: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10
  └── posts.slice(3).map(post => <ArticleCard />)
```

### CategoryPage

- Žádný `bg-warm` na header sekci — světlé výchozí pozadí
- `pt-12 pb-24` na sekci
- H1 s `leading-tight`, perex s `leading-relaxed`
- Pokud `filterTags` → `<CategoryFilterGrid>` (interactive, "use client")
- Pokud ne → `<ArticleGrid hideBadge>` (badge nemá smysl na single-category stránce)

### Filter pills (CategoryFilterGrid)

```tsx
// Aktivní pill
style={{ backgroundColor: "var(--heat)", color: "white" }}

// Neaktivní pill
style={{ backgroundColor: "var(--bg-warm)", color: "var(--coal)" }}

// Mezera mezi pills a gridem
className="flex flex-wrap gap-2 mb-14"
```

---

## Badge barevná škála

### Podle typu obsahu (category)

```ts
case "recepty":  return "hsl(16,82%,50%)";   // --heat orange
case "návod":    return "hsl(165,50%,32%)";  // forest green
case "recenze":  return "hsl(215,55%,42%)";  // steel blue

```

### Podle druhu masa (tag)

```ts
case "hovězí":   return "hsl(0,65%,38%)";    // dark red
case "vepřové":  return "hsl(28,70%,40%)";   // brown-orange
case "drůbež":   return "hsl(42,75%,42%)";   // amber
case "ryby":     return "hsl(200,60%,40%)";  // teal blue
case "zelenina": return "hsl(130,45%,35%)";  // green
case "jehněčí":  return "hsl(280,40%,38%)";  // purple
```

### Stupnice propečení masa (teploty)

```ts
{ level: "Rare",        temp: "52 °C", color: "hsl(0,72%,50%)"   }
{ level: "Medium Rare", temp: "55 °C", color: "hsl(12,80%,52%)"  }
{ level: "Medium",      temp: "60 °C", color: "hsl(25,85%,50%)"  }
{ level: "Medium Well", temp: "65 °C", color: "hsl(35,75%,48%)"  }
{ level: "Well Done",   temp: "70 °C", color: "hsl(30,15%,55%)"  }
```

---

## Checklist při stylování nové stránky/komponenty

- [ ] Každá `text-*` třída má explicitní `leading-*` (Tailwind v4 nenastavuje lh automaticky)
- [ ] Úzké sekce (`max-w-5xl` a užší): `px-6` na `<section>`, ne na vnitřním divu
- [ ] CTA tlačítka: `text-sm` + `font-semibold` (primární) nebo `font-medium` (sekundární)
- [ ] Eyebrow text: `font-semibold text-sm`, ne `font-mono text-xs`
- [ ] Víceoslovní fráze v nadpisech (H1 hero): `whitespace-nowrap` na `<em>` nebo `<span>`
- [ ] Dark sekce: používají `--dark-*` tokeny, ne dark mode
- [ ] Badge: `hideBadge` prop na single-category stránkách (Navody, Recenze)
- [ ] Perex pod H2/H1: vždy `text-lg leading-relaxed`
- [ ] ArticleCard H3 featured: `leading-tight`, standard: `leading-7`

---

## Co nepoužívat

| Zakázáno | Důvod | Místo toho |
|---|---|---|
| `max-w-container` custom token | Tailwind v4 ho negeneruje správně | `max-w-[75rem]` |
| `font-mono` na eyebrow | Neodpovídá vzoru | `font-semibold text-sm` |
| `[data-theme="dark"]` CSS | Dark mode odstraněn | — |
| `<ThemeToggle />` | Odstraněno | — |
| `font-weight: 700` inline na H3 kartách bez `font-bold` třídy | Nekonzistentní | Přidat `font-bold` nebo použít jen inline |
| `leading-normal` na featured H3 | v4 = 45px, vzor má ~37px | `leading-tight` |
