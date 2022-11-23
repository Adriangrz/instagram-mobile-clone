import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: theme.spacings.sm,
    borderWidth: 1,
    margin: theme.spacings.sm,
  },
  image: {
    height: 200,
  },
});

export default styles;
