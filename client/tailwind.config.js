/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6C2EB7',
        secondary: '#F3F6F9',
        darkText: '#231F20',
      },
      borderRadius: {
        lg: '12px',
      },
    },
  },
  plugins: [],
};