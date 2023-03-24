import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #353840;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  width: 80%;
  background-color: #f5f5f5 ;
  color: #000000;
  padding: 10px;
  margin-top: 10px;
  border-width: 2px;
  border-color: #f5f5f5;
  border-radius: 10px;
  font-size: 17px;
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: transparent;
  margin-top: 10px;
  padding: 10px;
  border-radius: 7px;
  border-width: 2px;
  border-color: #ff8073;
  justify-content: center;
  align-items: center;
`;
export const ButtonText = styled.Text`
  color: #ff8073;
  font-size: 20px;
  font-weight: bold;
`;
export const SignUpButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;
export const SignUpText = styled.Text`
  color: white;
  font-size: 15px;
`;
