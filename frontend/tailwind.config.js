/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f1f8f2',   /* soft pistachio tint */
          100: '#e4f0e6',   /* gentle sage */
          200: '#cde3d1',   /* light mint */
          300: '#a8cfae',
          400: '#7ab383',
          500: '#5a9464',
          600: '#3d6e45',
          700: '#2d5434',
          800: '#1e3b24',
          900: '#0f2215',
          950: '#061209',
        },
        accent: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        dark: {
          bg:      '#0d1117',
          surface: '#161b22',
          card:    '#1c2330',
          border:  '#30363d',
          muted:   '#8b949e',
        }
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.5s ease-in-out infinite',
        'fade-in':    'fade-in 0.4s ease-out',
        'slide-up':   'slide-up 0.4s ease-out forwards',
        'slide-up-delayed': 'slide-up 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(22, 163, 74, 0.4)' },
          '50%':       { boxShadow: '0 0 0 12px rgba(22, 163, 74, 0)' },
        },
        'fade-in': {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        'slide-up': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
