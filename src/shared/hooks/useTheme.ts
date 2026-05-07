/**
 * Vialink — useTheme
 *
 * Hook principal para acceder al tema actual desde cualquier componente.
 * Devuelve los tokens de color del modo activo (light o dark).
 *
 * Uso:
 *   const theme = useTheme();
 *   <View style={{ backgroundColor: theme.colors.surfaceBase }}>
 *     <Text style={{ color: theme.colors.textPrimary }}>...</Text>
 *   </View>
 *
 * También expone el modo actual:
 *   const { colors, mode, isDark } = useTheme();
 */

import { useMemo } from 'react';
import { colors, type ColorMode, type ColorTokens } from '../theme';
import { useColorScheme } from './useColorScheme';

interface ThemeValue {
  colors: ColorTokens;
  mode: ColorMode;
  isDark: boolean;
  isLight: boolean;
}

export function useTheme(): ThemeValue {
  const mode = useColorScheme();

  return useMemo(
    () => ({
      colors: colors[mode] as ColorTokens,
      mode,
      isDark: mode === 'dark',
      isLight: mode === 'light',
    }),
    [mode]
  );
}
