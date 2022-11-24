import { PostgrestResponse } from '@supabase/supabase-js';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaView, View, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import AvatarComponent from '../../../../components/AvatarComponent';
import Post from '../../../../components/PostComponent';
import Paragraph from '../../../../components/typography/Paragraph';
import { PostType } from '../../../../types';
import { supaBaseclient } from '../../../../utilities/supabaseClient';
import styles from './styles';

type Props = {
  navigation: any;
};

const PostsDashboardScreen = ({ navigation }: Props) => {
  const queryClient = useQueryClient();

  const getPosts = async () =>
    await supaBaseclient.from('posts').select('*').is('archived_at', null);

  const { data, isLoading, isError } = useQuery({ queryKey: ['posts'], queryFn: getPosts });

  const goToPostDetails = (id: string) => {
    navigation.navigate('PostDetails', { postId: id });
  };

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
        {isLoading ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error!</Text>
        ) : data.data ? (
          <FlatList
            data={data.data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => goToPostDetails(item.id)}>
                <Post description={item.description} id={item.id} imageUrl={item.image_url} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default PostsDashboardScreen;
