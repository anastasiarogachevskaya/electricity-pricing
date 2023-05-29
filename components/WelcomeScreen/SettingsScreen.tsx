import React, { useState } from 'react';
import { Container } from './Container';
import { Heading1, PriceContainer } from './Typography';
import CustomButton from './CustomButton';
import UserNameInput from './UserNameInput';
import PriceLimitsInputs from './PriceLimitsInputs';

interface WelcomeScreenProps {
  onSaveUserName: (userName: string) => void;
  onClose: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSaveUserName, onClose }) => {
  const [userName, setUserName] = useState('');
  const [cautionLimit, setCautionLimit] = useState('');
  const [dangerLimit, setDangerLimit] = useState('');

  const handleLimitChange = (value: string, limitType: 'caution' | 'danger') => {
    if (limitType === 'caution') {
      setCautionLimit(value);
    } else if (limitType === 'danger') {
      setDangerLimit(value);
    }
  };

  const handleSave = () => {
    onSaveUserName(userName);
    onClose(); // Close the WelcomeScreen after saving
  };

  return (
    <Container>
      <UserNameInput value={userName} onChangeText={setUserName} />
      <PriceContainer>
        <Heading1>Pick your price sensitivity limits:</Heading1>
        <PriceLimitsInputs
          cautionLimit={cautionLimit}
          dangerLimit={dangerLimit}
          onLimitChange={handleLimitChange}
        />
      </PriceContainer>
      <CustomButton title="Save" onPress={handleSave} />
    </Container>
  );
};

export default WelcomeScreen;
