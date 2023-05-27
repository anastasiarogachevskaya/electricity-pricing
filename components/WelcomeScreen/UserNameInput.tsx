import React from 'react';
import { TextContainer, StyledInput, Heading1 } from './Typography';

const UserNameInput = ({ value, onChangeText }) => {
  return (
    <TextContainer>
      <Heading1>Hey, </Heading1>
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        placeholder="User"
        id="userName"
        placeholderTextColor="#666"
      />
    </TextContainer>
  );
};

export default UserNameInput;
