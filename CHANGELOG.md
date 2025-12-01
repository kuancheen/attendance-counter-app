# Changelog

All notable changes to the Attendance Counter Web App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
