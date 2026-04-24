---
title: Search
description: API endpoints for searching releases and media
sidebar_position: 3
tags: [api, search, download, releases, endpoints, reference]
keywords: [api, search, download, releases, endpoints]
---

# Search

Endpoints for searching releases across configured indexers.

## Authentication

All search endpoints require authentication.

| Endpoint | Auth Level |
|----------|------------|
| GET `/api/search` | requireAuth |
| POST `/api/download/grab` | requireAuth |

---

## Search releases

Performs a multi-indexer search for releases matching the query parameters.

```
GET /api/search
```

### Request parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | No | Search query string |
| type | string | No | Media type (movie, tv) |
| tmdbId | integer | No | TMDB ID to search for |
| tvdbId | integer | No | TVDB ID for TV series |
| seriesId | string | No | Series UUID to search for |
| movieId | string | No | Movie UUID to search for |
| seasonNumber | integer | No | Season number (TV only) |
| episodeNumber | integer | No | Episode number (TV only) |
| indexers | string | No | Comma-separated indexer IDs |
| categories | string | No | Comma-separated category IDs |
| minSeeders | integer | No | Minimum seeders (torrent) |
| maxAge | integer | No | Maximum age in days |
| limit | integer | No | Maximum results (default: 100) |

### Query types

| Type | Required parameters | Description |
|------|---------------------|-------------|
| `manual` | query | Free-form search |
| `movie` | movieId or tmdbId | Search for specific movie |
| `tv` | seriesId or tmdbId | Search for TV series |
| `episode` | seriesId, seasonNumber, episodeNumber | Search specific episode |

### Response codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Invalid parameters |
| 401 | Authentication required |
| 404 | Movie/series not found |

### Response schema

```json
{
  "releases": [
    {
      "guid": "string",
      "title": "string",
      "size": "integer",
      "indexer": "string",
      "indexerId": "string",
      "publishDate": "string",
      "downloadUrl": "string",
      "infoUrl": "string",
      "category": ["string"],
      "seeders": "integer",
      "leechers": "integer",
      "protocol": "string",
      "quality": {
        "quality": "string",
        "resolution": "string",
        "source": "string",
        "modifier": "string"
      },
      "qualityScore": "integer",
      "customFormatScore": "integer",
      "rejections": ["string"],
      "approved": "boolean",
      "releaseGroup": "string",
      "language": "string",
      "mappedMovie": {
        "id": "string",
        "title": "string",
        "year": "integer"
      },
      "mappedSeries": {
        "id": "string",
        "title": "string"
      },
      "mappedEpisode": {
        "seasonNumber": "integer",
        "episodeNumber": "integer"
      }
    }
  ],
  "indexerResults": [
    {
      "indexerId": "string",
      "indexerName": "string",
      "resultCount": "integer",
      "status": "string",
      "errorMessage": "string"
    }
  ],
  "totalResults": "integer",
  "searchDuration": "number",
  "searchTime": "string"
}
```

### Release quality fields

| Field | Description | Values |
|-------|-------------|--------|
| `quality` | Quality name | Bluray-1080p, WEBDL-720p, HDTV-1080p, etc. |
| `resolution` | Video resolution | 480p, 720p, 1080p, 2160p |
| `source` | Media source | Bluray, WEB, HDTV, DVD |
| `modifier` | Quality modifier | REMUX, x265, HDR, DV |

### Rejection reasons

| Reason | Description |
|--------|-------------|
| `Unknown movie` | Cannot map to library movie |
| `Unknown series` | Cannot map to library series |
| `Unknown episode` | Cannot map to specific episode |
| `Release rejected` | Does not meet quality requirements |
| `Custom format cut-off unmet` | Below custom format score threshold |
| `Release is blacklisted` | In blacklist |

### Example request

```bash
curl -H "x-api-key: cinephage_your_key_here" \
  "http://localhost:3000/api/search?movieId=550e8400-e29b-41d4-a716-446655440000&limit=10"
```

### Example response

