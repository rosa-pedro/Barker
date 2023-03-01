/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a2f51",
        secondary: "#3e71c3",
        success: '#3fb950',
        error: '#cf2323',
        info: '#2254cf',
        warning: '#fdc02a',
      },
    },
  },
  plugins: [],
}
