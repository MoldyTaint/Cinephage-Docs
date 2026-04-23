---
title: Backup and restore
description: Protect your Cinephage data with regular backups and restore procedures
sidebar_position: 2
tags: [backup, restore, data-protection, maintenance, guide]
keywords: [backup, restore, data protection, maintenance]
---

# Backup and restore

This guide explains how to backup your Cinephage data and restore it when needed.

## Goal

Create regular backups of your Cinephage configuration and database to prevent data loss.

## Prerequisites

- Cinephage installed and running
- Access to the config directory
- Backup storage location

## What to Backup

Cinephage stores data in several locations:

### Essential Data (Must Backup)

| Location                    | Contents                                 | Size     |
| --------------------------- | ---------------------------------------- | -------- |
| `/config/data/cinephage.db` | Main database (movies, series, settings) | 10-100MB |
| `/config/settings/`    | Application settings                     | 1-5MB    |

### Important Data (Should Backup)

| Location            | Contents                        | Size     |
| ------------------- | ------------------------------- | -------- |
| `/config/indexers/` | Custom YAML indexer definitions | Varies   |
| `/config/camoufox/` | Captcha solver data             | 50-100MB |

### Optional Data

| Location         | Contents                     | Size      |
| ---------------- | ---------------------------- | --------- |
| `/config/cache/` | Cached data (can be rebuilt) | 100MB-1GB |
| `/config/logs/`  | Application logs             | Varies    |

### What NOT to Backup

- **Media files** - These are in your `/media` mount
- **Downloads** - These are in your `/downloads` mount
- **Docker image** - Can be re-pulled

## Part 1: Manual Backup

### Step 1: Stop Cinephage

Stop the container to ensure database is not being written:

```bash
docker compose down
```

### Step 2: Create Backup Directory

```bash
mkdir -p /path/to/backups/cinephage-$(date +%Y%m%d)
```

### Step 3: Copy Essential Files

```bash
# Backup directory
BACKUP_DIR=/path/to/backups/cinephage-$(date +%Y%m%d)
CONFIG_DIR=/path/to/your/cinephage/config

# Copy database
cp "$CONFIG_DIR/data/cinephage.db" "$BACKUP_DIR/"

# Copy settings
cp -r "$CONFIG_DIR/settings" "$BACKUP_DIR/"

# Copy custom indexers (if any)
if [ -d "$CONFIG_DIR/indexers" ]; then
    cp -r "$CONFIG_DIR/indexers" "$BACKUP_DIR/"
fi

# Copy Camoufox data (optional)
if [ -d "$CONFIG_DIR/camoufox" ]; then
    cp -r "$CONFIG_DIR/camoufox" "$BACKUP_DIR/"
fi
```

### Step 4: Create Archive

```bash
cd /path/to/backups
tar -czf cinephage-$(date +%Y%m%d).tar.gz cinephage-$(date +%Y%m%d)/
rm -rf cinephage-$(date +%Y%m%d)/
```

### Step 5: Restart Cinephage

```bash
docker compose up -d
```

### Step 6: Move Backup to Safe Location

```bash
# Move to external drive
mv /path/to/backups/cinephage-$(date +%Y%m%d).tar.gz /mnt/backup-drive/

# Or copy to cloud storage
rclone copy /path/to/backups/cinephage-$(date +%Y%m%d).tar.gz remote:backups/

# Or use rsync
rsync -avz /path/to/backups/cinephage-$(date +%Y%m%d).tar.gz user@backup-server:/backups/
```

## Part 2: Automated Backups

### Option A: Docker Backup Container

Create a backup service in docker-compose.yaml:

