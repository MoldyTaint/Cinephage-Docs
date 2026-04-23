---
title: Indexer definitions
description: YAML format reference for defining custom indexers in Cinephage
sidebar_position: 1
tags: [yaml, indexers, torrent, usenet, streaming, reference]
keywords: [yaml, indexers, torrent, usenet, streaming]
---

# YAML indexer definitions

This reference documents the YAML format for defining custom indexers in Cinephage.

## Overview

Cinephage uses a **unified YAML-only indexer architecture**. All indexers are defined entirely through YAML files — no code changes needed to add new indexers.

### Architecture Features

- **YAML-only definitions** — All indexer logic in declarative YAML files
- **Protocol handlers** — Separate handlers for torrent, usenet, and streaming protocols
- **Dynamic capability discovery** — Automatically fetches `/api?t=caps` to determine supported search parameters
- **Enhanced health tracking** — Tracks consecutive failures with exponential backoff
- **Protocol-specific settings** — Custom columns for torrent, usenet, and streaming configurations

### Protocol Support

| Protocol | Handler | Features |
|----------|---------|----------|
| **Torrent** | `torrent` | Magnet links, .torrent files, CSS selectors |
| **Usenet** | `usenet` | Newznab API, NZB downloads |
| **Streaming** | `streaming` | HLS streams, CORS proxy integration |

### Dynamic Capability Discovery

Newznab-compatible indexers (including UNIT3D trackers) automatically discover capabilities:

```yaml
name: My UNIT3D Tracker
protocol: usenet
categories:
  - movies
  - tv
settings:
  apiUrl: https://tracker.example.com/api
  apiKey: your-api-key
  # Capabilities fetched from /api?t=caps automatically
```

This allows the indexer to:
- Know which search parameters are supported
- Optimize search requests
- Handle different Newznab implementations

## YAML Structure

### Basic Template

```yaml
name: Display Name # Human-readable name (required)
protocol: torrent # torrent, usenet, or streaming (required)
categories: # Supported content types (required)
  - movies
  - tv
enabled: true # Enable/disable (default: true)
priority: 25 # Search priority 1-50 (default: 25)
description: Optional description
settings: # Protocol-specific settings
  # See protocol sections below
```

### Required Fields

| Field        | Type   | Description                                            |
| ------------ | ------ | ------------------------------------------------------ |
| `id`         | string | Unique identifier (alphanumeric, hyphens, underscores) |
| `name`       | string | Display name shown in UI                               |
| `protocol`   | string | `torrent`, `usenet`, or `streaming`                    |
| `categories` | array  | Content types: `movies`, `tv`                          |
| `settings`   | object | Protocol-specific configuration                        |

### Optional Fields

| Field         | Type    | Default | Description                               |
| ------------- | ------- | ------- | ----------------------------------------- |
| `enabled`     | boolean | `true`  | Whether indexer is active                 |
| `priority`    | integer | `25`    | Search priority (lower = higher priority) |
| `description` | string  | -       | Optional description                      |

## Torrent Indexers

### Basic Torrent Definition

```yaml
name: Example Torrent Site
protocol: torrent
categories:
  - movies
  - tv
enabled: true
priority: 20
settings:
  baseUrl: https://example.com
  search:
    path: /search?q={{query}}
    method: GET
  selectors:
    rows: table.results tr
    title: td.title a
    magnet: td.magnet a
    torrent: td.download a
    size: td.size
    seeders: td.seeders
    leechers: td.leechers
    date: td.date
```

### Search Configuration

```yaml
settings:
  baseUrl: https://example.com
  search:
    path: /search?q={{query}}&page={{page}}&category={{category}}
    method: GET
    headers:
      User-Agent: Mozilla/5.0
      Accept: text/html
    cookies:
      session: abc123
```

**Search Variables:**

| Variable       | Description  | Example          |
| -------------- | ------------ | ---------------- |
| `{{query}}`    | Search term  | "Inception 2010" |
| `{{page}}`     | Page number  | 1, 2, 3          |
| `{{category}}` | Category ID  | movies, tv       |
| `{{year}}`     | Release year | 2010             |

