---
title: Settings Explained
sidebar_position: 2
description: Comprehensive reference for all Cinephage settings configured through the web interface
---

# Settings Explained

This reference provides detailed explanations of all settings available in Cinephage's web interface. For environment variables (Docker/command-line configuration), see [Environment Variables](./environment-variables).

## Overview

Cinephage settings are organized into categories accessible from the **Settings** menu:

| Category | Purpose |
|----------|---------|
| **General** | Core application settings |
| **Media Management** | Root folders, file naming, import behavior |
| **Profiles** | Quality profiles, language profiles, custom formats |
| **Integrations** | Download clients, indexers, subtitle providers, notifications |
| **Tasks** | Monitoring task configuration |
| **Live TV** | IPTV provider configuration |

---

## General Settings

### Basic Configuration

#### TMDB API Key

**Path:** `Settings > General > TMDB API Key`

Your API key from [The Movie Database](https://www.themoviedb.org/). Required for fetching movie and TV show metadata.

- **Format:** 32-character alphanumeric string
- **Required:** Yes
- **Default:** None

:::tip Getting an API Key
1. Create a free account at themoviedb.org
2. Go to Settings > API
3. Click "Request an API Key"
4. Select "Developer"
5. Fill in the application details
6. Copy the "API Key" (not the Read Access Token)
:::

#### External URL

**Path:** `Settings > General > External URL`

The public-facing URL for your Cinephage instance. Used for generating external links and webhook callbacks.

- **Format:** Full URL with protocol
- **Examples:**
  - `http://192.168.1.100:3000`
  - `https://cinephage.yourdomain.com`
- **Required:** No

:::note
If not set, Cinephage uses the `BETTER_AUTH_URL` environment variable or infers from incoming requests.
:::

### Security

#### Authentication

**Path:** `Settings > General > Security`

Configure user authentication settings:

| Setting | Description | Default |
|---------|-------------|---------|
| **Require Authentication** | Force login for all users | Enabled |
| **Session Duration** | How long users stay logged in | 7 days |
| **Password Requirements** | Minimum password complexity | 8 characters |

---

## Media Management

### Root Folders

**Path:** `Settings > Media Management > Root Folders`

Root folders define where Cinephage stores your media library. You need at least one root folder for movies and one for TV shows.

| Property | Description | Example |
|----------|-------------|---------|
| **Name** | Display name for the folder | "Movies", "TV Shows" |
| **Path** | Absolute path inside container | `/media/movies` |

:::warning Docker Paths
When using Docker, use the **container path**, not the host path:
- ✅ Correct: `/media/movies` (if mounted as `/media`)
- ❌ Incorrect: `/mnt/media/movies` (host path)
:::

#### Adding Root Folders

1. Click **Add Root Folder**
2. Enter a descriptive name
3. Enter the container path
4. Select the media type (Movies or TV)
5. Choose default quality profile
6. Click **Save**

:::caution Important
- Ensure Cinephage has read/write permissions
- Do not nest root folders (don't put TV inside Movies)
- Each root folder should be on a separate mount point
:::

### File Naming

**Path:** `Settings > Media Management > Naming`

Configure how files and folders are named when importing or organizing media.

#### Folder Naming Pattern

Template used for creating media folders:

```
{Movie Title} ({Release Year})
```

**Available Tokens:**

| Token | Description | Example |
|-------|-------------|---------|
| `{Movie Title}` | Full movie title | "The Matrix" |
| `{Release Year}` | Release year | "1999" |
| `{IMDb Id}` | IMDb identifier | "tt0133093" |
| `{TMDB Id}` | TMDB identifier | "603" |

#### File Naming Pattern

Template used for renaming media files:

```
{Movie Title} ({Release Year}) - {Quality} - {Group}
```

**Available Tokens:**

| Token | Description | Example |
|-------|-------------|---------|
| `{Quality}` | Quality string | "1080p BluRay" |
| `{Group}` | Release group | "YIFY" |
| `{Edition}` | Edition tag | "Director's Cut" |
| `{Codec}` | Video codec | "x264" |
| `{Audio}` | Audio codec | "DTS" |

:::tip Custom Naming
You can combine tokens to create complex naming schemes:
```
{Movie Title} ({Release Year}) [{Quality}][{Codec}]-{Group}
```
:::

### Import Behavior

**Path:** `Settings > Media Management > Import`

Configure how Cinephage handles file imports:

| Setting | Description | Options |
|---------|-------------|---------|
| **Import Method** | How files are moved/copied | Copy, Move, Hardlink, Symlink |
| **Delete Empty Folders** | Remove empty source folders after import | Yes/No |
| **Skip Free Space Check** | Import even if low disk space | Yes/No |

#### Import Methods Explained

| Method | Description | Use Case |
|--------|-------------|----------|
| **Copy** | Duplicates the file | Keeps original in download folder |
| **Move** | Relocates the file | Frees space in download folder |
| **Hardlink** | Creates second reference to same data | Efficient, no duplication |
| **Symlink** | Creates pointer to original file | Links to download folder |

:::tip Recommendation
Use **Hardlink** when download and library are on the same filesystem. It saves space while allowing seeding to continue.
:::

---

## Profiles

### Quality Profiles

**Path:** `Settings > Profiles > Quality`

Quality profiles define how Cinephage scores and selects releases. Each profile contains:

| Component | Description |
|-----------|-------------|
| **Qualities** | Allowed resolutions and sources |
| **Upgrades** | Whether to search for better versions |
| **Cutoff** | Quality level to stop upgrading |
| **Custom Formats** | Bonus/malus scoring rules |

#### Built-in Profiles

Cinephage includes four default profiles:

**Quality Profile**
- Prefers 4K with HDR
- Upgrades until 2160p BluRay
- Best for: High-end setups

**Balanced Profile**
- Prefers 1080p WEB-DL
- Good quality/size ratio
- Best for: Most users

**Compact Profile**
- Prefers 720p/1080p
- Smaller file sizes
- Best for: Limited storage

**Streamer Profile**
- Creates `.strm` files
- For NZB streaming
- Best for: Streaming without downloading

#### Creating Custom Profiles

1. Click **Add Quality Profile**
2. Name the profile
3. Select allowed qualities (drag to reorder priority)
4. Set upgrade cutoff
5. Configure custom format scores
6. Click **Save**

### Language Profiles

**Path:** `Settings > Profiles > Languages`

Configure language preferences for media and subtitles.

| Setting | Description |
|---------|-------------|
| **Preferred Languages** | Audio languages to prefer |
| **Subtitle Languages** | Subtitle languages to download |
| **Upgrade Until** | Stop upgrading when this quality reached |

#### Example Language Profile

```yaml
Name: "English + Spanish Subs"
Preferred Audio: [English]
Required Subtitles: [English, Spanish]
Subtitle Priority: Must have English, prefer Spanish
```

### Custom Formats

**Path:** `Settings > Profiles > Custom Formats`

Create custom scoring rules based on release attributes.

#### Format Conditions

Match releases based on:

| Type | Description | Example |
|------|-------------|---------|
| **Release Title** | Text in release name | Contains "REMUX" |
| **Resolution** | Video resolution | Equals "2160p" |
| **Source** | Release source | Is "BluRay" |
| **Codec** | Video codec | Contains "HEVC" |
| **Group** | Release group | Is "YIFY" |
| **HDR** | HDR format | Contains "HDR10" |

#### Scoring

Assign positive or negative scores:

| Score | Effect |
|-------|--------|
| **+100** | Strongly prefer |
| **+50** | Prefer |
| **+10** | Slight preference |
| **-10** | Slight avoidance |
| **-100** | Reject |

:::tip Example: Prefer HEVC
Create a custom format that adds +50 points to any release containing "HEVC" or "H.265" to prefer more efficient codecs.
:::

---

## Integrations

### Download Clients

**Path:** `Settings > Integrations > Download Clients`

Configure connections to download clients for automated downloading.

#### qBittorrent

**Required Fields:**

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Display name | "qBittorrent" |
| **Host** | IP or hostname | `192.168.1.50` |
| **Port** | Web UI port | `8080` |
| **Username** | Web UI username | `admin` |
| **Password** | Web UI password | `********` |
| **URL Base** | Optional path prefix | `/qbittorrent` |

**Optional Settings:**

| Setting | Description | Default |
|---------|-------------|---------|
| **Category** | qBittorrent category | `cinephage` |
| **Priority** | Download priority | `Normal` |

#### SABnzbd

**Required Fields:**

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Display name | "SABnzbd" |
| **Host** | IP or hostname | `192.168.1.50` |
| **Port** | SABnzbd API port | `8080` |
| **API Key** | SABnzbd API key | `abc123...` |

**SABnzbd Client Behavior:**

| Option | Description |
|--------|-------------|
| **Standard SABnzbd** | Default SAB workflow |
| **Altmount / NZBDav (Mount Mode)** | Enables mount-mode behavior for `.strm` imports |

:::note
Cinephage no longer exposes a separate NZB-Mount client type. Use **SABnzbd** and choose **Altmount / NZBDav (Mount Mode)** when needed.
:::

### Indexers

**Path:** `Settings > Integrations > Indexers`

Configure search sources for finding releases.

#### Adding Indexers

1. Click **Add Indexer**
2. Select from built-in list or add custom YAML
3. Configure settings:
   - API key (if required)
   - Categories
   - Priority (lower = higher priority)
   - Enable/Disable
4. Click **Test** to verify
5. Click **Save**

#### Indexer Priority

Priority determines search order:

| Priority | Behavior |
|----------|----------|
| **1** | Highest priority, searched first |
| **25** | Default priority |
| **50+** | Lower priority, searched later |

:::tip
Set lower priority for indexers that are slower or have rate limits.
:::

#### Custom YAML Indexers

For trackers not in the built-in list:

1. Click **Add Indexer**
2. Select **Custom YAML**
3. Paste YAML definition
4. Configure credentials
5. Test and save

### Subtitle Providers

**Path:** `Settings > Integrations > Subtitles`

Configure sources for automatic subtitle downloads.

#### Available Providers

| Provider | Type | Authentication |
|----------|------|----------------|
| **OpenSubtitles** | API | Username/Password |
| **Subf2m** | Web | None |
| **Addic7ed** | Web | Username/Password |

#### Provider Settings

| Setting | Description |
|---------|-------------|
| **Enabled** | Turn provider on/off |
| **Credentials** | API key or login |
| **Rate Limit** | Requests per minute |

### Notifications

**Path:** `Settings > Integrations > Notifications`

Configure media server integrations and notifications.

#### Media Server Connect

| Server | Capability |
|--------|------------|
| **Jellyfin** | Library update, playback status |
| **Emby** | Library update, playback status |
| **Plex** | Library update |

#### Notification Triggers

Configure when to send notifications:

- On Grab (download started)
- On Import (download completed)
- On Upgrade (better quality downloaded)
- On Health Issue

---

## Tasks

**Path:** `Settings > Tasks`

Configure background monitoring tasks that run automatically.

### Task Overview

| Task | Purpose | Default Interval |
|------|---------|------------------|
| **Missing Content Search** | Find and download missing episodes/movies | 6 hours |
| **Cutoff Unmet Search** | Search for items below quality cutoff | Daily |
| **Upgrade Search** | Search for better quality versions | Weekly |
| **Smart List Refresh** | Update dynamic lists from TMDB | 6 hours |
| **Missing Subtitles** | Search for missing subtitle languages | 6 hours |
| **Subtitle Upgrade** | Search for better subtitle scores | Daily |
| **RSS Sync** | Check indexers for new releases | 15 minutes |

### Task Configuration

Each task has:

| Setting | Description |
|---------|-------------|
| **Enabled** | Turn task on/off |
| **Interval** | How often to run |
| **Last Run** | When task last executed |
| **Next Run** | When task will execute next |
| **Status** | Current state (idle/running) |

#### Modifying Task Intervals

1. Click on a task
2. Adjust the interval slider or enter value
3. Choose unit (minutes, hours, days)
4. Click **Save**

:::caution
Very short intervals may cause rate limiting from indexers or TMDB.
:::

### Task History

View detailed history of task execution:

- Items processed
- Success/failure counts
- Execution duration
- Error messages

---

## Live TV

**Path:** `Settings > Live TV`

Configure IPTV provider accounts and streaming settings.

### Provider Accounts

Cinephage supports three provider types:

#### Stalker Portal (MAG/Ministra)

**Required Fields:**

| Field | Description | Format |
|-------|-------------|--------|
| **Name** | Display name | Any text |
| **Portal URL** | Stalker portal URL | `http://portal.example.com/c` |
| **MAC Address** | Device MAC | `00:1A:79:XX:XX:XX` |

**Features:**
- Full EPG support
- Archive/Catch-up TV
- Portal scanning

#### XStream Codes

**Required Fields:**

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Display name | Any text |
| **Server URL** | XStream server | `http://example.com:8080` |
| **Username** | Account username | `user123` |
| **Password** | Account password | `********` |

#### M3U Playlist

**Required Fields:**

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Display name | Any text |
| **URL** | M3U playlist URL | `http://example.com/playlist.m3u` |

**Optional:**

| Field | Description |
|-------|-------------|
| **EPG URL** | XMLTV EPG source |
| **Auto-refresh** | Refresh playlist periodically |

### EPG Settings

Configure Electronic Program Guide behavior:

| Setting | Description | Default |
|---------|-------------|---------|
| **EPG Refresh Interval** | How often to update EPG | 6 hours |
| **Cache Duration** | How long to cache EPG data | 24 hours |

### Portal Scanner

Scan Stalker portals for working MAC addresses:

1. Go to **Live TV > Accounts**
2. Click **Scan for Accounts**
3. Select scan type:
   - **Random:** Generate random MACs
   - **Sequential:** Test a range
   - **Import:** Test your list
4. Configure options
5. Start scan

---

## Captcha Solver

**Path:** `Settings > Integrations > Captcha Solver`

Configure automatic Cloudflare/challenge solving for protected indexers.

### Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Enabled** | Turn solver on/off | Disabled |
| **Headless** | Run browser in background | Yes |
| **Timeout** | Max time to solve (seconds) | 60 |

### Statistics

View solver performance:

- Total challenges solved
- Success rate
- Average solve time
- Failed attempts

:::note First Run
The first time you enable the Captcha Solver, Cinephage downloads the Camoufox browser (~80MB). This happens automatically.
:::

---

## NNTP Servers (Usenet)

**Path:** `Settings > Integrations > NNTP Servers`

Configure usenet provider connections for NZB streaming.

### Server Configuration

**Required Fields:**

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Display name | "UsenetServer" |
| **Host** | NNTP server address | `news.usenetserver.com` |
| **Port** | Connection port | `563` (SSL) or `119` |
| **Username** | Account username | `user123` |
| **Password** | Account password | `********` |

**Optional Settings:**

| Setting | Description | Default |
|---------|-------------|---------|
| **Connections** | Concurrent connections | 8 |
| **SSL** | Use encrypted connection | Enabled |
| **Priority** | Server priority | 1 |

### Performance Tuning

| Setting | Description | Recommended |
|---------|-------------|-------------|
| **Connections** | More = faster | 8-16 |
| **Cache Size** | Max disk cache | 10 GB |
| **Cache TTL** | Cache duration | 24 hours |
| **Prefetch** | Download ahead | Enabled |

---

## Troubleshooting Settings

### Common Issues

**Settings Not Saving**
- Check browser console for errors
- Verify you have admin permissions
- Ensure database is writable

**TMDB Key Invalid**
- Verify you copied the API Key (not Read Access Token)
- Check for extra spaces
- Ensure TMDB account is verified

**Download Client Won't Connect**
- Verify host is accessible from Cinephage
- Check firewall rules
- Ensure web UI is enabled in client
- Try using IP address instead of hostname

**Indexer Test Fails**
- Verify API key is correct
- Check indexer is online
- Review rate limits
- Check Cinephage logs for details

---

## See Also

- [Environment Variables](./environment-variables) - Docker and command-line configuration
- [Configure Download Clients](../../guides/configure/download-clients) - Step-by-step setup guide
- [Quality Profiles](../../guides/configure/quality-profiles) - Detailed quality configuration
- [Set Up Indexers](../../guides/configure/indexers) - Indexer configuration guide
