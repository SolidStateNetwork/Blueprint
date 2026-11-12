# System Architecture & Boundaries

## 1. System Overview
- **Project Name:** `[PROJECT_NAME]`
- **Purpose:** `[1-2 sentences describing core functionality]`
- **Target OS / Runtime:** `Cross-Platform (Windows & Linux)`
- **Tech Stack:** `[Frontend / Backend / Database / Infra]`

## 2. High-Level Component Map
[Client / UI] ---> [API / Gateway] ---> [Core Domain / Services] ---> [Data / Storage Layer]

## 3. Module Boundaries & Interfaces
| Module | Responsibility | Allowed Dependencies | Public Interface |
| :--- | :--- | :--- | :--- |
| `core` | Business logic & domain rules | None (pure logic) | `src/core/index` |
| `api` | External HTTP/RPC endpoints & validation | `core` | REST / GraphQL / RPC routes |
| `infra` | DB, external APIs, filesystem, queues | `core` (interfaces only) | Repository implementations |

## 4. Data Flow & State Management
- Document critical data flows, auth boundaries, and external webhooks here.
