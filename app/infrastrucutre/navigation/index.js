import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PreLoginNavigator } from './prelogin.navigation';
import { AppNavigator } from './app.navigation';
import { useSelector } from 'react-redux';

export const Navigation = () => {
  const { userData } = useSelector((state) => state.auth);
  console.log('INDEX WALA LMAO');
  console.log(userData);

  return (
    <>
      <NavigationContainer>
        {userData ? <AppNavigator /> : <PreLoginNavigator />}
      </NavigationContainer>
    </>
  );
};
