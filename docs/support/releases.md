---
title: Release History
description: Cinephage version history, release notes, and Docker tags
sidebar_position: 2
tags: [releases, versions, changelog]
keywords: [releases, versions, stable, dev]
---

# Release History

Cinephage follows semantic versioning and maintains two release channels.

## Release Channels

| Channel | Tag | Description |
|---------|-----|-------------|
| **Stable** | `latest` or `vX.Y.Z` | Production-ready releases |
| **Preview** | `dev` | Latest development builds |

## Version History

### v0.5.0 (Latest Stable)

**Release Date:** 2025-04-XX

**Major Features:**
- Activity Management with enhanced history and bulk actions
- Backup & Restore with encrypted configuration
- Native subtitle sync with alass algorithm
- Media Move between root folders
- Smart Lists with TMDB Discover integration
- i18n support with Spanish localization
- rTorrent download client support

**Breaking Changes:**
- `BETTER_AUTH_SECRET` now required (auto-generated fallback removed)
- Subtitles API response shape changed
- Docker volume mounts consolidated to `/config`

**Infrastructure:**
- Docker base image changed to `node:24-trixie-slim`
- Automated release pipeline with release-please

[View full release notes on GitHub →](https://github.com/MoldyTaint/Cinephage/releases/tag/v0.5.0)

### v0.6.0 (In Development)

**Status:** Preview builds available

**Preview Tags:**
- `ghcr.io/moldytaint/cinephage:dev`
- `ghcr.io/moldytaint/cinephage:dev-YYYYMMDD-RUN`

[View dev branch →](https://github.com/MoldyTaint/Cinephage/tree/dev)

## Docker Tags Reference

### Stable Releases

```bash
# Latest stable
docker pull ghcr.io/moldytaint/cinephage:latest

# Pinned version (recommended for production)
docker pull ghcr.io/moldytaint/cinephage:v0.5.0
```

### Preview Builds

```bash
# Latest development build
docker pull ghcr.io/moldytaint/cinephage:dev
```

## Which Tag Should I Use?

| Use Case | Recommended Tag |
|----------|----------------|
| Production deployment | `latest` or `vX.Y.Z` |
| Testing new features | `dev` |
| Deterministic deploys | `vX.Y.Z` (pinned) |
| CI/CD pipelines | `vX.Y.Z` (pinned) |

## See Also

- [Migration Guide](/docs/guides/deploy/migration) — Upgrading between versions
- [Backup & Restore](/docs/guides/deploy/backup-restore) — Before updating
- [Full Changelog on GitHub](https://github.com/MoldyTaint/Cinephage/blob/main/CHANGELOG.md)