### CSS Selectors

Define how to extract data from HTML:

```yaml
selectors:
  rows: string # CSS selector for result rows
  title: string # Title element within row
  magnet: string # Magnet link element
  torrent: string # Torrent file link element
  size: string # File size element
  seeders: string # Seeders count element
  leechers: string # Leechers count element
  date: string # Upload date element
  category: string # Category element
```

**Selector Examples:**

```yaml
selectors:
  rows: tr.result-row
  title: td.name a
  magnet: a[href^="magnet:"]
  torrent: a[href$=".torrent"]
  size: td.size text() # Extract text content
  seeders: td.peers span.seeders
```

### Attribute Extraction

Extract specific attributes:

```yaml
selectors:
  magnet:
    selector: a.magnet-link
    attribute: href # Extract href attribute

  title:
    selector: a.title
    attribute: title # Extract title attribute

  size:
    selector: td.size
    regex: '(\d+\.?\d*)\s*(GB|MB|KB)' # Extract with regex
```

### Authentication

For sites requiring login:

```yaml
settings:
  baseUrl: https://example.com
  auth:
    type: cookie
    cookies:
      uid: your-user-id
      pass: your-pass-key

  # Or using headers
  search:
    headers:
      Authorization: Bearer YOUR_API_KEY
      X-API-Key: YOUR_KEY
```

### Advanced: Login Flow

For sites requiring form login:

```yaml
settings:
  baseUrl: https://example.com
  auth:
    type: form
    loginUrl: /login
    usernameField: username
    passwordField: password
    submitButton: input[type="submit"]
    successCheck: .user-profile # Element that exists after login
```

## Usenet Indexers (Newznab)

### Standard Newznab

```yaml
name: NZBGeek
protocol: usenet
categories:
  - movies
  - tv
settings:
  apiUrl: https://api.nzbgeek.info/
  apiKey: your-api-key
  categories:
    movies: 2000
    tv: 5000
  timeout: 30
  retries: 3
```

### Newznab Settings

```yaml
settings:
  apiUrl: string # API endpoint URL
  apiKey: string # Your API key
  username: string # Username (if required)
  password: string # Password (if required)

  categories: # Category mappings
    movies: integer # Movies category ID
    tv: integer # TV category ID

  timeout: integer # Request timeout seconds (default: 30)
  retries: integer # Retry attempts (default: 3)
  rateLimit: integer # Requests per minute (optional)
```

### Common Newznab Categories

| ID   | Category       |
| ---- | -------------- |
| 2000 | Movies         |
| 2010 | Movies/Foreign |
| 2040 | Movies/HD      |
| 2050 | Movies/BluRay  |
| 2060 | Movies/3D      |
| 5000 | TV             |
| 5040 | TV/HD          |
| 5050 | TV/Foreign     |
| 5080 | TV/Documentary |

## Streaming Indexers

### Basic Streaming Definition

```yaml
name: Example Streaming
protocol: streaming
categories:
  - movies
  - tv
settings:
  baseUrl: https://api.example.com
  apiKey: your-api-key
  timeout: 30
  endpoints:
    search: /v1/search
    resolve: /v1/resolve
```

### Streaming Settings

```yaml
settings:
  baseUrl: string # Base API URL
  apiKey: string # API key
  apiSecret: string # API secret (if required)

  timeout: integer # Request timeout seconds (default: 30)

  endpoints: # API endpoints
    search: string # Search endpoint
    resolve: string # Stream resolution endpoint

  headers: # Custom headers
    X-Custom-Header: value
```

## Torznab Indexers (via Jackett/Prowlarr)

```yaml
name: 1337x via Jackett
protocol: torrent
categories:
  - movies
  - tv
settings:
  apiUrl: http://jackett:9117/api/v2.0/indexers/1337x/results/torznab/
  apiKey: your-jackett-api-key
  categories:
    movies: 2000
    tv: 5000
```

## Practical Examples

This section provides complete, working indexer definitions demonstrating common patterns and configurations.

### Example 1: Basic Public Tracker

