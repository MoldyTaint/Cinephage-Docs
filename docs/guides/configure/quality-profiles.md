---
title: Set up quality profiles
description: Configure quality scoring, custom formats, and upgrade behavior
sidebar_position: 3
tags: [quality-profiles, custom-formats, scoring, configuration, guide]
keywords: [quality profiles, scoring, custom formats, upgrades]
---

# Set up quality profiles

This guide explains Cinephage's quality system and how to configure quality profiles and custom formats for intelligent release selection.

## Goal

Configure how Cinephage scores and selects releases, including upgrade behavior and custom format rules.

## Prerequisites

- Cinephage installed and running
- Basic understanding of video formats (resolution, codecs, sources)

## Understanding Quality in Cinephage

Cinephage uses a **scoring-based** quality system rather than simple quality levels. Each release is scored based on multiple factors:

### Scoring Factors

Cinephage considers 50+ factors when scoring releases:

**Resolution (Base Score):**

- 2160p (4K): 100 points
- 1080p: 80 points
- 720p: 50 points
- 480p: 20 points

**Source Quality:**

- BluRay: +40 points
- WEB-DL: +30 points
- HDTV: +10 points
- DVD: +5 points

**Codec Efficiency:**

- H.265/HEVC: +20 points
- AV1: +25 points
- H.264: +0 points
- MPEG-2: -10 points

**HDR Formats:**

- Dolby Vision: +30 points
- HDR10+: +20 points
- HDR10: +15 points
- SDR: +0 points

**Audio Quality:**

- Dolby Atmos: +25 points
- DTS-HD MA: +20 points
- TrueHD: +15 points
- AAC: +5 points

**Release Group Reputation:**

- Trusted groups: +10 to +20 points
- Unknown groups: +0 points
- Avoided groups: -20 points

## Part 1: Understanding Built-in Profiles

Cinephage includes four default quality profiles:

### Quality Profile

**Goal:** Maximum quality regardless of size

**Behavior:**

- Prefers 4K with HDR
- Upgrades until reaching cutoff
- Cutoff: 2160p BluRay with Dolby Vision

**Best for:** Users with unlimited storage and high-bandwidth displays

### Balanced Profile

**Goal:** Good quality with reasonable file sizes

**Behavior:**

- Prefers 1080p WEB-DL
- Balances quality and size
- Cutoff: 1080p BluRay

**Best for:** Most users with average storage and bandwidth

### Compact Profile

**Goal:** Smallest acceptable quality

**Behavior:**

- Prefers 720p HDTV
- Avoids large file sizes
- Cutoff: 720p WEB-DL

**Best for:** Limited storage or bandwidth

### Streamer Profile

**Goal:** Streaming-optimized quality

**Behavior:**

- Prefers 1080p HEVC
- Efficient codecs for streaming
- Cutoff: 1080p HEVC WEB-DL

**Best for:** Users who primarily stream content

## Part 2: Configure Default Profiles

### Step 1: Set Default Movie Profile

1. Go to **Settings > Profiles**
2. Under **Default Movie Profile**, select a profile:
   - Quality
   - Balanced
   - Compact
   - Streamer
3. Click **Save**

### Step 2: Set Default TV Profile

1. Under **Default TV Profile**, select a profile
2. Click **Save**

### Step 3: Apply to Existing Items

To apply the new default to existing library items:

1. Go to **Library > Movies** (or TV)
2. Select items to update (or select all)
3. Click **Edit** button
4. Change **Quality Profile** to desired profile
5. Click **Save**

## Part 3: Understanding Upgrade Behavior

### Cutoff Quality

The **cutoff** is the quality threshold where upgrades stop:

- Cinephage downloads the best available release
- If a better release appears, it upgrades
- Upgrades continue until reaching the cutoff
- Once cutoff is reached, no more upgrades

**Example with Balanced profile:**

1. First download: 720p HDTV (score: 60)
2. Upgrade found: 1080p WEB-DL (score: 110)
3. Upgrade found: 1080p BluRay (score: 120) - **CUTOFF REACHED**
4. No more upgrades even if 4K available

### Upgrade Until

Configure cutoff in profile settings:

1. Go to **Settings > Profiles**
2. Click **Edit** on a profile
3. Under **Cutoff**, select the quality to stop at:
   - **Any** - Never stop upgrading
   - **1080p BluRay** - Stop at 1080p BluRay
   - **2160p WEB-DL** - Stop at 4K WEB-DL
   - Custom selection

## Part 4: Create Custom Formats

Custom formats let you define rules for specific release characteristics.

### Example 1: Prefer x265/HEVC

Create a format that boosts HEVC releases:

1. Go to **Settings > Quality**
2. Click **Add Custom Format**
3. Configure:
   - **Name**: `x265 Boost`
   - **Score**: `+20`
   - **Conditions**:
     - Contains: `x265` OR `HEVC` OR `H.265`
     - Does NOT contain: `HDR` (optional)
