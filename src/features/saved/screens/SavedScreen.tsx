import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BusPill, IconCircle, radius, spacing, typography, useTheme } from '@/shared';

// US-022 · P15 · Tab Guardados.
// Layout: large title + segmented control Paraderos/Rutas · cell altura 80pt
// con BusPill prominente. Editar al top-right.
// TODO: cuando exista persistencia, leer de storage; hoy mock.
// TODO: swipe-to-delete y reordenamiento.

interface SavedStop {
  id: string;
  title: string;
  meta: string;
  routes: number;
  primaryRoute: string;
  primaryEta: string;
}

interface SavedRoute {
  id: string;
  code: string;
  destination: string;
  type: string;
  frequency: string;
  status: 'operando' | 'baja' | 'sin_servicio';
}

const MOCK_STOPS: SavedStop[] = [
  { id: 's1', title: 'Calle 76 con 53', meta: 'Carrera 53 · 6 rutas', routes: 6, primaryRoute: 'C12', primaryEta: '4 min' },
  { id: 's2', title: 'Universidad del Norte', meta: 'Km 5 vía Pto Colombia · 3 rutas', routes: 3, primaryRoute: 'B2', primaryEta: '8 min' },
  { id: 's3', title: 'Av. Caracas con 72', meta: 'Av. Caracas · 4 rutas', routes: 4, primaryRoute: 'A8', primaryEta: '12 min' },
  { id: 's4', title: 'Plaza de la Paz', meta: 'Centro · 8 rutas', routes: 8, primaryRoute: 'M1', primaryEta: '2 min' },
];

const MOCK_ROUTES: SavedRoute[] = [
  { id: 'r1', code: 'C12', destination: 'Centro', type: 'Ruta urbana', frequency: 'cada ~8 min', status: 'operando' },
  { id: 'r2', code: 'B2', destination: 'Norte', type: 'Ruta urbana', frequency: 'cada ~10 min', status: 'operando' },
  { id: 'r3', code: 'M1', destination: 'Metropolitano', type: 'Ruta urbana', frequency: 'cada ~6 min', status: 'baja' },
];

type Tab = 'paraderos' | 'rutas';

export function SavedScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<Tab>('paraderos');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.md,
          paddingBottom: spacing.sm,
        }}
      >
        <Text style={[typography.largeTitle, { color: theme.colors.textPrimary }]}>
          Guardados
        </Text>
        <Pressable hitSlop={8} onPress={() => {}}>
          <Text style={[typography.body, { color: theme.colors.brand }]}>
            Editar
          </Text>
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }}>
        <SegmentedControl value={tab} onChange={setTab} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.huge }}>
        {tab === 'paraderos'
          ? MOCK_STOPS.map((s) => <SavedStopRow key={s.id} stop={s} />)
          : MOCK_ROUTES.map((r) => <SavedRouteRow key={r.id} route={r} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

function SegmentedControl({ value, onChange }: { value: Tab; onChange: (t: Tab) => void }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.surfaceRaised,
        borderRadius: 9,
        padding: 2,
      }}
    >
      {(['paraderos', 'rutas'] as Tab[]).map((t) => {
        const active = value === t;
        return (
          <Pressable
            key={t}
            onPress={() => onChange(t)}
            style={{
              flex: 1,
              paddingVertical: spacing.xs + 2,
              borderRadius: 7,
              backgroundColor: active ? theme.colors.surfaceBase : 'transparent',
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                typography.subhead,
                {
                  color: theme.colors.textPrimary,
                  fontWeight: active ? '600' : '400',
                },
              ]}
            >
              {t === 'paraderos' ? 'Paraderos' : 'Rutas'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function SavedStopRow({ stop }: { stop: SavedStop }) {
  const theme = useTheme();
  return (
    <Pressable onPress={() => router.push(`/stop/${stop.id}`)}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
            paddingHorizontal: spacing.lg,
            height: 80,
            backgroundColor: pressed ? theme.colors.surfaceRaised : 'transparent',
          }}
        >
          <IconCircle icon="bus" size="md" tone="brand" background="elevated" />
          <View style={{ flex: 1 }}>
            <Text
              style={[typography.headline, { color: theme.colors.textPrimary }]}
              numberOfLines={1}
            >
              {stop.title}
            </Text>
            <Text
              style={[typography.subhead, { color: theme.colors.textSecondary }]}
              numberOfLines={1}
            >
              {stop.meta}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text
              style={[
                typography.title2,
                { color: theme.colors.brand, fontVariant: ['tabular-nums'] },
              ]}
            >
              {stop.primaryEta.replace(' min', '')}
              <Text style={typography.subhead}> min</Text>
            </Text>
            <Text style={[typography.caption1, { color: theme.colors.textTertiary }]}>
              Ruta {stop.primaryRoute}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

function SavedRouteRow({ route }: { route: SavedRoute }) {
  const theme = useTheme();
  const statusColor = {
    operando: theme.colors.success,
    baja: theme.colors.warning,
    sin_servicio: theme.colors.danger,
  }[route.status];
  const statusLabel = {
    operando: 'Operando',
    baja: 'Frecuencia baja',
    sin_servicio: 'Sin servicio',
  }[route.status];

  return (
    <Pressable onPress={() => router.push(`/route/${route.id}`)}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
            paddingHorizontal: spacing.lg,
            height: 72,
            backgroundColor: pressed ? theme.colors.surfaceRaised : 'transparent',
          }}
        >
          <BusPill code={route.code} size="lg" />
          <View style={{ flex: 1 }}>
            <Text
              style={[typography.headline, { color: theme.colors.textPrimary }]}
              numberOfLines={1}
            >
              → {route.destination}
            </Text>
            <Text
              style={[typography.subhead, { color: theme.colors.textSecondary }]}
              numberOfLines={1}
            >
              {route.type} · {route.frequency}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: statusColor,
              }}
            />
            <Text style={[typography.footnote, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}
