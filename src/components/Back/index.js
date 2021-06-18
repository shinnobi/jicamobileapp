/** @format */

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

class Back extends Component {
  render() {
    const { navigation, onPress } = this.props;

    return (
      <View style={[styleSet.navRow, styles.container]}>
        <NavigationBarIcon
          icon="io_ios-arrow-back"
          onPress={onPress ? onPress : () => navigation.goBack(null)}
          // color={colorSet.white}
          // size={18}
          css={{
            marginLeft: Platform.OS === 'ios' ? 10 : 0,
          }}
        />
      </View>
    );
  }
}

export default Back;
