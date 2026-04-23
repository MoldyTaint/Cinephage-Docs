---
title: How to configure rTorrent
description: Step-by-step guide to configure rTorrent with Cinephage
sidebar_position: 4
tags: [download-clients, rtorrent, torrent, configuration, guide]
keywords: [rtorrent, torrent client, xml-rpc, setup]
---

# How to configure rTorrent

This guide shows you how to configure rTorrent as your download client in Cinephage.

## Prerequisites

- rTorrent installed and running with XML-RPC enabled
- ruTorrent or direct XML-RPC access configured
- Cinephage installed and running
- Network connectivity between Cinephage and rTorrent

## Step 1: Enable rTorrent XML-RPC

rTorrent uses XML-RPC for remote control. You must enable this for Cinephage to connect.

### Edit .rtorrent.rc

1. Locate your rTorrent configuration file:
   - Linux: `~/.rtorrent.rc` or `~/.config/rtorrent/rtorrent.rc`

2. Add or verify the following settings:

```bash
# Enable XML-RPC
scgi_port = localhost:5000

# Or use Unix socket (more secure)
# scgi_local = /tmp/rtorrent.sock

# Enable network access (if needed)
network.scgi.open_port = 0.0.0.0:5000
```

3. Restart rTorrent:

```bash
# If running as systemd service
sudo systemctl restart rtorrent

# Or kill and restart manually
pkill rtorrent
rtorrent
```

### Verify XML-RPC is Working

Test the connection:

```bash
# Using xmlrpc tool (install with: pip install xmlrpc-client)
xmlrpc localhost:5000 system.listMethods

# Or using curl
curl -d "<?xml version='1.0'?><methodCall><methodName>system.listMethods</methodName></methodCall>" http://localhost:5000
```

## Step 2: Add rTorrent to Cinephage

1. In Cinephage, go to **Settings > Integrations > Download Clients**
2. Click **Add Download Client**
3. Select **rTorrent** from the dropdown
4. Configure the connection settings:

### Connection Settings

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Descriptive name for this client | `rTorrent` |
| **Host** | rTorrent IP or hostname | `localhost`, `192.168.1.100`, or `rtorrent` (Docker) |
| **Port** | XML-RPC port | `5000` |
| **Username** | Optional authentication | `admin` |
| **Password** | Optional authentication | your password |
| **Use SSL** | Enable for HTTPS | Unchecked (unless configured) |
| **URL Base** | For reverse proxy setups | `/RPC2` (optional) |

**Host Configuration Guide:**

- Same machine: `localhost` or `127.0.0.1`
- Docker on same host: Use host IP (e.g., `192.168.1.100`)
- Separate machine: Use that machine's IP address
- Docker container name: `rtorrent` (if on same network)

### Advanced Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Category** | rTorrent label/tag | `cinephage` |
| **Priority** | Download priority | `Normal` |

## Step 3: Test and Save

1. Click **Test** to verify Cinephage can connect
2. If successful, click **Save** to add the download client

If the test fails:

- Verify XML-RPC is enabled in rTorrent (Step 1)
- Check that the host and port are correct
- Confirm rTorrent is running
- Check firewall rules allow connections on port 5000
- If using Docker, verify containers can communicate
- Test XML-RPC manually with curl (see Step 1)

## Testing Your Configuration

1. Add a movie or series to your Cinephage library with monitoring enabled
2. Go to the item and click **Search**
3. Cinephage should find releases and send one to rTorrent
4. Check **Activity > Queue** to see the download
5. Verify the download appears in ruTorrent or rTorrent console

## Common Issues

### XML-RPC Not Enabled

**Problem:** Connection refused or RPC not accessible.

**Solutions:**

- Ensure `scgi_port` or `scgi_local` is set in `.rtorrent.rc`
- Restart rTorrent after editing configuration
- Verify the port is not blocked by a firewall
- Check that rTorrent has permission to bind to the port

### Connection Timeout

**Problem:** Connection test times out.

**Solutions:**

- Verify rTorrent is running
- Check network connectivity between Cinephage and rTorrent
- Ensure the correct IP address or hostname is used
- Check if a firewall is blocking the connection
- If using Docker, verify the container is running and accessible

### Downloads Not Importing

**Problem:** Downloads complete in rTorrent but do not appear in Cinephage library.

**Solutions:**

- Check path mappings if Cinephage and rTorrent use different paths
- Verify Cinephage can access the download folder
- Check Cinephage logs in **Settings > Logs**
- Ensure the download directory has correct permissions

## rTorrent Configuration Tips

### Download Directory

Ensure your download directory is accessible to Cinephage:

```bash
# In .rtorrent.rc
directory = /downloads/complete
```

### Label/Category Support

Cinephage uses rTorrent labels (tags) to categorize downloads:

```bash
# Labels are applied automatically via XML-RPC
# No manual configuration needed
```

### Ratios and Seeding

Configure seeding behavior in rTorrent:

```bash
# Stop seeding at ratio 2.0
ratio.min.set = 200

# Or stop after 24 hours
schedule = ratio_stop, 60, 60, "if=(ratio,stop)"
```

## See Also

- [Download clients overview](/guides/configure/download-clients) — Overview of supported clients
- [How to configure qBittorrent](./qbittorrent) — Alternative torrent client
- [How to configure Transmission](./transmission) — Another torrent client option
- [Troubleshooting downloads](/guides/deploy/troubleshooting) — Common issues and solutions
