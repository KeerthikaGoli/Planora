

```markdown
# 📅 Calendar Web App

A modern and interactive **Calendar Web Application** built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.  
This project provides users with a beautiful, fast, and functional interface to manage and visualize events efficiently.

---

## 🌐 Live Demo

👉 **Try it here:** [Calendar Web App](https://adorable-daifuku-e8a303.netlify.app/)

---


---

## 🚀 Features

### 🗓️ 1. Interactive Calendar View
The core interface allows users to easily navigate between months, weeks, and days.  
- Displays all days dynamically with a highlighted “Today” view.  
- Reusable components like `CalendarContainer`, `CalendarDay`, and `CalendarSidebar` ensure scalability.  
- Smooth month transitions with subtle animations for better UX.  

---

### 📝 2. Event Management (Add / Edit / Delete)
Users can add, edit, or delete events directly from the calendar.  
- Clicking on a date opens a **modal popup** (`CalendarModal.tsx`) to manage events.  
- Input fields for title, description, and time.  
- Real-time updates after adding or editing events.  
- Clean and minimal interface for quick scheduling.  

---

### 📚 3. Sidebar Navigation
Quick month and year navigation through the sidebar.  
- Implemented via `CalendarSidebar.tsx` and `MiniCalendar.tsx`.  
- Provides a compact monthly view for date selection.  
- Could be extended with filters (e.g., Work, Personal events).  

---

### 🎞️ 4. Smooth Animations
Visually pleasing transitions for a better user experience.  
- Managed using `CalendarAnimation.tsx`.  
- Smooth effects for opening modals and switching months.  

---

### 💬 5. Event Tooltip
Quick preview of event details without opening a modal.  
- Hovering over an event displays a tooltip (`CalendarTooltip.tsx`) showing title, description, and time.  

---

### 💻 6. Responsive & Minimal UI
Designed to look perfect on all screen sizes.  
- Built with **Tailwind CSS** for adaptive and responsive design.  
- Works seamlessly across desktop, tablet, and mobile screens.  
- Minimal layout with consistent color and spacing schemes.  

---

### 🕐 7. Splash Screen
Displays a sleek loading animation when the app starts.  
- Implemented using `SplashScreen.tsx`.  
- Enhances first impression and preloads essential assets.  

---

### 🧩 8. TypeScript-Powered Codebase
Ensures clean, type-safe, and maintainable development.  
- Type definitions for events, dates, and states.  
- Prevents runtime errors and improves code reliability.  

---

### ⚡ 9. Fast and Lightweight Setup
Developed using **Vite** for superior performance.  
- Instant startup with Hot Module Replacement (HMR).  
- Optimized build output and lightning-fast reloads.  
- Perfect for rapid development and deployment.  

---

### ⌨️ 8. Keyboard Shortcuts
Boosts productivity and makes navigation faster.  

| Shortcut | Action |
|-----------|--------|
| ← / → | Navigate to previous / next month |
| **T** | Jump to today’s date |
| **N** | Create a new event |
| **Double-click on a date** | Add a new event directly on that date |

*(All shortcuts implemented inside `CalendarContainer.tsx`)*  

---

## 🧱 Folder Structure

```

calendar-app/
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   └── vite.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── CalendarContainer.tsx
│   │   │   ├── CalendarDay.tsx
│   │   │   ├── CalendarSidebar.tsx
│   │   │   ├── CalendarModal.tsx
│   │   │   ├── CalendarTooltip.tsx
│   │   │   ├── MiniCalendar.tsx
│   │   │   ├── CalendarAnimation.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── index.ts
│   │   ├── Layout/
│   │   ├── UI/
│   │   ├── Logo.tsx
│   │   └── SplashScreen.tsx
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   ├── types/
│   ├── context/
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   └── index.css
│
├── .eslintrc.cjs
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md

````

---

## 🧠 Tech Stack

| Category | Technologies |
|-----------|--------------|
| **Frontend** | React (TypeScript) |
| **Styling** | Tailwind CSS |
| **Build Tool** | Vite |
| **State Management** | React Hooks / Context |
| **Language** | TypeScript |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/calendar-app.git
cd calendar-app
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the App

```bash
npm run dev
```

Visit ➡️ `http://localhost:5173`


---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create a feature branch (`feature/your-feature-name`)
3. Commit and push changes
4. Open a Pull Request

---

## 🏆 Acknowledgments

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [TypeScript](https://www.typescriptlang.org/)

---

## 📬 Contact

**Developer:** [Keerthika Goli](https://www.linkedin.com/in/keerthika-goli-8115ab256)
📧 **Email:** [keerthikagoli08@gmail.com](mailto:keerthikagoli08@gmail.com)


```
