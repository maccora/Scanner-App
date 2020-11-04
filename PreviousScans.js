import React, {useState} from 'react';
import {SafeAreaView,Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';


import UserData from "../UserData.json";

export default function PreviousScans({navigation}){
        const [scans, setScans] = useState(UserData.PreviousScans);
        
        const renderItem = ({ item }) => (
          <TouchableOpacity
            onPress = {()=>{setScans(UserData.PreviousScans.splice(UserData.PreviousScans.indexOf(item.id),1)) }}
            onLongPress = {()=>{console.log(scans)}}
            style = {{backgroundColor: 'yellow', justifyContent: 'center', alignItems:'center', flex:1, margin: 10, height: 80,}}
            >
              <Text >{item.title}</Text>
          </TouchableOpacity>
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
      
     