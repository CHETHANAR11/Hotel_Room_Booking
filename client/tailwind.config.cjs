/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#331D2C',
        secondary:'#3F2E3E',
        third:'#A78295',
        four:'#EFE1D1',
        pur:'#ACBCFF',
        blue:'#AEE2FF',
        hpur:'#B799FF',
        lp:'#E0C9D8',
      }
    },
  },
  plugins: [],
}