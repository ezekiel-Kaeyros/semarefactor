import { transform } from 'framer-motion';
import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        dark: '#141719',
        white: '#ffffff',
        mainDark: '#212529',
        mainDarkLight: '#2B2E31',
        mainWhite: '#ffffff',
        primary: '#0094D9',
        danger: 'red',
        success: 'red',
        warning: 'red',
        darkText: '#656B9F',
        grayText: '#C3C7CB',
        blueLine: '#2B45D8',
        'blue-message-primary': '#576CE0',
        'error-default-light': '#FF385D',
        'green-emerald': '#1CA655',
        'blue-secondary': '#2196F3',
        dangerDelete: '#B00020',
        textLigthGray: '#CFD4D8',
      },
      animation: {
        pulse: 'bounce 20s infinite',
      },
      keyframes: {
        bounce: {
          '0%': {
            transform: 'scale(1)',
          },
          '20%': {
            transform: 'scale(1.2)',
          },
          '40%': {
            transform: 'scale(1.4)',
          },
          '60%': {
            transform: 'scale(1.2)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      height: {
        'screen-minus-80': 'calc(100vh - 80px)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities);
    },
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            primary: '#0094D9',
          },
        },
        dark: {
          // ...
          colors: {
            primary: '#0094D9',
          },
        },
        // ... custom themes
      },
    }),
  ],
};
export default config;
