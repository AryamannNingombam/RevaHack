import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeArea } from '../../components/utility/safe-area.component';
import { GetReportDetails } from '../../services/report.service';
import { ButtonsContainer, ImgContainer, MainContainer, VerticalCenter } from './ViewReport.styles';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { HeaderText } from '../uploadpage/UploadPage.styles';
import { UserSubtitleText } from '../profile/Profile.styles';

export default function ViewReportPage(props) {
  const { id, name, date } = props.route.params;
  const [baseImg, setBaseImg] = React.useState('');
  const [loaded, setLoaded] = React.useState(false);
  useEffect(async () => {
    if (id) {
      const res = await GetReportDetails(id);
      setBaseImg(res.data.data);
      setLoaded(true);
    }
  }, []);

  return (
    <SafeArea>
      <MainContainer>
        <HeaderText style={{ color: '#000' }}>{name}</HeaderText>
        <UserSubtitleText style={{ marginLeft: 18, marginTop: 8 }}>
          {new Date(date).toDateString()}
        </UserSubtitleText>
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
          >
            Delete
          </Button>
        </ButtonsContainer>
      </MainContainer>
    </SafeArea>
  );
}
