/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Healthcare Blue Palette
        healthcare: {
          50: '#EAF4FF',
          100: '#D4E9FF',
          200: '#A9D3FF',
          300: '#7EB8FF',
          400: '#53A3FF',
          500: '#3B82F6', // Accent Blue
          600: '#2563EB',
          700: '#1E5FAF', // Secondary Blue
          800: '#1E3A8A',
          900: '#0F4C81', // Primary Blue
        },
        // Semantic colors
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Status colors
        success: '#16A34A',
        emergency: '#DC2626',
        warning: '#F97316',
        info: '#06B6D4',
      },
      fontSize: {
        // Enhanced typography scale
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '32px', fontWeight: '500' }],
        '2xl': ['24px', { lineHeight: '36px', fontWeight: '600' }],
        '3xl': ['28px', { lineHeight: '40px', fontWeight: '700' }],
        '4xl': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        '5xl': ['48px', { lineHeight: '56px', fontWeight: '700' }],
      },
      spacing: {
        // Enhanced spacing scale
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
        '5xl': '80px',
      },
      boxShadow: {
        // Premium shadows for healthcare
        'sm': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'base': '0 4px 6px -1px rgba(15, 23, 42, 0.08)',
        'md': '0 10px 15px -3px rgba(15, 23, 42, 0.10)',
        'lg': '0 20px 25px -5px rgba(15, 23, 42, 0.12)',
        'xl': '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
        'card': '0 4px 20px rgba(15, 23, 42, 0.08)',
        'hover': '0 20px 40px rgba(30, 95, 175, 0.12)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'base': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      maxWidth: {
        'container': '1400px',
        'content': '1200px',
        'narrow': '900px',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
