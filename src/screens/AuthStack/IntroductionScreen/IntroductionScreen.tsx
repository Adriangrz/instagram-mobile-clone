import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Button from '../../../components/typography/Button';
import Header from '../../../components/typography/Header';
import styles from './styles';

type Props = {
  navigation: any;
};

const IntroductionScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <Header variant="h1">Welcome</Header>
        <Button onPress={() => navigation.navigate('Login')}>Start your journey</Button>
      </View>
    </SafeAreaView>
  );
};

export default IntroductionScreen;
