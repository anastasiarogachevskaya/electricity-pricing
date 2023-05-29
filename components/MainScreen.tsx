import React, { useState, useEffect } from 'react';
import { getElectricityPrice } from '../api';
import { Wrapper, PriceText, StyledImage, DateText, TextWrapper } from './index';
import { FontAwesome } from '@expo/vector-icons';

import formatDate from '../utils/formatDate';
import WelcomeScreen from './SettingsScreen/SettingsScreen';
import { SettingsButton } from './SettingsButton';
import Overlay from './Overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen() {
  const [price, setPrice] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [cautionLimit, setCautionLimit] = useState('');
  const [dangerLimit, setDangerLimit] = useState('');

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const savedCautionLimit = await AsyncStorage.getItem('cautionLimit');
        const savedDangerLimit = await AsyncStorage.getItem('dangerLimit');

        setCautionLimit(savedCautionLimit);
        setDangerLimit(savedDangerLimit);
      } catch (error) {
        console.log('Error retrieving data from AsyncStorage:', error);
      }
    };

    retrieveData();
  }, []);

  const handleOpenSettingsScreen = () => {
    setShowWelcomeScreen(true);
  };

  const handCloseSettingsScreen = () => {
    setShowWelcomeScreen(false);
  };


  useEffect(() => {
    const fetchPrice = async () => {
      const date = currentDate.toISOString().split('T')[0];
      const hour = currentDate.getHours();

      const data = await getElectricityPrice(date, hour);
      // setPrice(data?.price);
      // setPrice(-1.299);
      // setPrice(2.123);
      // setPrice(6.123);
      // setPrice(12.123);
      setPrice(25.123);
    };

    fetchPrice();
  }, [currentDate]);

  return (
    <Wrapper price={price} cautionLimit={cautionLimit} dangerLimit={dangerLimit}>
      <SettingsButton onPress={handleOpenSettingsScreen}>
        <FontAwesome name="cog" size={24} color="#000" />
      </SettingsButton>
      {/* Welcome screen overlay */}
      {showWelcomeScreen && (
        <Overlay>
          <WelcomeScreen onClose={handCloseSettingsScreen} />
        </Overlay>
      )}
      {price <= 0 && <StyledImage source={require('../assets/rainbow-battery.png')} />}
      {price > 0 && price < cautionLimit && <StyledImage source={require('../assets/green-battery.png')} />}
      {price >= cautionLimit && price < dangerLimit && <StyledImage source={require('../assets/orange-battery.png')} />}
      {price >= dangerLimit && <StyledImage source={require('../assets/red-battery.png')} />}
      <TextWrapper>
        <DateText>{formatDate(currentDate)}</DateText>
        <PriceText>{price} ¢</PriceText>
      </TextWrapper>
    </Wrapper>
  );
}
