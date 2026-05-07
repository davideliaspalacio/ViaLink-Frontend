import { useMemo, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconCircle, radius, spacing, typography, useTheme } from '@/shared';
import {
  AddQuickCard,
  QuickCard,
  QuickCardItem,
} from '../components/QuickShortcut';
import {
  RecentItem,
  RecentRow,
  ResultRow,
  SearchResult,
} from '../components/DestinationRow';

// US-008/009 · P6/P7 · Buscar (tab).
// Idle: título "Buscar" + search bar 36pt + 3 quick cards (Casa/Trabajo/+
// Agregar) + Recientes + sugerencia IA.
// Active/Results: search bar con borde 1.5pt brand + Cancelar; primer
// resultado pre-seleccionado con tint brand 5%; máximo 8 visibles.
// Empty: ícono search lg + copy + CTA "Preguntar a Vialink".
// TODO: animaciones reanimated (fade-in 120ms, stagger 30ms, slide kbd).
// TODO: navegación a P9 (detalle de ruta) cuando exista.
// TODO: navegación al asistente IA cuando exista.

const QUICK_PRIMARY: QuickCardItem[] = [
  { id: 'q1', label: 'Casa', icon: 'home', address: 'Cra. 53 #76-22' },
  { id: 'q2', label: 'Trabajo', icon: 'briefcase', address: 'Calle 100 #19-54' },
];

const INITIAL_RECENTS: RecentItem[] = [
  { id: 'r1', title: 'Calle 80 con 14', meta: 'Paradero · 240 m' },
  { id: 'r2', title: 'Centro Comercial Andino', meta: 'Cra. 11 #82-71' },
  { id: 'r3', title: 'Parque Simón Bolívar', meta: 'Cl. 53 #46-09' },
  { id: 'r4', title: 'Universidad Nacional', meta: 'Cra. 30 #45-03' },
];

const MOCK_CATALOG: SearchResult[] = [
  {
    id: 'res1',
    title: 'Calle 80 con 14',
    meta: 'Paradero · Bogotá',
    kind: 'paradero',
    distance: '240 m',
  },
  {
    id: 'res2',
    title: 'Calle 80 #14-32',
    meta: 'Dirección · Chapinero',
    kind: 'direccion',
    distance: '380 m',
  },
  {
    id: 'res3',
    title: 'Centro Comercial Calle 80',
    meta: 'Lugar · Engativá',
    kind: 'lugar',
    distance: '4.2 km',
  },
  {
    id: 'res4',
    title: 'Estación Calle 80',
    meta: 'TransMilenio · Troncal NQS',
    kind: 'estacion_tm',
    distance: '6.1 km',
  },
  {
    id: 'res5',
    title: 'Carrera 80 con 14',
    meta: 'Dirección · Kennedy',
    kind: 'direccion',
    distance: '8.9 km',
  },
];

const KIND_ORDER: Record<SearchResult['kind'], number> = {
  paradero: 0,
  direccion: 1,
  lugar: 2,
  estacion_tm: 3,
};

export function SearchScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [recents, setRecents] = useState<RecentItem[]>(INITIAL_RECENTS);
  const inputRef = useRef<TextInput>(null);

  const trimmed = query.trim().toLowerCase();
  const isSearching = trimmed.length > 0;
  const isActive = focused || isSearching;

  const results = useMemo(() => {
    if (!isSearching) return [];
    return MOCK_CATALOG.filter(
      (r) =>
        r.title.toLowerCase().includes(trimmed) ||
        r.meta.toLowerCase().includes(trimmed),
    )
      .sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind])
      .slice(0, 8);
  }, [trimmed, isSearching]);

  const handleCancel = () => {
    setQuery('');
    setFocused(false);
    inputRef.current?.blur();
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}
    >
      <View
        style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.md,
          paddingBottom: spacing.md,
          gap: spacing.md,
        }}
      >
        <Text
          style={[
            typography.largeTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Buscar
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              height: 36,
              borderRadius: 10,
              paddingHorizontal: 10,
              backgroundColor: theme.colors.surfaceRaised,
              borderWidth: isActive ? 1.5 : 0,
              borderColor: isActive ? theme.colors.brand : 'transparent',
            }}
          >
            <Ionicons
              name="search"
              size={15}
              color={theme.colors.textTertiary}
            />
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="¿A dónde vas?"
              placeholderTextColor={theme.colors.textTertiary}
              style={[
                typography.body,
                {
                  flex: 1,
                  color: theme.colors.textPrimary,
                  paddingVertical: 0,
                },
              ]}
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="none"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')} hitSlop={8}>
                <Ionicons
                  name="close-circle"
                  size={16}
                  color={theme.colors.textTertiary}
                />
              </Pressable>
            )}
          </View>
          {isActive && (
            <Pressable onPress={handleCancel} hitSlop={8}>
              <Text
                style={[typography.body, { color: theme.colors.brand }]}
              >
                Cancelar
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {isSearching ? (
        <ResultsView query={query} results={results} />
      ) : (
        <IdleView
          recents={recents}
          onClearRecents={() => setRecents([])}
          onFillRecent={(item) => setQuery(item.title)}
        />
      )}
    </SafeAreaView>
  );
}