4. Click **Save**

### Example 2: Avoid Cam Releases

Block CAM and TS releases:

1. Click **Add Custom Format**
2. Configure:
   - **Name**: `Block CAM`
   - **Score**: `-1000` (negative = block)
   - **Conditions**:
     - Contains: `CAM` OR `TS` OR `TC` OR `SCR`
3. Click **Save**

### Example 3: Prefer Specific Groups

Boost trusted release groups:

1. Click **Add Custom Format**
2. Configure:
   - **Name**: `Trusted Groups`
   - **Score**: `+15`
   - **Conditions**:
      - Contains: `-SPARKS` OR `-DON` OR `-NTb`
3. Click **Save**

### Example 4: Require HDR

Only accept HDR content:

1. Click **Add Custom Format**
2. Configure:
   - **Name**: `Require HDR`
   - **Score**: `-1000`
   - **Conditions**:
     - Does NOT contain: `HDR` OR `DV` OR `DoVi`
3. Click **Save**

## Part 5: Apply Custom Formats to Profiles

After creating custom formats, apply them to quality profiles:

1. Go to **Settings > Profiles**
2. Click **Edit** on a profile
3. Scroll to **Custom Formats**
4. Check formats to apply:
   - Positive scores boost matching releases
   - Negative scores penalize or block releases
5. Click **Save**

## Part 6: Test Custom Formats

Test your formats against real release names:

1. Go to **Settings > Quality**
2. Click **Test** on a custom format
3. Enter a release name:
   ```
   Inception.2010.2160p.UHD.BluRay.x265.DTS-HD.MA.5.1-SPARKS
   ```
4. See score breakdown:
   - Base score: 100 (2160p)
   - Source: +40 (BluRay)
   - Codec: +20 (x265)
   - Audio: +20 (DTS-HD MA)
   - Custom: +15 (SPARKS group)
   - **Total: 195**

## Part 7: Advanced Custom Format Conditions

### Condition Types

**Contains:**

```
Matches if release name contains text
Example: Contains "x265"
Matches: "Movie.2023.1080p.x265.mkv"
```

**Does Not Contain:**

```
Matches if release name does NOT contain text
Example: Does NOT contain "CAM"
Matches: "Movie.2023.1080p.BluRay.mkv"
Does NOT match: "Movie.2023.CAM.mkv"
```

**Matches Regex:**

```
Advanced pattern matching
Example: Matches regex "\d{4}" (4 digits)
Matches: "Movie.2023.1080p.mkv"
```

**Size Constraints:**

```
Min/Max file size
Example: Min 2GB, Max 10GB
```

### Combining Conditions

Use **AND** and **OR** logic:

**AND Example (All must match):**

- Contains "x265"
- Contains "HDR"
- Does NOT contain "CAM"

**OR Example (Any can match):**

- Contains "x265" OR
- Contains "HEVC" OR
- Contains "H.265"

## Troubleshooting

### Upgrades Not Happening

**Problem:** Better releases available but not upgrading

**Solutions:**

- Check cutoff is not already reached
- Verify monitoring is enabled
- Check upgrade monitoring task is running
- Ensure better release has higher score

### Wrong Quality Downloaded

**Problem:** Lower quality downloaded when better available

**Solutions:**

- Check indexer priority
- Verify custom format scores
- Check if better release was filtered out
- Review blocklist for the better release

### Custom Format Not Matching

**Problem:** Format should match but does not

**Solutions:**

- Test format with actual release name
- Check for case sensitivity
- Verify condition logic (AND vs OR)
- Use regex for complex patterns

### Releases Being Blocked

**Problem:** Releases you want are being rejected

**Solutions:**

- Check custom formats with negative scores
- Review quality profile minimums
- Check blocklist for entries
- Verify indexer categories

## Best Practices

### Start Simple

Begin with built-in profiles:

- Use them as-is for initial setup
- Modify gradually as you learn the system

### Document Your Rules

Keep notes on what each custom format does:

- Name formats descriptively
- Add comments if supported
- Document why scores are set certain ways

### Test Before Applying

Always test custom formats:

- Use real release names
- Check score calculations
- Verify logic works as expected

### Monitor Performance

Watch how your profiles perform:

- Check what qualities are being downloaded
- Review upgrade patterns
- Adjust scores based on results

## Next Steps

Now that quality profiles are configured:

- [Configure Subtitles](subtitles) for multi-language support
- [Search and Download](../use/search-and-download) using your profiles
- [Monitor and Upgrade](../use/monitor-and-upgrade) to manage quality improvements

## See Also

- [Custom Formats Explained](../../explanation/quality-scoring)
- [Search and Download](../use/search-and-download)
- [Environment Variables](../../reference/configuration/environment-variables)
