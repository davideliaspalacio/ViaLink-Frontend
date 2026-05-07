/**
 * Vialink — Typography Tokens
 *
 * El type scale completo de iOS, mapeado a tokens reutilizables.
 * En iOS usa SF Pro (default del sistema). En Android cae a la fuente del sistema.
 *
 * Uso: import { typography } from '@/theme'
 *      <Text style={typography.headline}>...</Text>
 */

import { Platform, TextStyle } from 'react-native';

// SF Pro en iOS, sans-serif del sistema en Android (San Francisco no tiene licencia para Android)
const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

const fontFamilyRounded = Platform.select({
  ios: 'System',  // SF Pro Rounded en iOS si quieres usar SF Pro Rounded para casos especiales
  android: 'sans-serif',
  default: 'System',
});

/**
 * Type scale completo de iOS Human Interface Guidelines.
 * Cada token tiene fontSize, fontWeight, y lineHeight calculado al ratio iOS estándar.
 */
export const typography = {
  // Large Title — usado MAX 1 vez por pantalla
  largeTitle: {
    fontFamily,
    fontSize: 34,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 41,
    letterSpacing: 0.37,
  },

  // Title 1
  title1: {
    fontFamily,
    fontSize: 28,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 34,
    letterSpacing: 0.36,
  },

  // Title 2
  title2: {
    fontFamily,
    fontSize: 22,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 28,
    letterSpacing: 0.35,
  },

  // Title 3
  title3: {
    fontFamily,
    fontSize: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 25,
    letterSpacing: 0.38,
  },

  // Headline (CTA labels, lista titles)
  headline: {
    fontFamily,
    fontSize: 17,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 22,
    letterSpacing: -0.41,
  },

  // Body (texto principal)
  body: {
    fontFamily,
    fontSize: 17,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 22,
    letterSpacing: -0.41,
  },

  // Body Semibold (énfasis dentro de body)
  bodyBold: {
    fontFamily,
    fontSize: 17,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 22,
    letterSpacing: -0.41,
  },

  // Callout
  callout: {
    fontFamily,
    fontSize: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 21,
    letterSpacing: -0.32,
  },

  // Subhead
  subhead: {
    fontFamily,
    fontSize: 15,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 20,
    letterSpacing: -0.24,
  },

  // Footnote (etiquetas, captions de info)
  footnote: {
    fontFamily,
    fontSize: 13,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 18,
    letterSpacing: -0.08,
  },

  // Footnote Semibold (section headers)
  footnoteSemibold: {
    fontFamily,
    fontSize: 13,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 18,
    letterSpacing: -0.08,
  },

  // Caption 1 (texto pequeño)
  caption1: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 16,
    letterSpacing: 0,
  },

  // Caption 1 Semibold (uppercase section labels)
  caption1Semibold: {
    fontFamily,
    fontSize: 12,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 16,
    letterSpacing: 0,
  },

  // Caption 2 (texto más pequeño aún)
  caption2: {
    fontFamily,
    fontSize: 11,
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: 13,
    letterSpacing: 0.07,
  },
} as const;

export type TypographyToken = keyof typeof typography;
