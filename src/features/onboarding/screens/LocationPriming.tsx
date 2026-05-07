import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  IconCircle,
  PrimaryButton,
  TextButton,
  productHaptics,
  spacing,
  typography,
  useTheme,
} from '@/shared';

// US-002 · P4 · Priming de ubicación.
// Spec PDF Sprint 1: pre-permission UI antes del prompt nativo.
// TODO: cuando se agregue expo-location al proyecto, llamar
// `Location.requestForegroundPermissionsAsync()` desde handlePermit y
// disparar haptics.success al conceder. Por ahora se simula el flujo.

interface Bullet {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

const BULLETS: Bullet[] = [
  { icon: 'eye-off-outline', text: 'Nunca compartimos tu ubicación con nadie.' },
  { icon: 'flash-off-outline', text: 'No drena tu batería en segundo plano.' },
  { icon: 'hand-left-outline', text: 'Puedes cambiarlo cuando quieras.' },
];

export function LocationPriming() {
  const theme = useTheme();

  const finish = () => {
    router.replace('/(tabs)');
  };

  const handlePermit = () => {
    productHaptics.primaryAction();
    // TODO: integrar expo-location y solicitar permiso real.
    // Al conceder: productHaptics.reportConfirm() (success haptic).
    finish();
  };

  const handleSkip = () => {
    productHaptics.buttonPress();
    finish();
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}
    >
      <View style={{ flex: 1, paddingHorizontal: spacing.xxxl, paddingTop: spacing.huge }}>
        <View style={{ alignItems: 'center', gap: spacing.xl }}>
          <IconCircle icon="navigate" size="xl" tone="brand" background="elevated" />
          <Text
            style={[
              typography.title1,
              { color: theme.colors.textPrimary, textAlign: 'center' },
            ]}
          >
            ¿Dónde estás ahora?
          </Text>
          <Text
            style={[
              typography.body,
              { color: theme.colors.textSecondary, textAlign: 'center' },
            ]}
          >
            Vialink usa tu ubicación para mostrarte los buses cerca y calcular cuánto se demoran en
            llegar. Solo cuando la app está abierta.
          </Text>
        </View>

        <View style={{ marginTop: spacing.huge, gap: 18 }}>
          {BULLETS.map((b) => (
            <View
              key={b.icon}
              style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}
            >
              <Ionicons name={b.icon} size={18} color={theme.colors.textSecondary} />
              <Text style={[typography.footnote, { color: theme.colors.textSecondary, flex: 1 }]}>
                {b.text}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ flex: 1 }} />

        <View style={{ gap: spacing.sm, paddingBottom: spacing.lg }}>
          <PrimaryButton title="Permitir ubicación" onPress={handlePermit} />
          <TextButton title="Ahora no" onPress={handleSkip} />
        </View>
      </View>
    </SafeAreaView>
  );
}