```yaml
services:
  cinephage:
    # ... your cinephage config

  backup:
    image: offen/docker-volume-backup:latest
    restart: unless-stopped
    environment:
      BACKUP_CRON_EXPRESSION: '0 2 * * *' # Daily at 2 AM
      BACKUP_RETENTION_DAYS: '30'
      BACKUP_FILENAME: 'cinephage-backup-%Y-%m-%dT%H-%M-%S.tar.gz'
      BACKUP_ARCHIVE: '/archive'
      BACKUP_STOP_CONTAINER_LABEL: 'cinephage.backup.stop'
    volumes:
      - ./config:/backup/data:ro
      - /path/to/backup/storage:/archive
      - /var/run/docker.sock:/var/run/docker.sock:ro
    labels:
      - 'cinephage.backup.stop=true'
```

### Option B: Systemd Timer (Linux)

Create backup script:

```bash
sudo tee /usr/local/bin/cinephage-backup.sh > /dev/null << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR=/mnt/backups/cinephage
CONFIG_DIR=/opt/cinephage/config

# Create backup dir
mkdir -p "$BACKUP_DIR"

# Stop Cinephage
cd /opt/cinephage && docker compose down

# Create backup
tar -czf "$BACKUP_DIR/cinephage-$DATE.tar.gz" -C "$CONFIG_DIR" \
    data settings indexers 2>/dev/null

# Start Cinephage
cd /opt/cinephage && docker compose up -d

# Keep only last 30 backups
ls -t "$BACKUP_DIR"/cinephage-*.tar.gz | tail -n +31 | xargs -r rm
EOF

sudo chmod +x /usr/local/bin/cinephage-backup.sh
```

Create systemd service:

```bash
sudo tee /etc/systemd/system/cinephage-backup.service > /dev/null << 'EOF'
[Unit]
Description=Cinephage Backup

[Service]
Type=oneshot
ExecStart=/usr/local/bin/cinephage-backup.sh
EOF
```

Create systemd timer:

```bash
sudo tee /etc/systemd/system/cinephage-backup.timer > /dev/null << 'EOF'
[Unit]
Description=Run Cinephage Backup Daily

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
EOF
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable cinephage-backup.timer
sudo systemctl start cinephage-backup.timer
```

### Option C: Cron Job

Add to crontab:

```bash
# Edit crontab
crontab -e

# Add line for daily backup at 2 AM
0 2 * * * /usr/local/bin/cinephage-backup.sh > /dev/null 2>&1
```

## Part 3: Restore from Backup

### Step 1: Stop Cinephage

```bash
docker compose down
```

### Step 2: Locate Backup

Find your backup file:

```bash
ls -la /path/to/backups/cinephage-*.tar.gz
```

### Step 3: Extract Backup

```bash
# Create temp directory
mkdir -p /tmp/cinephage-restore

# Extract backup
tar -xzf /path/to/backups/cinephage-20250316.tar.gz -C /tmp/cinephage-restore

# Check contents
ls -la /tmp/cinephage-restore/cinephage-20250316/
```

### Step 4: Restore Files

```bash
CONFIG_DIR=/path/to/your/cinephage/config
RESTORE_DIR=/tmp/cinephage-restore/cinephage-20250316

# Backup current config (just in case)
mv "$CONFIG_DIR" "$CONFIG_DIR.backup.$(date +%Y%m%d)"
mkdir -p "$CONFIG_DIR"

# Restore database
mkdir -p "$CONFIG_DIR/data"
cp "$RESTORE_DIR/data/cinephage.db" "$CONFIG_DIR/data/"

# Restore settings
cp -r "$RESTORE_DIR/settings" "$CONFIG_DIR/"

# Restore custom indexers (if backed up)
if [ -d "$RESTORE_DIR/indexers" ]; then
    cp -r "$RESTORE_DIR/indexers" "$CONFIG_DIR/"
fi

# Restore Camoufox (if backed up)
if [ -d "$RESTORE_DIR/camoufox" ]; then
    cp -r "$RESTORE_DIR/camoufox" "$CONFIG_DIR/"
fi

# Fix permissions
chown -R 1000:1000 "$CONFIG_DIR"  # Adjust UID:GID as needed
```

