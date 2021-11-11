import React, { useState } from 'react';
import {
  BackArrowWrapper,
  HeadingSection,
  MainContainer,
  MainHeading,
  FormSection,
  TextContainer,
  SaveButtonSection,
} from './healthinfo.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput, Button } from 'react-native-paper';
import { SafeArea } from '../../components/utility/safe-area.component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import store from '../../app/store';
import { GetUserDetailsThunk } from '../../app/auth.slice';
import { PRIMARY_FONT } from '../../constants';
import { useNavigation } from '@react-navigation/core';
import { UpdateUserDetails } from '../../services/user.service';
export default function HealthInfoPage() {
  const userDetails = store.getState().auth.userData;
  const navigation = useNavigation();
  const [age, setAge] = useState(userDetails.age.toString());
  const [height, setHeight] = useState(userDetails.height.toString());
  const [weight, setWeight] = useState(userDetails.weight.toString());
  const [gender, setGender] = useState(userDetails.gender);

  const OnSaveButtonClick = () => {
    UpdateUserDetails({ age, height, weight, gender })
      .then((response) => response.data)
      .then(async () => {
        await store.dispatch(GetUserDetailsThunk()).then((res) => {
          navigation.navigate('Profile');
        });
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
      });
  };

  return (
    <SafeArea>
      <MainContainer>
        <HeadingSection>
          <MainHeading>Health Information</MainHeading>
        </HeadingSection>
        <FormSection>
          <TextContainer>
            <TextInput
              value={age}
              onChangeText={(e) => {
                setAge(e);
              }}
              selectionColor={'#3DBBF1'}
              activeUnderlineColor={'#3DBBF1'}
              style={{
                borderRadius: 5,
                backgroundColor: 'white',
                color: '#3DBBF1',
              }}
              label="Age"
            />
          </TextContainer>
          <TextContainer>
            <TextInput
              value={height}
              onChangeText={(e) => {
                setHeight(e);
              }}
              selectionColor={'#3DBBF1'}
              activeUnderlineColor={'#3DBBF1'}
              style={{
                borderRadius: 5,
                backgroundColor: 'white',
                color: '#3DBBF1',
              }}
              label="Height(in)."
            />
          </TextContainer>
          <TextContainer>
            <TextInput
              value={weight}
              onChangeText={(e) => {
                setWeight(e);
              }}
              selectionColor={'#3DBBF1'}
              activeUnderlineColor={'#3DBBF1'}
              style={{
                borderRadius: 5,
                backgroundColor: 'white',
                color: '#3DBBF1',
              }}
              label="Weight(kg)"
            />
          </TextContainer>
          <TextContainer>
            <TextInput
              value={gender}
              onChangeText={(e) => {
                setGender(e);
              }}
              selectionColor={'#3DBBF1'}
              activeUnderlineColor={'#3DBBF1'}
              style={{
                borderRadius: 5,
                backgroundColor: 'white',
                color: '#3DBBF1',
              }}
              label="Gender"
            />
          </TextContainer>
          <SaveButtonSection>
            <Button
              style={{
                borderRadius: 30,
                backgroundColor: 'black',
                color: 'white',
                fontFamily: `${PRIMARY_FONT}`,
              }}
              mode="contained"
              onPress={OnSaveButtonClick}
            >
              Save
            </Button>
          </SaveButtonSection>
        </FormSection>
      </MainContainer>
    </SafeArea>
  );
}
