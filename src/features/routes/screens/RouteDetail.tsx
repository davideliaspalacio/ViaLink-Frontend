import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BusPill, IconCircle, radius, spacing, typography, useTheme } from '@/shared';

// US-015 · P12 · Detalle de ruta de bus.
// Push navigation desde tap bus pill. Mapa fijo arriba (~45%) con polyline
// completa + bottom sheet con timeline de paraderos.
// 5 tipos de paradero: terminal_inicio, intermedio, bus_aqui, terminal_destino,
// usuario.
// TODO: react-native-maps real (placeholder de grid)
// TODO: scroll a paradero del usuario al abrir.

type StopKind =
  | 'terminal_inicio'
  | 'intermedio'
  | 'bus_aqui'
  | 'terminal_destino'
  | 'usuario';

interface RouteStop {
  id: string;
  title: string;
  kind: StopKind;
  meta?: string; // "Sale 5:30 AM" / "+8 min" / "Destino final"
}

interface MockRoute {
  code: string;
  destination: string;
  type: string;
  frequency: string;
  totalStops: number;
  totalTime: string;
  stops: RouteStop[];
}

const MOCK_ROUTE: MockRoute = {
  code: 'C12',
  destination: 'Centro',
  type: 'Ruta urbana',
  frequency: 'cada ~8 min',
  totalStops: 24,
  totalTime: '42 min recorrido total',
  stops: [
    { id: '1', title: 'Plaza Central', kind: 'terminal_inicio', meta: 'Sale 5:30 AM' },
    { id: '2', title: 'Avenida 19', kind: 'intermedio', meta: '+2 min' },
    { id: '3', title: 'Carrera 53 con 80', kind: 'intermedio', meta: '+5 min' },
    { id: '4', title: 'Calle 76 con 53', kind: 'usuario', meta: 'Tu paradero · +12 min' },
    { id: '5', title: 'Calle 72', kind: 'bus_aqui', meta: 'Bus aquí' },
    { id: '6', title: 'Av. Caracas', kind: 'intermedio', meta: '+18 min' },
    { id: '7', title: 'Calle 60', kind: 'intermedio', meta: '+24 min' },
    { id: '8', title: 'Calle 45', kind: 'intermedio', meta: '+30 min' },
    { id: '9', title: 'Centro', kind: 'terminal_destino', meta: 'Destino final · +42 min' },
  ],
};

export function RouteDetail() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ id?: string }>();
  // TODO: lookup por params.id cuando haya backend.
  const route_ = MOCK_ROUTE;

  const snapPoints = useMemo(() => ['55%', '90%'], []);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <Header
        code={route_.code}
        destination={route_.destination}
        type={route_.type}
        frequency={route_.frequency}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.surfaceRaised,
        }}
      >
        <RouteMapPlaceholder code={route_.code} />
      </View>

      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.colors.surfaceBase }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.textTertiary }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              paddingHorizontal: spacing.lg,
              paddingTop: spacing.xs,
              paddingBottom: spacing.md,
            }}
          >
            <Text style={[typography.title3, { color: theme.colors.textPrimary }]}>
              Paraderos
            </Text>
            <Text style={[typography.footnote, { color: theme.colors.textSecondary }]}>
              {route_.totalStops} paradas · {route_.totalTime}
            </Text>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: spacing.huge }}>
            {route_.stops.map((s, i) => (
              <RouteStopRow
                key={s.id}
                stop={s}
                isFirst={i === 0}
                isLast={i === route_.stops.length - 1}
              />
            ))}
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

function Header({
  code,
  destination,
  type,
  frequency,
}: {
  code: string;
  destination: string;
  type: string;
  frequency: string;
}) {
  const theme = useTheme();
  return (
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
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
        <BusPill code={code} size="lg" />
        <View style={{ flex: 1 }}>
          <Text
            style={[typography.headline, { color: theme.colors.textPrimary }]}
            numberOfLines={1}
          >
            → {destination}
          </Text>
          <Text
            style={[typography.caption1, { color: theme.colors.textSecondary }]}
            numberOfLines={1}
          >
            {type} · {frequency}
          </Text>
        </View>
      </View>
      <Pressable hitSlop={10} onPress={() => {}}>
        <Ionicons name="bookmark-outline" size={22} color={theme.colors.textSecondary} />
      </Pressable>
    </View>
  );
}

function RouteMapPlaceholder({ code }: { code: string }) {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surfaceRaised }}>
      {/* Grid placeholder */}
      {Array.from({ length: 6 }).map((_, i) => (
        <View
          key={`h-${i}`}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${(i + 1) * 14}%`,
            height: 1,
            backgroundColor: theme.colors.separator,
          }}
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <View
          key={`v-${i}`}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${(i + 1) * 18}%`,
            width: 1,
            backgroundColor: theme.colors.separator,
          }}
        />
      ))}
      {/* Pill central como hint */}
      <View
        style={{
          position: 'absolute',
          top: '40%',
          left: '40%',
        }}
      >
        <BusPill code={code} size="md" />
      </View>
    </View>
  );
}

function RouteStopRow({
  stop,
  isFirst,
  isLast,
}: {
  stop: RouteStop;
  isFirst: boolean;
  isLast: boolean;
}) {
  const theme = useTheme();
  const cfg = STOP_CONFIG[stop.kind];
  const titleColor =
    stop.kind === 'usuario'
      ? theme.colors.brand
      : stop.kind === 'bus_aqui'
        ? theme.colors.brand
        : theme.colors.textPrimary;

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        minHeight: cfg.size === 'large' ? 64 : 56,
      }}
    >
      {/* Timeline column */}
      <View style={{ width: 44, alignItems: 'center' }}>
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
        <View style={{ marginTop: 18 }}>
          <StopMarker kind={stop.kind} />
        </View>
      </View>

      <View style={{ flex: 1, paddingVertical: spacing.md, gap: 2 }}>
        <Text
          style={[
            stop.kind === 'usuario' || stop.kind === 'terminal_inicio' || stop.kind === 'terminal_destino'
              ? typography.headline
              : typography.body,
            { color: titleColor },
          ]}
          numberOfLines={1}
        >
          {stop.title}
        </Text>
        {stop.meta && (
          <Text
            style={[typography.footnote, { color: theme.colors.textSecondary }]}
            numberOfLines={1}
          >
            {stop.meta}
          </Text>
        )}
      </View>
    </View>
  );
}

const STOP_CONFIG: Record<StopKind, { size: 'large' | 'small' }> = {
  terminal_inicio: { size: 'large' },
  intermedio: { size: 'small' },
  bus_aqui: { size: 'large' },
  terminal_destino: { size: 'large' },
  usuario: { size: 'large' },
};

function StopMarker({ kind }: { kind: StopKind }) {
  const theme = useTheme();
  if (kind === 'terminal_inicio' || kind === 'terminal_destino') {
    return (
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: theme.colors.brand,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name={kind === 'terminal_inicio' ? 'bus' : 'flag'}
          size={12}
          color="#FFFFFF"
        />
      </View>
    );
  }
  if (kind === 'bus_aqui') {
    return (
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: theme.colors.brand,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#FFFFFF',
          }}
        />
      </View>
    );
  }
  if (kind === 'usuario') {
    return (
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: theme.colors.accent,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="location" size={14} color="#FFFFFF" />
      </View>
    );
  }
  // intermedio
  return (
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: theme.colors.textTertiary,
        backgroundColor: theme.colors.surfaceBase,
      }}
    />
  );
}
