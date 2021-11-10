import React, { useState, useEffect } from 'react';
// import axios from "axios";
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { SafeArea } from '../../components/utility/safe-area.component';
import { GetAllReportsForUser } from '../../services/user.service';
import { GetReportDetails, GiveReportAccessToUser } from '../../services/report.service';
import {
  List,
  Modal,
  Portal,
  Button,
  Provider,
  TextInput,
  ActivityIndicator,
  Colors,
  Text,
} from 'react-native-paper';

import { MainContainer } from '../profile/Profile.styles';
import { VerticalCenter } from '../viewreport/ViewReport.styles';
import { HeaderText, SingleReport } from './Reports.styles';

export default function ReportPage() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [currentRep, setCurrentRep] = useState(null);
  const [email, setEmail] = useState('');
  const [reports, setReports] = useState([]);

  const showModal = (id) => {
    setCurrentRep(id);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 10 };

  const shareUser = async () => {
    const res = await GiveReportAccessToUser({
      email: email,
      reportId: currentRep,
    });
    console.log(res);
  };

  const getReports = async () => {
    await GetAllReportsForUser()
      .then((res) => {
        console.log(res.data['reports']);
        setReports(res.data['reports']);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReports();
  }, [isFocused]);

  return (
    <SafeArea>
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
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

          {reports.length > 0 ? (
            <>
              {reports.map((data, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <SingleReport>
                      <List.Item
                        onPress={() => {
                          navigation.navigate('ViewReport', {
                            id: data._id,
                            name: data.name,
                            date: data.date,
                          });
                        }}
                        title={data.name ? data.name : 'Report ' + (idx + 1)}
                        description={new Date(data.date).toDateString()}
                        left={(props) => <List.Icon {...props} icon="file" />}
                        right={(props) => {
                          return (
                            <Button {...props} onPress={() => showModal(data._id)}>
                              Share
                            </Button>
                          );
                        }}
                      />
                    </SingleReport>
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <>
              <VerticalCenter style={{ marginTop: 40 }}>
                <ActivityIndicator animating={true} color={Colors.blue200} size={40} />
                <Text style={{ textAlign: 'center', padding: 24 }}>
                  We're getting your report, Hang on!
                </Text>
              </VerticalCenter>
            </>
          )}
        </MainContainer>
      </Provider>
    </SafeArea>
  );
}
