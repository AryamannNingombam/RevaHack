import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PreLoginNavigator } from './prelogin.navigation';
import { AppNavigator } from './app.navigation';
import { useSelector } from 'react-redux';
import { UserNavigator } from './user.navigator';

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
    </>
  );
};
