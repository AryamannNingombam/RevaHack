import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { SafeArea } from '../../components/utility/safe-area.component';
import { GetAllAccessedReportsForUser } from '../../services/user.service';
import { GiveReportAccessToUser } from '../../services/report.service';
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
  IconButton,
} from 'react-native-paper';

import { MainContainer } from '../profile/Profile.styles';
import { VerticalCenter } from '../viewreport/ViewReport.styles';
import { HeaderText, SingleReport } from '../reports/Reports.styles';
import { DeleteBtn } from '../uploadpage/UploadPage.styles';
import { NoReportsBtn } from './SharedReports.styles';

export default function SharedReportsPage() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [currentRep, setCurrentRep] = useState(null);
  const [email, setEmail] = useState('');
  const [reports, setReports] = useState([]);
  const [toggle, setToggle] = useState(false);

  const showModal = (id) => {
    setCurrentRep(id);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 10 };

  const shareUser = async () => {
    await GiveReportAccessToUser({
      email: email,
      reportId: currentRep,
    });
  };

  const getReports = async () => {
    console.log('get reports');
    await GetAllAccessedReportsForUser()
      .then((res) => {
        setReports(res.data['reports']);
        setToggle(true);
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
          <HeaderText>Shared Reports</HeaderText>

          {toggle ? (
            <>
              {reports.length > 0 &&
                reports.map((data, idx) => {
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
                              <Button
                                labelStyle={Colors.red400}
                                {...props}
                                onPress={() => showModal(data._id)}
                              >
                                Remove
                              </Button>
                            );
                          }}
                        />
                      </SingleReport>
                    </React.Fragment>
                  );
                })}

              {reports.length == 0 && (
                <>
                  <VerticalCenter
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      marginTop: 40,
                    }}
                  >
                    <NoReportsBtn>
                      <IconButton icon="cancel" size={68} color={'red'} />
                    </NoReportsBtn>
                    <Text style={{ textAlign: 'center', padding: 24 }}>
                      Looks like there are no reports shared yet
                    </Text>
                  </VerticalCenter>
                </>
              )}
            </>
          ) : (
            <>
              <VerticalCenter style={{ marginTop: 40 }}>
                <ActivityIndicator animating={true} color={Colors.blue200} size={40} />
                <Text style={{ textAlign: 'center', padding: 24 }}>
                  We're getting your reports, Hang on!
                </Text>
              </VerticalCenter>
            </>
          )}
        </MainContainer>
      </Provider>
    </SafeArea>
  );
}
