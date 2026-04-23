---
title: Configure NZB streaming
description: Stream content directly from usenet without downloading first using NZB streaming
sidebar_position: 6
tags: [nzb, streaming, usenet, configuration, guide, nzbmount, strm]
keywords: [nzb, streaming, usenet, mount, direct play]
---

# Configure NZB streaming

NZB Streaming allows you to watch content directly from usenet without downloading the entire file first. This guide covers setting up and using this powerful feature.

## What is NZB Streaming?

Traditional usenet workflow requires downloading the entire NZB before playback:

1. Download NZB to client (SABnzbd/NZBGet)
2. Wait for full download completion
3. Extract and repair files
4. Import to library
5. Play file

**NZB Streaming workflow:**

1. Mount NZB as virtual filesystem
2. Stream segments on-demand as you watch
3. Start playback immediately - no waiting
4. Optional: Keep cache for re-watching

### How It Works

NZB Streaming uses several technologies working together:

```
Player Request
    ↓
Cinephage Streaming Server
    ↓
NZB Mount (Virtual Filesystem)
    ↓
Segment Cache (Downloaded pieces)
    ↓
NNTP Server (Usenet provider)
```

**Key Components:**

- **NNTP Connections** - Direct usenet server connections for fetching segments
- **Segment Caching** - Downloaded pieces stored temporarily for efficiency
- **RAR Extraction** - On-the-fly decompression without full download
- **FFmpeg Probing** - Media info extracted without downloading entire file
- **HTTP Streaming** - Standard video streaming protocols (HLS/DASH)

## Requirements

### Usenet Provider Requirements

Your usenet provider must support:

| Requirement | Specification | Why It Matters |
|-------------|---------------|----------------|
| **Standard NNTP** | Port 563 (SSL) or 119 | Required for communication |
| **Long Retention** | 1000+ days recommended | Older content still available |
| **Sufficient Bandwidth** | 50+ Mbps | Smooth streaming requires speed |
| **High Completion** | 99%+ article availability | Missing segments interrupt playback |
| **No Strict Limits** | Unlimited or high data caps | Streaming uses significant bandwidth |

:::tip Provider Recommendations
Look for providers with:
- 3000+ days retention
- Multiple backbone connections
- SSL support on port 563
- Unlimited plans or high data caps
:::

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **CPU** | 2 cores | 4+ cores |
| **RAM** | 2 GB | 4+ GB |
| **Disk (Cache)** | 10 GB free | 50+ GB free |
| **Network** | 25 Mbps | 100+ Mbps |
| **Disk Speed** | Any SSD/HDD | SSD for cache |

## Setup Guide

### Step 1: Add NZBMount Download Client

First, configure NZBMount as a download client:

1. Go to **Settings > Integrations > Download Clients**
2. Click **Add Download Client**
3. Select **NZBMount** from the dropdown
4. Configure settings:

| Setting | Value | Description |
|---------|-------|-------------|
| **Name** | "NZBMount" or "Streaming" | Display name |
| **Enable** | Checked | Enable the client |
| **Priority** | 1 | Priority for automatic search |

5. Click **Test** to verify configuration
6. Click **Save**

:::note No Credentials Required
NZBMount doesn't require host/port credentials like other download clients. It uses the NNTP server configuration (set up in Step 2).
:::

### Step 2: Configure NNTP Server

Add your usenet provider for streaming:

1. Go to **Settings > Integrations > NNTP Servers**
2. Click **Add Server**
3. Configure connection settings:

**Required Settings:**

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Display name | "UsenetServer" |
| **Host** | NNTP server address | `news.usenetserver.com` |
| **Port** | Connection port | `563` (SSL) or `119` |
| **Username** | Your account username | `your_username` |
| **Password** | Your account password | `your_password` |

**SSL Configuration:**

| Setting | Recommended Value | Notes |
|---------|-------------------|-------|
| **SSL** | Enabled | Always use SSL (port 563) |
| **Verify Certificate** | Enabled | Ensures secure connection |