```json
{
  "releases": [
    {
      "guid": "Indexer1-12345",
      "title": "Inception.2010.1080p.BluRay.x264-Group",
      "size": 10485760000,
      "indexer": "Indexer1",
      "indexerId": "a10e8400-e29b-41d4-a716-446655440010",
      "publishDate": "2024-01-15T08:00:00Z",
      "downloadUrl": "https://example.com/download/12345",
      "infoUrl": "https://example.com/details/12345",
      "category": ["Movies", "HD"],
      "seeders": 150,
      "leechers": 12,
      "protocol": "torrent",
      "quality": {
        "quality": "Bluray-1080p",
        "resolution": "1080p",
        "source": "Bluray",
        "modifier": "x264"
      },
      "qualityScore": 100,
      "customFormatScore": 1500,
      "rejections": [],
      "approved": true,
      "releaseGroup": "Group",
      "language": "English",
      "mappedMovie": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "Inception",
        "year": 2010
      }
    }
  ],
  "indexerResults": [
    {
      "indexerId": "a10e8400-e29b-41d4-a716-446655440010",
      "indexerName": "Indexer1",
      "resultCount": 15,
      "status": "success",
      "errorMessage": null
    }
  ],
  "totalResults": 15,
  "searchDuration": 2.345,
  "searchTime": "2024-01-15T10:30:00Z"
}
```

---

## Grab release

Downloads a specific release to the download client.

```
POST /api/download/grab
```

### Request body schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| guid | string | Yes | Release GUID from search |
| indexerId | string | Yes | Indexer ID |
| movieId | string | No | Movie UUID (for movies) |
| seriesId | string | No | Series UUID (for TV) |
| seasonNumber | integer | No | Season number (TV) |
| episodeIds | array | No | Episode UUIDs (TV) |

### Response codes

| Code | Description |
|------|-------------|
| 201 | Grab successful |
| 400 | Invalid request |
| 401 | Authentication required |
| 404 | Release or media not found |
| 409 | Release already grabbed |

### Response schema

```json
{
  "success": "boolean",
  "downloadId": "string",
  "queueId": "string",
  "title": "string",
  "message": "string"
}
```

### Example request

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: cinephage_your_key_here" \
  -d '{
    "guid": "Indexer1-12345",
    "indexerId": "a10e8400-e29b-41d4-a716-446655440010",
    "movieId": "550e8400-e29b-41d4-a716-446655440000"
  }' \
  http://localhost:3000/api/download/grab
```

### Example response

```json
{
  "success": true,
  "downloadId": "dl_550e8400-e29b-41d4-a716-446655440020",
  "queueId": "q_550e8400-e29b-41d4-a716-446655440021",
  "title": "Inception.2010.1080p.BluRay.x264-Group",
  "message": "Release sent to download client"
}
```

---

## Scoring and ranking

### Quality score

Quality scores range from 0 to 100, with higher values indicating better quality.

| Quality | Score |
|---------|-------|
| Bluray-2160p | 100 |
| WEBDL-2160p | 90 |
| Bluray-1080p | 80 |
| WEBDL-1080p | 70 |
| HDTV-1080p | 60 |
| Bluray-720p | 50 |
| WEBDL-720p | 40 |
| HDTV-720p | 30 |
| DVD | 20 |
| SDTV | 10 |

### Custom format score

Custom format scores are calculated based on matching conditions:

| Field | Description |
|-------|-------------|
| `customFormatScore` | Total score from all matching Custom Formats |
| `rejections` | Reasons if score is below cutoff |

### Release approval

A release is `approved` when:
- It maps to a library movie/episode
- It meets quality requirements
- It meets custom format score cutoff
- It is not blacklisted

---

## Search providers

Cinephage supports searching across multiple indexer types:

| Type | Protocols | Description |
|------|-----------|-------------|
| Usenet | NZB | Newznab-compatible indexers |
| Torrent | Magnet, Torrent file | Torznab and RSS indexers |
| Live TV | M3U | Live TV sources |

---

## See Also

- [Movies](movies) — Movie library endpoints
- [TV](tv) — TV series and episode endpoints
- [Download](download) — Queue and download management