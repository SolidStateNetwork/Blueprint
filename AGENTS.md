# Project Operations & AI Governance

## 0. Quick-Init Trigger (`init` in Chat)
When the user starts a session by typing `init` (or `init: <project description>`):
1. **Never overwrite `AGENTS.md`** (do not replace this file with a generic `/init` summary).
2. Check if `.env` or `.agents/skills/` exist; if not, run `node init-project.mjs` first.
3. If no project details were provided, ask 3 short questions (1. Project purpose, 2. Tech stack, 3. Core modules). Once answered (or if already provided in `init: ...`), populate `.ai/01-architecture.md`, `.ai/05-patterns.md`, and `.ai/03-roadmap.md` (`TASK-001` completed).
4. **UI / `DESIGN.md` Setup (if project has a UI/frontend and no `DESIGN.md` exists):** Recommend picking a design system from **https://getdesign.md/** or **https://www.shadcn.io/**, OR offer to generate a comprehensive **17-section `DESIGN.md` (v2 format)** right away using `.agents/skills/design-md-generator/SKILL.md` and `.agents/skills/design-md-generator/resources/design-md-format.md` (either extracted from a reference URL or tailored to their desired style).

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
- **Anti-Slop Filter (`during` mode):** Apply the `antislop` rules while generating UI, copy, accessibility, responsive layouts, and code comments. Never invent fake metrics/testimonials, decorative noise without purpose, or redundant section-banner comments.
- **Automatic `README.md` Skill Trigger:** Whenever creating, editing, or restructuring `README.md` (or `README.*.md`), you MUST immediately load and follow `.agents/skills/beautify-github-readme/SKILL.md` (plus `antislop-copywriting`). For full README creation/redesign requests, run the complete `beautify-github-readme` workflow (including SVG hero/architecture diagrams); for minor inline documentation updates after code changes, apply its content-architecture and clarity rules directly without blocking on interactive mode questions.
- **Verification Before Completion:** Never claim a task or bugfix is complete without running the actual verification/test commands (`node verify-governance.mjs` and project tests) and confirming clean output.

## 3. Mandatory Post-Task Protocol
After completing any feature, bugfix, or architectural change, you MUST automatically:
1. Run `node verify-governance.mjs` (plus project test/lint commands) to verify zero governance or secret violations.
2. Update the task status in `.ai/03-roadmap.md` (and sync with Task Master MCP if initialized).
3. Document any structural, library, or interface decision in `.ai/04-decisions.md`.
4. Provide a concise summary of modified files and cross-platform verification steps.

## 4. Project Commands (Customize per Project)
- **Governance Check:** `node verify-governance.mjs`
- **Install:** `[e.g. npm install / uv sync / cargo build]`
- **Dev Server:** `[e.g. npm run dev / uv run ...]`
- **Test / Lint:** `[e.g. npm test / pytest / cargo test / go test ./...]`

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):
- Core filter, always on: `antislop`: `.agents/skills/antislop/SKILL.md`
- UI / visual: `antislop-ui`: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `antislop-copywriting`: `.agents/skills/antislop-copywriting/SKILL.md`
- People: `antislop-human`: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `antislop-layoutmobile`: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `antislop-code`: `.agents/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference (`during` preconfigured via `init-project.mjs`), then default to `during` if unresolved. For UI work intended to ship, read `DESIGN.md` (if present) for visual direction and apply `antislop` as the quality filter.
To update antislop later: `npx antislop-ai --update`, or run `npx skills add miqdadbadjuber/anti-slop --skill "*" -y`.
<!-- antislop:end -->
