/* eslint-disable */
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import NewsScreen from './screens/NewsScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';

import { log } from './utils/log';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);    
  }
  render() {    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{'Home!'}</Text>
      </View>
    );
  }
}
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{'Settings!'}</Text>
      </View>
    );
  }

const StackNavigator = createStackNavigator();

function NewsStack() {
    return (
      <StackNavigator.Navigator initialRouteName="NewsScreen">
        <StackNavigator.Screen name="NewsScreen" component={NewsScreen} /> 
        <StackNavigator.Screen name="NewsDetailScreen" component={NewsDetailScreen} />      
      </StackNavigator.Navigator>
    );
}

const ButtomTabNavigator = createBottomTabNavigator();
export default MainTabs = () => {
  return (
    <ButtomTabNavigator.Navigator>
      <ButtomTabNavigator.Screen name="News" component={NewsStack} />
      <ButtomTabNavigator.Screen name="Home" component={HomeScreen} />        
    </ButtomTabNavigator.Navigator>
)};
