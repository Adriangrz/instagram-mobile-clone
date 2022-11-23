import React from 'react';
import { Image } from 'react-native';
import styles from './styles';

const AvatarComponent = () => {
  return (
    <Image
      style={styles.image}
      source={{
        uri: 'https://images.pexels.com/photos/33053/dog-young-dog-small-dog-maltese.jpg',
      }}
    />
  );
};

export default AvatarComponent;
