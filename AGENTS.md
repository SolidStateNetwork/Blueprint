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
- **Anti-Slop Filter (`during` mode):** Apply the `antislop` rules while generating UI, copy, accessibility, responsive layouts, and code comments. Never invent fake metrics/testimonials, decorative noise without purpose, or redundant section-banner comments.
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
