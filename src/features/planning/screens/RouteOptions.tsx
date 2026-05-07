import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BusPill, radius, spacing, typography, useTheme } from '@/shared';

// US-010 · P8 · Resultados de ruta.
// Lista de 4 opciones ordenadas por tiempo total. Cards (no celdas) sobre
// surfaceBase. Tag "Más rápida" en la primera. Cada card: tiempo total
// hero · timeline horizontal walk→bus→walk · descripción + En vivo badge.

interface RouteSegment {
  kind: 'walk' | 'bus';
  duration: string;
  busCode?: string;
}

interface RouteOption {
  id: string;
  totalTime: string;
  arrivalTime: string;
  segments: RouteSegment[];
  description: string;
  live: boolean;
  fastest?: boolean;
}

const MOCK_OPTIONS: RouteOption[] = [
  {
    id: 'opt1',
    totalTime: '32 min',
    arrivalTime: '9:42 AM',
    segments: [
      { kind: 'walk', duration: '4 min' },
      { kind: 'bus', duration: '', busCode: 'C12' },
      { kind: 'walk', duration: '3 min' },
    ],
    description: 'Sin transbordo · 6 paradas en bus · Sale en 3 min',
    live: true,
    fastest: true,
  },
  {
    id: 'opt2',
    totalTime: '38 min',
    arrivalTime: '9:48 AM',
    segments: [
      { kind: 'walk', duration: '3 min' },
      { kind: 'bus', duration: '', busCode: '46' },
      { kind: 'bus', duration: '', busCode: 'A8' },
      { kind: 'walk', duration: '2 min' },
    ],
    description: '1 transbordo · 9 paradas · Sale en 2 min',
    live: true,
  },
  {
    id: 'opt3',
    totalTime: '45 min',
    arrivalTime: '9:55 AM',
    segments: [
      { kind: 'walk', duration: '11 min' },
      { kind: 'bus', duration: '', busCode: '14' },
      { kind: 'walk', duration: '5 min' },
    ],
    description: 'Sin transbordo · 8 paradas · Sale en 6 min',
    live: true,
  },
  {
    id: 'opt4',
    totalTime: '52 min',
    arrivalTime: '10:02 AM',
    segments: [
      { kind: 'walk', duration: '6 min' },
      { kind: 'bus', duration: '', busCode: 'CR3' },
      { kind: 'walk', duration: '4 min' },
    ],
    description: 'Cooperativa · sin rastreador · sale ~9:10',
    live: false,
  },
];

export function RouteOptions() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ destination?: string }>();
  const destination = params.destination ?? 'Universidad del Norte';

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          gap: spacing.md,
        }}
      >
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={theme.colors.brand} />
        </Pressable>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[typography.caption1, { color: theme.colors.textTertiary }]}>
            Hacia
          </Text>
          <Text
            style={[typography.headline, { color: theme.colors.textPrimary }]}
            numberOfLines={1}
          >
            {destination}
          </Text>
        </View>
        <Pressable hitSlop={10} onPress={() => {}}>
          <Ionicons name="options" size={22} color={theme.colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.sm,
          paddingBottom: spacing.huge,
          gap: spacing.md,
        }}
      >
        {MOCK_OPTIONS.map((opt) => (
          <RouteOptionCard
            key={opt.id}
            option={opt}
            onPress={() => router.push(`/route-detail?id=${opt.id}`)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function RouteOptionCard({
  option,
  onPress,
}: {
  option: RouteOption;
  onPress: () => void;
}) {
  const theme = useTheme();
  const disabled = !option.live && option.description.includes('sin rastreador');

  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: radius.lg,
        overflow: 'hidden',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {({ pressed }) => (
        <View
          style={{
            backgroundColor: theme.colors.surfaceRaised,
            padding: spacing.lg,
            opacity: pressed ? 0.85 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          }}
        >
          {option.fastest && (
            <View
              style={{
                alignSelf: 'flex-start',
                paddingHorizontal: spacing.sm,
                paddingVertical: 2,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: theme.colors.brand,
                marginBottom: spacing.sm,
              }}
            >
              <Text
                style={[typography.caption1, { color: theme.colors.brand, fontWeight: '600' }]}
              >
                Más rápida
              </Text>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: spacing.sm,
            }}
          >
            <Text
              style={[
                typography.title1,
                { color: theme.colors.brand, fontVariant: ['tabular-nums'] },
              ]}
            >
              {option.totalTime}
            </Text>
            <Text style={[typography.subhead, { color: theme.colors.textSecondary }]}>
              Llegas {option.arrivalTime}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.xs,
              marginBottom: spacing.sm,
              flexWrap: 'wrap',
            }}
          >
            {option.segments.map((seg, i) => (
              <View
                key={i}
                style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}
              >
                {seg.kind === 'walk' ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Ionicons name="walk" size={14} color={theme.colors.textSecondary} />
                    <Text
                      style={[typography.subhead, { color: theme.colors.textSecondary }]}
                    >
                      {seg.duration}
                    </Text>
                  </View>
                ) : (
                  <BusPill code={seg.busCode!} size="md" />
                )}
                {i < option.segments.length - 1 && (
                  <Text style={{ color: theme.colors.textTertiary }}>—</Text>
                )}
              </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={[
                typography.footnote,
                { color: theme.colors.textSecondary, flex: 1 },
              ]}
              numberOfLines={2}
            >
              {option.description}
            </Text>
            {option.live && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: spacing.xs,
                  marginLeft: spacing.sm,
                }}
              >
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: theme.colors.success,
                  }}
                />
                <Text style={[typography.footnote, { color: theme.colors.success }]}>
                  En vivo
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
}
