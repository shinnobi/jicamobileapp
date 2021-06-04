import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import { colorSet, fontSizeSet, headerHeight } from '../../AppStyles';
import { Device } from '../../utils/Omni';
import NavigationBarIcon from '../NavigationBarIcon';
import Icon from '../Icon';

class SearchBar extends PureComponent{
    constructor(props){
        super(props);

        this.state = {
            addressText: '',
        };
    }

    render() {
        const { isSearch, onPress, onSearch, onCancel, placeholder, navigation } = this.props;

        return(
            <View style={styles.container}>
                <view style={styles.searchBar}>
                    {isSearch ? (
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoCompleteType="off"
                            autoFocus
                            style={[styles.search, { paddingHorizontal: 20 }]}
                            onChangeText={onSearch}
                            placeholder={placeholder || 'Tìm địa điểm'}
                        />
                    ) : (
                        <TouchableOpacity onPress={onPress} style={styles.search} activeOpacity={0.8}>
                            <Icon name="io_ios-search" style={styles.searchIcon} color="#848484"/>
                            <Text style={styles.placeholder}>{placeholder || 'Tìm địa điểm'}</Text>
                        </TouchableOpacity>
                    )}
                </view>
                <View style={styles.cancelButton}>
                        <NavigationBarIcon
                            icon="close"
                            onPress={() => (onCancel ? onCancel() : navigation.goBack())}
                            color={colorSet.Text}
                            size={28}
                        />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: headerHeight,
      backgroundColor: 'transparent',
      paddingHorizontal: 15,
      marginTop: Device.isIphoneX ? 0 : 25,
      marginBottom: 10,
    },
    searchBar: {
      flex: 1,
      marginRight: 0,
    },
    search: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 40,
      // marginLeft: 10,
      // marginRight: 50,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor: '#EFEFF4',
    },
    searchIcon: {
      opacity: 1,
      fontSize: fontSizeSet.normal,
      fontWeight: 'bold',
      color: '#848484',
    },
    placeholder: {
      fontSize: fontSizeSet.normal,
      // lineHeight: 28,
      color: '#848484',
      marginLeft: 15,
    },
    cancelButton: {
      width: 40,
      height: 40,
    },
  });

  export default withNavigation(SearchBar);