# Project Architecture

## File Structure

This React/Vite todo application follows an industry-standard file structure:

```
src/
├── App.jsx                 # Main application component with routing
├── main.jsx               # Application entry point
├── styles.css             # Global styles
├── pages/                 # Page components
│   ├── index.js          # Page exports
│   ├── Home.jsx          # Landing page
│   ├── User.jsx          # User dashboard
│   └── NotFound.jsx      # 404 page
├── components/
│   ├── layout/           # Layout components
│   │   └── Navbar.jsx    # Navigation bar
│   ├── tasks/            # Task-related components
│   │   ├── InputBox.jsx  # Task input form
│   │   ├── Task.jsx      # Individual task component
│   │   ├── PendingTasks.jsx # Pending tasks list
│   │   └── CompletedTasks.jsx # Completed tasks list
│   └── ui/               # Reusable UI components
│       ├── index.js      # UI component exports
│       ├── PageTransition.jsx # De Shaw-style page transitions
│       ├── DarkModeToggle.jsx # Dark mode toggle button
│       ├── ColorPicker.jsx    # Color selection component
│       └── ProtectedRoute.jsx # Route protection wrapper
└── utils/
    └── index.js          # Utility functions
```

## Key Features

### Page Transitions
- Implemented De Shaw-style page transitions with smooth colored overlay
- Transition overlay slides down to cover the page, navigation occurs while covered, then slides away

### Dark Mode
- Globally available dark mode with consistent theme
- Conditionally rendered toggle button:
  - Floating button on Home and NotFound pages
  - Integrated into Navbar on User pages
- Theme persistence across page navigation

### Component Organization
- **Pages**: Top-level page components (Home, User, NotFound)
- **Layout**: Structural components (Navbar)
- **Tasks**: Task management components (InputBox, Task, PendingTasks, CompletedTasks)
- **UI**: Reusable utility components (PageTransition, DarkModeToggle, ColorPicker, ProtectedRoute)

## Import Strategy

- Pages and UI components have index.js files for cleaner imports
- Example: `import { PageTransition, DarkModeToggle } from '../components/ui'`
- All imports use relative paths appropriate to the file structure

## Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).
