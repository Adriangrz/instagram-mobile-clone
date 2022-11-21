import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

type Props = {
  children: React.ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  color?: string;
};

export default function Header({ children, variant, color = '#070B11' }: Props) {
  return <Text style={[styles.header, styles[variant], { color }]}>{children}</Text>;
}
