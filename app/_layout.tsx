import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from '@/Redux/Store';
import { Font } from '@/Font';
import { Colors } from '@/Theme';
import { StatusBar, View, Dimensions, Image } from 'react-native';
import { PaperProvider } from 'react-native-paper';
const { width, height } = Dimensions.get('window')

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const Splash = require("../assets/images/splash.png")
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    OutfitBlack: require('../assets/fonts/Outfit-Black.ttf'),
    OutfitBold: require('../assets/fonts/Outfit-Bold.ttf'),
    OutfitExtraBold: require('../assets/fonts/Outfit-ExtraBold.ttf'),
    OutfitExtraLight: require('../assets/fonts/Outfit-ExtraLight.ttf'),
    OutfitSemiBold: require('../assets/fonts/Outfit-SemiBold.ttf'),
    OutfitLight: require('../assets/fonts/Outfit-Light.ttf'),
    OutfitThin: require('../assets/fonts/Outfit-Thin.ttf'),
    OutfitRegular: require('../assets/fonts/Outfit-Regular.ttf'),
    OutfitMedium: require('../assets/fonts/Outfit-Medium.ttf'),
    PermanentMarkerRegular: require('../assets/fonts/PermanentMarker-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View style={{ height, width }}>
        <Image source={Splash} />
      </View>
    )
  }

  const globalHeaderStyles = {
    headerStyle: {
      backgroundColor: colorScheme === 'dark' ? Colors.BLACK : Colors.WHITE,
    },
    headerTitleStyle: {
      fontFamily: Font.Medium,
      fontSize: 20,
      color: colorScheme === 'dark' ? Colors.WHITE : Colors.BLACK,
    },
    headerTintColor: colorScheme === 'dark' ? Colors.WHITE : Colors.BLACK,
  };

  return (
    <PaperProvider theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={colorScheme === 'dark' ? Colors.BLACK : Colors.WHITE}
        />
        <Provider store={store}>
          <Stack screenOptions={globalHeaderStyles}>
            <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="Allproducts" options={{ headerShown: false }} />
            <Stack.Screen name="Product" options={{ headerShown: false }} />
            <Stack.Screen name="Login" options={{ headerShown: false }} />
            <Stack.Screen name="Signup" options={{ headerShown: false }} />
            <Stack.Screen name="Paymentpage" options={{ headerShown: false }} />
            <Stack.Screen name="Address" options={{ headerShown: false }} />
            <Stack.Screen name="Alladdress" options={{ headerShown: false }} />
            <Stack.Screen name="Account" />
            <Stack.Screen name="OrderPlaced" options={{ headerShown: false }} />
            <Stack.Screen name="productpage/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="orderdetail/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="CategoryProduct" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
