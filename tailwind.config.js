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
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      colors: {
        brand: {
          50: '#f3f7f4',
          100: '#e0ebe3',
          200: '#c2d7c8',
          300: '#96b8a0',
          400: '#6b9478',
          500: '#4a7a5a',
          600: '#3a6348',
          700: '#2d5a3d',
          800: '#264a33',
          900: '#1e3d2a',
        },
        sand: {
          50: '#fdfcfa',
          100: '#f7f4ef',
          200: '#ede8df',
          300: '#ddd5c7',
          400: '#c4b8a5',
          500: '#a99c88',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#4a4a4a',
          muted: '#8a8a8a',
          faint: '#c5c5c5',
        },
        error: {
          DEFAULT: '#9b4d4d',
          light: '#f0e6e6',
          dark: '#7a3535',
        },
        warning: {
          DEFAULT: '#8b7355',
          light: '#f5f0e8',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Sarabun', 'sans-serif'],
        serif: ['var(--font-serif)', 'Noto Serif Thai', 'serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        'heading': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        'subheading': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '400' }],
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};
