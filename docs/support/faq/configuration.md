---
title: Configuration FAQ
description: Configuration questions about environment variables, authentication, and settings
sidebar_position: 3
tags: [faq, configuration, settings, environment, auth]
keywords: [faq, configuration, origin, auth, puid, pgid]
---

# Configuration

### What's the difference between ORIGIN and BETTER_AUTH_URL?

Both should usually be set to the same value:

- **ORIGIN:** Trusted origin for CSRF protection (your external URL)
- **BETTER_AUTH_URL:** Base URL for authentication callbacks

**Example:**
```yaml
environment:
  - ORIGIN=https://cinephage.yourdomain.com
  - BETTER_AUTH_URL=https://cinephage.yourdomain.com
```

### Why can't I access Cinephage externally?

Common causes:
1. **Firewall** - Port 3000 (or your custom port) not open
2. **ORIGIN not set** - Must set ORIGIN environment variable
3. **BETTER_AUTH_URL not set** - Required for external access
4. **Host binding** - Use 0.0.0.0 not 127.0.0.1

### How do I configure puid/pgid?

**Get your IDs:**
```bash
id -u  # User ID
id -g  # Group ID
```

**Docker Compose:**
```yaml
environment:
  - PUID=1000
  - PGID=1000
```

This ensures files are created with correct ownership.

### Why are my file permissions wrong?

**Check PUID/PGID:**
```bash
# Check current IDs
id

# Check file ownership
ls -la /path/to/media
```

**Fix permissions:**
```bash
# Docker
sudo chown -R 1000:1000 ./config

# Or run container as your user
docker run --user $(id -u):$(id -g) ...
```

## Quick Command Reference

**Get user/group IDs:**
```bash
id
```

**Fix permissions:**
```bash
sudo chown -R $(id -u):$(id -g) ./config
```

**Check environment variables:**
```bash
docker compose exec cinephage env | grep -E "(ORIGIN|PUID|PGID)"
```

## See Also

- [Installation Guide](/getting-started/installation) - Environment setup
- [Installation FAQ](/support/faq/installation) - Docker and setup questions
- [Troubleshooting](/support/faq/troubleshooting) - Permission and access issues
