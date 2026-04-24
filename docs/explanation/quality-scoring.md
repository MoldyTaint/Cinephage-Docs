---
title: Quality scoring
description: How Cinephage calculates quality scores for release selection
sidebar_position: 3
tags: [quality, scoring, algorithms, explanation]
keywords: [quality, scoring, algorithms, release selection]
---

# Quality scoring

This document explains how Cinephage calculates quality scores to select the best releases for your library.

## Overview

Unlike simple "highest resolution wins" systems, Cinephage uses a sophisticated scoring algorithm that considers 50+ factors. This approach provides better results by accounting for:

- Resolution (but not resolution alone)
- Source quality (BluRay vs WEB-DL vs HDTV)
- Codec efficiency (H.265 vs H.264)
- Audio quality (Atmos vs DTS-HD vs AAC)
- HDR formats (Dolby Vision vs HDR10)
- Release group reputation
- Your personal preferences (Custom Formats)

## Scoring Formula

The total score is calculated as:

```
Total Score = Base Score + Source Bonus + Codec Bonus + Audio Bonus + HDR Bonus + Custom Format Scores
```

Each component contributes to the final decision.

## Base Score (Resolution)

Resolution provides the foundation score:

| Resolution | Base Score | Notes                  |
| ---------- | ---------- | ---------------------- |
| 2160p (4K) | 100        | Highest base score     |
| 1080p      | 80         | Standard HD            |
| 720p       | 50         | Reduced detail         |
| 480p       | 20         | Standard definition    |
| Unknown    | 0          | No resolution detected |

**Why Not Resolution Alone?**

A 1080p BluRay (80 + 40 = 120) scores higher than a 2160p HDTV (100 + 10 = 110) because source quality matters significantly.

## Source Quality Bonus

The original source affects quality dramatically:

| Source | Bonus | Description                             |
| ------ | ----- | --------------------------------------- |
| BluRay | +40   | Physical disc rip, best quality         |
| WEB-DL | +30   | Direct streaming service rip            |
| HDTV   | +10   | Captured from broadcast                 |
| DVD    | +5    | Standard definition disc                |
| CAM/TS | -1000 | Theater recording (effectively blocked) |

**Why Source Matters:**

- **BluRay** - Highest bitrate, no compression artifacts
- **WEB-DL** - Good quality from streaming services
- **HDTV** - Variable quality, may have logos/commercials
- **CAM/TS** - Poor quality, handheld camera recordings

### Source detection

Cinephage detects sources from release names:

```
Movie.2023.1080p.BluRay.x264-SPARKS    → BluRay (+40)
Movie.2023.1080p.WEB-DL.DDP5.1-NTb     → WEB-DL (+30)
Movie.2023.1080p.HDTV.x264-LOL         → HDTV (+10)
Movie.2023.HDTS.x264-EVO               → TS (-1000)
```

## Codec Efficiency Bonus

Modern codecs provide better quality at smaller sizes:

| Codec      | Bonus | Notes                              |
| ---------- | ----- | ---------------------------------- |
| AV1        | +25   | Latest codec, best efficiency      |
| H.265/HEVC | +20   | Good compression, widely supported |
| H.264/x264 | +0    | Baseline, no bonus                 |
| MPEG-2     | -10   | Outdated, inefficient              |
| DivX/XviD  | -15   | Legacy codecs                      |

**Codec Efficiency:**

- **AV1** - 50% smaller than H.264 at same quality
- **H.265** - 40% smaller than H.264
- **H.264** - Baseline efficiency
- **Older codecs** - Larger files, lower quality

### Codec detection

```
Movie.2023.1080p.BluRay.AV1-GRP        → AV1 (+25)
Movie.2023.1080p.BluRay.x265-SPARKS    → H.265 (+20)
Movie.2023.1080p.BluRay.x264-EVO       → H.264 (+0)
Movie.2023.DVDRip.DivX-OLD             → DivX (-15)
```

## Audio Quality Bonus

Audio quality significantly impacts the viewing experience:

| Audio Format | Bonus | Channels | Description           |
| ------------ | ----- | -------- | --------------------- |
| Dolby Atmos  | +25   | 7.1+     | Object-based 3D audio |
| DTS:X        | +25   | 7.1+     | Object-based audio    |
| DTS-HD MA    | +20   | 5.1/7.1  | Lossless surround     |
| TrueHD       | +15   | 5.1/7.1  | Dolby lossless        |
| DD+ (E-AC3)  | +10   | 5.1      | Dolby Digital Plus    |
| DTS          | +8    | 5.1      | Standard DTS          |
| AC3          | +5    | 5.1      | Dolby Digital         |
| AAC          | +3    | 2.0/5.1  | Efficient codec       |
| MP3          | +0    | 2.0      | Basic audio           |

