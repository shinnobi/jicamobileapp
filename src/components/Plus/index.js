import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { styleSet } from '../../AppStyles';
import NavigationBarIcon from '../NavigationBarIcon';

// import { log } from '@app/Omni';

const styles = StyleSheet.create({
    container: {
        left: 0,
        backgroundColor: 'transparent',
        // maxWidth: '100%',
        height: 44,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        paddingLeft: 0,
        paddingRight: 20,
        alignItems: 'center',
      },
});

class Plus extends Component {
    render () {
        const { onPress, size } = this.props;

        return (
            <View>
                <NavigationBarIcon 
                    icon="plus"
                    onPress={onPress}
                    // color={colorSet.textWhite}
                    size={size || 28}
                    css={{
                        marginLeft: Platform.OS === 'ios' ? 10 : 0,
                    }}
                />
            </View>
        );
    }
}

export default Plus;

