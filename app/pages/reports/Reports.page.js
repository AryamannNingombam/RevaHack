import React, { useState, useEffect } from "react";
import axios from "axios";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BACKEND_URL } from "../../constants";
import { GetAllReportsForUser } from "../../services/user.service";

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
  const reports = [
    {
      name: "COVID Report",
      date: "24 March 2002",
      data: "data",
      id: "123",
    },
    {
      name: "NASHE Report",
      date: "24 March 2002",
      data: "data",
      id: "123",
    },
  ];

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
    const data = await GetAllReportsForUser();
    console.log(data);
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
                  title={data.name}
                  description={data.date}
                  left={(props) => <List.Icon {...props} icon="file" />}
                  right={(props) => {
                    return (
                      <Button {...props} onPress={() => showModal(data.id)}>
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
