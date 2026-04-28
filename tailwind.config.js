/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Add these two lines right here!
        outfit: ['"Outfit"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        bangers: ['"Bangers"', 'cursive'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
