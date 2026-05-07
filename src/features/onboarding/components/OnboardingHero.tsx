import { View } from 'react-native';
import { Image } from 'expo-image';

type Variant = 'route' | 'multiroute' | 'card';

const SOURCES = {
  route: require('../../../../assets/images/onboarding1.png'),
  multiroute: require('../../../../assets/images/onboarding2.png'),
  card: require('../../../../assets/images/onboarding3.png'),
} as const;

const HERO_HEIGHT = 320;

export function OnboardingHero({ variant }: { variant: Variant }) {
  return (
    <View style={{ height: HERO_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={SOURCES[variant]}
        style={{ width: '100%', height: '100%' }}
        contentFit="contain"
      />
    </View>
  );
}
