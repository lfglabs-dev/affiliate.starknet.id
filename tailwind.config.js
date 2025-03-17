const { grey } = require("@mui/material/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,tsx}", "./components/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#19AA6E",
        secondary: "#402D28",
        tertiary: "#BF9E7B",
        background: "#FFF9F0",
        grey: {
          600: "#454545",
        },
      },
      fontFamily: {
        poppins: "Poppins-Regular",
      },
    },
  },
  plugins: [],
  important: true,
};
