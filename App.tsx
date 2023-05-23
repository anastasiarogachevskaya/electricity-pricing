import React, { useState, useEffect } from 'react';
import { getElectricityPrice } from './api';
import Wrapper from './components/Wrapper';
import PriceText from './components/PriceText';
import DateText from './components/DateText';
import StyledImage from './components/StyledImage';
import formatDate from './utils/formatDate';

function App() {
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
      <DateText>{formatDate(currentDate)}</DateText>
      {price < 5 && <StyledImage source={require('./assets/green-battery.png')} />}
      {price >= 5 && price < 10 && <StyledImage source={require('./assets/orange-battery.png')} />}
      {price >= 10 && <StyledImage source={require('./assets/red-battery.png')} />}
      <PriceText>{price}</PriceText>
    </Wrapper>
  );
}

export default App;
