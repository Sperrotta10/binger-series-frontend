/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121317',
        surface: '#121317',
        'surface-dim': '#121317',
        'surface-bright': '#38393e',
        'surface-container-lowest': '#0d0e12',
        'surface-container-low': '#1a1b20',
        'surface-container': '#1f1f24',
        'surface-container-high': '#292a2e',
        'surface-container-highest': '#343439',
        primary: '#dcb8ff',
        'primary-container': '#8a2be2',
        secondary: '#ffffff',
        'secondary-fixed': '#00fbfb',
        tertiary: '#bec7d6',
        error: '#ffb4ab',
        'error-container': '#93000a'
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        hanken: ['"Hanken Grotesk"', 'sans-serif']
      },
      borderRadius: {
        md: '4px'
      }
    },
  },
  plugins: [],
}