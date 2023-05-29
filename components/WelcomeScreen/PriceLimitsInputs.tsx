// PriceLimitsInputs.js

import React from 'react';
import { Heading2, TextContainer, StyledInputRange } from './Typography';

const PriceLimitsInputs = ({ cautionLimit, dangerLimit, onLimitChange }) => {
  return (
    <>
      <TextContainer>
        <Heading2>Caution Zone </Heading2>
        <StyledInputRange
          value={cautionLimit}
          onChangeText={(text) => onLimitChange(text, 'caution')}
          id="cautionLimit"
          placeholder="10"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
        <Heading2>¢</Heading2>
      </TextContainer>
      <TextContainer>
        <Heading2>Danger Zone </Heading2>
        <StyledInputRange
          value={dangerLimit}
          onChangeText={(text) => onLimitChange(text, 'danger')}
          id="dangerLimit"
          placeholder="20"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
        <Heading2>¢</Heading2>
      </TextContainer>
    </>
  );
};

export default PriceLimitsInputs;
