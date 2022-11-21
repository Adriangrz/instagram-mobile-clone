import React from 'react';
import { View } from 'react-native';
import Button from '../../components/typography/Button';
import Header from '../../components/typography/Header';
import styles from './styles';

type Props = {
  navigation: any;
};

const IntroductionScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Header variant="h1">Welcome</Header>
      <Button onPress={() => console.log('press')}>Start your journey</Button>
    </View>
  );
};

export default IntroductionScreen;
