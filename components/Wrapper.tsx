import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: ${props => {
    if (props.price <= 0) {
      return '#f0ccf5';
    } else if (props.price > 0 && props.price < 5) {
      return '#b9ef9c';
    } else if (props.price >= 5 && props.price < 10) {
      return '#FF885A';
    } else 
      return '#ed8185';
    }
  }};
`;

export default Wrapper;
