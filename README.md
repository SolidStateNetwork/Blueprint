# AI Project Blueprint (Cross-Platform Multi-Agent Template)

Standardized GitHub template repository for **Agentic Engineering & Vibe Coding** across **Windows & Linux**, compatible out-of-the-box with **ChatGPT (OpenAI Codex)**, **Gemini (Gemini CLI / Antigravity)**, **Claude (Claude Code)**, **Cursor**, and **GitHub Copilot**.

## Supported AI Agents (Single Source of Truth: `AGENTS.md`)
- **ChatGPT / OpenAI Codex:** Reads `AGENTS.md` natively.
- **Gemini CLI / Antigravity:** Reads `GEMINI.md` (which imports `@AGENTS.md`).
- **Claude Code:** Reads `CLAUDE.md` (points to `AGENTS.md`).
- **Cursor:** Reads `.cursor/rules/core-governance.mdc` and `.cursor/rules/antislop.mdc`.
- **GitHub Copilot:** Reads `.github/copilot-instructions.md`.

## Integrated AI Workflow & Quality Tooling
- **BMAD-METHOD (`bmad-code-org/BMAD-METHOD`):** Structured agentic agile workflows (`/architect`, `/pm`, `/dev`, etc.).
- **Anti-Slop (`miqdadbadjuber/anti-slop`):** Preconfigured in `during` mode to filter out generic AI UI, hype copywriting, accessibility gaps, broken mobile layouts, and redundant code comments across 6 specialized skills (`antislop`, `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-code`).
- **Claude Task Master (`task-master-ai`):** Local task breakdown and MCP integration (`.mcp.json`).

## Quickstart (Windows & Linux)
1. Click **"Use this template"** -> **"Create a new repository"** on GitHub.
2. Clone your new repo locally (`git clone <repo-url>`).
3. Run `node init-project.mjs` in the project root (automatically sets up `.env`, latest **BMAD-METHOD** skills, **Anti-Slop** skills in `during` mode, and **Claude Task Master** locally; pass `--skip-tools` for lightweight projects).
4. Fill out `.ai/01-architecture.md` (or let BMAD `/architect` generate it) and optionally add a `DESIGN.md` for UI visual direction.
5. Start coding — every AI agent automatically respects `.ai/02-blackbox-rules.md`, applies the Anti-Slop filter, and updates `.ai/03-roadmap.md` & `.ai/04-decisions.md`.
