import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PreLoginScreen from "../../pages/PreLogin/prelogin.page";
import LoginPage from "../../pages/login/login.page";
import RegisterPage from "../../pages/login/register.page";
import UploadReview from "../../pages/uploadreview/UploadReview.page";
import BasicInfo from "../../pages/uploadreview/BasicInfo.page";
import ContactInfo from "../../pages/uploadreview/ContactInfo.page";

const Stack = createStackNavigator();

export const PreLoginNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PreLogin" component={PreLoginScreen} />
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="Register" component={RegisterPage} />
    <Stack.Screen name="UploadProfile" component={UploadReview} />
    <Stack.Screen name="BasicInfo" component={BasicInfo} />
    <Stack.Screen name="ContactInfo" component={ContactInfo} />
  </Stack.Navigator>
);
