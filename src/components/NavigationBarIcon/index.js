/** @format */

import React, { PureComponent } from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';

import { colorSet, fontSizeSet, styleSet } from '../../AppStyles';
import Icon from '../Icon';

class NavigationBarIcon extends PureComponent {
  render() {
    const { onPress, icon, color, size, style } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.iconWrap, style && style]}>
        <Icon
          name={icon}
          color={color || colorSet.textWhite}
          style={[
            styles.icon,
            {
              fontSize: size || fontSizeSet.xxlarge,
              fontWeight: 'bold',
            },
          ]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iconWrap: {
    ...styleSet.ColumnCenter,
    width: 40,
    height: 40,
    marginHorizontal: Platform.OS === 'ios' ? 5 : 0,
  },
  icon: {
    opacity: 1,
  },
});

export default NavigationBarIcon;
