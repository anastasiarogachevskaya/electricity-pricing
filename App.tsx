import React from 'react';
import {
  useFonts,
  NanumGothic_400Regular,
  NanumGothic_700Bold,
  NanumGothic_800ExtraBold,
} from '@expo-google-fonts/nanum-gothic';
import * as SplashScreen from 'expo-splash-screen';
import LoadingScreen from './components/LoadingScreen';
import MainScreen from './components/MainScreen';

export default function App() {
  let [fontsLoaded] = useFonts({
    NanumGothic_400Regular,
    NanumGothic_700Bold,
    NanumGothic_800ExtraBold,
  });

  React.useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return <MainScreen />;
}
