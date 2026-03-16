#!/usr/bin/env bash
# PostToolUse hook: after editing a relevant file, inject a docs-update reminder
# into Claude's context so it knows which doc to check/update.
#
# Uses python3 for JSON parsing (jq not available in this env).

INPUT=$(cat)
FILE=$(python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print(d.get('tool_input',{}).get('file_path',''))" <<< "$INPUT" 2>/dev/null)

[[ -z "$FILE" ]] && exit 0

DOC=""
REASON=""

case "$FILE" in
  src/components/*)
    DOC="docs/components.md"
    REASON="component props or usage changed"
    ;;
  src/app/globals.css)
    DOC="docs/design.md"
    REASON="design tokens or typography changed"
    ;;
  affiliates.config.ts)
    DOC="docs/architecture.md — sekce Affiliate systém"
    REASON="affiliate config changed"
    ;;
  content-collections.ts)
    DOC="docs/architecture.md — sekce Content Collections"
    REASON="content schema changed"
    ;;
  next.config.ts)
    DOC="docs/architecture.md — sekce Build pipeline"
    REASON="build config changed"
    ;;
  src/lib/i18n.ts)
    DOC="docs/architecture.md — sekce Routing"
    REASON="i18n/translations changed"
    ;;
  .github/workflows/*)
    DOC="docs/architecture.md — sekce Build pipeline"
    REASON="CI/CD workflow changed"
    ;;
  scripts/*)
    DOC="docs/commands.md"
    REASON="scripts changed"
    ;;
  .claude/hooks/*|.claude/settings.json)
    DOC="docs/agent-workflow.md"
    REASON="Claude hooks or settings changed"
    ;;
  *)
    exit 0
    ;;
esac

echo "Docs reminder: edited '$FILE' ($REASON) — check if $DOC needs updating."
exit 0
