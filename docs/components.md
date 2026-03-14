# Komponenty — inventář a použití

Všechny komponenty jsou v `src/components/`. Před vytvořením nové komponenty vždy zkontroluj, zda stávající nelze rozšířit.

---

## Layout komponenty

### `Header` — `src/components/layout/Header.tsx`

Hlavička webu. Logo (link na `/`) + navigace. Bílé pozadí, spodní border `gray-200`, max šířka `max-w-5xl` centrovaná.

Neakceptuje žádné props — vše čerpá ze `siteConfig`.

---

### `Footer` — `src/components/layout/Footer.tsx`

Patička webu. Linky na právní stránky + copyright s aktuálním rokem. Pozadí `gray-50`.

Neakceptuje žádné props.

---

### `Navigation` — `src/components/layout/Navigation.tsx`

**Client component** (`"use client"`). Zvýrazní aktivní link (orange-600) pomocí `usePathname`.

Navigační linky:
- Domů → `/`
- Recepty → `/kategorie/recepty`
- Návody → `/kategorie/navody`
- O mně → `/o-mne`
- Kontakt → `/kontakt`

> **Poznámka:** Stránky `/kategorie/recepty` a `/kategorie/navody` zatím neexistují.

---

## Article komponenty

### `ArticleCard` — `src/components/article/ArticleCard.tsx`

Karta článku pro výpisy (homepage, kategorie, related articles). Zobrazuje hero image, kategorii + datum, titulek s hover efektem, zkrácenou perex a odkaz "Číst dál".

```tsx
<ArticleCard post={post} />
```

| Prop | Typ | Popis |
|---|---|---|
| `post` | `Post` | Objekt článku z content-collections |

Link vede na `/{post.slug}`.

---

### `ArticleHeader` — `src/components/article/ArticleHeader.tsx`

Hlavička stránky článku. Obsahuje metadata řádek (kategorie, datum, případně datum aktualizace), H1 titulek, perex a hero image s `priority` propem (LCP optimalizace).

```tsx
<ArticleHeader post={post} />
```

| Prop | Typ | Popis |
|---|---|---|
| `post` | `Post` | Objekt článku z content-collections |

Hero image musí existovat v `/public/images/[slug]/`. Pokud `post.image` není nastaveno, image section se nevyrenderuje.

---

### `AffiliateDisclosure` — `src/components/article/AffiliateDisclosure.tsx`

Amber disclaimer banner zobrazený v horní části článku. Renderuje se pouze pokud frontmatter obsahuje `affiliate: true`.

```tsx
{post.affiliate && <AffiliateDisclosure locale={locale} />}
```

| Prop | Typ | Popis |
|---|---|---|
| `locale` | `string` | Locale pro překlad textu (`cs`) |

Text banneru je definován v `src/lib/i18n.ts` pod klíčem `article.affiliate`.

---

### `AuthorBio` — `src/components/article/AuthorBio.tsx`

Autor box zobrazený na konci každého článku. Oranžový avatar s iniciálami "TM", jméno autora s linkem na profil, bio text.

```tsx
<AuthorBio locale={locale} />
```

| Prop | Typ | Popis |
|---|---|---|
| `locale` | `string` | Locale pro překlad textu |

> **Bug:** Linkuje na `/${locale}/o-mne` (generuje `/cs/o-mne`). Správná cesta je `/o-mne`. Opravit v `AuthorBio.tsx`.

---

### `RelatedArticles` — `src/components/article/RelatedArticles.tsx`

Grid až 3 related článků pod textem článku. Vrací `null` pokud nejsou žádné related posty.

```tsx
<RelatedArticles posts={relatedPosts} locale={locale} />
```

| Prop | Typ | Popis |
|---|---|---|
| `posts` | `Post[]` | Pole related článků (max 3) |
| `locale` | `string` | Locale |

Related posty se získávají přes `getRelatedPosts(slug, 3)` z `src/lib/content.ts`. Logika: stejná kategorie NEBO překrývající se keywords.

---

### `TableOfContents` — `src/components/article/TableOfContents.tsx`

Obsah článku s anchor linky. Vrací `null` pokud je pole prázdné.

```tsx
<TableOfContents items={tocItems} />
```

| Prop | Typ | Popis |
|---|---|---|
| `items` | `TocItem[]` | Pole položek TOC |

```ts
type TocItem = {
  id: string      // HTML id sekce (#nazev-sekce)
  text: string    // Text nadpisu
  level: number   // Úroveň nadpisu (2 = H2, 3 = H3)
}
```

