import { Pressable, Text, View } from 'react-native';
import { IconCircle, spacing, typography, useTheme } from '@/shared';

interface NearbyStopRowProps {
  title: string;
  meta: string;
  eta: string;
  estimated?: boolean;
  onPress?: () => void;
}

// US-007 · Fila "Cerca de ti" del bottom sheet del mapa.
// Spec PDF: altura 80pt · padding lateral 20pt · ícono 22pt brand sobre
// surface elevated 40pt · separador a 72pt del borde izq.
export function NearbyStopRow({ title, meta, eta, estimated, onPress }: NearbyStopRowProps) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingHorizontal: spacing.xl,
        height: 80,
      }}
    >
      <IconCircle icon="bus" size="md" tone="brand" background="elevated" />
      <View style={{ flex: 1 }}>
        <Text style={[typography.headline, { color: theme.colors.textPrimary }]}>
          {title}
        </Text>
        <Text style={[typography.subhead, { color: theme.colors.textSecondary }]}>
          {meta}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text
          style={[
            typography.title2,
            { color: theme.colors.brand, fontVariant: ['tabular-nums'] },
          ]}
        >
          {eta}
        </Text>
        {estimated && (
          <Text style={[typography.caption1, { color: theme.colors.textTertiary }]}>
            est.
          </Text>
        )}
      </View>
    </Pressable>
  );
}
