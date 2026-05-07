import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconCircle, radius, spacing, typography, useTheme } from '@/shared';

// US-025/026 · P13 · Modal Login.
// Sheet contextual: bookmark/compartir/reportar. Apple/Google flow.
// Sin opción "continuar sin cuenta" (login obligatorio para acción).
// TODO: integración real con Apple Sign-In + Google Sign-In.

type LoginContext = 'bookmark' | 'share' | 'report';

const COPY: Record<LoginContext, { title: string; body: string }> = {
  bookmark: {
    title: 'Guarda lo que más usas',
    body: 'Inicia sesión para guardar paraderos, rutas y compartir viajes en cualquier dispositivo.',
  },
  share: {
    title: 'Comparte tu viaje con quien quieras',
    body: 'Inicia sesión para enviar tu ubicación en vivo a familiares.',
  },
  report: {
    title: 'Aporta a la comunidad',
    body: 'Inicia sesión para reportar incidencias y ayudar a otros usuarios.',
  },
};

export function LoginSheet() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ context?: LoginContext }>();
  const ctx = (params.context ?? 'bookmark') as LoginContext;
  const copy = COPY[ctx];

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: spacing.xl,
          paddingTop: spacing.xxxl,
          gap: spacing.lg,
        }}
      >
        <View style={{ alignItems: 'center', gap: spacing.lg }}>
          <IconCircle
            icon="person-circle"
            size="xl"
            tone="brand"
            background="elevated"
          />
          <Text
            style={[
              typography.title1,
              { color: theme.colors.textPrimary, textAlign: 'center' },
            ]}
          >
            {copy.title}
          </Text>
          <Text
            style={[
              typography.body,
              {
                color: theme.colors.textSecondary,
                textAlign: 'center',
              },
            ]}
          >
            {copy.body}
          </Text>
        </View>

        <View style={{ gap: spacing.sm, marginTop: spacing.lg }}>
          <AuthButton provider="apple" onPress={() => router.back()} />
          <AuthButton provider="google" onPress={() => router.back()} />
        </View>

        <View style={{ flex: 1 }} />

        <Text
          style={[
            typography.caption1,
            {
              color: theme.colors.textTertiary,
              textAlign: 'center',
              paddingBottom: spacing.md,
            },
          ]}
        >
          Al continuar aceptas los{' '}
          <Text style={{ color: theme.colors.brand }}>Términos de servicio</Text> y la{' '}
          <Text style={{ color: theme.colors.brand }}>Política de privacidad</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function AuthButton({
  provider,
  onPress,
}: {
  provider: 'apple' | 'google';
  onPress: () => void;
}) {
  const theme = useTheme();
  const isApple = provider === 'apple';
  const isDark = theme.colors.surfaceBase !== '#FFFFFF' && theme.colors.surfaceBase !== '#FAFAFA';

  // Apple: siempre inverso al modo. Google: blanco con borde gris en ambos.
  const bg = isApple ? (isDark ? '#FFFFFF' : '#000000') : '#FFFFFF';
  const fg = isApple ? (isDark ? '#000000' : '#FFFFFF') : '#1F1F1F';
  const border = isApple ? 'transparent' : '#E5E5EA';

  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 50,
        borderRadius: radius.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: border,
      }}
    >
      {({ pressed }) => (
        <View
          style={{
            flex: 1,
            backgroundColor: bg,
            opacity: pressed ? 0.8 : 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.sm,
          }}
        >
          {isApple ? (
            <Ionicons name="logo-apple" size={18} color={fg} />
          ) : (
            <Ionicons name="logo-google" size={18} color="#4285F4" />
          )}
          <Text
            style={[
              typography.headline,
              { color: fg },
            ]}
          >
            Continuar con {isApple ? 'Apple' : 'Google'}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
