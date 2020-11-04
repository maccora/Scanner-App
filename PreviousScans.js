import React, {useState} from 'react';
import {SafeAreaView,Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import OpenURLButton from "./Components/OpenURLButton.js";
import UserData from "./UserData.json";

export default function PreviousScans({navigation}){
        const [scans, setScans] = useState(UserData.PreviousScans);
        
        const renderItem = ({ item }) => (
          <OpenURLButton 
            url = {item.title}
            onLongPress = {()=>{setScans(UserData.PreviousScans.splice(UserData.PreviousScans.indexOf(item),1), console.log(scans))}}
            />
        );
      
        return (
          <SafeAreaView style={styles.container}>
            <FlatList
              data={UserData.PreviousScans}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        );
      }
    

      const styles = StyleSheet.create({
        container: {
          flex: 1,
         
        },
        item: {
          backgroundColor: '#f9c2ff',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
        },
        title: {
          fontSize: 32,
        },
      });
