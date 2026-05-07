import { Pressable, Text, View } from 'react-native';
import { BusPill, palette, spacing, typography, useTheme } from '@/shared';

export type RouteEtaStatus = 'normal' | 'arriving' | 'at_stop' | 'far';

export interface RouteEta {
  id: string;
  code: string;
  destination: string;
  cooperativa?: string;
  frequency?: string;
  status: RouteEtaStatus;
  etaText: string;
  nextEta?: string;
}

// US-014 · P11 · Fila de ruta del paradero.
// Spec PDF: alto 72pt · padding lateral 20pt · pill 48×26pt (md) · gap pill→texto 16pt.
// 4 estados: normal (brand title2), arriving (accent + halo), at_stop (success + dot),
// far (tertiary, sin highlight).
export function RouteRow({
  route,
  onPress,
}: {
  route: RouteEta;
  onPress?: (r: RouteEta) => void;
}) {
  const theme = useTheme();
  return (
    <Pressable onPress={() => onPress?.(route)}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.lg,
            paddingHorizontal: spacing.xl,
            height: 72,
            backgroundColor: pressed ? theme.colors.surfaceRaised : 'transparent',
          }}
        >
          <BusPill code={route.code} size="md" />
          <View style={{ flex: 1 }}>
            <Text
              style={[typography.headline, { color: theme.colors.textPrimary }]}
              numberOfLines={1}
            >
              {`→ ${route.destination}`}
            </Text>
            {(route.frequency || route.cooperativa) && (
              <Text
                style={[typography.caption1, { color: theme.colors.textTertiary }]}
                numberOfLines={1}
              >
                {[route.frequency, route.cooperativa].filter(Boolean).join(' · ')}
              </Text>
            )}
          </View>
          <EtaDisplay route={route} />
        </View>
      )}
    </Pressable>
  );
}

function EtaDisplay({ route }: { route: RouteEta }) {
  const theme = useTheme();

  if (route.status === 'far') {
    return (
      <Text style={[typography.subhead, { color: theme.colors.textTertiary }]}>
        {route.etaText}
      </Text>
    );
  }

  if (route.status === 'at_stop') {
    return (
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: theme.colors.success,
            }}
          />
          <Text style={[typography.bodyBold, { color: theme.colors.success }]}>
            {route.etaText}
          </Text>
        </View>
        {route.nextEta && (
          <Text style={[typography.caption1, { color: theme.colors.textTertiary }]}>
            {`luego ${route.nextEta}`}
          </Text>
        )}
      </View>
    );
  }

  if (route.status === 'arriving') {
    return (
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <View
          style={{
            paddingHorizontal: spacing.sm,
            paddingVertical: 2,
            borderRadius: 6,
            backgroundColor: `${palette.accent}26`,
          }}
        >
          <Text style={[typography.bodyBold, { color: palette.accent }]}>
            {route.etaText}
          </Text>
        </View>
        {route.nextEta && (
          <Text style={[typography.caption1, { color: theme.colors.textTertiary }]}>
            {`luego ${route.nextEta}`}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={{ alignItems: 'flex-end', gap: 2 }}>
      <Text
        style={[
          typography.title2,
          { color: theme.colors.brand, fontVariant: ['tabular-nums'] },
        ]}
      >
        {route.etaText}
      </Text>
      {route.nextEta && (
        <Text style={[typography.caption1, { color: theme.colors.textTertiary }]}>
          {`luego ${route.nextEta}`}
        </Text>
      )}
    </View>
  );
}
