import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});

export default styles;
