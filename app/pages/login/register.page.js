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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <SafeArea out>
      <MainContainer>
        <TextSection>
          <MainHeading>Hello</MainHeading>
          <SubHeading>Welcome to Mrex</SubHeading>
        </TextSection>
        <MainTextInput
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor={"#858585"}
          autoCapitalize="none"
        />
        <MainTextInput
          onChangeText={setEmail}
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
        <StartedButton
          color="white"
          uppercase={false}
          labelStyle={{ fontSize: 20, fontFamily: "BasisGrotesqueProBold" }}
          onPress={() => {
            console.log(name, email, password);
            navigation.navigate("BasicInfo", {
              name,
              email,
              password,
            });
          }}
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
