/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: "#171717",
        darkCard: "#121212",
        darkText: "#ebebf0",
        darkModal: "#0e0e0e",
        darkShadow: "#101011",
        darkHover: "#15803d",
        darkBorder: "#27272A",
        primary: "#22c55e",
        primaryDark: "#323b85",
        dark: "#320073",
        warning: "#EDC31A",
        info: "#1AAAED",
        error: "#ED1A1A"

      }
    },
  },
  plugins: [],
}