Public tracker with simple search form and no authentication.

**When to use this pattern:**
- Open torrent sites accessible without login
- Sites using standard HTML table layouts
- Public domain or open trackers

```yaml
# Basic public torrent tracker
# 1337x.to - Simple search with table results
name: 1337x
protocol: torrent
categories:
  - movies
  - tv
priority: 25
settings:
  baseUrl: https://1337x.to
  search:
    # {{query}} is URL-encoded automatically
    path: /search/{{query}}/1/
    method: GET
  selectors:
    # Each row in the results table
    rows: table.table-list tbody tr
    # Second link in the name column (first is category)
    title: td.name a:nth-child(2)
    # Direct magnet link
    magnet: td.coll-1 a[href^="magnet:"]
    # Size column text
    size: td.size
    # Seeders count
    seeders: td.seeds
    # Leechers count
    leechers: td.leeches
    # Upload date
    date: td.date
```

### Example 2: Private Tracker with Authentication

Private tracker requiring cookie-based authentication.

**When to use this pattern:**
- Private trackers requiring login
- Sites with cookie/session-based auth
- When API keys are not available

```yaml
# Private tracker with cookie authentication
# Requires session cookies from browser
name: Private Tracker
protocol: torrent
categories:
  - movies
  - tv
priority: 10
settings:
  baseUrl: https://tracker.example.com
  auth:
    type: cookie
    cookies:
      # Get these from browser dev tools after logging in
      uid: 12345
      pass: abcdef1234567890
      session: xyz789
  search:
    path: /torrents.php?search={{query}}&category={{category}}
    headers:
      # Some sites check User-Agent
      User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
  selectors:
    rows: table.torrents tr.torrent
    title: td.name a
    # Direct .torrent download link
    torrent: td.download a
    size: td.size
    seeders: td.seeders
    leechers: td.leechers
    date: td.date
```

### Example 3: Usenet Indexer (Newznab API)

Standard Newznab-compatible usenet indexer.

**When to use this pattern:**
- Newznab-compatible sites (NZBGeek, DrunkenSlug, etc.)
- UNIT3D-based private trackers with API
- Any site supporting Newznab standard

```yaml
# Usenet indexer using Newznab API
# NZBGeek - Newznab-compatible
name: NZBGeek
protocol: usenet
categories:
  - movies
  - tv
priority: 5
settings:
  # API endpoint (trailing slash required for some)
  apiUrl: https://api.nzbgeek.info/
  # Your personal API key from account settings
  apiKey: YOUR_API_KEY_HERE
  # Category mapping to Newznab IDs
  categories:
    movies: 2000
    tv: 5000
  # Connection settings
  timeout: 30
  retries: 3
  rateLimit: 60  # Max requests per minute
```

### Example 4: Torznab via Jackett

Torrent indexer accessed through Jackett's Torznab API.

**When to use this pattern:**
- Accessing trackers through Jackett/Prowlarr
- Unified API for multiple torrent sources
- When direct access is not possible

```yaml
# Torznab indexer via Jackett
# Accesses torrent sites through Jackett's API
name: 1337x via Jackett
protocol: torrent
categories:
  - movies
  - tv
priority: 15
settings:
  # Jackett torznab endpoint for specific indexer
  apiUrl: http://jackett:9117/api/v2.0/indexers/1337x/results/torznab/
  # Jackett API key from Jackett UI
  apiKey: your-jackett-api-key
  categories:
    movies: 2000
    tv: 5000
  timeout: 30
```

### Example 5: Advanced Multi-Page Search

Indexer with pagination support and complex selectors.

**When to use this pattern:**
- Sites with paginated results
- Complex HTML structures
- When extracting additional metadata

