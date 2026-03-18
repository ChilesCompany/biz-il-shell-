/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        orange:      { DEFAULT: '#E05C2A', dark: '#C04A1A', light: '#F07A4A' },
        navy:        { DEFAULT: '#1A1A2E', mid: '#252545', light: '#32325A' },
        gold:        { DEFAULT: '#C9963A', light: '#E8B85A' },
        surface:     { DEFAULT: '#FFFFFF', 2: '#F8F7F5', 3: '#F0EEE9' },
        border:      { DEFAULT: '#E2DDD6', strong: '#C8C0B4' },
        ink:         { DEFAULT: '#1A1A2E', 2: '#4A4860', 3: '#8A88A0', 4: '#B8B6CC' },
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(26,26,46,0.06), 0 4px 16px rgba(26,26,46,0.04)',
        'card-lg': '0 4px 24px rgba(26,26,46,0.10)',
        'orange':  '0 4px 16px rgba(224,92,42,0.25)',
      },
    },
  },
  plugins: [],
}
