# Conventions — griluju.cz

## Tailwind v4 — gotchas

### `text-*` nenastavuje `line-height`

Ve v4 `text-lg` nastavuje **pouze font-size**. Vždy přidat explicitní `leading-*`:

```tsx
// ❌ Špatně
<p className="text-lg">

// ✅ Správně
<p className="text-lg leading-relaxed">
```

Referenční páry: `text-sm leading-5`, `text-base leading-6`, `text-lg leading-relaxed`, `text-xl leading-7`, `text-2xl leading-8`, `text-3xl leading-tight`.

### `container` třída nefunguje

Tailwind v4 bez config souboru nemá nakonfigurovaný `container`. Místo toho:

```tsx
<div className="mx-auto max-w-[75rem] px-6">
```

### Custom `max-w-*` tokeny nefungují

Nepoužívat `--width-*` tokeny pro max-width. Vždy arbitrary value:

```tsx
max-w-[75rem]   // 1200px — hlavní šířka stránky
max-w-5xl       // 1024px — úzké sekce
```

### Padding na úzkých sekcích

```tsx
// ❌ Špatně — px-6 ubírá z max-width
<div className="mx-auto max-w-5xl px-6">

// ✅ Správně — px-6 na rodiči, max-width na vnitřním divu
<section className="px-6">
  <div className="mx-auto max-w-5xl">
```

Výjimka: `max-w-[75rem] px-6` na stejném elementu je OK (odpovídá vzoru).

## Barevné tokeny

Nikdy raw hex — vždy CSS token z `globals.css`:

```tsx
style={{ color: "var(--coal)" }}          // primární text
style={{ color: "var(--stone)" }}         // sekundární text, perex
style={{ backgroundColor: "var(--heat)" }} // CTA, akcenty
style={{ color: "var(--dark-fg)" }}       // text v dark sekcích
```

`--dark-*` tokeny jsou pro tmavé sekce (Footer, Hero) — **není to dark mode**.

## TypeScript

- Interface pro každý props objekt, žádné `any`
- Server Component jako default — `"use client"` pouze pro browser API (events, hooks)
- `next/image` vždy s `width` + `height`; hero image s `priority` propem

## MDX a obsah

- Překlady přes `t(locale, 'klic')` z `src/lib/i18n.ts` — nikdy hardcode česky
- Interní linky ze `content-index.json` — přečíst před psaním článku
- Affiliate produkty: vždy `/go/[slug]`, nikdy raw URL; nový produkt → přidat do `affiliates.config.ts`
- UI texty a články v **češtině**, code comments v angličtině
- H1 vždy z frontmatteru — nikdy v body článku

## Obrázky

- Formát: WebP, `width` + `height` vždy povinné
- Hero image: `priority` prop (LCP optimalizace)
- `images: { unoptimized: true }` — optimalizaci dělat ručně před commitem
- Lighthouse mobile 90+ před publikací

## Komponenty

- Umístění: `article/`, `layout/`, `schema/`, `seo/`, `ui/` v `src/components/`
- Nepřidávat novou komponentu pokud lze rozšířit existující volitelným propem
- Viz `docs/components.md` pro úplný inventář
