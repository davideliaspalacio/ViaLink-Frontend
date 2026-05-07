import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { WebPhoneFrame } from '@/shared';
import { useColorScheme } from '../hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(onboarding)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WebPhoneFrame>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="stop/[id]"
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen name="route/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="route-options" options={{ headerShown: false }} />
          <Stack.Screen name="route-detail" options={{ headerShown: false }} />
          <Stack.Screen name="active-trip" options={{ headerShown: false }} />
          <Stack.Screen
            name="share-trip"
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name="assistant"
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name="report"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="save-destination"
            options={{
              presentation: 'transparentModal',
              headerShown: false,
              animation: 'fade',
            }}
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </WebPhoneFrame>
    </GestureHandlerRootView>
  );
}
