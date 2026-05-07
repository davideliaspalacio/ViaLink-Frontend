import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  IconCircle,
  PrimaryButton,
  radius,
  spacing,
  typography,
  useTheme,
} from '@/shared';

// US-023/024 · P16 · Tab Perfil.
// Estados: invitado (CTA grande iniciar sesión) · logueado (avatar + secciones).
// Hoy mock: state hardcoded a 'guest'. Cuando exista auth, leer de session.

const MOCK_LOGGED_IN = false;

export function ProfileScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <View
        style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.md,
          paddingBottom: spacing.md,
        }}
      >
        <Text style={[typography.largeTitle, { color: theme.colors.textPrimary }]}>
          Perfil
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.huge }}>
        {MOCK_LOGGED_IN ? <LoggedInView /> : <GuestView />}

        <Section title="Configuración">
          <SettingRow icon="moon-outline" label="Modo oscuro" trailing="Auto" />
          <Separator />
          <SettingRow icon="notifications-outline" label="Notificaciones" />
          <Separator />
          <SettingRow icon="language-outline" label="Idioma" trailing="Español" />
        </Section>

        <Section title="Acerca de">
          <SettingRow icon="information-circle-outline" label="Sobre Vialink" />
          <Separator />
          <SettingRow icon="document-text-outline" label="Términos de servicio" />
          <Separator />
          <SettingRow icon="lock-closed-outline" label="Política de privacidad" />
        </Section>

        <Text
          style={[
            typography.caption1,
            {
              color: theme.colors.textTertiary,
              textAlign: 'center',
              marginTop: spacing.xxxl,
            },
          ]}
        >
          Vialink · v0.1.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function GuestView() {
  const theme = useTheme();
  return (
    <View
      style={{
        marginHorizontal: spacing.lg,
        padding: spacing.xl,
        borderRadius: radius.lg,
        backgroundColor: theme.colors.surfaceRaised,
        alignItems: 'center',
        gap: spacing.md,
      }}
    >
      <IconCircle icon="person-circle-outline" size="lg" tone="brand" background="elevated" />
      <Text
        style={[
          typography.title3,
          { color: theme.colors.textPrimary, textAlign: 'center' },
        ]}
      >
        Inicia sesión para guardar tus rutas
      </Text>
      <Text
        style={[
          typography.subhead,
          { color: theme.colors.textSecondary, textAlign: 'center' },
        ]}
      >
        Sincroniza paraderos, rutas y comparte viajes en cualquier dispositivo.
      </Text>
      <PrimaryButton
        title="Iniciar sesión"
        onPress={() => router.push('/login?context=bookmark')}
      />
    </View>
  );
}

function LoggedInView() {
  const theme = useTheme();
  return (
    <View
      style={{
        marginHorizontal: spacing.lg,
        padding: spacing.lg,
        borderRadius: radius.lg,
        backgroundColor: theme.colors.surfaceRaised,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
      }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: theme.colors.brand,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700' }}>E</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[typography.headline, { color: theme.colors.textPrimary }]}>
          Elias Palacio
        </Text>
        <Text style={[typography.subhead, { color: theme.colors.textSecondary }]}>
          gamerpg08@gmail.com
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={14} color={theme.colors.textTertiary} />
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <View style={{ marginTop: spacing.xxl }}>
      <Text
        style={[
          typography.footnoteSemibold,
          {
            color: theme.colors.textTertiary,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            paddingHorizontal: spacing.lg,
            paddingBottom: spacing.sm,
          },
        ]}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function SettingRow({
  icon,
  label,
  trailing,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  trailing?: string;
}) {
  const theme = useTheme();
  return (
    <Pressable onPress={() => {}}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
            paddingHorizontal: spacing.lg,
            height: 44,
            backgroundColor: pressed ? theme.colors.surfaceRaised : 'transparent',
          }}
        >
          <Ionicons name={icon} size={20} color={theme.colors.textSecondary} />
          <Text
            style={[typography.body, { color: theme.colors.textPrimary, flex: 1 }]}
          >
            {label}
          </Text>
          {trailing && (
            <Text style={[typography.subhead, { color: theme.colors.textSecondary }]}>
              {trailing}
            </Text>
          )}
          <Ionicons name="chevron-forward" size={14} color={theme.colors.textTertiary} />
        </View>
      )}
    </Pressable>
  );
}

function Separator() {
  const theme = useTheme();
  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: theme.colors.separator,
        marginLeft: 52,
      }}
    />
  );
}
