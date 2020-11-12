import React from 'react';
import {View, TouchableHighlight, Text, Modal} from 'react-native';


export default function WebPermisModal({onPressYes,onPressNo, webVisible}){

    return(

        <Modal 
      animationType = {'slide'}
      visible = {webVisible}
      transparent = {true}>
        
      <View style = {{flex:1, justifyContent: 'center', alignItems:  'center' }}>
        
        <View style = {{backgroundColor: 'white', height: 200, width: 200, flexDirection: 'column',alignItems: 'center', justifyContent: 'center', borderWidth: 5, borderColor: 'black', borderRadius: 25, }}>
        
          <Text style = {{marginTop: 35, flex:1}}>Test</Text>
        
          <View style = {{flex:1,flexDirection: 'row',alignItems: 'center'}}>
        
            <View style = {{flex:1,justifyContent: 'center', alignItems:'center'}}>
        
              <TouchableHighlight onPress = {onPressYes}>
                <Text style >Yes</Text>
              </TouchableHighlight>
        
            </View>  
            <View style = {{flex:1,justifyContent: 'center', alignItems:'center'}}>
        
              <TouchableHighlight onPress = {onPressNo}>
                <Text style >No</Text>
              </TouchableHighlight>
        
            </View>  
          </View>
        </View>
      </View>
    </Modal>


    )

}
