import styled from 'styled-components/native';
import {
  BACKGROUND_COLOR,
  BACKGROUND_WHITE_COLOR,
  PRIMARY_FONT,
  SECONDARY_FONT,
} from '../../constants';

export const MainContainer = styled.ScrollView`
  height: 100%;
  width: 100%;
  background-color: ${BACKGROUND_WHITE_COLOR};
`;

export const EditBtnContainer = styled.View`
  background-color: #e5e5e5;
  border-radius: 16px;
`;

export const BtnContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 35px;
`;

export const UserDetailContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 35px;
`;

export const UserNameText = styled.Text`
  color: #575757;
  font-family: ${PRIMARY_FONT};
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0;
  text-align: left;
`;

export const UserSubtitleText = styled.Text`
  color: #b0b0b0;
  font-family: ${PRIMARY_FONT};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
`;

export const UserImage = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 50px;
  margin: 24px 0;
`;

export const AboutContainer = styled.View`
  width: 100%;
  padding: 24px 16px;
`;

export const AboutHeader = styled.Text`
  font-family: ${PRIMARY_FONT};
  color: #575757;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
`;

export const AboutInfo = styled.Text`
  font-family: ${SECONDARY_FONT};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  color: #1b1b1b;
  padding: 10px 0;
`;

export const ServiceContainer = styled.View`
  margin: 12px 16px;
  background: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ServiceText = styled.Text`
  font-family: ${PRIMARY_FONT};
`;

export const HelpContainer = styled.View`
  background: rgba(16, 202, 0, 0.13);
  border-radius: 20px;
  margin: 24px 16px;
  padding: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HelpText = styled.Text`
  color: #004721;
  font-family: ${PRIMARY_FONT};
  font-style: normal;
  font-weight: bold;
  font-size: 16.8732px;
  line-height: 20px;
  margin: 16px 0;
  padding: 16px;
`;

export const Divider = styled.View`
  height: 2px;
  color: #000;
  margin: 0 auto;
  width: 80%;
  border: 1px solid #dbdbdb;
`;

export const LogoutBtn = styled.View`
  width: 90%;
  margin: 24px auto;
  padding: 12px;
  background: #ffffff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  text-align: center;
`;

export const LogoutText = styled.Text`
  font-family: ${PRIMARY_FONT};
  font-style: normal;
  font-weight: bold;
  font-size: 19.4042px;
  line-height: 23px;

  color: #ff3d3d;
  text-align: center;
`;
