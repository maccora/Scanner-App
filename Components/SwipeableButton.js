import React, { Component } from 'react';
import { Animated, StyleSheet, View , Text} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function SwipeableButton({onPressGo,onPressDelete, data}){

  const renderPanel = (progressAnimatedValue, draggingAnimatedValue)=>{

    const transformedValues = draggingAnimatedValue.interpolate({
      inputRange: [0,50,100],
      outputRange: [134,147,160],
    })

  return(
    <RectButton style={{ backgroundColor: 'gray', height:100, width: 500, justifyContent:'center',alignItems:'center' }} 
    onPress={onPressDelete}>
      <Animated.View style={{flex:1,justifyContent: 'center', alignItems: 'center' ,transform: [{ translateX: transformedValues }]}}>
        <Text>delete</Text>
      </Animated.View>
      
    </RectButton>
  )
 }
 
  return(
    <View style = {{flex:1,justifyContent:'center', alignItems: 'center'}}>     
        <Swipeable renderRightActions={renderPanel}leftThreshold = {200}>
          <View style = {{backgroundColor: 'black', height: 100, width: 500, justifyContent: 'center', alignItems:'center'}}> 
            <RectButton onPress={onPressGo}>
              <View style = {{flex:1, justifyContent:'center', alignItems: 'center', flexDirection: 'column'}}>
                <Text style = {{color: 'white', fontSize: 10, fontWeight: 'bold'}}>Image </Text>  
                <Text style = {{color: 'white', fontSize: 10, fontWeight: 'bold'}}>data:{data.data} </Text>
                <Text style = {{color: 'white', fontSize: 10, fontWeight: 'bold'}}>visited:{data.visited} </Text>
              </View>
            </RectButton>
         </View>   
        </Swipeable>
    </View>
  )




}
