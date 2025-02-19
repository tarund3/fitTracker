// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1D4ED8', // Custom primary color
          dark: '#111827',    // Dark background color
          light: '#F3F4F6',   // Light text color
        },
        fontFamily: {
          sans: ['Inter', 'Arial', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }
  