# Guardrails

Standing rules for any AI agent or collaborator working in this repository.
These override default behaviour. Read this file before making changes.

## Git

- **Never push or commit to GitHub.** No `git push`, no PR creation, no remote
  writes of any kind.
- Local commits are fine and expected — they are the restore points.
- **Never add Claude (or any AI) co-authorship to commit messages.** No
  `Co-Authored-By:` trailer, no "Generated with" footer. Commits are authored
  by the repository owner alone.
- After work is committed locally, **provide the exact commands** for the owner
  to review and push manually. Never run them.

## Scope of operations

- **Never execute operations outside this working folder**
  (`ifthekhar-portfolio/`). No writes, installs, deletions, or scripts that
  touch parent directories or unrelated paths on the machine.
- Temporary files belong in the session scratchpad, not in the project.

## Project context

- Maintain a single **`context.md`** at the repository root summarising each
  working session's website updates. Update it as part of the same change — do
  not create additional parallel summary or log files.

## Media and performance

- The site must stay **fast to load**.
- **Optimise every image the owner uploads**, automatically, without being asked.
- **Never reduce resolution or visual quality when optimising.** Compression
  must be visually lossless: keep the pixel dimensions, strip metadata, and use
  efficient formats (WebP/AVIF with an original-format fallback where needed).
- Do not ship unused media. Build output must not carry files the page never
  references.

## Housekeeping

- Keep the working folder free of superseded designs, dead components, and
  stale build artefacts. Remove them deliberately, in their own commit, so the
  deletion is easy to review and revert.
