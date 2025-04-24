
// tailwind.config.js


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // If you are using the 'src' directory instead of 'app':
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fdf2f2',
          100: '#fbe5e5',
          200: '#f6baba',
          300: '#f18f8f',
          400: '#ec6464',
          500: '#e73939',
          600: '#c92d2d',
          700: '#aa2121',
          800: '#8c1515',
          900: '#6d0909',
        },
        // Add other custom colors here if needed
      },
    },
  },
  plugins: [],
};