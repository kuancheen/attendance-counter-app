# Changelog

All notable changes to the Attendance Counter Web App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.0] - 2025-12-29

### Added
- **Summary Card**: Added individual copy buttons for each age group, allowing users to copy specific counts (e.g., "Kids: 5") directly.

## [1.6.4] - 2025-12-20

### Changed
- **UI**: Restored the text-based Global Count display, positioned above the footer links for better visibility.
- **Styling**: Refined footer and global count spacing and typography.

## [1.6.3] - 2025-12-20

### Changed
- **Styling**: Adjusted Hit.sh badge styles (Flat Square in footer, Flat in README).
- **Documentation**: Synchronized README features with recent version history.

## [1.6.2] - 2025-12-20

### Changed
- **Footer**: Updated footer layout with links to `README` and `CHANGELOG` via `md-viewer`, copyright link to GitHub, and new View Counter badge.
- **Documentation**: Added View Counter badge to `README.md`.

## [1.6.1] - 2025-12-19

### Changed
- **Documentation**: Updated `README.md` with standard project badges (Version, Status, SemVer, License).
- **Documentation**: Enhanced `index.html` comment header with Author and Description.

### Added
- **Workflows**: Synchronized local `.agent/workflows/version-update.md` with latest global template.
- **CI/CD**: Added `.github/workflows/static.yml` for automated GitHub Pages deployment.

## [1.6.0] - 2025-12-11

### Added
- **Favicon**: Added custom SVG favicon (purple theme)

## [1.5.6] - 2025-12-03

### Changed
- **Copyright**: Moved copyright notice to HTML comment (hidden from UI)
- **Cleanup**: Removed dynamic copyright year JavaScript logic
- **Cleanup**: Removed copyright CSS styles

### Added
- **Workflow**: Created release checklist workflow with copyright year maintenance steps

## [1.5.5] - 2025-12-03

### Changed
- **Maintenance**: Automated copyright year in footer to always show current year

## [1.5.4] - 2025-12-03

### Added
- **Legal**: Added standard MIT LICENSE file
- **Footer**: Added copyright notice to application footer

## [1.5.3] - 2025-12-03

### Fixed
- **Active State**: Fixed undefined CSS variable causing active Age Group button to not show solid purple color

## [1.5.2] - 2025-12-03

### Fixed
- **Visitor Badge**: Fixed broken logo by using a stable SVG data URI
- **UI Consistency**: Updated Age Group button hover state to match primary purple branding
- **Active State**: Ensure active Age Group button retains solid purple background
- **Mobile UX**: Enabled native momentum scrolling for Age Group selector on touch devices

## [1.5.1] - 2025-12-03

### Fixed
- **Age Group Selection**: Fixed visual "double selection" bug by removing default tap highlight
- **Responsiveness**: Improved touch event handling for age group buttons on mobile
- **UI Polish**: Updated active tab highlight color to primary purple for better visibility

## [1.5.0] - 2025-12-03

### Changed
- **UI Overhaul**: Merged age group selector with current count for a cleaner layout
- **Controls**: Updated Reset and Copy buttons to be icon-only for a minimalist look
- **Reset Flow**: Replaced browser confirmation with a custom modal dialog
- **Footer**: Moved global stats to footer with subtle styling next to version number

## [1.4.0] - 2025-12-02

### Added
- **Global Impact Counter**: Tracks total people counted by all users globally using CounterAPI.dev
- **Visitor Badge**: Displays total page views using hits.sh
- **Global Stats UI**: New footer section to display global metrics

### Changed
- Updated footer layout to accommodate new tracking features

## [1.3.0] - 2025-12-02

### Added
- **Reset Button**: Added a button to reset all counts to zero (with confirmation dialog)
- **Date Header**: Clipboard copy now includes the current date in "D MMMM YYYY" format (e.g., "2 December 2025")

### Changed
- Updated summary section layout to accommodate the new reset button
- Improved clipboard export format to include date header

## [1.2.0] - 2025-12-02

