import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export {
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    // Hide splash once fonts are ready. Keeps initial paint clean.
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutTabs />;
}

function RootLayoutTabs() {
  const colorScheme = useColorScheme();

  return (
    // Provide safe-area metrics (status bar / notch) to the app
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Tabs are our root navigator */}
        <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Simple icons for the two visible tabs
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'index') {
              return <FontAwesome name="home" color={color} size={size} />;
            }
            if (route.name === 'profile') {
              return <FontAwesome name="user" color={color} size={size} />;
            }
            return null;
          },
        })}
        >
          {/*
            Only `index` and `profile` are navigable.
            The "+html" and "+not-found" routes are internal and hidden from the tab bar.
          */}
          <Tabs.Screen name="index" options={{ title: 'Home' }} />
          <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
          <Tabs.Screen name="+not-found" options={{ href: null }} />
        </Tabs>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
