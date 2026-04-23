---
title: Captcha Solver
description: API endpoints for managing the built-in Captcha Solver
sidebar_position: 12
tags: [api, captcha, solver, endpoints, reference]
keywords: [api, captcha, solver, endpoints]
---

# Captcha Solver

Endpoints for configuring and testing the built-in Captcha Solver. The Captcha Solver uses Camoufox (anti-detect Firefox) to automatically solve Cloudflare challenges and other anti-bot protections.

## Authentication

All captcha-solver endpoints require admin authentication.

| Endpoint | Auth Level |
|----------|------------|
| GET `/api/captcha-solver` | requireAuth |
| PUT `/api/captcha-solver` | requireAuth |
| DELETE `/api/captcha-solver` | requireAuth |
| GET `/api/captcha-solver/health` | requireAuth |
| DELETE `/api/captcha-solver/health` | requireAuth |
| POST `/api/captcha-solver/test` | requireAuth |

---

## Get solver settings

Returns current Captcha Solver configuration.

```
GET /api/captcha-solver
```

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |

### Response schema

```json
{
  "enabled": "boolean",
  "timeout": "integer",
  "cacheTtl": "integer",
  "headless": "boolean",
  "proxy": "string | null",
  "maxRetries": "integer",
  "parallelSolves": "integer",
  "browserPath": "string | null",
  "stats": {
    "totalSolves": "integer",
    "successfulSolves": "integer",
    "failedSolves": "integer",
    "successRate": "number",
    "averageSolveTime": "number",
    "cachedDomains": "integer",
    "lastError": "string | null"
  }
}
```

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/captcha-solver"
```

### Example response

```json
{
  "enabled": true,
  "timeout": 60,
  "cacheTtl": 24,
  "headless": true,
  "proxy": null,
  "maxRetries": 3,
  "parallelSolves": 1,
  "browserPath": null,
  "stats": {
    "totalSolves": 150,
    "successfulSolves": 142,
    "failedSolves": 8,
    "successRate": 94.67,
    "averageSolveTime": 12.5,
    "cachedDomains": 12,
    "lastError": null
  }
}
```

---

## Update solver settings

Updates Captcha Solver configuration.

```
PUT /api/captcha-solver
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| enabled | boolean | No | Enable/disable solver |
| timeout | integer | No | Max time to wait for solve (seconds) |
| cacheTtl | integer | No | Cookie cache TTL (hours) |
| headless | boolean | No | Run browser without GUI |
| proxy | string | No | HTTP proxy for browser |
| maxRetries | integer | No | Retry attempts per challenge |
| parallelSolves | integer | No | Concurrent challenge solving |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Settings updated |
| 400 | Invalid request body |
| 401 | Authentication required |

### Example request

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{
    "enabled": true,
    "timeout": 90,
    "cacheTtl": 48,
    "headless": true
  }' \
  "http://localhost:3000/api/captcha-solver"
```

### Example response

```json
{
  "success": true,
  "enabled": true,
  "timeout": 90,
  "cacheTtl": 48,
  "headless": true,
  "proxy": null,
  "maxRetries": 3,
  "parallelSolves": 1
}
```

---

## Reset solver

Resets Captcha Solver to defaults.

```
DELETE /api/captcha-solver
```

### Response codes

| Code | Description |
|------|-------------|
| 200 | Solver reset |
| 401 | Authentication required |

### Example request

```bash
curl -X DELETE \
  -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/captcha-solver"
```

---

## Get solver health

Returns health statistics and cached cookies.

```
GET /api/captcha-solver/health
```

### Response schema

```json
{
  "healthy": "boolean",
  "stats": {
    "totalSolves": "integer",
    "successfulSolves": "integer",
    "failedSolves": "integer",
    "successRate": "number",
    "averageSolveTime": "number"
  },
  "cachedDomains": [
    {
      "domain": "string",
      "cachedAt": "string",
      "expiresAt": "string",
      "solveCount": "integer"
    }
  ],
  "lastError": {
    "message": "string",
    "timestamp": "string"
  }
}
```

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/captcha-solver/health"
```

### Example response

```json
{
  "healthy": true,
  "stats": {
    "totalSolves": 150,
    "successfulSolves": 142,
    "failedSolves": 8,
    "successRate": 94.67,
    "averageSolveTime": 12.5
  },
  "cachedDomains": [
    {
      "domain": "tracker.example.com",
      "cachedAt": "2024-06-20T10:00:00Z",
      "expiresAt": "2024-06-21T10:00:00Z",
      "solveCount": 5
    }
  ],
  "lastError": null
}
```

---

## Clear solver stats

Clears solver statistics and cached cookies.

```
DELETE /api/captcha-solver/health
```

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| clearCookies | boolean | No | Also clear cached cookies (default: false) |
| clearStats | boolean | No | Clear statistics (default: true) |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Stats cleared |
| 401 | Authentication required |

### Example request

```bash
curl -X DELETE \
  -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/captcha-solver/health?clearCookies=true"
```

---

## Test solver

Tests captcha solving on a specific URL.

```
POST /api/captcha-solver/test
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url | string | Yes | URL to test challenge solving |
| useCache | boolean | No | Use cached cookies if available (default: true) |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Test completed |
| 400 | Invalid request body |
| 401 | Authentication required |

### Response schema

```json
{
  "success": "boolean",
  "url": "string",
  "solveTime": "number",
  "usedCache": "boolean",
  "challengeDetected": "boolean",
  "challengeType": "string | null",
  "solved": "boolean",
  "error": "string | null"
}
```

### Example request

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{
    "url": "https://tracker.example.com/api",
    "useCache": true
  }' \
  "http://localhost:3000/api/captcha-solver/test"
```

### Example response

```json
{
  "success": true,
  "url": "https://tracker.example.com/api",
  "solveTime": 8.5,
  "usedCache": true,
  "challengeDetected": true,
  "challengeType": "cloudflare_challenge",
  "solved": true,
  "error": null
}
```

### Challenge Types

| Type | Description |
|------|-------------|
| `cloudflare_challenge` | Cloudflare JavaScript challenge |
| `cloudflare_captcha` | Cloudflare CAPTCHA (Turnstile) |
| `hcaptcha` | hCaptcha challenge |
| `recaptcha` | reCaptcha challenge |
| `cf_turnstile` | Cloudflare Turnstile |
| `none` | No challenge detected |

## See Also

- [Captcha Solver Configuration](../../../guides/configure/captcha-solver) — UI-based configuration guide
- [Indexers](../../../guides/configure/indexers) — Indexers that may require captcha solving
- [Troubleshooting](../../../guides/deploy/troubleshooting) — Captcha solver issues
