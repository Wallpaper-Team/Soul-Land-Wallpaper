import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

export default class ButtonGoBack extends React.Component {
  render() {
    return (
      <TouchableOpacity>
        <Image
          source={require('../assets/icons/back.png')}
          style={{height: 20, width: 20}}
        />
      </TouchableOpacity>
    );
  }
}
