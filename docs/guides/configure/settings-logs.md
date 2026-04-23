---
title: Settings - Logs
description: Live log streaming and debugging in Cinephage
sidebar_position: 20
tags: [settings, logs, debugging, troubleshooting, guide]
keywords: [logs, debugging, settings, monitoring]
---

# Settings - Logs

Access real-time application logs for debugging and monitoring.

## Accessing Logs

Navigate to **Settings > Logs**.

## Live Log Stream

The logs page provides a **real-time stream** of application logs via Server-Sent Events (SSE).

### Features

| Feature       | Description                              |
| ------------- | ---------------------------------------- |
| **Live Stream** | Logs appear in real-time               |
| **Level Filter** | Filter by log level                   |
| **Domain Filter** | Filter by log domain                 |
| **Search**    | Full-text search across log entries      |
| **Pause/Resume** | Buffer logs while paused              |
| **Export**    | Download logs as JSONL                   |

## Log Levels

| Level  | Color   | Description                          |
| ------ | ------- | ------------------------------------ |
| **Debug** | Gray  | Detailed debugging information       |
| **Info**  | Blue  | General information                  |
| **Warn**  | Yellow | Warnings that may need attention     |
| **Error** | Red   | Errors requiring investigation       |

### Filtering by Level

Toggle level buttons to show/hide:

- All levels visible by default
- Click level to toggle visibility
- Multiple levels can be active

## Log Domains

Domains categorize log sources:

| Domain      | Description                          |
| ----------- | ------------------------------------ |
| `api`       | API endpoint requests                |
| `scheduler` | Scheduled task execution             |
| `monitoring`| Content monitoring operations        |
| `library`   | Library scanning and management      |
| `streaming` | Media streaming operations           |
| `subtitles` | Subtitle search and download         |
| `indexers`  | Indexer communication                |
| `download`  | Download client operations           |
| `auth`      | Authentication events                |
| `captcha`   | Captcha solver operations            |

### Filtering by Domain

1. Click **Domain Filter** dropdown
2. Select one or more domains
3. Logs update to show only selected domains

## Search

Full-text search across all visible logs:

1. Type in the search box
2. Logs filter in real-time
3. Matches highlighted
4. Clear search to show all

## Log Entry Details

Each log entry shows:

| Field       | Description                          |
| ----------- | ------------------------------------ |
| **Timestamp** | When the log was created           |
| **Level**   | Log level (debug/info/warn/error)     |
| **Domain**  | Source category                       |
| **Message** | Log message content                   |

### Expanded View

Click a log entry to see additional details:

- **Request ID** — Unique identifier for request tracing
- **Support ID** — Short code for support tickets
- **Method** — HTTP method (for API logs)
- **Path** — Request path (for API logs)
- **Duration** — Request duration (for API logs)
- **Stack Trace** — For error logs

## Pause and Resume

When paused:

1. New logs are buffered in memory (up to 1000 entries)
2. Resume shows all buffered logs
3. Useful for examining a sequence of events

Use pause when:
- Reviewing a specific issue
- Taking screenshots for support
- Analyzing a sequence of events

## Export Logs

Download logs for external analysis:

1. Click **Download** button
2. Logs exported as **JSONL** format
3. Includes all filtered logs
4. Compatible with log analysis tools

### JSONL Format

Each line is a JSON object:

```json
{"level":"info","time":"2025-03-19T10:30:00.000Z","domain":"api","msg":"Request completed","method":"GET","path":"/api/library/movies","duration":45}
```

## Using Logs for Debugging

### Finding Errors

1. **Filter to Error level** — Show only errors
2. **Search for keywords** — "failed", "error", function names
3. **Check timestamps** — Correlate with when issue occurred
4. **Expand entries** — View stack traces

### Tracing Requests

1. **Find the request** — Search by path or method
2. **Copy Request ID** — From expanded view
3. **Search by Request ID** — Find all logs for that request
4. **Follow the flow** — See request lifecycle

### Support Tickets

When contacting support:

1. **Note the Support ID** — From expanded view
2. **Or export logs** — Download relevant time period
3. **Include context** — What you were doing when issue occurred

## Log Retention

Logs are stored in memory only:

- **Not persisted** to database
- **Cleared on restart** — Historical logs unavailable
- **Buffer limit** — ~1000 entries in browser
- **For persistence** — Check Docker/container logs

### Accessing Container Logs

```bash
# Docker logs
docker compose logs -f cinephage

# Last 100 lines
docker compose logs --tail=100 cinephage

# Filter by time
docker compose logs --since=1h cinephage
```

## Environment Variables

Configure logging behavior:

| Variable            | Default | Description                    |
| ------------------- | ------- | ------------------------------ |
| `LOG_LEVEL`         | `info`  | Minimum level to output        |
| `LOG_INCLUDE_STACK` | `false` | Include stack traces           |
| `LOG_SENSITIVE`     | `false` | Log sensitive data (debug only)|

### Enable Debug Logging

```yaml
environment:
  - LOG_LEVEL=debug
  - LOG_INCLUDE_STACK=true
```

:::warning Security
Never enable `LOG_SENSITIVE` in production. It logs passwords, API keys, and other sensitive data.
:::

## API Endpoints

| Method | Endpoint                    | Auth | Description          |
| ------ | --------------------------- | ---- | -------------------- |
| GET    | `/api/settings/logs/stream` | 👑   | SSE for log stream   |
| GET    | `/api/settings/logs/download`| 👑  | Download logs        |

## See Also

- [Troubleshooting](../deploy/troubleshooting) — Common issues
- [Environment Variables](../../reference/configuration/environment-variables) — Log configuration
- [Architecture](../../explanation/architecture) — System design
