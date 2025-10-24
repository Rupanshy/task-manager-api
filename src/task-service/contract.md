# Task Service — CONTRACT (MVP)

**Goal:** Developer-focused task tracking backend (Jira-style) with a clean, well-documented API.
**UI:** Not required for MVP. We will expose a complete Swagger/OpenAPI spec.

---

## 1) Scope (MVP)

- Manage **Projects**, **Tasks**, and **Comments**.
- Simple **workflow** for tasks: `todo → in_progress → in_review → done` (with reopen).
- Basic **labels**, **priority**, **assignee**, **reporter**, **due date**.
- Pagination, sorting, and simple text search.
- (Optional toggle) **Sprints**: create/list/update; tasks can be linked to a sprint.

### Non-Goals (MVP)
- Attachments, file storage.
- Custom workflows per project.
- Advanced permissions/RBAC beyond project owner & members.
- Webhooks/notifications.
- Analytics/boards/burndown charts.

---

## 2) Security & Auth

- All endpoints require `Authorization: Bearer <JWT>`.
- Algorithm: **RS256** (preferred) or **HS256** (fallback).
- `req.user` contains: `{ id: string; email?: string; role?: string }`.
- **Never** accept `ownerId`/`reporterId` from client; always derive from JWT.

---

## 3) Entities (v1)

### 3.1 Project
| Field        | Type       | Notes                                      |
|--------------|------------|--------------------------------------------|
| id           | string     | Mongo _id                                  |
| key          | string     | Short code (e.g., `TM`), **unique**        |
| name         | string     | 1..120                                     |
| description  | string?    | ≤ 5k                                       |
| ownerId      | string     | User id                                    |
| members      | string[]   | User ids (can CRUD tasks/comments)         |
| createdAt    | Date       |                                            |
| updatedAt    | Date       |                                            |

**Indexes:** `{ key: 1 } unique`, `{ ownerId: 1 }`

---

### 3.2 Task
| Field        | Type                                                | Notes                                                  |
|--------------|-----------------------------------------------------|--------------------------------------------------------|
| id           | string                                              | Mongo _id                                             |
| projectId    | string                                              | Ref Project                                           |
| title        | string                                              | 1..200                                                |
| description  | string?                                             | Markdown allowed, ≤ 20k                               |
| type         | enum: `task|bug|story`                              | default `task`                                        |
| status       | enum: `todo|in_progress|in_review|done`             | default `todo`                                        |
| priority     | enum: `low|medium|high|critical`                    | default `medium`                                      |
| reporterId   | string                                              | From JWT                                              |
| assigneeId   | string?                                             | Optional                                              |
| labels       | string[]                                            | ≤ 20 items, kebab-case suggested                      |
| sprintId     | string?                                             | Optional (if sprints enabled)                         |
| dueDate      | Date?                                               | Optional                                              |
| estimate     | number?                                             | Story points/hours                                    |
| createdAt    | Date                                                |                                                       |
| updatedAt    | Date                                                |                                                       |

**Indexes:** `{ projectId:1, status:1, priority:1, assigneeId:1, dueDate:1, createdAt:-1 }`  
*(Optional)* Text index on `title, description`.

---

### 3.3 Comment
| Field        | Type     | Notes                          |
|--------------|----------|--------------------------------|
| id           | string   | Mongo _id                      |
| taskId       | string   | Ref Task                       |
| authorId     | string   | From JWT                       |
| body         | string   | 1..10k                         |
| createdAt    | Date     |                                |
| updatedAt    | Date     |                                |

**Indexes:** `{ taskId:1, createdAt:-1 }`

---

### 3.4 Sprint *(optional in MVP — toggle below)*
| Field        | Type                                    | Notes                            |
|--------------|-----------------------------------------|----------------------------------|
| id           | string                                  | Mongo _id                        |
| projectId    | string                                  | Ref Project                      |
| name         | string                                  | 1..120                           |
| goal         | string?                                 | ≤ 2k                             |
| status       | enum: `planned|active|closed`           | default `planned`                |
| startDate    | Date?                                   |                                  |
| endDate      | Date?                                   |                                  |
| createdAt    | Date                                    |                                  |
| updatedAt    | Date                                    |                                  |

**Indexes:** `{ projectId:1, status:1, startDate:1 }`

---

## 4) Workflow (status transitions)

Allowed transitions:
- `todo → in_progress`
- `in_progress → in_review` or `in_progress → todo`
- `in_review → done` or `in_review → in_progress`
- `done → in_review` (reopen)

Validation rule: reject any transition outside the set above with `409 CONFLICT`.

---

## 5) Permissions (v1)

- **Project.ownerId**: full control.
- **Project.members**: can create/read/update/delete tasks & comments in that project.
- **Task actions**:
  - `reporterId` or `assigneeId` can edit task fields.
  - Anyone in project can comment.
- **Comment delete**: author or project owner.

*(If membership model is not ready in MVP, fallback to “project owner only” — toggle below.)*

---

## 6) Validation (high-level)

- Title: `1..200`
- Description: `≤ 20000`
- Labels: `≤ 20` items, each `1..32`, recommended `/^[a-z0-9-]+$/`
- Search `q`: case-insensitive regex against `title`/`description`
- Pagination: `page ≥ 1`, `limit 1..100`
- Sort: one of `createdAt|-createdAt|dueDate|-dueDate|priority`

---

## 7) API Surface (stable URLs)

All responses use the error shape when failing:  
`{ "error": "CODE", "message": "Human readable", "details": { ... } }`

### 7.1 Projects
- `POST   /api/projects` — create  
- `GET    /api/projects` — list (owner or member)  
- `GET    /api/projects/:projectId`  
- `PATCH  /api/projects/:projectId`  
- `DELETE /api/projects/:projectId` *(soft delete later)*

### 7.2 Tasks
- `POST   /api/projects/:projectId/tasks` — create
- `GET    /api/projects/:projectId/tasks?status&priority&assigneeId&labels&q&page&limit&sort`
- `GET    /api/tasks/:taskId`
- `PATCH  /api/tasks/:taskId`
- `DELETE /api/tasks/:taskId`
- `POST   /api/tasks/:taskId/transitions` — body: `{ toStatus: "in_review" }`

### 7.3 Comments
- `POST   /api/tasks/:taskId/comments`
- `GET    /api/tasks/:taskId/comments?page&limit`
- `DELETE /api/comments/:commentId`

### 7.4 Sprints *(optional)*
- `POST   /api/projects/:projectId/sprints`
- `GET    /api/projects/:projectId/sprints`
- `PATCH  /api/sprints/:sprintId`
- `POST   /api/sprints/:sprintId/start`
- `POST   /api/sprints/:sprintId/close`

---

## 8) Pagination & List Response

Common list wrapper:
```json
{
  "items": [ /* entity */ ],
  "total": 123,
  "page": 1,
  "pages": 13
}
