import React, { useState } from "react";
import { Button } from "react-native-paper";
import { SignUpUser } from "../../services/user.service";
import { Snackbar } from "react-native-paper";
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

export default function BasicInfo({ navigation, route }) {
  const { name, email, password } = route.params;
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [height, setheight] = useState("");
  const [phone, setphone] = useState("");
  const [weight, setweight] = useState("");
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <SafeArea out>
      <MainContainer>
        <HeadingSection>
          <MainHeading>Your Basic Info</MainHeading>
          <SubHeading>This will help us know you better</SubHeading>
        </HeadingSection>
        <MainTextInput
          onChangeText={setdob}
          placeholder="Your Date of Birth"
          placeholderTextColor={"#858585"}
        />
        <MainTextInput
          onChangeText={setphone}
          placeholder="Your Phone Number"
          placeholderTextColor={"#858585"}
        />
        <MainTextInput
          onChangeText={setgender}
          placeholder="Gender"
          placeholderTextColor={"#858585"}
        />
        <MainTextInput
          onChangeText={setheight}
          placeholder="Your Height (in)"
          placeholderTextColor={"#858585"}
        />
        <MainTextInput
          onChangeText={setweight}
          placeholder="Your Weight (kg)"
          placeholderTextColor={"#858585"}
        />
        <ButtonsSection>
          <ButtonsSectionLeftText>Skip</ButtonsSectionLeftText>
          <ButtonsSectionRightText
            onPress={async () => {
              const res = await SignUpUser({
                name: name,
                email: email,
                password: password,
                dateOfBirth: new Date(Date.now()),
                gender: gender,
                height: height,
                weight: weight,
                phoneNumber: phone,
              });
              if (res.data["success"]) {
                onToggleSnackBar();
              }
            }}
            color="white"
            uppercase={false}
            labelStyle={{ fontSize: 18, fontFamily: "BasisGrotesqueProBold" }}
          >
            Finish
          </ButtonsSectionRightText>
        </ButtonsSection>
      </MainContainer>
      <Snackbar
        visible={visible}
        onDismiss={() => {
          navigation.navigate("Login");
          onDismissSnackBar();
        }}
        action={{
          label: "CLOSE",
        }}
      >
        Account Created!
      </Snackbar>
    </SafeArea>
  );
}
