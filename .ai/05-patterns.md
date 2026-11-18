# Approved Code Patterns & Conventions

Add 10 to 20 line reference snippets here for error handling, API responses, logging, and tests.

## 1. Standard result and error pattern
```ts
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

## 2. Naming and file conventions
- Keep files focused on a single responsibility (under 300 lines where practical).
- Co-locate unit tests alongside modules or mirror `src/` inside `tests/`.
