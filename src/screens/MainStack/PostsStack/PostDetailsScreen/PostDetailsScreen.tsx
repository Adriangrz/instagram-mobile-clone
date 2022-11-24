import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  FlatList,
} from 'react-native';
import AvatarComponent from '../../../../components/AvatarComponent';
import Header from '../../../../components/typography/Header';
import Paragraph from '../../../../components/typography/Paragraph';
import { supaBaseclient } from '../../../../utilities/supabaseClient';
import styles from './styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormInput from '../../../../components/typography/FormInput';
import { AntDesign } from '@expo/vector-icons';
import Button from '../../../../components/typography/Button';
import CommentComponent from '../../../../components/CommentComponent';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

type Props = {
  route: any;
  navigation: any;
};

const validation = yup.object().shape({
  comment: yup.string().required('comment is required'),
});

const PostDetailsScreen = ({ route, navigation }: Props) => {
  const bottomTabHeight = useBottomTabBarHeight();
  const postId = route.params.postId;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      comment: '',
    },
  });

  const queryClient = useQueryClient();

  const getPostDetailsById = async (postId: string) =>
    await supaBaseclient
      .from('posts')
      .select('id, created_at, description, image_url, comments ( body, creator_uuid, id )')
      .eq('id', postId)
      .is('archived_at', null)
      .single();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPostDetailsById(postId),
    enabled: !!postId,
  });

  const createCommentMutation = useMutation({
    mutationFn: (comment: string) => createComment(comment),
    onSuccess: () => {
      commentsQuery.refetch();
    },
  });

  const getLike = async (id: string) =>
    await supaBaseclient.from('likes').select('*', { count: 'exact' }).eq('post_id', id);

  const createComment = async (comment: string) =>
    await supaBaseclient
      .from('comments')
      .insert({
        body: comment,
        post_id: postId,
        creator_uuid: '5b081050-30f4-44dc-a4be-a37c57b527be',
      })
      .limit(1)
      .single();

  const likeQuery = useQuery({
    queryKey: ['posts', postId, 'like'],
    queryFn: () => getLike(postId),
    enabled: !!postId,
  });

  const getComments = async () =>
    await supaBaseclient.from('comments').select('*').eq('post_id', postId);

  const commentsQuery = useQuery({
    queryKey: ['comments'],
    queryFn: () => getComments(),
    enabled: !!postId,
  });

  const onSubmit = useCallback(async (values: any) => {
    createCommentMutation.mutate(values.comment);
    reset();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={StatusBar.currentHeight! + bottomTabHeight}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error!</Text>
        ) : data.data ? (
          <View style={styles.container}>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <View>
                <Image
                  style={styles.image}
                  source={{
                    uri: data.data.image_url,
                  }}
                />
                <View style={styles.post}>
                  <View>
                    <AvatarComponent />
                    <View style={styles.userName}>
                      <Paragraph>Somebody</Paragraph>
                    </View>
                  </View>
                  <View style={styles.postInfo}>
                    <View>
                      <Paragraph>{likeQuery.data?.count} likes</Paragraph>
                      <Header numberOfLines={3} variant="h5">
                        Title:
                        {data.data.description}
                      </Header>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.listOfComments}>
              {commentsQuery.isLoading ? (
                <Text>Loading...</Text>
              ) : commentsQuery.isError ? (
                <Text>Error!</Text>
              ) : commentsQuery.data.data ? (
                <FlatList
                  data={commentsQuery.data.data}
                  renderItem={({ item }) => <CommentComponent id={item.id} body={item.body} />}
                  keyExtractor={(item) => item.id}
                />
              ) : null}
            </View>
            <View style={styles.newCommentRow}>
              <View style={{ flex: 1 }}>
                <FormInput
                  control={control}
                  name="comment"
                  text="comment"
                  secureTextEntry={false}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              </View>
              <Button onPress={handleSubmit(onSubmit)}>
                <AntDesign name="check" size={24} color="white" />
              </Button>
            </View>
            {errors.comment && <Text style={styles.error}>{errors.comment.message}</Text>}
          </View>
        ) : null}
      </SafeAreaView>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export default PostDetailsScreen;
