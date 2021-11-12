import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { Button, Colors, Text } from 'react-native-paper';
import { SafeArea } from '../../components/utility/safe-area.component';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { PRIMARY_FONT } from '../../constants';
import { useIsFocused } from '@react-navigation/native';
import {
  MainContainer,
  TopRow,
  HeaderText,
  RecentReports,
  ReportBox,
  ReportText,
  Container,
  ImageGrid,
  HealthAnalysis,
} from './Home.styles';
import { DateText } from '../viewreport/ViewReport.styles';
import { UserSubtitleText } from '../profile/Profile.styles';
import { useSelector } from 'react-redux';
import { GetAllReportsForUser } from '../../services/user.service';
import { useNavigation } from '@react-navigation/core';

export default function HomePage() {
  const navigation = useNavigation();
  const { userData } = useSelector((state) => state.auth);
  const windowWidth = Dimensions.get('window').width;
  const isFocused = useIsFocused();
  const [carouselItems, setCarouselItems] = React.useState([
    {
      title: 'Covid Report 1',
      text: 'Text 1',
    },
    {
      title: 'Covid Report 2',
      text: 'Text 2',
    },
    {
      title: 'Covid Report 3',
      text: 'Text 3',
    },
    {
      title: 'Covid Report 4',
      text: 'Text 4',
    },
    {
      title: 'Covid Report 5',
      text: 'Text 5',
    },
  ]);
  const _renderItem = ({ item, index }) => {
    return (
      <ReportBox style={{ width: windowWidth * 0.6 }}>
        <Container>
          <ReportText>{item.name}</ReportText>
          <DateText style={{ marginLeft: 18, marginTop: 8, color: '#fFF' }}>
            {new Date(item.date).toDateString()}
          </DateText>
        </Container>
        <Button
          onPress={() => {
            navigation.navigate('ViewReport', {
              id: item._id,
              name: item.name,
              date: item.date,
            });
          }}
          color={Colors.white}
          style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 12 }}
          labelStyle={{ color: '#FFF', fontFamily: PRIMARY_FONT }}
          icon="eye"
        >
          View Report
        </Button>
      </ReportBox>
    );
  };

  const getReports = async () => {
    await GetAllReportsForUser()
      .then((res) => {
        console.log(res.data);
        setCarouselItems(res.data['reports']);
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
      <MainContainer>
        <TopRow>
          <HeaderText>Welcome, {userData.name}</HeaderText>
          <Image
            source={{ uri: 'https://source.unsplash.com/random/160x160' }}
            style={{ width: 50, height: 50, borderRadius: 8, marginRight: 24 }}
          />
        </TopRow>

        <RecentReports>
          <Carousel
            layout={'stack'}
            layoutCardOffset={10}
            data={carouselItems}
            renderItem={_renderItem}
            itemWidth={windowWidth * 0.8}
            sliderWidth={windowWidth}
          />
        </RecentReports>

        <UserSubtitleText style={{ marginLeft: 24 }}>Health analysis</UserSubtitleText>

        <HealthAnalysis></HealthAnalysis>

        <UserSubtitleText style={{ marginLeft: 24 }}>Popular doctors around</UserSubtitleText>
        <ImageGrid>
          <Image
            source={{ uri: 'https://source.unsplash.com/random/500x500' }}
            style={{
              width: windowWidth * 0.4,
              height: windowWidth * 0.4,
              borderRadius: 8,
              margin: 8,
              marginTop: 24,
            }}
          />
          <Image
            source={{ uri: 'https://source.unsplash.com/random/500x500' }}
            style={{
              width: windowWidth * 0.4,
              height: windowWidth * 0.4,
              borderRadius: 8,
              margin: 8,
              marginTop: 24,
            }}
          />
          <Image
            source={{ uri: 'https://source.unsplash.com/random/500x500' }}
            style={{
              width: windowWidth * 0.4,
              height: windowWidth * 0.4,
              borderRadius: 8,
              margin: 8,
              marginTop: 24,
            }}
          />
          <Image
            source={{ uri: 'https://source.unsplash.com/random/500x500' }}
            style={{
              width: windowWidth * 0.4,
              height: windowWidth * 0.4,
              borderRadius: 8,
              margin: 8,
              marginTop: 24,
            }}
          />
        </ImageGrid>
      </MainContainer>
    </SafeArea>
  );
}
