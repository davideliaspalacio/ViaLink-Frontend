import { useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { spacing, typography, useTheme } from '@/shared';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { SearchBar } from '../components/SearchBar';
import { NearbyStopRow } from '../components/NearbyStopRow';
import { CenterMapFAB } from '../components/CenterMapFAB';
import { ReportFAB } from '../components/ReportFAB';

// US-007 · P5 · Mapa raíz.
// Layout: mapa full-bleed + search bar flotante en top + bottom sheet en
// detent .medium con "Cerca de ti" + sección "Frecuentes".
// TODO: integrar `react-native-maps` (no instalado todavía).
// TODO: cuando exista persistencia, condicionar el empty state de
// "Frecuentes" a si hay datos guardados.

interface NearbyStop {
  id: string;
  title: string;
  meta: string;
  eta: string;
  estimated?: boolean;
}

const NEARBY_MOCK: NearbyStop[] = [
  { id: '1', title: 'Calle 76 con 53', meta: 'Av. Caracas · 80 m', eta: '4 min' },
  { id: '2', title: 'Av. Caracas · 72', meta: 'Calle 72 · 220 m', eta: '~6 min' },
  { id: '3', title: 'Calle 80 con 14', meta: 'Av. 19 · 350 m', eta: '9 min', estimated: true },
];

export function MapScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheet>(null);

  // Detents según spec: small (~25%) y medium (~50% / 426pt approx).
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <MapPlaceholder />

      <View
        style={{
          position: 'absolute',
          top: insets.top + spacing.xl,
          left: 0,
          right: 0,
        }}
      >
        <SearchBar />
      </View>

      {/* FABs anchored above the medium detent (~50% of typical screen).
          TODO: animar bottom según posición del sheet. */}
      <CenterMapFAB bottom={520} />
      <ReportFAB bottom={448} />

      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme.colors.surfaceBase }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.textTertiary }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View
            style={{
              paddingTop: spacing.xs,
              paddingHorizontal: spacing.xl,
              paddingBottom: spacing.md,
            }}
          >
            <Text style={[typography.title3, { color: theme.colors.textPrimary }]}>
              Cerca de ti
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.xs,
                marginTop: spacing.xs,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: theme.colors.success,
                }}
              />
              <Text style={[typography.footnote, { color: theme.colors.textSecondary }]}>
                Actualizado hace unos segundos
              </Text>
            </View>
          </View>

          {NEARBY_MOCK.map((s, i) => (
            <View key={s.id}>
              <NearbyStopRow
                title={s.title}
                meta={s.meta}
                eta={s.eta}
                estimated={s.estimated}
                onPress={() => router.push(`/stop/${s.id}`)}
              />
              {i < NEARBY_MOCK.length - 1 && (
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: theme.colors.separator,
                    marginLeft: 72,
                  }}
                />
              )}
            </View>
          ))}

          <View style={{ paddingHorizontal: spacing.xl, paddingTop: spacing.xxl }}>
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
              Frecuentes
            </Text>
            <Text
              style={[
                typography.body,
                { color: theme.colors.textSecondary, marginTop: spacing.sm },
              ]}
            >
              Las rutas que más uses aparecerán aquí.
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
