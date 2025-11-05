# 📅 Planora - Calendar & Event Management

A modern, beautiful **fully responsive** calendar application built with React and TypeScript. Planora helps you manage your schedule efficiently with an intuitive interface, event tracking, and conflict detection - similar to Google Calendar.

![Planora Logo](./public/logo.svg)

## 🌐 Live Demo

🔗 **Live Application**: [https://adorable-daifuku-e8a303.netlify.app](https://adorable-daifuku-e8a303.netlify.app) 

> ⚠️ **Note:** For the best viewing experience, open the app in **Light Mode** (disable Chrome’s default dark mode).  
> Some browsers with forced dark themes may affect the visual appearance of the calendar UI.


> **Note**: The application is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

## 📋 Assignment Requirements

This project fulfills all requirements for a calendar application assignment:

### ✅ Calendar Features
- ✅ Displays current month and year by default
- ✅ Grid layout showing all dates in the month
- ✅ Navigation buttons to previous/next months
- ✅ Current date visually highlighted

### ✅ Event Management
- ✅ Events loaded from static JSON file (`public/events.json`)
- ✅ Events display with title, date, time, and duration
- ✅ Events visually represented on corresponding calendar dates
- ✅ Conflict detection for overlapping events on same date/time

### ✅ Design & Tech Stack
- ✅ User-friendly interface similar to Google Calendar
- ✅ Built with React and TypeScript
- ✅ Styled with Tailwind CSS
- ✅ Fully responsive design

## ✨ Features

### 🎯 Core Functionality
- **Monthly Calendar View** - Navigate through months with a clean, grid-based calendar interface
- **Event Management** - Create, edit, and delete events with ease
- **Event Categories** - Organize events by type: Meeting, Planning, Review, Presentation
- **Color-Coded Events** - Visual event categorization with customizable colors
- **Conflict Detection** - Automatically detects scheduling conflicts and notifies you
- **Event Search** - Search events by title or description
- **Category Filtering** - Filter events by category (All, Meeting, Planning, Review, Presentation)

### 🎨 User Experience
- **Dark/Light Mode** - Toggle between dark and light themes
- **🔄 Fully Responsive Design** - **Optimized for all screen sizes** (Desktop, Tablet, Mobile)
- **Keyboard Shortcuts** - Navigate quickly with keyboard shortcuts
- **Smooth Animations** - Beautiful transitions and animations throughout
- **Selected Date Panel** - View and manage events for a specific date
- **Upcoming Events** - Quick view of upcoming events in the sidebar

### 📱 Mobile Features
- **📱 Mobile-First Design** - **Seamlessly responsive** across all devices
- **Collapsible Sidebar** - Sidebar hides on mobile for better calendar visibility
- **Touch-Friendly Controls** - Large tap targets and intuitive gestures
- **Adaptive Layout** - Layout automatically adjusts for optimal viewing on any device
- **Responsive Typography** - Text scales appropriately for different screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+ (required for Vite 7)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Planora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## ⌨️ Keyboard Shortcuts

- **← / →** - Navigate to previous/next month
- **T** - Go to today's date
- **N** - Open "Add Event" modal
- **Double-click** - Add event on a specific date
- **Esc** - Close modal (when modal is open)

## 🎯 Usage

### Adding Events
1. Click the **"+ Add Event"** button or press **N**
2. Fill in the event details:
   - Title (required)
   - Description
   - Date (required)
   - Start Time (required)
   - End Time (required)
   - Category
   - Color
3. Click **"Add Event"** to save
4. **Conflict Detection**: If you try to schedule an event that overlaps with an existing event, you'll receive a clear notification with details about the conflicting event

### Editing Events
- Click on any event in the calendar to edit it
- Modify the details and click **"Update Event"**
- Conflict detection also applies when editing events

### Viewing Date Events
- **Single click** on a date to view all events for that day
- Events appear in the bottom panel with full details
- **Double-click** on a date to quickly add an event for that day

### Searching Events
- Use the search bar in the top navigation
- Search by event title or description
- Results filter in real-time

### Filtering by Category
- Click category buttons (All, Meeting, Planning, Review, Presentation)
- Calendar updates to show only events from selected category

### Navigating the Calendar
- Use **← / →** arrow buttons or keyboard arrows to navigate months
- Click **"Go to Today"** to jump to the current month
- Current date is highlighted with a ring and background color

## 🏗️ Project Structure

```
Planora-1/
├── public/
│   ├── events.json          # Static event data (loaded on app start)
│   ├── favicon.svg          # Browser tab icon
│   └── logo.svg             # Application logo
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── Calendar.tsx           # Main calendar component
│   │   │   ├── CalendarDay.tsx       # Individual day cell
│   │   │   ├── CalendarModal.tsx     # Add/Edit event modal
│   │   │   ├── CalendarSidebar.tsx   # Sidebar with stats & navigation
│   │   │   ├── TopBar.tsx            # Top navigation bar
│   │   │   ├── SelectedDateEvents.tsx # Selected date event panel
│   │   │   ├── Notification.tsx      # Toast notifications
│   │   │   ├── CalendarAnimation.tsx  # Bottom space animation
│   │   │   └── ...
│   │   ├── Logo.tsx                  # Logo component
│   │   └── SplashScreen.tsx           # Loading splash screen
│   ├── constants/
│   │   └── calendar.ts                # Calendar constants & fallback data
│   ├── utils/
│   │   └── calendarUtils.ts           # Calendar utility functions (date handling, conflict detection)
│   ├── App.tsx                        # Main app component
│   ├── main.tsx                       # Application entry point
│   └── index.css                      # Global styles & theme
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── ASSIGNMENT_CHECKLIST.md            # Assignment requirements checklist
```

## 🛠️ Tech Stack

- **React 19.1.1** - UI library with functional components and hooks
- **TypeScript 5.9.3** - Type safety and better development experience
- **Vite 7.1.7** - Fast build tool and dev server
- **Tailwind CSS 3.4.18** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful icon library
- **ESLint** - Code linting and quality assurance
- **Native JavaScript Date** - Date handling (can be enhanced with dayjs/date-fns if needed)

## 🎨 Theming

Planora supports both light and dark modes:

- **Light Mode**: Clean, bright interface with subtle gradients
- **Dark Mode**: Elegant dark theme with purple accents
- Toggle between modes using the sun/moon icon in the top bar

## 📝 Features in Detail

### Event Data Loading
- Events are loaded from `public/events.json` on application startup
- If the JSON file is not available, the app falls back to default events from constants
- Each event includes: title, date, startTime, endTime, description, category, and color

### Event Conflict Detection
When adding or editing an event, Planora automatically checks for scheduling conflicts:
- Detects overlapping time slots on the same date
- Shows clear error notifications with conflicting event details:
  - Conflicting event title
  - Conflicting time range
  - Prevents double-booking
- Visual indicators on calendar days with multiple conflicting events

### Event Categories
Organize your events into categories:
- **Meeting** - Team meetings and syncs
- **Planning** - Planning sessions and sprints
- **Review** - Code reviews and design reviews
- **Presentation** - Demos and presentations

### Calendar Navigation
- **Previous/Next Month Buttons** - Navigate between months easily
- **Current Date Highlighting** - Today's date is visually distinct with:
  - Background color change
  - Ring border
  - Special styling
- **Grid Layout** - 7-day week grid showing all dates in the month
- **Month/Year Display** - Current month and year shown prominently

### Quick Navigation
- **Sidebar Stats** - See total events in the current month
- **Mini Calendars** - Quick navigation to previous/next months
- **Upcoming Events** - View your next 5 upcoming events
- **Today Button** - Jump to today's date instantly

## 📊 Assignment Compliance

This project fully satisfies all assignment requirements:

✅ **Calendar Display**
- Current month/year displayed by default
- Grid layout with all dates
- Previous/Next month navigation buttons
- Current date visually highlighted

✅ **Event Management**
- Events loaded from static JSON file (`public/events.json`)
- Events include: title, date, time, and duration
- Events displayed on corresponding calendar dates
- Conflict detection for overlapping events

✅ **Design & Implementation**
- User-friendly interface similar to Google Calendar
- Built with React and TypeScript
- Styled with Tailwind CSS
- Fully responsive design

See `ASSIGNMENT_CHECKLIST.md` for detailed requirement verification.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript strict mode enabled
- ESLint for code quality
- Prettier formatting (if configured)


---

**Made with ❤️ using React, TypeScript, and Vite**
