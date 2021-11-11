import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfilePage from '../../pages/editprofile/editprofile.page';
import { AppNavigator } from './app.navigation';
import HealthInfoPage from '../../pages/healthinfo/healthinfo.page';
import ViewReportPage from '../../pages/viewreport/ViewReport.page';
import SharedReportsPage from '../../pages/sharedreports/SharedReports.page';
const Stack = createStackNavigator();

export const UserNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AppNav" component={AppNavigator} />
    <Stack.Screen name="HealthInfo" component={HealthInfoPage} />
    <Stack.Screen name="SharedReports" component={SharedReportsPage} />

    <Stack.Screen name="EditProfile" component={EditProfilePage} />
    <Stack.Screen name="ViewReport" component={ViewReportPage} />
  </Stack.Navigator>
);
