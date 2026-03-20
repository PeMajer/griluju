#!/bin/bash
# Claude Code PreToolUse hook — spustí se před každým git commit volaným Claudem
# Matcher v settings.json: "Bash(git commit*)"
# Provede mechanické kontroly: affiliate URL, lint

set -uo pipefail

# Přečti (a zahoď) stdin — Claude Code hook vždy posílá JSON na stdin
cat > /dev/null

FAILED=0
OUTPUT=""

# --- 1. Affiliate URL kontrola (pouze staged MDX soubory) ---
MDX_FILES=()
while IFS= read -r f; do [[ -n "$f" ]] && MDX_FILES+=("$f"); done < <(git diff --cached --name-only 2>/dev/null | grep '\.mdx$' || true)

if [ ${#MDX_FILES[@]} -gt 0 ]; then
    RAW_AFFILIATE=$(git diff --cached -- '*.mdx' 2>/dev/null | grep '^\+' | grep -E 'amazon\.|alza\.cz|mall\.cz|heureka\.cz|besteto\.cz' | grep -v '/go/' || true)
    if [ -n "$RAW_AFFILIATE" ]; then
        OUTPUT+="❌ AFFILIATE — nalezeny raw affiliate URL (použij /go/[slug]):\n$RAW_AFFILIATE\n\n"
        FAILED=1
    else
        OUTPUT+="✅ Affiliate URL OK\n"
    fi
else
    OUTPUT+="ℹ️  Affiliate — žádné MDX soubory\n"
fi

# --- 2. ESLint (staged TS/TSX soubory) ---
TS_FILES=()
while IFS= read -r f; do [[ -n "$f" ]] && TS_FILES+=("$f"); done < <(git diff --cached --name-only 2>/dev/null | grep -E '\.(ts|tsx)$' || true)

if [ ${#TS_FILES[@]} -gt 0 ]; then
    ESLINT_OUT=$(npx eslint "${TS_FILES[@]}" 2>&1 || true)
    if echo "$ESLINT_OUT" | grep -qE '^\s+[0-9]+:[0-9]+\s+error'; then
        OUTPUT+="❌ ESLint errors:\n$ESLINT_OUT\n\n"
        FAILED=1
    else
        OUTPUT+="✅ ESLint OK\n"
    fi
else
    OUTPUT+="ℹ️  ESLint — žádné TS/TSX soubory\n"
fi

# --- 3. Frontmatter kontrola (staged MDX soubory) ---
if [ ${#MDX_FILES[@]} -gt 0 ]; then
    MISSING_FIELDS=""
    for f in "${MDX_FILES[@]}"; do
        [[ ! -f "$f" ]] && continue
        for field in title slug description date author category; do
            if ! grep -q "^${field}:" "$f" 2>/dev/null; then
                MISSING_FIELDS+="  $f: chybí '$field'\n"
            fi
        done
    done
    if [ -n "$MISSING_FIELDS" ]; then
        OUTPUT+="❌ Frontmatter — chybějící povinná pole:\n$MISSING_FIELDS\n"
        FAILED=1
    else
        OUTPUT+="✅ Frontmatter OK\n"
    fi
fi

# --- Výstup ---
echo -e "## Pre-commit hook výsledky\n\n${OUTPUT}"

if [ "$FAILED" -eq 1 ]; then
    echo -e "\n❌ Nalezeny problémy — commit zablokován. Oprav výše uvedené chyby."
    exit 2
fi

echo -e "\n✅ Všechny kontroly prošly."
exit 0
