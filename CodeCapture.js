import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Text, View, StyleSheet, Button,SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import components from "./components.js";

import UserData from "../UserData.json";


export default function CodeCapture({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Scanned`);
    UserData.PreviousScans.push({"title": data.toString(), "id": UserData.PreviousScans.length.toString()}); // Assign ID  to every Scan to allow for deletion.
    
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    
    return <Text>No access to camera</Text>;
  }

  const isWhiteListed = ({type,data}) => {

      const exists =  UserData.AvailabeCodes.lastIndexOf(type);
      if(exists != -1)
      {
          return true
      }
      else{
        alert('This isn\'t one of ours but if you want to go, we\'ll  send you but we will do it outside the app' );
        return false
      }

  }

 

  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
  
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      {UserData.PreviousScans.length >= 1? <Button title = {'Previous Scans'} onPress = {()=> navigation.navigate('PreviousScans')}/>: <View></View>}
      
      
      
      
    </SafeAreaView>
  );

 }
