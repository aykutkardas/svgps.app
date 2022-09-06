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
        "drag-outline":
          "drag-outline-dance 0.15s linear infinite, drag-outline-inset 0.25s ease-in-out forwards",
      },
      keyframes: {
        "drag-outline-dance": {
          to: {
            "background-position":
              "left var(--w) top, right var(--w) bottom, left bottom var(--w), right top var(--w)",
          },
        },
        "drag-outline-inset": {
          to: {
            left: "12px",
            right: "12px",
            top: "12px",
            bottom: "12px",
          },
        },
      },
      gridTemplateRows: {
        'list-preview': 'repeat(8, minmax(0, 0.4fr))',
        'list-preview-sm': 'repeat(7, minmax(0, 0.4fr))',
        'list-preview-md': 'repeat(6, minmax(0, 0.4fr))',
        'list-preview-lg': 'repeat(5, minmax(0, 0.4fr))',
        'list-preview-xl': 'repeat(5, minmax(0, 0.4fr))'
      }
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
