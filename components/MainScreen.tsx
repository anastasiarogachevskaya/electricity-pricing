import React, { useState, useEffect } from 'react';
import { getElectricityPrice } from '../api';
import { Wrapper, PriceText, StyledImage, DateText, TextWrapper } from './index';
import formatDate from '../utils/formatDate';

export default function MainScreen() {
  const [price, setPrice] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

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
