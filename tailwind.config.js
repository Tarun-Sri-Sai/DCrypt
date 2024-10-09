/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.625rem",
      },
    },
  },
  plugins: [],
};
