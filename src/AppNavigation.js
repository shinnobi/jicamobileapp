import React from 'react';
import { Platform } from 'react-native';
import {  
  createAppContainer
  // getActiveChildNavigationOptions,
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator }   from 'react-navigation-drawer'

import { colorSet } from './AppStyles';
import { Languages, Device } from './utils/Omni';
import HomeScreen from './screens/HomeScreen';
// import DetailScreen from './screens/DetailScreen';
// import ExtendedScreen from './screens/ExtendedScreen';
// import NewsScreen from './screens/NewsScreen';
// import NewsDetailScreen from './screens/NewsDetailScreen';
import LocationDrawer from './screens/LocationDrawer';
import SearchLocation from './screens/SearchLocation';
import TabBarIcon from './components/TabBarIcon';

// const defaultHeaderStyle = {
//   headerStyle: styleSet.headerBar,
//   headerTintColor: colorSet.analyticsColor,
//   headerTitleStyle: styleSet.headerTitleStyle,
//   headerLeftContainerStyle: styleSet.navIconContainer,
//   headerRightContainerStyle: styleSet.navIconContainer,
// };

const HomeStack = createStackNavigator(
    {
        HomeScreen: { screen: HomeScreen },
        //DetailScreen: { screen: DetailScreen },
        SearchLocation: { screen: SearchLocation },
    },
    {
      initialRouteName: 'HomeScreen',
      headerMode: 'float',
  
      headerLayoutPreset: 'center',
      // defaultNavigationOptions: {
      //   ...defaultHeaderStyle,
      //   headerBackTitle: Languages.Back,
      // },
      navigationOptions: ({ navigation, screenProps }) => ({
        header: null,
        // gestureDirection: 'default',
        // headerTintColor: colorSet.activeColor,
        // headerTitleStyle: styles.headerTitleStyle,
        // ...getActiveChildNavigationOptions(navigation, screenProps),
      }),
      cardStyle: { backgroundColor: '#FFFFFF' },
    }
);

const ExtendedStack = createStackNavigator(
  {
    //ExtendedScreen: { screen: ExtendedScreen },
    //DetailScreen: { screen: DetailScreen },
    SearchLocation: { screen: SearchLocation },
  },
  {
    initialRouteName: 'ExtendedScreen',
    headerMode: 'float',

    headerLayoutPreset: 'center',
    navigationOptions: () => ({
      header: null,
    }),
    cardStyle: { backgroundColor: '#FFFFFF' },
  }
);

const NewsStack = createStackNavigator(
  {
    //NewsScreen: { screen: NewsScreen },
    //NewsDetailScreen: { screen: NewsDetailScreen },
    SearchLocation: { screen: SearchLocation },
  },
  {
    initialRouteName: 'NewsScreen',
    headerMode: 'float',

    headerLayoutPreset: 'center',
    navigationOptions: () => ({
      header: null,
    }),
    cardStyle: { backgroundColor: '#FFFFFF' },
  }
);

// tab stack
const MainTabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <TabBarIcon icon="io_md-today" color={tintColor} />,
        tabBarLabel: Languages.Today,
      },
    },
    Extended: {
      screen: ExtendedStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <TabBarIcon icon="chart-donut-variant" color={tintColor} />,
        tabBarLabel: Languages.Forecast,
      },
    },
    News: {
      screen: NewsStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <TabBarIcon icon="podcast" color={tintColor} />,
        tabBarLabel: Languages.WeatherNews,
      },
    },
  },
  {
    // initialRouteName: 'News',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: colorSet.activeColor,
      inactiveTintColor: colorSet.inActiveColor,
      backgroundColor: 'rgba(22, 22, 22, 0.3)',
    },
    lazy: true,
    navigationOptions: {
      gestureDirection: 'default',
    },
  }
);

const SearchLocationStack = createStackNavigator({
  SearchLocation: { screen: SearchLocation },  
});

const AppDrawer = createDrawerNavigator(
  {
    MainTabs,
    SearchLocation: SearchLocationStack,
  },
  {
    contentComponent: LocationDrawer,
    drawerWidth: Device.Window.width - 80,
    drawerPosition: 'right',
    drawerType: 'back',
    hideStatusBar: false,
    // overlayColor: '',
    // gestureHandlerProps: {
    //   contentContainerStyle: Platform.select({
    //     ios: {
    //       shadowColor: '#000',
    //       shadowOpacity: 0.5,
    //       shadowOffset: { width: 0, height: 2 },
    //       shadowRadius: 60,
    //     },
    //     android: {
    //       elevation: 100,
    //       backgroundColor: '#000',
    //     },
    //   }),
    // },
  }
)

// const styles = StyleSheet.create({
//   headerTitleStyle: {
//     fontWeight: 'bold',
//     textAlign: 'center',
//     alignSelf: 'center',
//     color: 'black',
//     flex: 1,
//   },
// });

export default createAppContainer(AppDrawer);
// export default AppDrawer;