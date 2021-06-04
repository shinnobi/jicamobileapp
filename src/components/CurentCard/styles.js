import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';

export default StyleSheet.create({
    card: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingVertical: 15,
        paddingHorizontal: 15,
        elevation: 0,
        minHeight: 314,
    },
    mainIcon: {
        width: 120,
        height: 120,
        // backgroundColor: 'white',
    },
    mainContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainInfo: {
        alignItems: 'flex-end',
        maxWidth: '50%',
        paddingRight: 10,
    },
    mainTemperature: {
        fontSize: 42,
        color: colorSet.textWhite,
    },
    mainNotes: {
        fontSize: fontSizeSet.large,
        color: colorSet.textWhite,
        textTransform: 'capitalize',
        textAlign: 'right',
    },
    contentWithDesc: {
        // marginBottom: 10,
        minHeight: 41,
    },
    notes: {
        fontSize: fontSizeSet.large,
        fontWeight: '600',
        color: colorSet.textWhite,
        // textTransform: 'uppercase',
    },
    subNotes: {
        fontSize: fontSizeSet.middle,
        fontWeight: '600',
        color: colorSet.textWhite,
        // textTransform: 'uppercase',
    },
    desc: {
        fontSize: fontSizeSet.small,
        color: colorSet.textWhite,
        textTransform: 'uppercase',
    },
})