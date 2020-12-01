import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import AlanaBarCodeScanner from '../Components/AlanaBarCodeScanner.js';

export default function CodeCaptureScreen({navigation}) {
 
  
 
  
  return(

    <View style = {{flex:1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
       <AlanaBarCodeScanner/>
       
        
    </View>

  );

}


const styles = StyleSheet.create({



  main:{

    flex:1,
    justifyContent: 'center',
    alignItems: 'center',

  },

})

