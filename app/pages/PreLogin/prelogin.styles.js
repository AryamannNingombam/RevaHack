import styled from "styled-components";
import { FlatList, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import {
  BACKGROUND_COLOR,
  PRIMARY_FONT,
  SECONDARY_FONT,
} from "../../constants";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const MainCarousel = styled(FlatList)`
  flex: 1;
`;

export const BackgroundImage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
`;

export const SlideContainer = styled.View`
  width: ${windowWidth}px;
  height: ${windowHeight * 0.54}px;
  justify-content: center;
  align-items: center;
`;

export const SlideWrapper = styled.View`
  background-color: #fff;
  border-radius: 50px;
  height: 380px;
  width: ${windowWidth * 0.8}px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const SlideImage = styled.Image`
  width: ${windowWidth * 0.85}px;
  height: ${windowHeight * 0.6}px;
  resize-mode: contain;
`;

export const MainPagination = styled.View`
  justify-content: center;
  flex-direction: row;
`;

export const PaginationDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin: 0px 8px;
  background-color: ${({ index, i }) => (index === i ? "#184e81" : "white")};
`;

export const StartedButton = styled(Button)`
  color: #3577d0;
  background-color: #1d1d1d;
  border-radius: 50px;
  padding: 6px 30px;
  position: absolute;
  bottom: 90px;
`;

export const WelcomeText = styled.Text`
  color: #f9f9f9;
  font-size: 24px;
  font-family: ${SECONDARY_FONT};
  margin-top: 80px;
`;

export const TitleText = styled.Text`
  color: #f9f9f9;
  font-size: 80px;
  margin-bottom: 20px;
  font-family: ${PRIMARY_FONT};
`;
