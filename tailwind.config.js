/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#EFA3B5',
          soft: '#F8DDE3',
          blush: '#FCEEEF',
          bg: '#FFF7F8',
          bgLight: '#FFF9FA',
          accent: '#D97891',
          deep: '#A94F68',
          dark: '#2B2325',
          muted: '#75676B',
          border: '#F0E2E5',
          white: '#FFFFFF',
          success: '#4FA87A',
          warning: '#F4A261',
          error: '#D95D69',
          maybe: '#8E7DBE',
          checkedIn: '#3B82F6',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'DEFAULT': '12px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(43, 35, 37, 0.04)',
        'card': '0 4px 20px rgba(239, 163, 181, 0.10), 0 1px 3px rgba(43, 35, 37, 0.03)',
        'hover': '0 8px 30px rgba(239, 163, 181, 0.18), 0 2px 6px rgba(43, 35, 37, 0.04)',
        'modal': '0 20px 60px rgba(43, 35, 37, 0.12), 0 0 1px rgba(239, 163, 181, 0.25)',
        'pinkGlow': '0 0 25px rgba(239, 163, 181, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawerIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'drawer-in': 'drawerIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
