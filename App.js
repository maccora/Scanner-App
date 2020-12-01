import React, {useEffect, useState} from 'react';
import StackNavigator from './Navigators/StackNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AlanaDataReducer from './Components/Redux/AlanaDataReducer.js';


const store = createStore(AlanaDataReducer);

export default function App(){
 
  return(
        <Provider store = {store}>
          <StackNavigator/>
        </Provider> 
  )
    
}