4. Configure performance settings:

| Setting | Description | Default | Recommended |
|---------|-------------|---------|-------------|
| **Connections** | Concurrent NNTP connections | 8 | 16-32 |
| **Timeout** | Connection timeout (seconds) | 30 | 30-60 |
| **Priority** | Server priority order | 1 | 1 (primary) |

:::tip Connection Count
More connections = faster streaming, but:
- Watch your provider's connection limit
- More connections use more memory
- Diminishing returns after 16-32 connections
:::

5. Click **Test** to verify connection
6. Click **Save**

### Step 3: Configure Cache Settings

Set up segment caching for optimal performance:

1. In the NNTP Server settings, expand **Cache Settings**
2. Configure:

| Setting | Description | Default | Recommended |
|---------|-------------|---------|-------------|
| **Cache Size** | Maximum disk space for cache | 10 GB | 20-50 GB |
| **Cache TTL** | How long to keep segments | 24 hours | 24-72 hours |
| **Prefetch** | Download segments ahead | Enabled | Enabled |
| **Prefetch Segments** | How many ahead to download | 5 | 5-10 |

3. Click **Save**

**Cache Location:**

- **Default:** `data/nzb_cache/` inside Cinephage directory
- **Docker:** `/config/data/nzb_cache/` inside container

:::tip Cache Strategy
- Larger cache = smoother re-watching
- Longer TTL = less re-downloading
- Prefetching prevents buffering
:::

### Step 4: Set Up Streamer Quality Profile

Configure a quality profile optimized for streaming:

1. Go to **Settings > Profiles > Quality**
2. Find the **Streamer** profile (built-in)
3. Click to edit or create a new profile:

**Streamer Profile Settings:**

```yaml
Name: "Streamer"
Qualities:
  - 1080p WEB-DL
  - 1080p BluRay
  - 720p WEB-DL
  - 720p BluRay
Upgrades Allowed: Yes
Cutoff: 1080p WEB-DL
File Type: .strm (streaming files)
```

4. Save the profile

:::note STRM Files
The Streamer profile creates `.strm` files instead of video files. These are small text files containing streaming URLs that media servers can play directly.
:::

## Using NZB Streaming

### Method 1: Automatic Streaming Mode (Recommended)

Set movies/series to use the Streamer profile:

1. When adding content to library:
   - Select **Streamer** quality profile
   - Enable monitoring
2. Cinephage creates `.strm` files instead of downloading
3. When you play the file, it streams directly from usenet

**How It Works:**

- Cinephage searches for NZB releases
- Selects best quality based on Streamer profile
- Creates `.strm` file with streaming URL
- No full download required
- Playback starts instantly

### Method 2: Manual Stream from Search

Stream individual releases on-demand:

1. Search for content via **Discover** or **Search**
2. In the search results, find an NZB release
3. Click **Stream** button (instead of Download)
4. Select quality if multiple options available
5. Playback starts immediately

:::tip When to Use
Use manual stream when:
- You want to preview before adding to library
- Testing streaming setup
- Streaming one-time content
:::

### Method 3: NZB-Mount Import

For existing NZBs you want to stream:

1. Add NZB to NZBMount client manually:
   - Go to **Activity > Queue**
   - Click **Add NZB**
   - Select NZBMount as client
2. Cinephage mounts the NZB automatically
3. Access via:
   - `.strm` file in library
   - Direct streaming URL
   - Media server import

## Stream Quality and Performance

### Adaptive Quality Selection

Cinephage probes NZBs to determine available qualities:

**Detected Attributes:**

- **Video Quality** - 480p, 720p, 1080p, 4K availability
- **Audio Tracks** - Stereo, 5.1, 7.1 channel options
- **Subtitles** - Embedded or external subtitle availability
- **Codecs** - H.264, H.265, AV1 support

### Bandwidth Requirements

Choose quality based on your connection:

