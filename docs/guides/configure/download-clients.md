---
title: Configure Download Clients
description: Set up qBittorrent, SABnzbd, NZBGet, and other download clients
sidebar_position: 1
date: 2025-03-16
tags: [download-clients, qbittorrent, sabnzbd, configuration, guide]
---

# Configure Download Clients

This guide walks you through configuring download clients in Cinephage. Download clients handle the actual downloading of media files.

## Goal

Connect Cinephage to your download client so it can send releases for downloading and monitor their progress.

## Prerequisites

- A download client installed and running
- Download client web UI enabled and accessible
- Cinephage installed and running
- Network connectivity between Cinephage and the download client

## Supported Download Clients

Cinephage supports the following clients:

### Torrent Clients

- **qBittorrent** (recommended)
- **Transmission**
- **Deluge**
- **rTorrent**
- **aria2**

### Usenet Clients

- **SABnzbd** (recommended)
- **NZBGet**

## Part 1: Configure qBittorrent

### Step 1: Enable qBittorrent Web UI

1. Open qBittorrent
2. Go to **Tools > Options** (or **Edit > Preferences** on macOS)
3. Select **Web UI** from the left menu
4. Check **Web User Interface (Remote control)**
5. Set **Port** to `8080` (or your preferred port)
6. Set **Username** and **Password**
7. Check **Bypass authentication for clients on localhost** (optional, for local networks)
8. Click **Apply** then **OK**

### Step 2: Test Web UI Access

Open a browser and navigate to:

```
http://localhost:8080
```

Or if accessing from another machine:

```
http://qbittorrent-ip:8080
```

You should see the qBittorrent web interface. Log in with the credentials you set.

### Step 3: Add to Cinephage

1. In Cinephage, go to **Settings > Integrations > Download Clients**
2. Click **Add Download Client**
3. Select **qBittorrent** from the dropdown
4. Configure the following:

**Connection:**

- **Name**: `qBittorrent` (or any descriptive name)
- **Host**: IP address or hostname
  - If running on same machine: `localhost` or `127.0.0.1`
  - If in Docker on same host: Use host IP (e.g., `192.168.1.100`)
  - If on separate machine: Use that machine IP
- **Port**: `8080` (or your configured port)
- **Username**: Your qBittorrent username
- **Password**: Your qBittorrent password
- **Use SSL**: Unchecked (unless you configured HTTPS)

**Options:**

- **Category**: `cinephage` (optional, organizes downloads)
- **Priority**: Leave as default

### Step 4: Test Connection

Click **Test** to verify Cinephage can connect.

If successful, you will see a success message. If not, check:

- Host and port are correct
- Username and password are correct
- Firewall allows connections on the port
- qBittorrent web UI is enabled

### Step 5: Save

Click **Save** to add the download client.

## Part 2: Configure SABnzbd

### Step 1: Get SABnzbd API Key

1. Open SABnzbd web interface (typically `http://localhost:8080`)
2. Go to **Config** (wrench icon) > **General**
3. Scroll to **API Key** section
4. Copy the **API Key** (not the NZB Key)

### Step 2: Add to Cinephage

1. In Cinephage, go to **Settings > Integrations > Download Clients**
2. Click **Add Download Client**
3. Select **SABnzbd** from the dropdown
4. Configure:

**Connection:**

- **Name**: `SABnzbd`
- **Host**: SABnzbd IP or hostname
- **Port**: `8080` (default)
- **API Key**: Paste your SABnzbd API key
- **Username/Password**: Only if you enabled authentication in SABnzbd
- **Use SSL**: Check if using HTTPS

**Options:**

- **Category**: `movies` or `tv` (optional)

### Step 3: Test and Save

Click **Test**, then **Save**.

## Part 3: Path Mapping (Important for Docker)

If Cinephage and your download client see different paths to the same files, you need path mapping.

### Example Scenario

- **Download client** saves to: `/downloads/movies/Inception (2010)/`
- **Cinephage** sees this as: `/media/downloads/movies/Inception (2010)/`

