import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
// import { colorSet } from '../../AppStyles';
import { Languages, moment } from '../../utils/Omni';
import { dayTimePeriod, getIconImageUrl } from '../../utils/Weather';

export default class ForecastHorizontalItem extends Component{
    onPress = () => {
        const {
            onViewDetail,
            mode,
            detail: { dateForecast },
        } = this.props;
        if (!onViewDetail || mode !== 'daily'){
            return;
        }

        onViewDetail(moment(dateForecast).startOf('day'));
    };

    renderMaxMin = () => {
        const { temperatureMin, temperatureMax } = this.props.detail;

        return temperatureMin && temperatureMax ? (
            <Text style={styles.mainNotes}>
                {Math.round(temperatureMin)}&deg;/{Math.round(temperatureMax)}&deg;
            </Text>
        ) : null;        
    }

    renderRain = () => {
        const { rain } = this.props.detail;

        return rain && rain.text ? <Text style={styles.mainNotes}>{rain.text}</Text> : null;
    };

    render() {
        const { icon, dateForecast, temperature } = this.props.detail;
        const { mode } = this.props;
        let label = '';
        let timePeriod = '';
        const time = moment(dateForecast);
        switch(mode){
            case 'hourly':
                label = time.hour() === 0 ? '24H' : time.format('H[H]');
                break;
            case 'daily':
                label = time.format('dddd');
                break;
            case 'detail':
            case 'default':
                timePeriod = dayTimePeriod(dateForecast);
                label = Languages[timePeriod] || timePeriod;
                break;
        }

        if (icon){
            return (
                <TouchableOpacity
                    disabled={mode !== 'daily'}
                    activeOpacity={0.7}
                    onPress={this.onPress}
                    style={styles.card}>
                        <Text style={styles.title}>{label}</Text>
                        <View style={styles.mainContent}>
                            <FastImage  
                                style={styles.mainIcon}
                                source={{
                                    uri: getIconImageUrl(icon.iconLink),
                                }}
                            />
                            <View style={styles.mainInfo}>
                                <Text style={styles.mainTemperature}>{Math.round(temperature)} &#8451;</Text>
                                {mode === 'daily' ? this.renderMaxMin() : this.renderRain()}
                            </View>
                        </View>

                </TouchableOpacity>
            );
        }

        return <View />
    };
};
