import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { View, Image } from 'react-native';
import theme from '../../theme';
import { PostType } from '../../types';
import { supaBaseclient } from '../../utilities/supabaseClient';
import Header from '../typography/Header';
import Paragraph from '../typography/Paragraph';
import styles from './styles';

const PostComponent = ({ id, description, imageUrl }: PostType) => {
  const queryClient = useQueryClient();

  const getLike = async (id: string) =>
    await supaBaseclient.from('likes').select('*', { count: 'exact' }).eq('post_id', id);

  const getLastComment = async (id: string) =>
    await supaBaseclient
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .eq('post_id', id)
      .limit(1)
      .single();

  const getLastCommentQuery = useQuery({
    queryKey: ['posts', id, 'lastComment'],
    queryFn: () => getLastComment(id),
    enabled: !!id,
  });

  const { data } = useQuery({
    queryKey: ['posts', id, 'like'],
    queryFn: () => getLike(id),
    enabled: !!id,
  });

  return (
    <View style={styles.postContainer}>
      <Header variant="h5">{description}</Header>
      <Image
        style={styles.image}
        source={{
          uri: imageUrl,
        }}
      />
      <View>
        <Paragraph>{data?.count} Likes</Paragraph>
        {getLastCommentQuery.data?.data ? (
          <Paragraph>Somebody: {getLastCommentQuery.data.data.body}</Paragraph>
        ) : null}
      </View>
    </View>
  );
};

export default PostComponent;
