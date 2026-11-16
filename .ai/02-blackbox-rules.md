# Blackbox & Governance Rules

## 1. Module Isolation (Blackbox Principle)
- Modules communicate ONLY through their documented public interfaces (types, APIs, events).
- Internal state, private helpers, or internal DB models of Module A must NEVER be imported directly by Module B.
- Storage and external network calls are strictly isolated to the infrastructure/repository layer.

## 2. Code & Safety Hygiene
- **No Stubs in Production:** Never leave `// TODO: implement later`, dummy return values, or mock data in production paths unless explicitly requested.
- **Explicit Error Handling:** Fail loudly with typed/structured errors; never swallow exceptions with empty `catch` blocks.
- **Secrets & Config:** All credentials, API keys, and environment-specific URLs belong strictly in `.env` (never hardcoded or committed). Never use insecure fallback secrets (e.g., `process.env.JWT_SECRET || "default"`).
- **Security & API Sharp Edges (`trailofbits/skills`):** Design interfaces to be fail-closed and resistant to misuse (`sharp-edges`), audit new packages before adoption (`supply-chain-risk-auditor`), and review diffs for security regressions (`differential-review`).
- **Backward Compatibility:** Do not break existing public API contracts or DB schemas without an explicit migration entry in `.ai/04-decisions.md`.
- **OS Portability:** Use `path.join` / `pathlib.Path` instead of hardcoded `\` or `/` path strings, and ensure scripts run identically on Windows and Linux.

## 3. Anti-Slop Quality Filter (UI, Copy, Accessibility & Code)
- **Active Filter (`during` Mode):** Apply the installed `antislop` skills (`.agents/skills/antislop*`) while generating code, UI, or text.
- **Purposeful UI & `DESIGN.md`:** Reject visual techniques without a concrete hierarchy, identity, or readability purpose. Read `DESIGN.md` (when present) for visual direction.
- **Honest Copywriting (`antislop-copywriting`):** Never invent fake numbers, latency metrics, ROI claims, testimonials, or generic AI hype phrases.
- **Accessibility & Mobile Reflow (`antislop-human` & `antislop-layoutmobile`):** Enforce WCAG 2.2 contrast, visible focus states, semantic controls, and responsive mobile reflow without horizontal overflow.
- **Clean Code Comments (`antislop-code`):** Never add decorative ASCII/box-drawing section banners, emojis in code comments, or comments that merely restate the code.