```yaml
# Advanced tracker with pagination and complex selectors
name: Advanced Tracker
protocol: torrent
categories:
  - movies
  - tv
settings:
  baseUrl: https://tracker.example.com
  search:
    # Page variable for pagination
    path: /search?q={{query}}&p={{page}}&cat={{category}}
    method: GET
  selectors:
    rows: div.torrent-row
    # Extract title from data attribute
    title:
      selector: a.torrent-title
      attribute: data-title
    # Extract magnet from href
    magnet:
      selector: a[href^="magnet:"]
      attribute: href
    # Extract size with regex
    size:
      selector: span.size
      regex: '([\d.]+\s*[GMTK]B)'
    # Extract seeders, remove non-numeric
    seeders:
      selector: span.seeders
      regex: '(\d+)'
    # Category extraction
    category:
      selector: span.category
      attribute: data-category
```

### Example 6: Special Date Parsing

Indexer with custom date format parsing.

**When to use this pattern:**
- Non-standard date formats
- Relative dates ("2 hours ago")
- Multiple date formats on same site

```yaml
# Tracker with custom date parsing
name: Date Format Tracker
protocol: torrent
categories:
  - movies
  - tv
settings:
  baseUrl: https://tracker.example.com
  search:
    path: /search?q={{query}}
  selectors:
    rows: tr.result
    title: td.title a
    magnet: td.magnet a
    size: td.size
    seeders: td.seeders
    # Date with multiple format support
    date:
      selector: td.date
      # Supports common formats automatically
      # ISO 8601: 2024-01-15
      # US: 01/15/2024
      # European: 15/01/2024
      # Unix timestamp
      # Relative: "2 hours ago", "Yesterday"
```

### Example 7: UNIT3D Private Tracker

UNIT3D-based private tracker with full API support.

**When to use this pattern:**
- Modern private trackers using UNIT3D
- API-based authentication
- Dynamic capability discovery

```yaml
# UNIT3D private tracker with Newznab API
# OldToons.World - Classic animation tracker
name: OldToons.World
protocol: usenet
categories:
  - tv
enabled: true
priority: 15
description: Private UNIT3D tracker for classic animated content
settings:
  apiUrl: https://oldtoons.world/api
  apiKey: YOUR_API_KEY_HERE
  categories:
    tv: 5000
  timeout: 30
  retries: 3
  rateLimit: 60
```

### Example 8: Streaming Provider

Basic streaming service indexer.

**When to use this pattern:**
- HLS/DASH streaming services
- API-based content providers
- Sites requiring stream resolution

```yaml
# Streaming provider with API
name: Streaming Provider
protocol: streaming
categories:
  - movies
  - tv
priority: 5
settings:
  baseUrl: https://api.streaming.example.com
  apiKey: YOUR_API_KEY
  timeout: 30
  endpoints:
    # Search for content
    search: /v1/search
    # Resolve stream URLs
    resolve: /v1/resolve
```

## Common Patterns

This section describes recurring patterns across indexer definitions.

### Authentication Methods

#### Cookie Authentication

For sites requiring session cookies.

```yaml
auth:
  type: cookie
  cookies:
    uid: "your-user-id"
    pass: "your-pass-key"
    session: "session-token"
```

#### Form Login

For sites with traditional login forms.

```yaml
auth:
  type: form
  loginUrl: /login
  usernameField: username
  passwordField: password
  submitButton: input[type="submit"]
  successCheck: .user-profile
```

#### API Key Authentication

For API-based access.

```yaml
# In search headers
search:
  headers:
    Authorization: Bearer YOUR_API_KEY
    X-API-Key: YOUR_KEY

# Or in settings
settings:
  apiKey: YOUR_API_KEY
```

### Search Field Mapping

Map Cinephage search parameters to indexer fields.

| Cinephage Field | Variable | Example Value |
|----------------|----------|---------------|
| Search query | `{{query}}` | "Inception 2010" |
| Page number | `{{page}}` | 1, 2, 3 |
| Category | `{{category}}` | 2000, 5000 |
| Year | `{{year}}` | 2010 |

**URL construction:**

```yaml
search:
  # Basic keyword search
  path: /search?q={{query}}
  
  # With pagination
  path: /search?q={{query}}&p={{page}}
  
  # With category filtering
  path: /search?q={{query}}&cat={{category}}&page={{page}}
  
  # Complex with all parameters
  path: /browse?search={{query}}&category={{category}}&page={{page}}&year={{year}}
```

