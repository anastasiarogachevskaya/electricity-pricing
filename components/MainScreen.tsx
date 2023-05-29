import React, { useState, useEffect } from 'react';
import { getElectricityPrice } from '../api';
import { Wrapper, PriceText, StyledImage, DateText, TextWrapper } from './index';
import { FontAwesome } from '@expo/vector-icons';

import formatDate from '../utils/formatDate';
import { View } from 'react-native';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';
import { SettingsButton } from './SettingsButton';
import Overlay from './Overlay';

export default function MainScreen() {
  const [price, setPrice] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

  const handleOpenWelcomeScreen = () => {
    setShowWelcomeScreen(true);
  };

  const handleCloseWelcomeScreen = () => {
    setShowWelcomeScreen(false);
  };


  useEffect(() => {
    const fetchPrice = async () => {
      const date = currentDate.toISOString().split('T')[0];
      const hour = currentDate.getHours();

      const data = await getElectricityPrice(date, hour);
      setPrice(data?.price);
    };

    fetchPrice();
  }, [currentDate]);

  return (
    <Wrapper price={price}>
      <SettingsButton onPress={handleOpenWelcomeScreen}>
        <FontAwesome name="cog" size={24} color="#000" />
      </SettingsButton>
      {/* Welcome screen overlay */}
      {showWelcomeScreen && (
        <Overlay>
          <WelcomeScreen onClose={handleCloseWelcomeScreen} onSaveUserName={() => console.log('hello')} />
        </Overlay>
      )}
      {price <= 0 && <StyledImage source={require('../assets/rainbow-battery.png')} />}
      {price > 0 && price < 5 && <StyledImage source={require('../assets/green-battery.png')} />}
      {price >= 5 && price < 10 && <StyledImage source={require('../assets/orange-battery.png')} />}
      {price >= 10 && <StyledImage source={require('../assets/red-battery.png')} />}
      <TextWrapper>
        <DateText>{formatDate(currentDate)}</DateText>
        <PriceText>{price} ¢</PriceText>
      </TextWrapper>
    </Wrapper>
  );
}
