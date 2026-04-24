---
title: Streaming & Live TV FAQ
description: Questions about NZB streaming, IPTV, and Live TV features
sidebar_position: 6
tags: [faq, streaming, live tv, iptv, nzb]
keywords: [faq, streaming, live tv, iptv, nzb streaming, stalker, xstream]
---

# Streaming & Live TV

### What is NZB streaming?

Watch content directly from usenet without downloading the full file:
1. Mount NZB as virtual filesystem
2. Stream segments on-demand
3. Start playing immediately
4. No waiting for full download

See [Configure NZB Streaming](/guides/configure/nzb-streaming) for setup.

### How do I set up live TV?

Cinephage supports IPTV via:
- **Stalker Portal** - MAG/Ministra (MAC address auth)
- **XStream Codes** - Username/password auth
- **M3U Playlist** - Standard IPTV playlists

See [Set Up Live TV](/guides/configure/live-tv) for detailed configuration.

### Can I record live TV?

Not currently. Cinephage focuses on streaming and playlist management. DVR/recording may be added in the future.

### How do I use the M3U playlist?

Access your playlist at:
```
https://your-cinephage-url/api/livetv/playlist.m3u
```

Use with VLC, Kodi, Jellyfin, or any IPTV app.

## Quick Command Reference

**Access M3U playlist:**
```bash
# Direct URL
curl https://your-cinephage-url/api/livetv/playlist.m3u
```

**Test streaming:**
```bash
# In Cinephage web UI: Live TV → Test channel
```

**Check stream status:**
```bash
# Settings → Live TV → Provider status
```

## See Also

- [NZB Streaming Guide](/guides/configure/nzb-streaming) - Setup instructions
- [Live TV Setup](/guides/configure/live-tv) - IPTV configuration
- [Downloading FAQ](/support/faq/downloading) - Traditional downloads
