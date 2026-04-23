---
title: Adding content
description: Add movies and TV shows to your library manually or in bulk
sidebar_position: 6
tags: [library, adding, movies, tv, bulk, guide]
keywords: [library, adding content, movies, tv, bulk import]
---

# Adding content

Add movies and TV shows to your library through various methods.

## Manual Addition

### Adding Movies

1. Go to **Discover** or **Movies > Add New**
2. Search for movie title
3. Click movie in results
4. Configure:
   - Root folder
   - Quality profile
   - Monitor status
5. Click **Add**

### Adding TV Shows

1. Go to **Discover** or **TV Shows > Add New**
2. Search for series title
3. Click series in results
4. Configure:
   - Root folder
   - Quality profile
   - Monitor: All, Future, Missing, Existing
5. Click **Add**

## Bulk Addition

### From TMDB Lists

1. Go to **Discover > Lists**
2. Browse TMDB curated lists
3. Click **Add List**
4. Select items to add
5. Configure defaults
6. Bulk add

### Import from File

1. Prepare CSV with columns: Title, Year, Type
2. Go to **Library > Import**
3. Upload CSV
4. Map columns
5. Import

### Add TMDB Collections (Bulk)

Add entire TMDB collections to your library at once:

1. Go to a movie detail page that belongs to a collection (e.g., "The Avengers")
2. Look for **"Part of [Collection Name]"** section
3. Click **"Add Collection"**
4. Configure:
   - Root folder for collection
   - Quality profile
   - Language profile
   - Monitor status
5. Click **Add All**

**What happens:**

- All movies in the collection are added to your library
- Each movie is monitored according to your settings
- Existing movies in your library are not duplicated
- You can add missing movies to complete collections

## Managing Library Items

### Movie Management

**Individual Actions:**

| Action | Description | How To |
|--------|-------------|--------|
| **Edit** | Change metadata, profiles | Click movie > Edit |
| **Search** | Find releases manually | Click movie > Search |
| **Rename** | Apply naming pattern | Click movie > Organize |
| **Delete** | Remove from library | Click movie > Delete |
| **History** | View download history | Click movie > History |

**Deletion Behavior:**

When you delete a movie or episode:

- **Immediate status updates** — UI reflects deletion instantly without page refresh
- **File removal confirmation** — Files are deleted immediately, library item updated
- **Auto-redirect** — After deletion, you're automatically redirected to the library list
- **No manual refresh needed** — Status indicators update in real-time

**Bulk Actions:**

1. Select multiple movies (checkboxes)
2. Click action button:
   - Edit (change profiles)
   - Search
   - Monitor/Unmonitor
   - Delete

### TV Show Management

**Series-Level Actions:**

- Edit series details
- Change monitoring (All/Future/Missing/None)
- Search for missing episodes
- Refresh metadata
- Delete series

**Season-Level Actions:**

- Monitor/unmonitor season
- Search for season episodes
- View season details
- Delete season files

**Episode-Level Actions:**

- Monitor/unmonitor episode
- Search for specific episode
- View episode details
- Delete episode file

### Monitoring Status

Understanding monitoring levels:

**Movies:**
- **Monitored** - Will search for movie
- **Unmonitored** - In library, won't search

**TV Shows:**
- **All Episodes** - Monitor every episode
- **Future Episodes** - Monitor upcoming episodes only
- **Missing Episodes** - Monitor episodes without files
- **Existing Episodes** - Monitor episodes with files (for upgrades)
- **None** - Don't monitor

## See Also

- [Search and Download](../use/search-and-download) - Find and download content
- [Import Existing Files](../use/import-existing-files) - Import your existing media
- [Collections and Tags](collections-and-tags) - Organize your content
