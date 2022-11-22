import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthStack } from './AuthStack/AuthStack';

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};
