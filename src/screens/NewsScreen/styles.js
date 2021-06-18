import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';

export default StyleSheet.create({
  emptyTitle: {
    color: colorSet.white,
    marginTop: '40%',
    fontSize: fontSizeSet.xxlarge,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
  },
});
