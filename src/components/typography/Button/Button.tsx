import { Text, Pressable } from 'react-native';
import React from 'react';

import theme from '../../../theme';
import styles from './styles';

type Props = {
  children: React.ReactNode;
  backgroundColor?: string;
  color?: string;
  onPress: any;
};

export default function Button({
  children,
  backgroundColor = theme.colors.primary,
  color = 'white',
  onPress,
}: Props) {
  return (
    <Pressable style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.text, { color }]}>{children}</Text>
    </Pressable>
  );
}
