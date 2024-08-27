/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
      'custom-md': '810px', // Adding a custom breakpoint
      'below-500': '500px',
      'below-339': '339px',
    },},
  },
  plugins: [],
}
