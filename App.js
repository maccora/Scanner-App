import React from 'react';
import StackNavigator from './Navigators/StackNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Components/Redux/RootReducer.js';

const store = createStore(rootReducer);

export default function App(){
 
  return(
    
        <Provider store = {store}>
         <StackNavigator/>
        </Provider> 
  )
    
}
