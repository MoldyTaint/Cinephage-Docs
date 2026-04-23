---
title: Organize files
description: Use custom naming patterns and folder structures to organize your media library
sidebar_position: 5
tags: [naming, organization, files, guide, patterns, tokens]
keywords: [naming, organization, files, patterns, tokens]
---

# Organize files

This guide explains how to use custom naming patterns to organize your media library exactly how you want it.

## Overview

Cinephage automatically organizes files using customizable naming patterns. You control:

- **Folder structure** - How movies and shows are organized
- **File names** - How individual files are named
- **Special handling** - Multi-episode files, specials, etc.

## Understanding Naming Patterns

Naming patterns use **tokens** (variables) that get replaced with actual values:

```
{Movie Title} ({Release Year}) - {Quality} - {Group}
↓
The Matrix (1999) - 1080p BluRay - YIFY
```

### Available Tokens

#### Movie Tokens

| Token | Description | Example |
|-------|-------------|---------|
| `{Movie Title}` | Full movie title | "The Matrix" |
| `{Movie Title:EN}` | Title in English | "The Matrix" |
| `{Release Year}` | Release year | "1999" |
| `{IMDb Id}` | IMDb identifier | "tt0133093" |
| `{TMDB Id}` | TMDB identifier | "603" |
| `{Quality}` | Quality string | "1080p BluRay" |
| `{Quality:Full}` | Full quality details | "1080p BluRay x264" |
| `{Group}` | Release group | "YIFY" |
| `{Edition}` | Edition tag | "Director's Cut" |
| `{Codec}` | Video codec | "x264" |
| `{Audio}` | Audio codec | "DTS" |
| `{Audio:Channels}` | Audio channels | "5.1" |
| `{HDR}` | HDR format | "HDR10" |

#### TV Show Tokens

| Token | Description | Example |
|-------|-------------|---------|
| `{Series Title}` | Show title | "Breaking Bad" |
| `{Season:00}` | Season number (2 digits) | "01" |
| `{Episode:00}` | Episode number (2 digits) | "05" |
| `{Episode Title}` | Episode title | "Pilot" |
| `{Absolute:000}` | Absolute episode number | "001" |
| `{Air Date}` | Original air date | "2008-01-20" |
| `{Series Year}` | Series start year | "2008" |

## Configuring Naming Patterns

### Access Naming Settings

1. Go to **Settings > Media Management > Naming**
2. Configure patterns for Movies and TV separately

### Movie Folder Pattern

Controls how movie folders are named:

**Default Pattern:**
```
{Movie Title} ({Release Year})
```

**Examples:**
- "The Matrix (1999)"
- "Inception (2010)"
- "Parasite (2019)"

**Custom Patterns:**

```
# Include IMDb ID for easy matching
{Movie Title} ({Release Year}) [{IMDb Id}]
→ The Matrix (1999) [tt0133093]

# Quality in folder name
{Movie Title} ({Release Year}) [{Quality}]
→ The Matrix (1999) [1080p]

# First letter organization (A, B, C...)
{Movie Title:First}/{Movie Title} ({Release Year})
→ T/The Matrix (1999)
```

### Movie File Pattern

Controls how movie files are renamed:

**Default Pattern:**
```
{Movie Title} ({Release Year}) - {Quality} - {Group}
```

**Examples:**
- "The Matrix (1999) - 1080p BluRay - YIFY.mkv"
- "Inception (2010) - 2160p UHD BluRay - SPARKS.mkv"

**Custom Patterns:**

```
# Include edition info
{Movie Title} ({Release Year}) - {Edition} - {Quality}
→ The Matrix (1999) - Director's Cut - 1080p BluRay.mkv

# Group and codec
{Movie Title} ({Release Year}) [{Quality}][{Codec}]-{Group}
→ The Matrix (1999) [1080p BluRay][x264]-YIFY.mkv

# Minimal naming
{Movie Title} ({Release Year})
→ The Matrix (1999).mkv

# Maximum info
{Movie Title} ({Release Year}) - {Quality:Full} [{Codec} {Audio} {Audio:Channels}] [{Group}]
→ The Matrix (1999) - 1080p BluRay x264 [x264 DTS 5.1] [YIFY].mkv
```

### TV Show Folder Pattern

Controls series and season folder naming:

