/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    fontFamily: {
      roboto: ["Roboto"],
      fira: ["Fira Code"],
    },
    extend: {},
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
