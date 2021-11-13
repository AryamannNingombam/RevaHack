import React, { useState } from 'react';
import {
  ForgotPasswordContainer,
  ForgotPasswordText,
  MainContainer,
  MainHeading,
  MainTextInput,
  NewHereText,
  SignUpContainer,
  SignUpText,
  SubHeading,
  TextSection,
  StartedButton,
} from './login.styles';
import { LoginThunk } from '../../app/auth.slice';
import { TouchableOpacity } from 'react-native';
import { SafeArea } from '../../components/utility/safe-area.component';
import { VerticalCenter } from '../viewreport/ViewReport.styles';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { HeaderText } from '../reports/Reports.styles';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const {userData} = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const OnSignInClick = (e) => {
    e.preventDefault();

    setSubmitted(true);
    try {
      dispatch(LoginThunk({ email, password }))
    } catch(err){
        console.log('error');
        console.log(err);
      };
      setSubmitted(false);
  };

  return (
    <SafeArea out>
      <MainContainer>
        {submitted ? (
          <>
            <VerticalCenter>
              <ActivityIndicator animating={true} color={Colors.white} size={40} />
              <HeaderText style={{ textAlign: 'center', color: '#FFF' }}>Logging In</HeaderText>
            </VerticalCenter>
          </>
        ) : (
          <>
            <TextSection>
              <MainHeading>Login</MainHeading>
              <SubHeading>Welcome Back</SubHeading>
            </TextSection>
            <MainTextInput
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={'#858585'}
              autoCapitalize="none"
            />
            <MainTextInput
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={'#858585'}
              secureTextEntry={true}
            />
            <StartedButton
              color="white"
              uppercase={false}
              labelStyle={{ fontSize: 20, fontFamily: 'BasisGrotesqueProBold' }}
              onPress={OnSignInClick}
              loading={(submitted && userData) ? true : false}
            >
              Login
            </StartedButton>
            <ForgotPasswordContainer>
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
            </ForgotPasswordContainer>
            <SignUpContainer>
              <NewHereText>New Here? </NewHereText>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <SignUpText>Sign Up</SignUpText>
              </TouchableOpacity>
            </SignUpContainer>
          </>
        )}
      </MainContainer>
    </SafeArea>
  );
}
