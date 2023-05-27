import styled from 'styled-components/native';

export const Heading1 = styled.Text`
  font-size: 24px;
  font-family: 'NanumGothic_700Bold';
  margin-bottom: 20px;
`;

export const Heading2 = styled.Text`
  font-size: 20px;
  font-family: 'NanumGothic_700Bold';
`;

export const StyledInput = styled.TextInput`
  font-size: 24px;
  font-family: 'NanumGothic_700Bold';
  text-decoration-line: underline;
  margin-bottom: 16px;
`;
export const StyledInputRange = styled(StyledInput)`
  width: 30px;
  font-size: 20px;
`;

export const TextContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
`;

export const PriceContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px
  margin-right: 20px
`;