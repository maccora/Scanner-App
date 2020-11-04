import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity,Linking, Text, StyleSheet} from 'react-native';

export default class OpenURLButton extends React.Component {
    
    handleClick = () => {
      Linking.canOpenURL(this.props.url).then(supported => {
        if (supported) {
          Linking.openURL(this.props.url);
        } else {
          console.log("Don't know how to open URI: " + this.props.url);
        }
      });
    };
    render() {
      return (
        <TouchableOpacity style = {{alignItems: 'center'}} onPress={this.handleClick}
                          onLongPress = {this.props.onLongPress}>
          <View style={URL.container}>
            <Text style = {URL.text} >{this.props.url}</Text>
          </View>
        
        </TouchableOpacity>
      );
    }
  }
  OpenURLButton.propTypes = { url: PropTypes.string };

 const URL = StyleSheet.create({

    container:{

      flex: 1, 
      width: 200,
      height: 40,  
      backgroundColor: 'rgb(22,44,66)',
      alignItems: 'center', 
      justifyContent: 'center', 
      margin: 10, 
      borderRadius: 20


    },
    text:{

      color: 'white',

    },

 });
