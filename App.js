import React from 'react';
import {View, Text, Button, Alert} from 'react-native';
import StackNavigator from './Navigators/StackNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import UserReducer from './Components/Redux/UserReducer.js';


const store = createStore(UserReducer);

export default function App(){
 
  return(
        <Provider store = {store}>
          <StackNavigator/>
        </Provider> 
  )
    
}