### Result Extraction

Standard fields to extract from search results.

```yaml
selectors:
  # Required fields
  rows: string           # Container for each result
  title: string          # Release name/title
  
  # At least one download method required
  magnet: string         # Magnet link
  torrent: string        # Direct .torrent link
  
  # Optional metadata
  size: string           # File size (e.g., "1.5 GB")
  seeders: string        # Number of seeders
  leechers: string       # Number of leechers
  date: string           # Upload date
  category: string       # Content category
```

**Download link priority:**
1. `magnet` - Preferred for torrents
2. `torrent` - Direct .torrent file
3. `download` - Generic download link

### Date Parsing Formats

Cinephage automatically parses common date formats.

| Format | Example | Notes |
|--------|---------|-------|
| ISO 8601 | `2024-01-15T10:30:00Z` | Full timestamp |
| Date only | `2024-01-15` | YYYY-MM-DD |
| US format | `01/15/2024` | MM/DD/YYYY |
| European | `15/01/2024` | DD/MM/YYYY |
| Unix timestamp | `1705315800` | Seconds since epoch |
| Relative | `2 hours ago` | Automatically converted |

### Category Mapping

Map content types to indexer category IDs.

```yaml
# For Newznab/Torznab
settings:
  categories:
    movies: 2000
    tv: 5000

# For torrent sites
settings:
  search:
    path: /browse?cat={{category}}
  categories:
    movies: "movies"      # String categories
    tv: "tv-shows"
```

**Common category IDs:**

| Type | Newznab ID | Description |
|------|------------|-------------|
| Movies | 2000 | All movies |
| Movies/HD | 2040 | HD movies |
| Movies/BluRay | 2050 | BluRay releases |
| TV | 5000 | All TV |
| TV/HD | 5040 | HD TV episodes |
| TV/Documentary | 5080 | Documentaries |

### Handling Pagination

Configure multi-page search results.

```yaml
search:
  # Page variable in URL
  path: /search?q={{query}}&p={{page}}
  
  # Or offset-based
  path: /search?q={{query}}&offset={{page}}0  # page * 10
  
  # Or page size parameter
  path: /search?q={{query}}&page={{page}}&limit=50
```

**Page variable behavior:**
- Starts at 1 for most sites
- Incremented automatically for additional results
- Used only when more results are needed

### Error Handling

Cinephage handles common error scenarios automatically.

| Error | Behavior | Configurable |
|-------|----------|--------------|
| HTTP 4xx/5xx | Automatic retry with backoff | Yes (retries) |
| Timeout | Retry with exponential backoff | Yes (timeout) |
| Parse error | Log and skip result | No |
| Empty results | Continue to next indexer | No |
| Auth failure | Mark indexer unhealthy | No |

**Configuration:**

```yaml
settings:
  timeout: 30      # Seconds before timeout
  retries: 3       # Number of retry attempts
  rateLimit: 60    # Max requests per minute
```

## Complete Examples

### Example 1: Public Torrent Tracker

```yaml
name: 1337x
protocol: torrent
categories:
  - movies
  - tv
priority: 25
settings:
  baseUrl: https://1337x.to
  search:
    path: /search/{{query}}/1/
    method: GET
  selectors:
    rows: table.table-list tbody tr
    title: td.name a:nth-child(2)
    magnet: td.coll-1 a[href^="magnet:"]
    size: td.size
    seeders: td.seeds
    leechers: td.leeches
    date: td.date
```

### Example 2: Private Tracker with Login

```yaml
name: Private Tracker
protocol: torrent
categories:
  - movies
  - tv
priority: 10
settings:
  baseUrl: https://tracker.example.com
  auth:
    type: cookie
    cookies:
      uid: 12345
      pass: abcdef1234567890
  search:
    path: /torrents.php?search={{query}}&category={{category}}
  selectors:
    rows: table.torrents tr.torrent
    title: td.name a
    torrent: td.download a
    size: td.size
    seeders: td.seeders
    leechers: td.leechers
```

### Example 3: Usenet Indexer

