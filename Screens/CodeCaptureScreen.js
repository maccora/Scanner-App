import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, SafeAreaView,View, Button } from 'react-native';
import { bindActionCreators } from 'redux';

import AlanaBarCodeScanner from '../Components/AlanaBarCodeScanner.js';
import * as scanActions from '../Components/Redux/ScanData/ScanAction.js';


function CodeCaptureScreen(props) {
 
 const actions = {

    createScan: props.createScan,
    deleteScan: props.deleteScan,
    updateScanHistory: props.updateScanDatabase,
    getScanHistory: props.getScanHistory,
    flipScanner: props.flipScanner,

 }

 const reducers = {

   userDataReducer: props.userDataReducer,
   scanDataReducer: props.scanDataReducer

 }
   
  return(

    <View style = {{backgroundColor: 'black', ...StyleSheet.absoluteFill}}>
       <AlanaBarCodeScanner
        reducerActions = {actions}
        reducers = {reducers}
        props = {props}/>
       
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

const mapStateToProps = (state) => {

  const {userDataReducer, scanDataReducer} = state
  return {userDataReducer, scanDataReducer}
  
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({

   createScan: scanActions.createScan,
   deleteScan: scanActions.deleteScan,
   updateScanDataBase: scanActions.updateScanDatabase,
   getScanHistory: scanActions.getScanHistory,
   flipScanner: scanActions. flipScanner,
  
  }, dispatch)
);

export default connect(mapStateToProps,mapDispatchToProps)(CodeCaptureScreen);
