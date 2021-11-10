import React, { useCallback, useRef, useState } from "react";
import {
  BackgroundImage,
  MainCarousel,
  WelcomeText,
  TitleText,
  StartedButton,
} from "./prelogin.styles";
import { Dimensions, Text } from "react-native";
import { Slide } from "../../components/prelogin/Slide.component";
import { slideList } from "../../components/prelogin/slideList";
import { Pagination } from "../../components/prelogin/Pagination-component";
import { SafeArea } from "../../components/utility/safe-area.component";

const windowWidth = Dimensions.get("window").width;

const PreLoginScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const indexCount = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(indexCount);

    const distance = Math.abs(roundIndex - indexCount);

    const isNoMansLand = distance > 0.4;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((e) => e.id, []),
    getItemLayout: useCallback(
      // eslint-disable-next-line no-shadow
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  return (
    <>
      <SafeArea>
        <BackgroundImage>
          <WelcomeText>Welcome to</WelcomeText>
          <TitleText>MREX</TitleText>
          <MainCarousel
            data={slideList}
            renderItem={({ item }) => {
              return <Slide data={item} />;
            }}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            {...flatListOptimizationProps}
          />
          <StartedButton
            color="white"
            uppercase={false}
            labelStyle={{ fontSize: 20, fontFamily: "BasisGrotesqueProBold" }}
            onPress={() => navigation.navigate("Login")}
          >
            Get Started
          </StartedButton>
        </BackgroundImage>
      </SafeArea>
    </>
  );
};

export default PreLoginScreen;
