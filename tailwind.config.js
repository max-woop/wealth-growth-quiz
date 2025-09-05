/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'error-red': '#dc2626',
        'warning-amber': '#d97706',
        'success-green': '#059669',
      },
      fontSize: {
        'error': '12px',
      }
    },
  },
  plugins: [],
};
