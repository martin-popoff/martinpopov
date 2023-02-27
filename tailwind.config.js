/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["gelica", "sans-serif"],
      serif: ["--font-playfair", "serif"],
      mono: ["--font-ubuntu", "monospace"],
    },
    extend: {
      colors: {
        primary: "#ff6d20",
      },
    },
  },
  plugins: [],
};
