/**
 * Vialink — PrimaryButton
 *
 * El botón filled brand de 50pt — la acción principal de cualquier pantalla.
 * Hereda los estados pressed (scale 0.98 + opacity 0.9) automáticamente.
 *
 * Uso:
 *   <PrimaryButton title="Empezar viaje" onPress={...} />
 *   <PrimaryButton title="Cargando..." loading onPress={...} />
 *   <PrimaryButton title="Continuar" disabled onPress={...} />
 */

import React from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
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

interface PrimaryButtonProps {
  title: string;
  onPress: (e?: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
  icon?: React.ReactNode;  // Opcional: SF Symbol u otro ícono a la izquierda
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  fullWidth = true,
  icon,
}: PrimaryButtonProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (disabled || loading) return;
    scale.value = withTiming(0.98, { duration: 100 });
    opacity.value = withTiming(0.9, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
    opacity.value = withTiming(1, { duration: 150 });
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled || loading) return;
    productHaptics.primaryAction();
    onPress(e);
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        {
          height: sizes.buttonPrimary,
          backgroundColor: theme.colors.brand,
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
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {icon}
          <Text
            style={{
              color: '#FFFFFF',
              ...typography.headline,
            }}
          >
            {title}
          </Text>
        </View>
      )}
    </AnimatedPressable>
  );
}
