---
title: Import existing files
description: Import your existing media library into Cinephage from disk or other media managers
sidebar_position: 4
tags: [import, library, migration, guide, existing, files]
keywords: [import, library, existing files, migration]
---

# Import existing files

This guide explains how to import your existing media library into Cinephage. Whether you're migrating from another media manager or adding existing files, this process ensures your library is properly organized and tracked.

## Overview

Cinephage can import existing media files and automatically:

- Match files to TMDB metadata
- Organize files according to your naming patterns
- Add items to your library for monitoring
- Handle both movies and TV shows

**Supported Import Sources:**

- Files on disk in existing folder structure
- Libraries from other media managers
- Loose files needing organization
- Partially organized collections

## Before You Begin

### Prerequisites

- Cinephage installed and running
- Root folders configured ([Initial Setup](../../getting-started/initial-setup))
- TMDB API key configured
- Read/write permissions to media folders

### File Naming Considerations

Cinephage uses file names to identify content. Best results come from:

**Good File Names:**
```
Movie.Title.2024.1080p.BluRay.x264-Group.mkv
The.Matrix.1999.2160p.UHD.BluRay.REMUX.mkv
TV.Show.S01E05.Episode.Title.720p.WEB-DL.mkv
```

**Problematic File Names:**
```
Movie.mkv                    # No identifying info
Downloaded_File_123.mkv      # Obfuscated name
video.mp4                    # Generic name
```

:::tip Rename Before Import
If your files have cryptic names, consider using a bulk renamer like:
- **FileBot** (cross-platform)
- **Advanced Renamer** (Windows)
- **Rename** (macOS)
- **mmv** (Linux)
:::

## Importing Movies

### Step 1: Access Import Interface

1. Go to **Library > Movies**
2. Click the **Import** button in the top right
3. The Import Movies dialog opens

### Step 2: Select Source Folder

1. Click **Browse** or enter the path
2. Navigate to the folder containing your movie files
3. Cinephage scans the folder recursively

**Supported Movie Folder Structures:**

```
# Flat structure (all movies in one folder)
/movies/
  Movie.Title.2024.1080p.mkv
  Another.Movie.2023.720p.mkv

# Folder per movie (recommended)
/movies/
  Movie Title (2024)/
    Movie.Title.2024.1080p.mkv
  Another Movie (2023)/
    Another.Movie.2023.720p.mkv
    Another.Movie.2023.720p.en.srt
```

### Step 3: Review Detected Files

Cinephage displays all detected movie files with:

- **File Path** - Location on disk
- **Detected Title** - Parsed movie title
- **Detected Year** - Parsed release year
- **Match Confidence** - How certain the match is
- **TMDB Match** - Suggested TMDB title

### Step 4: Match Files to TMDB

For each file, verify or correct the TMDB match:

**Automatic Matches (High Confidence):**

- If match is correct, leave as-is
- Cinephage will import automatically

**Incorrect Matches:**

1. Click **Edit Match** on the file
2. Search for correct title in TMDB
3. Select correct movie from results
4. Click **Apply**

**No Match Found:**

1. Click **Search TMDB**
2. Enter movie title manually
3. Select correct result
4. Or click **Ignore** to skip file

:::tip Batch Matching
Use the checkboxes to select multiple files and apply the same action:
- **Match All** - Accept all automatic matches
- **Ignore Selected** - Skip selected files
- **Refresh Matches** - Re-scan with different parsing
:::

### Step 5: Configure Import Options

Before importing, configure options:

| Option | Description | Default |
|--------|-------------|---------|
| **Root Folder** | Where to move/copy files | Your movies root folder |
| **Quality Profile** | Profile for imported movies | Default movie profile |
| **Import Method** | How to handle files | Copy |
| **Rename Files** | Apply naming pattern | Yes |
| **Monitor** | Enable monitoring after import | Yes |

### Step 6: Start Import

1. Review the import summary:
   - Number of files to import
   - Number to ignore
   - Disk space required
2. Click **Import**
3. Cinephage processes files:
   - Copies/moves files to root folder
   - Renames according to pattern
   - Adds to library
   - Fetches metadata from TMDB

### Step 7: Verify Import

After import completes:

