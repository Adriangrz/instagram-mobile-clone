import { Text } from 'react-native';
import React from 'react';

import theme from '../../../theme';
import styles from './styles';

type Props = {
  children: React.ReactNode;
  color?: string;
  variant: 'large' | 'small';
};

export default function Body({ children, variant, color = theme.colors.primary }: Props) {
  return <Text style={[styles.text, styles[variant], { color }]}>{children}</Text>;
}
