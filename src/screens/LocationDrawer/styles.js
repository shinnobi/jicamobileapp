import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';

export default StyleSheet.create({
  container: {
    marginTop: 5,
    paddingHorizontal: 0,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
  },
  headerText: {
    textTransform: 'uppercase',
    color: colorSet.blue,
    fontSize: fontSizeSet.subNormal,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 15,
    paddingLeft: 0,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: colorSet.inActiveColor,
  },
  indicatorIcon: {
    fontSize: fontSizeSet.middle,
    // marginRight: 10,
  },
  itemIcon: {
    width: 30,
    minHeight: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mainText: {
    fontSize: fontSizeSet.subNormal,
    color: colorSet.Text,
    fontWeight: '600',
  },
  subText: {
    fontSize: fontSizeSet.small,
    color: colorSet.inActiveColor,
    textTransform: 'uppercase',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherIcon: {
    width: 40,
    // height: 40,
  },
  temperature: {
    fontSize: fontSizeSet.middle,
    color: colorSet.Text,
    textTransform: 'uppercase',
  },
});
