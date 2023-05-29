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
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

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

  const handleToggleWelcomeScreen = () => {
    setShowWelcomeScreen((prevValue) => !prevValue);
  };

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  if (isFirstTime || showWelcomeScreen) {
    return (
      <WelcomeScreen onSaveUserName={handleSaveUserName} onClose={handleToggleWelcomeScreen} />
    );
  }

  return (
    <>
      <MainScreen />
      {/* Add your setting button here to toggle the WelcomeScreen */}
    </>
  );
}
