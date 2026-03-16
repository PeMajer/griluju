#!/usr/bin/env node
/**
 * check-docs.mjs
 *
 * Scans git diff (main..HEAD) and reports which docs files
 * may need updating based on what source files changed.
 *
 * Usage:
 *   node scripts/check-docs.mjs
 *   node scripts/check-docs.mjs --base main  (default)
 *   node scripts/check-docs.mjs --base HEAD~3
 */

import { execSync } from "child_process";

const args = process.argv.slice(2);
const baseIdx = args.indexOf("--base");
const base = baseIdx !== -1 ? args[baseIdx + 1] : "main";

// Map: file pattern (regex) → { doc, reason }
const RULES = [
  {
    pattern: /^src\/components\//,
    doc: "docs/components.md",
    reason: "component changed",
  },
  {
    pattern: /^src\/app\/globals\.css$/,
    doc: "docs/design.md",
    reason: "design tokens / typography",
  },
  {
    pattern: /^affiliates\.config\.ts$/,
    doc: "docs/architecture.md (sekce Affiliate systém)",
    reason: "affiliate config",
  },
  {
    pattern: /^content-collections\.ts$/,
    doc: "docs/architecture.md (sekce Content Collections)",
    reason: "content schema",
  },
  {
    pattern: /^next\.config\.ts$/,
    doc: "docs/architecture.md (sekce Build pipeline)",
    reason: "build config",
  },
  {
    pattern: /^src\/lib\/i18n\.ts$/,
    doc: "docs/architecture.md (sekce Routing)",
    reason: "i18n / translations",
  },
  {
    pattern: /^\.github\/workflows\//,
    doc: "docs/architecture.md (sekce Build pipeline)",
    reason: "CI/CD workflow",
  },
  {
    pattern: /^scripts\//,
    doc: "docs/commands.md",
    reason: "scripts",
  },
  {
    pattern: /^\.claude\/(hooks|settings)/,
    doc: "docs/agent-workflow.md",
    reason: "Claude hooks / settings",
  },
];

let changedFiles;
try {
  changedFiles = execSync(`git diff ${base}..HEAD --name-only`, {
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter(Boolean);
} catch {
  console.error(`Error: could not run git diff against '${base}'`);
  process.exit(1);
}

if (changedFiles.length === 0) {
  console.log(`No changes vs ${base}.`);
  process.exit(0);
}

// Collect matches — deduplicate by doc
const hits = new Map(); // doc → Set of reasons
for (const file of changedFiles) {
  for (const rule of RULES) {
    if (rule.pattern.test(file)) {
      if (!hits.has(rule.doc)) hits.set(rule.doc, new Set());
      hits.get(rule.doc).add(`${rule.reason} (${file})`);
    }
  }
}

if (hits.size === 0) {
  console.log(`✓ No doc updates needed for changes vs ${base}.`);
  process.exit(0);
}

console.log(`\nDocs to review (changes vs ${base}):\n`);
for (const [doc, reasons] of hits) {
  console.log(`  📄 ${doc}`);
  for (const r of reasons) {
    console.log(`     • ${r}`);
  }
}
console.log();
