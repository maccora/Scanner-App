import React, {useState, setState, useEffect} from 'react';
import {View,FlatList, SafeAreaView,Animated,Button,Modal,Text} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WebView } from 'react-native-webview';


import * as scanActions from '../Components/Redux/ScanData/ScanAction';
import SwipeableButton from '../Components/SwipeableButton.js';

function HistoryScreen(props){
    const [scan, setScans] = useState(props.scanDataReducer.scanHistory)
    const [url, setUrl] = useState(null)
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
          setScans([...props.scanDataReducer.scanHistory])
        });
      
        return unsubscribe;
      }, [props.navigation]);

    function deleteScan(item){

        props.deleteScan(item)
        setScans([...props.scanDataReducer.scanHistory])
     
    }
    
    function handlePress(item)
    {
        console.log(item.data)
     props.incrementVisited(item.data)
     setUrl(item.data)

    }
    
    function renderItem(scan){
        return(
            <View style = {{flex:1, justifyContent:'center', alignContent: 'center'}}>
                   
                    <SwipeableButton 
                        onPressGo = {()=>{handlePress(scan.item)}}
                        onPressDelete = {()=>{deleteScan(scan.item)}}
                        data = {scan.item}>
                    </SwipeableButton>
                
            </View>
        )
    }
   
    return(

        <SafeAreaView style = {{flex:1,backgroundColor:'black', justifyContent:'center', alignContent:'center'}}>
        
            <FlatList
                data= {props.scanDataReducer.scanHistory}
                renderItem = {renderItem}
                keyExtractor = {(item)=> item.key}/>

             <Modal visible = {url != null}>

                <SafeAreaView style = {{flex:1}}>
                    
                    <WebView source = {{uri: url}}/>
                    <Button title = "Back" onPress = {()=>{setUrl(null)}}/>

                </SafeAreaView> 
                      
             </Modal>

        </SafeAreaView>

        )
    }

const mapStateToProps = (state) => {

    const {userDataReducer, scanDataReducer} = state
    return {userDataReducer, scanDataReducer}
    
  };
  
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
  
  
    deleteScan: scanActions.deleteScan,
    incrementVisited: scanActions.incrementVisited,
    }, dispatch)
  );;
  
  export default connect(mapStateToProps,mapDispatchToProps)(HistoryScreen);
