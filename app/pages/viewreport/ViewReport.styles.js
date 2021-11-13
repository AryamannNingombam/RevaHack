import styled from 'styled-components/native';
import { PRIMARY_FONT } from '../../constants';
export const MainContainer = styled.ScrollView`
  width: 100%;
`;

export const ImgContainer = styled.View`
  height: 300px;
  width: 100%;
  padding: 24px;
`;
export const MainHeading = styled.Text`
text-align: center;
margin: 24px 0px;
  margin-bottom: 12px;
  color: #575757;
  font-family: ${PRIMARY_FONT};
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0;
`

export const DateText = styled.Text`
color: #b0b0b0;
  font-family: ${PRIMARY_FONT};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  text-align: center;
`  

export const VerticalCenter = styled.View`
  margin: auto;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  padding: 24px;
  flex-direction: column;
`;
