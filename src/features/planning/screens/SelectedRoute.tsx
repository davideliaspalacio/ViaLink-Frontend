import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BusPill,
  PrimaryButton,
  radius,
  spacing,
  typography,
  useTheme,
} from '@/shared';

// US-011 · P9 · Detalle de ruta seleccionada.
// Master/detail: mapa fijo arriba (~45%) + sheet con timeline vertical.
// 5 pasos: Camina · Toma · Bájate · Camina · Llegada.
// Paso 2 (Bus) expandible con sub-rows de paradas intermedias.
// CTAs sticky: Empezar viaje + Compartir ruta.

interface TimelineStep {
  id: string;
  kind: 'walk' | 'bus' | 'arrival';
  title: string;
  meta: string;
  busCode?: string;
  expandable?: boolean;
  subStops?: { name: string; eta: string }[];
}

const MOCK_STEPS: TimelineStep[] = [
  {
    id: 's1',
    kind: 'walk',
    title: 'Camina 4 min',
    meta: 'hasta Paradero Calle 76\n320 metros',
  },
  {
    id: 's2',
    kind: 'bus',
    title: 'Toma',
    meta: 'dirección Centro',
    busCode: 'C12',
    expandable: true,
    subStops: [
      { name: 'Calle 70', eta: '+2 min' },
      { name: 'Calle 65', eta: '+5 min' },
      { name: 'Calle 60', eta: '+8 min' },
      { name: 'Calle 53', eta: '+11 min' },
      { name: 'Av. Caracas', eta: '+14 min' },
      { name: 'Calle 45', eta: '+16 min' },
      { name: 'Plaza Central', eta: '+18 min' },
    ],
  },
  {
    id: 's3',
    kind: 'walk',
    title: 'Bájate en Plaza Central',
    meta: 'Camina 3 min · 240 metros',
  },
  {
    id: 's4',
    kind: 'arrival',
    title: 'Llegas a destino',
    meta: 'Universidad del Norte · 9:42 AM',
  },
];

export function SelectedRoute() {
  const theme = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
        }}
      >
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={theme.colors.brand} />
        </Pressable>
        <Pressable hitSlop={10} onPress={() => {}}>
          <Ionicons name="bookmark-outline" size={22} color={theme.colors.textSecondary} />
        </Pressable>
      </View>

      <View
        style={{
          height: '40%',
          backgroundColor: theme.colors.surfaceRaised,
        }}
      >
        <RouteMapStub />
      </View>

      <View
        style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.lg,
          paddingBottom: spacing.sm,
        }}
      >
        <Text style={[typography.title3, { color: theme.colors.textPrimary }]}>
          Tu viaje
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: spacing.xxs,
          }}
        >
          <Text style={[typography.footnote, { color: theme.colors.textSecondary }]}>
            Llegas 9:42 AM · 9 paradas en bus
          </Text>
          <Text
            style={[
              typography.title2,
              { color: theme.colors.brand, fontVariant: ['tabular-nums'] },
            ]}
          >
            32 min
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: 160,
        }}
      >
        {MOCK_STEPS.map((step, i) => (
          <TimelineStepRow
            key={step.id}
            step={step}
            isLast={i === MOCK_STEPS.length - 1}
            expanded={expandedId === step.id}
            onToggle={() =>
              setExpandedId(expandedId === step.id ? null : step.id)
            }
          />
        ))}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.sm,
          paddingBottom: spacing.xl,
          backgroundColor: theme.colors.surfaceBase,
          borderTopWidth: 0.5,
          borderTopColor: theme.colors.separator,
          gap: spacing.xs,
        }}
      >
        <PrimaryButton
          title="Empezar viaje"
          onPress={() => router.replace('/active-trip')}
        />
        <Pressable
          onPress={() => {}}
          style={{
            paddingVertical: spacing.sm,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.xs,
          }}
        >
          <Ionicons name="share-outline" size={16} color={theme.colors.brand} />
          <Text style={[typography.headline, { color: theme.colors.brand }]}>
            Compartir ruta
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function RouteMapStub() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surfaceRaised }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${(i + 1) * 16}%`,
            height: 1,
            backgroundColor: theme.colors.separator,
          }}
        />
      ))}
      <View
        style={{
          position: 'absolute',
          top: '20%',
          right: '30%',
          width: 16,
          height: 16,
          borderRadius: 8,
          backgroundColor: theme.colors.brand,
          borderWidth: 3,
          borderColor: '#FFFFFF',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '30%',
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: theme.colors.brand,
        }}
      />
    </View>
  );
}

function TimelineStepRow({
  step,
  isLast,
  expanded,
  onToggle,
}: {
  step: TimelineStep;
  isLast: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', minHeight: 56 }}>
      <View style={{ width: 40, alignItems: 'center', position: 'relative' }}>
        <StepMarker kind={step.kind} />
        {!isLast && (
          <View
            style={{
              flex: 1,
              width: 1,
              backgroundColor: theme.colors.separator,
              marginTop: 4,
            }}
          />
        )}
      </View>
      <View style={{ flex: 1, paddingVertical: spacing.xs, gap: 2 }}>
        {step.kind === 'bus' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            <Text
              style={[typography.headline, { color: theme.colors.textPrimary }]}
            >
              {step.title}
            </Text>
            <BusPill code={step.busCode!} size="md" />
          </View>
        ) : (
          <Text
            style={[typography.headline, { color: theme.colors.textPrimary }]}
          >
            {step.title}
          </Text>
        )}
        <Text
          style={[typography.subhead, { color: theme.colors.textSecondary }]}
        >
          {step.meta}
        </Text>

        {step.expandable && (
          <Pressable
            onPress={onToggle}
            style={{
              marginTop: spacing.xs,
              padding: spacing.sm,
              borderRadius: radius.md,
              borderWidth: 0.5,
              borderColor: theme.colors.separator,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text style={[typography.subhead, { color: theme.colors.textPrimary }]}>
                {step.subStops?.length ?? 0} paradas · {step.subStops?.[step.subStops.length - 1]?.eta} en bus
              </Text>
              <Text style={[typography.caption1, { color: theme.colors.textSecondary }]}>
                Sale en 3 min
              </Text>
            </View>
            <Ionicons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={14}
              color={theme.colors.textTertiary}
            />
          </Pressable>
        )}

        {expanded && step.subStops && (
          <View style={{ marginTop: spacing.xs, gap: spacing.xs }}>
            {step.subStops.map((s, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: spacing.sm,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: theme.colors.textTertiary,
                    }}
                  />
                  <Text style={[typography.subhead, { color: theme.colors.textSecondary }]}>
                    {s.name}
                  </Text>
                </View>
                <Text style={[typography.caption1, { color: theme.colors.textTertiary }]}>
                  {s.eta}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

function StepMarker({ kind }: { kind: TimelineStep['kind'] }) {
  const theme = useTheme();
  if (kind === 'walk') {
    return (
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: theme.colors.surfaceRaised,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="walk" size={14} color={theme.colors.textSecondary} />
      </View>
    );
  }
  if (kind === 'bus') {
    return (
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: theme.colors.brand,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="bus" size={14} color="#FFFFFF" />
      </View>
    );
  }
  // arrival
  return (
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: theme.colors.brand,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ionicons name="flag" size={12} color={theme.colors.brand} />
    </View>
  );
}
