# System Architecture & Boundaries

## 1. System overview
- **Project name:** `[PROJECT_NAME]`
- **Purpose:** `[1-2 sentences describing core functionality]`
- **Target OS and runtime:** `Cross-Platform (Windows & Linux)`
- **Tech stack:** `[Frontend / Backend / Database / Infra]`

## 2. High-level component map
[Client / UI] ---> [API / Gateway] ---> [Core Domain / Services] ---> [Data / Storage Layer]

## 3. Module boundaries and interfaces
| Module | Responsibility | Allowed Dependencies | Public Interface |
| :--- | :--- | :--- | :--- |
| `core` | Business logic and domain rules | None (pure logic) | `src/core/index` |
| `api` | External HTTP/RPC endpoints and validation | `core` | REST / GraphQL / RPC routes |
| `infra` | Database, external APIs, filesystem, queues | `core` (interfaces only) | Repository implementations |

## 4. Data flow and state management
- Document critical data flows, authentication boundaries, and external webhooks here.
