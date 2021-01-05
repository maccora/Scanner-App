import React from 'react';
import {View, TouchableOpacity,Text, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../Components/CustomTabBar.js';
import HistoryScreen from '../Screens/HistoryScreen.js';
import CodeCaptureScreen from '../Screens/CodeCaptureScreen.js';
import ProfileScreen from '../Screens/ProfileScreen';
import PlaceHolderScreen from '../Screens/PlaceHolderScreen';

export default function TabNavigator() {


  
  const Tab = createBottomTabNavigator();
  return (
      
      <Tab.Navigator tabBar = {props=> <CustomTabBar {...props}/>}>

        <Tab.Screen name="CodeCapture" component={CodeCaptureScreen} initialParams = {{action: ''}}/>
        <Tab.Screen name="ProfileScreen" component={ProfileScreen}/>
        <Tab.Screen name="History" component={HistoryScreen}/>
        <Tab.Screen name="PlaceHolderScreen" component={PlaceHolderScreen}/>
      
      </Tab.Navigator>
      
  );
}
