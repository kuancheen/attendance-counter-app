---
description: Steps to follow when releasing a new version of the Attendance Counter App
---

# Release Checklist

Follow these steps for every release to ensure consistency and proper maintenance.

## 1. Version Bump
- [ ] **Determine Version**: Decide if it's a Patch (v1.x.X), Minor (v1.X.x), or Major (vX.x.x) release.
- [ ] **Update `index.html`**: Update the version number in the footer.
  ```html
  <div class="version">v1.X.X</div>
  ```

## 2. Documentation
- [ ] **Update `CHANGELOG.md`**: Add a new entry under `## [v1.X.X] - YYYY-MM-DD`.
  - Group changes by: `### Added`, `### Changed`, `### Fixed`, `### Removed`.
- [ ] **Update `README.md`**:
  - Update the version badge at the top: `[![Version](...badge/version-1.X.X-blue)](CHANGELOG.md)`
  - Update the "Current version" section at the bottom.

## 3. Copyright Maintenance
- [ ] **Check Year**: Is the current year later than the creation year (2025)?
- [ ] **Update `LICENSE`**: If yes, update the year range (e.g., `2025-2026`).
- [ ] **Update `index.html` Comment**: If yes, update the copyright comment at the top of the file.
  ```html
  <!-- Copyright (c) 2025-2026 Kuan Cheen Lim -->
  ```

## 4. Git Release
- [ ] **Commit**: `git commit -m "chore: Bump version to v1.X.X ..."`
- [ ] **Tag**: `git tag -a v1.X.X -m "Version 1.X.X - [Release Name]"`
- [ ] **Push**: `git push origin main && git push origin v1.X.X`
