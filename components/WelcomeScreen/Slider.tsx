import React from 'react';
import MultiSlider from '@react-native-community/slider';
import styled from 'styled-components/native';

const SliderContainer = styled.View`
  width: 80%;
  margin-top: 20px;
`;

const SliderValueText = styled.Text`
  font-size: 16px;
  margin-top: 10px;
`;

const SliderComponent = ({ values, onChange }) => {
  const handleSliderChange = (sliderValues) => {
    const roundedValues = sliderValues.map((value) => Math.round(value));
    onChange(roundedValues);
  };

  return (
    <SliderContainer>
      <MultiSlider
        values={values}
        onValuesChange={handleSliderChange}
        min={0}
        max={10}
        step={1}
        selectedStyle={{ backgroundColor: '#f39c12' }}
        unselectedStyle={{ backgroundColor: '#e74c3c' }}
        markerStyle={{ backgroundColor: '#f39c12' }}
      />
      <SliderValueText>Thresholds: {values[0]} - {values[1]}</SliderValueText>
    </SliderContainer>
  );
};

export default SliderComponent;
