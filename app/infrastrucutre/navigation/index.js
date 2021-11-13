import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PreLoginNavigator } from './prelogin.navigation';
import { AppNavigator } from './app.navigation';
import { useSelector } from 'react-redux';
import { UserNavigator } from './user.navigator';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";


import {
  BACKGROUND_WHITE_COLOR,
  BACKGROUND_COLOR
} from '../../constants';

export const Navigation = () => {
  const { userData } = useSelector((state) => state.auth);
  return (
    <>
      <NavigationContainer>
        {userData ? (
          <>
            {/* <AppNavigator /> */}
            <UserNavigator />
          </>
        ) : (
          <PreLoginNavigator />
        )}
      </NavigationContainer>
      <ExpoStatusBar style="auto" backgroundColor={userData ? BACKGROUND_WHITE_COLOR : BACKGROUND_COLOR} />
    </>
  );
};
