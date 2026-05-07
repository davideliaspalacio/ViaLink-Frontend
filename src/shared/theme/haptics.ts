/**
 * Vialink — Haptics Tokens
 *
 * Wrapper de expo-haptics con tipos semánticos del design system.
 * Centraliza el feedback háptico para que sea consistente en toda la app.
 *
 * Uso: import { haptics } from '@/theme'
 *      haptics.light()  // En botones secundarios
 *      haptics.medium() // En CTAs primarios
 *      haptics.success() // Al confirmar acciones positivas
 */

import * as Haptics from 'expo-haptics';

export const haptics = {
  // Selection (cambios de tab, segmented control, opciones)
  selection: () => {
    Haptics.selectionAsync();
  },

  // Light impact (taps en cards, botones secundarios)
  light: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },

  // Medium impact (CTAs primarios, acciones importantes)
  medium: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },

  // Heavy impact (errores graves, acciones destructivas)
  heavy: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },

  // Notification success (confirmaciones positivas)
  success: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },

  // Notification warning (alertas, advertencias)
  warning: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  },

  // Notification error (errores que requieren atención)
  error: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },
} as const;

/**
 * Mapping semántico para casos específicos del producto.
 * Si en el futuro Apple cambia los patrones, solo se actualiza acá.
 */
export const productHaptics = {
  // Tab bar
  tabSwitch: haptics.selection,

  // Botones
  buttonPress: haptics.light,
  primaryAction: haptics.medium,
  destructiveAction: haptics.warning,

  // Bottom sheet
  detentChange: haptics.light,

  // Selecciones en listas
  itemSelect: haptics.selection,

  // Bookmarks / favoritos
  bookmarkToggle: haptics.light,

  // Reportes / Compartir
  reportConfirm: haptics.success,
  shareLink: haptics.light,

  // Viaje activo
  busApproaching: haptics.warning,    // 2 paraderos antes de bajar
  busArrived: haptics.success,         // Llegada al destino
  busDelay: haptics.warning,           // Retraso significativo

  // Ratings
  starTap: haptics.selection,
  ratingSubmit: haptics.success,

  // Errores
  loadError: haptics.warning,
  criticalError: haptics.error,
} as const;