1. Go to **Library > Movies**
2. Verify movies appear with correct metadata
3. Check file locations in movie details
4. Confirm artwork and info loaded

## Importing TV Shows

TV show importing follows a similar process with additional complexity for seasons and episodes.

### Step 1: Access Import Interface

1. Go to **Library > TV Shows**
2. Click the **Import** button
3. Select **Import TV Shows**

### Step 2: Select Source Folder

Navigate to your TV show collection:

**Supported TV Folder Structures:**

```
# Standard structure (recommended)
/tv/
  Show Name/
    Season 01/
      Show.Name.S01E01.mkv
      Show.Name.S01E02.mkv
    Season 02/
      Show.Name.S02E01.mkv

# Alternative structure
/tv/
  Show Name/
    Show.Name.S01E01.mkv
    Show.Name.S01E02.mkv
    Show.Name.S02E01.mkv

# Mixed content
/tv/
  Show.Name.S01E01.mkv
  Show.Name.S01E02.mkv
  Another.Show.S01E01.mkv
```

### Step 3: Series Identification

Cinephage attempts to identify each series:

**Automatic Detection:**

- Parses folder names for series titles
- Identifies season folders
- Extracts episode numbers from filenames

**Series Matching:**

For each detected series:

1. Review suggested TMDB match
2. Verify series title is correct
3. Confirm episode numbering matches TMDB
4. Correct any mismatches

:::warning Episode Numbering
TV episode numbering must match TMDB exactly. Some series have different ordering on different databases. Always verify against TMDB.
:::

### Step 4: Episode Matching

After series is identified, match individual episodes:

**Review Episode List:**

- Episode file names
- Detected season/episode numbers
- Suggested TMDB episode titles
- Match confidence

**Common Issues:**

| Issue | Solution |
|-------|----------|
| **Multi-episode files** | Tag as S01E01-E02 for double episodes |
| **Specials** | Use S00 for specials/extras |
| **Absolute numbering** | Some anime uses absolute numbers; convert to SXXEXX |
| **Missing episodes** | Mark as not present; Cinephage will search for them |

### Step 5: Import Options

Configure TV import settings:

| Option | Description | Recommendation |
|--------|-------------|----------------|
| **Root Folder** | TV shows location | Your TV root folder |
| **Quality Profile** | Profile for series | Default TV profile |
| **Import Method** | Copy/Move/Hardlink | Use Hardlink if same filesystem |
| **Season Folder Format** | How to name season folders | `Season {season:00}` |
| **Episode Naming** | Episode file pattern | `{Series Title} - S{season:00}E{episode:00}` |
| **Monitor Series** | Enable monitoring | Yes |
| **Monitor Future Seasons** | Auto-monitor new seasons | Yes |

### Step 6: Complete Import

1. Review series and episode counts
2. Click **Import**
3. Cinephage:
   - Creates series folders
   - Organizes season folders
   - Renames episode files
   - Adds to library with monitoring

## Import Methods Explained

### Copy

- **What it does:** Duplicates files to root folder
- **Space required:** 2x current usage temporarily
- **Time:** Slowest (full file copy)
- **Best for:** Keeping original files intact
- **After import:** Original files remain in source

### Move

- **What it does:** Relocates files to root folder
- **Space required:** No additional space
- **Time:** Fast (just moves pointers)
- **Best for:** Permanent migration
- **After import:** Source folder empty

### Hardlink

- **What it does:** Creates second reference to same data
- **Space required:** No additional space
- **Time:** Instant
- **Best for:** Same filesystem, seeding torrents
- **After import:** Two paths to same file data

:::tip Hardlink Requirements
Hardlinks only work when source and destination are on the **same filesystem**. They don't work across different drives or network mounts.
:::

### Symlink

- **What it does:** Creates pointer to original file
- **Space required:** Minimal (just the link)
- **Time:** Instant
- **Best for:** Linking to external libraries
- **After import:** Library points to original location

## Bulk Import from Existing Libraries

If you have an existing organized media library:

**Preparation:**

1. Note your current folder structure
2. Document any naming patterns you use
3. Have TMDB API key ready for matching

**Import Process:**

1. **Configure root folders** in Cinephage pointing to your media
2. **Import existing files** using methods above
3. Cinephage will:
   - Recognize existing folder structure
   - Match to TMDB
   - Preserve your organization

