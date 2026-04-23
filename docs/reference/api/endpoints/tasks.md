---
title: Tasks
description: API endpoints for managing scheduled tasks
sidebar_position: 11
tags: [api, tasks, monitoring, endpoints, reference]
keywords: [api, tasks, monitoring, endpoints]
---

# Tasks

Endpoints for managing scheduled monitoring tasks in Cinephage. Tasks handle automated operations like searching for missing content, upgrades, and subtitle searches.

## Authentication

All task endpoints require authentication via session cookie or API key.

| Endpoint | Auth Level |
|----------|------------|
| GET `/api/tasks` | requireAuth |
| GET `/api/tasks/stream` | requireAuth |
| POST `/api/tasks/:taskId/run` | requireAuth |
| POST `/api/tasks/:taskId/cancel` | requireAuth |
| PUT `/api/tasks/:taskId/enabled` | requireAuth |
| PUT `/api/tasks/:taskId/interval` | requireAuth |
| GET `/api/tasks/:taskId/history` | requireAuth |
| GET `/api/tasks/history/:historyId/activity` | requireAuth |

---

## List tasks

Returns all available monitoring tasks.

```
GET /api/tasks
```

### Request parameters

None required.

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |

### Response schema

```json
{
  "tasks": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "type": "monitoring | subtitle | system",
      "enabled": "boolean",
      "interval": "integer",
      "intervalUnit": "minutes | hours | days",
      "defaultInterval": "integer",
      "lastRunAt": "string",
      "nextRunAt": "string",
      "status": "idle | running | queued | error",
      "supportsCancel": "boolean",
      "supportsHistory": "boolean"
    }
  ]
}
```

### Task Types

| Type | Description |
|------|-------------|
| `monitoring` | Content monitoring tasks (search, upgrade) |
| `subtitle` | Subtitle-related tasks |
| `system` | System maintenance tasks |

### Built-in Tasks

| Task | Type | Description |
|------|------|-------------|
| `CutoffUnmet` | monitoring | Search for items below quality cutoff |
| `Upgrade` | monitoring | Search for quality upgrades |
| `MissingEpisodes` | monitoring | Search for missing TV episodes |
| `NewEpisodes` | monitoring | Detect new episodes |
| `PendingReleases` | monitoring | Monitor pending releases |
| `MissingSubtitles` | subtitle | Search for missing subtitles |
| `SubtitleUpgrade` | subtitle | Search for better subtitles |
| `SubtitleSearchOnImport` | subtitle | Search subtitles on media import |
| `HistoryCleanup` | system | Clean up old history entries (30 days) |

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/tasks"
```

### Example response

```json
{
  "tasks": [
    {
      "id": "task_missing_subtitles",
      "name": "Missing Subtitles",
      "description": "Search for missing subtitles on media items",
      "type": "subtitle",
      "enabled": true,
      "interval": 360,
      "intervalUnit": "minutes",
      "defaultInterval": 360,
      "lastRunAt": "2024-06-20T10:00:00Z",
      "nextRunAt": "2024-06-20T16:00:00Z",
      "status": "idle",
      "supportsCancel": true,
      "supportsHistory": true
    },
    {
      "id": "task_upgrade",
      "name": "Quality Upgrade",
      "description": "Search for better quality releases",
      "type": "monitoring",
      "enabled": true,
      "interval": 10080,
      "intervalUnit": "minutes",
      "defaultInterval": 10080,
      "lastRunAt": "2024-06-19T02:00:00Z",
      "nextRunAt": "2024-06-26T02:00:00Z",
      "status": "idle",
      "supportsCancel": true,
      "supportsHistory": true
    }
  ]
}
```

---

## Task Events Stream

Real-time SSE stream for task status updates.

```
GET /api/tasks/stream
```

### Response

Server-Sent Events stream with task status changes.

### Event types

| Event | Description |
|-------|-------------|
| `task:started` | Task execution started |
| `task:progress` | Task progress update |
| `task:completed` | Task execution completed |
| `task:error` | Task execution failed |
| `task:cancelled` | Task was cancelled |

### Example event

```
event: task:started
data: {"taskId":"task_upgrade","timestamp":"2024-06-20T10:00:00Z"}
```

---

## Run task

Triggers immediate execution of a task.

```
POST /api/tasks/:taskId/run
```

### Request parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| taskId | string | Yes | Task identifier |

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| force | boolean | No | Force run even if already running |
| options | object | No | Task-specific options |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Task started or already running |
| 401 | Authentication required |
| 404 | Task not found |

### Example request

```bash
curl -X POST \
  -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/tasks/task_upgrade/run"
