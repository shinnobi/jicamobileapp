import React from 'react';
import {
  View,
  // StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
// import { SwipeListView } from 'react-native-swipe-list-view';
// import FastImage from 'react-native-fast-image';

import { actions as locationActions } from '../../redux/LocationRedux';
import { actions as weatherActions } from '../../redux/WeatherRedux';
import SearchBar from '../../components/SearchBar';
import { Icon } from '../../utils/Omni';
// import { getIconImageUrl } from '../../utils/Weather';
import { colorSet, styleSet } from '../../AppStyles';
import styles from './styles';

class LocationDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listEditing: false,
    };
  }

  componentDidMount() {
    this.props.getAllSavedWeatherData();
  }

  componentDidUpdate(prevProps) {
    const isDrawerOpen = this.props.navigation.state.isDrawerOpen;
    const wasDrawerOpen = prevProps.navigation.state.isDrawerOpen;

    if (wasDrawerOpen && !isDrawerOpen) {
      this.cancelEditLocations();
    } else if (!wasDrawerOpen && isDrawerOpen) {
      this.props.getAllSavedWeatherData();
    }
  }

  toggleEditLocations = () => {
    const listEditing = this.state.listEditing;
    this.setState({ listEditing: !listEditing });
  };

  cancelEditLocations = () => {
    this.setState({ listEditing: false });
  };

  onRemoveLocation = location => {
    this.props.removeLocation(location);
  };

  onSetMainLocation = location => {
    this.props.setMainLocation(location);
    this.props.navigation.closeDrawer();
  };

  mergeDataSource = () => {
    const { weatherData, locations } = this.props;
    const dataSource = [];
    if (locations.length) {
      locations.forEach((item, index) => {
        const { currentForecast = {} } = weatherData[index] ? weatherData[index] : {};
        const weather = currentForecast.weather;
        dataSource.push({
          ...item,
          weather,
        });
      });
    }

    return dataSource;
  };

  renderGeoItem = item => {
    if (!item.state) {
      return null;
    }
    const { mainIndex } = this.props;
    const itemWeather = item.weather;

    return (
      <View style={[styles.listItem, { borderBottomWidth: 0 }]}>
        <View style={styles.itemIcon}>
          <Icon
            name="near-me"
            color={mainIndex === 0 ? colorSet.blue : colorSet.inActiveColor}
            style={styles.indicatorIcon}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.itemContent}
          onPress={() => this.onSetMainLocation(item)}>
          <View style={styles.locationContent}>
            <View style={styles.locationText}>
              <Text style={styles.mainText}>{item.ward}</Text>
              <Text style={styles.subText}>{`${item.district ? `${item.district}, ` : ''}${
                item.state
              }`}</Text>
            </View>
          </View>
          {itemWeather && (
            <View style={styles.weatherInfo}>
              {/* {itemWeather.icon && itemWeather.icon.iconLink ? (
                <FastImage
                  style={styles.weatherIcon}
                  source={{
                    uri: getIconImageUrl(itemWeather.icon.iconLink),
                  }}
                />
              ) : null} */}
              <Text style={styles.temperature}>{itemWeather.temperature} &#8451;</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  renderItem = ({ item, index }) => {
    if (!item.state) {
      return null;
    }
    const { mainIndex } = this.props;
    const itemWeather = item.weather;

    return (
      <View style={styles.listItem}>
        <View style={styles.itemIcon}>
          {index === mainIndex - 1 && (
            <Icon
              name="checkbox-marked-circle-outline"
              color={colorSet.blue}
              style={styles.indicatorIcon}
            />
          )}
        </View>
        <View style={styles.itemContent}>
          <TouchableOpacity
            disabled={this.state.listEditing}
            style={styles.locationContent}
            activeOpacity={0.5}
            onPress={() => this.onSetMainLocation(item)}>
            <View style={styles.locationText}>
              <Text style={styles.mainText}>{item.district || item.state}</Text>
              <Text style={styles.subText}>{item.state}</Text>
            </View>
          </TouchableOpacity>
          {!this.state.listEditing ? (
            itemWeather && (
              <View style={styles.weatherInfo}>
                {/* {itemWeather.icon && itemWeather.icon.iconLink ? (
                  <FastImage
                    style={styles.weatherIcon}
                    source={{
                      uri: getIconImageUrl(itemWeather.icon.iconLink),
                    }}
                  />
                ) : null} */}
                <Text style={styles.temperature}>{itemWeather.temperature} &#8451;</Text>
              </View>
            )
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
              onPress={() => this.onRemoveLocation(item)}>
              <Text style={[styles.headerText, { color: 'red' }]}>Xóa</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.headerText}>Địa điểm đã lưu</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={this.toggleEditLocations}>
          <Text style={styles.headerText}>Sửa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderHiddenItem = ({ item, index }) => {
    return null;
    // return (
    //   <TouchableOpacity activeOpacity={0.7} onPress={() => this.onRemoveLocation(item)}>
    //     <Text style={styles.headerText}>Xóa</Text>
    //   </TouchableOpacity>
    // );
  };

  render() {
    const { navigation } = this.props;
    const dataSource = this.mergeDataSource();
    const geoLocation = dataSource && dataSource[0] ? dataSource[0] : false;
    const savedLocations = dataSource && dataSource.length >= 1 ? dataSource.slice(1) : [];

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colorSet.white,
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,

          // elevation: 5,
        }}>
        <View style={styleSet.transparentStatusBar} />
        <SearchBar
          onPress={() => navigation.navigate('SearchLocation')}
          onCancel={() => navigation.closeDrawer()}
        />
        {geoLocation && geoLocation.latitude ? this.renderGeoItem(geoLocation) : null}
        <FlatList
          // useFlatList
          // leftOpenValue={75}
          // rightOpenValue={-75}
          // disableRightSwipe
          // disableLeftSwipe={!this.state.listEditing}
          style={styles.container}
          overScrollMode="never"
          data={savedLocations}
          renderItem={this.renderItem}
          // renderHiddenItem={this.renderHiddenItem}
          ListHeaderComponent={this.renderHeader}
          stickyHeaderIndices={[0]}
          keyExtractor={(item, index) =>
            `${item.latitude}_${item.longitude}_${item.addressText}_${index}`
          }
        />
      </View>
    );
  }
}

const mapStateToProps = ({ netInfo, locationReducer, weatherReducer }) => ({
  // netInfo,
  locations: locationReducer.savedLocations,
  mainIndex: locationReducer.mainLocationIndex,
  weatherData: weatherReducer.data,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    setMainLocation: location => {
      dispatch(locationActions.setMainLocation(location));
    },
    // saveLocation: location => {
    //   dispatch(locationActions.saveLocation(location));
    // },
    removeLocation: location => {
      dispatch(locationActions.removeLocation(location));
    },
    getAllSavedWeatherData: () => {
      dispatch(weatherActions.getSavedLocationsCurrentWeather());
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(LocationDrawer);