| Quality | Bandwidth | Best For |
|---------|-----------|----------|
| **480p** | 2-4 Mbps | Mobile devices, slow connections |
| **720p** | 4-8 Mbps | Standard HD streaming |
| **1080p** | 8-15 Mbps | Full HD quality |
| **4K** | 25+ Mbps | Best quality, fast connections |

:::tip Automatic Quality
Enable adaptive quality in settings:

```
Settings > Integrations > NNTP Servers > Adaptive Quality: ON
```

Cinephage automatically adjusts based on connection speed.
:::

### Performance Optimization

#### Connection Tuning

Increase connections for better performance:

```yaml
NNTP Connections: 16-32
→ Better for high-bandwidth providers
→ More parallel segment downloads
→ Smoother playback
```

:::warning Provider Limits
Don't exceed your provider's connection limit:
- Check provider documentation
- Typical limits: 10-50 connections
- Exceeding limits may cause bans
:::

#### Segment Prefetching

Enable prefetch for smoother playback:

```yaml
Prefetch: Enabled
Prefetch Ahead: 5-10 segments
→ Downloads upcoming segments
→ Reduces buffering
→ Uses more bandwidth
```

#### Provider Selection

Choose providers optimized for streaming:

| Feature | Ideal Spec |
|---------|------------|
| Speed | 50+ Mbps to your location |
| Latency | < 50ms to server |
| Retention | 3000+ days |
| Completion | 99.9%+ |

## Cache Management

### How Segment Caching Works

NZBs are split into small segments (typically 500KB-1MB each):

1. **First Request** - Downloads segments from usenet
2. **Cache Storage** - Segments saved to disk temporarily
3. **Subsequent Requests** - Served from local cache
4. **Auto-Cleanup** - Old segments deleted automatically

### Cache Settings Reference

| Setting | Description | Default | When to Increase |
|---------|-------------|---------|------------------|
| **Cache Size** | Max disk space | 10 GB | Re-watch same content |
| **Cache TTL** | Retention time | 24 hours | Want longer retention |
| **Prefetch** | Download ahead | Enabled | Buffering issues |

### Cache Location

**Default Paths:**

```bash
# Native install
data/nzb_cache/

# Docker
/config/data/nzb_cache/
```

**Custom Location:**

Set via environment variable:

```yaml
environment:
  - NZB_CACHE_PATH=/custom/path
```

:::tip SSD Recommended
Cache benefits significantly from SSD storage due to frequent small random reads/writes.
:::

### Manual Cache Management

**View Cache Status:**

```
Settings > Integrations > NNTP Servers > Cache Statistics
```

Shows:
- Current cache size
- Number of cached segments
- Hit/miss ratio
- Cleanup schedule

**Clear Cache:**

If experiencing issues:

1. Go to NNTP Server settings
2. Click **Clear Cache**
3. Confirm deletion
4. Cache rebuilds on next stream

## Advanced Configuration

### Multiple NNTP Servers

Configure backup providers for redundancy:

1. Add primary provider with priority 1
2. Add backup provider(s) with priority 2, 3, etc.
3. Cinephage automatically:
   - Uses primary for all requests
   - Falls back to backup if primary fails
   - Distributes load across providers

**Example Configuration:**

```yaml
Server 1 (Priority 1):
  Host: news.primary.com
  Connections: 16
  
Server 2 (Priority 2):
  Host: news.backup.com
  Connections: 8
```

### PAR2 Repair

Enable automatic repair of missing segments:

1. Go to NNTP Server settings
2. Enable **PAR2 Repair**
3. Configure:
   - Repair blocks to download
   - Auto-repair threshold

**How It Works:**

- Downloads parity files (PAR2)
- Repairs missing/corrupt segments
- Prevents playback interruptions
- Uses additional bandwidth

:::tip When to Enable
Enable PAR2 repair if:
- Provider has completion issues
- Streaming frequently fails mid-playback
- You have bandwidth to spare
:::

### Stream URL Caching

Stream extraction URLs are cached to avoid re-processing:

