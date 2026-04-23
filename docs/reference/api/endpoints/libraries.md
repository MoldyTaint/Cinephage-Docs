---
title: Libraries
description: API endpoints for managing custom libraries
sidebar_position: 10
tags: [api, libraries, library, endpoints, reference]
keywords: [api, libraries, library, endpoints]
---

# Libraries

Endpoints for managing custom libraries in Cinephage. Libraries are collections that organize media content with their own settings.

## Authentication

All library endpoints require authentication via session cookie or API key.

| Endpoint | Auth Level |
|----------|------------|
| GET `/api/libraries` | requireAuth |
| POST `/api/libraries` | requireAuth |
| GET `/api/libraries/:id` | requireAuth |
| PUT `/api/libraries/:id` | requireAuth |
| DELETE `/api/libraries/:id` | requireAuth |

---

## List libraries

Returns all configured libraries.

```
GET /api/libraries
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
  "libraries": [
    {
      "id": "string",
      "name": "string",
      "type": "movies | tv",
      "rootFolderId": "string",
      "qualityProfileId": "string",
      "languageProfileId": "string",
      "enabled": "boolean",
      "monitored": "boolean",
      "itemCount": "integer",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/libraries"
```

### Example response

```json
{
  "libraries": [
    {
      "id": "lib_1a2b3c4d",
      "name": "Movies",
      "type": "movies",
      "rootFolderId": "rf_abc123",
      "qualityProfileId": "qp_xyz789",
      "languageProfileId": "lp_eng001",
      "enabled": true,
      "monitored": true,
      "itemCount": 245,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-06-20T14:45:00Z"
    }
  ]
}
```

---

## Get library

Returns a specific library by ID.

```
GET /api/libraries/:id
```

### Request parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Library ID |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Authentication required |
| 404 | Library not found |

### Response schema

```json
{
  "id": "string",
  "name": "string",
  "type": "movies | tv",
  "rootFolderId": "string",
  "rootFolder": {
    "id": "string",
    "name": "string",
    "path": "string"
  },
  "qualityProfileId": "string",
  "qualityProfile": {
    "id": "string",
    "name": "string"
  },
  "languageProfileId": "string",
  "languageProfile": {
    "id": "string",
    "name": "string"
  },
  "enabled": "boolean",
  "monitored": "boolean",
  "backfillEnabled": "boolean",
  "backfillStatus": "idle | running | completed | failed",
  "itemCount": "integer",
  "lastScanAt": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/libraries/lib_1a2b3c4d"
```

---

## Create library

Creates a new custom library.

```
POST /api/libraries
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Library display name |
| type | string | Yes | Media type: `movies` or `tv` |
| rootFolderId | string | Yes | Root folder ID for storage |
| qualityProfileId | string | No | Default quality profile ID |
| languageProfileId | string | No | Default language profile ID |
| enabled | boolean | No | Enable library (default: true) |
| monitored | boolean | No | Enable monitoring (default: true) |
| backfillEnabled | boolean | No | Enable backfill on creation |

### Response codes

| Code | Description |
|------|-------------|
| 201 | Library created |
| 400 | Invalid request body |
| 401 | Authentication required |
| 409 | Library with same name exists |

### Example request

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{
    "name": "Anime",
    "type": "tv",
    "rootFolderId": "rf_abc123",
    "qualityProfileId": "qp_xyz789",
    "languageProfileId": "lp_jpn001",
    "enabled": true,
    "monitored": true
  }' \
  "http://localhost:3000/api/libraries"
```

### Example response

```json
{
  "id": "lib_new12345",
  "name": "Anime",
  "type": "tv",
  "rootFolderId": "rf_abc123",
  "qualityProfileId": "qp_xyz789",
  "languageProfileId": "lp_jpn001",
  "enabled": true,
  "monitored": true,
  "backfillEnabled": false,
  "itemCount": 0,
  "createdAt": "2024-06-20T14:45:00Z"
}
```

---

## Update library

Updates an existing library.

```
PUT /api/libraries/:id
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | No | Library display name |
| qualityProfileId | string | No | Default quality profile ID |
| languageProfileId | string | No | Default language profile ID |
| enabled | boolean | No | Enable/disable library |
| monitored | boolean | No | Enable/disable monitoring |
| backfillEnabled | boolean | No | Enable/disable backfill |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Library updated |
| 400 | Invalid request body |
| 401 | Authentication required |
| 404 | Library not found |

### Example request

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{
    "qualityProfileId": "qp_new456",
    "monitored": false
  }' \
  "http://localhost:3000/api/libraries/lib_1a2b3c4d"
```

---

## Delete library

Deletes a library. Media items in the library are not deleted but become orphaned.

```
DELETE /api/libraries/:id
```

### Request parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Library ID |

### Query parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| removeFiles | boolean | No | Also delete media files (default: false) |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Library deleted |
| 401 | Authentication required |
| 404 | Library not found |

### Example request

```bash
curl -X DELETE \
  -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/libraries/lib_1a2b3c4d"
```

### Example response

```json
{
  "success": true,
  "id": "lib_1a2b3c4d",
  "orphanedItems": 45
}
```

:::warning Orphaned Items
When a library is deleted, media items remain in the database but are no longer associated with a library. Set `removeFiles=true` to also delete the actual media files.
:::

## Library Storage Management

### Trigger Storage Backfill

Initiates a backfill of media into the library from its root folder:

```
POST /api/libraries/:id/backfill
```

### Response schema

```json
{
  "success": true,
  "taskId": "task_abc123",
  "estimatedItems": 120
}
```

## See Also

- [Movies](movies) — Movie library endpoints
- [TV](tv) — TV series library endpoints
- [Settings](settings) — System configuration endpoints
