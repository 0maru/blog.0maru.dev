/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.astro', './src/**/**/*.astro'],
  theme: {
    extend: {
      colors: {
        background: '#0c1417',
        header: '#1f3037',
        text: '#d2d6d7',
      },
    },
  },
  plugins: [],
};
