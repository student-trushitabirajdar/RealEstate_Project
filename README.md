# Real Estate Website - ENFOR DATA

A modern React-based real estate website with a clean, professional layout featuring a sidebar navigation, top navigation bar, and a grid-based main content area.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modular Components**: Clean separation of concerns with reusable components
- **Accessibility**: Keyboard navigation and screen reader support
- **Modern UI**: Clean, professional design matching the reference layout
- **Hover Effects**: Interactive cards with smooth transitions

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js          # Left sidebar with navigation
│   ├── Sidebar.css
│   ├── TopNav.js           # Top navigation bar
│   ├── TopNav.css
│   ├── MainGrid.js         # Main content grid
│   └── MainGrid.css
├── App.js                  # Main app component
├── App.css                 # App-level styles
├── index.js                # React entry point
└── index.css               # Global styles
```

## Components

### Sidebar
- Project title header ("ENFOR DATA")
- Vertical navigation menu with 15 items
- "HOME" item is highlighted/active
- Template message box at the bottom
- Fixed positioning on desktop, responsive on mobile

### TopNav
- Horizontal navigation bar with 4 buttons
- Evenly spaced buttons with hover effects
- Responsive design for mobile devices

### MainGrid
- 4x3 grid layout (responsive: 3x5 on tablet, 2x7 on mobile, 1x14 on small mobile)
- 14 interactive cards with icons and labels
- Hover effects with shadows and color changes
- Keyboard accessible

## Installation

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Styling

The project uses CSS modules for component-specific styling with:
- CSS Grid for the main content layout
- Flexbox for component layouts
- CSS transitions for smooth hover effects
- Responsive breakpoints for mobile compatibility
- CSS custom properties for consistent theming

## Customization

### Adding Navigation Routes
To add actual navigation functionality:

1. Install React Router (already included in package.json):
   ```bash
   npm install react-router-dom
   ```

2. Update the navigation links in `Sidebar.js` and `TopNav.js` to use React Router's `Link` component

3. Create route components and add them to your routing configuration

### Adding Real Icons
Replace the emoji icons in `MainGrid.js` with:
- React Icons: `npm install react-icons`
- Material-UI Icons: `npm install @mui/icons-material`
- Custom SVG icons

### Styling Customization
- Update color scheme in CSS files
- Modify hover effects in component CSS files
- Adjust responsive breakpoints as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility Features

- Keyboard navigation support
- ARIA labels for screen readers
- High contrast text
- Focus indicators
- Semantic HTML structure

## Performance

- Optimized CSS with minimal reflows
- Efficient React component structure
- Responsive images and icons
- Smooth animations with `prefers-reduced-motion` support