**Audio Considerations:**

- **Lossless** (DTS-HD MA, TrueHD) - Perfect quality, large files
- **High-quality lossy** (DD+, DTS) - Excellent quality, smaller
- **Standard** (AC3, AAC) - Good quality, efficient
- **Stereo** (AAC) - Sufficient for dialogue

### Audio detection

```
Movie.2023.2160p.BluRay.Atmos.TrueHD7.1 → Atmos (+25)
Movie.2023.1080p.BluRay.DTS-HD.MA.5.1   → DTS-HD MA (+20)
Movie.2023.1080p.BluRay.DD5.1-SPARKS    → AC3 (+5)
Movie.2023.1080p.WEB-DL.AAC2.0-NTb      → AAC (+3)
```

## HDR Format Bonus

High Dynamic Range provides better color and contrast:

| HDR Format   | Bonus | Description                       |
| ------------ | ----- | --------------------------------- |
| Dolby Vision | +30   | Best HDR, dynamic metadata        |
| HDR10+       | +20   | Dynamic metadata, open standard   |
| HDR10        | +15   | Static metadata, widely supported |
| HLG          | +10   | Broadcast HDR                     |
| SDR          | +0    | Standard dynamic range            |

**HDR Considerations:**

- **Dolby Vision** - Best quality, requires compatible display
- **HDR10+** - Similar to Dolby Vision, Samsung-focused
- **HDR10** - Good HDR, static metadata
- **SDR** - No HDR, compatible with all displays

### HDR detection

```
Movie.2023.2160p.BluRay.DV.HDR10+.x265  → Dolby Vision + HDR10+ (+50)
Movie.2023.2160p.BluRay.HDR10.x265      → HDR10 (+15)
Movie.2023.1080p.BluRay.x264            → SDR (+0)
```

## Release Group Bonus

Some release groups are known for quality:

| Group Type | Bonus | Examples              |
| ---------- | ----- | --------------------- |
| Tier 1     | +15   | SPARKS, DON, HDX, NTb |
| Tier 2     | +10   | EVO, RARBG, YIFY      |
| Tier 3     | +5    | Various scene groups  |
| Unknown    | +0    | No reputation data    |
| Avoided    | -20   | Known poor quality    |

**Why Groups Matter:**

- Consistent quality
- Proper encoding settings
- Reliable sources
- No fake or mislabeled releases

:::note
Group scoring is subjective and configurable via Custom Formats.
:::

## Custom Format Scoring

Custom formats allow you to define personal preferences:

### Creating scoring rules

Each custom format has a score that adds to or subtracts from the total:

```yaml
# Boost HEVC releases
Name: 'x265 Boost'
Score: +20
Conditions:
  - Contains: 'x265'
  - OR Contains: 'HEVC'
```

```yaml
# Block certain content
Name: 'Block 3D'
Score: -1000
Conditions:
  - Contains: '3D'
  - OR Contains: 'HSBS'
```

### Source-Only scoring (v0.5.0+)

Score releases based solely on source quality, ignoring resolution:

```yaml
Name: 'Source Priority'
Score: +50
Conditions:
  - Source: 'BluRay'
```

This is useful when you want the best source regardless of resolution.

### Resolution-Only scoring (v0.5.0+)

Score releases based solely on resolution, ignoring source:

```yaml
Name: '4K Priority'
Score: +100
Conditions:
  - Resolution: '2160p'
```

This prioritizes resolution over source quality.

### Built-in profile overrides (v0.5.0+)

Override built-in scoring profiles at runtime:

| Profile | Override Behavior |
|---------|-------------------|
| **Quality** | Custom format scores take precedence |
| **Balanced** | Built-in scores + custom additions |
| **Compact** | Override with user-defined thresholds |

### Custom format examples

**Prefer Specific Resolution:**

```yaml
Name: '1080p Preferred'
Score: +10
Conditions:
  - Contains: '1080p'
  - Does NOT contain: '2160p'
```

**Require Minimum Size:**

```yaml
Name: 'Minimum Quality'
Score: -1000
Conditions:
  - Size less than: 1GB
  - Contains: '1080p'
```

**Prefer Release Groups:**

```yaml
Name: 'Trusted Groups'
Score: +15
Conditions:
  - Contains: '-SPARKS'
  - OR Contains: '-DON'
  - OR Contains: '-NTb'
```

