/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        marino: '#142D4E',
        azul: '#1E4772',
        medio: '#315F8C',
        dorado: '#C7A66A',
        papel: '#F5F7FA',
        tinta: '#0F1B2D',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
