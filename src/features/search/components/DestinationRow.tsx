import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconCircle, spacing, typography, useTheme } from '@/shared';

// US-008/009 · P6/P7 · Filas de búsqueda.
// Diferencias por tipo:
//   paradero    → location.fill (navigate) brand · tinted bg
//   direccion   → mappin.and.ellipse tertiary · elevated bg
//   lugar       → building.2.fill brand · tinted bg
//   estacion_tm → bus.fill accent · accent tinted bg
//   reciente    → clock 20pt tertiary · sin IconCircle, ícono plano
//
// NOTA: el layout (flexDirection row) va en un View interno, no en el
// Pressable directo. Esto es un workaround para un quirk con NativeWind v4
// jsx-runtime + Pressable.style función — el flexDirection se ignora si
// se aplica directo al Pressable.

export type ResultKind = 'paradero' | 'direccion' | 'lugar' | 'estacion_tm';

export interface SearchResult {
  id: string;
  title: string;
  meta: string;
  kind: ResultKind;
  distance?: string;
}

const KIND_ICON: Record<
  ResultKind,
  {
    icon: keyof typeof Ionicons.glyphMap;
    tone: 'brand' | 'secondary' | 'tertiary' | 'warning';
    background: 'elevated' | 'raised' | 'tinted';
  }
> = {
  paradero: { icon: 'navigate', tone: 'brand', background: 'tinted' },
  direccion: { icon: 'location-outline', tone: 'tertiary', background: 'elevated' },
  lugar: { icon: 'business', tone: 'brand', background: 'tinted' },
  estacion_tm: { icon: 'bus', tone: 'warning', background: 'tinted' },
};

interface ResultRowProps {
  result: SearchResult;
  highlighted?: boolean;
  onPress?: (r: SearchResult) => void;
}

export function ResultRow({ result, highlighted, onPress }: ResultRowProps) {
  const theme = useTheme();
  const cfg = KIND_ICON[result.kind];
  return (
    <Pressable onPress={() => onPress?.(result)}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
            paddingHorizontal: spacing.lg,
            height: 64,
            backgroundColor: pressed
              ? theme.colors.surfaceRaised
              : highlighted
                ? `${theme.colors.brand}0D`
                : 'transparent',
          }}
        >
          <IconCircle
            icon={cfg.icon}
            size="md"
            tone={cfg.tone}
            background={cfg.background}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={[typography.headline, { color: theme.colors.textPrimary }]}
              numberOfLines={1}
            >
              {result.title}
            </Text>
            <Text
              style={[typography.subhead, { color: theme.colors.textSecondary }]}
              numberOfLines={1}
            >
              {result.meta}
            </Text>
          </View>
          {result.distance && (
            <Text
              style={[typography.subhead, { color: theme.colors.textTertiary }]}
            >
              {result.distance}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

export interface RecentItem {
  id: string;
  title: string;
  meta: string;
}

interface RecentRowProps {
  item: RecentItem;
  onPress?: (item: RecentItem) => void;
  onFill?: (item: RecentItem) => void;
}

export function RecentRow({ item, onPress, onFill }: RecentRowProps) {
  const theme = useTheme();
  return (
    <Pressable onPress={() => onPress?.(item)}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
            paddingHorizontal: spacing.lg,
            height: 60,
            backgroundColor: pressed
              ? theme.colors.surfaceRaised
              : 'transparent',
          }}
        >
          <View
            style={{
              width: 28,
              height: 28,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name="time-outline"
              size={20}
              color={theme.colors.textTertiary}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[typography.body, { color: theme.colors.textPrimary }]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              style={[
                typography.footnote,
                { color: theme.colors.textSecondary },
              ]}
              numberOfLines={1}
            >
              {item.meta}
            </Text>
          </View>
          <Pressable
            onPress={() => onFill?.(item)}
            hitSlop={10}
            style={{ padding: 4 }}
          >
            <Ionicons
              name="arrow-up-outline"
              size={14}
              color={theme.colors.textTertiary}
              style={{ transform: [{ rotate: '-45deg' }] }}
            />
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}
