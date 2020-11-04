import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity,Linking, Text} from 'react-native';

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
        <TouchableOpacity onPress={this.handleClick}
                          onLongPress = {this.props.onLongPress}>
          <View style={{height: 100, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center'}}>
            <Text >{this.props.url}</Text>
          </View>
        
        </TouchableOpacity>
      );
    }
  }
  OpenURLButton.propTypes = { url: PropTypes.string };
