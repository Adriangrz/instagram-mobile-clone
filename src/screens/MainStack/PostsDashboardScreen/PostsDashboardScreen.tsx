import { PostgrestResponse } from '@supabase/supabase-js';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaView, View, Text, FlatList, StatusBar } from 'react-native';
import AvatarComponent from '../../../components/AvatarComponent';
import Post from '../../../components/PostComponent';
import Paragraph from '../../../components/typography/Paragraph';
import { PostType } from '../../../types';
import { supaBaseclient } from '../../../utilities/supabaseClient';
import styles from './styles';

type Props = {
  navigation: any;
};

const PostsDashboardScreen = ({ navigation }: Props) => {
  const queryClient = useQueryClient();

  const getPosts = async () =>
    await supaBaseclient.from('posts').select('*').is('archived_at', null);

  const postsQuery = useQuery({ queryKey: ['posts'], queryFn: getPosts });

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <View style={styles.avatarsList}>
          <AvatarComponent />
          <AvatarComponent />
          <AvatarComponent />
          <AvatarComponent />
          <AvatarComponent />
        </View>
        <FlatList
          data={postsQuery.data?.data}
          renderItem={({ item }) => (
            <Post description={item.description} id={item.id} imageUrl={item.image_url} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostsDashboardScreen;
