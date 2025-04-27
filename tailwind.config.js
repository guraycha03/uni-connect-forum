
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'maroon-50': '#fdf7f7',
        'maroon-100': '#fbeeee',
        'maroon-200': '#f6d4d5',
        'maroon-300': '#edabb0',
        'maroon-400': '#e07279',
        'maroon-500': '#d33942',
        'maroon-600': '#b02d34',
        'maroon-700': '#8d2225',
        'maroon-800': '#6a1617',
        'maroon-900': '#470b08',
      },
    },
  },
  plugins: [],
}