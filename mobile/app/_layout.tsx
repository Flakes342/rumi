import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Outfit-Light': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Outfit-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Outfit-Medium': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Outfit-SemiBold': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Outfit-Bold': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFF8F0' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="onboarding"
          options={{ animation: 'slide_from_right', gestureEnabled: false }}
        />
        <Stack.Screen
          name="reveal"
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ animation: 'fade', gestureEnabled: false }}
        />
      </Stack>
    </>
  );
}
