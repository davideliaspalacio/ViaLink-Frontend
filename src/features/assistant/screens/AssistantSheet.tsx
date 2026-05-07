import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BusPill,
  PrimaryButton,
  radius,
  SheetHeader,
  spacing,
  typography,
  useTheme,
} from '@/shared';

// US-012 · P17 · Asistente IA conversacional.
// 4 estados: idle · loading · respuesta · ambiguo.
// NO es chatbot relacional — es capa transaccional pregunta→respuesta→acción.
// TODO: integración real con LLM cuando exista backend.

type AssistantState = 'idle' | 'loading' | 'response' | 'ambiguous';

const SUGGESTIONS = [
  { icon: 'school' as const, label: '¿Cómo llego a la Universidad del Norte?' },
  { icon: 'flash' as const, label: 'Voy de afán al Centro' },
  { icon: 'bag' as const, label: '¿Qué bus me deja cerca de la Olímpica?' },
  { icon: 'home' as const, label: 'Llévame a casa' },
];

const AMBIGUOUS_OPTIONS = [
  'Llévame a la Universidad del Norte',
  'Llévame al Centro',
  'Llévame a casa',
];

export function AssistantSheet() {
  const theme = useTheme();
  const [state, setState] = useState<AssistantState>('idle');
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const submit = (text: string) => {
    setSubmittedQuery(text);
    setQuery('');
    setState('loading');
    setTimeout(() => {
      // Heurística mock: si query corta o ambigua → ambiguous
      if (text.trim().split(/\s+/).length <= 2) {
        setState('ambiguous');
      } else {
        setState('response');
      }
    }, 1200);
  };

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <SheetHeader />
      <View style={{ flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.md }}>
        {state === 'idle' && (
          <IdleView
            onSuggestion={(s) => submit(s)}
          />
        )}
        {(state === 'loading' || state === 'response' || state === 'ambiguous') && (
          <View style={{ flex: 1, gap: spacing.md }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.sm,
              }}
            >
              <Ionicons name="sparkles" size={16} color={theme.colors.brand} />
              <Text
                style={[typography.headline, { color: theme.colors.textPrimary }]}
              >
                {state === 'loading'
                  ? 'Pensando…'
                  : state === 'ambiguous'
                    ? 'Necesito más detalles'
                    : 'Respuesta de Vialink'}
              </Text>
            </View>

            <View
              style={{
                padding: spacing.md,
                borderRadius: radius.md,
                backgroundColor: theme.colors.surfaceRaised,
              }}
            >
              <Text
                style={[
                  typography.caption2,
                  {
                    color: theme.colors.textTertiary,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  },
                ]}
              >
                Tu pregunta
              </Text>
              <Text
                style={[
                  typography.body,
                  { color: theme.colors.textPrimary, marginTop: 2, fontStyle: 'italic' },
                ]}
              >
                {submittedQuery}
              </Text>
            </View>

            {state === 'loading' && <LoadingSkeleton />}
            {state === 'response' && <ResponseView />}
            {state === 'ambiguous' && (
              <AmbiguousView onSelect={(opt) => submit(opt)} />
            )}
          </View>
        )}
      </View>

      <View
        style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.sm,
          paddingBottom: spacing.md,
          borderTopWidth: state === 'idle' ? 0 : 0.5,
          borderTopColor: theme.colors.separator,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
            paddingHorizontal: spacing.md,
            height: 52,
            borderRadius: 26,
            backgroundColor: theme.colors.surfaceRaised,
          }}
        >
          <Ionicons name="mic" size={16} color={theme.colors.textTertiary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={state === 'response' ? 'Pregunta otra cosa…' : 'Escribe tu pregunta…'}
            placeholderTextColor={theme.colors.textTertiary}
            style={[
              typography.body,
              { flex: 1, color: theme.colors.textPrimary, paddingVertical: 0 },
            ]}
            onSubmitEditing={() => query.trim() && submit(query.trim())}
            returnKeyType="send"
          />
          <Pressable
            onPress={() => query.trim() && submit(query.trim())}
            disabled={!query.trim()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: query.trim()
                ? theme.colors.brand
                : `${theme.colors.brand}66`,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="arrow-up" size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function IdleView({ onSuggestion }: { onSuggestion: (s: string) => void }) {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, paddingTop: spacing.lg }}>
      <View style={{ alignItems: 'center', gap: spacing.md, marginBottom: spacing.xl }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: `${theme.colors.brand}1F`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="sparkles" size={32} color={theme.colors.brand} />
        </View>
        <Text
          style={[
            typography.title2,
            { color: theme.colors.textPrimary, textAlign: 'center' },
          ]}
        >
          Pregúntale a Vialink
        </Text>
        <Text
          style={[
            typography.subhead,
            { color: theme.colors.textSecondary, textAlign: 'center' },
          ]}
        >
          Pregunta como le preguntarías a un amigo que conoce la ciudad.
        </Text>
      </View>

      <Text
        style={[
          typography.footnoteSemibold,
          {
            color: theme.colors.textTertiary,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            marginBottom: spacing.sm,
          },
        ]}
      >
        Prueba con algo así
      </Text>
      <View style={{ gap: spacing.sm }}>
        {SUGGESTIONS.map((s, i) => (
          <Pressable
            key={i}
            onPress={() => onSuggestion(s.label)}
            style={{
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.md,
              borderRadius: radius.md,
              backgroundColor: theme.colors.surfaceRaised,
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.md,
            }}
          >
            <Ionicons name={s.icon} size={16} color={theme.colors.brand} />
            <Text
              style={[typography.subhead, { color: theme.colors.textPrimary }]}
            >
              {s.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function LoadingSkeleton() {
  const theme = useTheme();
  return (
    <View style={{ gap: spacing.sm }}>
      {[0.6, 0.8, 0.4].map((w, i) => (
        <View
          key={i}
          style={{
            height: 14,
            borderRadius: 7,
            width: `${w * 100}%`,
            backgroundColor: theme.colors.surfaceRaised,
          }}
        />
      ))}
    </View>
  );
}

function ResponseView() {
  const theme = useTheme();
  return (
    <View style={{ gap: spacing.md }}>
      <Text style={[typography.body, { color: theme.colors.textPrimary }]}>
        La opción más rápida es tomar la{' '}
        <Text style={{ fontWeight: '700' }}>Ruta C12</Text> desde la Calle 76 con 53.
        Tarda 32 minutos en total y sale uno cada 8 minutos. Hay otra opción
        caminando pero requiere transbordo.
      </Text>

      <View
        style={{
          padding: spacing.md,
          borderRadius: radius.md,
          backgroundColor: theme.colors.surfaceRaised,
          gap: spacing.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <BusPill code="C12" size="md" />
          <View style={{ flex: 1 }}>
            <Text
              style={[typography.headline, { color: theme.colors.textPrimary }]}
            >
              → Universidad del Norte
            </Text>
            <Text
              style={[typography.caption1, { color: theme.colors.textSecondary }]}
            >
              Sale en 3 min · 32 min total
            </Text>
          </View>
        </View>
        <PrimaryButton
          title="Ver detalle del viaje"
          onPress={() => router.push('/route-detail')}
        />
      </View>

      <Pressable hitSlop={6} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
        <Text style={[typography.subhead, { color: theme.colors.brand }]}>
          Ver 2 opciones más
        </Text>
        <Ionicons name="chevron-down" size={14} color={theme.colors.brand} />
      </Pressable>
    </View>
  );
}

function AmbiguousView({ onSelect }: { onSelect: (opt: string) => void }) {
  const theme = useTheme();
  return (
    <View style={{ gap: spacing.sm }}>
      <Text style={[typography.body, { color: theme.colors.textPrimary }]}>
        No estoy seguro de a dónde quieres ir. ¿Puedes contarme un poco más? Por
        ejemplo:
      </Text>
      {AMBIGUOUS_OPTIONS.map((opt, i) => (
        <Pressable
          key={i}
          onPress={() => onSelect(opt)}
          style={{
            alignSelf: 'flex-start',
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: 999,
            backgroundColor: theme.colors.surfaceRaised,
          }}
        >
          <Text style={[typography.subhead, { color: theme.colors.textPrimary }]}>
            {opt}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
