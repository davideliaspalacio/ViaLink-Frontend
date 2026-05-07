import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { IconCircle, radius, spacing, typography, useTheme } from '@/shared';

// US-013 · Modal Guardar destino.
// Modal compacto centrado (no sheet). 4 categorías predefinidas + Otro
// con etiqueta personalizada + CTA "Guardar sin categoría".
// TODO: persistir destino en storage cuando exista.

type Category = 'casa' | 'trabajo' | 'universidad' | 'familiar' | 'otro';

interface CategoryOption {
  kind: Category;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const CATEGORIES: CategoryOption[] = [
  { kind: 'casa', label: 'Casa', icon: 'home' },
  { kind: 'trabajo', label: 'Trabajo', icon: 'briefcase' },
  { kind: 'universidad', label: 'Universidad', icon: 'school' },
  { kind: 'familiar', label: 'Familiar', icon: 'heart' },
];

export function SaveDestinationModal() {
  const theme = useTheme();
  const [selected, setSelected] = useState<Category | null>(null);
  const [customLabel, setCustomLabel] = useState('');
  const [confirmedLabel, setConfirmedLabel] = useState<string | null>(null);

  if (confirmedLabel) {
    return <ConfirmView label={confirmedLabel} />;
  }

  const handleSave = (cat: Category, label: string) => {
    // TODO: persistir.
    setConfirmedLabel(label);
    setTimeout(() => router.back(), 1200);
  };

  return (
    <Pressable
      onPress={() => router.back()}
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xxxl,
      }}
    >
      <Pressable
        onPress={() => {}}
        style={{
          width: '100%',
          maxWidth: 320,
          backgroundColor: theme.colors.surfaceBase,
          borderRadius: 18,
          padding: spacing.xxl,
          gap: spacing.md,
          alignItems: 'center',
        }}
      >
        <IconCircle icon="bookmark" size="lg" tone="brand" background="elevated" />
        <Text
          style={[
            typography.headline,
            { color: theme.colors.textPrimary, textAlign: 'center' },
          ]}
        >
          Guardar este paradero
        </Text>
        <Text
          style={[
            typography.subhead,
            {
              color: theme.colors.textSecondary,
              textAlign: 'center',
            },
          ]}
        >
          Elige una categoría para encontrarlo más rápido.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: spacing.md,
            marginTop: spacing.sm,
          }}
        >
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.kind}
              option={c}
              onPress={() => handleSave(c.kind, c.label)}
            />
          ))}
        </View>

        <Pressable
          onPress={() => setSelected(selected === 'otro' ? null : 'otro')}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.sm,
            paddingVertical: spacing.sm + 2,
            paddingHorizontal: spacing.md,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: selected === 'otro' ? theme.colors.brand : theme.colors.separator,
          }}
        >
          <Ionicons
            name="pricetag"
            size={14}
            color={selected === 'otro' ? theme.colors.brand : theme.colors.textTertiary}
          />
          {selected === 'otro' ? (
            <TextInput
              autoFocus
              value={customLabel}
              onChangeText={setCustomLabel}
              onSubmitEditing={() =>
                customLabel.trim() && handleSave('otro', customLabel.trim())
              }
              placeholder="Casa de mi mamá"
              placeholderTextColor={theme.colors.textTertiary}
              style={[
                typography.subhead,
                { flex: 1, color: theme.colors.textPrimary, paddingVertical: 0 },
              ]}
              returnKeyType="done"
            />
          ) : (
            <Text
              style={[
                typography.subhead,
                { color: theme.colors.textSecondary, flex: 1 },
              ]}
            >
              Otro (con etiqueta personalizada)
            </Text>
          )}
        </Pressable>

        <Pressable
          hitSlop={8}
          onPress={() => handleSave('otro', 'Sin categoría')}
          style={{ paddingTop: spacing.sm }}
        >
          <Text style={[typography.headline, { color: theme.colors.brand }]}>
            Guardar sin categoría
          </Text>
        </Pressable>
      </Pressable>
    </Pressable>
  );
}

function CategoryCard({
  option,
  onPress,
}: {
  option: CategoryOption;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 130,
        height: 80,
        borderRadius: radius.md,
        overflow: 'hidden',
        backgroundColor: theme.colors.surfaceRaised,
      }}
    >
      {({ pressed }) => (
        <View
          style={{
            flex: 1,
            backgroundColor: pressed ? theme.colors.surfaceElevated : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing.xs,
          }}
        >
          <Ionicons name={option.icon} size={20} color={theme.colors.brand} />
          <Text
            style={[
              typography.subhead,
              { color: theme.colors.textPrimary, fontWeight: '600' },
            ]}
          >
            {option.label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

function ConfirmView({ label }: { label: string }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xxxl,
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 280,
          backgroundColor: theme.colors.surfaceBase,
          borderRadius: 18,
          paddingVertical: spacing.xxl,
          paddingHorizontal: spacing.xl,
          alignItems: 'center',
          gap: spacing.md,
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: theme.colors.success,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="checkmark" size={32} color="#FFFFFF" />
        </View>
        <Text
          style={[
            typography.title2,
            { color: theme.colors.textPrimary, textAlign: 'center' },
          ]}
        >
          Guardado en {label}
        </Text>
        <Text
          style={[
            typography.footnote,
            { color: theme.colors.textSecondary, textAlign: 'center' },
          ]}
        >
          Lo encontrarás en Guardados
        </Text>
      </View>
    </View>
  );
}
