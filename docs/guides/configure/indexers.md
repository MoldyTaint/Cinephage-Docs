---
title: Configure indexers
description: Add content sources using YAML-based indexer definitions
sidebar_position: 2
tags: [indexers, torrent, usenet, streaming, yaml, configuration, guide]
keywords: [indexers, yaml, torrent, usenet, configuration]
---

# Configure indexers

This guide explains how to add and configure indexers in Cinephage. Indexers are sources that provide information about available media releases.

## Goal

Add content sources (indexers) so Cinephage can search for and find media releases.

## Prerequisites

- Cinephage installed and running
- Accounts with indexers you want to use (if required)
- API keys or credentials for private indexers

## Understanding Indexers

Cinephage uses a **YAML-only** indexer architecture. All indexer configurations are defined in YAML files, providing flexibility and making it easy to add custom indexers. Native TypeScript indexer implementations have been replaced by this unified YAML-based system.

### Dynamic capability discovery

When adding a Newznab or Torznab indexer, Cinephage automatically fetches the indexer's capabilities at `/api?t=caps` to determine supported search parameters. This ensures proper query construction and filtering.

### Supported protocols

Cinephage supports three types of indexers:

| Protocol      | Description              | Examples                                    |
| ------------- | ------------------------ | ------------------------------------------- |
| **torrent**   | BitTorrent trackers      | 1337x, Kinozal, Milkie.cc, RARBG alternatives, private trackers |
| **usenet**    | NNTP newznab indexers    | NZBGeek, DrunkenSlug, DogNZB                |
| **streaming** | Direct streaming sources | Various STRM providers                      |

## Part 1: Add a Newznab Indexer (Usenet)

Newznab is the standard API format for usenet indexers.

### Step 1: get indexer details

You need:

- **Name**: Descriptive name for the indexer
- **URL**: API endpoint URL
- **API Key**: Your personal API key
- **Categories**: Supported categories (Movies, TV)

Example from NZBGeek:

- URL: `https://api.nzbgeek.info/`
- API Key: Found in your profile settings

### Step 2: add to Cinephage

1. Go to **Settings > Integrations > Indexers**
2. Click **Add Indexer**
3. Select **Newznab** from the dropdown
4. Configure:

**Basic Settings:**

- **Name**: `NZBGeek` (or indexer name)
- **URL**: `https://api.nzbgeek.info/`
- **API Key**: Your API key
- **Categories**: Select Movies and/or TV

**Advanced Settings:**

- **Priority**: `25` (lower = higher priority)
- **Timeout**: `30` seconds
- **Retries**: `3`
- **Rate Limit**: Leave default

### Step 3: test connection

Click **Test** to verify the connection works.

If successful, the indexer status shows **Healthy**.

### Step 4: save

Click **Save** to add the indexer.

## Part 2: Add a Torznab/Jackett Indexer (Torrent)

Torznab is a Newznab-compatible API for torrents, typically provided by Jackett or Prowlarr.

### Option a: using Jackett

If you have Jackett running:

1. Open Jackett web UI
2. Add your desired trackers to Jackett
3. Copy the **Torznab Feed** URL for a tracker
4. In Cinephage, add indexer:
   - Select **Torznab** type
   - Paste the Jackett URL
   - Add Jackett API key

### Option b: direct torrent indexer

For public torrent sites, use a YAML definition.

#### Example: adding 1337x

1. Go to **Settings > Integrations > Indexers**
2. Click **Add Indexer**
3. Select **YAML Definition**
4. Use this template:

```yaml
name: 1337x
protocol: torrent
categories:
  - movies
  - tv
enabled: true
priority: 25
settings:
  baseUrl: https://1337x.to
  search:
    path: /search/{{query}}/1/
    selectors:
      rows: tr
      title: .coll-1 a:nth-child(2)
      magnet: .coll-1 a[href^="magnet:"]
      size: .coll-4
      seeders: .coll-2
      leechers: .coll-3
```

5. Click **Validate** to check the YAML syntax
6. Click **Test** to verify it works
7. Click **Save**

## Part 3: Add a Streaming Indexer

For STRM file sources:

```yaml
name: My Streaming Source
protocol: streaming
categories:
  - movies
  - tv
enabled: true
priority: 10
settings:
  baseUrl: https://api.example.com
  apiKey: your-api-key
  timeout: 30
```

## Part 4: Built-in Indexers (v0.5.0+)

Cinephage includes several built-in indexers that require minimal configuration:

### Kinozal

Russian torrent tracker with extensive movie and TV content.

**Setup:**
1. Go to **Settings > Integrations > Indexers**
2. Click **Add Indexer**
3. Select **Kinozal** from the dropdown
4. Configure:
   - **Name**: `Kinozal`
   - **Priority**: `20`
   - **Categories**: Movies, TV
