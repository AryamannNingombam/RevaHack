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

export const HeaderText = styled.Text`
  margin: 48px 16px;
  margin-bottom: 0;
  color: #575757;
  font-family: ${PRIMARY_FONT};
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0;
  text-align: left;
`;

export const FormView = styled.View`
  width: 100%;
  padding: 0 16px;
`;

export const Label = styled.Text`
  color: #b0b0b0;
  font-family: ${SECONDARY_FONT};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
`;

export const UploadContainer = styled.View`
  width: 120px;
  height: 120px;

  background: #ffffff;
  border-radius: 30px;
  margin: 32px 0;
  justify-content: center;
  align-items: center;
`;
