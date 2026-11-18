# Blackbox & Governance Rules

## 1. Module isolation (blackbox principle)
- Modules communicate only through their documented public interfaces (types, APIs, events).
- Internal state, private helpers, or internal database models of one module must never be imported directly by another module.
- Storage and external network calls stay isolated in the infrastructure or repository layer.

## 2. Code and safety hygiene
- **No production stubs:** Do not leave `// TODO: implement later`, dummy return values, or mock data in production code paths.
- **Explicit error handling:** Fail with typed or structured errors instead of swallowing exceptions in empty `catch` blocks.
- **Secrets and configuration:** Keep credentials, API keys, and environment-specific URLs in `.env` (never hardcoded, committed, or paired with insecure fallback strings).
- **Fail-closed interfaces:** Validate untrusted inputs at module boundaries and design APIs so default options are safe.
- **Backward compatibility:** Do not break public API contracts or database schemas without recording a migration in `.ai/04-decisions.md`.
- **Cross-platform paths:** Use `path.join` or `pathlib.Path` instead of hardcoded path separators so scripts run on both Windows and Linux.
