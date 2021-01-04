import React , {Component} from 'react';
import {Modal, StyleSheet, View, TouchableOpacity, Text, Animated } from 'react-native';

export default class ScannerModal extends Component{
    constructor(props){

        super(props);
        this.state = {

            isVisible:false

        }

    }
  
    toggleVisible()
    {
        this.setState({
            isVisible: !this.state.isVisible
        })
        
    }

     render(){

        return(
            <Modal visible = {this.state.isVisible} animationType = {'slide'} transparent = {true}>
               <View style = {styles.modal}>
                <TouchableOpacity onPress = {this.props.onPressYes}>
                  <Text>Go to URL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress= {this.props.onPressNo}>
                <Text>Take me back</Text>
                </TouchableOpacity>
              </View> 
            </Modal>
        )

     }


}

const styles = StyleSheet.create({
  

    modal:{
  
      flex:1,
      position:'absolute',
      backgroundColor:'white', 
      justifyContent:'space-around', 
      alignItems:'center',
      height:100, 
      width:200,
      right:100,
      bottom:300,
    
    },
  
  })
