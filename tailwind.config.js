/** @type {import('tailwindcss').Config} */

/**
 * Vialink — Tailwind Config (NativeWind v4)
 *
 * Mapea los design tokens de /theme a clases utility de Tailwind.
 * IMPORTANTE: este archivo NO duplica los valores. Si un valor cambia, se cambia
 * en /theme/colors.ts (para JS) y aquí (para clases utility).
 *
 * NOTA: NativeWind v4 NO soporta importar desde TS directamente, por eso los
 * valores están duplicados como literales. Cuando agregues colores nuevos,
 * actualiza ambos archivos.
 */

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Brand
        brand: {
          DEFAULT: '#1E5EFF',
          dark: '#4F8BFF',
          pressed: '#002C8A',
        },
        accent: '#FF6B35',
        success: '#00875A',
        warning: '#C77700',
        danger: '#DA1E28',

        // Light surfaces
        'surface-base': '#FFFFFF',
        'surface-raised': '#F7F8FA',
        'surface-elevated': '#EEF1F6',

        // Light text
        'text-primary': '#0A0A0A',
        'text-secondary': '#595959',
        'text-tertiary': '#8E8E93',

        // Light other
        separator: '#E5E5EA',

        // Dark surfaces
        'surface-base-dark': '#000000',
        'surface-raised-dark': '#1C1C1E',
        'surface-elevated-dark': '#2C2C2E',

        // Dark text
        'text-primary-dark': '#FFFFFF',
        'text-secondary-dark': 'rgba(235, 235, 245, 0.60)',
        'text-tertiary-dark': 'rgba(235, 235, 245, 0.30)',

        // Dark other
        'separator-dark': 'rgba(84, 84, 88, 0.65)',
      },
      spacing: {
        // Escala 4pt
        0.5: '2px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
      },
      borderRadius: {
        none: '0',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '14px',
        xl: '16px',
        '2xl': '18px',
        full: '9999px',
      },
      fontSize: {
        // Type scale iOS
        'large-title': ['34px', { lineHeight: '41px', letterSpacing: '0.37px' }],
        'title-1': ['28px', { lineHeight: '34px', letterSpacing: '0.36px' }],
        'title-2': ['22px', { lineHeight: '28px', letterSpacing: '0.35px' }],
        'title-3': ['20px', { lineHeight: '25px', letterSpacing: '0.38px' }],
        headline: ['17px', { lineHeight: '22px', letterSpacing: '-0.41px' }],
        body: ['17px', { lineHeight: '22px', letterSpacing: '-0.41px' }],
        callout: ['16px', { lineHeight: '21px', letterSpacing: '-0.32px' }],
        subhead: ['15px', { lineHeight: '20px', letterSpacing: '-0.24px' }],
        footnote: ['13px', { lineHeight: '18px', letterSpacing: '-0.08px' }],
        'caption-1': ['12px', { lineHeight: '16px', letterSpacing: '0' }],
        'caption-2': ['11px', { lineHeight: '13px', letterSpacing: '0.07px' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
};
