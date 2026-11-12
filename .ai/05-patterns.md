# Approved Code Patterns & Conventions

*(Add concrete 10–20 line reference snippets here for error handling, API responses, logging, and tests. AI agents copy concrete code examples significantly more reliably than abstract prose rules.)*

## 1. Standard Result / Error Pattern
// Example pattern - replace with your project's primary language convention
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

## 2. Naming & File Conventions
- Keep files focused on a single responsibility (< 300 lines where practical).
- Co-locate unit tests alongside modules or mirror `src/` inside `tests/`.
