# Attendance Counter Web App

A beautiful, mobile-first web application for tracking attendance across different age groups.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://kuancheen.github.io/attendance-counter-app/)
[![Version](https://img.shields.io/badge/version-1.5.1-blue)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🚀 Live Demo

**Try it now**: [https://kuancheen.github.io/attendance-counter-app/](https://kuancheen.github.io/attendance-counter-app/)

## ✨ Features

### Core Functionality
- **5 Age Groups**: Kids, Teens, Campus, YWAs, and Family
- **Unified Interface**: Merged age selector and counter for better ergonomics
- **Clicker Interface**: Large increment button (120px) and smaller decrement button (80px)
- **Memory Persistence**: Counts automatically saved to localStorage across sessions
- **Summary View**: Real-time display of all counts with total
- **Reset Functionality**: One-click reset with custom confirmation modal
- **Clipboard Export**: Copy attendance data with formatted date header
- **Global Tracking**: Real-time global usage counter and visitor badge
- **Mobile-Optimized**: Portrait-first design with responsive layout
- **Version Display**: Current version shown at bottom of app

### Design Features
- **Modern Dark Theme**: Deep blue gradient background with glassmorphism effects
- **Vibrant Accents**: Purple-to-indigo gradient for interactive elements
- **Smooth Animations**: Pulse effects on counter updates, hover transitions
- **Premium Typography**: Inter font family for clean, modern look
- **Touch-Optimized**: Large buttons designed for mobile interaction

## 📱 Usage

### Basic Usage
1. **Select Age Group**: Tap one of the 5 age group buttons at the top
2. **Count Attendance**: 
   - Tap the large **+** button to add each person
   - Tap the smaller **−** button to correct mistakes
3. **Switch Groups**: Tap a different age group to count that category
4. **View Summary**: Scroll down to see all counts and total
5. **Export Data**: Tap the **Copy** button to copy all counts to clipboard

### Keyboard Shortcuts
- `+` or `=` → Increment current count
- `-` or `_` → Decrement current count
- `Cmd/Ctrl + C` → Copy to clipboard

### Data Export Format
When you click "Copy", the data is formatted as:
```
2 December 2025

Attendance Count:

Kids: 5
Teens: 3
Campus: 7
YWAs: 2
Family: 4

Total: 21
```

## 🛠️ Technical Details

### Technologies
- **Vanilla JavaScript**: No frameworks, lightweight and fast
- **CSS Custom Properties**: Consistent theming and easy customization
- **LocalStorage API**: Client-side data persistence
- **Clipboard API**: Modern copy functionality with fallback
- **CSS Grid/Flexbox**: Responsive layout system
- **Google Fonts**: Inter font family

### Browser Compatibility
- Modern browsers (Chrome, Safari, Firefox, Edge)
- iOS Safari 12+
- Android Chrome 80+
- Graceful degradation for older browsers

### File Structure
```
attendance-counter-app/
├── .git/                 # Git repository
├── .gitignore           # Git ignore rules
├── CHANGELOG.md         # Version history and changes
├── README.md            # This file
├── index.html           # Main HTML structure
├── style.css            # Styling and design
└── script.js            # Application logic
```

## 🚀 Getting Started

### Online (Recommended)
Simply visit: [https://kuancheen.github.io/attendance-counter-app/](https://kuancheen.github.io/attendance-counter-app/)

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/kuancheen/attendance-counter-app.git
   cd attendance-counter-app
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html
   ```

That's it! No build process or dependencies required.

## 📊 Features in Detail

### Age Group Selection
- Segmented control design with 5 age group buttons
- Active state with gradient background and glow effect
- Switches counter display when different group is selected
- Remembers count for each group independently

### Counter Controls
- **Increment Button**: Large circular button with gradient background, adds 1 to current age group
- **Decrement Button**: Smaller button positioned to the left, subtracts 1 (minimum 0)
- Pulse animation on counter value when clicked
- Ripple effect on button press

### Data Persistence
- All counts automatically saved to browser's localStorage
- Data persists across browser sessions
- Current age group selection remembered
- No manual save required

### Summary & Export
- Real-time list of all age groups with their counts
- Individual cards with gradient count values
- Total attendance at the bottom
- Copy button formats data as plain text
- Toast notification confirms successful copy

## 🔄 Updates

The app automatically updates when changes are pushed to the main branch. Check the [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Version

Current version: **v1.5.1** (2025-12-03)

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live App**: https://kuancheen.github.io/attendance-counter-app/
- **GitHub Repository**: https://github.com/kuancheen/attendance-counter-app
- **Report Issues**: https://github.com/kuancheen/attendance-counter-app/issues
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

## 👤 Author

Created by Kuan Cheen Lim

---

**Made with ❤️ for easy attendance tracking**
