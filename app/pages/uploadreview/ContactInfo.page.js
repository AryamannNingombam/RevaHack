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
  ButtonsSectionRightText,
  UploadSection,
  MainTextInput,
} from "./UploadReview.styles";
import { TouchableOpacity } from "react-native";
import { SafeArea } from "../../components/utility/safe-area.component";

export default function ContactInfo({ navigation }) {
  return (
    <SafeArea out>
      <MainContainer>
        <HeadingSection>
          <MainHeading>Your Contact Info</MainHeading>
          <SubHeading>This will help us know you better</SubHeading>
        </HeadingSection>
        <MainTextInput
          placeholder="Your phone number"
          placeholderTextColor={"#858585"}
        />
        <MainTextInput placeholder="Gender" placeholderTextColor={"#858585"} />
        <MainTextInput
          placeholder="Your Address line 1"
          placeholderTextColor={"#858585"}
        />
        <MainTextInput
          placeholder="Your Address line 2"
          placeholderTextColor={"#858585"}
        />
        <MainTextInput placeholder="Country" placeholderTextColor={"#858585"} />
        <MainTextInput placeholder="State" placeholderTextColor={"#858585"} />
        <MainTextInput placeholder="City" placeholderTextColor={"#858585"} />

        <ButtonsSection>
          <ButtonsSectionLeftText>Skip</ButtonsSectionLeftText>
          <ButtonsSectionRightText
            onPress={() => navigation.navigate("UploadProfile")}
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
