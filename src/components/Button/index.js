
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';

import { colorSet, fontSizeSet } from '../../AppStyles';
import { Icon } from '../../utils/Omni';

const Button = pros => {
    if (pros.type === 'border'){
        return <BorderButton {...pros}/>;
    }else if (pros.type === 'text') {
        return <TextButton {...pros}/>;
    }else if (pros.type === 'tab'){
        return <TabButton {...pros}/>
    }
};

Button.propTypes = {
    type: PropTypes.string,
};

const TextButton = props => (
    <TouchableOpacity
        disabled={props.disabled || props.isLoading}
        onPress={() => props.onPress()}
        stype={[styles.buttonText, props.style]}
        activeOpacity={0.7}
        underlayColor="#ccc">
        <View View style={styles.buttonView}>
            {props.icon && (<Icon name={props.icon} stype={[styles.buttonIcon, props.iconStyle && props.iconStyle]}/>

            )}
            <Text 
                {...props}
                style={[
                    styles.text,
                    { color: props.inactive ? colorSet.inActiveColor : colorSet.Text },
                ]}    
            >
             {props.text}       
            </Text>
            {props.isLoading && <ActivityIndicator style={styles.loading} color="#FFF"/>}
        </View>
    </TouchableOpacity>
);

const BorderButton = props => (
    <TouchableOpacity
        disabled={props.disabled ||props.isLoading}
        onPress={() => props.onPress()}
        style={[styles.borderButton, props.style, props.inactive && { backgroundColor: '#C6D8E4' }]}
        activeOpacity={0.7}
        underlayColor="#ccc">
            <View style={[styles.buttonView, props.buttonView]}>
                {props.icon && (
                    <Icon name={props.icon} style={[styles.buttonIcon, props.iconStyle && props.iconStyle]}/>                    
                )}
                <Text {...props} style={[styles.text, { color: colorSet.white }, props.textStyle]}>
                    {props.text}
                </Text>
                {props.isLoading && <ActivityIndicator style={styles.loading} color="#FFF"/>}
            </View>
    </TouchableOpacity>
);

const StandardButton = props => (
    <TouchableOpacity
        disabled={props.disabled || props.isLoading}
        onPress={() => props.onPress()}
        style={[styles.button, props.style, props.inactive && { backgroundColor: '#C6D8E4' }]}
        activeOpacity={0.7}
        underlayColor="#ccc"
    >
        <View style={[styles.buttonView, props.buttonView]} >
            {props.icon && (<Icon name={props.icon} style={[styles.buttonIcon, props.iconStyle && props.iconStyle]}/>
            )}
            <Text {...props} style={[styles.text, props.textStyle]}>
                {props.text}
            </Text>
            {props.isLoading && <ActivityIndicator style={styles.loading} color="#FFF"/>}
        </View>
    </TouchableOpacity>
);

const TabButton = props => {
    <TouchableOpacity
        onPress={() => props.onPress()} activeOpacity={0.8} selected={props.selected}>
        <View style={[styles.tabButton, props.buttonStyle, props.selected && styles.tabActive]}>
            <Text
                style={[
                    styles.tabButtonText,
                    props.textStyle,
                    props.selected && styles.tabActiveText && props.selectedStyle,
                ]}>
                {props.text}
            </Text>
            <View style={[styles.tabIndicator, props.selected && styles.activeIndicator]}/>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    tabActiveText: {
        color: colorSet.Text,
    },
    tabIndicator: {
        marginLeft: 10,
        marginTop: 10,
        textAlign: 'left',
        width: 60,
        height: 4,
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    activeIndicator: {
        backgroundColor: colorSet.activeColor,
    },
    // tabActive: {
    //   marginTop: 1,
    //   borderBottomWidth: 4,
    //   borderBottomColor: colorSet.product.TabActive,
    // },
    button: {
        backgroundColor: colorSet.activeColor,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 40,
    },
    buttonView :{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
      },
      buttonIcon: {
        width: 20,
        marginRight: 8,
      },
      text: {
        color: 'white',
        fontSize: fontSizeSet.subLarge,
        // marginTop: 3,
      },
      borderButton: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: colorSet.white,
      },
      tabButton: {
        // height: 50,
        justifyContent: 'center',
      },
      tabButtonText: {
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'left',
        fontSize: fontSizeSet.small,
      },
      loading: {
        marginLeft: 5,
      },
});

export default Button;