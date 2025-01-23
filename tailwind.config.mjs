/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.astro', './src/**/**/*.astro'],
  theme: {
    extend: {
      colors: {
        background: '#12262e',
        header: '#1f3137',
        foreground: '#f4f5f5',
      },
    },
  },
  plugins: [],
};
