# Architecture Decision Records (ADR)

Log every significant architectural, library, or schema decision here so future agent sessions (ChatGPT, Gemini, Claude) understand *why* things were built this way.

## ADR-001: Cross-Platform Multi-Agent Governance Structure
- **Date:** Initial Setup
- **Status:** Accepted
- **Context:** Support ChatGPT (Codex), Gemini (CLI/Antigravity), Claude (Claude Code), Cursor, and Copilot seamlessly across Windows and Linux without symlink issues.
- **Decision:** Use `AGENTS.md` as the single source of truth with lightweight native pointer files (`CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursor/rules/`) and a Node.js cross-platform initializer (`init-project.mjs`).
- **Consequences:** All AI agents share identical architecture, blackbox, and roadmap rules regardless of host OS.

## ADR-002: Anti-Slop Quality Filter Integration (`miqdadbadjuber/anti-slop`)
- **Date:** Template Setup
- **Status:** Accepted
- **Context:** Prevent AI agents from generating generic "AI slop" in UI layouts, copywriting, accessibility, mobile responsiveness, and code comments across all supported tools.
- **Decision:** Integrate `miqdadbadjuber/anti-slop` via `init-project.mjs` (`npx skills add miqdadbadjuber/anti-slop --skill "*" -y` and `npx antislop-ai --mode during` as the default mode) and anchor the skill pointers in `AGENTS.md`, `.cursor/rules/antislop.mdc`, and `.ai/02-blackbox-rules.md`.
- **Consequences:** Agents automatically apply the 6 Anti-Slop skills (`antislop`, `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-code`) in `during` mode without blocking every new session with a mode prompt.
