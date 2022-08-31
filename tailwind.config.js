/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    fontFamily: {
      roboto: ["Roboto"],
      fira: ["Fira Code"],
    },
    extend: {
      animation: {
        "drag-outline": "drag-outline 0.15s ease-in-out forwards",
      },
      keyframes: {
        "drag-outline": {
          "0%": { "outline-offset": "0px" },
          "100%": { "outline-offset": "-12px" },
        },
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
