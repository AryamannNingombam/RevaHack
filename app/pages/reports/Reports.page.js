import React, { useState, useEffect } from "react";
import axios from "axios";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BACKEND_URL } from "../../constants";
import { GetAllReportsForUser } from "../../services/user.service";
import { GetReportDetails } from "../../services/report.service";
import {
  List,
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  TextInput,
} from "react-native-paper";

import { MainContainer } from "../profile/Profile.styles";
import { HeaderText } from "./Reports.styles";

export default function ReportPage() {
  const [visible, setVisible] = useState(false);
  const [currentRep, setCurrentRep] = useState(null);
  const [email, setEmail] = useState("");
  const [reports, setReports] = useState([{}]);

  const showModal = (id) => {
    setCurrentRep(id);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 10 };

  const shareUser = () => {
    console.log({ email, currentRep });
  };

  useEffect(async () => {
    const res = await GetAllReportsForUser();
    setReports(res.data["reports"]);
  }, []);

  return (
    <SafeArea>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <TextInput
              label="Email of doctor"
              value={email}
              onChangeText={(email) => setEmail(email)}
            ></TextInput>
            <Button
              onPress={() => {
                shareUser();
                hideModal();
              }}
            >
              Share Report
            </Button>
          </Modal>
        </Portal>
        <MainContainer>
          <HeaderText>View Reports</HeaderText>
          {reports.map((data) => {
            return (
              <>
                <List.Item
                  onPress={async () => {
                    const res = await GetReportDetails(data._id);
                    console.log(res.data);
                  }}
                  title={data.user}
                  description={data.date}
                  left={(props) => <List.Icon {...props} icon="file" />}
                  right={(props) => {
                    return (
                      <Button {...props} onPress={() => showModal(data._id)}>
                        Share
                      </Button>
                    );
                  }}
                />
              </>
            );
          })}
        </MainContainer>
      </Provider>
    </SafeArea>
  );
}
