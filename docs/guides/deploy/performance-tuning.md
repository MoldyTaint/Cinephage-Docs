---
title: Performance tuning
description: Optimize Cinephage for your hardware, usage patterns, and deployment scenario
sidebar_position: 3
tags: [performance, tuning, optimization, guide, scaling, workers]
keywords: [performance, tuning, optimization, scaling]
---

# Performance tuning

This guide covers optimizing Cinephage performance for your specific hardware, usage patterns, and deployment scenario.

## Overview

Cinephage is designed to work well on modest hardware, but performance tuning can significantly improve the experience for:

- Large media libraries (10,000+ items)
- Multiple concurrent users
- Heavy automation (many monitoring tasks)
- High-frequency operations (frequent searches, imports)

## System Requirements vs. Performance

### Minimum Requirements

- **CPU:** 2 cores
- **RAM:** 2 GB
- **Disk:** 10 GB for application + media storage
- **Network:** 10 Mbps

### Recommended for Performance

- **CPU:** 4+ cores
- **RAM:** 4-8 GB
- **Disk:** SSD for database and cache
- **Network:** 100+ Mbps

## Worker Configuration

Workers handle background tasks. Proper configuration is crucial for performance.

### Understanding Workers

Cinephage uses multiple worker pools:

| Worker Type | Purpose | Default |
|-------------|---------|---------|
| **Stream Workers** | NZB streaming | 10 |
| **Import Workers** | File imports | 5 |
| **Scan Workers** | Library scans | 2 |
| **Monitoring Workers** | Automated tasks | 5 |
| **Search Workers** | Indexer searches | 3 |
| **Subtitle Workers** | Subtitle downloads | 3 |
| **Portal Scan Workers** | Live TV portal scanning | 2 |
| **Channel Sync Workers** | Live TV channel sync | 3 |

### Configuring Workers

Set via environment variables:

```yaml
environment:
  - WORKER_MAX_STREAMS=16
  - WORKER_MAX_IMPORTS=10
  - WORKER_MAX_SCANS=4
  - WORKER_MAX_MONITORING=8
  - WORKER_MAX_SEARCH=5
  - WORKER_MAX_SUBTITLE_SEARCH=5
  - WORKER_MAX_PORTAL_SCANS=3
  - WORKER_MAX_CHANNEL_SYNCS=4
```

### Worker Tuning Guidelines

**For Small Libraries (< 1,000 items):**
```yaml
WORKER_MAX_IMPORTS=3
WORKER_MAX_SCANS=2
WORKER_MAX_MONITORING=3
```

**For Medium Libraries (1,000-10,000 items):**
```yaml
WORKER_MAX_IMPORTS=5
WORKER_MAX_SCANS=3
WORKER_MAX_MONITORING=5
```

**For Large Libraries (10,000+ items):**
```yaml
WORKER_MAX_IMPORTS=10
WORKER_MAX_SCANS=5
WORKER_MAX_MONITORING=10
```

**For Heavy NZB Streaming:**
```yaml
WORKER_MAX_STREAMS=20
WORKER_MAX_IMPORTS=8
```

:::warning Don't Over-allocate
More workers isn't always better. Too many workers can:
- Exhaust system memory
- Cause database contention
- Hit indexer rate limits
- Degrade overall performance
:::

## Database Optimization

### Database Location

Default location:
```
data/cinephage.db
```

**Docker:**
```
/config/data/cinephage.db
```

### Storage Recommendations

| Storage Type | Performance | Recommendation |
|--------------|-------------|----------------|
| **SSD** | Excellent |  Highly recommended |
| **HDD** | Good |  Acceptable for small libraries |
| **Network Storage** | Poor |  Avoid for database |

:::tip SSD for Database
Place the database on SSD storage if possible. It significantly improves:
- Search performance
- Import speed
- UI responsiveness
- Task execution
:::

### Database Maintenance

#### Automatic Maintenance

