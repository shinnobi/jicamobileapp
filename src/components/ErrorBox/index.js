
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';
import Button from '../Button';
// import { log } from '@app/Omni';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: fontSizeSet.large,
        color: colorSet.textWhite,
        textTransform: 'uppercase',
    },
    button: {
        marginTop: 20,
    },
});

const ErrorBox = props => {
    const retry = props.retry ? props.retry : () => {};
    return (
        <View style={styles.container}>
            <Text style={styles.message}Có lỗi khi lấy dữ liệu từ server></Text>
            <Button type="border" style={styles.button} text={"Thử lại"} onPress={retry} />
        </View>
    );
};