```

### Example response

```json
{
  "success": true,
  "taskId": "task_upgrade",
  "executionId": "exec_abc123",
  "message": "Task queued for execution"
}
```

---

## Cancel task

Cancels a running task.

```
POST /api/tasks/:taskId/cancel
```

### Request parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| taskId | string | Yes | Task identifier |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Cancellation successful |
| 400 | Task not running or doesn't support cancellation |
| 401 | Authentication required |
| 404 | Task not found |

### Example request

```bash
curl -X POST \
  -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/tasks/task_upgrade/cancel"
```

### Example response

```json
{
  "success": true,
  "taskId": "task_upgrade",
  "message": "Task cancellation requested"
}
```

---

## Toggle task enabled

Enables or disables a task.

```
PUT /api/tasks/:taskId/enabled
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| enabled | boolean | Yes | Enable or disable task |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Task updated |
| 401 | Authentication required |
| 404 | Task not found |

### Example request

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{"enabled": false}' \
  "http://localhost:3000/api/tasks/task_missing_subtitles/enabled"
```

---

## Update task interval

Changes the execution interval for a task.

```
PUT /api/tasks/:taskId/interval
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| interval | integer | Yes | New interval value |
| unit | string | Yes | Unit: `minutes`, `hours`, or `days` |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Interval updated |
| 400 | Invalid interval or unit |
| 401 | Authentication required |
| 404 | Task not found |

### Example request

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{"interval": 720, "unit": "minutes"}' \
  "http://localhost:3000/api/tasks/task_missing_subtitles/interval"
```

### Example response

```json
{
  "success": true,
  "taskId": "task_missing_subtitles",
  "interval": 720,
  "intervalUnit": "minutes",
  "nextRunAt": "2024-06-20T22:00:00Z"
}
```

---

## Get task history

Returns execution history for a task.

```
GET /api/tasks/:taskId/history
```

### Request parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| taskId | string | Yes | Task identifier |

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20) |
| status | string | No | Filter by status: `completed`, `failed`, `cancelled` |

### Response schema

```json
{
  "history": [
    {
      "id": "string",
      "taskId": "string",
      "startedAt": "string",
      "completedAt": "string",
      "duration": "integer",
      "status": "completed | failed | cancelled",
      "itemsProcessed": "integer",
      "itemsAffected": "integer",
      "error": "string"
    }
  ],
  "pagination": {
    "page": "integer",
    "limit": "integer",
    "total": "integer",
    "totalPages": "integer"
  }
}
```

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/tasks/task_missing_subtitles/history?limit=10"
```

---

## Get task history activity

Returns detailed per-item activity for a task execution.

```
GET /api/tasks/history/:historyId/activity
```

### Request parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| historyId | string | Yes | History entry identifier |

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 50) |

### Response schema

```json
{
  "activity": [
    {
      "id": "string",
      "historyId": "string",
      "mediaId": "string",
      "mediaTitle": "string",
      "action": "string",
      "status": "string",
      "message": "string",
      "timestamp": "string"
    }
  ],
  "pagination": {
    "page": "integer",
    "limit": "integer",
    "total": "integer",
    "totalPages": "integer"
  }
}
```

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/tasks/history/exec_abc123/activity?limit=50"
```

## See Also

- [Monitoring](../../../guides/configure/settings-system) — Task configuration in settings
- [Search and Download](../../../guides/use/search-and-download) — Manual search operations
- [Subtitles](../../../guides/configure/subtitles) — Subtitle task configuration
