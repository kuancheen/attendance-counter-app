# Attendance Counter Web App

A beautiful, mobile-first web application for tracking attendance across different age groups.

## Features

- **5 Age Groups**: Kids, Teens, Campus, YWAs, and Family
- **Clicker Interface**: Large increment button and smaller decrement button
- **Memory Persistence**: Counts saved to localStorage across sessions
- **Summary View**: Real-time display of all counts with total
- **Clipboard Export**: One-click copy of all attendance data
- **Mobile-Optimized**: Portrait-first design with responsive layout

## Usage

Simply open `index.html` in any modern web browser. The app works offline after initial load.

### How to Use

1. **Select Age Group**: Tap one of the 5 age group buttons at the top
2. **Count Attendance**: 
   - Tap the large **+** button to add each person
   - Tap the smaller **−** button to correct mistakes
3. **Switch Groups**: Tap a different age group to count that category
4. **View Summary**: Scroll down to see all counts and total
5. **Export Data**: Tap the **Copy** button to copy all counts to clipboard

## Technical Details

- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **Modern CSS**: Custom properties, glassmorphism effects, smooth animations
- **LocalStorage API**: Client-side data persistence
- **Clipboard API**: Modern copy functionality with fallback

## Browser Compatibility

- Modern browsers (Chrome, Safari, Firefox, Edge)
- iOS Safari 12+
- Android Chrome 80+

## Version

v1.0.0

## License

MIT
