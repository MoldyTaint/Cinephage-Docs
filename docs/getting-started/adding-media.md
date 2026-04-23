---
title: Adding media
description: Learn how to add movies and TV shows to your Cinephage library
sidebar_position: 4
tags: [media, library, tutorial, movies, tv]
keywords: [movies, tv shows, library, discover, add media]
---

# Adding media

This tutorial teaches you how to add movies and TV series to your Cinephage library. You will learn to search for content, configure monitoring, and initiate downloads.

## Prerequisites

- Cinephage installed and configured
- Root folders set up
- At least one indexer configured
- TMDB API working

## Part 1: Adding a Movie

### Step 1: Navigate to Discover

Click **Discover** in the top navigation bar. This shows trending and popular movies from TMDB.

### Step 2: Search for a Movie

Use the search bar at the top to find a specific movie:

1. Type the movie title
2. Results appear as you type
3. Click on the movie poster to view details

### Step 3: View Movie Details

The movie detail page shows:

- **Overview** - Plot summary and cast
- **Technical Info** - Release date, runtime, rating
- **Status** - Whether it is in your library
- **Files** - Downloaded files (if any)
- **History** - Download and import history

### Step 4: Add to Library

If the movie is not in your library:

1. Click the **Add to Library** button
2. Configure the following options:

**Root Folder:**

- Select your Movies root folder

**Quality Profile:**

- Choose a profile (Quality, Balanced, Compact, or Streamer)
- Hover over the profile name to see scoring details

**Monitoring:**

- **Enabled** - Cinephage will search for and download this movie
- **Disabled** - Movie is tracked but not automatically downloaded

**Tags:** (Optional)

- Add tags for organization (e.g., `favorite`, `4k-only`)

3. Click **Add Movie**

### Step 5: Automatic Search

If monitoring is enabled:

1. Cinephage automatically searches your configured indexers
2. Releases are scored based on your quality profile
3. The best release is sent to your download client
4. Progress appears in **Activity** section

### Step 6: Monitor Progress

Click **Activity** in the navigation to see:

- **Queue** - Active downloads
- **History** - Completed downloads
- Click on a queue item to see details

## Part 2: Adding a TV Series

### Step 1: Switch to TV Discover

In the Discover page:

1. Click the **TV** tab at the top
2. Browse or search for a TV series

### Step 2: View Series Details

Click a series to see:

- **Overview** - Series description and cast
- **Seasons** - All seasons with episode lists
- **Status** - Library status and monitored state

### Step 3: Add to Library

Click **Add to Library**:

**Root Folder:**

- Select your TV Shows root folder

**Quality Profile:**

- Choose appropriate profile for TV

**Series Type:**

- **Standard** - Regular weekly episodes
- **Daily** - Daily shows (talk shows, news)
- **Anime** - Anime with absolute numbering

**Monitoring:**

- **All Episodes** - Monitor and download entire series
- **Future Episodes** - Only new/future episodes
- **Missing Episodes** - Only episodes not in library
- **First Season** - Only season 1
- **Last Season** - Only latest season
- **None** - Add to library but do not monitor

**Season Folders:**

- Enable to organize episodes in season subfolders
- Recommended for most series

### Step 4: Understanding Season/Episode Monitoring

After adding a series, you can customize monitoring per season:

1. Go to **Library > TV**
2. Click on the series
3. Expand a season
4. Toggle monitoring for individual episodes

**Monitoring Icons:**

- **Blue bookmark** - Monitored (will be downloaded)
- **Gray bookmark** - Not monitored
- **Checkmark** - Already in library

## Part 3: Manual Import

If you already have media files, use manual import:

### Import Movies

1. Go to **Library > Movies**
2. Click **Import** button
3. Select the folder containing movie files
4. Cinephage scans and matches files to TMDB
5. Review matches and confirm import

### Import TV Shows

1. Go to **Library > TV**
2. Click **Import** button
3. Select the folder containing series folders
4. Cinephage matches series and episodes
5. Review and confirm

### Handling Unmatched Files

If files cannot be automatically matched:

1. Go to **Library > Unmatched**
2. See list of files awaiting matching
3. Click **Match** on a file
4. Search for the correct movie/series
5. Select the match
6. File is imported and organized

## Part 4: Understanding the Workflow

### Complete Download Workflow

```
Add to Library → Search Indexers → Score Releases → Send to Download Client → Monitor Download → Import File → Organize → Notify
```

### Monitoring vs Library

- **In Library** - Item is tracked in Cinephage database
- **Monitored** - Cinephage actively searches for and downloads it
- **Unmonitored** - Tracked but not automatically downloaded

### Quality Profiles in Action

When searching:

1. Cinephage finds all available releases
2. Each release is scored based on:
   - Resolution (4K, 1080p, 720p)
   - Source (BluRay, WEB-DL, HDTV)
   - Codec (H.265, H.264)
   - Audio (DTS-HD, Dolby Atmos)
   - Custom format rules you define
3. The highest-scoring release is selected
4. If a better release appears later, it upgrades

## What You Have Accomplished

You have successfully:

- Added movies to your library
- Added TV series with season monitoring
- Initiated automatic searches
- Monitored download progress
- Imported existing media files
- Understood the monitoring workflow

## Next Steps

Now that you can add media, continue to [Understanding the Interface](understanding-interface) to learn how to navigate Cinephage efficiently and use advanced features.

## Tips and Best Practices

### Organizing Your Library

- Use tags to categorize content (e.g., `kids`, `4k`, `hdr`)
- Create separate root folders for different quality tiers
- Enable season folders for TV shows

### Efficient Searching

- Start with monitoring disabled if you are just tracking
- Enable monitoring when you are ready to download
- Use custom formats to prefer specific release groups or sources

### Managing Upgrades

- Enable upgrade monitoring to get better quality over time
- Set cutoff qualities in profiles to prevent endless upgrades
- Review blocklist if releases keep failing

## See Also

### Next Steps
- [Understanding the Interface](./understanding-interface) — Navigate the Cinephage UI and discover advanced features
- [Search and Download](../guides/use/search-and-download) — Detailed guide to finding and acquiring content

### Related Guides
- [Import Existing Files](../guides/use/import-existing-files) — Add your current media library to Cinephage
- [Configure Quality Profiles](../guides/configure/quality-profiles) — Understand and customize quality settings
- [Monitor and Upgrade](../guides/use/monitor-and-upgrade) — Set up automatic quality improvements

### Concepts
- [Quality Scoring](../explanation/quality-scoring) — How Cinephage calculates release quality
- [Key Concepts](../explanation/concepts) — Understanding monitoring, root folders, and more

---

**Next:** [Understanding the Interface →](understanding-interface)
