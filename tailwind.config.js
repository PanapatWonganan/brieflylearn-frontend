/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        surface: {
          50: '#fafafa',
          100: '#1a1a1a',
          200: '#141414',
          300: '#0f0f0f',
          400: '#0a0a0a',
          500: '#050505',
        },
        ink: {
          DEFAULT: '#f0f0f0',
          light: '#a3a3a3',
          muted: '#737373',
          faint: '#404040',
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#2d1515',
          dark: '#dc2626',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#2d2515',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Sarabun', 'sans-serif'],
        serif: ['var(--font-serif)', 'Noto Serif Thai', 'serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '700' }],
        'heading': ['clamp(1.75rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'subheading': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '400' }],
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};
