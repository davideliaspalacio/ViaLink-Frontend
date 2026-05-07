import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { spacing } from '../theme';
import { useTheme } from '../hooks/useTheme';

// Header reutilizable para sheets / modales presentados desde expo-router
// con headerShown=false. Coloca:
//   · un grabber 36×5pt centrado arriba (afordancia visual)
//   · un botón X circular 32pt anclado a la derecha
//
// El X corre router.back() por default; permite override con onClose.

interface SheetHeaderProps {
  onClose?: () => void;
  /** Espacio horizontal interno; default 16pt */
  horizontalPadding?: number;
}

export function SheetHeader({ onClose, horizontalPadding = 16 }: SheetHeaderProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingTop: spacing.sm,
        paddingHorizontal: horizontalPadding,
        gap: spacing.sm,
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          width: 36,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: theme.colors.textTertiary,
          opacity: 0.4,
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Pressable
          hitSlop={8}
          onPress={() => (onClose ? onClose() : router.back())}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: theme.colors.surfaceRaised,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="close" size={18} color={theme.colors.textSecondary} />
        </Pressable>
      </View>
    </View>
  );
}
