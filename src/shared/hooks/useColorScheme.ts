/**
 * Vialink — useColorScheme
 *
 * Wrapper de useColorScheme de RN con soporte de override manual
 * (para que el usuario pueda forzar light/dark/auto desde Settings).
 *
 * Por ahora usa el del sistema directamente. Cuando agreguemos la pantalla
 * de Settings (US-023), conectamos la persistencia con MMKV.
 */

import { Platform, useColorScheme as useRNColorScheme } from 'react-native';
import type { ColorMode } from '../theme';

export function useColorScheme(): ColorMode {
  const systemScheme = useRNColorScheme();
  // En web siempre forzamos light mientras no haya preferencia guardada del
  // usuario (US-023). El frame del iPhone se ve mejor en claro sobre el
  // backdrop oscuro y evita parpadeos de modo.
  if (Platform.OS === 'web') return 'light';
  // TODO: cuando exista preferencia guardada del usuario, leerla acá
  // const userPreference = useUserPreferences().colorMode;
  // if (userPreference !== 'auto') return userPreference;
  return (systemScheme ?? 'light') as ColorMode;
}
