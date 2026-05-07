/**
 * Vialink — IconCircle
 *
 * El círculo con ícono dentro que aparece en TODAS las filas de paraderos,
 * rutas, opciones de reporte, etc. Componente súper reutilizado.
 *
 * Tres tamaños:
 *   - sm (32pt): listas compactas
 *   - md (40pt): la mayoría de filas (paraderos, search results)
 *   - lg (56pt): hero icons en empty states, modal headers
 *   - xl (96pt): hero icons grandes en pantallas full-screen
 *
 * Uso:
 *   <IconCircle icon="bus" tone="brand" />
 *   <IconCircle icon="house.fill" tone="brand" size="lg" />
 *
 * NOTA: por ahora usa @expo/vector-icons (Ionicons mapped to SF Symbols).
 * Cuando estemos en producción y queramos exactitud SF Symbols, podemos
 * cambiar a un módulo nativo o usar react-native-sfsymbols.
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

type IconCircleSize = 'sm' | 'md' | 'lg' | 'xl';
type IconCircleTone = 'brand' | 'success' | 'warning' | 'danger' | 'secondary' | 'tertiary';

interface IconCircleProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: IconCircleSize;
  tone?: IconCircleTone;
  background?: 'elevated' | 'raised' | 'tinted' | 'transparent';
  style?: ViewStyle;
}

const sizeConfig: Record<IconCircleSize, { circle: number; icon: number }> = {
  sm: { circle: 32, icon: 18 },
  md: { circle: 40, icon: 22 },
  lg: { circle: 56, icon: 32 },
  xl: { circle: 96, icon: 56 },
};

export function IconCircle({
  icon,
  size = 'md',
  tone = 'brand',
  background = 'elevated',
  style,
}: IconCircleProps) {
  const theme = useTheme();
  const config = sizeConfig[size];

  const iconColor = {
    brand: theme.colors.brand,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    secondary: theme.colors.textSecondary,
    tertiary: theme.colors.textTertiary,
  }[tone];

  const backgroundColor = {
    elevated: theme.colors.surfaceElevated,
    raised: theme.colors.surfaceRaised,
    tinted: `${iconColor}1F`, // 12% opacity tint
    transparent: 'transparent',
  }[background];

  return (
    <View
      style={[
        {
          width: config.circle,
          height: config.circle,
          borderRadius: config.circle / 2,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Ionicons name={icon} size={config.icon} color={iconColor} />
    </View>
  );
}
