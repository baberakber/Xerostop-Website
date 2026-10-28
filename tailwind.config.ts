import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  // `.container` is defined in globals.css so content keeps side margins on wide screens
  corePlugins: { container: false },
  theme: {
    extend: {
      colors: {
        // Theme colors are RGB channel variables so opacity modifiers (e.g. /10) work
        background: {
          DEFAULT: 'rgb(var(--bg-primary-rgb) / <alpha-value>)',
          primary: 'rgb(var(--bg-primary-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary-rgb) / <alpha-value>)',
          card: 'rgb(var(--bg-card-rgb) / <alpha-value>)',
          elevated: 'rgb(var(--bg-elevated-rgb) / <alpha-value>)',
        },
        accent: {
          primary: 'rgb(var(--accent-primary-rgb) / <alpha-value>)',
          'primary-hover': 'rgb(var(--accent-primary-hover-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--accent-secondary-rgb) / <alpha-value>)',
          'secondary-hover': 'rgb(var(--accent-secondary-hover-rgb) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
          muted: 'rgb(var(--text-muted-rgb) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border-default-rgb) / <alpha-value>)',
          hover: 'rgb(var(--border-hover-rgb) / <alpha-value>)',
        },
        // shadcn-style aliases used by older components, mapped onto the theme
        foreground: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--text-muted-rgb) / <alpha-value>)',
        muted: 'rgb(var(--bg-elevated-rgb) / <alpha-value>)',
        card: {
          DEFAULT: 'rgb(var(--bg-card-rgb) / <alpha-value>)',
          hover: 'rgb(var(--bg-elevated-rgb) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--accent-primary-rgb) / <alpha-value>)',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'rgb(var(--accent-secondary-rgb) / <alpha-value>)',
          foreground: '#ffffff',
        },
        // Brand navy (fixed across themes)
        navy: {
          DEFAULT: '#0B1F3A',
          800: '#132B4F',
          700: '#1B3A66',
          900: '#07111F',
        },
        brand: {
          blue: '#1E88E5',
          sky: '#42A5F5',
          deep: '#1565C0',
        },
      },
      // Text in the accent color uses a contrast-safe shade; backgrounds keep the brand blue.
      textColor: {
        accent: {
          primary: 'rgb(var(--accent-text-rgb) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--accent-text-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
        brand: ['Orbitron', 'Eurostile', '"Arial Black"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee 40s linear infinite reverse',
        'spin-slow': 'spin 18s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'menu-in': 'menuIn 0.18s ease-out',
        'fade-in-fast': 'fadeIn 0.15s ease-out',
        'panel-in': 'panelIn 0.3s ease-out',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'dash': 'dash 6s linear infinite',
      },
      keyframes: {
        menuIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        panelIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.7' },
        },
        dash: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-160' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(30, 136, 229, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(30, 136, 229, 0.8)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(30, 136, 229, 0.3)',
        'glow-md': '0 0 20px rgba(30, 136, 229, 0.4)',
        'glow-lg': '0 0 30px rgba(30, 136, 229, 0.5)',
      },
    },
  },
  plugins: [],
}

export default config
