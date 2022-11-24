import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsStack from './PostsStack';

const Tab = createBottomTabNavigator();

const MainStack = () => (
  <Tab.Navigator>
    <Tab.Screen name="Posts" component={PostsStack} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default MainStack;
