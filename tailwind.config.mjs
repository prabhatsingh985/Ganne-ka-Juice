/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cane: {
          DEFAULT: '#5B8C3A',
          light: '#76B34A',
          dark: '#3E6126',
          darker: '#294318',
        },
        juice: {
          DEFAULT: '#E8B923',
          light: '#F5CE42',
          glow: '#FFE26A',
          dark: '#C4940C',
        },
        rust: {
          DEFAULT: '#7A4B2A',
          light: '#9E6237',
          dark: '#54321A',
          border: '#452610',
        },
        cream: {
          DEFAULT: '#FDF6E3',
          light: '#FFFCF4',
          dark: '#F3E9CD',
        },
        kesar: {
          DEFAULT: '#FF9933',
          light: '#FFB866',
          dark: '#CC6A00',
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', 'Fredoka', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'desi': '4px 4px 0px #7A4B2A',
        'desi-lg': '6px 6px 0px #54321A',
        'desi-sm': '2px 2px 0px #7A4B2A',
        'desi-pressed': '1px 1px 0px #7A4B2A',
        'inner-glass': 'inset 0 2px 6px rgba(255,255,255,0.6), inset 0 -4px 8px rgba(0,0,0,0.15)',
      },
      animation: {
        'drip': 'dripDrop 0.8s ease-in infinite',
        'float-slow': 'float 3s ease-in-out infinite',
        'spin-wheel': 'spin 2s linear infinite',
        'bob': 'bob 1.5s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        dripDrop: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '1' },
          '80%': { transform: 'translateY(80px) scale(1)', opacity: '0.9' },
          '100%': { transform: 'translateY(90px) scale(0.2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(3deg)' },
        },
        bob: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.95' },
        },
      },
    },
  },
  plugins: [],
};
