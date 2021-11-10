import React from 'react';

import { SafeArea } from '../../components/utility/safe-area.component';
import { logout } from '../../app/auth.slice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { Image, TouchableOpacity } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import IconOg from 'react-native-vector-icons/FontAwesome';

import {
  EditBtnContainer,
  MainContainer,
  BtnContainer,
  UserDetailContainer,
  UserNameText,
  UserSubtitleText,
  UserImage,
  AboutContainer,
  AboutHeader,
  AboutInfo,
  ServiceContainer,
  HelpContainer,
  HelpText,
  LogoutBtn,
  LogoutText,
  Divider,
  ServiceText,
} from './Profile.styles';
import store from '../../app/store';

export default function Profile() {
  const userDetails = store.getState().auth.userData;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = (e) => {
    e.preventDefault();
    console.log('LOGOUT TRIGGERED');
    dispatch(logout());
    navigation.navigate('PreLogin');
  };

  return (
    <SafeArea>
      <MainContainer>
        <BtnContainer>
          <EditBtnContainer>
            <IconButton
              icon="pencil"
              color={Colors.grey600}
              size={20}
              onPress={() => navigation.navigate('EditProfile')}
            />
          </EditBtnContainer>
        </BtnContainer>
        <UserDetailContainer>
          <UserImage source={{ uri: 'https://source.unsplash.com/random/160x160' }} />
          <UserNameText>{userDetails.name}</UserNameText>
          <UserSubtitleText>User</UserSubtitleText>
        </UserDetailContainer>
        <AboutContainer>
          <AboutHeader>About</AboutHeader>
          <AboutInfo>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum mauris in
            massa commodo semper. Praesent quis magna porta, molestie nisi ut, pharetra neque. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </AboutInfo>
        </AboutContainer>
        <ServiceContainer>
          <Icon name={'heart'} size={24}></Icon>
          <ServiceText style={{ paddingLeft: 16, fontSize: 16 }}>Health Info</ServiceText>
          <Icon name={'chevron-right'} size={24} style={{ width: 24, marginLeft: 'auto' }}></Icon>
        </ServiceContainer>

        <ServiceContainer>
          <Icon name={'file-medical'} size={24}></Icon>
          <ServiceText style={{ paddingLeft: 16, fontSize: 16 }}>Clinic Info</ServiceText>
          <Icon name={'chevron-right'} size={24} style={{ width: 24, marginLeft: 'auto' }}></Icon>
        </ServiceContainer>

        <ServiceContainer>
          <IconOg name={'gear'} size={24}></IconOg>
          <ServiceText style={{ paddingLeft: 16, fontSize: 16 }}>Settings</ServiceText>
          <Icon name={'chevron-right'} size={24} style={{ width: 24, marginLeft: 'auto' }}></Icon>
        </ServiceContainer>

        <HelpContainer>
          <Image source={require('../../assets/help.png')} />
          <HelpText>How can we help you ?</HelpText>
        </HelpContainer>
        <Divider />
        <TouchableOpacity onPress={handleLogout}>
          <LogoutBtn>
            <LogoutText>Logout</LogoutText>
          </LogoutBtn>
        </TouchableOpacity>
      </MainContainer>
    </SafeArea>
  );
}