- **Cache Duration:** 1 hour default
- **Auto-Refresh:** Before expiration
- **Manual Refresh:** Click "Refresh Stream" button

**Benefits:**

- Faster subsequent plays
- Reduced usenet connections
- Lower provider bandwidth usage

## SABnzbd Mount Mode

Cinephage supports **SABnzbd Mount Mode** - a WebDAV-based approach for streaming NZB content with STRM/Symlink import support.

### How SABnzbd Mount Mode Works

```
Cinephage → SABnzbd WebDAV → NZB Streaming → STRM File Generation → Media Server
```

**Key Features:**
- WebDAV-mounted NZB streaming
- On-the-fly STRM file generation for media servers
- Direct streaming from SABnzbd's working directory
- Supports Jellyfin, Emby, Plex import

### Configuring SABnzbd Mount Mode

**Step 1: Enable WebDAV in SABnzbd**

1. Open SABnzbd **Config** > **General**
2. Enable **Enable Web Interface** if not already enabled
3. Note the WebDAV port (default: 8080 + 1 = 8081)

**Step 2: Configure SABnzbd in Cinephage**

1. Go to **Settings > Integrations > Download Clients**
2. Select **SABnzbd** as the client type
3. Enable **Mount Mode** option

| Setting | Description | Example |
|---------|-------------|---------|
| **WebDAV Port** | SABnzbd WebDAV port | `8081` |
| **Mount Path** | Path to SABnzbd watched folder | `/downloads/nzb` |
| **STRM Template** | Template for STRM file generation | Default Cinephage template |

**Step 3: Set Up Import Path**

1. Configure SABnzbd to watch the mount path
2. NZBs in this folder trigger STRM generation
3. STRM files point to streaming URLs

### Using SABnzbd Mount Mode

**Workflow:**

1. Add NZB to SABnzbd (via Cinephage or directly)
2. SABnzbd processes the NZB
3. Cinephage detects processed files
4. STRM files are generated automatically
5. Media servers import via STRM links
6. Playback streams directly from SABnzbd

**Benefits:**
- No intermediate file storage
- Works with media servers that support STRM
- Lower disk usage than traditional downloading
- Instant availability after processing

## Troubleshooting

### Stream Won't Start

**Check NNTP Server:**

1. Verify credentials are correct
2. Test connection in settings
3. Check if at connection limit
4. Verify account is active

**Check NZB Health:**

1. Articles may be missing from provider
2. Try different NZB for same content
3. Check provider retention
4. Enable PAR2 repair

**Check Cache:**

1. Verify disk space available
2. Check cache directory permissions
3. Clear cache and retry
4. Monitor cache during stream attempt

### Buffering/Stuttering

**Reduce Quality:**

1. Try 720p instead of 1080p/4K
2. Lower bandwidth requirements
3. Check actual connection speed

**Increase Connections:**

1. Add more NNTP connections (if provider allows)
2. Enable prefetch with more segments
3. Consider upgrading provider plan

**Check Bandwidth:**

1. Run speed test during streaming
2. Check for other network usage
3. Verify not hitting provider speed limits
4. Consider QoS on router

### "Article Not Found" Errors

**Missing Segments:**

1. **Check Provider Completion** - Not all providers have 100% completion
2. **Try Different NZB** - Same release, different upload
3. **Enable PAR2 Repair** - Repairs missing segments
4. **Use Backup Provider** - Configure multiple NNTP servers

**Retention Issues:**

1. Content may be older than provider retention
2. Check upload date vs. provider retention days
3. Try different usenet provider
4. Consider download instead of stream

### High Memory Usage

Streaming can use significant memory:

**Reduce Memory Footprint:**

1. **Lower Connection Count** - Reduce NNTP connections
2. **Disable Prefetch** - Less aggressive caching
3. **Reduce Cache Size** - Smaller on-disk cache
4. **Close Other Streams** - One stream at a time

**Monitor Usage:**

