import React, { useState } from "react";
import {
  MainContainer,
  MainHeading,
  MainTextInput,
  NewHereText,
  SignUpContainer,
  SignUpText,
  SubHeading,
  TextSection,
  StartedButton,
  RadioSelect,
} from "./login.styles";
import store from "../../app/store";
import { LoginThunk } from "../../app/auth.slice";
import { RadioButton } from "react-native-paper";
import { SafeArea } from "../../components/utility/safe-area.component";
import { TouchableOpacity, View } from "react-native";

export default function RegisterPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(null);

  return (
    <SafeArea>
      <MainContainer>
        <TextSection>
          <MainHeading>Hello</MainHeading>
          <SubHeading>Welcome to Mrex</SubHeading>
        </TextSection>
        <MainTextInput
          // onChangeText={setEmail}
          placeholder="Name"
          placeholderTextColor={"#858585"}
          autoCapitalize="none"
        />
        <MainTextInput
          // onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={"#858585"}
          autoCapitalize="none"
        />
        <MainTextInput
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={"#858585"}
          secureTextEntry={true}
        />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <RadioSelect
            label="I'am a Doctor"
            value="first"
            color="#1d1d1d"
            status={userType === "doctor" ? "checked" : "unchecked"}
            labelStyle={{ fontFamily: "BasisGrotesqueProBold" }}
            onPress={() => setUserType("doctor")}
          />
          <RadioSelect
            label="I'am a Patient"
            value="second"
            status={userType === "patient" ? "checked" : "unchecked"}
            color="#1d1d1d"
            labelStyle={{ fontFamily: "BasisGrotesqueProBold" }}
            onPress={() => setUserType("patient")}
          />
        </View>
        <StartedButton
          color="white"
          uppercase={false}
          labelStyle={{ fontSize: 20, fontFamily: "BasisGrotesqueProBold" }}
          onPress={() => navigation.navigate("BasicInfo")}
        >
          Register
        </StartedButton>
        <SignUpContainer>
          <NewHereText>Already a member? </NewHereText>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <SignUpText>Sign in</SignUpText>
          </TouchableOpacity>
        </SignUpContainer>
      </MainContainer>
    </SafeArea>
  );
}
