# Blackbox & Governance Rules

## 1. Module Isolation (Blackbox Principle)
- Modules communicate ONLY through their documented public interfaces (types, APIs, events).
- Internal state, private helpers, or internal DB models of Module A must NEVER be imported directly by Module B.
- Storage and external network calls are strictly isolated to the infrastructure/repository layer.

## 2. Code & Safety Hygiene
- **No Stubs in Production:** Never leave `// TODO: implement later`, dummy return values, or mock data in production paths unless explicitly requested.
- **Explicit Error Handling:** Fail loudly with typed/structured errors; never swallow exceptions with empty `catch` blocks.
- **Secrets & Config:** All credentials, API keys, and environment-specific URLs belong strictly in `.env` (never hardcoded or committed).
- **Backward Compatibility:** Do not break existing public API contracts or DB schemas without an explicit migration entry in `.ai/04-decisions.md`.
- **OS Portability:** Use `path.join` / `pathlib.Path` instead of hardcoded `\` or `/` path strings, and ensure scripts run identically on Windows and Linux.
