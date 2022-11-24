import { StyleSheet } from 'react-native';
import theme from '../../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 200,
    margin: theme.spacings.md,
  },
  post: {
    flexDirection: 'row',
    marginHorizontal: theme.spacings.md,
  },
  userName: {
    alignItems: 'center',
  },
  postInfo: {
    flex: 1,
    margin: theme.spacings.sm,
    justifyContent: 'center',
  },
  newCommentRow: {
    flexDirection: 'row',
  },
  error: {
    color: 'red',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  listOfComments: {
    flex: 1,
  },
});

export default styles;
