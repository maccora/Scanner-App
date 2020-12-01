import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import TabNavigator from './TabNavigator'
import LogInScreen from '../Screens/LogInScreen';

const Stack = createStackNavigator();1

export default function StackNavigator(){

    return(

        <NavigationContainer>
            <Stack.Navigator>   
                <Stack.Screen name = "LogIn" component = {LogInScreen} options = {{headerShown: false}}/>
                <Stack.Screen name = "TabNavigator" component = {TabNavigator} options = {{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>

    )

};
