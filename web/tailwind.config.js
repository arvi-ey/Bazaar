/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        MAIN_COLOR: "#a1ff00",
        SECONDARY_COLOR: "#a9eb3b",
        TEXT_COLOR: "#6E6D7A",
        EDIT_COLOR: "#6ca608"
      }
    },
  },
  plugins: [],
}

