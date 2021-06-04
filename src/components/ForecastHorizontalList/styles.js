import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';

export default StyleSheet.create({
  container: {
    backgroundColor: colorSet.white,
    borderRadius: 7,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 0,
    paddingBottom: 0,
    marginHorizontal: 10,
  },
  // header
  header: {
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  headerLabel: {
    fontSize: fontSizeSet.large,
    fontWeight: '600',
    color: colorSet.Header,
    lineHeight: 30,
  },

  sectionHeader: {
    backgroundColor: colorSet.lightGrey,
    height: 95,
    flex: 1,
    width: 40,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    color: colorSet.white,
    fontSize: fontSizeSet.normal,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  viewMoreBtn: {},
  viewMoreBtnText: {
    color: colorSet.Text,
    fontSize: fontSizeSet.normal,
    textTransform: 'uppercase',
  },
});
