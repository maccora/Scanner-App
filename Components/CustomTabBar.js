import React, {useState,useEffect} from 'react';
import {View, TouchableOpacity,Text, StyleSheet} from 'react-native';

function fillElements(elementContainer,  state, descriptors, navigation)
  {
   
    for(let i = 0; i < state.routes.length;i++)
    {
      const { options } = descriptors[state.routes[i].key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : state.routes[i].name;
    
            const isFocused = state.index === i;
    
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: state.routes[i].key,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(state.routes[i].name);
              }
            };
    
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: state.routes[i].key,
              });
            };
            
            elementContainer[state.routes[i].name] = <TouchableOpacity onPress = {onPress}><Text>{state.routes[i].name}</Text></TouchableOpacity>
           
    }
  }

export default function CustomTabBar({ state, descriptors, navigation }) {
    
    const tabElements = {
        CodeCapture:null,
        History: null,
        middle: <TouchableOpacity onPress = {()=>{middleButton(state,navigation)}}><Text>Middle</Text></TouchableOpacity>,
        ProfileScreen: null,
        PlaceHolderScreen:null,

    }
    function middleButton(state,navigation)
    {
        const lastItem = state.history.length-1
        const lastRoute = state.history[lastItem].key
       
        if(lastRoute.indexOf("CodeCapture")!= -1)
        {
           navigation.setParams({
             action: "snap"
           })
        }

        else{

          navigation.navigate("CodeCapture")
        }
        
    }
    
    fillElements(tabElements,state,descriptors,navigation)
  
    return (
      <View style = {styles.outerRow}>
        <View style = {styles.innerRow}>
            <View>
                {tabElements["CodeCapture"]}
            </View>
            <View>
                {tabElements["History"]}
            </View>
        </View>
        <View style = {styles.innerRow}>
            {tabElements["middle"]}
        </View>
        <View style = {styles.innerRow}>
            <View>
                {tabElements["ProfileScreen"]}
            </View>
            <View>
                {tabElements["PlaceHolderScreen"]}
            </View>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({

    outerRow:{
  
      height:75,
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems:'center'
  
    },
    innerRow:{
  
      flex:1, 
      flexDirection: 'row',
      justifyContent: 'space-evenly', 
      alignItems: 'center'
      
    },
    tabs:{
  
    },
  
  })