### Changed
- **Mobile Performance**: Eliminated 300ms tap delay on mobile devices
- Replaced click events with touchstart events on touch-enabled devices
- Added `touch-action: manipulation` CSS property to all interactive buttons
- Added `-webkit-tap-highlight-color: transparent` to remove tap highlights
- Automatic device detection to use appropriate event handlers (touchstart for mobile, click for desktop)

### Technical
- Implemented touch device detection using `'ontouchstart' in window`
- Added passive: false to touch event listeners to allow preventDefault
- Optimized event handling for both mobile and desktop platforms

## [1.1.0] - 2025-12-01

### Changed
- **Performance**: Significantly improved button responsiveness for rapid clicks
- Implemented debounced localStorage saves (100ms delay) to prevent blocking during rapid clicks
- Optimized UI updates using `requestAnimationFrame` for smoother performance
- Reduced pulse animation duration from 0.3s to 0.15s (50% faster)
- Made animations non-blocking by forcing reflow on each click
- Reduced scale effect from 1.1x to 1.08x for subtler visual feedback

### Technical
- Refactored increment/decrement functions to use debouncing pattern
- Added `debouncedSave()` function to batch localStorage writes
- Improved animation restart mechanism for better responsiveness

## [1.0.0] - 2025-12-01

### Added
- Initial release of Attendance Counter Web App
- Mobile-first responsive design optimized for portrait orientation
- 5 age group categories: Kids, Teens, Campus, YWAs, and Family
- Large circular increment button (120px diameter) for adding counts
- Smaller circular decrement button (80px diameter) for correcting mistakes
- Real-time counter display with pulse animation on updates
- Age group selector with active state highlighting
- Summary section showing all counts with total
- One-click clipboard export functionality
- Toast notification for successful clipboard copy
- LocalStorage persistence for maintaining counts across sessions
- Dark theme with glassmorphism effects
- Purple-to-indigo gradient accents
- Smooth animations and transitions
- Touch-optimized interface for mobile devices
- Version display (v1.0.0) at bottom of app
- Keyboard shortcuts for increment (+/=), decrement (-/_), and copy (Cmd/Ctrl+C)
- Google Fonts integration (Inter font family)

### Technical
- Vanilla JavaScript implementation (no frameworks)
- CSS custom properties for theming
- Clipboard API with fallback for older browsers
- Semantic HTML5 structure
- Mobile viewport optimization with meta tags
- Portrait orientation preference
- Git repository initialization
- GitHub repository setup
- GitHub Pages deployment
- Comprehensive README.md documentation
- .gitignore configuration

### Design
- Deep blue gradient background (#0a0e27 to #151b3d)
- Glassmorphism card effects with backdrop blur
- Vibrant gradient buttons and interactive elements
- Premium typography with Inter font family
- Responsive layout using CSS Grid and Flexbox
- Touch-friendly button sizes (minimum 80px)
- Consistent spacing system with CSS variables
- Smooth hover and active states
- Accessible color contrast ratios

### Deployment
- Live at: https://kuancheen.github.io/attendance-counter-app/
- Source code: https://github.com/kuancheen/attendance-counter-app
- Automatic deployment via GitHub Pages from main branch

---

## Future Enhancements (Planned)

### Potential Features
- Export data to CSV or Excel format
- Print-friendly summary view
- Custom age group names
- Date/time stamping for counts
- Multiple event sessions
- Data visualization (charts/graphs)
- PWA (Progressive Web App) support for offline use
- Dark/light theme toggle
- Custom color themes
- Undo/redo functionality
- Reset all counts button with confirmation
- Share summary via email or messaging apps

### Technical Improvements
- Unit tests for core functionality
- End-to-end testing
- Performance optimization
- Accessibility improvements (WCAG 2.1 AA compliance)
- Internationalization (i18n) support
- Service worker for offline functionality
- Analytics integration (optional)

---

## Version History

### [1.0.0] - 2025-12-01
- Initial public release
- Full feature set implemented
- Deployed to GitHub Pages
- Production-ready

---

## Links

- **Live App**: https://kuancheen.github.io/attendance-counter-app/
- **GitHub Repository**: https://github.com/kuancheen/attendance-counter-app
- **Report Issues**: https://github.com/kuancheen/attendance-counter-app/issues
- **Documentation**: See [README.md](README.md)
