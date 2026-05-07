/**
 * Vialink — Animation Tokens
 *
 * Durations, easings y springs del design system.
 * Diseñados para Reanimated 3 + Moti.
 */

import { Easing } from 'react-native-reanimated';

/**
 * Durations en milisegundos.
 * Valores tomados de las specs del canvas.
 */
export const durations = {
  instant: 80,        // Tap feedback
  fast: 100,          // Pressed states
  quick: 120,         // Cells pressed
  normal: 200,        // Fade outs, color transitions
  smooth: 280,        // Most UI transitions
  comfortable: 320,   // Sheet animations, layout changes
  slow: 400,          // Map zooms, large layout shifts
  dramatic: 600,      // Loading transitions, count animations
  ambient: 1400,      // Skeleton shimmer
  pulse: 1600,        // Halo pulses
  breathe: 1800,      // FAB pulses, marker pulses
  reveal: 2400,       // Sparkles ambient pulse
} as const;

/**
 * Easings curves.
 * Usar Reanimated.Easing por compatibilidad con worklets.
 */
export const easings = {
  // Estándar iOS
  easeOut: Easing.bezier(0.25, 0.1, 0.25, 1),
  easeIn: Easing.bezier(0.42, 0, 1, 1),
  easeInOut: Easing.bezier(0.42, 0, 0.58, 1),

  // Aceleración natural (entradas)
  decelerate: Easing.bezier(0.0, 0.0, 0.2, 1),

  // Salidas anticipadas
  accelerate: Easing.bezier(0.4, 0.0, 1, 1),
} as const;

/**
 * Spring configurations.
 * Calibradas para iOS feel — no muy rebotonas, naturales.
 */
export const springs = {
  // Default (la mayoría de movimientos)
  default: {
    damping: 18,
    stiffness: 180,
    mass: 1,
  },

  // Soft (sheets, layout shifts grandes)
  soft: {
    damping: 20,
    stiffness: 120,
    mass: 1,
  },

  // Snappy (botones, micro-interactions)
  snappy: {
    damping: 14,
    stiffness: 250,
    mass: 0.8,
  },

  // Bouncy (celebrations, stars rating)
  bouncy: {
    damping: 8,
    stiffness: 180,
    mass: 0.8,
  },

  // Sheet detent transitions
  sheet: {
    damping: 17,
    stiffness: 145,
    mass: 1,
  },
} as const;

/**
 * Presets de animación reutilizables.
 * Usados con Moti o como configs en Reanimated.
 */
export const animationPresets = {
  // Entrada de modal sheet (desde abajo)
  sheetEntry: {
    duration: 450,
    type: 'spring' as const,
    damping: 17,
    stiffness: 145,
    mass: 1,
  },

  // Card pressed
  cardPressed: {
    scale: 0.98,
    opacity: 0.9,
    duration: 120,
  },

  // Botón pressed
  buttonPressed: {
    scale: 0.96,
    opacity: 0.9,
    duration: 100,
  },

  // FAB pressed
  fabPressed: {
    scale: 0.92,
    opacity: 0.85,
    duration: 100,
  },

  // Stagger fade-in (listas)
  staggerFadeIn: {
    initial: { opacity: 0, translateY: 8 },
    animate: { opacity: 1, translateY: 0 },
    transition: {
      type: 'timing' as const,
      duration: 280,
    },
    staggerDelay: 60,
  },

  // Halo pulse (FAB centrado, marcadores en mapa)
  haloPulse: {
    opacity: [0, 0.3, 0],
    scale: [1, 1.4, 1],
    duration: 1800,
    loop: true,
  },

  // Skeleton shimmer
  shimmer: {
    duration: 1400,
    loop: true,
  },
} as const;

export type DurationToken = keyof typeof durations;
export type SpringToken = keyof typeof springs;
