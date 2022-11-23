import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import useAuth from '../contexts';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export const RootNavigator = () => {
  const { token } = useAuth();
  return <NavigationContainer>{token ? <MainStack /> : <AuthStack />}</NavigationContainer>;
};