The same folder has different paths in each application.

### Configure Path Mapping

1. Edit your download client in Cinephage
2. Scroll to **Path Mappings**
3. Click **Add Mapping**
4. Configure:
   - **Download Client Path**: `/downloads` (what the client sees)
   - **Cinephage Path**: `/media/downloads` (what Cinephage sees)
5. Click **Save**

### Common Docker Scenarios

**Both in Docker on same host:**

If Cinephage and qBittorrent are both Docker containers:

```yaml
# Cinephage docker-compose.yaml
volumes:
  - /mnt/downloads:/downloads

# qBittorrent docker-compose.yaml
volumes:
  - /mnt/downloads:/downloads
```

In this case, both see `/downloads` so **no mapping needed**.

**Cinephage in Docker, qBittorrent on host:**

```yaml
# Cinephage docker-compose.yaml
volumes:
  - /mnt/downloads:/downloads # Container sees /downloads


# qBittorrent on host sees: /mnt/downloads
```

Path mapping:

- **Download Client Path**: `/mnt/downloads`
- **Cinephage Path**: `/downloads`

## Part 4: Configure Additional Clients

### Transmission

1. Enable RPC in Transmission:
   - Edit `settings.json`
   - Set `"rpc-enabled": true`
   - Set `"rpc-port": 9091`
   - Set `"rpc-username"` and `"rpc-password"`

2. In Cinephage:
   - Host: Transmission IP
   - Port: `9091`
   - Username/Password: As configured

### NZBGet

1. Enable web interface in NZBGet
2. In Cinephage:
   - Host: NZBGet IP
   - Port: `6789` (default)
   - Username/Password: NZBGet credentials

### Deluge

1. Enable web UI in Deluge preferences
2. In Cinephage:
   - Host: Deluge IP
   - Port: `8112` (default)
   - Password: Web UI password

## Verification

Test your configuration:

1. Add a movie or series to your library with monitoring enabled
2. Go to the item and click **Search**
3. Cinephage should find releases and send one to your download client
4. Check **Activity > Queue** to see the download
5. Verify the download appears in your download client

## Troubleshooting

### Connection Failed

**Problem:** Test connection fails

**Solutions:**

- Verify download client is running
- Check IP address and port
- Ensure web UI is enabled
- Check firewall rules
- If using Docker, ensure containers can communicate

### Downloads Not Importing

**Problem:** Downloads complete but do not appear in library

**Solutions:**

- Check path mappings are correct
- Verify Cinephage can access the download folder
- Check logs in **Settings > Logs**
- Ensure completed download handling is enabled

### Wrong Path Errors

**Problem:** "Cannot find file" errors

**Solutions:**

- Add path mappings for mismatched paths
- Verify volume mounts in Docker
- Check file permissions (PUID/PGID)

### Authentication Errors

**Problem:** "Authentication failed" or 401 errors

**Solutions:**

- Verify username and password
- Check if download client requires authentication
- Ensure API keys are correct (not NZB keys)

## Best Practices

### Use Categories/Labels

Set categories in your download client:

- Separates Cinephage downloads from others
- Easier to manage completed downloads
- Enables different post-processing per category

### Keep Paths Consistent

When possible, use the same path structure:

- Mount downloads to the same path in all containers
- Avoid path mappings when possible
- Simplifies troubleshooting

### Monitor Disk Space

Download clients need space for:

- Active downloads
- Completed downloads (before import)
- Torrent seeding (if enabled)

Ensure adequate space on your download volume.

## Next Steps

Now that your download client is configured:

- [Configure Indexers](indexers) to add content sources
- [Set Up Quality Profiles](quality-profiles) to control download quality
- [Search and Download](../use/search-and-download) to start acquiring content

## See Also

- [Environment Variables](../../reference/configuration/environment-variables) for advanced configuration
- [Troubleshooting](../deploy/troubleshooting) for common issues
- [Performance Tuning](../deploy/performance-tuning) for optimization tips