**Series Folder Pattern:**
```
{Series Title} ({Series Year})
```

**Season Folder Pattern:**
```
Season {Season:00}
```

**Combined Structure:**
```
Breaking Bad (2008)/
  Season 01/
    Breaking Bad - S01E01 - Pilot.mkv
    Breaking Bad - S01E02 - Cat's in the Bag.mkv
```

**Custom Patterns:**

```
# Alternative season naming
Season {Season}          → Season 1
S{Season:00}             → S01
{Season:00}x##           → 01x##

# Year-based seasons
{Series Title}/Season {Season:00} ({Air Date:YYYY})
→ Breaking Bad/Season 01 (2008)

# Quality in season folder
{Series Title}/Season {Season:00} [{Quality}]
→ Breaking Bad/Season 01 [1080p]
```

### Episode File Pattern

Controls how episode files are named:

**Default Pattern:**
```
{Series Title} - S{Season:00}E{Episode:00} - {Episode Title}
```

**Examples:**
- "Breaking Bad - S01E01 - Pilot.mkv"
- "Breaking Bad - S01E02 - Cat's in the Bag.mkv"

**Custom Patterns:**

```
# Dot notation
{Series.Title}.S{Season:00}E{Episode:00}.{Episode.Title}
→ Breaking.Bad.S01E01.Pilot.mkv

# Include quality
{Series Title} - S{Season:00}E{Episode:00} - {Episode Title} [{Quality}]
→ Breaking Bad - S01E01 - Pilot [1080p WEB-DL].mkv

# Absolute numbering (for anime)
{Series Title} - {Absolute:000} - {Episode Title}
→ Attack on Titan - 001 - To You, in 2000 Years.mkv

# Minimal
S{Season:00}E{Episode:00}
→ S01E01.mkv

# Date-based
{Series Title} - {Air Date} - {Episode Title}
→ The Daily Show - 2024-01-15 - Guest Name.mkv
```

## Advanced Naming Techniques

### Conditional Tokens

Some tokens only appear when applicable:

```
{Movie Title} ({Release Year}){if Edition} - {Edition}{end}
→ The Matrix (1999) - Director's Cut
→ Inception (2010)  [no edition, so no extra text]
```

### Multi-Episode Files

Handle episodes that span multiple files:

```
# Double episode
{Series Title} - S{Season:00}E{Episode:00}-E{Episode:00}
→ Show - S01E01-E02 - Special Two-Parter.mkv

# Range notation
{Series Title} - S{Season:00}E{Episode:00}-{End Episode:00}
→ Show - S01E01-03 - Three Episode Arc.mkv
```

### Specials and Extras

Naming for non-standard episodes:

```
# Specials folder
{Series Title}/Specials/{Series Title} - S00E{Episode:00} - {Episode Title}
→ Breaking Bad/Specials/Breaking Bad - S00E01 - Minisodes.mkv

# Bonus content
{Movie Title} ({Release Year})/Extras/{Type} - {Title}
→ The Matrix (1999)/Extras/Behind the Scenes - Making Of.mkv
```

### Custom Format Token

Use custom format scores in naming:

```
{Movie Title} ({Release Year}) [CF:{Custom Format}]
→ Movie (2024) [CF:Remux][CF:HDR10].mkv
```

## Folder Structure Examples

### Standard Movie Structure

```
/movies/
  Avatar (2009)/
    Avatar (2009) - 2160p BluRay.mkv
    Avatar (2009) - 2160p BluRay.en.srt
    poster.jpg
    fanart.jpg
  
  The Godfather (1972)/
    The Godfather (1972) - 1080p BluRay.mkv
    The Godfather (1972) - 1080p BluRay.en.srt
    The Godfather (1972) - 1080p BluRay.fr.srt
```

### By Quality Structure

```
/movies/
  2160p/
    Avatar (2009)/
      Avatar (2009) - 2160p.mkv
  1080p/
    The Godfather (1972)/
      The Godfather (1972) - 1080p.mkv
  720p/
    Old.Movie (1990)/
      Old.Movie (1990) - 720p.mkv
```

### By First Letter Structure

```
/movies/
  A/
    Avatar (2009)/
    Avengers Endgame (2019)/
  B/
    Back to the Future (1985)/
    Blade Runner (1982)/
  C/
    Casablanca (1942)/
```

