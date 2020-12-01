import React from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HistoryScreen from '../Screens/HistoryScreen.js';
import QRCaptureScreen from '../Screens/QRCaptureScreen.js';
import ProfileScreen from '../Screens/ProfileScreen';
import HolderBScreen from '../Screens/HolderBScreen';
import isUser from '../Components/SocialLogins'

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    
     
      <Tab.Navigator >

        <Tab.Screen name="QRCapture" component={QRCaptureScreen}}/>
        <Tab.Screen name="History" component={HistoryScreen}/>
        <Tab.Screen name="ProfileScreen" component={ProfileScreen}/>
        <Tab.Screen name="HolderBScreen" component={HolderBScreen}/>
      
      </Tab.Navigator>
      
  
  );
}
