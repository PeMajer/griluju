Zkontroluj aktuální změny před commitem — lint, build a obsahová pravidla.

## Postup

### 1. Zjisti rozsah změn

```bash
git diff --name-only HEAD
git diff --stat HEAD
```

Pokud nejsou žádné změny, vypiš to a skonči.

### 2. Lint

```bash
npm run lint
```

Pokud jsou chyby → oprav je. Necommituj s lint chybami.

### 3. Build

```bash
npm run build
```

Pokud build selže → oprav před pokračováním. Necommituj s rozbité buildem.

### 4. Obsahová pravidla (pro MDX soubory)

Pokud byly upraveny soubory v `content/`:

- **Affiliate linky** — žádná raw URL, vše přes `/go/[slug]`
- **Interní odkazů** — ≥3 interní odkazy (ze `content-index.json`)
- **Frontmatter** — vyžaduje `title`, `description`, `date`, `category`, `slug`
- **H1** — nikdy v body (H1 pochází z frontmatteru)
- **Obrázky** — vždy `width` + `height`, hero image má `priority`
- **Soubory obrázků** — existují v `/public/images/[slug]/`

```bash
# Zkontroluj raw affiliate URL v upraveném MDX
git diff HEAD -- 'content/**/*.mdx' | grep '^\+' | grep -E 'amazon\.|alza\.|mall\.' | grep -v '/go/'
```

Pokud najdeš raw URL → oprav na `/go/[slug]`.

### 5. Kvalita kódu (pro TS/TSX soubory)

Projdi diff (`git diff HEAD`) a zhodnoť:

- **Duplicita** — vznikl kód podobný existujícímu? Lze extrahovat?
- **Nová komponenta** — existuje existující, kterou lze rozšířit?
- **Idiomatičnost** — Next.js App Router way, nebo zbytečně složitě?

### 6. Shrnutí

Vypiš přehledný report:

```
## Review výsledky

### Lint
✅ Bez chyb  |  ❌ Chyby opraveny: ...

### Build
✅ Prošel  |  ❌ Selhalo: ...

### Obsahová pravidla
✅ OK  |  ⚠️ Upozornění: ...

### Kvalita kódu
✅ Bez připomínek  |  ⚠️ Návrhy: ...

### Závěr
✅ Připraveno k commitu  |  ❌ Nutno opravit
```
