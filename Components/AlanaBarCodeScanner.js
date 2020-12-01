import React, {useState, useEffect} from 'react';
import {Linking, View, StyleSheet,Text, Button , Modal} from 'react-native';
import { BarCodeScanner} from 'expo-barcode-scanner';
import * as WebBrowser from 'expo-web-browser';

import AlanaData from "../AlanaData.json";
import WebPermisModal from '../Components/WebPermisModal.js'


export default function AlanaBarCodeScanner(){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isVisible, setVisible] = useState(true);
    
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

    const handleBarCodeScanned = ({data,type}) =>{
        
        alert('Snap')
        setScanned(true)
        
        UserData.PreviousScans.push({"title": data, 
        "id": UserData.PreviousScans.length.toString()}); // Assign ID  to every Scan to allow for deletion.
        const scan = isWhiteListed(type, data)
        if(UserData.UPC_Codes.lastIndexOf(type) != -1)
        {
    
          UserData.UPC_List.push(data)
         
        }
        
        if(scan)
        {
    
          openWebPage(data)
    
        }
        else{
                
        }
      
         
      };
    
      function isWhiteListed(type, data){
        
        
        if(UserData.AvailabeCodes.lastIndexOf(type) != -1 && data.search("alanaenabled") != -1)
        {
           
            return true
        }
        else{
         
          return false
          
        }
  
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        
        return <Text>No access to camera</Text>;
    }

return(
    <View style = {{flex:1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
       

        <BarCodeScanner
          onBarCodeScanned = {scanned ? undefined :handleBarCodeScanned}
          style = {StyleSheet.absoluteFillObject}
        />
        
        
        
        
        {scanned && <Button title = "Reset Scanner" onPress = {()=>{setScanned(false)}}/>}

    </View>


    )

}
