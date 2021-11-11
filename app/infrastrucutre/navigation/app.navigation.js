import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from '../../pages/profile/Profile.page';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import PreLoginScreen from "../../pages/PreLogin/prelogin.page";
import UploadPage from '../../pages/uploadpage/UploadPage.page';
import ReportPage from '../../pages/reports/Reports.page';
import HomePage from '../../pages/home/Home.page';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  //   <Stack.Navigator screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="Profile" component={Profile} />
  //   </Stack.Navigator>
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#1d1d1d' }}>
    {/* <Tab.Screen
      name="Home"
      component={PreLoginScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
      }}
    /> */}
    <Tab.Screen
      name="Home"
      component={HomePage}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
      }}
    />

    <Tab.Screen
      name="Upload"
      component={UploadPage}
      options={{
        tabBarLabel: 'Upload',
        tabBarIcon: ({ color, size }) => <Icon name="upload" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Reports"
      component={ReportPage}
      options={{
        tabBarLabel: 'Reports',
        tabBarIcon: ({ color, size }) => <Icon name="file" color={color} size={size} />,
      }}
    />

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
      }}
    />
    {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
  </Tab.Navigator>
);
