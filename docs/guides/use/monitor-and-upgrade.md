---
title: Monitor and upgrade
description: Configure automatic monitoring and quality upgrades for your library
sidebar_position: 2
tags: [monitoring, upgrades, quality, guide, tasks, automation]
keywords: [monitoring, upgrades, quality, automation]
---

# Monitor and upgrade

This guide explains how to monitor your library and manage quality upgrades automatically.

## Overview

Cinephage continuously monitors your library and can automatically:

- **Find missing content** - Search for episodes/movies not yet downloaded
- **Upgrade quality** - Replace existing files with better quality versions
- **Detect new releases** - Automatically add new episodes for monitored series
- **Cutoff unmet** - Search for items below your quality cutoff

## Understanding Monitoring

### What is Monitoring?

Monitoring tells Cinephage to actively track content and search for it:

| State | Behavior |
|-------|----------|
| **Monitored** | Cinephage searches for this content automatically |
| **Unmonitored** | Item exists in library but won't be auto-searched |

### Monitoring Levels

Cinephage supports monitoring at multiple levels:

**Movie Monitoring:**
- Monitored: Search for this movie
- Unmonitored: Don't search, but keep in library

**Series Monitoring:**
- Series Level: Monitor all seasons/episodes
- Season Level: Monitor specific seasons
- Episode Level: Monitor specific episodes

## Configuring Tasks

### Access Task Settings

1. Go to **Settings > Tasks**
2. Review and configure monitoring tasks
3. Enable/disable tasks as needed
4. Set appropriate intervals

### Core Monitoring Tasks

#### Missing Content Search

**Purpose:** Find and download missing episodes and movies

**How It Works:**
1. Scans library for monitored items without files
2. Searches indexers for available releases
3. Selects best quality match
4. Sends to download client

**Configuration:**

| Setting | Default | Description |
|---------|---------|-------------|
| **Enabled** | Yes | Enable/disable this task |
| **Interval** | 6 hours | How often to run |
| **Search Type** | Missing | Only searches for items with no files |

**Best For:**
- Filling gaps in your library
- Completing seasons
- Finding newly monitored content

#### Cutoff Unmet Search

**Purpose:** Search for items below quality cutoff

**How It Works:**
1. Finds monitored items below cutoff quality
2. Searches for upgrades meeting cutoff
3. Downloads better quality versions
4. Stops when cutoff is met

**Configuration:**

| Setting | Default | Description |
|---------|---------|-------------|
| **Enabled** | Yes | Enable/disable |
| **Interval** | Daily | How often to run |
| **Scope** | Below Cutoff | Only items not yet at cutoff |

**Example Scenario:**
```
You have: Breaking Bad S01E01 in 720p
Profile cutoff: 1080p BluRay
Result: Task searches for 1080p version
```

#### Upgrade Search

**Purpose:** Search for better quality versions of all monitored items

**How It Works:**
1. Scans all monitored items (even above cutoff)
2. Searches for higher-scoring releases
3. Upgrades if better quality found
4. Ignores custom format score improvements

**Configuration:**

| Setting | Default | Description |
|---------|---------|-------------|
| **Enabled** | Yes | Enable/disable |
| **Interval** | Weekly | How often to run |
| **Scope** | All Items | Searches everything, not just below cutoff |

**Difference from Cutoff Unmet:**
- **Cutoff Unmet:** Only items below minimum quality
- **Upgrade:** All items, even those meeting cutoff

:::tip Use Sparingly
Upgrade search is resource-intensive. Weekly is usually sufficient. Use cutoff unmet for regular monitoring.
:::

#### New Episode Detection (Series Only)

**Purpose:** Automatically add new episodes for monitored series

**How It Works:**
1. Checks TMDB for new episode listings
2. Adds new episodes to monitored series
3. Triggers search if episode is monitored

**Configuration:**

| Setting | Default | Description |
|---------|---------|-------------|
| **Enabled** | Yes | Enable/disable |
| **Interval** | 6 hours | How often to check |
| **Auto-Monitor New** | Yes | Automatically monitor new episodes |

**When It Runs:**
- New season announced
- New episode added to existing season
- Air dates updated

#### RSS Sync

**Purpose:** Check indexers for new releases

**How It Works:**
1. Fetches RSS feeds from configured indexers
2. Matches releases to monitored items
3. Automatically grabs matching releases
4. Bypasses search for immediate availability

**Configuration:**

| Setting | Default | Description |
|---------|---------|-------------|
| **Enabled** | Yes | Enable/disable |
| **Interval** | 15 minutes | How often to sync |

:::caution Rate Limits
Short intervals may cause rate limiting from indexers. 15-30 minutes is recommended.
:::

## Quality Upgrade System

### How Upgrades Work

When Cinephage finds a better quality release:

1. **Score Comparison** - New release scored against current
2. **Cutoff Check** - If cutoff unmet, auto-upgrade
3. **Download** - New release sent to download client
4. **Import** - New file imported to library
5. **Cleanup** - Old file deleted (per your settings)

### Quality Scoring

Each quality is assigned a score:

```
Resolution:     480p=20, 720p=50, 1080p=80, 2160p=100
Source:         BluRay=+40, WEB-DL=+30, HDTV=+10
Codec:          H.265=+20, AV1=+25, H.264=0
HDR:            Dolby Vision=+30, HDR10+=+20
Audio:          Atmos=+25, DTS-HD MA=+20
```

**Example Scores:**

| Release | Score |
|---------|-------|
| 1080p BluRay H.264 | 120 |
| 1080p BluRay H.265 HDR10 | 150 |
| 2160p BluRay H.265 Dolby Vision | 175 |

### Upgrade Cutoff

The cutoff is the quality level where upgrades stop:

**Example Profile:**
```yaml
Qualities: [720p, 1080p, 2160p]
Upgrades Allowed: Yes
Cutoff: 1080p BluRay
```

**Upgrade Path:**
1. First download: 720p HDTV (score: 60)
2. Upgrade to: 1080p WEB-DL (score: 110)
3. Upgrade to: 1080p BluRay (score: 120) ← Cutoff met
4. No further upgrades (unless using "Upgrade Search" task)

## Setting Up Monitoring

### Monitoring Movies

#### When Adding Movies

1. Go to **Discover** or **Movies > Add New**
2. Search for movie
3. Before adding, toggle **Monitor** switch:
   - **Monitored:** Will search for this movie
   - **Unmonitored:** Adds to library without searching
4. Click **Add**

#### Changing Monitor Status

1. Go to **Library > Movies**
2. Find the movie
3. Click the **Monitor** icon (eye):
   -  Open eye = Monitored
   -  Slashed eye = Unmonitored
4. Toggle as needed

#### Bulk Monitoring

1. Go to **Library > Movies**
2. Select multiple movies (checkboxes)
3. Click **Edit** (pencil icon)
4. Set **Monitored** to Yes/No
5. Click **Save**

### Monitoring TV Shows

#### Series-Level Monitoring

Monitor entire series (all seasons):

1. Add series via **Discover** or **TV Shows > Add New**
2. Set **Monitor** to one of:
   - **All Episodes** - Monitor every episode
   - **Future Episodes** - Monitor upcoming episodes only
   - **Missing Episodes** - Monitor episodes without files
   - **Existing Episodes** - Monitor episodes with files (for upgrades)
   - **None** - Don't monitor
3. Click **Add**

#### Season-Level Monitoring

Monitor specific seasons:

1. Go to series page
2. Find season in the list
3. Click season **Monitor** dropdown:
   - **Monitored** - Monitor all episodes in season
   - **Unmonitored** - Don't monitor this season
4. Or click individual episode monitor icons

#### Episode-Level Monitoring

Fine-grained control:

1. Go to series page
2. Expand season
3. Click episode **Monitor** icon:
   - Monitored: Will search for this episode
   - Unmonitored: Won't search

### Monitoring Best Practices

**For Movies:**
- Monitor movies you actively want
- Unmonitor movies you already have in desired quality
- Monitor newly released movies to catch quality upgrades

**For TV Shows:**
- Use "Future Episodes" for ongoing series
- Use "All Episodes" for complete series you want fully
- Unmonitor seasons you've watched and don't need
- Monitor only missing episodes to complete seasons

**General:**
- Don't monitor everything (causes unnecessary searches)
- Review monitoring periodically
- Unmonitor items you no longer care about

## Managing Upgrades

### Automatic Upgrades

With proper configuration, upgrades happen automatically:

1. **Task Runs** - Cutoff Unmet or Upgrade task executes
2. **Search Initiated** - Cinephage searches indexers
3. **Better Quality Found** - Higher scoring release identified
4. **Download Started** - New release sent to client
5. **Import** - New file replaces old
6. **Cleanup** - Old file deleted (if configured)

### Manual Upgrades

Force an upgrade for specific items:

1. Go to movie/episode page
2. Click **Search** button
3. Cinephage searches immediately
4. If better quality found, it's downloaded

**Bulk Manual Search:**

1. Go to **Library** (Movies or TV)
2. Select items with checkboxes
3. Click **Search Selected**
4. Cinephage searches all selected items

### Blocking Upgrades

Prevent specific releases from being used:

1. Go to **Activity > History**
2. Find the release
3. Click **Blocklist**
4. Release won't be downloaded again

**Blocklist Categories:**

- **Failed Download** - Automatically blocklisted
- **Wrong Content** - Manually blocklisted
- **Bad Quality** - Block poor encodes
- **Wrong Language** - Block wrong audio/subtitles

### Upgrade History

View your upgrade activity:

1. Go to **Activity > History**
2. Filter by **Upgrade** type
3. See:
   - Original file quality
   - New file quality
   - Date of upgrade
   - Release used

## Advanced Monitoring

### Delay Profiles

Set delays to avoid "bad" releases:

**Purpose:** Wait for better quality releases before downloading

**Configuration:**

1. Go to **Settings > Profiles > Delay**
2. Set delays per quality:
   ```
   HDTV: 0 minutes (download immediately)
   WEB-DL: 180 minutes (wait 3 hours)
   BluRay: 1440 minutes (wait 24 hours)
   ```

**How It Works:**
1. Content becomes available (e.g., HDTV)
2. Timer starts based on delay profile
3. If better quality available before timer expires, wait
4. When timer expires, download best available

:::tip Use Case
Set 24-hour delay for BluRay to avoid early low-quality encodes. If a good WEB-DL releases within 24 hours, you'll get that instead of waiting for BluRay.
:::

### Release Profiles

Create rules for automatic release selection:

1. Go to **Settings > Profiles > Release**
2. Add preferred words:
   - Must contain: Required words in release name
   - Must not contain: Rejected words
   - Preferred: Bonus points for these words

**Example:**
```
Must contain: x264
Must not contain: HC, FRENCH, GERMAN
Preferred: REMUX (+50 points), SPARKS (+30 points)
```

### Custom Formats

Advanced scoring with custom format rules:

1. Go to **Settings > Profiles > Custom Formats**
2. Create format with conditions:
   - Contains "HDR" → +50 points
   - Is "HDTV" → -20 points
   - Group is "YIFY" → -100 points (reject)
3. Apply to quality profiles

## Troubleshooting Monitoring

### Items Not Being Searched

**Check Monitoring Status:**

1. Verify item is monitored (eye icon open)
2. Check parent is monitored (season/series level)
3. Review monitoring settings

**Check Tasks Are Enabled:**

```
Settings > Tasks > Missing Content Search = Enabled
Settings > Tasks > Cutoff Unmet Search = Enabled
```

**Check Quality Profile:**

1. Verify quality profile allows desired qualities
2. Ensure cutoff is set correctly
3. Check custom formats aren't rejecting releases

### No Upgrades Found

**Check Current Quality:**

Current file may already be at cutoff:
```
Movie: 1080p BluRay
Cutoff: 1080p BluRay
Result: No upgrades needed
```

**Check Upgrade Task:**

```
Settings > Tasks > Upgrade Search
```

This task searches above cutoff. If disabled, no above-cutoff upgrades occur.

**Check Indexers:**

1. Verify indexers are configured
2. Check indexer tests pass
3. Ensure categories are correct
4. Check rate limits aren't blocking

### Too Many Upgrades

**Set Cutoff Properly:**

Lower cutoff to stop sooner:
```
Before: Cutoff = 2160p (too high, many upgrades)
After: Cutoff = 1080p BluRay (stops at good quality)
```

**Disable Upgrade Task:**

Turn off aggressive searching:
```
Settings > Tasks > Upgrade Search = Disabled
```

**Use Custom Formats:**

Require specific qualities:
```
Format: "High Quality Only"
Condition: Quality is 1080p or 2160p
Score: -1000 for anything else
```

### Duplicate Downloads

**Causes:**
- Multiple indexers finding same release
- RSS sync grabbing before search
- Manual search + automatic search

**Solutions:**
1. Check **Activity > Queue** for duplicates
2. Cancel duplicate downloads
3. Add one release to blocklist
4. Adjust RSS sync interval

## Best Practices

### For New Users

1. **Start Conservative** - Monitor only content you really want
2. **Set Realistic Cutoffs** - 1080p BluRay is good for most
3. **Enable Core Tasks** - Missing Content + Cutoff Unmet
4. **Check Results** - Review Activity regularly

### For Power Users

1. **Custom Formats** - Fine-tune scoring for your preferences
2. **Delay Profiles** - Avoid bad early releases
3. **Multiple Indexers** - More sources = better results
4. **Review Blocklist** - Keep it clean for better performance

### Efficiency Tips

1. **Don't Monitor Everything** - Focus on what you watch
2. **Use Future Episodes** - For ongoing series, not all episodes
3. **Set Quality Profiles Per Item** - Different needs for different content
4. **Regular Review** - Unmonitor items you no longer care about

## See Also

- [Set Up Quality Profiles](../configure/quality-profiles) - Detailed quality configuration
- [Quality Scoring](../../explanation/quality-scoring) - How scoring works
- [Handle Failed Downloads](handle-failed-downloads) - Deal with download failures
- [Search and Download](search-and-download) - Manual searching
- [Update Cinephage](update-cinephage) - Keep Cinephage up to date
- [Backup & Restore](../deploy/backup-restore.md) - Data protection
