import React from 'react';
import {View,StyleSheet} from 'react-native';

export default function Header({leftChild,middleChild,rightChild}){
    
    return(

        <View style = {styles.header}>
            <View style = {{flex:1}}> 
                {leftChild}     
            </View>
            <View style = {{flex:1}}>
                {middleChild}
            </View>
            <View style = {{flex:1}}>
                {rightChild}
            </View>
        </View>

    );

};

const styles = StyleSheet.create({

    header:{

            flex:1,
            flexDirection: 'row',
            height: 200,
            backgroundColor: 'black',
            justifyContent: 'space-evenly',

    },
    
})
