import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

type Props = {
  children: React.ReactNode;
  color?: string;
};

export default function Paragraph({ children, color = '#070B11' }: Props) {
  return <Text style={[styles.textParagraph, { color }]}>{children}</Text>;
}
