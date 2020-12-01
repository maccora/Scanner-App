import React, {useState, setState} from 'react';
import {Text,View,  SafeAreaView, TouchableHighlight} from 'react-native';

import Header from '../Components/Header.js'
import AlanaData from '../AlanaData.json';

export default function HistoryScreen({navigation}){
    const [data,setData] = useState(AlanaData.PreviousScans);
  
    const middleChild =   
        <View>
            <Text style = {{color:'white', marginLeft:45, fontWeight: 'bold', fontSize: 25, }}>History</Text>
        </View>;
    

    const rightChild =   
            <TouchableHighlight onPress= {()=>{setData([]), alert('Cleared')}}>
                <Text style = {{color:'rgb(16,131,249)', marginLeft: 75,marginTop: 2, fontSize: 20}}>Clear</Text> 
            </TouchableHighlight>;
                        
    return(

        <SafeAreaView style = {{backgroundColor: 'black', flex: 1, height: 500,}}>
              <Header
                middleChild = {middleChild}
                rightChild = {rightChild} />
              <View style = {{flex:1}}>
                 {data}
              </View>
                
        </SafeAreaView>

    )

}
