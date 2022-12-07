/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './dist/popup.html'],
  // content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
