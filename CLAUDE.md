# griluju.cz

Czech BBQ content site. Monetization via AdSense + affiliate.
Author = frontend developer + active griller (slow BBQ, steaks).
Domains: `griluju.cz` (primary) + `griluju.com` (301 → .cz).

## Detailed docs

- **Architecture & stack:** `.claude/docs/architecture.md`
- **Code conventions:** `.claude/docs/conventions.md`

## Documentation (full reference)

| File | Contents |
|---|---|
| [docs/architecture.md](docs/architecture.md) | Tech stack, structure, routing, affiliate system, performance |
| [docs/commands.md](docs/commands.md) | Dev commands, build scripts, gh CLI |
| [docs/components.md](docs/components.md) | Component inventory with props and examples |
| [docs/design.md](docs/design.md) | Design system — colors, typography, Tailwind v4 rules |
| [docs/agent-workflow.md](docs/agent-workflow.md) | Agent behavior, checklist, project exploration |
| [docs/guides/article-workflow.md](docs/guides/article-workflow.md) | Article lifecycle from brief to publication |
| [docs/guides/tone-of-voice.md](docs/guides/tone-of-voice.md) | Tone, style, forbidden phrases, writing rules |
| [docs/lessons.md](docs/lessons.md) | Patterns from past corrections — read at session start |

---

## Skills — when to use

- **`/review`** — before every commit (lint + build + content checks)
- **`/new-article`** — when creating a new article (branch + frontmatter + content + PR)
- **`/process-transcripts`** — fetches new transcripts from YouTube pipeline and generates Czech BBQ articles
- **`/session-end`** — close the session (status, uncommitted changes, context for next time)
- **`/systematic-debugging`** — when a fix doesn't work on the first try; 4-phase protocol with hard stop after 3 attempts

---

## Work Strategy

**Parallelize** — when a task can be split into independent parts, always run subagents or tool calls in parallel (single message, multiple calls at once). Sequential by default is an antipattern.

**Search in parallel** — prefer parallel code searches (Glob + Grep in the same message). When unsure where to look, use the `Explore` agent instead of repeated Grep calls.

**Read before writing** — never propose changes to code you haven't read. Read the relevant files, understand the context, then write.

**Minimal intervention** — do only what was asked. Don't fix surrounding code, don't add comments, don't refactor "while you're at it". A simple fix doesn't need architecture.

**Failure = stop and reassess** — if an approach doesn't work on the first or second try, don't repeat the same thing. Stop, diagnose the root cause, change the approach. After 3 failed attempts run `/systematic-debugging`.

**Evidence first** — never say "should work" without running the command and reading the output. Done = green output in the terminal.

**Use specialized agents** — for code exploration and reading multiple files at once use the `Explore` agent. For planning complex implementations use the `Plan` agent. Always with `model: "sonnet"`.

---

## Boundaries — what the agent may and may not do

✅ **Always safe:** Reading files, running lint/build, searching code, editing content

⚠️ **Ask first:**
- Task requires deleting or major restructuring of existing files
- There are 2+ valid architectural approaches with real trade-offs
- Instruction conflicts with CLAUDE.md
- A dependency or API key is missing

🚫 **Never:**
- Never push directly to `main` — always branch + PR
- Never commit with a broken build or unresolved lint errors
- Never use raw affiliate URLs — always `/go/[product-slug]`
- Never add a new component if an existing one can be extended
- **Never chain `git add` and `git commit` with `&&`** — the pre-commit hook only runs if the command starts with `git commit`
- Never write "As a language model AI..."

---

## Git — workflow for every task

1. Check current branch: `git branch --show-current`
2. If `main` → always create a new branch. Feature branch → compare with existing changes.
3. New branch: `git checkout main && git pull origin main && git checkout -b [type/description]`
4. Naming: `feature/`, `fix/`, `content/[slug]`, `issue-<number>`
5. Implement → `/review` → commit → push → `gh pr create` (automatically, without asking)

IMPORTANT: Commit messages in English, concise.

---

## Documentation

When changing code, check if relevant documentation exists in `docs/` that describes it. If so, update it. Never leave docs out of sync with the code.

---

## Self-review before finishing

1. Find ALL places that depend on what you changed.
2. Run `/review` — lint, build, content checks.
3. Review the full git diff before declaring done.
4. Ask yourself: **"Would an experienced developer approve this?"** If not, fix it.
