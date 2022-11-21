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
  input: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    alignSelf: 'stretch',
    margin: 10,
  },
});

export default styles;