**What Transfers:**

-  File locations and structure
-  Media files themselves
-  TMDB matching

**What You'll Set Up Fresh:**

-  Quality profiles
-  Custom formats
-  Monitoring preferences

### Parallel Running

You can run Cinephage alongside other media tools:

**Option 1: Read-Only Mode**

1. Configure Cinephage with same root folders
2. Import files using **Hardlink** method
3. Keep other app active for downloads
4. Use Cinephage for discovery/browsing

**Option 2: Gradual Migration**

1. Add new content to Cinephage only
2. Import existing content gradually
3. Disable monitoring in old app for imported items
4. Eventually decommission old app

## Troubleshooting Import

### Files Not Detected

**Check File Extensions:**

Cinephage looks for video file extensions:
```
.mkv, .mp4, .avi, .m4v, .mov, .wmv, .ts, .m2ts
```

**Check Folder Permissions:**

```bash
# Check permissions
ls -la /path/to/media

# Fix if needed
chmod -R 755 /path/to/media
chown -R user:group /path/to/media
```

**Verify Path:**

- Docker: Use container path, not host path
- Native: Use absolute path
- Network: Ensure mount is accessible

### Incorrect TMDB Matches

**Common Causes:**

- File name doesn't include year
- Similar titles confuse matching
- Foreign titles use different names

**Solutions:**

1. Manually search TMDB during import
2. Add year to filename before importing
3. Use TMDB ID in filename for exact match:
   ```
   Movie.Title.{tmdb-12345}.mkv
   ```

### Import Stuck or Slow

**Large Libraries:**

- Import in batches (100-200 files at a time)
- Use CLI import for very large collections
- Monitor system resources during import

**Database Locks:**

- Restart Cinephage if import hangs
- Check logs for errors
- Ensure database disk isn't full

### Duplicate Movies/Series

**Detection:**

Cinephage warns about potential duplicates:
- Same TMDB ID
- Similar file sizes
- Close file names

**Resolution:**

1. Choose **Keep Best Quality** - Keep higher resolution file
2. Choose **Keep Both** - If different editions
3. Choose **Skip** - Don't import this file

## Advanced Import Techniques

### CLI Import

For headless or scripted imports:

```bash
# Import specific folder
npm run import -- --path /path/to/movies --type movie

# Import with options
npm run import -- --path /path/to/tv --type tv --method hardlink --monitor true
```

### Import Scripts

Automate imports with custom scripts:

```bash
#!/bin/bash
# import-new.sh - Import new downloads

SOURCE="/downloads/complete"
DEST_MOVIES="/media/movies"
DEST_TV="/media/tv"

# Trigger Cinephage import API
curl -X POST http://localhost:3000/api/import \
  -H "Content-Type: application/json" \
  -d '{
    "path": "'"$SOURCE"'",
    "type": "auto",
    "method": "move"
  }'
```

### Watch Folders

Configure automatic import from specific folders:

1. Go to **Settings > Media Management > Import**
2. Add watch folder:
   - Path: `/downloads/complete`
   - Type: Auto-detect (Movie/TV)
   - Action: Import and organize
3. Files in watch folder automatically import

## Best Practices

### Before Importing

1. **Backup your files** - Always have backups before bulk operations
2. **Test with small batch** - Import 5-10 files first
3. **Verify naming** - Ensure files have clear, parsable names
4. **Check disk space** - Ensure destination has room

### During Import

1. **Monitor progress** - Don't close browser during active import
2. **Review matches** - Verify TMDB matches are correct
3. **Handle errors** - Address failed imports immediately
4. **Check results** - Verify files in correct locations

### After Import

1. **Verify library** - Check that all items appear correctly
2. **Enable monitoring** - For items you want to track
3. **Update quality profiles** - Adjust per item if needed
4. **Clean up source** - Remove original files if using Copy method

## See Also

- [Adding Media](../../getting-started/adding-media) - Add new content to library
- [Organize Files](organize-files) - Custom naming patterns
- [Configure Download Clients](../configure/download-clients) - Set up automatic downloads
- [Understanding the Interface](../../getting-started/understanding-interface) - Navigate your library
