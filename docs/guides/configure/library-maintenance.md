---
title: Library maintenance
description: Keep your media library organized and healthy with regular maintenance
sidebar_position: 8
tags: [library, maintenance, scanning, metadata, guide]
keywords: [library, maintenance, scanning, metadata, disk space]
---

# Library maintenance

Regular maintenance keeps your library organized and running smoothly.

## Regular Tasks

### Weekly

- [ ] Review Activity for failures
- [ ] Check for missing episodes
- [ ] Verify new releases added correctly

### Monthly

- [ ] Clean up blocklist
- [ ] Review quality profiles
- [ ] Check disk space
- [ ] Backup database

### Quarterly

- [ ] Review indexer health
- [ ] Update download client settings
- [ ] Archive old logs
- [ ] Optimize database

## Library Scanning

### Manual Scan

1. Go to **Library > Movies** or **Library > TV**
2. Click **Scan Library**
3. Cinephage checks for:
   - New files
   - Deleted files
   - Changed files
   - Metadata updates

### Automatic Scanning

Configure in Settings:
```
Settings > Media Management > Library Scan
Scan Interval: 6 hours (or custom)
```

### Scan Results

- Files added
- Files removed
- Metadata updated
- Errors encountered

## Metadata Refresh

Update TMDB metadata for items:

1. Select item(s)
2. Click **Refresh & Scan**
3. Cinephage fetches latest:
   - Posters and artwork
   - Plot summaries
   - Cast and crew
   - Ratings
   - Release dates

:::tip Scheduled Refresh
TMDB data changes over time. Refresh monthly for active series.
:::

## Disk Space Management

### Monitor Usage

```
Settings > System > Disk Space
```

Shows:
- Per root folder usage
- Free space remaining
- Largest items

### Cleanup Strategies

1. **Unmonitor Unwanted Items:**
   - Stop searching for old series
   - Keep files but disable monitoring

2. **Delete Unwatched:**
   - Review play history
   - Delete items never watched
   - Use "Delete Files & Remove" action

3. **Quality Cleanup:**
   - Keep only best quality
   - Delete lower quality duplicates
   - Use "Organize" to consolidate

4. **Export List:**
   - Export library to CSV
   - Analyze outside Cinephage
   - Identify candidates for deletion

## Best Practices

### Organization

1. **Use Meaningful Root Folder Names:**
   - "Movies" not "Media"
   - "TV Shows" not "Series"

2. **Keep Paths Simple:**
   - `/media/movies` not `/home/user/media/collection/movies/final`

3. **Separate by Type:**
   - Don't mix movies and TV
   - Consider anime separately
   - Kids content in dedicated folder

### Maintenance

1. **Regular Scans:**
   - Enable automatic scanning
   - Or scan weekly manually

2. **Monitor Disk Space:**
   - Set up alerts
   - Plan storage expansion

3. **Keep Backups:**
   - Database backup weekly
   - Configuration backup monthly

4. **Clean Regularly:**
   - Review blocklist monthly
   - Clean up failed downloads
   - Archive old logs

### Performance

1. **SSD for Config:**
   - Database on fast storage
   - Media can be on slower storage

2. **Optimize Database:**
   - VACUUM monthly
   - ANALYZE weekly

3. **Limit Library Size:**
   - Realistic collection size
   - Quality over quantity

## See Also

- [Import Existing Files](../use/import-existing-files) - Import your existing media
- [Organize Files](../use/organize-files) - File naming and organization
- [Monitor and Upgrade](../use/monitor-and-upgrade) - Automated monitoring
- [Troubleshooting](../deploy/troubleshooting) - Solve common issues
