/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary colors - Gold theme
        primary: {
          50: '#FFF9E6',
          100: '#FFF0BF',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFCC33',
          500: '#FFB800', // Main gold
          600: '#CC9300',
          700: '#996E00',
          800: '#664A00',
          900: '#332500',
        },
        // Secondary colors - Dark theme
        secondary: {
          50: '#E8E8ED',
          100: '#C4C4D1',
          200: '#9D9DB5',
          300: '#767699',
          400: '#58587D',
          500: '#3A3A61',
          600: '#2D2D4A',
          700: '#1F1F33',
          800: '#16162B',
          900: '#0D0D1A',
        },
        // Background colors
        background: {
          dark: '#0D0D1A',
          card: '#1A1A2E',
          elevated: '#252542',
        },
        // Accent colors
        accent: {
          success: '#4CAF50',
          warning: '#FF9800',
          error: '#F44336',
          info: '#2196F3',
        },
        // Text colors
        text: {
          primary: '#FFFFFF',
          secondary: '#B0B0C0',
          muted: '#6B6B80',
          gold: '#FFB800',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      spacing: {
        '18': '72px',
        '88': '352px',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(255, 184, 0, 0.25)',
        'card': '0 4px 20px 0 rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
