import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CodeCapture from './Screens/CodeCapture';
import PreviousScans from './Screens/PreviousScans';

const Stack = createStackNavigator();

export  default function ScreenNavigator(){

    return(
    <NavigationContainer>  
       <Stack.Navigator>
           <Stack.Screen name = "CodeCapture" component = {CodeCapture} options={{ headerShown: false }} />
           <Stack.Screen name = "PreviousScans" component = {PreviousScans} options={{ headerShown: false }}/>
       </Stack.Navigator>
    </NavigationContainer>  
    );

};
