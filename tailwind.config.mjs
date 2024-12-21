/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.astro', './src/**/**/*.astro'],
  theme: {
    extend: {
      colors: {
        blueBlack: '#0a0b12',
      },
    },
  },
  plugins: [],
};
