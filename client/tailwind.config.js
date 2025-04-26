/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0078D4',   // Hilanet blue
        secondary: '#F3F6F9', // Light gray background
        darkText: '#333333',  // Dark text
      },
      borderRadius: {
        lg: '12px',
      },
    },
  },
  plugins: [],
};