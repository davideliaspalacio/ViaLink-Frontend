/**
 * Vialink — Theme Public API
 *
 * Punto único de import para todos los design tokens.
 *
 * Uso:
 *   import { colors, typography, spacing, haptics } from '@/theme'
 */

export { colors, palette, type ColorMode, type ColorTokens } from './colors';
export { typography, type TypographyToken } from './typography';
export {
  spacing,
  space,
  radius,
  sizes,
  type SpacingToken,
  type RadiusToken,
  type SizeToken,
} from './spacing';
export {
  durations,
  easings,
  springs,
  animationPresets,
  type DurationToken,
  type SpringToken,
} from './animations';
export { haptics, productHaptics } from './haptics';
