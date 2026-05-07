/**
 * Vialink — Spacing Tokens
 *
 * Escala de spacing en incrementos de 4pt — la base del design system.
 * Todos los paddings, margins y gaps deben usar estos tokens, no valores arbitrarios.
 */

export const spacing = {
  // Base de 4pt
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
  giant: 64,
} as const;

/**
 * Atajos numéricos (más comunes en código RN).
 * Usa estos cuando estés trabajando con valores específicos.
 */
export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

/**
 * Border radius tokens.
 * iOS HIG usa entre 8-13pt para cards, 16pt para sheets, 22pt para modales grandes.
 */
export const radius = {
  none: 0,
  xs: 4,        // Lines, skeletons
  sm: 8,        // Buttons pequeños
  md: 12,       // Buttons primarios, cards pequeñas
  lg: 14,       // Cards medianas
  xl: 16,       // Cards grandes, bottom sheets
  xxl: 18,      // Modales centrados
  full: 9999,   // Pills, capsules
} as const;

/**
 * Common dimensions del sistema iOS.
 */
export const sizes = {
  // Heights estándar
  buttonPrimary: 50,
  buttonSecondary: 44,
  buttonSmall: 36,
  cellOneLine: 44,
  cellTwoLine: 60,
  cellRich: 80,        // Stop rows, route rows
  searchBar: 44,
  navBar: 44,

  // Hit targets
  minHitTarget: 44,    // iOS HIG mínimo

  // Iconos
  iconXs: 12,
  iconSm: 14,
  iconMd: 18,
  iconLg: 22,
  iconXl: 24,
  iconXxl: 32,
  iconHero: 56,
  iconHuge: 64,

  // Avatares
  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 56,
  avatarXl: 80,

  // Bus pill
  busPillSm: { width: 32, height: 20 },   // En el mapa
  busPillLg: { width: 48, height: 26 },   // En listas
  busPillXl: { width: 50, height: 24 },   // En nav bars

  // Bottom sheet handle
  sheetHandle: { width: 36, height: 5 },

  // Tab bar
  tabBarHeight: 49,
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type SizeToken = keyof typeof sizes;