Cinephage performs automatic maintenance:
- Cleanup of old logs and history
- Index optimization
- Temporary file cleanup

#### Manual Optimization

**VACUUM Database:**

Reclaim space and optimize:

```bash
# Native install
sqlite3 data/cinephage.db "VACUUM;"

# Docker
docker exec -it cinephage sqlite3 /config/data/cinephage.db "VACUUM;"
```

**ANALYZE Database:**

Update query planner statistics:

```bash
sqlite3 data/cinephage.db "ANALYZE;"
```

**REINDEX:**

Rebuild indexes:

```bash
sqlite3 data/cinephage.db "REINDEX;"
```

:::caution Backup First
Always backup your database before manual maintenance operations.
:::

### Database Size Management

Monitor database growth:

```bash
# Check database size
ls -lh data/cinephage.db

# Check table sizes (SQLite)
sqlite3 data/cinephage.db "SELECT name FROM sqlite_master WHERE type='table';"
```

**Prune Old Data:**

Configure automatic cleanup:

```yaml
# In Settings > System > Data Retention
History Retention: 90 days
Task Logs Retention: 30 days
Search History: 30 days
```

## Memory Optimization

### Memory Usage Patterns

Cinephage memory usage by component:

| Component | Typical Usage | Peak Usage |
|-----------|---------------|------------|
| **Application** | 200-500 MB | 1 GB |
| **Workers** | 50-100 MB per worker | Depends on config |
| **NZB Cache** | Configurable (10-50 GB disk) | - |
| **Database Cache** | Automatic (SQLite) | - |
| **Streaming Buffers** | 100-500 MB | 1-2 GB |

### Reducing Memory Usage

**For Low-Memory Systems (2-4 GB):**

1. **Reduce Workers:**
   ```yaml
   WORKER_MAX_STREAMS=5
   WORKER_MAX_IMPORTS=2
   WORKER_MAX_SCANS=1
   WORKER_MAX_MONITORING=2
   ```

2. **Limit Cache Size:**
   ```yaml
   NZB Cache Size: 5 GB
   Prefetch: Disabled
   ```

3. **Reduce Task Frequency:**
   ```
   RSS Sync: 30 minutes (not 15)
   Missing Content Search: 12 hours (not 6)
   ```

4. **Disable Unused Features:**
   - Live TV (if not using)
   - NZB Streaming (if not using)
   - Notifications (if not using)

### Memory Monitoring

**Docker:**

```bash
# Monitor container memory
docker stats cinephage

# Check for OOM kills
docker inspect cinephage | grep -i oom
```

**Native:**

```bash
# Monitor process memory
ps aux | grep cinephage

# Or use htop/top
htop
```

**In-App:**

```
Settings > System > Memory Usage
```

## Search Performance

### Indexer Optimization

**Limit Concurrent Indexers:**

Too many indexers slow searches:

```
Recommended: 3-5 active indexers
Maximum: 10 indexers
```

**Indexer Priority:**

Set priority to search fastest indexers first:

```
Indexer 1: Priority 1 (fastest)
Indexer 2: Priority 5
Indexer 3: Priority 10 (slowest)
```

**Disable Slow Indexers:**

If an indexer consistently times out:
1. Lower its priority
2. Or disable it temporarily
3. Re-enable after indexer issues resolve

### Search Frequency

**Task Intervals:**

Adjust based on your needs:

| Task | Conservative | Balanced | Aggressive |
|------|--------------|----------|------------|
| **RSS Sync** | 30 min | 15 min | 5 min |
| **Missing Search** | 12 hours | 6 hours | 1 hour |
| **Cutoff Unmet** | Daily | Daily | Every 6 hours |
| **Upgrade Search** | Weekly | Weekly | Daily |

:::tip Aggressive Searching
More frequent searches use more resources and hit indexer rate limits. Start conservative.
:::

### Caching Search Results

Cinephage caches search results to avoid redundant API calls:

- **Cache Duration:** 15 minutes by default
- **Cache Size:** Automatic
- **Benefit:** Faster repeated searches

