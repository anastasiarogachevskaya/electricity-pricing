import React from 'react';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  background-color: #000;
  padding: 10px 25px;
  border-radius: 5px;
  margin-bottom: 250px;
`;

const ButtonText = styled.Text`
  font-family: 'NanumGothic_800ExtraBold';
  color: #FFFFFF;
  font-size: 16px;
  text-transform: lowercase;
  letter-spacing:2px;

`;

const CustomButton = ({ title, onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default CustomButton;
