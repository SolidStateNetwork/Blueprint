# Project Operations & AI Governance

## 1. Core Mandate (Read First)
You are operating inside a structured repository. Before modifying any file, you MUST read and respect the constraints inside `.ai/`:
- **Architecture & Boundaries:** `.ai/01-architecture.md`
- **Blackbox & Governance Rules:** `.ai/02-blackbox-rules.md`
- **Active Roadmap:** `.ai/03-roadmap.md`
- **Architecture Decision Log:** `.ai/04-decisions.md`
- **Code Patterns:** `.ai/05-patterns.md`

## 2. Hard Constraints (Zero Tolerance)
- **No Unapproved Dependencies:** Never install new packages or libraries without explicit user confirmation and logging in `.ai/04-decisions.md`.
- **Blackbox Integrity:** Never bypass defined module interfaces or hardcode secrets, tokens, or endpoints.
- **No Silent Drift:** If a user request contradicts `.ai/01-architecture.md` or `.ai/02-blackbox-rules.md`, STOP immediately, explain the conflict, and ask for confirmation before writing code.
- **Paraphrase First:** For non-trivial changes (>2 files or architectural impact), briefly summarize your plan and affected interfaces before modifying code.
- **Cross-Platform Hygiene:** Ensure all file paths, scripts, and commands work cleanly on both Windows and Linux (use forward slashes `/` in code/configs, avoid OS-specific shell assumptions).

## 3. Mandatory Post-Task Protocol
After completing any feature, bugfix, or architectural change, you MUST automatically:
1. Update the task status in `.ai/03-roadmap.md` (and sync with Task Master MCP if initialized).
2. Document any structural, library, or interface decision in `.ai/04-decisions.md`.
3. Provide a concise summary of modified files and cross-platform verification steps.

## 4. Project Commands (Customize per Project)
- **Install:** `[e.g. npm install / uv sync]`
- **Dev Server:** `[e.g. npm run dev]`
- **Test / Lint:** `[e.g. npm test / pytest]`
