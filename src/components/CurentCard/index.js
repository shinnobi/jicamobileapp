import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import Divider from '../Divider';
import ErrorBox from '../ErrorBox';
import styles from './styles';
import { colorSet } from '../../AppStyles';
import { Languages, Constants } from '../../utils/Omni';
import { getIconImageUrl } from '../../utils/Weather';

export default class CurrentCard extends Component{
    render(){
        const { detail, onRetry, isLoading } = this.props;

        if (detail && detail.temperature && detail.icon){
            return (
                <View style={styles.card}>
                    <View style={styles.mainContent}>
                        <Image 
                            style={styles.mainIcon}
                            source={{
                                uri: getIconImageUrl(detail.icon.iconLink),
                            }}
                        />
                        <View style={styles.mainInfo}>
                            <Text style={styles.mainTemperature}>{detail.temperature} &#8451;</Text>            
                            <Text style={styles.mainNotes}>{detail.icon.description}</Text>
                            {/* <Text style={styles.mainNotes}>
                                {main.temp_min}&deg; / {main.temp_max}&deg;
                            </Text> */}
                        </View>
                    </View>        

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                        {detail.relativeHumidity && detail.relativeHumidity >0 ? (
                           <View style={styles.col}>
                               <View style={styles.contentWithDesc}>
                                   <Text style={styles.notes}>{Math.round(detail.relativeHumidity)}%</Text>
                                   <Text style={styles.desc}>{Languages.Humidity}</Text>
                               </View>
                           </View> 
                        ) : (
                            <View/>
                        )}
                        {detail.windSpeed ? (
                            <View style={styles.col}>
                                <View style={styles.contentWithDesc}>
                                    <Text style={styles.notes}>
                                        {`${detail.windDirection} ${detail.windSpeed} ${Constants.kmH}`}
                                    </Text>
                                    <Text style={[styles.desc, { textAlign: 'right' }]}>{Languages.Wind}</Text>
                                </View>
                            </View>
                        ) : null}         

                        <Divider style={{ backgroundColor: colorSet.white, marginBottom: 10 }} />
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.col}>
                                {detail.cloudCover && (
                                    <View style={styles.contentWithDesc}>
                                        <Text style={styles.subNotes}>{detail.cloudCover}</Text>
                                    </View>
                                )}
                                {detail.visibility && (
                                    <View style={styles.contentWithDesc}>
                                    <Text style={styles.subNotes}>{`${detail.visibility} ${Constants.km}`}</Text>
                                    <Text style={styles.desc}>{Languages.Visibility}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.col}>
                                {detail.uvIndex && detail.uvIndex.uvi ? (
                                    <View style={styles.contentWithDesc}>
                                    <Text
                                        style={styles.subNotes}>{`${detail.uvIndex.uvi} ${detail.uvIndex.text}`}</Text>
                                    <Text style={styles.desc}>{Languages.UVIndex}</Text>
                                    </View>
                                ) : null}
                                {detail.pressure && detail.pressure > 0 ? (
                                    <View style={styles.contentWithDesc}>
                                    <Text style={styles.subNotes}>{`${detail.pressure} ${Constants.hPa}`}</Text>
                                    <Text style={styles.desc}>{Languages.Pressure}</Text>
                                    </View>
                                ) : null}
                            </View>    
                            <View style={styles.col}>
                                {detail.realRainAWSData && detail.realRainAWSData.text ? (
                                    <View style={styles.contentWithDesc}>
                                        <Text style={styles.subNotes}>{detail.realRainAWSData.text}</Text>
                                    </View>
                                ) : null}
                                {detail.dewPoint ? (
                                    <View style={styles.contentWithDesc}>
                                        <Text style={styles.subNotes}>{detail.dewPoint} &#8451;</Text>
                                        <Text style={styles.desc}>{Languages.DewPoint}</Text>
                                    </View>
                                ) : null}            
                            </View>
                        </View>

                    </View>
                </View>
            );
        }

        return isLoading ? (
            <View style={styles.card} />
        ) : (
            <View style={styles.card}>
                <ErrorBox onRetry={onRetry}/>
            </View>
        );
    }
};

