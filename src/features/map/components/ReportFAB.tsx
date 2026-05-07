import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { spacing, useTheme } from '@/shared';

// US-019 · FAB Reportar incidencia.
// Posición: bottom-right del mapa, sobre el sheet (sigue al sheet con margen).
// 56pt brand · sombra y=4 blur=12 op0.15 · ícono exclamationmark.bubble 22pt.

interface ReportFABProps {
  bottom?: number;
}

export function ReportFAB({ bottom = 16 }: ReportFABProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        bottom,
        right: spacing.lg,
        zIndex: 10,
      }}
    >
      <Pressable onPress={() => router.push('/report')}>
        {({ pressed }) => (
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: theme.colors.brand,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.92 : 1 }],
            }}
          >
            <Ionicons name="chatbubble-ellipses" size={22} color="#FFFFFF" />
          </View>
        )}
      </Pressable>
    </View>
  );
}
