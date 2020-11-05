import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Text, View, StyleSheet, Button,SafeAreaView, Linking} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as WebBrowser from 'expo-web-browser';

import UserData from "./UserData.json";


export default function CodeCapture({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  openBrowser = (data) => {
    Linking.canOpenURL(data).then(supported => {
      if (supported) {
        Linking.openURL(data);
      } else {
        console.log("Don't know how to open URI: " + data);
      }
    });
  }

  openWebPage = async (url) => {
    if (!url) throw 'MISSED_PARAMS';

    try {
        return await WebBrowser.openBrowserAsync(url);
    }
    catch (e) {
        console.log('Error', e);
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data);
    setScanned(true);
    alert(`Scanned`);
    
    UserData.PreviousScans.push({"title": data, 
    "id": UserData.PreviousScans.length.toString()}); // Assign ID  to every Scan to allow for deletion.

    if(UserData.UPC_Codes.lastIndexOf(type) != -1)
    {

      UserData.UPC_List.push(data)
     
    }
    if(isWhiteListed({type, data}))
    {

      openWebPage(data)

    }
    else{

      alert('The QR code is not Alana Enabled. Would you like to open it in your browser?');
      openBrowser(data)

    }
     
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    
    return <Text>No access to camera</Text>;
  }

  const isWhiteListed = ({type, data}) => {

      if(UserData.AvailabeCodes.lastIndexOf(type) != -1 && data.search("alanaenabled") != -1)
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
  
      {scanned && <Button  title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      <Button title = {'Previous Scans'} onPress = {()=> navigation.navigate('PreviousScans')}/>
      
      
      
      
    </SafeAreaView>
  );

 }
