import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Text, View, StyleSheet, Button,SafeAreaView, Linking} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
    
    UserData.PreviousScans.push({"title": data, 
    "id": UserData.PreviousScans.length.toString()}); // Assign ID  to every Scan to allow for deletion.

    if(UserData.UPC_Codes.lastIndexOf(type) != -1)
    {

      UserData.UPC_List.push(data)
     
    }
    if(!(isWhiteListed({type})))
    {

      alert('not in list....open in browser instead?');

    }
     
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    
    return <Text>No access to camera</Text>;
  }

  const isWhiteListed = ({type}) => {

      const exists = UserData.AvailabeCodes.lastIndexOf(type);
      if(exists != -1)
      {
          return true
      }
      else{
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
