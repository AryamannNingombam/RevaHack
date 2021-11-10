import React from "react";
import { Button } from "react-native-paper";
import {
  ButtonsSection,
  ButtonsSectionLeftContainer,
  ButtonsSectionLeftText,
  ButtonsSectionRightContainer,
  ContainerItemsPlus,
  ContainerItemsText,
  HeadingSection,
  MainContainer,
  MainHeading,
  SubHeading,
  UploadContainer,
  UploadSection,
  ButtonsSectionRightText,
  MainTextInput,
} from "./UploadReview.styles";
import { TouchableOpacity } from "react-native";
import { SafeArea } from "../../components/utility/safe-area.component";

export default function BasicInfo({ navigation }) {
  return (
    <SafeArea>
      <MainContainer>
        <HeadingSection>
          <MainHeading>Your Basic Info</MainHeading>
          <SubHeading>This will help us know you better</SubHeading>
        </HeadingSection>
        <MainTextInput
          placeholder="Your Date of Birth"
          placeholderTextColor={"#858585"}
        />
        <MainTextInput placeholder="Gender" placeholderTextColor={"#858585"} />
        <MainTextInput
          placeholder="Your Height (in)"
          placeholderTextColor={"#858585"}
        />
        <MainTextInput
          placeholder="Your Weight (kg)"
          placeholderTextColor={"#858585"}
        />
        <ButtonsSection>
          <ButtonsSectionLeftText>Skip</ButtonsSectionLeftText>
          <ButtonsSectionRightText
            onPress={() => navigation.navigate("ContactInfo")}
            color="white"
            uppercase={false}
            labelStyle={{ fontSize: 18, fontFamily: "BasisGrotesqueProBold" }}
          >
            Next
          </ButtonsSectionRightText>
        </ButtonsSection>
      </MainContainer>
    </SafeArea>
  );
}
