import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import { SafeArea } from '../../components/utility/safe-area.component';
import { GetAllAccessedReportsForUser, GetAllReportsForUser } from '../../services/user.service';
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
} from 'react-native-paper';

import { MainContainer } from '../profile/Profile.styles';
import { VerticalCenter } from '../viewreport/ViewReport.styles';
import { AccessButtonContainer, HeaderText, SingleReport } from './Reports.styles';

export default function ReportPage() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [showOwn, setShowOwn] = useState(true);
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
  const containerStyle = { backgroundColor: 'white', padding: 10, margin: 20, borderRadius: 10 };

  const shareUser = async () => {
    await GiveReportAccessToUser({
      email: email,
      reportId: currentRep,
    })
      .then((res) => {
        console.log(res);
        hideModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReports =  () => {
    console.log('get reports');
    if (showOwn) {
     GetAllReportsForUser()
        .then((res) => {
          console.log(res.data['reports'])
          setReports(res.data['reports']? res.data['reports'] : []);
          setToggle(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
       GetAllAccessedReportsForUser()
        .then((res) => res.data)
        .then((data) => {
          setReports(data.reports);
          setToggle(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const OnSharedReportsButtonPress = async()=>{
    if(showOwn)setShowOwn(false);
    else setShowOwn(true)
  }

  useEffect(() => {
    getReports();
  }, [isFocused,showOwn]);

  return (
    <SafeArea>
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <TextInput
              label="Email of user to share the report"
              value={email}
              onChangeText={(email) => setEmail(email)}
            ></TextInput>
            <Button
              onPress={() => {
                shareUser();
                hideModal();
              }}
              mode="contained"
              color={Colors.blue400}
              labelStyle={{ color: '#FFF' }}
              style={{ marginTop: 20 }}
              icon="share"
            >
              Share Report
            </Button>
          </Modal>
        </Portal>
        <MainContainer>
          <HeaderText>{showOwn ? 'Your Reports' : 'Shared Reports'}</HeaderText>
          <AccessButtonContainer>
            <Button
              mode="contained"
              onPress={OnSharedReportsButtonPress}
              style={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: 20,
                width: '50%',
              }}
            >
              {showOwn ? 'Show Shared' : 'Show Own'}
            </Button>
          </AccessButtonContainer>

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
                            return showOwn ? (
                              <Button
                                labelStyle={{ color: Colors.blue300 }}
                                {...props}
                                onPress={() => showModal(data._id)}
                              >
                                Share
                              </Button>
                            ) : null;
                          }}
                        />
                      </SingleReport>
                    </React.Fragment>
                  );
                })}

              {showOwn && reports.length == 0 && (
                <>
                  <VerticalCenter style={{ marginTop: 40 }}>
                    <Button
                      onPress={() => {
                        navigation.navigate('Upload');
                      }}
                      labelStyle={{ color: Colors.blue400 }}
                    >
                      Upload a report
                    </Button>
                    <Text style={{ textAlign: 'center', padding: 24 }}>
                      Looks like you don't have any accessed reports yet.
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
