import { useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  PrimaryButton,
  TextButton,
  spacing,
  typography,
  useTheme,
} from '@/shared';
import { OnboardingHero } from '../components/OnboardingHero';
import { PageIndicator } from '../components/PageIndicator';

type Slide = {
  hero: 'route' | 'multiroute' | 'card';
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    hero: 'route',
    title: 'Sabe por dónde viene\ntu bus',
    body: 'En tiempo real, en tu ciudad, con la información que te falta hoy.',
  },
  {
    hero: 'multiroute',
    title: 'También los buses que\nnadie rastrea',
    body: 'Buses tradicionales, colectivos y rutas alimentadoras. Los que tomas todos los días.',
  },
  {
    hero: 'card',
    title: 'Llega más rápido. Y más\ntranquilo.',
    body: 'Vialink reduce el tiempo que pierdes esperando, sin que tengas que pensar.',
  },
];

export function OnboardingPager() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== index) setIndex(next);
  };

  const goNext = () => {
    if (isLast) {
      router.push('/(onboarding)/permission');
      return;
    }
    listRef.current?.scrollToIndex({ index: index + 1, animated: true });
  };

  const skip = () => {
    router.replace('/(tabs)');
  };

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={{ width, paddingHorizontal: spacing.xl, gap: spacing.xl }}>
      <View style={{ marginTop: spacing.huge }}>
        <OnboardingHero variant={item.hero} />
      </View>
      <View style={{ gap: spacing.md }}>
        <Text style={[typography.title1, { color: theme.colors.textPrimary }]}>
          {item.title}
        </Text>
        <Text style={[typography.body, { color: theme.colors.textSecondary }]}>
          {item.body}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={{ flex: 1, backgroundColor: theme.colors.surfaceBase }}
    >
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      />
      <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.lg, gap: spacing.lg }}>
        <PageIndicator count={SLIDES.length} activeIndex={index} />
        <PrimaryButton
          title={isLast ? 'Empezar' : 'Continuar'}
          onPress={goNext}
        />
        <TextButton title="Saltar" onPress={skip} />
      </View>
    </SafeAreaView>
  );
}
