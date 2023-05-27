import React, { useState, useEffect } from 'react';
import {
  useFonts,
  NanumGothic_400Regular,
  NanumGothic_700Bold,
  NanumGothic_800ExtraBold,
} from '@expo-google-fonts/nanum-gothic';
import * as SplashScreen from 'expo-splash-screen';
import LoadingScreen from './components/LoadingScreen';
import MainScreen from './components/MainScreen';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    NanumGothic_400Regular,
    NanumGothic_700Bold,
    NanumGothic_800ExtraBold,
  });

  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  const handleSaveUserName = (userName) => {
    // Handle saving the user name here
    console.log('User name:', userName);
    setIsFirstTime(false);
  };

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return isFirstTime ? (
    <WelcomeScreen onSaveUserName={handleSaveUserName} />
  ) : (
    <MainScreen />
  );
}