**Clear Search Cache:**

```
Settings > System > Clear Cache
```

## Library Scan Performance

### Initial Library Scan

First scan of a large library is resource-intensive:

**Expectations:**
- 1,000 movies: 10-30 minutes
- 10,000 movies: 2-6 hours
- 50,000 movies: 12-24 hours

**Optimization Tips:**

1. **Scan During Off-Hours:**
   - Schedule initial scan overnight
   - Reduces impact on other operations

2. **Break Into Batches:**
   - Import 1,000 items at a time
   - Verify success before next batch
   - Reduces memory pressure

3. **Pre-organize Files:**
   - Ensure good file naming before import
   - Reduces parsing time
   - Fewer manual corrections needed

### Ongoing Library Scans

After initial import, scans are faster:

- **Interval:** Configurable (default: 24 hours)
- **Duration:** 1-5 minutes for medium libraries
- **Impact:** Minimal

**Optimize Ongoing Scans:**

```
Settings > Media Management > Library Scan
Scan Interval: 12-24 hours
```

## Network Optimization

### Bandwidth Management

**For Limited Bandwidth:**

1. **Reduce Concurrent Downloads:**
   - Limit download client connections
   - Queue downloads instead of parallel

2. **Adjust Quality Profiles:**
   - Prefer smaller file sizes
   - Use Compact or Balanced profiles

3. **Limit NZB Streaming:**
   - Lower streaming quality
   - Reduce connections
   - Disable prefetch

**For High Bandwidth:**

1. **Increase Workers:**
   - More parallel operations
   - Faster imports
   - Better streaming performance

2. **Enable Prefetch:**
   - NZB streaming downloads ahead
   - Smoother playback
   - Uses more bandwidth

### Latency Optimization

**Reduce API Latency:**

1. **Use Local DNS:**
   - Configure local DNS resolver
   - Reduces lookup time

2. **Geographic Proximity:**
   - Use indexers close to your location
   - Reduces round-trip time

3. **Connection Pooling:**
   - Keep connections alive
   - Reduces connection overhead

## Docker-Specific Optimization

### Volume Mounts

**Optimal Configuration:**

```yaml
volumes:
  # Config (database, settings)
  - ./config:/config  # SSD recommended
  
  # Media (large storage)
  - /mnt/media:/media  # HDD acceptable
  
  # Downloads
  - /mnt/downloads:/downloads  # Temporary storage
```

**Performance Tips:**

1. **Separate Config from Media:**
   - Config on fast storage (SSD)
   - Media on bulk storage (HDD)

2. **Use Bind Mounts:**
   - Better performance than volumes
   - Direct filesystem access

3. **Avoid Network Mounts for Config:**
   - Database needs local storage
   - Network latency kills performance

### Resource Limits

Set Docker resource limits:

```yaml
deploy:
  resources:
    limits:
      cpus: '2'
      memory: 4G
    reservations:
      cpus: '0.5'
      memory: 1G
```

:::tip Prevent Resource Exhaustion
Resource limits prevent Cinephage from consuming all system resources, ensuring stability.
:::

### Container Optimization

**Base Image:**

Cinephage uses `node:24-trixie-slim` (Debian-based):
- Good balance of features and size
- Required for Camoufox browser support

**Reduce Container Size:**

```dockerfile
# Multi-stage build already optimized
# Don't modify base image
```

## Monitoring Performance

### Built-in Monitoring

**System Status:**

```
Settings > System > Status
```

Shows:
- Database size
- Worker status
- Memory usage
- Uptime

**Task Performance:**

```
Settings > Tasks > Performance
```

Shows:
- Task execution times
- Success rates
- Queue depths

### Log Analysis

**Enable Performance Logging:**

```yaml
environment:
  - LOG_LEVEL=debug
  - LOG_PERFORMANCE=true
```

**Analyze Logs:**

