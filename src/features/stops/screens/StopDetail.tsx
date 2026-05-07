import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { spacing, typography, useTheme } from '@/shared';
import { RouteEta, RouteRow } from '../components/RouteRow';

// US-014 · P11 · Detalle de paradero (modal sheet iOS).
// TODO: cuando exista API, reemplazar mock por fetch por id; respetar
// estado "Sin servicio" (banner + ocultar próximos buses).
// TODO: bookmark conectado a US-013 (modal Guardar destino).
// TODO: share conectado a iOS share sheet nativo.

interface MockStop {
  id: string;
  title: string;
  carrera: string;
  distance: string;
  walkingTime: string;
  code: string;
  coverage: string;
  routes: RouteEta[];
}

const MOCK_STOP: MockStop = {
  id: '1',
  title: 'Calle 76 con 53',
  carrera: 'Carrera 53',
  distance: '120 metros',
  walkingTime: '2 min caminando',
  code: 'BAQ-2847',
  coverage: '6 rutas activas',
  routes: [
    { id: 'r1', code: 'C12', destination: 'Centro', cooperativa: 'Coopnorte', frequency: 'cada ~8 min', status: 'normal', etaText: '4 min', nextEta: '12 min' },
    { id: 'r2', code: 'B2', destination: 'Norte', cooperativa: 'Tisquesusa', frequency: 'cada ~10 min', status: 'normal', etaText: '6 min', nextEta: '16 min' },
    { id: 'r3', code: 'A4-1', destination: 'Universidad', cooperativa: 'Coordinadora', frequency: 'cada ~12 min', status: 'arriving', etaText: 'Llegando', nextEta: '14 min' },
    { id: 'r4', code: '46', destination: 'Olímpica', frequency: 'cada ~15 min', status: 'normal', etaText: '9 min', nextEta: '24 min' },
    { id: 'r5', code: 'CR3', destination: 'Centro Sur', frequency: 'cada ~20 min', status: 'normal', etaText: '14 min', nextEta: '34 min' },
    { id: 'r6', code: 'M1', destination: 'Metropolitano', frequency: 'cada ~6 min', status: 'at_stop', etaText: 'En el paradero', nextEta: '6 min' },
    { id: 'r7', code: 'A8', destination: 'Suba', frequency: 'cada ~30 min', status: 'far', etaText: 'Próximo en ~25 min' },
  ],
};

export function StopDetail() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ id?: string }>();
  // TODO: lookup por params.id cuando haya backend; por ahora usa el mock fijo.
  const stop = MOCK_STOP;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.huge }}>
        <Header
          title={stop.title}
          subtitle={`${stop.carrera} · A ${stop.distance} · ${stop.walkingTime}`}
        />

        <SectionHeader title="Próximos buses" liveDot />

        {stop.routes.map((r, i) => (
          <View key={r.id}>
            <RouteRow route={r} />
            {i < stop.routes.length - 1 && <Separator inset={84} />}
          </View>
        ))}

        <View style={{ marginTop: spacing.xxxl }}>
          <SectionHeader title="Información" />
          <InfoRow label="Código" value={stop.code} />
          <Separator />
          <InfoRow label="Cobertura" value={stop.coverage} />
          <Separator />
          <InfoRow
            label="Estado"
            value={
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: theme.colors.success,
                  }}
                />
                <Text style={[typography.body, { color: theme.colors.success }]}>
                  Operativo
                </Text>
              </View>
            }
          />
        </View>

        <Pressable onPress={() => {}} style={{ marginTop: spacing.lg }}>
          {({ pressed }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: spacing.xl,
                paddingVertical: spacing.lg,
                backgroundColor: pressed ? theme.colors.surfaceRaised : 'transparent',
              }}
            >
              <Ionicons
                name="warning-outline"
                size={20}
                color={theme.colors.warning}
              />
              <Text
                style={[
                  typography.body,
                  { color: theme.colors.textPrimary, marginLeft: spacing.md, flex: 1 },
                ]}
              >
                Reportar problema en este paradero
              </Text>
              <Ionicons name="chevron-forward" size={14} color={theme.colors.textTertiary} />
            </View>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  const theme = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xxxl,
        paddingBottom: spacing.xl,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: spacing.lg,
          marginBottom: spacing.md,
        }}
      >
        <Pressable
          hitSlop={8}
          onPress={() => router.push('/save-destination')}
        >
          <Ionicons
            name="bookmark-outline"
            size={24}
            color={theme.colors.textSecondary}
          />
        </Pressable>
        <Pressable
          hitSlop={8}
          onPress={() => router.push('/login?context=share')}
        >
          <Ionicons
            name="share-outline"
            size={24}
            color={theme.colors.textSecondary}
          />
        </Pressable>
      </View>
      <Text style={[typography.title1, { color: theme.colors.textPrimary }]}>
        {title}
      </Text>
      <Text
        style={[
          typography.subhead,
          { color: theme.colors.textSecondary, marginTop: spacing.xs },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
}

function SectionHeader({
  title,
  liveDot,
}: {
  title: string;
  liveDot?: boolean;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
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
        {title}
      </Text>
      {liveDot && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
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
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        height: 44,
      }}
    >
      <Text style={[typography.body, { color: theme.colors.textPrimary }]}>
        {label}
      </Text>
      {typeof value === 'string' ? (
        <Text style={[typography.body, { color: theme.colors.textSecondary }]}>
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );
}

function Separator({ inset = 20 }: { inset?: number }) {
  const theme = useTheme();
  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: theme.colors.separator,
        marginLeft: inset,
      }}
    />
  );
}