```yaml
name: NZBGeek
protocol: usenet
categories:
  - movies
  - tv
priority: 5
settings:
  apiUrl: https://api.nzbgeek.info/
  apiKey: YOUR_API_KEY_HERE
  categories:
    movies: 2000
    tv: 5000
  timeout: 30
  retries: 3
```

### Example 4: Streaming Provider

```yaml
name: My Streaming Service
protocol: streaming
categories:
  - movies
  - tv
priority: 5
settings:
  baseUrl: https://api.streaming.example.com
  apiKey: YOUR_API_KEY
  timeout: 30
  endpoints:
    search: /v1/search
    resolve: /v1/resolve
```

### Example 5: UNIT3D Private Tracker (OldToons.World)

```yaml
name: OldToons.World
protocol: usenet
categories:
  - tv
enabled: true
priority: 15
description: Private UNIT3D tracker for classic animated content
settings:
  apiUrl: https://oldtoons.world/api
  apiKey: YOUR_API_KEY_HERE
  categories:
    tv: 5000
  timeout: 30
  retries: 3
  rateLimit: 60
```

**UNIT3D Tracker Notes:**

- Uses Newznab-compatible API
- Requires API key authentication
- Supports `name` and `search` query parameters
- Dynamic capability discovery from `/api?t=caps`

## Testing Indexers

### Validate YAML Syntax

Before adding to Cinephage, validate YAML:

```bash
# Using Python
python3 -c "import yaml; yaml.safe_load(open('indexer.yaml'))"

# Or online validators
# https://yaml-online-parser.appspot.com/
```

### Test Selectors

Use browser DevTools to test CSS selectors:

1. Open the site in browser
2. Press F12 for DevTools
3. In Console tab, test:
   ```javascript
   document.querySelectorAll('table.results tr');
   ```

### Add to Cinephage

1. Go to **Settings > Integrations > Indexers**
2. Click **Add Indexer**
3. Select **YAML Definition**
4. Paste your YAML
5. Click **Validate**
6. Click **Test**
7. Click **Save**

## Troubleshooting

### YAML Parse Errors

**Problem:** "Invalid YAML" error

**Solutions:**

- Check indentation (spaces, not tabs)
- Validate YAML syntax online
- Check for special characters in strings
- Use quotes around strings with colons

### Selector Not Found

**Problem:** No results from working site

**Solutions:**

- Test selectors in browser DevTools
- Check if site uses JavaScript rendering
- Verify selector matches actual HTML
- Try more specific selectors

### Authentication Fails

**Problem:** 401 or login errors

**Solutions:**

- Verify credentials/cookies
- Check if site requires 2FA
- Try different auth type
- Check if IP is whitelisted

### Empty Results

**Problem:** Test succeeds but no search results

**Solutions:**

- Check if search term works on site directly
- Verify category parameters
- Check if site requires specific search format
- Try different query variables

## Best Practices

### Naming Conventions

- Use descriptive IDs: `nyaa` not `indexer1`
- Keep names concise but clear
- Use consistent casing

### Priority Guidelines

| Priority | Use Case                       |
| -------- | ------------------------------ |
| 1-10     | Primary, high-quality indexers |
| 11-20    | Good indexers, regular use     |
| 21-30    | Backup indexers                |
| 31-50    | Fallback, public trackers      |

### Categories

Only enable categories the indexer supports:

- Movies: Movie releases
- TV: TV series releases
- Both: General indexers

### Security

- Never commit API keys to version control
- Use environment variables for sensitive data
- Rotate API keys periodically
- Use read-only keys when available

## See Also

- [How to Configure Indexers](../../guides/configure/indexers) - Step-by-step guide for adding and configuring indexers
- [Naming Tokens Reference](naming-tokens) - Token reference for file naming patterns
- [Search and Download](../../guides/use/search-and-download) - Guide to using indexers for searches
- [YAML Specification](https://yaml.org/spec/) - Official YAML specification
- [CSS Selector Reference](https://developer.mozilla.org/en-US/Web/CSS/CSS_Selectors) - MDN CSS selector documentation
