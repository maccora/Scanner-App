import React, {useState, useEffect} from 'react';
import {View,SafeAreaView, StyleSheet,Text } from 'react-native';
import {Camera} from 'expo-camera'
import * as WebBrowser from 'expo-web-browser';
import { WebView } from 'react-native-webview';
import AlanaData from '../AlanaData.json';
import ScannerModal from './ScannerModal';

export default function AlanaBarCodeScanner({reducerActions,reducers,props}){

    const [hasPermission, setHasPermission] = useState(null);
    const [scannerReady, setScanner] = useState(false) 
    const [scan, setScan] = useState({"type": "null", "data": "null", "isWhitelisted":false})

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
   
    useEffect(()=>{

      // Param action of "snap" alerts screen to take a picture
      if(props.route.params["action"] === "snap")
        {
            props.navigation.setParams({
                action: ""
              })
            setScanner(true)
            resetScan()
            
        }

      },[props.route.params["action"]])

    const openWebPage = async (url) => {
        if (!url) throw 'MISSED_PARAMS';
    
        try {
            return await WebBrowser.openBrowserAsync(url);
        }
        catch (e) {
            console.log('Error', e);
        }
    }

    const handleBarCodeScanned = (type,data) =>{
        //cameraRef.pausePreview()
        setScanner(false)
        
        const isScanWhiteListed = isCodeWhiteListed({type,data})
        
        if(isScanWhiteListed.type !== "failure")
        {
  
          reducerActions.createScan(data)
          setScan({type: type, data: data, isWhitelisted: isScanWhiteListed.result})
          if(!scan.isWhitelisted)

          {
              modalRef.toggleVisible()
          }
          
        }
        else{
        
            alert('Data was null')
        }
   
    }
  
    function resetScan(){
      setScan({"type": "null", "data":"null", "isWhitelisted":false})
    }

    function resetCamera()
    {
      modalRef.toggleVisible()
      //cameraRef.resumePreview()
    }
    
    function isCodeWhiteListed({type, data}){
       
        //verify that the code type of the scan is inn the list of approved scan types and contains "alanaenabled". Currently
        //that is the only way we are using to verify the QR code.

        if(data === "null")
        {
          return {type: 'failure', result: "Data was null"}
        }
        if(AlanaData.approved_codes.lastIndexOf(type) != -1 && data.search("alanaenabled") != -1)
        {
           
            return {type: "success", result: true}
        }
        else{
          
          return {type: "success", result: false}
          
        }
  
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        
        return <Text>No access to camera</Text>;
    }

return(
  
  // When the user presses the scan button the scanner will await to scan a code, upon scan the 
  // scan information is handled. If the scanner is not ready, undefined is returned/wait for user to be ready. 
  // If the scan is whitelisted, it will be opened in app. Otherwise, it will open out of the app.
    <SafeAreaView style = {{flex:1}}>
      {!scan.isWhitelisted?
      <Camera 
        ref = {ref=> {cameraRef = ref}} 
        style = {StyleSheet.absoluteFill} 
        onBarCodeScanned = {scannerReady? (scan)=>handleBarCodeScanned(scan.type,scan.data): undefined}>

        <View style = {styles.modal}>
          <ScannerModal 
            ref = {ref=>{modalRef = ref}} 
            onPressYes= {()=>{openWebPage(scan.data)}}
            onPressNo = {()=>{resetCamera()}}/>
        </View>

      </Camera>:
    
      <WebView style = {styles.web} source = {{uri: scan.data}}/>}
      
    </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    web:{

      alignSelf: 'stretch',
      flex:1,

    },
    modal:{

      flex:1,
      justifyContent:'center',
      alignItems:'center',

    },

})

