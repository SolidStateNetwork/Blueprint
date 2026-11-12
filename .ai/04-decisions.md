# Architecture Decision Records (ADR)

Log every significant architectural, library, or schema decision here so future agent sessions (ChatGPT, Gemini, Claude) understand *why* things were built this way.

## ADR-001: Cross-Platform Multi-Agent Governance Structure
- **Date:** Initial Setup
- **Status:** Accepted
- **Context:** Support ChatGPT (Codex), Gemini (CLI/Antigravity), Claude (Claude Code), Cursor, and Copilot seamlessly across Windows and Linux without symlink issues.
- **Decision:** Use `AGENTS.md` as the single source of truth with lightweight native pointer files (`CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursor/rules/`) and a Node.js cross-platform initializer (`init-project.mjs`).
- **Consequences:** All AI agents share identical architecture, blackbox, and roadmap rules regardless of host OS.
