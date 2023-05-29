import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: ${props => {
    const { price, cautionLimit, dangerLimit } = props;
    
    if (price <= 0) {
      return '#f0ccf5';
    } else if (price > 0 && price < cautionLimit) {
      return '#b9ef9c';
    } else if (price >= cautionLimit && price < dangerLimit) {
      return '#FF885A';
    } else {
      return '#ed8185';
    }
  }};
`;

export default Wrapper;
