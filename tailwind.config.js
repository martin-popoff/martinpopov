/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["--font-outfit", "sans-serif"],
      serif: ["--font-playfair", "serif"],
    },
    extend: {
      colors: {
        primary: "#ff6d20",
      },
    },
  },
  plugins: [],
};
