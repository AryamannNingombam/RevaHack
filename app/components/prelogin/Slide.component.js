import React from "react";
import {
  SlideContainer,
  SlideImage,
  SlideWrapper,
  WelcomeText,
  TitleText,
  StartedButton,
} from "../../pages/PreLogin/prelogin.styles";

export const Slide = ({ data }) => {
  return (
    <SlideContainer>
      <SlideWrapper>
        <SlideImage source={data.image} />
      </SlideWrapper>
    </SlideContainer>
  );
};
