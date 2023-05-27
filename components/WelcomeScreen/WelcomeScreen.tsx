import React, { useState } from 'react';
import { Container } from './Container';
import { Heading1,Heading2,  StyledInput, StyledInputRange, TextContainer, PriceContainer} from './Typography';
import CustomButton from './CustomButton';

const WelcomeScreen = ({ onSaveUserName }) => {
  const [userName, setUserName] = useState('');
  const [cautionLimit, setCautionLimit] = useState('');
  const [dangerLimit, setDangerLimit] = useState('');

  const handleLimitChange = (text, limitType) => {
    let value = parseInt(text);
    if (isNaN(value) || value > 50) {
      value = 50;
    }
  
    if (limitType === 'caution') {
      setCautionLimit(value.toString());
    } else if (limitType === 'danger') {
      setDangerLimit(value.toString());
    }
  };
  

  const handleSave = () => {
    // Handle save action here
    console.log('User name:', userName);
  };

  return (
    <Container>
      <TextContainer>
        <Heading1>Hey, </Heading1>
        <StyledInput
          value={userName}
          onChangeText={setUserName}
          placeholder="User"
          id="userName"
          placeholderTextColor="#666"
        />
      </TextContainer>

      <PriceContainer>
      <Heading1>Pick your price sensitivity limits:</Heading1>
      <TextContainer>
        <Heading2>Caution Zone: </Heading2>
        <StyledInputRange
          value={cautionLimit.toString()}
          onChangeText={(text) => handleLimitChange(text, 'caution')}
          id="cautionLimit"
          placeholder="10"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
        <Heading2>¢</Heading2>
      </TextContainer>
      <TextContainer>
        <Heading2>Danger Zone: </Heading2>
        <StyledInputRange
          value={dangerLimit.toString()}
          onChangeText={(text) => handleLimitChange(text, 'danger')}
          id="dangerLimit"
          placeholder="20"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
        <Heading2>¢</Heading2>
      </TextContainer>
      </PriceContainer>
      <CustomButton title="Save" onPress={handleSave} />
    </Container>
  );
};

export default WelcomeScreen;
