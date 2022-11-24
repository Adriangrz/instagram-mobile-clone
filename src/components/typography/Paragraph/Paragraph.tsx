import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

type Props = {
  children: React.ReactNode;
  color?: string;
  numberOfLines?: number;
};

export default function Paragraph({ children, numberOfLines, color = '#070B11' }: Props) {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.textParagraph, { color }]}>
      {children}
    </Text>
  );
}
