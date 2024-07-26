/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        primary: "#F2F4E9",
        secondary: "#00531B",
        text: "#1B1B1B",
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      }
    },
  },
  plugins: [],
};
