import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { actions as locationActions } from '../../redux/LocationRedux';
import SearchBar from '../../components/SearchBar';
import { Timer, log } from '../../utils/Omni';
import kttvWorker from '../../utils/kttvWorker';
import { parseLocationAddress } from '../../utils/address';
import { colorSet, styleSet } from '../../AppStyles';
import styles from './styles';

class SearchLocation extends React.Component{
    static navigationOptions = () => (
        {
            header: null,
        });
    
    constructor(props){
        super(props);

        this.state = {
            currentLocations: [],
        };
        this.currentRequestId = 0;
        this.searchLocationDelayed = _.debounce(this.SearchLocation, 500);
    }

    // componentDidMount() {
    //   this._navListener = this.props.navigation.addListener('didFocus', () => {
    //     StatusBar.setBarStyle('dark-content');
    //     if (Platform.OS === 'android') {
    //       StatusBar.setTranslucent(false);
    //       StatusBar.setBackgroundColor(colorSet.white);
    //     }
    //   });
    // }

    searchLocation = async text => {
        if (text.length < 2){
            return;
        }
        // save the current request ID.
        const currentRequestId = this.currentRequestId + 1
        this.currentRequestId = currentRequestId;

        const data = await kttvWorker.searchLocationAddress(text);

        //only update if the current request is the same as when we started.
        if (this.currentRequestId === currentRequestId){
            const currentLocations = [];
            const searchResults = data && data.data && data.data.features ? data.data.features : [];
             // .filter(item => item.properties && item.properties.osm_key === 'place')
            // .map(item => parseLocationAddress(item))   
            searchResults.forEach(item => {
                if (
                    item.properties &&
                    // (item.properties.osm_key === 'place' || item.properties.osm_key === 'boundary') &&
                    item.geometry &&
                    item.geometry.coordinates    
                ){
                    const addressInfo = parseLocationAddress(item, false);
                    if (
                        addressInfo.state &&
                        currentLocations.every(
                            saved => saved.state !== addressInfo.state || saved.district !== addressInfo.district
                        )
                    ){
                        currentLocations.push({
                            ...addressInfo,
                            latitude: item.geometry.coordinates[1].toFixed(3),
                            longitude: item.geometry.coordinates[0].toFixed(3),
                        });
                    }   
                }
            });

            this.setState({ currentLocations });
        }
    };

    onSelectLocation = location => {
        const { navigation, savedLocation } = this.props;
        savedLocation(location);
        navigation.goBack();
        Timer.setTimeout(() => navigation.openDrawer(), 50);
    };

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity 
                activeOpacity={0.5}
                style={styles.locationItem}
                onPress={() => this.onSelectLocation(item)}>
               <View style={styles.locationText}>
                   <Text style={styles.mainText}>{item.district || item.state}</Text>
                   <Text style={styles.subText}>{item.state}</Text>
               </View>
               <Text style={styles.actionText}>{'Lưu'}</Text>
            </TouchableOpacity>
        );
    };

    render () {
        const { navigation } = this.props;
        const { currentLocations } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: colorSet.white }}>
                <View style={styleSet.transparentStatusBar}/>
                <SearchBar 
                    isSearch
                    onSearch={this.searchLocationDelayed}
                    onCancel={() => navigation.goBack()}
                />
                <FlatList
                    style={styles.container}
                    overScrollMode="never"
                    data={currentLocations}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => `${item.key}_${index}`}
                />
            </View>
        );
    }
}


const mapStateToProps = ({ netInfo, locationReducer }) => ({
    // netInfo,
    locations: locationReducer.savedLocation,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;

    return {
        ...ownProps,
        ...stateProps,
        saveLocation: location => {
            dispatch(locationActions.saveLocation(location));
        },
    };
};

export default connect(
    mapStateToProps,
    undefined,
    mergeProps
)(SearchLocation);
