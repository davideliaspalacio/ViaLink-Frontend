import { View } from 'react-native';
import { useTheme } from '@/shared';

// Stub del mapa hasta integrar `react-native-maps`. Reproduce un grid de
// calles para que el layout (search bar + bottom sheet) tenga contexto
// visual y se pueda iterar la UI sin native build.
export function MapPlaceholder() {
  const theme = useTheme();
  const street = theme.colors.separator;

  const horizontals = [80, 200, 360, 520];
  const verticals = [60, 180, 300];

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surfaceRaised }}>
      {horizontals.map((top) => (
        <View
          key={`h-${top}`}
          style={{
            position: 'absolute',
            top,
            left: 0,
            right: 0,
            height: 12,
            backgroundColor: street,
          }}
        />
      ))}
      {verticals.map((left) => (
        <View
          key={`v-${left}`}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left,
            width: 12,
            backgroundColor: street,
          }}
        />
      ))}
    </View>
  );
}
