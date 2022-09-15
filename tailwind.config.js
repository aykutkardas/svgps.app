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
      container: {
        screens: {
          xl: "1400px",
        },
        padding: "1rem",
        center: true,
      },
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
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
};
