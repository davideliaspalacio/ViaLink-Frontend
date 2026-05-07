import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  IconCircle,
  PrimaryButton,
  radius,
  SheetHeader,
  spacing,
  typography,
  useTheme,
} from '@/shared';

// US-020 · P15 · Modal Compartir viaje.
// Estados: Idle (sin compartir) · Activo (compartiendo).
// Idle: hero icon + destino/llegada + bullets privacidad + CTA "Compartir mi viaje".
// Activo: avatares con quien comparte + en vivo + "Detener compartir".

export function ShareTripSheet() {
  const theme = useTheme();
  const [active, setActive] = useState(false);

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}>
      <SheetHeader />
      <View
        style={{
          flex: 1,
          paddingHorizontal: spacing.xl,
          paddingTop: spacing.lg,
          gap: spacing.lg,
          alignItems: 'center',
        }}
      >
        <IconCircle
          icon={active ? 'aperture' : 'scan'}
          size="lg"
          tone={active ? 'success' : 'brand'}
          background={active ? 'tinted' : 'tinted'}
        />
        <Text
          style={[
            typography.title2,
            { color: theme.colors.textPrimary, textAlign: 'center' },
          ]}
        >
          {active ? 'Compartiendo tu viaje' : 'Comparte tu viaje en vivo'}
        </Text>
        {!active && (
          <Text
            style={[
              typography.body,
              { color: theme.colors.textSecondary, textAlign: 'center' },
            ]}
          >
            Quien reciba el enlace verá tu ubicación y llegada estimada hasta que termines.
          </Text>
        )}
        {active && (
          <Text
            style={[
              typography.subhead,
              { color: theme.colors.textSecondary, textAlign: 'center' },
            ]}
          >
            Hace 4 minutos · llegada estimada 9:42 AM
          </Text>
        )}

        {!active ? (
          <DestinationCard />
        ) : (
          <SharedWithCard />
        )}

        {!active ? (
          <View style={{ width: '100%', gap: spacing.xs, marginTop: spacing.md }}>
            <PrivacyBullet
              icon="time-outline"
              label="Se cierra solo al llegar"
            />
            <PrivacyBullet
              icon="eye-off-outline"
              label="Sin datos personales"
            />
          </View>
        ) : null}

        <View style={{ flex: 1 }} />

        <View style={{ width: '100%', gap: spacing.xs }}>
          {!active ? (
            <>
              <PrimaryButton
                title="Compartir mi viaje"
                icon={<Ionicons name="share-outline" size={16} color="#FFFFFF" />}
                onPress={() => setActive(true)}
              />
              <Pressable
                onPress={() => router.back()}
                style={{ paddingVertical: spacing.sm, alignItems: 'center' }}
              >
                <Text style={[typography.headline, { color: theme.colors.brand }]}>
                  Cancelar
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                onPress={() => {}}
                style={{
                  height: 50,
                  borderRadius: radius.md,
                  backgroundColor: `${theme.colors.brand}1F`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: spacing.sm,
                }}
              >
                <Ionicons name="share-outline" size={16} color={theme.colors.brand} />
                <Text style={[typography.headline, { color: theme.colors.brand }]}>
                  Compartir con alguien más
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setActive(false);
                  router.back();
                }}
                style={{ paddingVertical: spacing.sm, alignItems: 'center' }}
              >
                <Text style={[typography.headline, { color: theme.colors.danger }]}>
                  Detener compartir
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function DestinationCard() {
  const theme = useTheme();
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.md,
        borderRadius: radius.md,
        borderWidth: 0.5,
        borderColor: theme.colors.separator,
      }}
    >
      <View>
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
          Destino
        </Text>
        <Text style={[typography.headline, { color: theme.colors.textPrimary }]}>
          Universidad del Norte
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
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
          Llegada est.
        </Text>
        <Text
          style={[
            typography.headline,
            { color: theme.colors.brand, fontVariant: ['tabular-nums'] },
          ]}
        >
          9:42 AM
        </Text>
      </View>
    </View>
  );
}

function SharedWithCard() {
  const theme = useTheme();
  const contacts = [
    { name: 'Mamá', avatar: 'M', color: theme.colors.brand },
    { name: 'Pareja', avatar: 'V', color: theme.colors.accent },
  ];
  return (
    <View
      style={{
        width: '100%',
        padding: spacing.md,
        borderRadius: radius.md,
        backgroundColor: theme.colors.surfaceRaised,
        gap: spacing.sm,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
          Compartido con
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: theme.colors.success,
            }}
          />
          <Text style={[typography.caption1, { color: theme.colors.success }]}>
            EN VIVO
          </Text>
        </View>
      </View>
      {contacts.map((c) => (
        <View
          key={c.name}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: c.color,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
              {c.avatar}
            </Text>
          </View>
          <View>
            <Text style={[typography.headline, { color: theme.colors.textPrimary }]}>
              {c.name}
            </Text>
            <Text
              style={[typography.caption1, { color: theme.colors.textSecondary }]}
            >
              WhatsApp · hace 4 min
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function PrivacyBullet({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
      <Ionicons name={icon} size={16} color={theme.colors.textTertiary} />
      <Text style={[typography.subhead, { color: theme.colors.textSecondary }]}>
        {label}
      </Text>
    </View>
  );
}