### Standard TV Structure

```
/tv/
  Breaking Bad (2008)/
    Season 01/
      Breaking Bad - S01E01 - Pilot.mkv
      Breaking Bad - S01E02 - Cat's in the Bag.mkv
      Breaking Bad - S01E03 - ...And the Bag's in the River.mkv
    Season 02/
      Breaking Bad - S02E01 - Seven Thirty-Seven.mkv
    Specials/
      Breaking Bad - S00E01 - Minisodes.mkv
    poster.jpg
    fanart.jpg
```

### Anime Structure

```
/anime/
  Attack on Titan (2013)/
    Season 01/
      Attack on Titan - 001 - To You, in 2000 Years.mkv
      Attack on Titan - 002 - That Day.mkv
    Season 02/
      Attack on Titan - 026 - Beast Titan.mkv
```

## Applying Naming Patterns

### To New Downloads

Naming applies automatically to new downloads:

1. Configure patterns in Settings
2. Download content via search
3. Cinephage organizes files automatically
4. Names follow your patterns

### To Existing Files

Rename existing library:

1. Go to **Library** (Movies or TV)
2. Select items to rename
3. Click **Organize** or **Rename**
4. Preview changes
5. Confirm rename

**Bulk Rename:**

1. Select multiple items
2. Click **Organize Selected**
3. Preview all changes
4. Confirm batch rename

:::warning Rename Carefully
Renaming affects file paths. If you have:
- Hardlinks from torrent clients (may break seeding)
- Media server libraries (may need rescan)
- Scripts referencing file paths

Preview changes before applying!
:::

## Troubleshooting Organization

### Files Not Renaming

**Check Pattern Syntax:**

- Ensure all `{` have matching `}`
- Tokens are case-sensitive
- Invalid tokens are ignored

**Check Permissions:**

```bash
# Verify write permissions
ls -la /path/to/media

# Fix permissions
chmod -R u+w /path/to/media
```

**Check Disk Space:**

- Renaming requires temporary space
- Ensure destination has room

### Wrong Folder Structure

**Review Root Folders:**

Ensure root folders are configured:
```
Settings > Media Management > Root Folders
```

**Check Path Separators:**

```
# Correct (uses /)
{Movie Title}/{Movie Title} ({Release Year})

# Incorrect (uses \ on non-Windows)
{Movie Title}\{Movie Title} ({Release Year})
```

### Special Characters

Cinephage sanitizes filenames automatically:

| Character | Replacement | Example |
|-----------|-------------|---------|
| `/` | `-` | "A/B Testing" → "A-B Testing" |
| `\` | `-` | Same as above |
| `:` | ` -` | "Movie: Subtitle" → "Movie - Subtitle" |
| `*` | `` | Removed |
| `?` | `` | Removed |
| `"` | `'` | "Movie\"Title\"" → "Movie'Title'" |
| `<` `>` | `` | Removed |
| `|` | `-` | Replaced with dash |

## Best Practices

### For Movies

1. **Include year** - Prevents confusion between remakes
2. **Keep it simple** - Don't over-complicate patterns
3. **Quality optional** - Can be in filename or folder
4. **Group optional** - Useful for some, clutter for others

### For TV Shows

1. **S00E00 format** - Most compatible with all players
2. **Include episode titles** - Makes browsing easier
3. **Separate specials** - Use S00 for special episodes
4. **Consistent season folders** - Season 01, not Season 1

### General Tips

1. **Test patterns first** - Use preview before applying
2. **Document your pattern** - Keep a note of your settings
3. **Backup before bulk rename** - Protect against mistakes
4. **Consider your players** - Ensure patterns work with your media server
5. **Stay consistent** - Don't change patterns frequently

## Common Naming Patterns

### Movie Pattern Example

```
{Movie Title} ({Release Year}) - {Quality:Full}
```

### TV Show Pattern Example

```
{Series Title} - S{Season:00}E{Episode:00} - {Episode Title} [{Quality:Full}]
```

## See Also

- [Naming Tokens Reference](../../reference/yaml/naming-tokens) - Complete token list
- [Import Existing Files](import-existing-files) - Import with your new patterns
- [Settings Explained](../../reference/configuration/settings-explained) - All configuration options
- [Understanding the Interface](../../getting-started/understanding-interface) - Browse your organized library
