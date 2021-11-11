import { Button, RadioButton } from 'react-native-paper';
import styled from 'styled-components';
import { BACKGROUND_COLOR, PRIMARY_FONT, SECONDARY_FONT } from '../../constants';

export const MainContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${BACKGROUND_COLOR};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextSection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
export const MainHeading = styled.Text`
  font-family: ${PRIMARY_FONT};
  color: white;
  font-size: 80px;
`;

export const MainTextInput = styled.TextInput`
  margin: 10px;
  border-radius: 16px;
  height: 50px;
  width: 85%;
  color: black;
  background: white;
  border: 2px solid white;
  font-size: 20px;
  padding-left: 16px;
  font-family: ${SECONDARY_FONT};
`;

export const ForgotPasswordContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 20px;
`;

export const ForgotPasswordText = styled.Text`
  color: black;
  font-family: ${PRIMARY_FONT};
  font-size: 17px;
`;

export const SignUpContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
`;
export const NewHereText = styled.Text`
  font-family: ${SECONDARY_FONT};
  color: black;
  font-size: 17px;
`;

export const SignUpText = styled.Text`
  font-family: ${PRIMARY_FONT};
  color: black;
  font-size: 17px;
`;

export const SubHeading = styled.Text`
  font-family: ${SECONDARY_FONT};
  color: white;
  font-size: 18px;
`;

export const StartedButton = styled(Button)`
  color: #3577d0;
  background-color: #1d1d1d;
  border-radius: 50px;
  height: 50px;
  padding: 0 40px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const RadioSelect = styled(RadioButton.Item)``;
