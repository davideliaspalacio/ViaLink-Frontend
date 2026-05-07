import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconCircle, radius, spacing, typography, useTheme } from '@/shared';

// US-008 · P6 · Quick row 3 cards iguales (Casa, Trabajo, +Agregar).
// Spec: gap 10pt entre cards · padding interno 10/8pt · IconCircle sm
// brand tinted al top · título headline + subtítulo caption tertiary.

export interface QuickCardItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  address?: string;
}

interface QuickCardProps {
  item: QuickCardItem;
  onPress?: (item: QuickCardItem) => void;
}

export function QuickCard({ item, onPress }: QuickCardProps) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={{ flex: 1, borderRadius: radius.md, overflow: 'hidden' }}
    >
      {({ pressed }) => (
        <View
          style={{
            minHeight: 104,
            backgroundColor: pressed
              ? theme.colors.surfaceElevated
              : theme.colors.surfaceRaised,
            paddingVertical: 10,
            paddingHorizontal: 8,
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 6,
          }}
        >
          <IconCircle icon={item.icon} size="sm" tone="brand" background="tinted" />
          <Text
            style={[
              typography.subhead,
              {
                color: theme.colors.textPrimary,
                fontWeight: '600',
                textAlign: 'center',
              },
            ]}
            numberOfLines={1}
          >
            {item.label}
          </Text>
          {item.address && (
            <Text
              style={[
                typography.caption1,
                { color: theme.colors.textTertiary, textAlign: 'center' },
              ]}
              numberOfLines={2}
            >
              {item.address}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

interface AddQuickCardProps {
  onPress?: () => void;
  label?: string;
  hint?: string;
}

export function AddQuickCard({
  onPress,
  label = 'Agregar lugar',
  hint = 'Universidad, gimnasio…',
}: AddQuickCardProps) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1, borderRadius: radius.md, overflow: 'hidden' }}
    >
      {({ pressed }) => (
        <View
          style={{
            minHeight: 104,
            backgroundColor: pressed
              ? theme.colors.surfaceElevated
              : theme.colors.surfaceRaised,
            paddingVertical: 10,
            paddingHorizontal: 8,
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 6,
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: `${theme.colors.brand}1F`,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="add" size={18} color={theme.colors.brand} />
          </View>
          <Text
            style={[
              typography.subhead,
              {
                color: theme.colors.textPrimary,
                fontWeight: '600',
                textAlign: 'center',
              },
            ]}
            numberOfLines={2}
          >
            {label}
          </Text>
          <Text
            style={[
              typography.caption1,
              { color: theme.colors.textTertiary, textAlign: 'center' },
            ]}
            numberOfLines={2}
          >
            {hint}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
