import styled from 'styled-components/native';
import { PRIMARY_FONT } from '../../constants';

export const MainContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeadingSection = styled.View`
  width: 80%;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
export const MainHeading = styled.Text`
  font-size: 40px;
  font-family: ${PRIMARY_FONT};
  color: #575757;
`;

export const BackArrowWrapper = styled.View`
  background-color: #e5e5e5;
  width: 40px;
  height: 40px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`;

export const UserImage = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 50px;
  margin: 24px 0;
`;

export const ProfileImageSection = styled.View`
  width: 100%;
  height: 30%;
  justify-content: center;
  align-items: center;
`;

export const SaveButtonSection = styled.View`
  width: 45%;
  text-align: center;
  margin-top: 30px;
`;

export const FormSection = styled.View`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;
