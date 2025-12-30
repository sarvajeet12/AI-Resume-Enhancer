/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'body-bg': '#1a1a1a',
        'nav-bg': '#262626',
        'button-bg': '#170A5',
        'text-primary': '#e6e6e6',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