```bash
# Slow queries
grep -i "slow" logs/cinephage.log

# Worker performance
grep -i "worker" logs/cinephage.log | grep "completed"

# Import times
grep -i "import" logs/cinephage.log | grep "took"
```

### External Monitoring

**Prometheus/Grafana:**

Cinephage exposes metrics (if configured):

```yaml
environment:
  - METRICS_ENABLED=true
  - METRICS_PORT=9090
```

**Metrics Available:**
- Request latency
- Database query time
- Worker queue depth
- Memory usage

## Troubleshooting Performance Issues

### Slow UI Response

**Symptoms:**
- Pages take >5 seconds to load
- Search results slow
- Dashboard unresponsive

**Solutions:**

1. **Check Database:**
   ```bash
   # Database size
   ls -lh data/cinephage.db
   
   # Run VACUUM if >1GB
   sqlite3 data/cinephage.db "VACUUM;"
   ```

2. **Check Memory:**
   ```bash
   # Free memory
   free -h
   
   # If low, reduce workers
   ```

3. **Check CPU:**
   ```bash
   # CPU usage
   top
   
   # If pegged, tasks running
   ```

### High Memory Usage

**Symptoms:**
- Container uses >4GB RAM
- System swapping
- OOM kills

**Solutions:**

1. **Reduce Workers:**
   ```yaml
   WORKER_MAX_STREAMS=5
   WORKER_MAX_IMPORTS=2
   WORKER_MAX_MONITORING=3
   ```

2. **Limit Cache:**
   ```
   Settings > Integrations > NNTP > Cache Size: 5GB
   ```

3. **Restart Container:**
   ```bash
   docker restart cinephage
   ```

### Slow Imports

**Symptoms:**
- Imports take >10 minutes
- Queue backing up
- Files not moving

**Solutions:**

1. **Check Disk I/O:**
   ```bash
   # Disk usage
   iostat -x 1
   
   # If high, storage bottleneck
   ```

2. **Increase Import Workers:**
   ```yaml
   WORKER_MAX_IMPORTS=10
   ```

3. **Use Hardlinks:**
   - Faster than copy/move
   - No data duplication
   - Same filesystem only

4. **Check Network Storage:**
   - Network mounts are slow
   - Use local storage for active operations

### Search Timeouts

**Symptoms:**
- Searches take >60 seconds
- Indexer timeout errors
- No results returned

**Solutions:**

1. **Reduce Indexers:**
   - Use 3-5 fast indexers
   - Disable slow/unreliable ones

2. **Increase Timeout:**
   ```
   Settings > Indexers > Timeout: 30 seconds
   ```

3. **Check Network:**
   ```bash
   # Test indexer connectivity
   curl -I https://indexer.example.com
   ```

## Best Practices

### General Recommendations

1. **Start Conservative:**
   - Use default worker counts
   - Monitor performance
   - Scale up gradually

2. **Monitor Regularly:**
   - Check performance weekly
   - Review logs for issues
   - Adjust as library grows

3. **Optimize Incrementally:**
   - Change one setting at a time
   - Measure impact
   - Document what works

### Hardware-Specific Guidelines

**Raspberry Pi / Low-Power:**
- Workers: 1-2 each
- Cache: 2-5 GB
- Tasks: Conservative intervals
- Disable NZB streaming

**NAS / Home Server:**
- Workers: 3-5 each
- Cache: 10-20 GB
- SSD for database
- Balanced configuration

**Dedicated Server:**
- Workers: 5-10 each
- Cache: 20-50 GB
- Full SSD storage
- Aggressive configuration

**VPS / Cloud:**
- Workers: Match CPU cores
- Cache: Limited by disk
- Monitor bandwidth costs
- Disable heavy features

## See Also

- [Troubleshooting](troubleshooting) - Common issues and solutions
- [Environment Variables](../../reference/configuration/environment-variables) - All configuration options
- [Settings Explained](../../reference/configuration/settings-explained) - UI settings reference
- [Backup and Restore](backup-restore) - Protect your optimized setup
