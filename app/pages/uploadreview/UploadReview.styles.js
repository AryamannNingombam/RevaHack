import styled from 'styled-components/native';
import { BACKGROUND_COLOR, PRIMARY_FONT, SECONDARY_FONT } from '../../constants';
import { Button } from 'react-native-paper';

export const MainContainer = styled.ScrollView`
  height: 100%;
  width: 100%;
  background-color: ${BACKGROUND_COLOR};
  padding: 24px;
`;

export const HeadingSection = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 36px;
  margin-top: 24px;
`;
export const MainHeading = styled.Text`
  font-size: 30px;
  font-family: ${PRIMARY_FONT};
  color: white;
  margin: 5px 0;
`;

export const SubHeading = styled.Text`
  font-size: 15px;
  font-family: ${SECONDARY_FONT};
  color: white;
`;

export const UploadSection = styled.View`
  height: 40%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const UploadContainer = styled.View`
  height: 200px;
  width: 180px;
  background-color: #e5e5e5;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const UploadedPicture = styled.Image`
  height: 200px;
  width: 180px;
  border-radius: 40px;
  resize-mode: cover;
`;

export const ContainerItemsPlus = styled.Text`
  font-size: 150px;
  color: #858585;
  font-weight: bold;
  margin: -30px 0px;
`;

export const ContainerItemsText = styled.Text`
  font-size: 20px;
  color: #858585;
  font-family: ${PRIMARY_FONT};
`;

export const ButtonsSection = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
  align-items: center;
  margin-bottom: 100px;
`;

export const ButtonsSectionLeftText = styled.Text`
  color: #e5e5e5;
  text-decoration: underline;
  text-decoration-color: #e5e5e5;
  font-size: 16px;
  font-family: ${SECONDARY_FONT};
`;

export const MainTextInput = styled.TextInput`
  margin: 10px 0;
  border-radius: 16px;
  height: 50px;
  width: 100%;
  color: black;
  background: white;
  border: 2px solid white;
  font-size: 20px;
  padding-left: 10px;
  font-family: ${SECONDARY_FONT};
`;

export const ButtonsSectionRightText = styled(Button)`
  background-color: #1d1d1d;
  border-radius: 50px;
  padding: 2px 18px;
`;
