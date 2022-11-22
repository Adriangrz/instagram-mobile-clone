import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './LoginScreen';
import Registration from './RegistrationScreen';
import Introduction from './IntroductionScreen';

const Stack = createStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Introduction" component={Introduction} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Stack.Screen name="Registration" component={Registration} options={{ headerTitle: '' }} />
  </Stack.Navigator>
);
