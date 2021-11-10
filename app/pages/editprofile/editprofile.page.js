import React, { useState } from "react";
import { SafeArea } from "../../components/utility/safe-area.component";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import { PRIMARY_FONT } from "../../constants";
import {
  BackArrowWrapper,
  FormSection,
  HeadingSection,
  MainContainer,
  MainHeading,
  ProfileImageSection,
  SaveButtonSection,
  TextContainer,
  UserImage,
} from "./editprofile.styles";

import { EditProfileThunk, GetUserDetailsThunk } from "../../app/auth.slice";
import store from "../../app/store";

export default function EditProfilePage() {
  const userDetails = store.getState().auth.userData;
  const navigation = useNavigation();
  const [name, setName] = useState(userDetails.name);
  const [dateOfBirth, setDateOfBirth] = useState(userDetails.dateOfBirth);
  const [email, setEmail] = useState(userDetails.email);
  const [phoneNumber, setPhoneNumber] = useState(userDetails.phoneNumber);

  const onSaveButtonClick = () => {
    UpdateUserDetails({ name, dateOfBirth, email, phoneNumber })
      .then((data) => {
        dispatch(refresh());
        console.log(data);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
    store
      .dispatch(EditProfileThunk({ name, dateOfBirth, email, phoneNumber }))
      .then((response) => {
        console.log("EDIT PROFILE SUCX");
        console.log({ response });

        store.dispatch(GetUserDetailsThunk());
      })
      .catch((err) => {
        console.log("EDIT ERR SUCX");
        console.log("error");
        console.log(err);
      });
  };

  return (
    <SafeArea>
      <MainContainer>
        <HeadingSection>
          <MainHeading>Edit Profile</MainHeading>
        </HeadingSection>
        <ProfileImageSection>
          <UserImage
            source={{ uri: "https://source.unsplash.com/random/160x160" }}
          />
        </ProfileImageSection>
        <FormSection>
          <TextContainer>
            <TextInput
              onChangeText={(text) => setName(text)}
              value={name}
              selectionColor={"#3DBBF1"}
              activeUnderlineColor={"#3DBBF1"}
              style={{
                borderRadius: 5,
                backgroundColor: "white",
                color: "#3DBBF1",
              }}
              label="Name"
            />
          </TextContainer>
          <TextContainer>
            <TextInput
              onChangeText={(text) => setDateOfBirth(text)}
              selectionColor={"#3DBBF1"}
              activeUnderlineColor={"#3DBBF1"}
              value={new Date(dateOfBirth).toLocaleDateString()}
              style={{
                borderRadius: 5,
                backgroundColor: "white",
                color: "#3DBBF1",
              }}
              label="Date Of Birth"
            />
          </TextContainer>
          <TextContainer>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              selectionColor={"#3DBBF1"}
              activeUnderlineColor={"#3DBBF1"}
              style={{
                borderRadius: 5,
                backgroundColor: "white",
                color: "#3DBBF1",
              }}
              label="Email"
            />
          </TextContainer>
          <TextContainer>
            <TextInput
              value={phoneNumber.toString()}
              onChangeText={(text) => setPhoneNumber(text)}
              selectionColor={"#3DBBF1"}
              activeUnderlineColor={"#3DBBF1"}
              style={{
                borderRadius: 5,
                backgroundColor: "white",
                color: "#3DBBF1",
              }}
              label="Phone Number"
            />
          </TextContainer>
          <SaveButtonSection>
            <Button
              onPress={onSaveButtonClick}
              style={{
                borderRadius: 30,
                backgroundColor: "black",
                color: "white",
                fontFamily: `${PRIMARY_FONT}`,
              }}
              mode="contained"
            >
              Save
            </Button>
          </SaveButtonSection>
        </FormSection>
      </MainContainer>
    </SafeArea>
  );
}
