import React from 'react';
import { View } from 'react-native';
import theme from '../../theme';
import { CommentType } from '../../types';
import AvatarComponent from '../AvatarComponent';
import Paragraph from '../typography/Paragraph';
import styles from './styles';

const CommentComponent = ({ id, body }: CommentType) => {
  return (
    <View style={styles.comment}>
      <AvatarComponent />
      <View style={{ marginHorizontal: theme.spacings.sm }}>
        <Paragraph>Somebody:</Paragraph>
      </View>
      <View style={{ flex: 1 }}>
        <Paragraph numberOfLines={3}>{body}</Paragraph>
      </View>
    </View>
  );
};

export default CommentComponent;
