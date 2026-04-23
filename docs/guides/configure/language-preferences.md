---
title: Language preferences
description: Configure per-library subtitle and language settings
sidebar_position: 9
tags: [library, language, subtitles, configuration, guide]
keywords: [library, language, subtitles, preferences]
---

# Language preferences

Cinephage supports **per-library language preferences** - you can set different subtitle language requirements for each library (Movies vs TV Shows).

## How It Works

Each library can have its own language profile:

```
Movies Library → English Primary + Spanish Secondary
TV Shows Library → English Only
Anime Library → Japanese + English
```

This is independent of root folder settings - you can have multiple libraries using the same root folder but with different language preferences.

## Setting Language Preferences

### Step 1: Create Language Profiles

1. Go to **Settings > Integrations > Language Profiles**
2. Create profiles for different use cases:
   - `English Primary` - English required, Spanish optional
   - `English Only` - English required only
   - `Multi-Language` - Multiple languages required

### Step 2: Configure Library Language Settings

1. Go to **Settings > Media Management > Root Folders**
2. Click **Edit** on a root folder
3. Under **Language Preferences**, select:
   - **Default Language Profile** for this library
   - **Subtitle Search Behavior** (import, monitoring, etc.)

### Step 3: Assign to Libraries

1. Go to **Library > Movies** (or **TV Shows**)
2. Click **Settings** (gear icon) for that library
3. Select the **Language Profile** to use
4. Configure subtitle search options:
   - **Search on Import** - Find subtitles when content is added
   - **Monitor for Upgrades** - Search for better subtitles periodically
   - **Required Languages** - Languages that must be present

## Library-Specific Settings

Each library (Movies, TV Shows) has independent subtitle settings:

| Setting | Movies Library | TV Shows Library |
|---------|---------------|------------------|
| Default Language Profile | Configurable | Configurable |
| Search on Import | Enabled by default | Enabled by default |
| Monitor for Upgrades | Per profile setting | Per profile setting |
| Required Languages | From profile | From profile |

## Benefits of Per-Library Settings

- **Language-Specific Libraries**: Anime library with Japanese + English, English library for mainstream content
- **Different Standards**: Movies might need more subtitle options than TV shows
- **Storage Efficiency**: Don't download Spanish subtitles for English-only libraries
- **Flexible Monitoring**: Some libraries monitor for upgrades, others don't

## Bulk Assign Language Profile

Apply a language profile to multiple items at once:

1. Go to **Library > Movies** (or **TV Shows**)
2. Select multiple items using checkboxes
3. Click **Edit**
4. Under **Language Profile**, select a new profile
5. Click **Save**

This changes the subtitle behavior for all selected items.

## See Also

- [Subtitles](subtitles) - Subtitle provider configuration
- [Root Folders](root-folders) - Configure root folder settings
