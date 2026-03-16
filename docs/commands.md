# Commands — griluju.cz

## Dev

```bash
npm run dev       # dev server on port 3000
npm run build     # production build (must pass before any commit)
npm run lint      # lint check (must pass before any commit)
```

## After build / on demand

```bash
node scripts/generate-content-index.mjs  # regenerate content-index.json
node scripts/generate-sitemap.mjs        # generate sitemap.xml → out/
node scripts/convert-images-to-webp.mjs  # convert JPG/PNG → WebP (sharp)
```

## GitHub CLI

```bash
gh issue list                              # open issues
gh issue view <number>                     # full issue detail
gh pr create --title "..." --body "..."    # open PR
gh pr list                                 # list PRs
```
