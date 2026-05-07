import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton, radius, SheetHeader, spacing, typography, useTheme } from '@/shared';

// US-019 · P14 · Modal Reportar incidencia.
// Sheet contextual sobre P5/P10 con grid 2x3. Tonos warning/danger según
// severidad. Tras tap categoría → confirmación checkmark + auto-cierre.

type ReportKind = 'bus_lleno' | 'trancon' | 'bloqueo' | 'bus_no_llego' | 'bus_danado' | 'otro';

interface ReportOption {
  kind: ReportKind;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone: 'warning' | 'danger' | 'secondary';
}

const OPTIONS: ReportOption[] = [
  { kind: 'bus_lleno', label: 'Bus lleno', icon: 'people', tone: 'warning' },
  { kind: 'trancon', label: 'Trancón', icon: 'car', tone: 'warning' },
  { kind: 'bloqueo', label: 'Bloqueo de vía', icon: 'warning', tone: 'danger' },
  { kind: 'bus_no_llego', label: 'Bus no llegó', icon: 'time', tone: 'danger' },
  { kind: 'bus_danado', label: 'Bus dañado', icon: 'construct', tone: 'secondary' },
  { kind: 'otro', label: 'Otro', icon: 'ellipsis-horizontal-circle', tone: 'secondary' },
];

export function ReportSheet() {
  const theme = useTheme();
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (_kind: ReportKind) => {
    // TODO: enviar reporte al backend.
    setConfirmed(true);
    setTimeout(() => router.back(), 1800);
  };

  if (confirmed) {
    return <ConfirmView />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <SheetHeader />
      <View
        style={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.md,
          paddingBottom: spacing.md,
        }}
      >
        <Text style={[typography.title2, { color: theme.colors.textPrimary }]}>
          ¿Qué está pasando?
        </Text>
        <Text
          style={[
            typography.subhead,
            { color: theme.colors.textSecondary, marginTop: spacing.xs },
          ]}
        >
          Tu reporte ayuda a otros usuarios. Toca una opción.
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: spacing.lg,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: spacing.md,
        }}
      >
        {OPTIONS.map((opt) => (
          <ReportCard key={opt.kind} option={opt} onPress={() => handleSelect(opt.kind)} />
        ))}
      </View>
    </SafeAreaView>
  );
}

function ReportCard({
  option,
  onPress,
}: {
  option: ReportOption;
  onPress: () => void;
}) {
  const theme = useTheme();
  const iconColor = {
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    secondary: theme.colors.textSecondary,
  }[option.tone];

  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '47%',
        aspectRatio: 1,
        borderRadius: radius.lg,
        overflow: 'hidden',
      }}
    >
      {({ pressed }) => (
        <View
          style={{
            flex: 1,
            backgroundColor: pressed
              ? theme.colors.surfaceElevated
              : theme.colors.surfaceRaised,
            padding: spacing.md,
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: `${iconColor}26`,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name={option.icon} size={18} color={iconColor} />
          </View>
          <Text
            style={[
              typography.headline,
              { color: theme.colors.textPrimary },
            ]}
          >
            {option.label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

function ConfirmView() {
  const theme = useTheme();
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{
        flex: 1,
        backgroundColor: theme.colors.surfaceBase,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xxxl,
        gap: spacing.md,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.colors.success,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="checkmark" size={36} color="#FFFFFF" />
      </View>
      <Text style={[typography.title2, { color: theme.colors.textPrimary }]}>
        ¡Gracias por reportar!
      </Text>
      <Text
        style={[
          typography.body,
          { color: theme.colors.textSecondary, textAlign: 'center' },
        ]}
      >
        Tu reporte ayuda a la comunidad. Estamos validándolo con otros usuarios cercanos.
      </Text>
      <View style={{ height: spacing.md }} />
      <PrimaryButton title="Listo" onPress={() => router.back()} />
    </SafeAreaView>
  );
}
