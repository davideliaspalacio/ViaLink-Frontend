/**
 * Vialink — BusPill
 *
 * La pill de identificación de ruta de bus.
 * Aparece en mapas, listas, nav bars, search results — uno de los componentes
 * más reutilizados del producto.
 *
 * Tres tamaños:
 *   - sm (32×20pt): para markers en el mapa
 *   - md (48×26pt): para listas y filas de paraderos
 *   - lg (50×24pt): para nav bars y headers
 *
 * Uso:
 *   <BusPill code="C12" />            // default md
 *   <BusPill code="C12" size="sm" />  // mapa
 *   <BusPill code="C12" size="lg" />  // nav bar
 */

import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { typography } from '../theme';

type BusPillSize = 'sm' | 'md' | 'lg';

interface BusPillProps {
  code: string;
  size?: BusPillSize;
  style?: ViewStyle;
}

const sizeConfig: Record<BusPillSize, {
  width: number;
  height: number;
  fontSize: number;
  fontWeight: '600' | '700';
  borderRadius: number;
  borderWidth: number;
}> = {
  sm: {
    width: 32,
    height: 20,
    fontSize: 11,
    fontWeight: '600',
    borderRadius: 6,
    borderWidth: 1,
  },
  md: {
    width: 48,
    height: 26,
    fontSize: 13,
    fontWeight: '700',
    borderRadius: 8,
    borderWidth: 0,
  },
  lg: {
    width: 50,
    height: 24,
    fontSize: 13,
    fontWeight: '600',
    borderRadius: 8,
    borderWidth: 0,
  },
};

export function BusPill({ code, size = 'md', style }: BusPillProps) {
  const theme = useTheme();
  const config = sizeConfig[size];

  return (
    <View
      style={[
        {
          width: config.width,
          height: config.height,
          borderRadius: config.borderRadius,
          backgroundColor: theme.colors.brand,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: config.borderWidth,
          // Solo en sm se aplica borde blanco para legibilidad sobre el mapa
          borderColor: size === 'sm' ? '#FFFFFF' : 'transparent',
        },
        style,
      ]}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: config.fontSize,
          fontWeight: config.fontWeight,
          fontFamily: typography.body.fontFamily,
          letterSpacing: -0.2,
        }}
        numberOfLines={1}
      >
        {code}
      </Text>
    </View>
  );
}
