import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeArea } from '../../components/utility/safe-area.component';
import { DeleteReport, GetReportDetails } from '../../services/report.service';
import store from '../../app/store';
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

export default function ViewReportPage(props) {
  const { id, name, date, userReportID } = props.route.params;
  const { userData } = store.getState().auth;

  const currentUserID = userData._id;
  console.log(currentUserID);
  console.log(userReportID);
  const [baseImg, setBaseImg] = React.useState('');
  const [loaded, setLoaded] = React.useState(false);
  const navigation = useNavigation();
  useEffect(async () => {
    if (id) {
      const res = await GetReportDetails(id);
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

  return (
    <SafeArea>
      <MainContainer>
        <MainHeading style={{ color: '#000' }}>{name}</MainHeading>
        <DateText style={{ marginLeft: 18, marginTop: 8 }}>
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
    </SafeArea>
  );
}
