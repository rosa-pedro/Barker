/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a4b51',
        primary_lighter: 'rgba(26,75,81,0.75)',
        secondary: '#02b3c9',
        secondary_lighter: 'rgba(2,179,201,0.75)',
        success: '#3fb950',
        error: '#cf2323',
        info: '#2254cf',
        warning: '#fdc02a',
      },
    },
  },
  plugins: [],
};
