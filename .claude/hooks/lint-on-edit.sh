#!/usr/bin/env bash
# PostToolUse hook: run ESLint on edited TypeScript/TSX files immediately after edit.
# Only fires on .ts/.tsx files — skips MDX, JSON, CSS, etc.
# Uses python3 for JSON parsing (jq not available in this env).

INPUT=$(cat)
FILE=$(python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print(d.get('tool_input',{}).get('file_path',''))" <<< "$INPUT" 2>/dev/null)

[[ -z "$FILE" ]] && exit 0
[[ "$FILE" != *.ts && "$FILE" != *.tsx ]] && exit 0

# Run ESLint on the single file, auto-fix safe issues
npx eslint --fix "$FILE" 2>&1
