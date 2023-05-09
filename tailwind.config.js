/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./src/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateRows: {
        "3rem": "repeat(1,minmax(0,3.3rem)),",
      },
      gridTemplateColumns: {
        "5-3rem": "repeat(5,minmax(0,3.3rem)),",
      },
      animation: {
        opacity: "opacity 0.3s ease-in-out",
      },
    },
    keyframes: {
      opacity: {
        "0%": {
          opacity: "0",
        },
        "100%": {
          opacity: "100",
        },
      },
    },
  },
  plugins: [],
};
