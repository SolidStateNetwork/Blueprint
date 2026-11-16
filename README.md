# AI Project Blueprint (Cross-Platform Multi-Agent Template)

Standardized GitHub template repository for **Agentic Engineering & Vibe Coding** across **Windows & Linux**, compatible out-of-the-box with **ChatGPT (OpenAI Codex)**, **Gemini (Gemini CLI / Antigravity)**, **Claude (Claude Code)**, **Cursor**, and **GitHub Copilot**.

## Supported AI Agents (Single Source of Truth: `AGENTS.md`)
- **OpenCode:** Reads `opencode.json` (auto-loads `AGENTS.md`, `.ai/*.md`, and MCP servers).
- **Gemini CLI / Antigravity:** Reads `GEMINI.md` (which imports `@AGENTS.md`).
- **ChatGPT / OpenAI Codex:** Reads `AGENTS.md` natively.
- **Claude Code:** Reads `CLAUDE.md` (points to `AGENTS.md`).
- **Cursor:** Reads `.cursor/rules/core-governance.mdc` and `.cursor/rules/antislop.mdc`.
- **GitHub Copilot:** Reads `.github/copilot-instructions.md`.

## Integrated AI Workflow & Quality Tooling (100% Language-Agnostic)
- **BMAD-METHOD (`bmad-code-org/BMAD-METHOD`):** Structured agentic agile workflows (`/architect`, `/pm`, `/dev`, etc.).
- **Anti-Slop (`miqdadbadjuber/anti-slop`):** Preconfigured in `during` mode to filter out generic AI UI, hype copywriting, accessibility gaps, broken mobile layouts, and redundant code comments across 6 specialized skills (`antislop`, `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-code`).
- **Design-MD-Generator v2 (`jasonhnd/design-md-generator`) & `frontend-design` (`anthropics/skills`):** Generates comprehensive 17-section `DESIGN.md` v2 specifications (paired with [getdesign.md](https://getdesign.md/) and [shadcn.io](https://www.shadcn.io/)) and builds distinctive UI components.
- **Security Guardrails (`trailofbits/skills`):** Universal security skills for preventing API footguns (`sharp-edges`), auditing git diffs for regressions (`differential-review`), and vetting third-party packages (`supply-chain-risk-auditor`).
- **Superpowers Discipline (`obra/superpowers`):** Universal engineering skills for `systematic-debugging`, `test-driven-development`, and `verification-before-completion`.
- **Beautify GitHub README (`oil-oil/beautify-github-readme`):** Automatically loaded whenever `README.md` is created or modified to enforce clear information architecture, honest technical proof, and custom SVG diagrams.
- **Context7 & Task Master MCP (`.mcp.json`):** Key-free live library documentation for any language via `@upstash/context7-mcp` plus local task breakdown via `task-master-ai`.
- **Automated Governance Check (`verify-governance.mjs` & GitHub Actions):** Zero-dependency cross-platform verifier checking `.ai/` integrity, leaked `.env`/secrets, forbidden `TODO: implement later` stubs, merge conflicts, and file size guidelines.

## Quickstart (Windows & Linux)
1. Click **"Use this template"** -> **"Create a new repository"** on GitHub and clone it locally.
2. Open your agent (**Antigravity**, **OpenCode**, **Claude Code**, or **Cursor**) and simply type **`init`** (or **`init: <your project idea & tech stack>`**) in the chat — *or* run `node init-project.mjs` manually in the terminal.
3. The agent automatically runs `node init-project.mjs`, sets up `.env` and all local skills, populates `.ai/01-architecture.md`, `.ai/05-patterns.md`, and `.ai/03-roadmap.md`, and (for UI projects) helps you set up a 17-section `DESIGN.md` via [getdesign.md](https://getdesign.md/), [shadcn.io](https://www.shadcn.io/), or `design-md-generator`.
4. Run `node verify-governance.mjs` anytime (also runs automatically in GitHub Actions) to verify repository hygiene.
