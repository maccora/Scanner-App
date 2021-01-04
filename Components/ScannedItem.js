import React from 'react';
import {Text,View, TouchableHighlight} from 'react-native';

import Swipeable from 'react-native-swipeable-row';
 
const leftContent = <Text>Pull to activate</Text>;
 
const rightButtons = [
  <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
  <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
];
 
export default function ScannedItem() {
  return (
    <Swipeable leftContent={leftContent} rightButtons={rightButtons}>
      <Text>My swipeable content</Text>
    </Swipeable>
  );
}
