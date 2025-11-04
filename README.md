# Planora — Elegant Calendar & Scheduling App

An elegant, interactive, and fully responsive React + TypeScript calendar application built with Vite and Tailwind CSS. Planora helps users plan, manage, and visualize events with a minimal UI, keyboard shortcuts, conflict detection, and a compact sidebar for quick navigation.

Live demo: https://adorable-daifuku-e8a303.netlify.app/

---

## Key Features

- Interactive monthly calendar view with per-day event cards and hover tooltips.
- Add / edit / delete events via a modal with fields for title, description, date, time, category and color.
- Sidebar with mini calendar, event counts for the month, and upcoming events.
- Conflict detection for overlapping events.
- Keyboard shortcuts for fast navigation and quick event creation.
- Splash screen shown during initialization.
- Responsive layout and dark/light theme support.
- Lightweight animations for smooth UX.

---

## Features (Detailed)

### Interactive Calendar View
- Clean monthly grid with current-day highlight and responsive cells.
- Navigate months using UI arrows or keyboard shortcuts.
- Search bar to find events by title/description.
- Filters for categories: All, Meeting, Planning, Review, Presentation.
- Add events by double-clicking a date or using the floating Add button.

### Sidebar Quick View
- Mini calendar for quick navigation.
- Monthly statistics and event breakdown by category.
- Upcoming events list with date/time and brief details.
- Clicking a date in the sidebar focuses the main calendar.

### Event Management
- Modal form for add/edit including validation and conflict checks.
- Inline edit/delete options in selected-day panel and event tooltip.
- Instant UI updates when events change.

### Event Tooltip
- Hover reveals event title, time, and short description.

### Animations & Splash Screen
- Subtle transitions for month changes and modal open/close.
- Branded splash screen while app initializes.

### Keyboard Shortcuts
| Shortcut | Action |
|---:|:---|
| ← / → | Navigate previous/next month |
| T | Jump to today |
| N | Open new event modal |
| Double-click date | Add new event on that date |

---

## Tech Stack

- Frontend: React + TypeScript
- Bundler: Vite
- Styling: Tailwind CSS
- Animations: Framer Motion / CSS Transitions (optional)
- State: React hooks (local state)
- Deployment: Netlify (example)

---

## Getting Started

Prerequisites: Node.js (recommended >= 18), npm.

Clone, install and run:

```bash
git clone https://github.com/<your-username>/planora.git
cd planora
npm install
npm run dev
```

Open http://localhost:5173

Build for production:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

---

## Project Structure (recommended)

```
planora/
├─ public/
│  ├─ favicon.svg
│  └─ logo.svg
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ Calendar/
│  │  │  ├─ CalendarContainer.tsx
│  │  │  ├─ CalendarDay.tsx
│  │  │  ├─ CalendarSidebar.tsx
│  │  │  ├─ CalendarModal.tsx
│  │  │  ├─ CalendarTooltip.tsx
│  │  │  ├─ MiniCalendar.tsx
│  │  │  ├─ CalendarAnimation.tsx
│  │  │  └─ index.ts
│  │  ├─ Layout/
│  │  └─ SplashScreen.tsx
│  ├─ constants/
│  ├─ hooks/
│  ├─ utils/
│  ├─ types/
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
├─ vite.config.ts
└─ package.json
```

---

## Data & Utilities

- Events seeded by `INITIAL_EVENTS` (in `src/constants`).
- Event type and utility functions (date helpers, conflict checks) in `src/utils`.
- Events stored in local component state; easy to replace with API/localStorage.

---

## Author

Keerthika Goli  
LinkedIn: https://www.linkedin.com/in/keerthika-goli-8115ab256  
Email: keerthikagoli08@gmail.com

---

## License

MIT — see LICENSE file for details.

---
