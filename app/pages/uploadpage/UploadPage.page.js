import React from "react";
import axios from "axios";
import { SafeArea } from "../../components/utility/safe-area.component";
import { StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BACKEND_URL } from "../../constants";

import { MainContainer } from "../profile/Profile.styles";
import {
  FormView,
  HeaderText,
  Label,
  UploadContainer,
} from "./UploadPage.styles";

import * as DocumentPicker from "expo-document-picker";
import { Colors } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AddReport } from "../../services/report.service";

const styles = StyleSheet.create({
  input: {
    height: 48,
    margin: 12,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 0,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#FFF",
    color: "#1d1d1d",
  },
});

export default function UploadPage() {
  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    console.log(result);
    if (result.uri) {
      let formdata = new FormData();
      formdata.append("file", {
        uri: result.uri,
        name: result.name,
        type: result.mimeType,
      });

      console.log({ formdata });

      const res = await AddReport(formdata);
      console.log(res.data);
    }
  };
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeArea>
      <MainContainer>
        <HeaderText>Upload Your Report</HeaderText>
        <FormView style={{ marginTop: 32 }}>
          <Label>Name of the Report</Label>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Enter name of the Report"
          />
        </FormView>
        <FormView style={{ marginTop: 32 }}>
          <Label>Select your report to save</Label>
          <TouchableOpacity onPress={_pickDocument}>
            <UploadContainer>
              <Icon name={"plus"} size={60} color={Colors.grey400}></Icon>
            </UploadContainer>
          </TouchableOpacity>
        </FormView>
      </MainContainer>
    </SafeArea>
  );
}
