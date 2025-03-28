/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.astro', './src/**/**/*.astro'],
  theme: {
    extend: {
      colors: {
        background: '#0D1117',
        header: '#1f3137',
        foreground: '#cfcfd1',
      },
    },
  },
  plugins: [],
};
