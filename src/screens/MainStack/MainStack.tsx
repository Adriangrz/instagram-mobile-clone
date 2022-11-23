import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsDashboardScreen from './PostsDashboardScreen';

const Tab = createBottomTabNavigator();

const MainStack = () => (
  <Tab.Navigator>
    <Tab.Screen name="Posts" component={PostsDashboardScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default MainStack;
