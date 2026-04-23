---
title: Naming tokens
description: Complete list of tokens for file naming patterns
sidebar_position: 2
tags: [naming, tokens, reference]
keywords: [naming, tokens, variables, patterns]
---

# Naming tokens

This reference lists all available tokens for customizing file naming patterns in Cinephage.

## Overview

Naming tokens allow dynamic construction of filenames and paths based on media metadata. Tokens are enclosed in curly braces `{}` and are replaced with actual values during organization.

## Movie Tokens

Tokens available for movie file naming.

| Token | Description | Example |
|-------|-------------|---------|
| `{Movie Title}` | Full movie title | `Inception` |
| `{Movie TitleThe}` | Title with "The" moved to end | `Dark Knight, The` |
| `{Movie CleanTitle}` | Title with special chars removed | `Inception` |
| `{Year}` | Release year | `2010` |
| `{Release Year}` | Full release date (YYYY-MM-DD) | `2010-07-16` |
| `{Edition Tags}` | Edition tags (Director's Cut, etc.) | `Director's Cut` |
| `{Quality Full}` | Full quality string | `1080p BluRay` |
| `{Quality Title}` | Quality without source | `1080p` |
| `{MediaInfo VideoCodec}` | Video codec | `x264` |
| `{MediaInfo AudioCodec}` | Audio codec | `DTS` |
| `{MediaInfo AudioChannels}` | Audio channels | `5.1` |
| `{MediaInfo VideoBitDepth}` | Video bit depth | `10` |
| `{MediaInfo VideoDynamicRange}` | HDR/SDR | `HDR` |
| `{MediaInfo VideoDynamicRangeType}` | HDR type | `HDR10` |
| `{MediaInfo AudioLanguages}` | Audio languages | `en` |
| `{MediaInfo SubtitleLanguages}` | Subtitle languages | `en,es` |
| `{MediaInfo Simple}` | Simplified mediainfo | `x264 DTS` |
| `{MediaInfo Full}` | Full mediainfo string | `x264 DTS 5.1` |
| `{IMDb Id}` | IMDb ID | `tt1375666` |
| `{TMDb Id}` | TMDb ID | `27205` |
| `{Genres}` | Movie genres | `Action, Sci-Fi` |
| `{Studio}` | Studio name | `Warner Bros` |
| `{Collection}` | Movie collection name | `The Dark Knight Collection` |

## TV Tokens

Tokens available for TV episode file naming.

| Token | Description | Example |
|-------|-------------|---------|
| `{Series Title}` | Full series title | `Breaking Bad` |
| `{Series TitleThe}` | Title with "The" moved to end | `Office, The` |
| `{Series CleanTitle}` | Title with special chars removed | `Breaking Bad` |
| `{Series TitleYear}` | Title with year | `The Office (2005)` |
| `{Season}` | Season number (zero-padded) | `01` |
| `{Season:0}` | Season number (no padding) | `1` |
| `{Season:00}` | Season number (zero-padded) | `01` |
| `{Episode}` | Episode number (zero-padded) | `05` |
| `{Episode:0}` | Episode number (no padding) | `5` |
| `{Episode:00}` | Episode number (zero-padded) | `05` |
| `{Episode Title}` | Episode title | `Pilot` |
| `{Episode CleanTitle}` | Episode title cleaned | `Pilot` |
| `{Absolute Episode}` | Absolute episode number | `100` |
| `{Air Date}` | Original air date | `2010-01-15` |
| `{Air Year}` | Air year | `2010` |
| `{Quality Full}` | Full quality string | `1080p WEB-DL` |
| `{Quality Title}` | Quality without source | `1080p` |
| `{MediaInfo VideoCodec}` | Video codec | `x264` |
| `{MediaInfo AudioCodec}` | Audio codec | `AAC` |
| `{MediaInfo AudioChannels}` | Audio channels | `2.0` |
| `{MediaInfo VideoBitDepth}` | Video bit depth | `8` |
| `{MediaInfo VideoDynamicRange}` | HDR/SDR | `SDR` |
| `{MediaInfo AudioLanguages}` | Audio languages | `en,ja` |
| `{MediaInfo SubtitleLanguages}` | Subtitle languages | `en` |
| `{Series Genres}` | Series genres | `Drama, Crime` |
| `{Network}` | TV network | `AMC` |
| `{IMDb Id}` | Series IMDb ID | `tt0903747` |
| `{TVDb Id}` | TVDb ID | `81189` |
| `{TVMDb Id}` | TMDb series ID | `1396` |
| `{TVRage Id}` | TVRage ID | `18164` |

## Path Tokens

Tokens for constructing file paths.

| Token | Description | Example |
|-------|-------------|---------|
| `{Source Path}` | Original file location | `/downloads/movie.mkv` |
| `{Source Filename}` | Original filename | `movie.mkv` |
| `{Source Title}` | Original release title | `Movie.2010.1080p.BluRay` |
| `{Destination Path}` | Target directory | `/movies/Inception (2010)` |
| `{MediaInfo VideoFormat}` | Container format | `MKV` |
| `{Original Title}` | Original release name | `Movie.2010.1080p` |

## Indexer Tokens

Tokens related to indexer and download information.

| Token | Description | Example |
|-------|-------------|---------|
| `{Indexer}` | Indexer name | `1337x` |
| `{IndexerId}` | Indexer ID | `1337x` |
| `{Download Client}` | Download client name | `qBittorrent` |
| `{DownloadId}` | Download client ID | `hash123` |

## Quality Tokens

Detailed quality information tokens.

| Token | Description | Example |
|-------|-------------|---------|
| `{Quality}` | Quality name | `1080p` |
| `{Quality Type}` | Quality type | `Bluray` |
| `{Quality Source}` | Quality source | `Bluray-1080p` |
| `{Quality Modifier}` | Quality modifier | `REMUX` |
| `{Quality Revision}` | Quality revision | `v2` |
| `{Preferred Word}` | Matched preferred word | `Remux` |
| `{Release Group}` | Release group name | `SPARKS` |
| `{Custom Format}` | Matched custom format | `My Format` |

## Size and Language Tokens

Tokens for file size and language information.

| Token | Description | Example |
|-------|-------------|---------|
| `{Size}` | File size in bytes | `1073741824` |
| `{Size on Disk}` | Size on disk | `1073741824` |
| `{Languages}` | All languages | `en,es,fr` |
| `{Original Language}` | Original language | `en` |

## Date Tokens

Various date formats for organization.

| Token | Description | Example |
|-------|-------------|---------|
| `{Release Date}` | Release date | `2010-07-16` |
| `{Release Date:yyyy}` | Release year | `2010` |
| `{Release Date:MM}` | Release month | `07` |
| `{Release Date:dd}` | Release day | `16` |
| `{Added Date}` | Date added to library | `2024-01-15` |
| `{Added Date:yyyy-MM-dd}` | Added date formatted | `2024-01-15` |
| `{Import Date}` | Import date | `2024-01-15` |
| `{Cinephage Import Date}` | Cinephage import date | `2024-01-15` |

## Technical Tokens

Advanced tokens for technical metadata.

| Token | Description | Example |
|-------|-------------|---------|
| `{MediaInfo VideoBitrate}` | Video bitrate | `10000` |
| `{MediaInfo VideoFramerate}` | Frame rate | `23.976` |
| `{MediaInfo VideoResolution}` | Resolution | `1920x1080` |
| `{MediaInfo VideoAspectRatio}` | Aspect ratio | `1.78` |
| `{MediaInfo AudioBitrate}` | Audio bitrate | `1536` |
| `{MediaInfo AudioSampleRate}` | Audio sample rate | `48000` |
| `{MediaInfo AudioChannelsFriendly}` | Friendly channel count | `5.1` |
| `{MediaInfo SubtitleCount}` | Number of subtitles | `3` |

## Conditional Tokens

Tokens that support conditional logic.

| Token | Description | Usage |
|-------|-------------|-------|
| `{Series Tags}` | Series tags | `{Series Tags:}` |
| `{Episode Tags}` | Episode tags | `{Episode Tags:}` |
| `{Custom Formats}` | All custom formats | `{Custom Formats:,}` |

## Special Characters

Special characters for formatting.

| Character | Description | Example |
|-----------|-------------|---------|
| `\` | Path separator | `\{Movie Title}\` |
| `/` | Alternative separator | `/{Movie Title}/` |
| `"` | Quote in filename | `"{Movie Title}"` |
| `'` | Apostrophe | `'{Movie Title}'` |

## Usage Examples

### Movie Naming Examples

**Standard movie file:**
```
{Movie Title} ({Year}) - {Quality Full}
# Result: Inception (2010) - 1080p BluRay
```

**With media info:**
```
{Movie Title} ({Year}) [{MediaInfo Simple}]
# Result: Inception (2010) [x264 DTS]
```

**With release group:**
```
{Movie Title} ({Year}) - {Quality Full} - {Release Group}
# Result: Inception (2010) - 1080p BluRay - SPARKS
```

**Path with collection:**
```
{Collection}\{Movie Title} ({Year})\{Movie Title} ({Year}) - {Quality Full}
# Result: The Dark Knight Collection\The Dark Knight (2008)\The Dark Knight (2008) - 1080p BluRay
```

### TV Naming Examples

**Standard episode:**
```
{Series Title} - S{Season:00}E{Episode:00} - {Episode Title}
# Result: Breaking Bad - S01E01 - Pilot
```

**With quality:**
```
{Series Title} - S{Season:00}E{Episode:00} - {Episode Title} [{Quality Full}]
# Result: Breaking Bad - S01E01 - Pilot [1080p WEB-DL]
```

**Season folder:**
```
{Series Title}\Season {Season:00}\{Series Title} - S{Season:00}E{Episode:00}
# Result: Breaking Bad\Season 01\Breaking Bad - S01E01
```

**Anime with absolute numbering:**
```
{Series Title} - {Absolute Episode:000} - {Episode Title}
# Result: One Piece - 100 - The Legend Begins
```

### Path Organization Examples

**Movies by quality:**
```
Movies\{Quality Title}\{Movie Title} ({Year})
# Result: Movies\1080p\Inception (2010)
```

**TV by year:**
```
TV\{Series Title}\{Air Year}\{Series Title} - S{Season:00}E{Episode:00}
# Result: TV\Breaking Bad\2008\Breaking Bad - S01E01
```

**By genre:**
```
{Genres}\{Movie Title} ({Year})
# Result: Action, Sci-Fi\Inception (2010)
```

**By indexer:**
```
{Indexer}\{Movie Title} ({Year}) - {Quality Full}
# Result: 1337x\Inception (2010) - 1080p BluRay
```

## Token Modifiers

Tokens support modifiers for formatting control.

| Modifier | Description | Example |
|----------|-------------|---------|
| `:0` | No zero padding | `{Season:0}` → `1` |
| `:00` | Zero padding | `{Season:00}` → `01` |
| `:000` | Triple padding | `{Absolute Episode:000}` → `001` |
| `:yyyy` | Year format | `{Release Date:yyyy}` → `2010` |
| `:MM` | Month format | `{Release Date:MM}` → `07` |
| `:dd` | Day format | `{Release Date:dd}` → `16` |

## Reserved Characters

Characters that may need escaping in filenames:

| Character | Issue | Solution |
|-----------|-------|----------|
| `:` | Invalid on Windows | Automatically replaced with `-` |
| `/` | Path separator | Use `\` for folders |
| `\` | Path separator | Use for folder separation |
| `?` | Wildcard | Automatically removed |
| `*` | Wildcard | Automatically removed |
| `"` | Quote | Automatically replaced with `'` |
| `<` `>` | Reserved | Automatically removed |
| `\|` | Reserved | Automatically removed |

## See Also

- [Indexer Definitions](indexer-definitions) - YAML format for defining custom indexers
- [How to Configure Indexers](../../guides/configure/indexers) - Step-by-step guide for configuring indexers
- [How to Organize Files](../../guides/use/organize-files) - Guide to file organization and naming patterns
- [Root Folders](../../guides/configure/root-folders) - Configure root folders and naming settings
