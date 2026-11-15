# AI Project Blueprint (Cross-Platform Multi-Agent Template)

Standardized GitHub template repository for **Agentic Engineering & Vibe Coding** across **Windows & Linux**, compatible out-of-the-box with **ChatGPT (OpenAI Codex)**, **Gemini (Gemini CLI / Antigravity)**, **Claude (Claude Code)**, **Cursor**, and **GitHub Copilot**.

## Supported AI Agents (Single Source of Truth: `AGENTS.md`)
- **ChatGPT / OpenAI Codex:** Reads `AGENTS.md` natively.
- **Gemini CLI / Antigravity:** Reads `GEMINI.md` (which imports `@AGENTS.md`).
- **Claude Code:** Reads `CLAUDE.md` (points to `AGENTS.md`).
- **Cursor:** Reads `.cursor/rules/core-governance.mdc` and `.cursor/rules/antislop.mdc`.
- **GitHub Copilot:** Reads `.github/copilot-instructions.md`.

## Integrated AI Workflow & Quality Tooling (100% Language-Agnostic)
- **BMAD-METHOD (`bmad-code-org/BMAD-METHOD`):** Structured agentic agile workflows (`/architect`, `/pm`, `/dev`, etc.).
- **Anti-Slop (`miqdadbadjuber/anti-slop`):** Preconfigured in `during` mode to filter out generic AI UI, hype copywriting, accessibility gaps, broken mobile layouts, and redundant code comments across 6 specialized skills (`antislop`, `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-code`).
- **Superpowers Discipline (`obra/superpowers`):** Universal engineering skills for `systematic-debugging`, `test-driven-development`, and `verification-before-completion`.
- **Context7 & Task Master MCP (`.mcp.json`):** Key-free live library documentation for any language via `@upstash/context7-mcp` plus local task breakdown via `task-master-ai`.
- **Automated Governance Check (`verify-governance.mjs` & GitHub Actions):** Zero-dependency cross-platform verifier checking `.ai/` integrity, leaked `.env`/secrets, forbidden `TODO: implement later` stubs, merge conflicts, and file size guidelines.

## Quickstart (Windows & Linux)
1. Click **"Use this template"** -> **"Create a new repository"** on GitHub.
2. Clone your new repo locally (`git clone <repo-url>`).
3. Run `node init-project.mjs` in the project root (automatically sets up `.env`, **BMAD-METHOD**, **Anti-Slop** in `during` mode, **Superpowers** skills, and **Claude Task Master** locally; pass `--skip-tools` for lightweight projects).
4. Fill out `.ai/01-architecture.md` (or let BMAD `/architect` generate it) and optionally add a `DESIGN.md` for UI visual direction.
5. Run `node verify-governance.mjs` anytime (also runs automatically in GitHub Actions) to verify repository hygiene.
