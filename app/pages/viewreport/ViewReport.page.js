import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeArea } from '../../components/utility/safe-area.component';
import { GetReportDetails } from '../../services/report.service';
import { ImgContainer, MainContainer, VerticalCenter } from './ViewReport.styles';
import { ActivityIndicator, Colors } from 'react-native-paper';

export default function ViewReportPage(props) {
  const id = props.route.params.id;
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
        <ImgContainer>
          {loaded ? (
            <Image
              style={{
                width: '100%',
                height: '100%',
                minHeight: 200,
                padding: 20,
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
        <Text>HIHIHI THIS IS REPORT</Text>
      </MainContainer>
    </SafeArea>
  );
}
