---
title: Understanding the interface
description: Navigate the Cinephage web interface and understand its organization
sidebar_position: 5
tags: [interface, ui, navigation, tutorial]
keywords: [ui, dashboard, navigation, layout]
---

# Understanding the interface

This tutorial provides a tour of the Cinephage web interface. You will learn the layout, navigation, and where to find key features.

## Dashboard Overview

The dashboard is your home screen when logging in. It provides:

### Quick Stats

At the top:

- **Movies** - Total movies in library
- **TV Series** - Total series in library
- **Monitored** - Items actively being monitored
- **Missing** - Monitored items not yet downloaded

### Recent Activity

Shows recent events:

- Files imported
- Downloads completed
- Upgrades applied

### Quick Actions

Buttons for common tasks:

- Search all missing
- Scan library
- View activity queue

## Main Navigation

The left sidebar contains main sections:

### Discover

Browse and search TMDB for new content:

- **Movies** tab - Browse movie database
- **TV** tab - Browse TV series database
- **People** tab - Browse actors and directors
- Filters for genre, year, rating, and more

### Library

Manage your media collection:

- **Movies** - Grid or table view of all movies
- **TV** - Series list with season details
- **Unmatched** - Files awaiting manual matching
- **Import** - Manual import interface

### Live TV

IPTV and live television management:

- **Channels** - Channel lineup and organization
- **EPG** - Electronic program guide
- **Accounts** - Live TV provider accounts

### Smart Lists

Dynamic content lists:

- View existing lists
- Create new lists from TMDB queries
- Auto-add items to library

### Activity

Monitor operations:

- **Queue** - Active downloads
- **History** - Completed operations
- **Blocklist** - Failed releases to avoid

## Movie Library

Navigate to **Library > Movies**:

### View Modes

Toggle between:

- **Grid** - Poster view with basic info
- **Table** - Detailed list with sortable columns

### Filters and Sorting

Filter by:

- **Status** - All, Monitored, Missing, Downloaded
- **Quality** - Resolution filters (4K, 1080p, etc.)
- **Tags** - Custom tags you have applied

Sort by:

- Title, Year, Rating, Added date, File size

### Movie Details

Click any movie to see:

**Overview Tab:**

- Poster and backdrop
- Plot summary
- Cast and crew
- Technical details (resolution, codecs)

**Files Tab:**

- Downloaded file information
- Quality and format details
- File path and size

**History Tab:**

- Download history
- Import events
- Upgrade history

**Search Tab:**

- Manual search interface
- Available releases
- Grab specific releases

## TV Library

Navigate to **Library > TV**:

### Series List

Similar to movies but with series-level information:

- Next airing episode
- Overall completion percentage
- Season count

### Series Details

Click a series for:

**Overview Tab:**

- Series information
- Season list with progress bars
- Next episode to air

**Episodes Tab:**

- Episode list by season
- Air dates and titles
- File information per episode
- Monitoring toggles

**Files Tab:**

- All episode files
- Quality information

**History Tab:**

- Download and import history

## Settings Organization

Navigate to **Settings** for configuration:

### General

Basic application settings:

- Application name and theme
- Date/time formats
- Language preferences
- TMDB API key

### Filters

Global TMDB filters:

- Minimum rating
- Exclude genres
- Certification limits (PG-13, R, etc.)

### Profiles

Quality profile management:

- View built-in profiles
- Create custom profiles
- Configure upgrade behavior
- Set cutoff qualities

### Quality

Custom formats:

- Create format rules
- Define scoring criteria
- Test against release names

### Naming

File organization:

- Movie naming patterns
- Series naming patterns
- Available tokens preview
- Rename preview

### Tasks

Background task configuration:

- Monitoring tasks (missing, upgrades)
- Subtitle tasks
- Smart list tasks
- Schedule intervals

### Logs

Application logs:

- Real-time log viewer
- Filter by level (debug, info, error)
- Search log entries

### Streaming

Streaming configuration:

- Provider settings
- Circuit breaker options
- Cache settings

### System

System-level settings:

- Backup and restore
- API key management
- Update checking
- External URL configuration

## Integrations Section

Settings > Integrations contains:

### Indexers

Add and manage content sources:

