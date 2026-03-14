# Lessons Learned

Patterns from past corrections. Review at session start when relevant.

---

## Workflow

- **GitHub Actions PR permissions**: `gh pr create` v Actions selže pokud není povoleno "Allow GitHub Actions to create and approve pull requests" v nastavení repozitáře. Řešení: commitovat přímo do main, nebo explicitně zapnout v Settings → Actions → General.

## Skripty / Shell

- **`date -j` je macOS only**: Na Linuxu použij `date -d`. Nejlepší cross-platform řešení pro date arithmetic je `exiftool` samotný (`-DateTimeOriginal-=0:0:5 0:0:0`).
- **exiftool date shift formát**: `Y:M:D H:MM:SS` — `3:0:0 0:0:0` = 3 roky, `0:0:3 0:0:0` = 3 dny. Záměna způsobí posun o roky místo dní.
