import React, { useState, useEffect } from 'react';
import { Container } from './Container';
import { Heading1, PriceContainer } from './Typography';
import CustomButton from './CustomButton';
import UserNameInput from './UserNameInput';
import PriceLimitsInputs from './PriceLimitsInputs';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsScreenProps {
  onClose: () => void;
}
const SettingsScreen: React.FC<SettingsScreenProps>  = ({ onClose }) => {
  const [userName, setUserName] = useState('');
  const [cautionLimit, setCautionLimit] = useState('');
  const [dangerLimit, setDangerLimit] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedUserName = await AsyncStorage.getItem('userName');
      const savedCautionLimit = await AsyncStorage.getItem('cautionLimit');
      const savedDangerLimit = await AsyncStorage.getItem('dangerLimit');

      if (savedUserName) {
        setUserName(savedUserName);
      }
      if (savedCautionLimit) {
        setCautionLimit(savedCautionLimit);
      }
      if (savedDangerLimit) {
        setDangerLimit(savedDangerLimit);
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('cautionLimit', cautionLimit);
      await AsyncStorage.setItem('dangerLimit', dangerLimit);
      onClose();
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  return (
    <Container>
      <UserNameInput value={userName} onChangeText={setUserName} />
      <PriceContainer>
      <Heading1>Pick your price sensitivity limits:</Heading1>
        <PriceLimitsInputs
          cautionLimit={cautionLimit}
          dangerLimit={dangerLimit}
          onLimitChange={(value, limitType) => {
            if (limitType === 'caution') {
              setCautionLimit(value);
            } else if (limitType === 'danger') {
              setDangerLimit(value);
            }
          }}
        />
      </PriceContainer>
      <CustomButton title="Save" onPress={handleSave} />
    </Container>
  );
};

export default SettingsScreen;
