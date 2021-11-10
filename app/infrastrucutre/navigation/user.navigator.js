import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppNavigator } from './app.navigation';

import EditProfilePage from '../../pages/editprofile/editprofile.page';
import ViewReportPage from '../../pages/viewreport/ViewReport.page';

const Stack = createStackNavigator();

export const UserNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={AppNavigator} />

    <Stack.Screen name="EditProfile" component={EditProfilePage} />
    <Stack.Screen name="ViewReport" component={ViewReportPage} />
  </Stack.Navigator>
);