```bash
# Check Cinephage memory usage
docker stats cinephage

# Or native
ps aux | grep cinephage
```

### Poor Video Quality

**Stream Quality vs. Download:**

| Aspect | Stream | Download |
|--------|--------|----------|
| Startup Time | Seconds | Minutes-hours |
| Quality | Same as source | Same as source |
| Seeking | May buffer | Instant |
| Bandwidth Usage | Every play | Once |

**If Quality Seems Low:**

1. Check actual NZB quality - streaming doesn't degrade quality
2. Verify media player settings
3. Check if transcoding is occurring
4. Compare with direct download

## Comparison: Download vs Stream

| Aspect | Traditional Download | NZB Streaming |
|--------|---------------------|---------------|
| **Startup Time** | Minutes to hours | Seconds |
| **Disk Usage** | Full file size | Cache only (~10GB max) |
| **Bandwidth** | Download once | Stream every time |
| **Quality** | Full quality | Full quality |
| **Rewatching** | Instant (local file) | Re-stream from usenet |
| **Storage** | Requires library space | Minimal storage |
| **Best For** | Keep forever | Watch once |
| **Provider Load** | Download once | Stream per view |

## Security Considerations

### SSL/TLS Encryption

Always use SSL for NNTP connections:

```yaml
Port: 563 (not 119)
SSL: Enabled
Verify Certificate: Enabled
```

**Why SSL Matters:**

- Encrypts data between Cinephage and provider
- Prevents ISP from seeing content
- Protects credentials
- Standard for modern usenet

### VPN Compatibility

NZB streaming works with VPNs:

**Setup Options:**

1. **VPN on Cinephage Host** - All traffic through VPN
2. **VPN on Router** - Network-wide protection
3. **VPN on Client Only** - Player through VPN

**Considerations:**

- VPN adds latency (may affect streaming)
- Provider sees VPN IP address
- Some VPNs block usenet ports
- Test speed with VPN enabled

### Privacy Tips

- Use providers that don't log downloads
- Enable SSL on all connections
- Consider VPN for additional privacy layer
- Regularly clear cache if concerned about local storage

## Best Practices

### For Casual Viewing

- Use **Streamer** quality profile
- Enable auto-add for Smart Lists
- Set moderate cache size (10-20 GB)
- Monitor bandwidth usage

### For Power Users

- Configure multiple NNTP providers
- Enable PAR2 repair
- Set larger cache (50+ GB)
- Use prefetch aggressively
- Set up backup streaming sources

### For Limited Bandwidth

- Use lower quality profiles
- Disable prefetch
- Reduce NNTP connections
- Download instead of stream for favorites
- Cache management critical

### For Quality Enthusiasts

- Use 1080p/4K Streamer profile
- Ensure fast provider (100+ Mbps)
- Enable PAR2 for perfect playback
- Set large cache for re-watching
- Consider download for favorites

## Integration with Media Servers

### Jellyfin

1. Cinephage creates `.strm` files
2. Add Cinephage library folder to Jellyfin
3. Jellyfin recognizes `.strm` files
4. Plays streams directly
5. Works with Jellyfin apps and clients

### Emby

Similar to Jellyfin:

1. Point Emby to Cinephage library
2. `.strm` files appear in Emby
3. Direct streaming playback
4. Works with Emby apps

### Plex

Plex supports `.strm` files:

1. Add Cinephage library to Plex
2. Enable "Prefer local metadata"
3. `.strm` files stream on play
4. Note: Plex may transcode - configure appropriately

### Kodi

Best integration via STRM files:

1. Add Cinephage library as video source
2. Scrape with TMDB scraper
3. Play `.strm` files directly
4. Works with all Kodi skins

## See Also

- [Configure Download Clients](download-clients) - Set up NZBMount
- [Set Up Quality Profiles](quality-profiles) - Configure Streamer profile
- [Configure NNTP Servers](../../reference/configuration/settings-explained#nntp-servers-usenet) - NNTP settings reference
