import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfilePage from "../../pages/editprofile/editprofile.page";
import { AppNavigator } from "./app.navigation";
import HealthInfoPage from "../../pages/healthinfo/healthinfo.page";

const Stack = createStackNavigator();

export const UserNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={AppNavigator} />
    <Stack.Screen name="HealthInfo" component={HealthInfoPage} />

    <Stack.Screen name="EditProfile" component={EditProfilePage} />
  </Stack.Navigator>
);
