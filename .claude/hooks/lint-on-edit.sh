#!/usr/bin/env bash
# PostToolUse hook: run ESLint on edited TypeScript/TSX files immediately after edit.
# Only fires on .ts/.tsx files — skips MDX, JSON, CSS, etc.

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

[[ -z "$FILE" ]] && exit 0
[[ "$FILE" != *.ts && "$FILE" != *.tsx ]] && exit 0

# Run ESLint on the single file, auto-fix safe issues
npx eslint --fix "$FILE" 2>&1
