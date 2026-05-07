/**
 * Vialink — Color Tokens
 *
 * Fuente única de verdad para colores en toda la app.
 * Estos tokens se importan tanto en componentes (vía useTheme) como en tailwind.config.js.
 *
 * Reglas de uso:
 * - Brand color: solo en CTAs, ETAs y route lines. NUNCA como background completo.
 * - Accent (#FF6B35): reservado para alertas no destructivas y casos urgentes.
 * - Semantic colors (success/warning/danger): solo para estados específicos.
 */

export const palette = {
  // Brand
  brand: {
    light: '#1E5EFF',     // Azul Vialink principal
    dark: '#4F8BFF',      // Versión más clara para dark mode (mejor contraste)
    pressed: '#002C8A',   // Estado pressed
  },

  // Accent (raro)
  accent: '#FF6B35',

  // Semantic
  success: '#00875A',
  warning: '#C77700',
  danger: '#DA1E28',

  // Neutrals - light mode
  light: {
    base: '#FFFFFF',           // Surface base
    raised: '#F7F8FA',         // Surface raised (cards, sheets)
    elevated: '#EEF1F6',       // Surface elevated (íconos circulares)
    text: {
      primary: '#0A0A0A',      // Texto principal
      secondary: '#595959',    // Texto secundario
      tertiary: '#8E8E93',     // Texto terciario / placeholder
    },
    separator: '#E5E5EA',
    map: {
      roads: '#D1D1D6',
      water: '#C8E0F4',
      parks: '#D5E8D4',
    },
  },

  // Neutrals - dark mode
  dark: {
    base: '#000000',
    raised: '#1C1C1E',
    elevated: '#2C2C2E',
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(235, 235, 245, 0.60)',
      tertiary: 'rgba(235, 235, 245, 0.30)',
    },
    separator: 'rgba(84, 84, 88, 0.65)',
    map: {
      roads: '#3A3A3C',
      water: '#1A2D3F',
      parks: '#1F2E1F',
    },
  },
} as const;

/**
 * Color tokens semánticos por modo.
 * Esta es la API que usan los componentes vía useTheme().
 */
export const colors = {
  light: {
    // Brand
    brand: palette.brand.light,
    brandPressed: palette.brand.pressed,
    accent: palette.accent,

    // Semantic
    success: palette.success,
    warning: palette.warning,
    danger: palette.danger,

    // Surfaces
    surfaceBase: palette.light.base,
    surfaceRaised: palette.light.raised,
    surfaceElevated: palette.light.elevated,

    // Text
    textPrimary: palette.light.text.primary,
    textSecondary: palette.light.text.secondary,
    textTertiary: palette.light.text.tertiary,

    // Other
    separator: palette.light.separator,
    overlay: 'rgba(0, 0, 0, 0.30)',     // Para backdrops de modales

    // Map
    mapRoads: palette.light.map.roads,
    mapWater: palette.light.map.water,
    mapParks: palette.light.map.parks,
  },
  dark: {
    // Brand
    brand: palette.brand.dark,
    brandPressed: palette.brand.pressed,
    accent: palette.accent,

    // Semantic
    success: palette.success,
    warning: palette.warning,
    danger: palette.danger,

    // Surfaces
    surfaceBase: palette.dark.base,
    surfaceRaised: palette.dark.raised,
    surfaceElevated: palette.dark.elevated,

    // Text
    textPrimary: palette.dark.text.primary,
    textSecondary: palette.dark.text.secondary,
    textTertiary: palette.dark.text.tertiary,

    // Other
    separator: palette.dark.separator,
    overlay: 'rgba(255, 255, 255, 0.08)',

    // Map
    mapRoads: palette.dark.map.roads,
    mapWater: palette.dark.map.water,
    mapParks: palette.dark.map.parks,
  },
} as const;

export type ColorMode = 'light' | 'dark';
export type ColorTokens = typeof colors.light;