5. Click **Test** and **Save**

:::tip Kinozal Features
- Supports IMDB ID search for accurate matching
- Extensive Russian and international content
- Good for hard-to-find titles
:::

### Milkie.cc (private tracker)

Private torrent tracker with high-quality releases.

**Setup:**
1. Go to **Settings > Integrations > Indexers**
2. Click **Add Indexer**
3. Select **Milkie** from the dropdown
4. Configure:
   - **Name**: `Milkie`
   - **API Key**: Your Milkie API key
   - **Priority**: `15`
   - **Categories**: Movies, TV
5. Click **Test** and **Save**

:::warning Private Tracker
Milkie.cc requires an account and API key. Category IDs are automatically normalized to tracker-native mapping.
:::

## Part 4: Configure Indexer Priority

Priority determines search order (lower number = higher priority):

1. Go to **Settings > Integrations > Indexers**
2. See list of configured indexers
3. Click **Edit** on an indexer
4. Change the **Priority** value:
   - `1-10`: High priority (preferred)
   - `11-25`: Normal priority
   - `26-50`: Low priority (fallback)

### Priority strategy

**Recommended setup:**

- Usenet indexers: Priority `10-15` (faster, more reliable)
- Private trackers: Priority `15-20` (good quality)
- Public trackers: Priority `25-30` (fallback)
- Streaming: Priority `5-10` (instant availability)

## Part 5: Enable/Disable Categories

Configure which content types each indexer searches:

1. Edit an indexer
2. Under **Categories**, check/uncheck:
   - **Movies** - Enable for movie searches
   - **TV** - Enable for TV series searches

**Example:**

- A movies-only indexer: Check Movies, uncheck TV
- A TV-focused indexer: Check TV, uncheck Movies
- General indexer: Check both

## Part 6: Test Search

Verify your indexers work:

1. Go to **Discover**
2. Search for a popular movie
3. Click on it
4. Go to the **Search** tab
5. Click **Search** button
6. Results should appear from your configured indexers

If no results appear:

- Check indexer status in settings
- Verify categories are enabled
- Test individual indexer connections

## YAML Indexer Reference

### Required fields

```yaml
name: Display Name # Human-readable name
protocol: torrent # torrent, usenet, or streaming
categories: # Content types
  - movies
  - tv
enabled: true # true or false
priority: 25 # Search priority (1-50)
```

### Protocol-specific settings

**Torrent:**

```yaml
settings:
  baseUrl: https://site.com
  search:
    path: /search?q={{query}}
    selectors:
      rows: .torrent-row
      title: .title
      magnet: .magnet-link
      torrent: .torrent-link
      size: .size
      seeders: .seeders
      leechers: .leechers
```

**Usenet (Newznab):**

```yaml
settings:
  apiUrl: https://api.indexer.com/
  apiKey: your-api-key
  categories:
    movies: 2000
    tv: 5000
```

**Streaming:**

```yaml
settings:
  baseUrl: https://api.provider.com
  apiKey: your-key
  timeout: 30
```

## Troubleshooting

### Indexer shows "failed"

**Problem:** Status shows failed or error

**Solutions:**

- Check API key is correct
- Verify URL is correct
- Test from Cinephage settings page
- Check indexer site is online
- Verify your account is active

### No search results

**Problem:** Searches return no results

**Solutions:**

- Verify categories are enabled for that indexer
- Check indexer supports the content type
- Try a more popular/searchable title
- Verify indexer is enabled

### Rate limited

**Problem:** "Rate limit exceeded" errors

**Solutions:**

- Reduce search frequency
- Increase rate limit delay in indexer settings
- Check indexer terms of service
- Consider upgrading to premium account

### Authentication failed

**Problem:** 401 or auth errors

**Solutions:**

- Regenerate API key on indexer site
- Check key is copied correctly (no spaces)
- Verify account is in good standing
- Check if IP is whitelisted

## Best Practices

### Diversify indexers

Use multiple indexers for better coverage:

- At least one usenet indexer
- One or two torrent indexers
- Different priority levels

### Regular testing

Test indexers periodically:

- Check status in settings
- Run test searches
- Remove broken indexers
- Add new ones as needed

### Respect rate limits

- Do not exceed indexer API limits
- Use reasonable monitoring intervals
- Consider VIP/premium for heavy usage

### Security

- Never share API keys
- Use read-only keys when available
- Rotate keys periodically
- Monitor account usage

## Next Steps

Now that indexers are configured:

- [Set Up Quality Profiles](quality-profiles) to filter results
- [Search and Download](../use/search-and-download) to find content
- [Configure Subtitles](subtitles) for multi-language support

## See Also

- [YAML Indexer Format Reference](../../reference/yaml/indexer-definitions)
- [Search and Download](../use/search-and-download)
- [Troubleshooting](../deploy/troubleshooting)
