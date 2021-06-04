import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet, convertHex } from '../../AppStyles';

export default StyleSheet.create({
  card: {
    backgroundColor: colorSet.white,
    borderRightWidth: 1,
    borderRightColor: convertHex(colorSet.sectionSeparatorColor, 0.3),
    paddingHorizontal: 10,
    margin: 0,
    width: 120,
    height: 95,
    paddingTop: 10,
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: fontSizeSet.subMiddle,
    marginTop: 0,
    marginBottom: 10,
  },
  mainIcon: {
    width: 40,
    height: 40,
    // backgroundColor: 'white',
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  mainInfo: {
    alignItems: 'flex-start',
    maxWidth: '65%',
    marginLeft: 5,
  },
  mainTemperature: {
    fontSize: fontSizeSet.normal,
    fontWeight: '600',
    color: colorSet.Text,
    marginBottom: 5,
  },
  mainNotes: {
    fontSize: fontSizeSet.xsmall,
    color: colorSet.Text,
    textTransform: 'capitalize',
  },
});
