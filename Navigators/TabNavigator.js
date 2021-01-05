import { useLinkProps } from '@react-navigation/native';
import React, {useState,useEffect} from 'react';
import {View, TouchableOpacity,Text, StyleSheet, Image, ImageBackground } from 'react-native';


function fillElements(tabComponents, iconComponentArray, state, descriptors, navigation)
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
            
            tabComponents[state.routes[i].name] = <TouchableOpacity onPress = {onPress}>{iconComponentArray[i]}</TouchableOpacity>
           
    }
  }

export default function CustomTabBar({ state, descriptors, navigation }) {
    
    const tabElements = {
        CodeCapture:null,
        History: null,
        middle: <TouchableOpacity onPress = {()=>{middleButton(state,navigation)}}>
                  <Image style = {styles.logo} source ={require("../assets/Aliza-Logo.png")}/>
                </TouchableOpacity>,
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

    const tabIconComponents = [<Image  style = {styles.icon} source ={require("../assets/AlizaHome.png")}/>,
                                <Image  style = {styles.icon} source ={require("../assets/AlizaProfile.png")}/>,
                               <Image  style = {styles.icon} source ={require("../assets/AlizaFavorites.png")}/>,
                               <Image  style = {styles.icon} source ={require("../assets/AlizaRefreshBag.png")}/>]

    fillElements(tabElements,tabIconComponents,state,descriptors,navigation)
  
    return (

        <View>
        <ImageBackground style = {styles.outerRow} source = {require("../assets/AlizaBackground.png")}>
          <View style = {styles.innerRow}>
            <View style = {{marginRight:10}}>
                {tabElements["CodeCapture"]}
            </View>
            <View style = {{marginLeft:10}}>
                {tabElements["ProfileScreen"]}
            </View>
        </View>
        <View style = {styles.innerRow}>
            {tabElements["middle"]}
        </View>
        <View style = {styles.innerRow}>
            <View style = {{marginRight:10}}>
                {tabElements["History"]}
            </View>
            <View style = {{marginLeft:10}}>
                {tabElements["PlaceHolderScreen"]}
            </View>
        </View>
        </ImageBackground>   
      </View> 
   
       
     
    );
  }

  const styles = StyleSheet.create({

    outerRow:{

      height:85,
      backgroundColor: 'black',
      justifyContent:'center',
      alignItems:'center',
      flexDirection: 'row',

    },

    innerRow:{
  
      flex:1, 
      flexDirection: 'row',
      justifyContent: 'space-evenly', 
      alignItems: 'center',
      
      
    },
    
    logo:{
      position: 'absolute',
      top: -70,
      left: -45,
      height:100,
      width:95,

    },
    icon:{
    
        height:40,
        width:40,
    }
  
  })