## Complete Scoring Examples

### Example 1: high-quality movie

**Release:** `Inception.2010.2160p.UHD.BluRay.DV.HDR10+.Atmos.TrueHD7.1.x265-SPARKS`

**Score Breakdown:**

```
Base (2160p):          100
Source (BluRay):       +40
Codec (x265):          +20
Audio (Atmos):         +25
HDR (DV + HDR10+):     +45
Group (SPARKS):        +15
─────────────────────────
Total:                 245
```

**Result:** Excellent quality, will be selected if available.

### Example 2: balanced quality

**Release:** `Movie.2023.1080p.BluRay.DTS-HD.MA.5.1.x264-EVO`

**Score Breakdown:**

```
Base (1080p):          80
Source (BluRay):       +40
Codec (x264):          +0
Audio (DTS-HD MA):     +20
HDR (None):            +0
Group (EVO):           +10
─────────────────────────
Total:                 150
```

**Result:** Good quality, balanced file size.

### Example 3: low quality (blocked)

**Release:** `Movie.2023.HDTS.x264-Unknown`

**Score Breakdown:**

```
Base (Unknown):        0
Source (TS):           -1000
Codec (x264):          +0
Audio (Unknown):       +0
HDR (None):            +0
Group (Unknown):       +0
─────────────────────────
Total:                 -1000
```

**Result:** Blocked by negative score, will not be selected.

### Example 4: custom format impact

**Release:** `Movie.2023.1080p.WEB-DL.x265.DD5.1-NTb`

**Base Score:**

```
Base (1080p):          80
Source (WEB-DL):       +30
Codec (x265):          +20
Audio (DD):            +5
─────────────────────────
Subtotal:              135
```

**With Custom Formats:**

```
Subtotal:              135
"x265 Boost":          +20
"WEB-DL Preferred":    +10
"NTb Bonus":           +5
─────────────────────────
Total:                 170
```

## Scoring in Practice

### Search process

1. **Query Indexers** - Search all enabled indexers
2. **Parse Results** - Extract metadata from release names
3. **Calculate Scores** - Apply scoring algorithm
4. **Filter Results** - Remove blocklisted/low-quality
5. **Select Best** - Choose highest scoring release
6. **Send to Download** - Add to download queue

### Upgrade decision

When considering upgrades:

1. **Compare Scores** - New vs existing
2. **Check Cutoff** - Has cutoff been reached?
3. **Verify Monitoring** - Is item monitored?
4. **Apply Delays** - Wait for better releases?
5. **Queue Upgrade** - Download better version

## Profile-Specific Scoring

### Quality profile cutoffs

Each profile defines when to stop upgrading:

| Profile  | Target | Cutoff       | Example                    |
| -------- | ------ | ------------ | -------------------------- |
| Quality  | 4K HDR | 2160p BluRay | Upgrade until 4K BluRay    |
| Balanced | 1080p  | 1080p BluRay | Upgrade until 1080p BluRay |
| Compact  | 720p   | 720p WEB-DL  | Upgrade until 720p WEB-DL  |

### Score thresholds

Profiles can define minimum scores:

```
Minimum Score: 100
- Scores below 100 are rejected
- Ensures minimum quality standard
```

## Troubleshooting Scoring

### Why was lower quality selected?

**Possible Reasons:**

1. Higher quality failed custom format rules
2. Higher quality is blocklisted
3. Higher quality indexer is down
4. Delay profile waiting for better releases
5. Cutoff already reached

**Debugging:**

- Check search results manually
- Review custom format scores
- Verify indexer status
- Check delay profile settings

### Custom format not applied

**Check:**

1. Format is assigned to profile
2. Condition syntax is correct
3. Release name matches pattern
4. Format is enabled

### Unexpected scores

**Verify:**

- Quality profile assigned correctly
- Custom format scores are correct
- No conflicting rules
- Release name parsing correctly

## Best Practices

### Start with defaults

- Use built-in profiles initially
- Understand scoring before customizing
- Test Custom Formats thoroughly

### Document your rules

- Keep notes on why scores are set
- Name formats descriptively
- Review periodically

### Test with real releases

- Use actual release names
- Verify score calculations
- Check upgrade behavior

### Balance quality and size

- Higher score ≠ always better
- Consider storage constraints
- Set realistic cutoffs

## See Also

- [Set Up Quality Profiles](../guides/configure/quality-profiles)
- [Key Concepts](concepts)
- [Architecture Overview](architecture)
