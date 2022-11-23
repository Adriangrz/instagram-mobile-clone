import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  imageContainer: {
    paddingHorizontal: theme.spacings.sm,
    borderWidth: 1,
    margin: theme.spacings.sm,
  },
  image: {
    height: 200,
    flex: 1,
  },
});

export default styles;
