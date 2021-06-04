import React, { Component } from 'react';
import { View, FlatList, SectionList, Text } from 'react-native';

import ForecastItem from '../ForecastHorizontalItem';
import Button from '../../components/Button';
import Divider from '../../components/Divider';

import styles from './styles';
import { colorSet } from '../../AppStyles';
import { Languages, moment } from '../../utils/Omni';

export default class ForecastHorizontalList extends Component{
    renderHeader = item => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}></Text>
            </View>
        );
    };
    renderSectionListHeader = title => {
        return title ? (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>{title}</Text>
            </View>
        ) : null;
    };
    
    renderSectionList = () => {
        const { forecastList, mode, label, onViewDetail, onViewMore } = this.props;

        if (forecastList && forecastList.length){
            const data = mode !== 'daily' ? [] : [{ data: [] }];
            const startTime = moment();
            let currentSection = {
                title: startTime.format('dddd'),
                data: [],
            };
            let currentDay = 0;
            forecastList.forEach(item => {
                const time = moment(item.dateForeCast);
                const day = time.format('DDD');
                const hour = time.hour();
                if (mode !== 'daily'){
                    if (time.isAfter(startTime)){
                        if (day !== currentDay && hour > 1){
                            if (currentSection && currentSection.data && currentSection.length){
                                data.push(currentDay);
                            }
                            currentSection = {
                                title: moment(item.dateForeCast).format('dddd'),
                                data: [],
                            }

                            currentDay = day;
                        }
                        currentDay.data.push({
                            ...item,
                        });
                    }
                }else{
                    data[0].data.push({ 
                        ...item,    
                    })
                }                        
            });
            if (currentSection && currentSection.data && currentSection.data.length){
                data.push(currentSection);
            }
            return (
                <View style={styles.container}>
                    <view style={styles.header}>
                        <Text style={styles.headerLabel}>{label || 'Dự báo thời tiết'}</Text>
                    </view>        
                    <Divider/>
                    <SectionList
                        section={data}
                        horizontal
                        style={{ marginTop:0, marginBottom: 0 }}
                        keyExtractor={(item, index) => `${item.dateForeCast}-${index}`}
                        renderItem={({item}) => (
                            <ForecastItem detail={item} mode={mode} onViewDetail={onViewDetail}/>      
                        )}
                        renderSectionHeader={({ section: {title} }) => this.renderSectionListHeader(title)}
                        stickySectionHeadersEnabled
                    />
                    <Button 
                        buttonStyle={styles.viewMoreBtn}
                        txtStyle={styles.viewMoreBtnText}
                        text={Languages.ViewMore}
                        type="text"
                        onPress={onViewMore}
                    />
                </View>
            );
        }
        return <View/>;
    };

    renderFlatList = () => {
        const { forecastList, mode, label } = this.props;

        if (forecastList && forecastList.length){
            const headerList = [];
            const data = [];
            let currentDay = 0;
            let count = 0;
            forecastList.forEach(item => {
                const day = moment(item.dateForeCast).format('DDD')
                if (day != currentDay){
                    data.push({
                        ...item,
                        isHeader: true,    
                    });
                    headerList.push(count);
                    currentDay = day;
                }
                data.push(item);
                count += 1;                
            });
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerLabel}>{label || 'Dự báo thời tiết'}</Text>
                    </View>
                    <Divider 
                        style={{ backgroudColor: colorSet.sectionSeparatorColor, marginHorizontal: 10 }}
                    />
                    <FlatList
                        data={data}
                        style={{ marginTop: 0, marginBottom: 0 }}
                        keyExtractor={(item, index) => `${item.dateForeCast}-${index}`}
                        horizontal
                        renderItem={({ item }) =>
                            item.isHeader ? this.renderHeader(item) : <ForecastItem detail={item} mode={mode}/>
                        }
                        stickyHeaderIndices={headerList}
                    />                        
                    <Button title={Languages.ViewMore} type="clear" />
                </View>
            );   
        }

        return <View />;
    };

    render () {
        return this.renderSectionList();
    }
}