function IdleView({
  recents,
  onClearRecents,
  onFillRecent,
}: {
  recents: RecentItem[];
  onClearRecents: () => void;
  onFillRecent: (item: RecentItem) => void;
}) {
  const theme = useTheme();
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: spacing.huge }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xs,
          paddingBottom: spacing.lg,
        }}
      >
        {QUICK_PRIMARY.map((q) => (
          <QuickCard
            key={q.id}
            item={q}
            onPress={(item) =>
              router.push(
                `/route-options?destination=${encodeURIComponent(item.label)}`,
              )
            }
          />
        ))}
        <AddQuickCard onPress={() => router.push('/save-destination')} />
      </View>

      {recents.length > 0 && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: spacing.lg,
              paddingTop: spacing.sm,
              paddingBottom: spacing.xs,
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
              Recientes
            </Text>
            <Pressable onPress={onClearRecents} hitSlop={8}>
              <Text
                style={[typography.footnote, { color: theme.colors.brand }]}
              >
                Borrar
              </Text>
            </Pressable>
          </View>

          {recents.map((r) => (
            <RecentRow
              key={r.id}
              item={r}
              onPress={(item) =>
                router.push(
                  `/route-options?destination=${encodeURIComponent(item.title)}`,
                )
              }
              onFill={onFillRecent}
            />
          ))}
        </View>
      )}

      <AssistantSuggestion />
    </ScrollView>
  );
}

function AssistantSuggestion() {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() => router.push('/assistant')}
      style={{
        marginTop: spacing.lg,
        marginHorizontal: spacing.lg,
        borderRadius: radius.md,
        overflow: 'hidden',
      }}
    >
      {({ pressed }) => (
        <View
          style={{
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.md,
            backgroundColor: pressed
              ? theme.colors.surfaceElevated
              : theme.colors.surfaceRaised,
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
          }}
        >
          <IconCircle
            icon="sparkles"
            size="sm"
            tone="brand"
            background="tinted"
          />
          <View style={{ flex: 1 }}>
            <Text
              style={[
                typography.subhead,
                { color: theme.colors.textPrimary, fontWeight: '600' },
              ]}
            >
              ¿No sabes la dirección?
            </Text>
            <Text
              style={[
                typography.footnote,
                { color: theme.colors.textSecondary },
              ]}
            >
              Pregúntale al Asistente Vialink
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={theme.colors.textTertiary}
          />
        </View>
      )}
    </Pressable>
  );
}

function ResultsView({
  query,
  results,
}: {
  query: string;
  results: SearchResult[];
}) {
  const theme = useTheme();

  if (results.length === 0) {
    return <EmptyResults query={query} />;
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerStyle={{ paddingBottom: spacing.huge }}
    >
      <View
        style={{
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
        }}
      >
        <Text
          style={[typography.footnote, { color: theme.colors.textTertiary }]}
        >
          {results.length} {results.length === 1 ? 'resultado' : 'resultados'}{' '}
          cerca tuyo
        </Text>
      </View>

      {results.map((r, i) => (
        <ResultRow
          key={r.id}
          result={r}
          highlighted={i === 0}
          onPress={() =>
            router.push(`/route-options?destination=${encodeURIComponent(r.title)}`)
          }
        />
      ))}
    </ScrollView>
  );
}

function EmptyResults({ query }: { query: string }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: spacing.giant,
        paddingHorizontal: spacing.xxxl,
        gap: spacing.md,
      }}
    >
      <IconCircle
        icon="search"
        size="lg"
        tone="tertiary"
        background="elevated"
      />
      <Text
        style={[typography.headline, { color: theme.colors.textPrimary }]}
      >
        Sin resultados
      </Text>
      <Text
        style={[
          typography.body,
          { color: theme.colors.textSecondary, textAlign: 'center' },
        ]}
      >
        No encontramos lugares para “{query}” cerca tuyo. Intenta con otro
        nombre o pídele al asistente.
      </Text>
      <Pressable
        onPress={() => router.push('/assistant')}
        style={{
          marginTop: spacing.md,
          borderRadius: radius.full,
          overflow: 'hidden',
        }}
      >
        {({ pressed }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,
              backgroundColor: pressed
                ? `${theme.colors.brand}29`
                : `${theme.colors.brand}1F`,
            }}
          >
            <Ionicons name="sparkles" size={15} color={theme.colors.brand} />
            <Text
              style={[
                typography.subhead,
                { color: theme.colors.brand, fontWeight: '600' },
              ]}
            >
              Preguntar a Vialink
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}
