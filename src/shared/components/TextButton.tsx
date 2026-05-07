/**
 * Vialink — TextButton
 *
 * Botón terciario solo de texto, sin fondo. Para acciones de baja prioridad
 * o como secundarias dentro de un modal: "Saltar", "Ahora no", "Cancelar".
 *
 * Uso:
 *   <TextButton title="Saltar" onPress={...} />
 *   <TextButton title="Cancelar viaje" tone="danger" onPress={...} />
 */

import React from 'react';
import { Pressable, Text, ViewStyle, GestureResponderEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { typography, productHaptics } from '../theme';

type TextButtonTone = 'brand' | 'secondary' | 'danger';

interface TextButtonProps {
  title: string;
  onPress: (e?: GestureResponderEvent) => void;
  tone?: TextButtonTone;
  disabled?: boolean;
  style?: ViewStyle;
  height?: number;
  align?: 'left' | 'center' | 'right';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TextButton({
  title,
  onPress,
  tone = 'brand',
  disabled = false,
  style,
  height = 44,
  align = 'center',
}: TextButtonProps) {
  const theme = useTheme();
  const opacity = useSharedValue(1);

  const toneColor = {
    brand: theme.colors.brand,
    secondary: theme.colors.textSecondary,
    danger: theme.colors.danger,
  }[tone];

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (disabled) return;
    opacity.value = withTiming(0.6, { duration: 80 });
  };

  const handlePressOut = () => {
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
          height,
          alignItems: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
          justifyContent: 'center',
        },
        disabled && { opacity: 0.4 },
        animatedStyle,
        style,
      ]}
    >
      <Text
        style={{
          color: toneColor,
          ...typography.body,
        }}
      >
        {title}
      </Text>
    </AnimatedPressable>
  );
}