### Step 5: Start Cinephage

```bash
docker compose up -d
```

### Step 6: Verify Restore

1. Open Cinephage web interface
2. Check library is intact
3. Verify settings are restored
4. Test search functionality

### Step 7: Clean Up

```bash
# Remove temp files
rm -rf /tmp/cinephage-restore

# Remove old backup (optional, after verifying)
# rm -rf "$CONFIG_DIR.backup.$(date +%Y%m%d)"
```

## Part 4: Migration to New Server

### Backup on Old Server

Follow Part 1 to create backup

### Transfer to New Server

```bash
# Using scp
scp /path/to/backups/cinephage-20250316.tar.gz user@newserver:/tmp/

# Using rsync
rsync -avz /path/to/backups/cinephage-20250316.tar.gz user@newserver:/tmp/

# Or copy to USB/external drive
```

### Setup on New Server

1. Install Docker and Docker Compose
2. Create Cinephage directory structure
3. Copy docker-compose.yaml
4. Restore backup (follow Part 3)
5. Update environment variables if needed:
   - Update `ORIGIN` and `BETTER_AUTH_URL` to new URL
   - Update volume paths if different
6. Start Cinephage

### Update URLs

If your URL changed:

1. Go to **Settings > System**
2. Update **External URL**
3. Update `docker-compose.yaml`:
   ```yaml
   environment:
     - ORIGIN=https://new-domain.com
     - BETTER_AUTH_URL=https://new-domain.com
   ```
4. Restart Cinephage

## Part 5: Database-Only Backup

For quick database backups without stopping:

```bash
# While Cinephage is running
docker exec cinephage sqlite3 /config/data/cinephage.db ".backup /config/data/cinephage-backup.db"

# Copy backup
cp /path/to/cinephage/config/data/cinephage-backup.db /path/to/backups/

# Remove temp backup
docker exec cinephage rm /config/data/cinephage-backup.db
```

This creates a consistent backup without stopping the application.

## Backup Strategy Recommendations

### Frequency

| Data Type   | Backup Frequency | Retention |
| ----------- | ---------------- | --------- |
| Database    | Daily            | 30 days   |
| Settings    | Weekly           | 90 days   |
| Full config | Weekly           | 30 days   |

### Storage Locations

Keep backups in multiple locations:

1. **Local** - External drive or NAS
2. **Offsite** - Cloud storage (Backblaze B2, S3, etc.)
3. **Remote** - Another server or location

### Testing

Test restore process periodically:

1. Restore to test environment
2. Verify data integrity
3. Test functionality
4. Document any issues

## Troubleshooting

### Database Locked During Backup

**Problem:** Cannot copy database file

**Solution:**

```bash
# Use SQLite backup command
docker exec cinephage sqlite3 /config/data/cinephage.db ".backup /tmp/backup.db"
docker cp cinephage:/tmp/backup.db /path/to/backups/
```

### Backup Too Large

**Problem:** Backup files are huge

**Solutions:**

- Exclude cache directory
- Compress with higher level: `tar -czf` (already compressed)
- Use incremental backups
- Backup only database and settings

### Restore Fails

**Problem:** Cannot restore backup

**Solutions:**

- Check backup file is not corrupt: `tar -tzf backup.tar.gz`
- Verify file permissions after restore
- Check database integrity: `sqlite3 data/cinephage.db "PRAGMA integrity_check;"`
- Restore to fresh config directory

### Version Compatibility

**Problem:** Backup from old version incompatible

**Solution:**

- Check changelog for migration notes
- Upgrade Cinephage before restoring
- Or restore then upgrade
- Database schema updates automatically

## Next Steps

Now that backups are configured:

- [Performance Tuning](performance-tuning) for optimization
- [Troubleshooting](troubleshooting) for common issues

## See Also

- [Environment Variables](../../reference/configuration/environment-variables)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [SQLite Backup Documentation](https://www.sqlite.org/backup.html)
