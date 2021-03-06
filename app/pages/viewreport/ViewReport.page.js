import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { Button, IconButton, Modal, Portal, Provider, Text, TextInput } from 'react-native-paper';
import { SafeArea } from '../../components/utility/safe-area.component';
import {useIsFocused} from '@react-navigation/native';

import {
  ChangeReportName,
  DeleteReport,
  GetReportDetails,
  GetSharedReport,
  GiveReportAccessToUser,
} from '../../services/report.service';
import store from '../../app/store';
import * as FileSystem from 'expo-file-system';
import {
  ButtonsContainer,
  ImgContainer,
  MainContainer,
  VerticalCenter,
  MainHeading,
  DateText,
} from './ViewReport.styles';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { BtnContainer, EditBtnContainer, UserSubtitleText } from '../profile/Profile.styles';

export default function ViewReportPage(props) {
  const { id, name,date, userReportID } = props.route.params;
  const { userData } = store.getState().auth;
  const isFocused = useIsFocused();
  const currentUserID = userData._id;
  console.log(currentUserID);
  console.log(userReportID);
  const [baseImg, setBaseImg] = React.useState('');
  const [loaded, setLoaded] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [currentRep, setCurrentRep] = React.useState(null);
  const [editingName,setEditingName] = React.useState(false);
  const [reportName,setReportName ] = React.useState(name);

  const OnChangeNameClick = ()=>{
    const body = {
      newName:reportName,
      reportId:id
    }
    console.log(reportName);
    ChangeReportName(body)
    .then(response=>response.data)
    .then(data=>{
      setEditingName(false)
      navigation.navigate(-1)
      console.log(data);
    })
    .catch(err=>{
      setEditingName(false)
      console.log('error',err)

    })
  }
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
  const navigation = useNavigation();
  useEffect(async () => {
    if (id) {
      let res;
      if(userReportID === currentUserID){
       res = await GetReportDetails(id);
      }else{
        res = await GetSharedReport(id);
        console.log(res.data)
      }
      console.log(res.data);
      setBaseImg(res.data.data);
      setLoaded(true);
    }
  }, []);

  const OnDeleteReportClick = () => {
    DeleteReport({ _id: id })
      .then((response) => response.data)
      .then((data) => {
        navigation.navigate('Home');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDownload = async() => {
    await FileSystem.downloadAsync('data:image/png;base64, ' + baseImg);
  }

  return (
    <SafeArea>
      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <TextInput
              activeOutlineColor={'#3DBBF1'}
              activeUnderlineColor={'#575757'}
              label="Email of user to share the report"
              value={email}
              onChangeText={(email) => setEmail(email)}
            ></TextInput>
            <Button
              onPress={() => {
                shareUser();
                hideModal();
              }}
              mode="text"
              color={'#575757'}
              style={{ marginTop: 20 }}
              icon="share"
            >
              Share Report
            </Button>
          </Modal>
        </Portal>
        <MainContainer>
          {editingName ?(
            <View style={{ flexDirection:"column",marginTop:12}}>
              <UserSubtitleText style={{ marginLeft: 16 }}>Edit Report Name</UserSubtitleText>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
            <TextInput
            onChangeText={(value)=>{
              setReportName(value);
            }}
            style={{
              backgroundColor: '#F5F5F5',
              width: '80%',
            }}
            value={reportName}
            placeholder="edit name" />
            <IconButton
              icon="check"
              color={Colors.grey600}
              size={20}
              onPress={OnChangeNameClick}
              />
            </View>
              </View>
          ) : (

          <View>
          <MainHeading style={{ color: '#000'}}>{reportName}</MainHeading>
          <BtnContainer style={{position: 'absolute'}}>
          <EditBtnContainer>
            <IconButton
              icon="pencil"
              color={Colors.grey600}
              size={20}
              onPress={() => setEditingName(true)}
            />
          </EditBtnContainer>
        </BtnContainer>
          </View>
          )} 
          <DateText style={{ marginTop: 8 }}>
            {new Date(date).toDateString()}
          </DateText>
          <ImgContainer>
            {loaded ? (
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 200,
                  padding: 20,
                  paddingTop: 0,
                  resizeMode: 'contain',
                  borderRadius: 10,
                }}
                source={{ uri: 'data:image/png;base64, ' + baseImg }}
              />
            ) : (
              <VerticalCenter>
                <ActivityIndicator animating={true} color={Colors.blue200} size={40} />
                <Text style={{ textAlign: 'center', padding: 24 }}>
                  We're getting your report, Hang on!
                </Text>
              </VerticalCenter>
            )}
          </ImgContainer>

          <ButtonsContainer>
            <Button
              mode="contained"
              color={Colors.blue400}
              labelStyle={{ color: '#FFF' }}
              icon="download"
              onPress={handleDownload}
            >
              Download
            </Button>
            {currentUserID === userReportID ? (
              <>
                <Button
                  mode="contained"
                  style={{ marginTop: 20 }}
                  color={Colors.blue400}
                  icon="share"
                  labelStyle={{ color: '#FFF' }}
                  onPress={() => showModal(id)}
                >
                  Share
                </Button>
                <Button
                  mode="contained"
                  style={{ marginTop: 20 }}
                  color={Colors.red600}
                  icon="delete"
                  labelStyle={{ color: '#FFF' }}
                  onPress={OnDeleteReportClick}
                >
                  Delete
                </Button>
              </>
            ) : null}
          </ButtonsContainer>
        </MainContainer>
      </Provider>
    </SafeArea>
  );
}
