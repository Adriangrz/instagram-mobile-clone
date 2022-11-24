import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostsDashboardScreen from './PostsDashboardScreen';
import PostDetailsScreen from './PostDetailsScreen';

export type PostsStackParamList = {
  PostsDashboard: undefined;
  PostDetails: undefined;
};

const Stack = createStackNavigator<PostsStackParamList>();

const PostsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PostsDashboard"
      component={PostsDashboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PostDetails"
      component={PostDetailsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default PostsStack;
