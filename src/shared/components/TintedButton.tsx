/**
 * Vialink — TintedButton
 *
 * Botón secundario con fondo brand opacity baja y texto en brand.
 * Para acciones secundarias: "Compartir viaje", "Cancelar viaje", "Iniciar viaje desde aquí".
 *
 * Uso:
 *   <TintedButton title="Compartir viaje" onPress={...} />
 *   <TintedButton title="Cancelar viaje" tone="danger" onPress={...} />
 */

import React from 'react';
import {
  Pressable,
  Text,
  View,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { typography, sizes, radius, productHaptics } from '../theme';

type TintedTone = 'brand' | 'danger' | 'success' | 'warning';

interface TintedButtonProps {
  title: string;
  onPress: (e?: GestureResponderEvent) => void;
  tone?: TintedTone;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TintedButton({
  title,
  onPress,
  tone = 'brand',
  disabled = false,
  style,
  fullWidth = true,
  icon,
}: TintedButtonProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Mapeo de tones a colores
  const toneColor = {
    brand: theme.colors.brand,
    danger: theme.colors.danger,
    success: theme.colors.success,
    warning: theme.colors.warning,
  }[tone];

  // Background con opacity baja para el efecto tinted
  const backgroundColor = `${toneColor}1F`; // 12% opacity en hex

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withTiming(0.98, { duration: 100 });
    opacity.value = withTiming(0.85, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
    opacity.value = withTiming(1, { duration: 150 });
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return;
    productHaptics.buttonPress();
    onPress(e);
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        {
          height: sizes.buttonPrimary,
          backgroundColor,
          borderRadius: radius.md,
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: fullWidth ? '100%' : 'auto',
        },
        disabled && { opacity: 0.4 },
        animatedStyle,
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {icon}
        <Text
          style={{
            color: toneColor,
            ...typography.headline,
          }}
        >
          {title}
        </Text>
      </View>
    </AnimatedPressable>
  );
}
