import { View } from 'react-native';
import { useTheme } from '@/shared';

interface PageIndicatorProps {
  count: number;
  activeIndex: number;
}

export function PageIndicator({ count, activeIndex }: PageIndicatorProps) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: count }).map((_, i) => {
        const active = i === activeIndex;
        return (
          <View
            key={i}
            style={{
              width: active ? 8 : 6,
              height: active ? 8 : 6,
              borderRadius: 999,
              backgroundColor: active ? theme.colors.brand : theme.colors.textTertiary,
              opacity: active ? 1 : 0.5,
            }}
          />
        );
      })}
    </View>
  );
}
