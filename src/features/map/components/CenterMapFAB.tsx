import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing, useTheme } from '@/shared';

// US-008 · FAB Centrar mapa.
// 3 estados (+ B transicional):
//   A · No centrado: location outline 18pt brand, sin halo
//   C · Centrado siguiendo: location.fill brand + halo pulsante
//   D · Compass mode: location.north.line.fill, sin halo (mapa rota)
// 44pt circular, bottom-right del mapa.
// TODO: integrar con react-native-maps cuando exista (centrar+seguir+compass).

type MapState = 'no_centrado' | 'centrado' | 'compass';

interface CenterMapFABProps {
  bottom?: number;
}

export function CenterMapFAB({ bottom = 16 }: CenterMapFABProps) {
  const theme = useTheme();
  const [state, setState] = useState<MapState>('no_centrado');

  const advance = () => {
    setState((s) =>
      s === 'no_centrado' ? 'centrado' : s === 'centrado' ? 'compass' : 'no_centrado',
    );
  };

  const icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap =
    state === 'no_centrado'
      ? 'navigate-outline'
      : state === 'centrado'
        ? 'navigate'
        : 'navigate-circle';

  return (
    <View
      style={{
        position: 'absolute',
        bottom,
        right: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      {state === 'centrado' && (
        <View
          style={{
            position: 'absolute',
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: `${theme.colors.brand}33`,
          }}
        />
      )}
      <Pressable onPress={advance}>
        {({ pressed }) => (
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: theme.colors.surfaceBase,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.92 : 1 }],
            }}
          >
            <Ionicons
              name={icon}
              size={18}
              color={theme.colors.brand}
            />
          </View>
        )}
      </Pressable>
    </View>
  );
}
