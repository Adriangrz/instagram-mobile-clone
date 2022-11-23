import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarsList: {
    margin: theme.spacings.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
