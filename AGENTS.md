# Project Operations & AI Governance

## 0. Quick-init trigger (`init` in chat)
When the user starts a session by typing `init` (or `init: <project description>`):
1. **Never overwrite `AGENTS.md`** (do not replace this file with a generic `/init` summary).
2. Check if `.env` or `.agents/skills/` exist; if not, run `node init-project.mjs` first.
3. If no project details were provided, ask 3 short questions (1. Project purpose, 2. Tech stack, 3. Core modules). Once answered (or if already provided in `init: ...`), populate `.ai/01-architecture.md`, `.ai/05-patterns.md`, and `.ai/03-roadmap.md` (`TASK-001` completed).
4. **UI, `DESIGN.md`, and `UX.md` setup (if the project has a UI or frontend):**
   - **Visual system (`DESIGN.md`):** If no `DESIGN.md` exists, recommend picking a design system from **https://getdesign.md/** or **https://www.shadcn.io/**, or offer to generate a 17-section `DESIGN.md` (v2 format) using `.agents/skills/design-md-generator/SKILL.md` and `.agents/skills/design-md-generator/resources/design-md-format.md`.
   - **Structural skeleton (`UX.md`):** If no `UX.md` exists, offer to generate a 12-section `UX.md` (v1 format) using `.agents/skills/ux-md-generator/SKILL.md` (plus `.agents/skills/ux-md-generator/scripts/generate-ux.mjs` and `validate-ux.mjs`) to lock in the app shell, page archetypes, route flows, 4-state view matrix, and responsive breakpoint reflow.

## 1. Core mandate (read first)
You are operating inside a structured repository. Before modifying any file, read and respect the constraints inside `.ai/`:
- **Architecture and boundaries:** `.ai/01-architecture.md`
- **Blackbox and governance rules:** `.ai/02-blackbox-rules.md`
- **Active roadmap:** `.ai/03-roadmap.md`
- **Architecture decision log:** `.ai/04-decisions.md`
- **Code patterns:** `.ai/05-patterns.md`

## 2. Hard constraints
- **No unapproved dependencies:** Do not install new packages or libraries without explicit user confirmation and logging in `.ai/04-decisions.md`.
- **Blackbox integrity:** Never bypass defined module interfaces or hardcode secrets, tokens, or endpoints.
- **No silent drift:** If a user request contradicts `.ai/01-architecture.md` or `.ai/02-blackbox-rules.md`, stop immediately, explain the conflict, and ask for confirmation before writing code.
- **Paraphrase first:** For non-trivial changes (more than 2 files or architectural impact), briefly summarize your plan and affected interfaces before modifying code.
- **Cross-platform hygiene:** Ensure all file paths, scripts, and commands work cleanly on both Windows and Linux (use forward slashes `/` in code and configs, avoid OS-specific shell assumptions).
- **Anti-Slop filter (`during` mode):** Apply the `antislop` rules while generating UI, copy, accessibility, responsive layouts, and code comments. Never invent fake metrics or testimonials, decorative noise without purpose, or redundant section-banner comments.
- **Automatic `README.md` skill trigger:** Whenever creating, editing, or restructuring `README.md` (or `README.*.md`), load and follow `.agents/skills/beautify-github-readme/SKILL.md` (plus `antislop-copywriting`). For full README creation or redesign requests, run the complete `beautify-github-readme` workflow; for minor inline documentation updates after code changes, apply its content-architecture and clarity rules directly without blocking on interactive mode questions.
- **Verification before completion:** Never claim a task or bugfix is complete without running the verification and test commands (`node verify-governance.mjs` and project tests) and confirming clean output.

## 3. Mandatory post-task protocol
After completing any feature, bugfix, or architectural change in an initialized project:
1. Run `node verify-governance.mjs` (plus project test and lint commands) to verify zero governance or secret violations.
2. When `.ai/01-architecture.md` has been initialized for a target project (not the raw `Blueprint` template repository itself), update the task status in `.ai/03-roadmap.md` and document any structural, library, or interface decision in `.ai/04-decisions.md`.
3. Provide a concise summary of modified files and cross-platform verification steps.

## 4. Project commands (customize per project)
- **Governance check:** `node verify-governance.mjs`
- **Install:** `[e.g. npm install / uv sync / cargo build]`
- **Dev server:** `[e.g. npm run dev / uv run ...]`
- **Test and lint:** `[e.g. npm test / pytest / cargo test / go test ./...]`

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):
- Core filter, always on: `antislop`: `.agents/skills/antislop/SKILL.md`
- UI / visual: `antislop-ui`: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `antislop-copywriting`: `.agents/skills/antislop-copywriting/SKILL.md`
- People: `antislop-human`: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `antislop-layoutmobile`: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `antislop-code`: `.agents/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference (`during` preconfigured via `init-project.mjs`), then default to `during` if unresolved. For UI work intended to ship, read `DESIGN.md` (if present) for visual direction and `UX.md` (if present) for structural flows, states, and layout boundaries, and apply `antislop` as the quality filter.
To update antislop later: `npx antislop-ai --update`, or run `npx skills add miqdadbadjuber/anti-slop --skill "*" -y`.
<!-- antislop:end -->
