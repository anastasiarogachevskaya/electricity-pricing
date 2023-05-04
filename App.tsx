import React, { useState, useEffect } from 'react';
import { getElectricityPrice } from './api';
import Wrapper from './components/Wrapper';
import PriceText from './components/PriceText';

function App() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const currentDate = new Date();
      const date = currentDate.toISOString().split('T')[0];
      const hour = currentDate.getHours();
    
      const data = await getElectricityPrice(date, hour);
      setPrice(data?.price);
    };
    fetchPrice();
  }, []);

  return (
    <Wrapper price={price}>
      <PriceText>{price}</PriceText>
    </Wrapper>
  );
}

export default App;