- View configured indexers
- Add new indexers
- Test connections
- Set priorities

### Download Clients

Configure download applications:

- Add qBittorrent, SABnzbd, etc.
- Test connections
- Set category labels
- Configure path mappings

### Subtitle Providers

Manage subtitle sources:

- Enable/disable providers
- Configure API keys
- Set provider priorities

### Language Profiles

Subtitle language preferences:

- Create language profiles
- Set cutoff languages
- Configure upgrade behavior

### NNTP Servers

Usenet server configuration:

- Add NNTP servers
- Set connection limits
- Configure SSL

### Media Browsers

Jellyfin/Emby integration:

- Configure server connections
- Set notification triggers
- Test connections

### Captcha Solver

Cloudflare bypass settings:

- Enable/disable solver
- Configure Camoufox
- Set timeout values

## Activity Section

Navigate to **Activity**:

### Queue

Active downloads:

- Current downloads in progress
- Progress bars and status
- Pause/resume controls
- Remove from queue

Click an item to see:

- Release details
- Indexer source
- Quality information
- Download client status

### History

Completed operations:

- Successful imports
- Failed downloads
- Upgrades applied
- Filter by type and status

### Blocklist

Prevent re-downloading:

- View blocked releases
- See reason for block
- Remove from blocklist if needed

## Search Interface

Multiple places to search:

### Global Search

Top navigation bar:

- Search across movies and TV
- Quick results dropdown
- Keyboard shortcut: `/`

### Discover Search

In Discover section:

- Advanced TMDB search
- Filter by genre, year, rating
- Sort options

### Library Search

In Library sections:

- Search your library only
- Filter by tags, quality, status

### Manual Search

On movie/series details:

- Search indexers directly
- See all available releases
- Compare scores
- Grab specific releases

## Keyboard Shortcuts

Efficient navigation:

- `/` - Focus search bar
- `Esc` - Close modals/clear search
- `g` then `d` - Go to Discover
- `g` then `l` - Go to Library
- `g` then `a` - Go to Activity

## Mobile Interface

Cinephage is responsive:

- Sidebar collapses to hamburger menu
- Touch-friendly controls
- Swipe gestures in lists
- Optimized layouts for small screens

## What You Have Accomplished

You now understand:

- Dashboard layout and quick stats
- Navigation structure
- Library organization (movies and TV)
- Settings hierarchy
- Activity monitoring
- Search capabilities
- Keyboard shortcuts

## Next Steps

You have completed the Getting Started tutorials. You are ready to:

- Explore [How-To Guides](../guides/) for specific tasks
- Read [Reference](../reference/) documentation for detailed information
- Learn about [Architecture](../explanation/architecture) for technical understanding

## See Also

### Essential Configuration
- [Configure Download Clients](../guides/configure/download-clients) — Set up qBittorrent, SABnzbd, and others
- [Configure Indexers](../guides/configure/indexers) — Add content sources
- [Set Up Quality Profiles](../guides/configure/quality-profiles) — Configure quality scoring

### Daily Operations
- [Search and Download](../guides/use/search-and-download) — Find and acquire content
- [Monitor and Upgrade](../guides/use/monitor-and-upgrade) — Automatic quality improvements
- [Import Existing Files](../guides/use/import-existing-files) — Add your current media library

### Technical Understanding
- [Architecture Overview](../explanation/architecture) — System architecture and components
- [Workers and Tasks](../explanation/workers-and-tasks) — Background processing system
- [Key Concepts](../explanation/concepts) — Root folders, monitoring, and terminology

### Support
- [Getting Help](./getting-help) — Community support resources
- [Troubleshooting Guide](../guides/deploy/troubleshooting) — Common issues and solutions

## Tips for Efficient Use

### Customize Your View

- Use table view for bulk operations
- Filter by tags to find content quickly
- Sort by "Added" to see newest items

### Monitor What Matters

- Check Activity queue daily
- Review blocklist for patterns
- Use History to track down issues

### Stay Organized

- Apply tags consistently
- Use naming patterns for clean file structure
- Set up quality profiles before adding content

---

**You have completed the Getting Started tutorials!**

Continue to [How-To Guides](../guides/) for task-specific documentation.
