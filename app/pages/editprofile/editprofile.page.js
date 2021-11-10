import React, { useState } from 'react';
import store from '../../app/store';
import { SafeArea } from '../../components/utility/safe-area.component';
import { BackArrowWrapper, FormSection, HeadingSection, MainContainer, MainHeading, ProfileImageSection,SaveButtonSection,TextContainer,UserImage } from './editprofile.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';
import { PRIMARY_FONT } from '../../constants';


export default function EditProfilePage() {
    const userDetails = store.getState().auth.userData;
    const navigation = useNavigation();
  return (
    <SafeArea>
        <MainContainer> 
            <HeadingSection>  
                <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                <BackArrowWrapper>
                <Icon size={25} color={'#575757'} style={{marginLeft:8}} name='arrow-back-ios'/>
                 </BackArrowWrapper>     
                </TouchableOpacity>
                <MainHeading>Edit Profile</MainHeading>
            </HeadingSection>
            <ProfileImageSection>
            <UserImage source={{ uri: 'https://source.unsplash.com/random/160x160' }} />
            </ProfileImageSection>
            <FormSection>
                <TextContainer>
                <TextInput
                value={userDetails.name}
                selectionColor={'#3DBBF1'}
                activeUnderlineColor={'#3DBBF1'}
                style={{'borderRadius':"5px",backgroundColor:"white",color:'#3DBBF1'}}  label='Name'/>
                </TextContainer>
                <TextContainer>
                <TextInput
                selectionColor={'#3DBBF1'}
                activeUnderlineColor={'#3DBBF1'}
                value={(new Date(userDetails.dateOfBirth)).toLocaleDateString()}
                style={{'borderRadius':"5px",backgroundColor:"white",color:'#3DBBF1'}}  label='Date Of Birth'/>
                </TextContainer>
                <TextContainer>
                <TextInput
                value={userDetails.email}
                selectionColor={'#3DBBF1'}
                activeUnderlineColor={'#3DBBF1'}
                style={{'borderRadius':"5px",backgroundColor:"white",color:'#3DBBF1'}} label='Email'/>
                </TextContainer>
                <TextContainer>
                <TextInput
                value={userDetails.phoneNumber.toString()} 
                
                selectionColor={'#3DBBF1'}
                activeUnderlineColor={'#3DBBF1'}
                style={{'borderRadius':"5px",backgroundColor:"white",color:'#3DBBF1'}} label='Phone Number'/>
                </TextContainer>
                <SaveButtonSection>
                    <Button style={{'borderRadius':"30px", 'backgroundColor':'black','color':'white','fontFamily':`${PRIMARY_FONT}`}} mode="contained">Save</Button>
                </SaveButtonSection>
                
                

            </FormSection>
        </MainContainer>
    </SafeArea>
  );
}
