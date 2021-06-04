import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

import { colorSet, styleSet, fontSizeSet } from '../../AppStyles';
import Icon from '../Icon';

class TabBarIcon extends PureComponent {
    static propTypes = {
        icon: PropTypes.any,
        color: PropTypes.string,
        css: PropTypes.any,
        messages: PropTypes.object,
        messageIcon: PropTypes.any,
    };

    render() {
        const { icon, color, css, messages, messageIcon } = this.props;

        const numberWrap = (number = 0) => (
            <View style={styles.numberWrap}> 
                <Text style={styles.number}>{number}</Text>
            </View>
        );
        return (
            <View style={{ justifyContent: 'center', backgroundColor: 'transparent' }}>
                <Icon
                    ref={comp => (this._image == comp)}
                    name={icon}
                    style={[styles.icon, css]}
                    color={color}
                />
                {messageIcon && messages.numberOfUnread > 0 
                    ? numberWrap(messages.numberOfUnread || 0)
                    : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
      fontSize: fontSizeSet.xlarge,
      color: colorSet.darkGrey,
    },
    image: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    numberWrap: {
      ...styleSet.columnCenter,
      position: 'absolute',
      top: -10,
      right: -10,
      height: 18,
      minWidth: 18,
      backgroundColor: colorSet.activeColor,
      borderRadius: 9,
    },
    number: {
      color: 'white',
      fontSize: fontSizeSet.small,
      marginLeft: 3,
      marginRight: 3,
    },
  });

const mapStateToProps = ({ messages }) => ({ messages });
export default connect(
  mapStateToProps,
  null,
  null
)(TabBarIcon);
