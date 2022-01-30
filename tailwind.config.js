module.exports = {
  content: ["./src/**/*.{js,jsx,,ts,tsx}"],
  theme: {
    fontFamily: {
      base: [
        '"DM Sans"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Helvetica',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ],
    },
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