> **Poznámka:** TOC se aktuálně negeneruje automaticky z MDX. Musí se předat manuálně nebo implementovat parser.

---

## Schema komponenty

Všechny schema komponenty vkládají JSON-LD strukturovaná data do `<head>` přes `<script type="application/ld+json">`.

### `RecipeSchema` — `src/components/schema/RecipeSchema.tsx`

Použij na stránkách receptů (kategorie `recepty`).

```tsx
<RecipeSchema
  name="Pulled pork"
  description="..."
  image="/images/pulled-pork/hero.webp"
  author="Petr Majer"
  datePublished="2026-03-15"
  prepTime="PT30M"
  cookTime="PT10H"
  totalTime="PT10H30M"
  servings={6}
  ingredients={["2 kg vepřová plec", "..."]}
  instructions={[{ text: "Marinuj maso..." }]}
  keywords={["pulled pork", "BBQ"]}
/>
```

Časy jsou ve formátu ISO 8601 duration (`PT30M` = 30 minut, `PT2H` = 2 hodiny).

---

### `HowToSchema` — `src/components/schema/HowToSchema.tsx`

Použij na návodech a průvodcích (kategorie `navod`).

```tsx
<HowToSchema
  name="Jak roztopit gril"
  description="..."
  totalTime="PT20M"
  steps={[
    { name: "Příprava", text: "Otevři vzduchové klapky..." },
    { name: "Uhlí", text: "Nasyp uhlí do rozpalovače..." },
  ]}
/>
```

---

### `FAQSchema` — `src/components/schema/FAQSchema.tsx`

Přidej do delších článků kde je sekce Q&A. Pomáhá s rich snippets ve vyhledávání.

```tsx
<FAQSchema
  items={[
    { question: "Jak dlouho trvá pulled pork?", answer: "10–14 hodin při 110 °C." },
    { question: "Jaká teplota je hotová?", answer: "Vnitřní teplota 93–95 °C." },
  ]}
/>
```

---

### `ProductSchema` — `src/components/schema/ProductSchema.tsx`

Použij na recenzích a srovnáních produktů (kategorie `recenze`).

```tsx
<ProductSchema
  name="Weber Master-Touch GBS"
  description="..."
  image="/images/weber-master-touch/hero.webp"
  brand="Weber"
  ratingValue={4.8}
  reviewCount={127}
  price={6990}
  currency="CZK"
/>
```

---

## SEO komponenty

### `Hreflang` — `src/components/seo/Hreflang.tsx`

Renderuje `<link rel="alternate">` tagy pro jazykové varianty. Vkládá se v `app/(cs)/layout.tsx` do `<head>`.

```tsx
<Hreflang path="/pulled-pork-krok-za-krokem" />
```

Aktuálně generuje pouze `cs-CZ` a `x-default`. Rozšíří se při přidání DE lokalizace.

---

### `ConsentMode` — `src/components/seo/ConsentMode.tsx`

Inline `<script>` inicializující Google Consent Mode v2 *před* načtením GA4. Všechny typy souhlasu jsou defaultně `denied`. Vkládá se v `app/(cs)/layout.tsx` — nevyžaduje žádné props.

---

### `GA4Script` — `src/components/seo/GA4Script.tsx`

Načítá GA4 gtag.js skript s strategií `afterInteractive`. Vrací `null` pokud env proměnná `NEXT_PUBLIC_GA4_ID` není nastavena — analytics je bezpečně vypnuté v dev prostředí.

Nevyžaduje žádné props.

---

## UI komponenty

### `CookieBanner` — `src/components/ui/CookieBanner.tsx`

Inicializuje vanilla-cookieconsent (open source, zdarma). Czech texty, dvě kategorie (nezbytné + analytické). Po souhlasu/odmítnutí aktualizuje Google Consent Mode v2 přes `gtag('consent', 'update', ...)`. Žádná registrace ani API klíče nejsou potřeba.

---

## Konvence pro nové komponenty

1. **Umístění:** Zařaď do správné podskupiny (`article/`, `layout/`, `schema/`, `seo/`, `ui/`).
2. **Překlady:** Texty nikdy hardcode — použij `t(locale, 'klic')` z `src/lib/i18n.ts`.
3. **Obrázky:** Vždy `next/image` s `width` a `height`. Hero obrázky s `priority` propem.
4. **Client vs Server:** Default je Server Component. `"use client"` pouze pokud je nutný browser API (event handlers, hooks).
5. **Props:** TypeScript interface pro každý props objekt, žádné `any`.
6. **Nepřidávat:** Novou komponentu pokud stávající lze rozšířit přidáním volitelného propu.
