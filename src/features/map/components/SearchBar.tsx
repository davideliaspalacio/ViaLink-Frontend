import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { radius, spacing, typography, useTheme } from '@/shared';

interface SearchBarProps {
  onPress?: () => void;
  onPressAvatar?: () => void;
}

// US-007 · Search bar flotante del mapa raíz.
// Spec PDF: height 44pt, márgenes 16pt, top 64pt desde safe area,
// gap interno 8pt entre input y avatar. Touch target del avatar 44pt.
export function SearchBar({ onPress, onPressAvatar }: SearchBarProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          flex: 1,
          height: 44,
          borderRadius: radius.full,
          backgroundColor: theme.colors.surfaceBase,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing.lg,
          gap: spacing.sm,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Ionicons name="search" size={17} color={theme.colors.textSecondary} />
        <Text style={[typography.body, { color: theme.colors.textTertiary, flex: 1 }]}>
          ¿A dónde vas?
        </Text>
      </Pressable>
      <Pressable
        onPress={onPressAvatar}
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: theme.colors.surfaceBase,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Ionicons name="person-circle" size={32} color={theme.colors.textSecondary} />
      </Pressable>
    </View>
  );
}
