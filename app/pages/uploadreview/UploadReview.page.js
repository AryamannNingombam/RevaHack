import React, { useState } from "react";
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
  UploadedPicture,
  ButtonsSectionRightText,
} from "./UploadReview.styles";
import * as DocumentPicker from "expo-document-picker";
import { TouchableOpacity, Image } from "react-native";
import { SafeArea } from "../../components/utility/safe-area.component";

export default function UploadReview({ navigation }) {
  const [selectedImage, setSelectedImage] = useState("");
  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    setSelectedImage(result);
  };
  return (
    <SafeArea out>
      <MainContainer>
        <HeadingSection>
          <MainHeading>Upload Your Profile</MainHeading>
          <SubHeading>This will help us know you better</SubHeading>
        </HeadingSection>
        <UploadSection>
          <TouchableOpacity onPress={_pickDocument}>
            <UploadContainer>
              {selectedImage ? (
                <>
                  <UploadedPicture source={{ uri: selectedImage.uri }} />
                </>
              ) : (
                <>
                  <ContainerItemsPlus>+</ContainerItemsPlus>
                  <ContainerItemsText>Upload</ContainerItemsText>
                </>
              )}
            </UploadContainer>
          </TouchableOpacity>
        </UploadSection>
        <ButtonsSection>
          <ButtonsSectionLeftText>Skip</ButtonsSectionLeftText>
          <ButtonsSectionRightText
            onPress={() => navigation.navigate("UploadProfile")}
            color="white"
            uppercase={false}
            labelStyle={{ fontSize: 18, fontFamily: "BasisGrotesqueProBold" }}
          >
            Finish
          </ButtonsSectionRightText>
        </ButtonsSection>
      </MainContainer>
    </SafeArea>
  );
}
