import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Provide a cohesive night-mode palette by customizing the gray scale
      colors: {
        gray: {
          900: '#071328', // app background (very dark navy)
          850: '#0b1623', // main panels
          800: '#0f2132',
          750: '#162433',
          700: '#253341', // subtle border / elevated surfaces
          600: '#324454', // muted text
          500: '#526475',
          400: '#8b98a6',
          300: '#bfcad6',
          200: '#e6eef7',
          100: '#f5f7fb'
        },
        // Accent colors for highlights and buttons (blue)
        accent: {
          DEFAULT: '#3b82f6', // blue-500
          600: '#2563eb'      // blue-600
        }
      }
    },
  },
  plugins: [
    forms
  ],
}
