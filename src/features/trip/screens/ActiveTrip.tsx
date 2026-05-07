import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PrimaryButton,
  radius,
  spacing,
  typography,
  useTheme,
} from '@/shared';

// US-016 · P10 · Viaje activo (focus mode).
// UI deliberadamente más simple, legible a un metro de distancia.
// Bottom sheet fijo (no colapsa) · nav bar ausente.
// Tiempo restante 48pt Bold brand — única excepción al type scale.
// TODO: Live Activity en Dynamic Island (US-017) requiere módulo nativo iOS.
// TODO: react-native-maps para polyline real con tramo recorrido / restante.

interface RemainingStop {
  id: string;
  name: string;
  etaInMin: number;
}

const MOCK_REMAINING: RemainingStop[] = [
  { id: 'r1', name: 'Calle 80 con 14', etaInMin: 7 },
  { id: 'r2', name: 'Calle 72', etaInMin: 9 },
  { id: 'r3', name: 'Av. Caracas', etaInMin: 12 },
];

export function ActiveTrip() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <View style={{ height: '40%', backgroundColor: theme.colors.surfaceRaised }}>
        <TripMapStub />
      </View>

      <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.xxl,
            paddingBottom: spacing.lg,
          }}
        >
          <View style={{ alignItems: 'center', gap: spacing.xs }}>
            <Text
              style={[
                typography.footnoteSemibold,
                {
                  color: theme.colors.textTertiary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                },
              ]}
            >
              Tiempo restante
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
              <Text
                style={{
                  fontSize: 48,
                  fontWeight: '700',
                  color: theme.colors.brand,
                  fontVariant: ['tabular-nums'],
                  lineHeight: 52,
                }}
              >
                12
              </Text>
              <Text
                style={[
                  typography.title2,
                  { color: theme.colors.brand, fontWeight: '600' },
                ]}
              >
                min
              </Text>
            </View>
            <Text
              style={[
                typography.subhead,
                { color: theme.colors.textSecondary },
              ]}
            >
              Llegas a las 9:42 AM
            </Text>
          </View>

          <View
            style={{
              marginTop: spacing.xl,
              padding: spacing.md,
              borderRadius: radius.md,
              backgroundColor: theme.colors.surfaceRaised,
            }}
          >
            <Text
              style={[
                typography.footnoteSemibold,
                {
                  color: theme.colors.textTertiary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                },
              ]}
            >
              Próximo paradero
            </Text>
            <Text
              style={[typography.title3, { color: theme.colors.textPrimary, marginTop: 2 }]}
            >
              Calle 80 con 14
            </Text>
            <Text
              style={[typography.subhead, { color: theme.colors.textSecondary }]}
            >
              En 3 paradas · 7 min
            </Text>
          </View>

          <View style={{ marginTop: spacing.xl }}>
            <Text
              style={[
                typography.footnoteSemibold,
                {
                  color: theme.colors.textTertiary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                },
              ]}
            >
              Paraderos restantes
            </Text>
            <View style={{ marginTop: spacing.sm, gap: 0 }}>
              {MOCK_REMAINING.map((s, i) => (
                <RemainingStopRow
                  key={s.id}
                  stop={s}
                  isFirst={i === 0}
                  isLast={i === MOCK_REMAINING.length - 1}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            paddingHorizontal: spacing.lg,
            paddingBottom: spacing.md,
            gap: spacing.xs,
          }}
        >
          <PrimaryButton
            title="Compartir viaje"
            icon={<Ionicons name="share-outline" size={16} color="#FFFFFF" />}
            onPress={() => router.push('/share-trip')}
          />
          <Pressable
            onPress={() => router.replace('/(tabs)')}
            style={{
              paddingVertical: spacing.sm,
              alignItems: 'center',
            }}
          >
            <Text style={[typography.headline, { color: theme.colors.danger }]}>
              Cancelar viaje
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

function TripMapStub() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surfaceRaised }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${(i + 1) * 18}%`,
            height: 1,
            backgroundColor: theme.colors.separator,
          }}
        />
      ))}
      <View
        style={{
          position: 'absolute',
          top: '40%',
          left: '40%',
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: theme.colors.brand,
          borderWidth: 3,
          borderColor: '#FFFFFF',
        }}
      />
    </View>
  );
}

function RemainingStopRow({
  stop,
  isFirst,
  isLast,
}: {
  stop: RemainingStop;
  isFirst: boolean;
  isLast: boolean;
}) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', minHeight: 44 }}>
      <View style={{ width: 24, alignItems: 'center' }}>
        {!isFirst && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: '50%',
              width: 1,
              backgroundColor: theme.colors.brand,
            }}
          />
        )}
        {!isLast && (
          <View
            style={{
              position: 'absolute',
              top: '50%',
              bottom: 0,
              width: 1,
              backgroundColor: theme.colors.brand,
            }}
          />
        )}
        <View
          style={{
            width: isFirst ? 12 : 8,
            height: isFirst ? 12 : 8,
            borderRadius: 6,
            backgroundColor: isFirst ? theme.colors.accent : theme.colors.brand,
            marginTop: 16,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: spacing.sm,
        }}
      >
        <Text style={[typography.body, { color: theme.colors.textPrimary }]}>
          {stop.name}
        </Text>
        <Text
          style={[
            typography.subhead,
            { color: theme.colors.textSecondary, fontVariant: ['tabular-nums'] },
          ]}
        >
          {stop.etaInMin} min
        </Text>
      </View>
    </View>
  );
}
