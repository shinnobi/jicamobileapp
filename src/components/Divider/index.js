import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colorSet } from '../../AppStyles';

export default ({ style }) => {
    return <View style={[styles.line, style && style]} />;
};

const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: colorSet.sectionSeparatorColor,
        opacity: 0.3,
    },
});